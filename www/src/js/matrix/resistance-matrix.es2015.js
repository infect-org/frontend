(() => {

	/* global window, document, DOMParser, Node */

	/**
	* @TODO: 
	* - Outsource MouseOverCircle
	* - Split base up into generator (returns text) and instance (filters)
	* - Use multiple files
	* - Only watch changed files
	*/

	/**
	* IE11 has huge problems with today's SVG standards: 
	* - does not know CSS transforms
	* - does not know innerHTML
	*
	* This class provides basic fallbacks without being too fancy or imperformant.
	*/
	class SVGHelper {

		constructor() {

			this._supportsCSSTransforms = this._browserSupportsCSSTransforms();

		}


		/**
		* Set element.transform to values provided (IE11) resp. use the CSS transform propertiy (all 
		* current browsers). We don't want to use the transform attribute as it is not transitionable
		* (cannot be transitioned through CSS)
		* 
		* @param {HTMLElement|undefined} element		Element to perform transformation on; if none is passed in, 
		*												(e.g. if value needs to be set on a String, not an element), 
		*												object is returned with properties 'style' and 'attribute' and
		*												corresponding values, for good browsers e.g.:
		*												{attribute: '', style: 'translate(0px, 20px)'}
		* @param {Object} translation					Properties supported: x and y (undefined is turned into 0)
		* @param {Number} rotation						Rotation (in deg)
		*/
		setTransformation(element, translation, rotation) {
			
			let values = this._getTransformationValues(translation, rotation);

			// element is HTMLElement
			if (element) {
				if (this._supportsCSSTransforms) {
					element.style.transform = values;
				}
				else {
					element.setAttribute('transform', values);
				}
			}

			// Return object with attribute and style properties (see @param element above)
			else {
				return {
					attribute		: this._supportsCSSTransforms ? '' : values
					, style			: this._supportsCSSTransforms ? ('transform:' + values) : ''
				};
			}

		}



		/**
		* Returns the values for a transformation
		*/
		_getTransformationValues(translation, rotation) {
	
			let values = [];
			if (this._supportsCSSTransforms) {
				if (translation) values.push(`translate(${ translation.x || 0 }px, ${ translation.y || 0 }px)`);
				if (rotation !== undefined) values.push(`rotate(${ rotation }deg)`);
			}
			else {
				if (translation) values.push(`translate(${ translation.x || 0 } ${ translation.y || 0 })`);
				if (rotation !== undefined) values.push(`rotate(${ rotation })`);
			}

			return values.join(' ');

		}



		/**
		* Returns true if browser supports CSS transforms on SVG elements, else false.
		*/
		_browserSupportsCSSTransforms() {
			const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			return 'transform' in svg;
		}



		/**
		* IE11 does not support innerHTML on SVG elements, needs a work around. 
		* @param {HTMLElement} element			Element that content should be set on (element.innerHTML = content)
		* @param {String} content				Content to add to element
		*/
		setSVGContent(element, content) {

			// Normal browsers
			if (this._browserSupportsSvgInnerHTML()) {
				element.innerHTML = content;
			}

			// Stupid browsers (AKA IE11) 
			// See http://stackoverflow.com/questions/9723422/is-there-some-innerhtml-replacement-in-svg-xml
			else {
				const xmlString = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'>' + content + '</svg>';
				const doc = new DOMParser().parseFromString(xmlString, 'application/xml');
				const imported = element.ownerDocument.importNode(doc.documentElement, true);
				Array.from(imported.childNodes).forEach((child) => {
					if (child.nodeType !== Node.ELEMENT_NODE) return;
					element.appendChild(child);
				});
			}

		}



		/**
		* IE11 does not support innerHTML on SVGs. Check browser support.
		*/
		_browserSupportsSvgInnerHTML() {

			const svg = document.createElementNS(this._svgNS, 'svg');
			svg.innerHTML = '<g></g>';
			return svg.querySelectorAll('g').length === 1;

		}


	}





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

			this._svgHelper		= new SVGHelper();

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
		* Sets visibility class on element and updates its position (through transform)
		*/
		_updatePositionAndVisibility(element, xPos, yPos, visible) {

			const classes = ['visible', 'hidden']
				, classIndex = visible ? 0 : 1;

			element.classList.remove(classes[Math.abs(classIndex - 1)]);
			element.classList.add(classes[classIndex]);

			this._svgHelper.setTransformation(element, {x: xPos, y: yPos});

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

				this._updatePositionAndVisibility(row, 0, pos, pos !== undefined);

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

				this._elements.columns[colId].forEach((element) => {
					this._updatePositionAndVisibility(element, pos, 0, pos !== undefined);
				});


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
				this._container.appendChild(this._elements.svg);
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
			this._svgHelper.setSVGContent(this._elements.svg, content.join(''));
			console.timeEnd('addToSVG');




			// Transform column heads (height of them must be known before we can transform them)
			console.time('transformColHeads');
			console.time('transformColHeadsGetHeight');
			const colHeads = document.querySelectorAll('.column-head');
			let maxLabelHeight = 0;
			Array.from(colHeads).forEach((head) => {
				maxLabelHeight = Math.max(maxLabelHeight, head.getBoundingClientRect().width);
			});
			console.log('ResistanceMatrix: Max col head width is %o', maxLabelHeight);
			console.timeEnd('transformColHeadsGetHeight');

			console.time('transformColHeadsSetPos');

			// Stupid f...(ill in the blanks) IE11 does not know CSS transforms – needs attribute instead, see
			// http://stackoverflow.com/questions/23047098/css-translate-not-working-in-ie11-on-svg-g
			this._svgHelper.setTransformation(this._elements.svg.querySelector('.column-heads'), { x: 0, y: Math.ceil(maxLabelHeight) });
			console.timeEnd('transformColHeadsSetPos');
			console.timeEnd('transformColHeads');

			// Transform matrix body (move down by height of col labels)
			console.time('transformBody');
			this._svgHelper.setTransformation(this._elements.svg.querySelector('.matrix-body'), { x: 0, y: Math.ceil(maxLabelHeight + this._configuration.spaceBetweenLabelsAndMatrix) });
			console.timeEnd('transformBody');




			// Set height of svg
			console.time('svgHeight');
			const height  = maxLabelHeight + this._configuration.spaceBetweenLabelsAndMatrix + this._rowScale.step() * this._data.length;
			this._elements.svg.style.height = height + 'px';
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
			const cells = this._elements.svg.querySelectorAll('.matrix-cell, .column-head');
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
			this._elements.hoveredMatrixCell = undefined;
			this._elements.mouseOver = this._createEmptyMouseOverCell(this._colScale.bandwidth());
			body.appendChild(this._elements.mouseOver);

			// Event handler (mouseover). Don't attach an mouseenter listener to every single cell, 
			// but use a global listener to improve performance
			body.addEventListener('mouseover', (ev) => this._mouseOverHandler(ev));
			body.addEventListener('mouseleave', (ev) => this._mouseOutHandler(ev));

		}



		/**
		* Handler for mouseleave
		*/
		_mouseOutHandler() {

			this._elements.mouseOver.style.opacity = 0;
			this._elements.hoveredMatrixCell = undefined;

			this._degradeHighlightedHeaders();

		}



		/**
		* Removes the .active class from the currently hovered colum and row
		*/
		_degradeHighlightedHeaders() {

			const rowHead = this._elements.hoveredRowHead;
			const colHead = this._elements.hoveredColumnHead;

			window.requestAnimationFrame(() => {
				if (rowHead) rowHead.classList.remove('active');
				if (colHead) colHead.classList.remove('active');
			});

		}


		/**
		* Handler for mouse over cell
		*/
		_mouseOverHandler(ev) {

			// Get hovered cell (class .matrix-cell)
			let target = ev.target;

			while (target.parentNode) {
				// Prevent errors by continuing on missing classList (IE11)
				if (!target.classList) continue;
				// This is what we want: Get .matrix-cell
				if (target.classList.contains('matrix-cell')) break;
				// Go up
				target = target.parentNode;
			}

			// Undefined (target was document)
			if (!target || target === document) return;

			// Hovered cell did not change
			if (this._elements.hoveredMatrixCell === target) return;

			// Update _hoveredMatrixCell
			this._elements.hoveredMatrixCell = target;

			//console.error(target);
			this._updateMouseOverCell(target);

			this._degradeHighlightedHeaders();
			this._highlightHeaders(target);

		}



		/**
		* Highlights headers of currently hovered row/col
		*/
		_highlightHeaders(hoveredCell) {

			const rowHead = hoveredCell.parentNode.querySelector('.row-label');
			this._elements.hoveredRowHead = rowHead;

			const colId = hoveredCell.getAttribute('data-column-identifier');
			const colHead = this._elements.svg.querySelector(`.column-head[data-column-identifier=${ colId }]`);
			this._elements.hoveredColumnHead = colHead;

			window.requestAnimationFrame(() => {
				rowHead.classList.add('active');
				colHead.classList.add('active');
			});

		}





		_updateMouseOverCell(hoveredCell) {

			const rowIdentifier = hoveredCell.getAttribute('data-row-identifier');
			const colIdentifier = hoveredCell.getAttribute('data-column-identifier');
			//console.log('ResistanceMatrix: Create mouse over cell for %o, col %o row %o', hoveredCell, colIdentifier, rowIdentifier);
			const mouseOver = this._elements.mouseOver;
			this._svgHelper.setTransformation(mouseOver, { x: this._colScale.getPosition(colIdentifier), y: this._rowScale.getPosition(rowIdentifier) });
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
			const content = `
				<circle style='cursor:pointer' r='${ radius }'></circle>
				<text  style='cursor:pointer' text-anchor='middle' alignment-baseline='central' x='0' y='0'></text>
			`;

			this._svgHelper.setSVGContent(g, content);
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
			this._svgHelper.setSVGContent(g, rows.join(''));
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

			const transformation = this._svgHelper.setTransformation(null, { x: 0, y: rowScale.getPosition(identifier) });

			return `
				<g class='matrix-row visible' data-identifier='${ identifier }' transform='${ transformation.attribute }' style='${ transformation.style }'>
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

				const transformation = this._svgHelper.setTransformation(null, {x: scale.getPosition(columnIdentifierFunction(cellDatum)), y: 0});

				// y position: Go down by half of the circle's size, then up by half the font's size – should be 
				// vertically aligned in the middle
				cells.push(`
					<g class='matrix-cell' transform='${ transformation.attribute }' data-column-identifier='${ columnIdentifierFunction(cellDatum) }' data-row-identifier='${ rowIdentifier }' style='${transformation.style}'>
						<use xlink:href='#cell-circle-def' fill='${ colorValue(cellDatum) }'></use>
						<text text-anchor='middle' x='0' y='0' alignment-baseline='central'>${ labelValue(cellDatum) }</text>
					</g>
				`);

						// Used for new product draft (sample size n defines radius)
						//<circle r='${ 8 + Math.round(Math.random()) * 5 }' fill='${ colorValue(cellDatum) }'></circle>

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

			const transformation = this._svgHelper.setTransformation(null, { x: left, y: 0 })
				, rotation = this._svgHelper.setTransformation(null, null, -45);

			return `
				<g class='column-head' data-column-identifier='${ identifier }' transform='${ transformation.attribute }' style='${ transformation.style }'>
					<text transform='${ rotation.attribute }' style='${ rotation.style }'>${ value }</text>
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

