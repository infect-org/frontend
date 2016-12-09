(() => {

	/* global window, document */

	/**
	* Draws a matrix with resistencies. 
	* Rows: Antibiotics
	* Cols: Bacteria
	* Cells: Colored according to resistance, with label
	*
	* Data should be an array containing rowData. rowData is an object with a property for the row's label
	* and a property wich contains an array with the cell's data:
	*
	* [
	*	// One object per row
	*	{
	*
	*		// Row label's data
	*		bacterium : { name: 'bact-name', id: 1 }
	*
	*		// Cells display antibiotics
	*		, antibiotics : [
	*			{
	*				antibiotic: { name: 'abname', id: 15}
	*				, resistance: 0.5
	*			}
	*		]
	*	}
	* ]
	*
	*/
	class ResistanceMatrix {

		/**
		* @param {HTMLElement} container
		* @param {Array} data				Data to be displayed must be a 2-d array where the values of the 2nd dimension array
		*									are objects, e.g. [[{bacterium: {name: 'bact-0'}, antibiotic: {name: 'ab-0'}, resistance: 0.5}]]
		* @param {Object} config			Contains the config with the following properties: 
		*									- cellColorValue: Function that returns the cell's color value (from the cell's object)
		* 									- cellLabelValue: Function that returns the cell label's value (from the cell's object)
		*									- columnHeaderTransformer: transformation-function that takes the whole data and returns array relevant for
		*									  column headers
		*									- columnIdentifier: Function that returns id for the col header (from columnHeaderTransformer)
		*									- columnLabelValue: Function that returns the column label's value (from the columnHeaderTransformer array)
		*									- rowLabelValue: Function that returns the row label's value (from the cell's array)
		* 									- spaceBetweenLabelsAndMatrix: Space between label and matrix in px
		*									- paddingRatio: Line weight (in % of the cells)
		*/
		constructor(container, data, config = {}) {

			if (!container) {
				throw new Error('ResistanceMatrix: Container must be passed to constructor.');
			}

			if (!data) {
				throw new Error('ResistanceMatrix: Data needed in constructor');
			}

			this._container 	= container;
			this._data 			= data;
			this._svgNS			= 'http://www.w3.org/2000/svg';


			this._configuration	= {
				spaceBetweenLabelsAndMatrix		: config.spaceBetweenLabelsAndMatrix || 20
				, transitionDuration			: config.transitionDuration || 900
				, lineWidth						: config.lineWidth || 2
				, cellColorValue				: config.cellColorValue || (() => 1)
				, cellLabelValue				: config.cellLabelValue || (() => '–')
				, rowIdentifier					: config.rowIdentifier || 'n/a'
				, rowLabelValue					: config.rowLabelValue || (() => 'n/a')
				, columnLabelValue				: config.columnLabelValue || (() => 'n/a')
				, columnHeaderTransformer		: config.columnHeaderTransformer || ((item) => item)
				, columnIdentifier				: config.columnIdentifier || ((item) => item)
				// Returns value for rows on each data item
				, rowDataTransformer			: config.rowDataTransformer || ((item) => item)
				, rowHidden						: config.rowHidden ||(() => false)
				, columnHidden					: config.columnHidden || (() =>false)
			};


			// Create SVG
			this._elements = {};
			console.time('drawMatrix');
			this._drawMatrix();
			console.timeEnd('drawMatrix');

		}



		/**
		* Updates the matrix' data
		* @param {Array} data				Array (rows) of Arrays (cols) which hold the values (Object)
		*/
		updateData(data) {

			console.time('updateData');

			this._data = data;
			console.log('ResistanceMatrix: Update data to %o', data);


			// Cols
			const visibleCols = this._configuration.columnHeaderTransformer(this._data).filter((item) => !this._configuration.columnHidden(item));
			console.log('ResistanceMatrix: Visible cols', visibleCols.length);

			const colScale = this._createScale(
				  visibleCols
				, this._configuration.columnIdentifier
				, this._colScale.offset()
				, this._defaultStep * visibleCols.length
				, this._configuration.lineWidth
			);

			this._updateColumnPositionAndVisibility(colScale);



			// Rows
			const visibleRows = this._data.filter((item) => !this._configuration.rowHidden(item));
			console.log('ResistanceMatrix: Visible rows %o', visibleRows.length);
			const rowScale = this._createScale(
				visibleRows
				, this._configuration.rowIdentifier
				, 0
				, this._defaultStep * visibleRows.length
				, this._configuration.lineWidth
			);

			this._updateRowPositionsAndVisibility(rowScale);



			// Update scales
			this._colScale = colScale;
			this._rowScale = rowScale;

			console.timeEnd('updateData');

		}




		/**
		* Updates the row's position and visibility to match filters
		*/
		_updateRowPositionsAndVisibility(scale) {

			console.time('updateRowPos');

			const rowIds = Object.keys(this._elements.rows);
			rowIds.forEach((rowId) => {

				const pos = scale.getPosition(rowId)
					, row = this._elements.rows[rowId];

				if (pos === undefined) {
					row.style.opacity = 0;
					row.style.display = 'none';
				}
				else {
					row.style.opacity = 1;
					row.style.display = 'block';
					row.style.transform = `translate(0, ${ pos }px)`;
				}

			});

			console.timeEnd('updateRowPos');

		}




		/**
		* Updates the col's position and visibility to match filters
		*/
		_updateColumnPositionAndVisibility(scale) {

			console.time('updateColPos');

			// Remove all columns that are not visible any more
			const colIds = Object.keys(this._elements.columns);
			colIds.forEach((colId) => {

				const pos = scale.getPosition(colId);

				// Not visible any more
				if (pos === undefined) {
					this._elements.columns[colId].forEach((element) => {
						element.style.opacity = 0;
						element.style.display = 'none';
					});
				}

				else {
					this._elements.columns[colId].forEach((el) => {
						el.style.opacity = 1;
						el.style.display = 'block';
						el.style.transform = `translate(${ pos }px, 0)`;
					});
				}

			});

			console.timeEnd('updateColPos');

		}



		/**
		* Main method. Draws the matrix with data and container provided.
		*/
		_drawMatrix() {


			// Create new SVG
			if (!this._elements.svg) {
				this._elements.svg = this._createSVG();
				this._container.append(this._elements.svg);
			}
			// Empty existing SVG
			else {
				this._elements.svg.innerHTML = '';
			}

			const rowLabelMaxWidth			= this._getRowLabelMaxWidth();



			// Create scale for columns
			const left = rowLabelMaxWidth + this._configuration.spaceBetweenLabelsAndMatrix;
			// 50: Save same space for the labels that are rotate by 45deg
			this._colScale = this._createScale(this._configuration.columnHeaderTransformer(this._data), this._configuration.columnIdentifier, left, this._getSvgWidth() - left - 50, this._configuration.lineWidth);

			// Store a «normal» step: 
			// When all elements are removed (because filters are too strict), step() will be lost and canot be
			// used any more. But they're required in _updateData to create new scales.
			this._defaultStep = this._colScale.step();
			
			// Make sure that the row's scale's steps are the same as the col scale's by multiplying data's length with the steps of colScale
			// firstColData contains the first entry of every row
			this._rowScale = this._createScale(this._data, this._configuration.rowIdentifier, 0, this._data.length * this._colScale.step(), this._configuration.lineWidth);

			console.log('ResistanceMatrix: SVG width %o, row label max width %o', this._getSvgWidth(), rowLabelMaxWidth);



			// Create all content needed to draw the table
			const content = [];



			// Create circle <defs>
			console.time('createCircleDefs');
			content.push(this._createCellCircleDefs(this._colScale.bandwidth()));
			console.timeEnd('createCircleDefs');


	
			// Create Column heads			
			console.time('createColHeads');
			content.push(this._createColHeads(
				this._configuration.columnHeaderTransformer(this._data)
				, this._configuration.columnLabelValue
				, this._configuration.columnIdentifier
				, this._colScale
			));
			console.timeEnd('createColHeads');



			// Create rows
			console.time('createRows');
			content.push('<g class=\'matrix-body\'>');
			content.push(this._createRows(
				  this._data
				, this._configuration.rowDataTransformer
				, this._configuration.rowLabelValue
				, this._configuration.rowIdentifier
				, this._configuration.columnIdentifier
				, this._configuration.cellColorValue
				, this._configuration.cellLabelValue
				, this._colScale
				, this._rowScale
				, this._configuration.spaceBetweenLabelsAndMatrix
			));
			content.push('</g>');
			console.timeEnd('createRows');

			console.time('addToSVG');
			this._elements.svg.innerHTML = content.join('');
			console.timeEnd('addToSVG');




			// Transform column heads (height of them must be known before we can transform them)
			console.time('transformColHeads');
			console.time('transformColHeadsGetHeight');
			let maxLabelHeight 			= document.querySelector('.column-heads').getBoundingClientRect().height;
			console.timeEnd('transformColHeadsGetHeight');

			console.time('transformColHeadsSetPos');
			this._elements.svg.querySelector('.column-heads').style.transform = `translate(0, ${ maxLabelHeight }px)`;
			console.timeEnd('transformColHeadsSetPos');
			console.timeEnd('transformColHeads');

			// Transform matrix body (move down by height of col labels)
			console.time('transformBody');
			this._elements.svg.querySelector('.matrix-body').style.transform = `translate(0, ${ maxLabelHeight + this._configuration.spaceBetweenLabelsAndMatrix }px)`;
			console.timeEnd('transformBody');




			// Set height of svg
			console.time('svgHeight');
			this._elements.svg.style.height = maxLabelHeight + this._configuration.spaceBetweenLabelsAndMatrix + this._rowScale.step() * this._data.length;
			console.timeEnd('svgHeight');




			// Cache cols and rows for faster animations (only read from DOM once)
			console.time('storeDomElements');

			// Objects with key: identifier and value: DOM element resp. [DOM element] for columns (as every column is made up
			// of different cells)
			this._elements.rows = {};
			this._elements.columns = {};

			const rows = this._elements.svg.querySelectorAll('.matrix-row');
			Array.from(rows).forEach((row) => {
				this._elements.rows[row.getAttribute('data-identifier')] = row;
			});

			// Cols: Use all cells and column heads
			const cells = this._elements.svg.querySelectorAll('.matrix-cell, .matrix-column-head');
			Array.from(cells).forEach((cell) => {
				const identifier = cell.getAttribute('data-column-identifier');
				if (!this._elements.columns[identifier]) {
					this._elements.columns[identifier] = [cell];
				}
				else {
					this._elements.columns[identifier].push(cell);
				}
			});

			console.timeEnd('storeDomElements');
			console.log('ResistanceMatrix: Rows are %o, cols %o', this._elements.rows, this._elements.columns);





			// Hovering
			const body = this._elements.svg.querySelector('.matrix-body');
			this._hoveredMatrixCell = undefined;
			this._elements.mouseOver = this._createEmptyMouseOverCell(this._colScale.bandwidth());
			body.appendChild(this._elements.mouseOver);

			// Event handler (mouseover). Don't attach an mouseenter listener to every single cell, 
			// but use a global listener to improve performance
			body.addEventListener('mouseover', (ev) => this._mouseOverHandler(ev));
			body.addEventListener('mouseleave', () => {
				this._elements.mouseOver.style.opacity = 0;
				this._hoveredMatrixCell = undefined;
			});


		}





		_mouseOverHandler(ev) {

			// Get hovered cell (class .matrix-cell)
			let target = ev.target;
			while (!target.classList.contains('matrix-cell') && target.parentNode) {
				target = target.parentNode;
			}

			// Hovered cell did not change
			if (this._hoveredMatrixCell === target) return;

			// Update _hoveredMatrixCell
			this._hoveredMatrixCell = target;

			this._updateMouseOverCell(target);

		}




		_updateMouseOverCell(hoveredCell) {

			const rowIdentifier = hoveredCell.getAttribute('data-row-identifier');
			const colIdentifier = hoveredCell.getAttribute('data-column-identifier');
			//console.log('ResistanceMatrix: Create mouse over cell for %o, col %o row %o', hoveredCell, colIdentifier, rowIdentifier);
			const mouseOver = this._elements.mouseOver;
			mouseOver.style.transform = `translate(${ this._colScale.getPosition(colIdentifier) }px, ${ this._rowScale.getPosition(rowIdentifier) }px)`;
			mouseOver.style.opacity = 1;
			mouseOver.querySelector('text').textContent = hoveredCell.querySelector('text').textContent;
			mouseOver.querySelector('circle').setAttribute('fill', hoveredCell.querySelector('use').getAttribute('fill'));



		}


		/**
		* Creates and returns the mouse over (focused) cell as a <g>. Must be a DOM element in 
		* order to be appendable to SVG.
		*/
		_createEmptyMouseOverCell(cellDimensions) {

			const radius = Math.round(cellDimensions / 2 + 25);

			const g = document.createElementNS(this._svgNS, 'g');
			g.classList.add('mouse-over-cell');
			g.style.pointerEvents = 'none';
			g.style.opacity = 0;
			g.setAttribute('x', 0);
			g.setAttribute('y', 0);
			g.style.cursor = 'pointer';

			// dy = -1em aligns text at top; -1.5 centers top
			g.innerHTML = `
				<circle r='${ radius }'></circle>
				<text text-anchor='middle' alignment-baseline='center' x='0'></text>
			`;

			return g;

		}




		/**
		* Returns (rounded) width of 
		*/
		_getRowLabelMaxWidth() {

			console.time('getRowLabelMaxWidth');

			// Create rows with labels
			const rows = [];
			// Fake row scale as we don't just care at this moment
			const rowScale = this._createScale(this._data, (item) => item, 0, 0, 0);
			this._data.forEach((row) => {
				rows.push(this._createRow(this._createRowLabel(this._configuration.rowLabelValue(row), rowScale, 0), this._configuration.rowIdentifier(row), rowScale));
			});

			// Append labels to <g>, then to SVG
			const g = document.createElementNS(this._svgNS, 'g');
			g.innerHTML = rows.join('');
			this._elements.svg.appendChild(g);

			// Go through labels
			let maxWidth = g.getBoundingClientRect().width;

			// Re-set to previous state (remove g)
			this._elements.svg.removeChild(g);

			console.timeEnd('getRowLabelMaxWidth');

			return Math.ceil(maxWidth);

		}




		/**
		* Creates and returns a scale  which takes an identifier of a column and returns the corresponding position on the 
		* x axis. Needed to simplify things as some cells may be missing.
		*/
		_createScale(values, identifierFunction, offset, width, lineWidth) {

			console.log('ResistanceMatrix: Create scale for values %o, starts at %o, ends at %o, line width %o', values, offset, width, lineWidth);
			// Holds position for item (key is item, value is position)
			const positions = {};
			// Step: Space between one col and the next
			const step = Math.floor((width)/values.length);
			const bandwidth = step - lineWidth;
			values.forEach((item, index) => {
				positions[identifierFunction(item)] = index * step + offset;
			});
			console.log('ResistanceMatrix: Created scale for %o', positions);
			return {
				getPosition		: (item) => positions[item]
				, bandwidth		: () => bandwidth
				, lineWidth		: () => lineWidth
				, step			: () => step
				, offset		: () => offset
			};

		}


		/**
		* Creates a single row label
		*/
		_createRowLabel(value, scale, indentation) {

			return `<text class='row-label' text-anchor='end' y='${ scale.bandwidth() / 2 }' dy='-0.7em' x='${ indentation }'>
					${ value }
				</text>`;

		}


		/**
		* Creates a single row with content and identifier given. Needed to 
		* a) measure the row label's width
		* b) draw the final matrix
		*/
		_createRow(content, identifier, rowScale) {

			return `
				<g class='matrix-row' data-identifier='${ identifier }' style='transform:translate(0, ${ rowScale.getPosition(identifier) }px)'>
					${ content }
				</g>`.replace(/[\n\r]/g, '');

		}



		/**
		* Creates all rows
		*/
		_createRows(data, transformer, valueFunction, rowIdentifierFunction, columnIdentifier, colorValue, labelValue,  colScale, rowScale, spaceBetweenLabelsAndMatrix) {
			
			console.log('ResistanceMatrix: Draw rows with data %o, transformer %o, value %o, identifier %o, scale %o', data, transformer, valueFunction, rowIdentifierFunction, colScale);	

			const rows = [];
			data.forEach((rowData) => {
				const label = this._createRowLabel(valueFunction(rowData), rowScale, colScale.offset() - spaceBetweenLabelsAndMatrix);
				const cells = this._createCellsForRow(transformer(rowData), columnIdentifier, rowIdentifierFunction(rowData), colorValue, labelValue, colScale);
				rows.push(this._createRow(label + cells, rowIdentifierFunction(rowData), rowScale));
			});
			return rows.join('');

		}



		/**
		* Creates a set of cells for a certain row
		*/
		_createCellsForRow(data, columnIdentifierFunction, rowIdentifier, colorValue, labelValue, scale) {
			const cells = [];
			data.forEach((cellDatum) => {

				// Empty label: Don't draw
				if (labelValue(cellDatum) === undefined) {
					return;
				}

				// y position: Go down by half of the circle's size, then up by half the font's size – should be 
				// vertically aligned in the middle
				cells.push(`
					<g class='matrix-cell' style='transform:translate(${ scale.getPosition(columnIdentifierFunction(cellDatum)) }px,0)' data-column-identifier='${ columnIdentifierFunction(cellDatum) }' data-row-identifier='${ rowIdentifier }'>
						<use xlink:href='#cell-circle-def' fill='${ colorValue(cellDatum) }'></use>
						<text text-anchor='middle' x='0' y='0.1em' style='alignment-baseline:middle'>${ labelValue(cellDatum) }</text>
					</g>
				`);
			});
			return cells.join('');
		}



		/**
		* Creates all column heads including the wrapping <g>
		*/
		_createColHeads(data, textFunction, identifierFunction, scale) {
			console.log('ResistanceMatrix: Create col heads with data %o, text %o, identifier %o, space %o', data, textFunction, identifierFunction, scale);
			const heads = [];
			heads.push(`<g class='column-heads'>`);
			data.forEach((head) => {
				heads.push(this._createColHead(textFunction(head), identifierFunction(head), scale.getPosition(identifierFunction(head))));
			});
			heads.push('</g>');
			return heads.join('');
		}



		/**
		* Creates a single column head
		*/
		_createColHead(value, identifier, left) {
			return `
				<g class='matrix-column-head' data-column-identifier='${ identifier }' style='transform: translate(${ left }px, 0)'>
					<text style='transform:rotate(-45deg)'>${ value }</text>
				</g>
			`;
		}



		/**
		* Creates the definitions for the circles in a cell. 
		*/
		_createCellCircleDefs(dimensions) {

			const roundedRadius = Math.floor(dimensions / 2);

			return `
				<defs>
					<circle id='cell-circle-def' r='${ roundedRadius }' fill='inherit' stroke-width='inherit' stroke='inherit'></circle>
				</defs>
			`;

		}



		/**
		* Returns the SVG's width 
		* @return {Number}
		*/
		_getSvgWidth() {
			return this._elements.svg.getBoundingClientRect().width;
		}



		/**
		* Creates and returns a single row label. Needed to first measure and then
		* draw it at the right place
		*/
		_createSingleRowLabel(element) {

			return element
				.append('text')
				.attr('class', 'row-label')
				.attr('text-anchor', 'end')
				.text(this._configuration.rowLabelValue);

		}


		/**
		* Creates and returns the SVG
		*/
		_createSVG() {

			const svg = document.createElementNS(this._svgNS, 'svg');
			return svg;

		}


	}

	window.infect = window.infect || {};
	window.infect.ResistanceMatrix = ResistanceMatrix;

})();

