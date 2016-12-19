'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

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
	var SVGHelper = function () {
		function SVGHelper() {
			_classCallCheck(this, SVGHelper);

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


		_createClass(SVGHelper, [{
			key: 'setTransformation',
			value: function setTransformation(element, translation, rotation) {

				var values = this._getTransformationValues(translation, rotation);

				// element is HTMLElement
				if (element) {
					if (this._supportsCSSTransforms) {
						element.style.transform = values;
					} else {
						element.setAttribute('transform', values);
					}
				}

				// Return object with attribute and style properties (see @param element above)
				else {
						return {
							attribute: this._supportsCSSTransforms ? '' : values,
							style: this._supportsCSSTransforms ? 'transform:' + values : ''
						};
					}
			}

			/**
   * Returns the values for a transformation
   */

		}, {
			key: '_getTransformationValues',
			value: function _getTransformationValues(translation, rotation) {

				var values = [];
				if (this._supportsCSSTransforms) {
					if (translation) values.push('translate(' + (translation.x || 0) + 'px, ' + (translation.y || 0) + 'px)');
					if (rotation !== undefined) values.push('rotate(' + rotation + 'deg)');
				} else {
					if (translation) values.push('translate(' + (translation.x || 0) + ' ' + (translation.y || 0) + ')');
					if (rotation !== undefined) values.push('rotate(' + rotation + ')');
				}

				return values.join(' ');
			}

			/**
   * Returns true if browser supports CSS transforms on SVG elements, else false.
   */

		}, {
			key: '_browserSupportsCSSTransforms',
			value: function _browserSupportsCSSTransforms() {
				var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				return 'transform' in svg;
			}

			/**
   * IE11 does not support innerHTML on SVG elements, needs a work around. 
   * @param {HTMLElement} element			Element that content should be set on (element.innerHTML = content)
   * @param {String} content				Content to add to element
   */

		}, {
			key: 'setSVGContent',
			value: function setSVGContent(element, content) {

				// Normal browsers
				if (this._browserSupportsSvgInnerHTML()) {
					element.innerHTML = content;
				}

				// Stupid browsers (AKA IE11) 
				// See http://stackoverflow.com/questions/9723422/is-there-some-innerhtml-replacement-in-svg-xml
				else {
						var xmlString = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'>' + content + '</svg>';
						var doc = new DOMParser().parseFromString(xmlString, 'application/xml');
						var imported = element.ownerDocument.importNode(doc.documentElement, true);
						Array.from(imported.childNodes).forEach(function (child) {
							if (child.nodeType !== Node.ELEMENT_NODE) return;
							element.appendChild(child);
						});
					}
			}

			/**
   * IE11 does not support innerHTML on SVGs. Check browser support.
   */

		}, {
			key: '_browserSupportsSvgInnerHTML',
			value: function _browserSupportsSvgInnerHTML() {

				var svg = document.createElementNS(this._svgNS, 'svg');
				svg.innerHTML = '<g></g>';
				return svg.querySelectorAll('g').length === 1;
			}
		}]);

		return SVGHelper;
	}();

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


	var ResistanceMatrix = function () {

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
		function ResistanceMatrix(container, data) {
			var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			_classCallCheck(this, ResistanceMatrix);

			if (!container) {
				throw new Error('ResistanceMatrix: Container must be passed to constructor.');
			}

			if (!data) {
				throw new Error('ResistanceMatrix: Data needed in constructor');
			}

			this._container = container;
			this._data = data;
			this._svgNS = 'http://www.w3.org/2000/svg';

			this._svgHelper = new SVGHelper();

			this._configuration = {
				spaceBetweenLabelsAndMatrix: config.spaceBetweenLabelsAndMatrix || 20,
				transitionDuration: config.transitionDuration || 900,
				lineWidth: config.lineWidth || 2,
				cellColorValue: config.cellColorValue || function () {
					return 1;
				},
				cellLabelValue: config.cellLabelValue || function () {
					return '–';
				},
				rowIdentifier: config.rowIdentifier || 'n/a',
				rowLabelValue: config.rowLabelValue || function () {
					return 'n/a';
				},
				columnLabelValue: config.columnLabelValue || function () {
					return 'n/a';
				},
				columnHeaderTransformer: config.columnHeaderTransformer || function (item) {
					return item;
				},
				columnIdentifier: config.columnIdentifier || function (item) {
					return item;
				}
				// Returns value for rows on each data item
				, rowDataTransformer: config.rowDataTransformer || function (item) {
					return item;
				},
				rowHidden: config.rowHidden || function () {
					return false;
				},
				columnHidden: config.columnHidden || function () {
					return false;
				}
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


		_createClass(ResistanceMatrix, [{
			key: 'updateData',
			value: function updateData(data) {
				var _this = this;

				console.time('updateData');

				this._data = data;
				console.log('ResistanceMatrix: Update data to %o', data);

				// Cols
				var visibleCols = this._configuration.columnHeaderTransformer(this._data).filter(function (item) {
					return !_this._configuration.columnHidden(item);
				});
				console.log('ResistanceMatrix: Visible cols', visibleCols.length);

				var colScale = this._createScale(visibleCols, this._configuration.columnIdentifier, this._colScale.offset(), this._defaultStep * visibleCols.length, this._configuration.lineWidth);

				this._updateColumnPositionAndVisibility(colScale);

				// Rows
				var visibleRows = this._data.filter(function (item) {
					return !_this._configuration.rowHidden(item);
				});
				console.log('ResistanceMatrix: Visible rows %o', visibleRows.length);
				var rowScale = this._createScale(visibleRows, this._configuration.rowIdentifier, 0, this._defaultStep * visibleRows.length, this._configuration.lineWidth);

				this._updateRowPositionsAndVisibility(rowScale);

				// Update scales
				this._colScale = colScale;
				this._rowScale = rowScale;

				console.timeEnd('updateData');
			}

			/**
   * Sets visibility class on element and updates its position (through transform)
   */

		}, {
			key: '_updatePositionAndVisibility',
			value: function _updatePositionAndVisibility(element, xPos, yPos, visible) {

				var classes = ['visible', 'hidden'],
				    classIndex = visible ? 0 : 1;

				element.classList.remove(classes[Math.abs(classIndex - 1)]);
				element.classList.add(classes[classIndex]);

				this._svgHelper.setTransformation(element, { x: xPos, y: yPos });
			}

			/**
   * Updates the row's position and visibility to match filters
   */

		}, {
			key: '_updateRowPositionsAndVisibility',
			value: function _updateRowPositionsAndVisibility(scale) {
				var _this2 = this;

				console.time('updateRowPos');

				var rowIds = Object.keys(this._elements.rows);
				rowIds.forEach(function (rowId) {

					var pos = scale.getPosition(rowId),
					    row = _this2._elements.rows[rowId];

					_this2._updatePositionAndVisibility(row, 0, pos, pos !== undefined);
				});

				console.timeEnd('updateRowPos');
			}

			/**
   * Updates the col's position and visibility to match filters
   */

		}, {
			key: '_updateColumnPositionAndVisibility',
			value: function _updateColumnPositionAndVisibility(scale) {
				var _this3 = this;

				console.time('updateColPos');

				// Remove all columns that are not visible any more
				var colIds = Object.keys(this._elements.columns);
				colIds.forEach(function (colId) {

					var pos = scale.getPosition(colId);

					_this3._elements.columns[colId].forEach(function (element) {
						_this3._updatePositionAndVisibility(element, pos, 0, pos !== undefined);
					});
				});

				console.timeEnd('updateColPos');
			}

			/**
   * Main method. Draws the matrix with data and container provided.
   */

		}, {
			key: '_drawMatrix',
			value: function _drawMatrix() {
				var _this4 = this;

				// Create new SVG
				if (!this._elements.svg) {
					this._elements.svg = this._createSVG();
					this._container.appendChild(this._elements.svg);
				}
				// Empty existing SVG
				else {
						this._elements.svg.innerHTML = '';
					}

				var rowLabelMaxWidth = this._getRowLabelMaxWidth();

				// Create scale for columns
				var left = rowLabelMaxWidth + this._configuration.spaceBetweenLabelsAndMatrix;
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
				var content = [];

				// Create circle <defs>
				console.time('createCircleDefs');
				content.push(this._createCellCircleDefs(this._colScale.bandwidth()));
				console.timeEnd('createCircleDefs');

				// Create Column heads			
				console.time('createColHeads');
				content.push(this._createColHeads(this._configuration.columnHeaderTransformer(this._data), this._configuration.columnLabelValue, this._configuration.columnIdentifier, this._colScale));
				console.timeEnd('createColHeads');

				// Create rows
				console.time('createRows');
				content.push('<g class=\'matrix-body\'>');
				content.push(this._createRows(this._data, this._configuration.rowDataTransformer, this._configuration.rowLabelValue, this._configuration.rowIdentifier, this._configuration.columnIdentifier, this._configuration.cellColorValue, this._configuration.cellLabelValue, this._colScale, this._rowScale, this._configuration.spaceBetweenLabelsAndMatrix));
				content.push('</g>');
				console.timeEnd('createRows');

				console.time('addToSVG');
				this._svgHelper.setSVGContent(this._elements.svg, content.join(''));
				console.timeEnd('addToSVG');

				// Transform column heads (height of them must be known before we can transform them)
				console.time('transformColHeads');
				console.time('transformColHeadsGetHeight');
				var colHeads = document.querySelectorAll('.column-head');
				var maxLabelHeight = 0;
				Array.from(colHeads).forEach(function (head) {
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
				var height = maxLabelHeight + this._configuration.spaceBetweenLabelsAndMatrix + this._rowScale.step() * this._data.length;
				this._elements.svg.style.height = height + 'px';
				console.timeEnd('svgHeight');

				// Cache cols and rows for faster animations (only read from DOM once)
				console.time('storeDomElements');

				// Objects with key: identifier and value: DOM element resp. [DOM element] for columns (as every column is made up
				// of different cells)
				this._elements.rows = {};
				this._elements.columns = {};

				var rows = this._elements.svg.querySelectorAll('.matrix-row');
				Array.from(rows).forEach(function (row) {
					_this4._elements.rows[row.getAttribute('data-identifier')] = row;
				});

				// Cols: Use all cells and column heads
				var cells = this._elements.svg.querySelectorAll('.matrix-cell, .column-head');
				Array.from(cells).forEach(function (cell) {
					var identifier = cell.getAttribute('data-column-identifier');
					if (!_this4._elements.columns[identifier]) {
						_this4._elements.columns[identifier] = [cell];
					} else {
						_this4._elements.columns[identifier].push(cell);
					}
				});

				console.timeEnd('storeDomElements');
				console.log('ResistanceMatrix: Rows are %o, cols %o', this._elements.rows, this._elements.columns);

				// Hovering
				var body = this._elements.svg.querySelector('.matrix-body');
				this._elements.hoveredMatrixCell = undefined;
				this._elements.mouseOver = this._createEmptyMouseOverCell(this._colScale.bandwidth());
				body.appendChild(this._elements.mouseOver);

				// Event handler (mouseover). Don't attach an mouseenter listener to every single cell, 
				// but use a global listener to improve performance
				body.addEventListener('mouseover', function (ev) {
					return _this4._mouseOverHandler(ev);
				});
				body.addEventListener('mouseleave', function (ev) {
					return _this4._mouseOutHandler(ev);
				});
			}

			/**
   * Handler for mouseleave
   */

		}, {
			key: '_mouseOutHandler',
			value: function _mouseOutHandler() {

				this._elements.mouseOver.style.opacity = 0;
				this._elements.hoveredMatrixCell = undefined;

				this._degradeHighlightedHeaders();
			}

			/**
   * Removes the .active class from the currently hovered colum and row
   */

		}, {
			key: '_degradeHighlightedHeaders',
			value: function _degradeHighlightedHeaders() {

				var rowHead = this._elements.hoveredRowHead;
				var colHead = this._elements.hoveredColumnHead;

				window.requestAnimationFrame(function () {
					if (rowHead) rowHead.classList.remove('active');
					if (colHead) colHead.classList.remove('active');
				});
			}

			/**
   * Handler for mouse over cell
   */

		}, {
			key: '_mouseOverHandler',
			value: function _mouseOverHandler(ev) {

				// Get hovered cell (class .matrix-cell)
				var target = ev.target;

				while (target.parentNode) {
					// Prevent errors by continuing on missing classList (IE11)
					if (!target.classList) continue;
					// This is what we want: Get .matrix-cell
					if (target.classList.contains('matrix-cell')) break;
					// Go up
					target = target.parentNode;
				}

				// Undefined (target was document)
				if (!target || target === document) return;

				// Hovered cell did not change
				if (this._elements.hoveredMatrixCell === target) return;

				// Update _hoveredMatrixCell
				this._elements.hoveredMatrixCell = target;

				console.error(target);
				this._updateMouseOverCell(target);

				this._degradeHighlightedHeaders();
				this._highlightHeaders(target);
			}

			/**
   * Highlights headers of currently hovered row/col
   */

		}, {
			key: '_highlightHeaders',
			value: function _highlightHeaders(hoveredCell) {

				var rowHead = hoveredCell.parentNode.querySelector('.row-label');
				this._elements.hoveredRowHead = rowHead;

				var colId = hoveredCell.getAttribute('data-column-identifier');
				var colHead = this._elements.svg.querySelector('.column-head[data-column-identifier=' + colId + ']');
				this._elements.hoveredColumnHead = colHead;

				window.requestAnimationFrame(function () {
					rowHead.classList.add('active');
					colHead.classList.add('active');
				});
			}
		}, {
			key: '_updateMouseOverCell',
			value: function _updateMouseOverCell(hoveredCell) {

				var rowIdentifier = hoveredCell.getAttribute('data-row-identifier');
				var colIdentifier = hoveredCell.getAttribute('data-column-identifier');
				//console.log('ResistanceMatrix: Create mouse over cell for %o, col %o row %o', hoveredCell, colIdentifier, rowIdentifier);
				var mouseOver = this._elements.mouseOver;
				this._svgHelper.setTransformation(mouseOver, { x: this._colScale.getPosition(colIdentifier), y: this._rowScale.getPosition(rowIdentifier) });
				mouseOver.style.opacity = 1;
				mouseOver.querySelector('text').textContent = hoveredCell.querySelector('text').textContent;
				mouseOver.querySelector('circle').setAttribute('fill', hoveredCell.querySelector('use').getAttribute('fill'));
			}

			/**
   * Creates and returns the mouse over (focused) cell as a <g>. Must be a DOM element in 
   * order to be appendable to SVG.
   */

		}, {
			key: '_createEmptyMouseOverCell',
			value: function _createEmptyMouseOverCell(cellDimensions) {

				var radius = Math.round(cellDimensions / 2 + 25);

				var g = document.createElementNS(this._svgNS, 'g');
				g.classList.add('mouse-over-cell');
				g.style.pointerEvents = 'none';
				g.style.opacity = 0;
				g.setAttribute('x', 0);
				g.setAttribute('y', 0);
				g.style.cursor = 'pointer';

				// dy = -1em aligns text at top; -1.5 centers top
				var content = '\n\t\t\t\t<circle style=\'cursor:pointer\' r=\'' + radius + '\'></circle>\n\t\t\t\t<text  style=\'cursor:pointer\' text-anchor=\'middle\' alignment-baseline=\'central\' x=\'0\' y=\'0\'></text>\n\t\t\t';

				this._svgHelper.setSVGContent(g, content);
				return g;
			}

			/**
   * Returns (rounded) width of 
   */

		}, {
			key: '_getRowLabelMaxWidth',
			value: function _getRowLabelMaxWidth() {
				var _this5 = this;

				console.time('getRowLabelMaxWidth');

				// Create rows with labels
				var rows = [];
				// Fake row scale as we don't just care at this moment
				var rowScale = this._createScale(this._data, function (item) {
					return item;
				}, 0, 0, 0);
				this._data.forEach(function (row) {
					rows.push(_this5._createRow(_this5._createRowLabel(_this5._configuration.rowLabelValue(row), rowScale, 0), _this5._configuration.rowIdentifier(row), rowScale));
				});

				// Append labels to <g>, then to SVG
				var g = document.createElementNS(this._svgNS, 'g');
				this._svgHelper.setSVGContent(g, rows.join(''));
				this._elements.svg.appendChild(g);

				// Go through labels
				var maxWidth = g.getBoundingClientRect().width;

				// Re-set to previous state (remove g)
				this._elements.svg.removeChild(g);

				console.timeEnd('getRowLabelMaxWidth');

				return Math.ceil(maxWidth);
			}

			/**
   * Creates and returns a scale  which takes an identifier of a column and returns the corresponding position on the 
   * x axis. Needed to simplify things as some cells may be missing.
   */

		}, {
			key: '_createScale',
			value: function _createScale(values, identifierFunction, _offset, width, _lineWidth) {

				console.log('ResistanceMatrix: Create scale for values %o, starts at %o, ends at %o, line width %o', values, _offset, width, _lineWidth);
				// Holds position for item (key is item, value is position)
				var positions = {};
				// Step: Space between one col and the next
				var _step = Math.floor(width / values.length);
				var _bandwidth = _step - _lineWidth;
				values.forEach(function (item, index) {
					positions[identifierFunction(item)] = index * _step + _offset;
				});
				console.log('ResistanceMatrix: Created scale for %o', positions);
				return {
					getPosition: function getPosition(item) {
						return positions[item];
					},
					bandwidth: function bandwidth() {
						return _bandwidth;
					},
					lineWidth: function lineWidth() {
						return _lineWidth;
					},
					step: function step() {
						return _step;
					},
					offset: function offset() {
						return _offset;
					}
				};
			}

			/**
   * Creates a single row label
   */

		}, {
			key: '_createRowLabel',
			value: function _createRowLabel(value, scale, indentation) {

				return '<text class=\'row-label\' text-anchor=\'end\' y=\'' + scale.bandwidth() / 2 + '\' dy=\'-0.7em\' x=\'' + indentation + '\'>\n\t\t\t\t\t' + value + '\n\t\t\t\t</text>';
			}

			/**
   * Creates a single row with content and identifier given. Needed to 
   * a) measure the row label's width
   * b) draw the final matrix
   */

		}, {
			key: '_createRow',
			value: function _createRow(content, identifier, rowScale) {

				var transformation = this._svgHelper.setTransformation(null, { x: 0, y: rowScale.getPosition(identifier) });

				return ('\n\t\t\t\t<g class=\'matrix-row visible\' data-identifier=\'' + identifier + '\' transform=\'' + transformation.attribute + '\' style=\'' + transformation.style + '\'>\n\t\t\t\t\t' + content + '\n\t\t\t\t</g>').replace(/[\n\r]/g, '');
			}

			/**
   * Creates all rows
   */

		}, {
			key: '_createRows',
			value: function _createRows(data, transformer, valueFunction, rowIdentifierFunction, columnIdentifier, colorValue, labelValue, colScale, rowScale, spaceBetweenLabelsAndMatrix) {
				var _this6 = this;

				console.log('ResistanceMatrix: Draw rows with data %o, transformer %o, value %o, identifier %o, scale %o', data, transformer, valueFunction, rowIdentifierFunction, colScale);

				var rows = [];
				data.forEach(function (rowData) {
					var label = _this6._createRowLabel(valueFunction(rowData), rowScale, colScale.offset() - spaceBetweenLabelsAndMatrix);
					var cells = _this6._createCellsForRow(transformer(rowData), columnIdentifier, rowIdentifierFunction(rowData), colorValue, labelValue, colScale);
					rows.push(_this6._createRow(label + cells, rowIdentifierFunction(rowData), rowScale));
				});
				return rows.join('');
			}

			/**
   * Creates a set of cells for a certain row
   */

		}, {
			key: '_createCellsForRow',
			value: function _createCellsForRow(data, columnIdentifierFunction, rowIdentifier, colorValue, labelValue, scale) {
				var _this7 = this;

				var cells = [];
				data.forEach(function (cellDatum) {

					// Empty label: Don't draw
					if (labelValue(cellDatum) === undefined) {
						return;
					}

					var transformation = _this7._svgHelper.setTransformation(null, { x: scale.getPosition(columnIdentifierFunction(cellDatum)), y: 0 });

					// y position: Go down by half of the circle's size, then up by half the font's size – should be 
					// vertically aligned in the middle
					cells.push('\n\t\t\t\t\t<g class=\'matrix-cell\' transform=\'' + transformation.attribute + '\' data-column-identifier=\'' + columnIdentifierFunction(cellDatum) + '\' data-row-identifier=\'' + rowIdentifier + '\' style=\'' + transformation.style + '\'>\n\t\t\t\t\t\t<use xlink:href=\'#cell-circle-def\' fill=\'' + colorValue(cellDatum) + '\'></use>\n\t\t\t\t\t\t<text text-anchor=\'middle\' x=\'0\' y=\'0\' alignment-baseline=\'central\'>' + labelValue(cellDatum) + '</text>\n\t\t\t\t\t</g>\n\t\t\t\t');
				});
				return cells.join('');
			}

			/**
   * Creates all column heads including the wrapping <g>
   */

		}, {
			key: '_createColHeads',
			value: function _createColHeads(data, textFunction, identifierFunction, scale) {
				var _this8 = this;

				console.log('ResistanceMatrix: Create col heads with data %o, text %o, identifier %o, space %o', data, textFunction, identifierFunction, scale);
				var heads = [];
				heads.push('<g class=\'column-heads\'>');
				data.forEach(function (head) {
					heads.push(_this8._createColHead(textFunction(head), identifierFunction(head), scale.getPosition(identifierFunction(head))));
				});
				heads.push('</g>');
				return heads.join('');
			}

			/**
   * Creates a single column head
   */

		}, {
			key: '_createColHead',
			value: function _createColHead(value, identifier, left) {

				var transformation = this._svgHelper.setTransformation(null, { x: left, y: 0 }),
				    rotation = this._svgHelper.setTransformation(null, null, -45);

				return '\n\t\t\t\t<g class=\'column-head\' data-column-identifier=\'' + identifier + '\' transform=\'' + transformation.attribute + '\' style=\'' + transformation.style + '\'>\n\t\t\t\t\t<text transform=\'' + rotation.attribute + '\' style=\'' + rotation.style + '\'>' + value + '</text>\n\t\t\t\t</g>\n\t\t\t';
			}

			/**
   * Creates the definitions for the circles in a cell. 
   */

		}, {
			key: '_createCellCircleDefs',
			value: function _createCellCircleDefs(dimensions) {

				var roundedRadius = Math.floor(dimensions / 2);

				return '\n\t\t\t\t<defs>\n\t\t\t\t\t<circle id=\'cell-circle-def\' r=\'' + roundedRadius + '\' fill=\'inherit\' stroke-width=\'inherit\' stroke=\'inherit\'></circle>\n\t\t\t\t</defs>\n\t\t\t';
			}

			/**
   * Returns the SVG's width 
   * @return {Number}
   */

		}, {
			key: '_getSvgWidth',
			value: function _getSvgWidth() {
				return this._elements.svg.getBoundingClientRect().width;
			}

			/**
   * Creates and returns the SVG
   */

		}, {
			key: '_createSVG',
			value: function _createSVG() {

				var svg = document.createElementNS(this._svgNS, 'svg');
				return svg;
			}
		}]);

		return ResistanceMatrix;
	}();

	window.infect = window.infect || {};
	window.infect.ResistanceMatrix = ResistanceMatrix;
})();
//# sourceMappingURL=resistance-matrix.es2015.js.map
