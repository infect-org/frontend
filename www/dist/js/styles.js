/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 590);
/******/ })
/************************************************************************/
/******/ ({

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(591);


/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(592);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(594)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/sass-loader/lib/loader.js??ref--1-2!./main.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/sass-loader/lib/loader.js??ref--1-2!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(593)(true);
// imports


// module
exports.push([module.i, "[type='range'] {\n  -webkit-appearance: none;\n  margin: 5px 0;\n  width: 100%; }\n  [type='range']:focus {\n    outline: 0; }\n  [type='range']::-webkit-slider-runnable-track {\n    cursor: pointer;\n    height: 2px;\n    transition: all .2s ease;\n    width: 100%;\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #eceff1;\n    border: 0px solid #929292;\n    border-radius: 5px; }\n  [type='range']::-webkit-slider-thumb {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #cbe162;\n    border: 0px solid #eceff1;\n    border-radius: 5px;\n    cursor: pointer;\n    height: 10px;\n    width: 10px;\n    -webkit-appearance: none;\n    margin-top: -4px; }\n  [type='range']::-moz-range-track {\n    cursor: pointer;\n    height: 2px;\n    transition: all .2s ease;\n    width: 100%;\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #eceff1;\n    border: 0px solid #929292;\n    border-radius: 5px; }\n  [type='range']::-moz-range-thumb {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #cbe162;\n    border: 0px solid #eceff1;\n    border-radius: 5px;\n    cursor: pointer;\n    height: 10px;\n    width: 10px; }\n  [type='range']::-ms-track {\n    cursor: pointer;\n    height: 2px;\n    transition: all .2s ease;\n    width: 100%;\n    background: transparent;\n    border-color: transparent;\n    border-width: 5px 0;\n    color: transparent; }\n  [type='range']::-ms-fill-lower {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #dde3e6;\n    border: 0px solid #929292;\n    border-radius: 10px; }\n  [type='range']::-ms-fill-upper {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #eceff1;\n    border: 0px solid #929292;\n    border-radius: 10px; }\n  [type='range']::-ms-thumb {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #cbe162;\n    border: 0px solid #eceff1;\n    border-radius: 5px;\n    cursor: pointer;\n    height: 10px;\n    width: 10px;\n    margin-top: 0; }\n\nhtml {\n  font-size: 16px;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-size-adjust: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -ms-touch-action: none !important;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"kern\";\n  -webkit-font-feature-settings: \"kern\";\n  -moz-font-feature-settings: \"kern\";\n  -moz-font-feature-settings: \"kern=1\"; }\n\nbody {\n  margin: 0;\n  font-family: \"acumin-pro-condensed\", \"Helvetica Neue\", Arial;\n  line-height: 1.6;\n  color: #000;\n  background-color: #fff;\n  height: 100vh;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  font-size: 18px;\n  line-height: 1.65; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n  input:active, input:focus,\n  button:active,\n  button:focus,\n  select:active,\n  select:focus,\n  textarea:active,\n  textarea:focus {\n    outline: none; }\n\nbutton {\n  background: none;\n  cursor: pointer; }\n\n/*a {\n\t//color: $link-color;\n\t//text-decoration: underline;\n\n\t&:hover {\n\t\tcolor: inherit;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t}\n\n\t&:focus,\n\t&:active {\n\t\tcolor: inherit;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t}\n}*/\n/*img {\n\tvertical-align: middle;\n\t@include responsive-image();\n}*/\n.container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  height: 100vh;\n  width: 100vw; }\n  .container__side-navigation {\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    width: 210px;\n    min-width: 210px; }\n  .container__main {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1; }\n\n.main {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n  .main__header {\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    min-height: 65px; }\n  .main__matrix {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    width: 100vw;\n    overflow: auto; }\n\n.gray {\n  color: #a3a3a3 !important; }\n\n.margin-top {\n  margin-top: 10px !important; }\n\n.top-navigation {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 65px;\n  border-bottom: solid 1px #d3d2cd; }\n  .top-navigation__active-filters {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -webkit-flex-wrap: wrap;\n    -moz-flex-wrap: wrap;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap; }\n  .top-navigation__slider {\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    width: 250px;\n    min-height: inherit;\n    padding-right: 20px; }\n  .top-navigation__info {\n    background-color: red;\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    width: 200px;\n    min-height: inherit; }\n\n.side-navigation {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  background-color: #363636; }\n  .side-navigation__header {\n    z-index: 2;\n    background-color: #363636; }\n  .side-navigation__filters {\n    height: 100vh;\n    overflow-y: auto; }\n\n.header__logo {\n  height: 65px; }\n\n.logo {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: left;\n  -ms-flex-pack: left;\n  -webkit-justify-content: left;\n  -moz-justify-content: left;\n  justify-content: left;\n  padding-left: 20px;\n  align-items: center;\n  background-color: #616161; }\n  .logo a {\n    height: 45px; }\n    .logo a img {\n      height: 100%; }\n\n.divider {\n  margin: 20px 0;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #575757; }\n  .divider--lead {\n    margin-top: 0; }\n\n.slider {\n  font-size: 12px;\n  text-align: center; }\n  .slider__range {\n    padding: 0; }\n  .slider__label {\n    margin: 0;\n    padding-top: 15px; }\n  .slider__container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-direction: normal;\n    -webkit-box-orient: horizontal;\n    -webkit-flex-direction: row;\n    -moz-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    -webkit-justify-content: center;\n    -moz-justify-content: center;\n    justify-content: center;\n    align-items: center; }\n    .slider__container__before {\n      margin-right: 5px; }\n    .slider__container__range {\n      -webkit-box-flex: 1;\n      -webkit-flex-grow: 1;\n      -moz-flex-grow: 1;\n      -ms-flex-positive: 1;\n      flex-grow: 1; }\n    .slider__container__after {\n      margin-left: 5px; }\n\n.groups {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n  -moz-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  align-items: center; }\n\n.group {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  padding: 0 20px;\n  color: #fff; }\n  .group h1 {\n    font-size: 15px;\n    margin: 0; }\n  .group h2 {\n    font-size: 13px;\n    margin: 0;\n    font-weight: normal; }\n  .group h3 {\n    font-size: 11px;\n    margin: 0; }\n  .group__list {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-direction: normal;\n    -webkit-box-orient: horizontal;\n    -webkit-flex-direction: row;\n    -moz-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -webkit-box-pack: space-evenly;\n    -ms-flex-pack: space-evenly;\n    -webkit-justify-content: space-evenly;\n    -moz-justify-content: space-evenly;\n    justify-content: space-evenly;\n    margin: 0;\n    padding: 0;\n    list-style-type: none; }\n    .group__list--vertical {\n      -webkit-box-direction: normal;\n      -webkit-box-orient: vertical;\n      -webkit-flex-direction: column;\n      -moz-flex-direction: column;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n  .group__list-item {\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    margin-right: 5px; }\n  .group--vertical {\n    -webkit-box-direction: normal;\n    -webkit-box-orient: horizontal;\n    -webkit-flex-direction: row;\n    -moz-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  .group--space-between {\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    -webkit-justify-content: space-between;\n    -moz-justify-content: space-between;\n    justify-content: space-between; }\n  .group--lead {\n    padding-top: 20px;\n    height: 70px; }\n  .group--black-font {\n    color: #000; }\n\n.list-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  .list-item--checkbox {\n    font-size: 11pt; }\n  .list-item:hover .label--rounded {\n    border-top-left-radius: 5px;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 5px;\n    -webkit-border-top-left-radius: 5px;\n    -webkit-border-top-right-radius: 0;\n    -webkit-border-bottom-right-radius: 0;\n    -webkit-border-bottom-left-radius: 5px;\n    -moz-border-radius-topleft: 5px;\n    -moz-border-radius-topright: 0;\n    -moz-border-radius-bottomright: 0;\n    -moz-border-radius-bottomleft: 5px; }\n  .list-item:hover .button {\n    right: 0;\n    transition: right 200ms linear;\n    -webkit-transition: right 200ms linear;\n    -moz-transition: right 200ms linear; }\n\n.label {\n  line-height: 1.3;\n  font-size: 14px;\n  margin: 0; }\n  .label--rounded {\n    padding: 3px 5px;\n    background-color: #d7d5c4;\n    border-radius: 5px 0 0 5px;\n    -webkit-border-radius: 5px 0 0 5px;\n    -moz-border-radius: 5px 0 0 5px;\n    z-index: 2; }\n  .label--small {\n    font-size: 12px; }\n  .label--smaller {\n    font-size: 10px; }\n  .label--large {\n    font-size: 16px; }\n  .label--larger {\n    font-size: 18px; }\n  .label--bold {\n    font-weight: bold; }\n  .label--thin {\n    font-weight: 300; }\n  .label--nomargin {\n    margin: 0; }\n  .label--gray {\n    color: #787677; }\n\n.button {\n  border: none;\n  color: #ffffff; }\n  .button--close {\n    position: relative;\n    background-color: #59291c;\n    padding: 0 20px;\n    border-top-left-radius: 0;\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 0;\n    -webkit-border-top-left-radius: 0;\n    -webkit-border-top-right-radius: 5px;\n    -webkit-border-bottom-right-radius: 5px;\n    -webkit-border-bottom-left-radius: 0;\n    -moz-border-radius-topleft: 0;\n    -moz-border-radius-topright: 5px;\n    -moz-border-radius-bottomright: 5px;\n    -moz-border-radius-bottomleft: 0; }\n    .button--close:hover {\n      background-color: #a52604; }\n    @media only screen and (hover-interaction: hover) {\n      .button--close {\n        padding: 0 10px !important; } }\n  .button--clearall {\n    background-color: #59291c;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n    -webkit-border-top-left-radius: 5px;\n    -webkit-border-top-right-radius: 5px;\n    -webkit-border-bottom-right-radius: 5px;\n    -webkit-border-bottom-left-radius: 5px;\n    -moz-border-radius-topleft: 5px;\n    -moz-border-radius-topright: 5px;\n    -moz-border-radius-bottomright: 5px;\n    -moz-border-radius-bottomleft: 5px; }\n    .button--clearall:hover {\n      background-color: #a52604; }\n  .button--info {\n    background-color: #59291c;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n    -webkit-border-top-left-radius: 5px;\n    -webkit-border-top-right-radius: 5px;\n    -webkit-border-bottom-right-radius: 5px;\n    -webkit-border-bottom-left-radius: 5px;\n    -moz-border-radius-topleft: 5px;\n    -moz-border-radius-topright: 5px;\n    -moz-border-radius-bottomright: 5px;\n    -moz-border-radius-bottomleft: 5px; }\n\n.input {\n  margin: 5px 0 10px 0; }\n\ninput[type=\"checkbox\"] {\n  display: none; }\n\n.side-label {\n  position: relative;\n  padding-left: 20px;\n  cursor: pointer;\n  color: #fff;\n  transition: color 200ms linear;\n  -webkit-transition: color 200ms linear;\n  -moz-transition: color 200ms linear; }\n\n.side-label::before, .side-label::after {\n  content: '';\n  position: absolute;\n  top: 6px;\n  left: 0; }\n\n.side-label::before {\n  display: block;\n  width: 10px;\n  height: 10px;\n  border: 1px solid;\n  border-color: #fff;\n  transition: border-color 200ms linear;\n  -webkit-transition: border-color 200ms linear;\n  -moz-transition: border-color 200ms linear; }\n\n.side-label::after {\n  width: 6px;\n  height: 6px;\n  margin: 3px;\n  background-color: none;\n  transition: background-color 200ms linear;\n  -webkit-transition: background-color 200ms linear;\n  -moz-transition: background-color 200ms linear; }\n\ninput:checked + .side-label::after {\n  background-color: #cbe264; }\n\ninput:hover + .side-label\n, input:hover + .side-label::before\n, input:checked + .side-label\n, input:checked + .side-label::before {\n  color: #cbe264;\n  border-color: #cbe264; }\n\n.button--icon {\n  width: 26px;\n  height: 26px;\n  background-repeat: no-repeat;\n  background-position: center; }\n\n/*.triangle {\n\t//display: none;\n\tposition: relative;\n\twidth: 0;\n\theight: 0;\n\tleft: 3px;\n\tborder-left: 10px solid transparent;\n\tborder-right: 10px solid transparent;\n\tborder-bottom: 10px solid #575757;\n\n\t&:before {\n\t\tcontent: \" \";\n\t\tposition: absolute;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tleft: -9px;\n\t\tmargin-top: 2px;\n\t\tborder-left: 9px solid transparent;\n\t\tborder-right: 9px solid transparent;\n\t\tborder-bottom: 9px solid $sidenavigation-background;\n\t}\n}*/\n.icon1 {\n  background-image: url(/dist/img/icon1.svg);\n  transition: background-image 200ms linear;\n  -webkit-transition: background-image 200ms linear;\n  -moz-transition: background-image 200ms linear; }\n  .icon1:hover {\n    background-image: url(/dist/img/icon1_green.svg); }\n\n.icon2 {\n  width: 30px;\n  height: 30px;\n  background-image: url(/dist/img/icon2.svg);\n  transition: background-image 200ms linear;\n  -webkit-transition: background-image 200ms linear;\n  -moz-transition: background-image 200ms linear; }\n  .icon2:hover {\n    background-image: url(/dist/img/icon2_green.svg); }\n\n.icon3 {\n  background-image: url(/dist/img/icon3.svg);\n  transition: background-image 200ms linear;\n  -webkit-transition: background-image 200ms linear;\n  -moz-transition: background-image 200ms linear; }\n  .icon3:hover {\n    background-image: url(/dist/img/icon3_green.svg); }\n\n.icon4 {\n  background-image: url(/dist/img/icon4.svg);\n  transition: background-image 200ms linear;\n  -webkit-transition: background-image 200ms linear;\n  -moz-transition: background-image 200ms linear; }\n  .icon4:hover {\n    background-image: url(/dist/img/icon4_green.svg); }\n\n.select {\n  width: 170px;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  background: url(/dist/img/arrow_dropdown.png) no-repeat 95% center;\n  transition: background 200ms linear;\n  -webkit-transition: background 200ms linear;\n  -moz-transition: background 200ms linear;\n  margin: 3px 0;\n  padding: 2px 9px;\n  border: 1px solid #fff;\n  transition: border 200ms linear;\n  -webkit-transition: border 200ms linear;\n  -moz-transition: border 200ms linear;\n  border-radius: 3px;\n  color: #fff;\n  transition: color 200ms linear;\n  -webkit-transition: color 200ms linear;\n  -moz-transition: color 200ms linear;\n  font-size: 13px; }\n  .select__option {\n    color: #000; }\n\n.select:hover {\n  border: 1px solid #cbe264;\n  color: #cbe264;\n  background: url(/dist/img/arrow_dropdown_green.png) no-repeat 95% center; }\n\n.select::-ms-expand {\n  display: none;\n  /* hide the default arrow in ie10 and ie11 */ }\n\n.resistanceMatrix {\n  max-width: 2000px;\n  /* or circles are too large */\n  min-width: 1400px;\n  /* or circles are smaller than the font */\n  width: 100%;\n  font-size: 11pt;\n  /**\n    * Resistance Detail (Hover)\n    */ }\n  .resistanceMatrix__bacteriumLabelText {\n    text-anchor: end; }\n  .resistanceMatrix__resistance {\n    cursor: none;\n    pointer-events: visible; }\n  .resistanceMatrix__antibioticLabelText, .resistanceMatrix__bacteriumLabelText {\n    transition: fill 0.2s; }\n    .resistanceMatrix__antibioticLabelText.highlight, .resistanceMatrix__bacteriumLabelText.highlight {\n      fill: #ff623f; }\n  .resistanceMatrix__resistanceDetail {\n    transition: transform 0.2s;\n    pointer-events: none; }\n  .resistanceMatrix__resistanceDetailValueText {\n    font-size: 15pt; }\n  .resistanceMatrix__resistanceDetailValuePercentSign {\n    font-size: 11pt; }\n  .resistanceMatrix__resistanceDetailCircleShadow {\n    fill: #000;\n    opacity: 0.4; }\n\n.search {\n  position: absolute;\n  display: block;\n  left: -210px;\n  transition: left 200ms linear;\n  -webkit-transition: left 200ms linear;\n  -moz-transition: left 200ms linear;\n  top: 155px;\n  z-index: 99;\n  padding: 0;\n  width: 210px;\n  height: 100vw;\n  background-color: #363636; }\n\n.result {\n  padding: 10px 30px;\n  margin: 0;\n  background-color: #d7d5c4; }\n  .result__checkmark {\n    display: block;\n    position: absolute;\n    left: 10px;\n    width: 15px;\n    height: 40px;\n    background: url(/dist/img/checkmark.svg) no-repeat center center; }\n  .result--active {\n    background-color: #fff; }\n  .result:hover {\n    background-color: #fff;\n    cursor: pointer; }\n", "", {"version":3,"sources":["/Users/sandro/joinbox/infect/frontend/www/src/scss/main.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/utils/inputrange.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/base/base.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/utils/variables.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/base/structure.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/bower_components/sass-flex-mixin/_flex.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/base/modifiers.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/top-navigation.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/side-navigation.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/slider.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/filters.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/utils/mixins.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/bower_components/sass-mediaqueries/_media-queries.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/checkbox.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/tab-icon-navigation.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/select.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/matrix.scss","/Users/sandro/joinbox/infect/frontend/www/src/scss/www/src/scss/components/search.scss"],"names":[],"mappings":"AAAA;ECmDE,yBAAwB;EACxB,cAA2B;EAC3B,YAnCgB,EA6FjB;ED3GC;ICoDE,WAAU,EACX;EDnDD;IC4BA,gBAAe;IACf,YAhBgB;IAiBhB,yBAAwB;IACxB,YAnBgB;IAYhB,+CAA6G;IAgC3G,oBAxDiB;IAyDjB,0BAvCwB;IAwCxB,mBAtCc,EAuCf;EDlDD;ICeA,+CAA6G;IAY7G,oBAnCmB;IAoCnB,0BA3B0B;IA4B1B,mBAnCgB;IAoChB,gBAAe;IACf,aApCiB;IAqCjB,YApCgB;IA0Dd,yBAAwB;IACxB,iBAAkF,EACnF;ED9CD;ICSA,gBAAe;IACf,YAhBgB;IAiBhB,yBAAwB;IACxB,YAnBgB;IAYhB,+CAA6G;IA8C3G,oBAtEiB;IAuEjB,0BArDwB;IAsDxB,mBApDc,EAqDf;ED7CD;ICJA,+CAA6G;IAY7G,oBAnCmB;IAoCnB,0BA3B0B;IA4B1B,mBAnCgB;IAoChB,gBAAe;IACf,aApCiB;IAqCjB,YApCgB,EAwEf;EDzCD;ICRA,gBAAe;IACf,YAhBgB;IAiBhB,yBAAwB;IACxB,YAnBgB;IAqEd,wBAAuB;IACvB,0BAAyB;IACzB,oBAAmC;IACnC,mBAAkB,EACnB;EDxCD;ICrBA,+CAA6G;IAiE3G,oBAA2C;IAC3C,0BAxEwB;IAyExB,oBAAgC,EACjC;ED1CD;IC1BA,+CAA6G;IAwE3G,oBAhGiB;IAiGjB,0BA/EwB;IAgFxB,oBAAgC,EACjC;ED5CD;IC/BA,+CAA6G;IAY7G,oBAnCmB;IAoCnB,0BA3B0B;IA4B1B,mBAnCgB;IAoChB,gBAAe;IACf,aApCiB;IAqCjB,YApCgB;IAkGd,cAAa,EACd;;AC9GH;EACC,gBAAe;EACf,oCAAmC;EACnC,+BAA8B;EAE9B,mCAAkC;EAE/B,kCAAiC;EAEpC,mCAAkC;EAClC,8BAA6B;EAC7B,sCAAqC;EACrC,mCAAkC;EAClC,qCAAoC,EAGpC;;AAED;EACC,UAAS;EACT,6DCU2E;EDT3E,iBCUyB;EDTzB,YAAW;EACX,uBAAsB;EACtB,cAAa;EACb,iBAAgB;EAEhB,kCAAiC;EAEjC,gBAAe;EACf,kBAAiB,EACjB;;AAID;;;;EAIC,qBAAoB;EACpB,mBAAkB;EAClB,qBAAoB,EAMpB;EAZD;;;;;;;IAUE,cAAa,EACb;;AAKF;EACC,iBAAgB;EACb,gBAAe,EAClB;;AAGD;;;;;;;;;;;;;;;;GAgBG;AAGH;;;GAGG;AE/EH;EC8DC,qBAAoB;EACpB,sBAAqB;EACrB,mBAAkB;EAClB,qBAAoB;EACpB,cAAa;EAyCZ,8BAA6B;EAC7B,+BAA8B;EAE/B,4BD5G2B;EC6G3B,yBD7G2B;EC8G3B,wBD9G2B;EC+G3B,oBD/G2B;EAC3B,cAAa;EACb,aAAY,EAWZ;EATA;IC6LA,oBD5LqB;IC6LrB,qBD7LqB;IC8LrB,kBD9LqB;IC+LrB,qBD/LqB;ICgMrB,aDhMqB;IACpB,aDa0B;ICZ1B,iBDW8B,ECV9B;EAED;ICuLA,oBDtLqB;ICuLrB,qBDvLqB;ICwLrB,kBDxLqB;ICyLrB,qBDzLqB;IC0LrB,aD1LqB,EACpB;;AAIF;EC4CC,qBAAoB;EACpB,sBAAqB;EACrB,mBAAkB;EAClB,qBAAoB;EACpB,cAAa;EAmCZ,8BAA6B;EAC7B,6BAA4B;EAQ7B,+BD1F8B;EC2F9B,4BD3F8B;EC4F9B,2BD5F8B;EC6F9B,uBD7F8B,EAY9B;EAVA;IC6KA,oBD5KqB;IC6KrB,qBD7KqB;IC8KrB,kBD9KqB;IC+KrB,qBD/KqB;ICgLrB,aDhLqB;IACpB,iBDZ0B,ECa1B;EAED;ICwKA,oBDvKqB;ICwKrB,qBDxKqB;ICyKrB,kBDzKqB;IC0KrB,qBD1KqB;IC2KrB,aD3KqB;IACpB,aAAY;IACZ,eAAc,EACd;;AE/BF;EACC,0BAAyB,EACzB;;AAED;EACC,4BAA2B,EAC3B;;ACND;EF8DC,qBAAoB;EACpB,sBAAqB;EACrB,mBAAkB;EAClB,qBAAoB;EACpB,cAAa;EEhEb,iBJU2B;EIT3B,iCAAgC,EAqBhC;EAnBA;IF8LA,oBE7LqB;IF8LrB,qBE9LqB;IF+LrB,kBE/LqB;IFgMrB,qBEhMqB;IFiMrB,aEjMqB;IF+HrB,wBE9HwB;IF+HxB,qBE/HwB;IFmIvB,oBEnIuB;IFqIxB,gBErIwB,EACvB;EAED;IFyLA,oBExLqB;IFyLrB,qBEzLqB;IF0LrB,kBE1LqB;IF2LrB,qBE3LqB;IF4LrB,aE5LqB;IACpB,aAAY;IACZ,oBAAmB;IACnB,oBAAmB,EACnB;EAED;IACC,sBAAqB;IFiLtB,oBEhLqB;IFiLrB,qBEjLqB;IFkLrB,kBElLqB;IFmLrB,qBEnLqB;IFoLrB,aEpLqB;IACpB,aAAY;IACZ,oBAAmB,EACnB;;ACtBF;EH8DC,qBAAoB;EACpB,sBAAqB;EACrB,mBAAkB;EAClB,qBAAoB;EACpB,cAAa;EAmCZ,8BAA6B;EAC7B,6BAA4B;EAQ7B,+BG5G8B;EH6G9B,4BG7G8B;EH8G9B,2BG9G8B;EH+G9B,uBG/G8B;EAC9B,0BLgBoC,EKJpC;EAVA;IAEC,WAAU;IACV,0BLWmC,EKVnC;EAED;IACC,cAAa;IACb,iBAAgB,EAChB;;AAKD;EACC,aLR0B,EKS1B;;AAYF;EH6BC,qBAAoB;EACpB,sBAAqB;EACrB,mBAAkB;EAClB,qBAAoB;EACpB,cAAa;EA6OZ,uBG5Q4B;EH6Q5B,oBG7Q4B;EH+Q7B,8BG/Q6B;EHgR7B,2BGhR6B;EHiR7B,sBGjR6B;EAC7B,mBAAkB;EAClB,oBAAmB;EACnB,0BL3BwC,EKmCxC;EAbD;IAQE,aAAiC,EAIjC;IAZF;MAUG,aAAY,EACZ;;AAIH;EACC,eAAc;EACd,YAAW;EACX,UAAS;EACT,8BAA6B,EAK7B;EAHA;IACC,cAAa,EACb;;ACxDF;EACC,gBAAe;EACf,mBAAkB,EA8BlB;EA5BA;IACC,WAAU,EACV;EAED;IACC,UAAS;IACT,kBAAiB,EACjB;EAED;IJiDA,qBAAoB;IACpB,sBAAqB;IACrB,mBAAkB;IAClB,qBAAoB;IACpB,cAAa;IAyCZ,8BAA6B;IAC7B,+BAA8B;IAE/B,4BI/F4B;IJgG5B,yBIhG4B;IJiG5B,wBIjG4B;IJkG5B,oBIlG4B;IJgS3B,yBI/R+B;IJgS/B,sBIhS+B;IJkShC,gCIlSgC;IJmShC,6BInSgC;IJoShC,wBIpSgC;IAC/B,oBAAmB,EAcnB;IAZA;MACC,kBAAiB,EACjB;IAED;MJ4KD,oBI3KsB;MJ4KtB,qBI5KsB;MJ6KtB,kBI7KsB;MJ8KtB,qBI9KsB;MJ+KtB,aI/KsB,EACpB;IAED;MACC,iBAAgB,EAEhB;;AC9BH;EL8DC,qBAAoB;EACpB,sBAAqB;EACrB,mBAAkB;EAClB,qBAAoB;EACpB,cAAa;EAmEb,wBKnIuB;ELoIvB,qBKpIuB;ELwItB,oBKxIsB;EL0IvB,gBK1IuB;EACvB,oBAAmB,EACnB;;AAED;ELwDC,qBAAoB;EACpB,sBAAqB;EACrB,mBAAkB;EAClB,qBAAoB;EACpB,cAAa;EAmCZ,8BAA6B;EAC7B,6BAA4B;EAQ7B,+BKtG8B;ELuG9B,4BKvG8B;ELwG9B,2BKxG8B;ELyG9B,uBKzG8B;ELuS7B,yBKtS8B;ELuS9B,sBKvS8B;ELyS/B,gCKzS+B;EL0S/B,6BK1S+B;EL2S/B,wBK3S+B;EAC/B,gBAAe;EACf,YAAW,EA2CX;ECbA;IACC,gBD7B+B;IC8B/B,UAAS,EACT;EACD;IACC,gBAAoB;IACpB,UAAS;IACT,oBAAmB,EACnB;EACD;IACC,gBAAoB;IACpB,UAAS,EACT;EDlCD;IL2CA,qBAAoB;IACpB,sBAAqB;IACrB,mBAAkB;IAClB,qBAAoB;IACpB,cAAa;IAyCZ,8BAA6B;IAC7B,+BAA8B;IAE/B,4BKzF4B;IL0F5B,yBK1F4B;IL2F5B,wBK3F4B;IL4F5B,oBK5F4B;IL0R3B,+BKzRqC;IL0RrC,4BK1RqC;IL4RtC,sCK5RsC;IL6RtC,mCK7RsC;IL8RtC,8BK9RsC;IACrC,UAAS;IACT,WAAU;IAEV,sBAAqB,EAKrB;IAHA;MLyEA,8BAA6B;MAC7B,6BAA4B;MAQ7B,+BKjFgC;MLkFhC,4BKlFgC;MLmFhC,2BKnFgC;MLoFhC,uBKpFgC,EAC9B;EAEF;ILmKA,oBKlKqB;ILmKrB,qBKnKqB;ILoKrB,kBKpKqB;ILqKrB,qBKrKqB;ILsKrB,aKtKqB;IACpB,kBAAiB,EACjB;EAGD;ILqEC,8BAA6B;IAC7B,+BAA8B;IAE/B,4BKvE4B;ILwE5B,yBKxE4B;ILyE5B,wBKzE4B;IL0E5B,oBK1E4B,EAC3B;EAED;ILgQC,0BAAyB;IACzB,uBAAsB;IAOvB,uCKvQuC;ILwQvC,oCKxQuC;ILyQvC,+BKzQuC,EACtC;EAED;IACC,kBAAiB;IACjB,aPzB0B,EO0B1B;EAED;IACC,YAAW,EACX;;AAGF;ELMC,qBAAoB;EACpB,sBAAqB;EACrB,mBAAkB;EAClB,qBAAoB;EACpB,cAAa;EAyCZ,8BAA6B;EAC7B,+BAA8B;EAE/B,4BKpD2B;ELqD3B,yBKrD2B;ELsD3B,wBKtD2B;ELuD3B,oBKvD2B,EA2B3B;EAjBA;IACC,gBAAe,EACf;EAdF;IC9BC,4BDiDkC;IChDlC,2BDgDqC;IC/CrC,8BD+CwC;IC9CxC,+BD8C6C;IC7C7C,oCD6CkC;IC5ClC,mCD4CqC;IC3CrC,sCD2CwC;IC1CxC,uCD0C6C;ICzC7C,gCDyCkC;ICxClC,+BDwCqC;ICvCrC,kCDuCwC;ICtCxC,mCDsC6C,EAC3C;EApBH;IAwBG,SAAQ;IClEV,+BADsD;IAEtD,uCAFsD;IAGtD,oCAHsD,EDsEpD;;AAIH;EACC,iBAAgB;EAChB,gBP3EoC;EO4EpC,UAAS,EAyCT;EAvCA;IACC,iBAAgB;IAChB,0BAAyB;IC1E1B,2BD2EmC;IC1EnC,mCD0EmC;ICzEnC,gCDyEmC;IAClC,WAAU,EACV;EAED;IACC,gBAA+C,EAC/C;EAED;IACC,gBAA+C,EAC/C;EAED;IACC,gBAA6C,EAC7C;EAED;IACC,gBAA6C,EAC7C;EAED;IACC,kBAAiB,EACjB;EAED;IACC,iBAAgB,EAChB;EAED;IACC,UAAS,EACT;EAED;IACC,eAAc,EACd;;AAIF;EACC,aAAY;EACZ,eAAc,EA+Bd;EA7BA;IACC,mBAAkB;IAClB,0BAAyB;IACzB,gBAAe;IClHhB,0BDmH+B;IClH/B,6BDkHoC;ICjHpC,gCDiHyC;IChHzC,6BDgH4C;IC/G5C,kCD+G+B;IC9G/B,qCD8GoC;IC7GpC,wCD6GyC;IC5GzC,qCD4G4C;IC3G5C,8BD2G+B;IC1G/B,iCD0GoC;ICzGpC,oCDyGyC;ICxGzC,iCDwG4C,EAU3C;IAdD;MAOE,0BAAyB,EACzB;IErHD;MF6GD;QAYW,2BAA0B,EAEpC,EAAA;EAED;IACC,0BAAyB;IChI1B,4BDiIiC;IChIjC,6BDgIsC;IC/HtC,gCD+H2C;IC9H3C,+BD8HgD;IC7HhD,oCD6HiC;IC5HjC,qCD4HsC;IC3HtC,wCD2H2C;IC1H3C,uCD0HgD;ICzHhD,gCDyHiC;ICxHjC,iCDwHsC;ICvHtC,oCDuH2C;ICtH3C,mCDsHgD,EAK/C;IAPD;MAKE,0BAAyB,EACzB;EAGF;IACC,0BAAyB;ICzI1B,4BD0IiC;ICzIjC,6BDyIsC;ICxItC,gCDwI2C;ICvI3C,+BDuIgD;ICtIhD,oCDsIiC;ICrIjC,qCDqIsC;ICpItC,wCDoI2C;ICnI3C,uCDmIgD;IClIhD,gCDkIiC;ICjIjC,iCDiIsC;IChItC,oCDgI2C;IC/H3C,mCD+HgD,EAC/C;;AAGF;EACC,qBAAoB,EACpB;;AG1KD;EACE,cAAa,EACd;;AAED;EAEE,mBAAkB;EAElB,mBAAkB;EAClB,gBAAe;EACf,YAAW;EFIZ,+BADsD;EAEtD,uCAFsD;EAGtD,oCAHsD,EEDtD;;AAED;EACE,YAAW;EACX,mBAAkB;EAClB,SAAQ;EACR,QAAO,EACR;;AAGD;EACE,eAAc;EACd,YAAW;EACX,aAAY;EACZ,kBAAiB;EACjB,mBAAkB;EFbnB,sCADsD;EAEtD,8CAFsD;EAGtD,2CAHsD,EEgBtD;;AAGD;EAEE,WAAU;EACV,YAAW;EACX,YAAW;EACX,uBAAsB;EFvBvB,0CADsD;EAEtD,kDAFsD;EAGtD,+CAHsD,EE0BtD;;AAED;EAEE,0BVjBgC,EUkBjC;;AAED;;;;EAIE,eVxBgC;EUyBhC,sBVzBgC,EU0BjC;;AClDD;EACC,YAAW;EACX,aAAY;EACZ,6BAA4B;EAC5B,4BAA2B,EAC3B;;AAED;;;;;;;;;;;;;;;;;;;;;GAqBG;AAIH;EACC,2CAAuB;EHrBvB,0CADsD;EAEtD,kDAFsD;EAGtD,+CAHsD,EG2BtD;EAND;IAIE,iDAAuB,EACvB;;AAGF;EACC,YAAW;EACX,aAAY;EACZ,2CAAuB;EH/BvB,0CADsD;EAEtD,kDAFsD;EAGtD,+CAHsD,EGqCtD;EARD;IAME,iDAAuB,EACvB;;AAGF;EACC,2CAAuB;EHvCvB,0CADsD;EAEtD,kDAFsD;EAGtD,+CAHsD,EG6CtD;EAND;IAIE,iDAAuB,EACvB;;AAGF;EACC,2CAAuB;EH/CvB,0CADsD;EAEtD,kDAFsD;EAGtD,+CAHsD,EGqDtD;EAND;IAIE,iDAAuB,EACvB;;ACjEF;EACC,aAA+B;EAC/B,yBAAwB;EACrB,sBAAqB;EACrB,iBAAgB;EACnB,mEAAkE;EJSlE,oCADsD;EAEtD,4CAFsD;EAGtD,yCAHsD;EINtD,cAAa;EACb,iBAAgB;EAChB,uBAAsB;EJKtB,gCADsD;EAEtD,wCAFsD;EAGtD,qCAHsD;EIFtD,mBAAkB;EAClB,YAAW;EJEX,+BADsD;EAEtD,uCAFsD;EAGtD,oCAHsD;EICtD,gBAAe,EAMf;EAHA;IACC,YAAW,EACX;;AAGF;EACC,0BZlBqB;EYmBrB,eZnBqB;EYoBrB,yEAAwE,EACxE;;AAED;EACI,cAAa;EAAG,6CAA6C,EAChE;;AC9BD;EAEI,kBAAgB;EAAG,8BAA8B;EACjD,kBAAiB;EAAG,0CAA0C;EAC9D,YAAW;EACX,gBAAe;EA+Bf;;MAEE,EAwBL;EAvDG;IACI,iBAAgB,EACnB;EAED;IACI,aAAY;IAGZ,wBAAuB,EAC1B;EASD;IAGI,sBAAqB,EAMxB;IATD;MAMQ,cAAa,EAChB;EAOL;IACI,2BAA0B;IAE1B,qBAAoB,EACvB;EAED;IACI,gBAAe,EAClB;EAED;IACI,gBAAe,EAClB;EAKD;IACI,WAAU;IACV,aAAY,EACf;;ACzDL;EACC,mBAAkB;EAClB,eAAc;EACd,adgB2B;EQP3B,8BADsD;EAEtD,sCAFsD;EAGtD,mCAHsD;EMNtD,WAAoD;EACpD,YAAW;EACX,WAAU;EACV,adW2B;EcV3B,cAAa;EACb,0BdOoC,EcGpC;;AAED;EACC,mBAzBgB;EA0BhB,UAAS;EAET,0BAAyB,EAwBzB;EAtBA;IACC,eAAc;IACd,mBAAkB;IAClB,WAAU;IACV,YAAW;IACX,aAAY;IAEZ,iEAAgE,EAChE;EAED;IACC,uBAAsB,EAKtB;EAtBF;IAyBE,uBAAsB;IACtB,gBAAe,EACf","file":"main.scss","sourcesContent":["[type='range'] {\n  -webkit-appearance: none;\n  margin: 5px 0;\n  width: 100%; }\n  [type='range']:focus {\n    outline: 0; }\n  [type='range']::-webkit-slider-runnable-track {\n    cursor: pointer;\n    height: 2px;\n    transition: all .2s ease;\n    width: 100%;\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #eceff1;\n    border: 0px solid #929292;\n    border-radius: 5px; }\n  [type='range']::-webkit-slider-thumb {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #cbe162;\n    border: 0px solid #eceff1;\n    border-radius: 5px;\n    cursor: pointer;\n    height: 10px;\n    width: 10px;\n    -webkit-appearance: none;\n    margin-top: -4px; }\n  [type='range']::-moz-range-track {\n    cursor: pointer;\n    height: 2px;\n    transition: all .2s ease;\n    width: 100%;\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #eceff1;\n    border: 0px solid #929292;\n    border-radius: 5px; }\n  [type='range']::-moz-range-thumb {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #cbe162;\n    border: 0px solid #eceff1;\n    border-radius: 5px;\n    cursor: pointer;\n    height: 10px;\n    width: 10px; }\n  [type='range']::-ms-track {\n    cursor: pointer;\n    height: 2px;\n    transition: all .2s ease;\n    width: 100%;\n    background: transparent;\n    border-color: transparent;\n    border-width: 5px 0;\n    color: transparent; }\n  [type='range']::-ms-fill-lower {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #dde3e6;\n    border: 0px solid #929292;\n    border-radius: 10px; }\n  [type='range']::-ms-fill-upper {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #eceff1;\n    border: 0px solid #929292;\n    border-radius: 10px; }\n  [type='range']::-ms-thumb {\n    box-shadow: 0px 0px 0px black, 0 0 0px #0d0d0d;\n    background: #cbe162;\n    border: 0px solid #eceff1;\n    border-radius: 5px;\n    cursor: pointer;\n    height: 10px;\n    width: 10px;\n    margin-top: 0; }\n\nhtml {\n  font-size: 16px;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-size-adjust: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -ms-touch-action: none !important;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"kern\";\n  -webkit-font-feature-settings: \"kern\";\n  -moz-font-feature-settings: \"kern\";\n  -moz-font-feature-settings: \"kern=1\"; }\n\nbody {\n  margin: 0;\n  font-family: \"acumin-pro-condensed\", \"Helvetica Neue\", Arial;\n  line-height: 1.6;\n  color: #000;\n  background-color: #fff;\n  height: 100vh;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  font-size: 18px;\n  line-height: 1.65; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n  input:active, input:focus,\n  button:active,\n  button:focus,\n  select:active,\n  select:focus,\n  textarea:active,\n  textarea:focus {\n    outline: none; }\n\nbutton {\n  background: none;\n  cursor: pointer; }\n\n/*a {\n\t//color: $link-color;\n\t//text-decoration: underline;\n\n\t&:hover {\n\t\tcolor: inherit;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t}\n\n\t&:focus,\n\t&:active {\n\t\tcolor: inherit;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t}\n}*/\n/*img {\n\tvertical-align: middle;\n\t@include responsive-image();\n}*/\n.container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  height: 100vh;\n  width: 100vw; }\n  .container__side-navigation {\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    width: 210px;\n    min-width: 210px; }\n  .container__main {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1; }\n\n.main {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n  .main__header {\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    min-height: 65px; }\n  .main__matrix {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    width: 100vw;\n    overflow: auto; }\n\n.gray {\n  color: #a3a3a3 !important; }\n\n.margin-top {\n  margin-top: 10px !important; }\n\n.top-navigation {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 65px;\n  border-bottom: solid 1px #d3d2cd; }\n  .top-navigation__active-filters {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -webkit-flex-wrap: wrap;\n    -moz-flex-wrap: wrap;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap; }\n  .top-navigation__slider {\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    width: 250px;\n    min-height: inherit;\n    padding-right: 20px; }\n  .top-navigation__info {\n    background-color: red;\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    width: 200px;\n    min-height: inherit; }\n\n.side-navigation {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  background-color: #363636; }\n  .side-navigation__header {\n    z-index: 2;\n    background-color: #363636; }\n  .side-navigation__filters {\n    height: 100vh;\n    overflow-y: auto; }\n\n.header__logo {\n  height: 65px; }\n\n.logo {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: left;\n  -ms-flex-pack: left;\n  -webkit-justify-content: left;\n  -moz-justify-content: left;\n  justify-content: left;\n  padding-left: 20px;\n  align-items: center;\n  background-color: #616161; }\n  .logo a {\n    height: 45px; }\n    .logo a img {\n      height: 100%; }\n\n.divider {\n  margin: 20px 0;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #575757; }\n  .divider--lead {\n    margin-top: 0; }\n\n.slider {\n  font-size: 12px;\n  text-align: center; }\n  .slider__range {\n    padding: 0; }\n  .slider__label {\n    margin: 0;\n    padding-top: 15px; }\n  .slider__container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-direction: normal;\n    -webkit-box-orient: horizontal;\n    -webkit-flex-direction: row;\n    -moz-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    -webkit-justify-content: center;\n    -moz-justify-content: center;\n    justify-content: center;\n    align-items: center; }\n    .slider__container__before {\n      margin-right: 5px; }\n    .slider__container__range {\n      -webkit-box-flex: 1;\n      -webkit-flex-grow: 1;\n      -moz-flex-grow: 1;\n      -ms-flex-positive: 1;\n      flex-grow: 1; }\n    .slider__container__after {\n      margin-left: 5px; }\n\n.groups {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n  -moz-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  align-items: center; }\n\n.group {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  padding: 0 20px;\n  color: #fff; }\n  .group h1 {\n    font-size: 15px;\n    margin: 0; }\n  .group h2 {\n    font-size: 13px;\n    margin: 0;\n    font-weight: normal; }\n  .group h3 {\n    font-size: 11px;\n    margin: 0; }\n  .group__list {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-direction: normal;\n    -webkit-box-orient: horizontal;\n    -webkit-flex-direction: row;\n    -moz-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -webkit-box-pack: space-evenly;\n    -ms-flex-pack: space-evenly;\n    -webkit-justify-content: space-evenly;\n    -moz-justify-content: space-evenly;\n    justify-content: space-evenly;\n    margin: 0;\n    padding: 0;\n    list-style-type: none; }\n    .group__list--vertical {\n      -webkit-box-direction: normal;\n      -webkit-box-orient: vertical;\n      -webkit-flex-direction: column;\n      -moz-flex-direction: column;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n  .group__list-item {\n    -webkit-box-flex: 0;\n    -webkit-flex-grow: 0;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    margin-right: 5px; }\n  .group--vertical {\n    -webkit-box-direction: normal;\n    -webkit-box-orient: horizontal;\n    -webkit-flex-direction: row;\n    -moz-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  .group--space-between {\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    -webkit-justify-content: space-between;\n    -moz-justify-content: space-between;\n    justify-content: space-between; }\n  .group--lead {\n    padding-top: 20px;\n    height: 70px; }\n  .group--black-font {\n    color: #000; }\n\n.list-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  .list-item--checkbox {\n    font-size: 11pt; }\n  .list-item:hover .label--rounded {\n    border-top-left-radius: 5px;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 5px;\n    -webkit-border-top-left-radius: 5px;\n    -webkit-border-top-right-radius: 0;\n    -webkit-border-bottom-right-radius: 0;\n    -webkit-border-bottom-left-radius: 5px;\n    -moz-border-radius-topleft: 5px;\n    -moz-border-radius-topright: 0;\n    -moz-border-radius-bottomright: 0;\n    -moz-border-radius-bottomleft: 5px; }\n  .list-item:hover .button {\n    right: 0;\n    transition: right 200ms linear;\n    -webkit-transition: right 200ms linear;\n    -moz-transition: right 200ms linear; }\n\n.label {\n  line-height: 1.3;\n  font-size: 14px;\n  margin: 0; }\n  .label--rounded {\n    padding: 3px 5px;\n    background-color: #d7d5c4;\n    border-radius: 5px 0 0 5px;\n    -webkit-border-radius: 5px 0 0 5px;\n    -moz-border-radius: 5px 0 0 5px;\n    z-index: 2; }\n  .label--small {\n    font-size: 12px; }\n  .label--smaller {\n    font-size: 10px; }\n  .label--large {\n    font-size: 16px; }\n  .label--larger {\n    font-size: 18px; }\n  .label--bold {\n    font-weight: bold; }\n  .label--thin {\n    font-weight: 300; }\n  .label--nomargin {\n    margin: 0; }\n  .label--gray {\n    color: #787677; }\n\n.button {\n  border: none;\n  color: #ffffff; }\n  .button--close {\n    position: relative;\n    background-color: #59291c;\n    padding: 0 20px;\n    border-top-left-radius: 0;\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 0;\n    -webkit-border-top-left-radius: 0;\n    -webkit-border-top-right-radius: 5px;\n    -webkit-border-bottom-right-radius: 5px;\n    -webkit-border-bottom-left-radius: 0;\n    -moz-border-radius-topleft: 0;\n    -moz-border-radius-topright: 5px;\n    -moz-border-radius-bottomright: 5px;\n    -moz-border-radius-bottomleft: 0; }\n    .button--close:hover {\n      background-color: #a52604; }\n    @media only screen and (hover-interaction: hover) {\n      .button--close {\n        padding: 0 10px !important; } }\n  .button--clearall {\n    background-color: #59291c;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n    -webkit-border-top-left-radius: 5px;\n    -webkit-border-top-right-radius: 5px;\n    -webkit-border-bottom-right-radius: 5px;\n    -webkit-border-bottom-left-radius: 5px;\n    -moz-border-radius-topleft: 5px;\n    -moz-border-radius-topright: 5px;\n    -moz-border-radius-bottomright: 5px;\n    -moz-border-radius-bottomleft: 5px; }\n    .button--clearall:hover {\n      background-color: #a52604; }\n  .button--info {\n    background-color: #59291c;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n    -webkit-border-top-left-radius: 5px;\n    -webkit-border-top-right-radius: 5px;\n    -webkit-border-bottom-right-radius: 5px;\n    -webkit-border-bottom-left-radius: 5px;\n    -moz-border-radius-topleft: 5px;\n    -moz-border-radius-topright: 5px;\n    -moz-border-radius-bottomright: 5px;\n    -moz-border-radius-bottomleft: 5px; }\n\n.input {\n  margin: 5px 0 10px 0; }\n\ninput[type=\"checkbox\"] {\n  display: none; }\n\n.side-label {\n  position: relative;\n  padding-left: 20px;\n  cursor: pointer;\n  color: #fff;\n  transition: color 200ms linear;\n  -webkit-transition: color 200ms linear;\n  -moz-transition: color 200ms linear; }\n\n.side-label::before, .side-label::after {\n  content: '';\n  position: absolute;\n  top: 6px;\n  left: 0; }\n\n.side-label::before {\n  display: block;\n  width: 10px;\n  height: 10px;\n  border: 1px solid;\n  border-color: #fff;\n  transition: border-color 200ms linear;\n  -webkit-transition: border-color 200ms linear;\n  -moz-transition: border-color 200ms linear; }\n\n.side-label::after {\n  width: 6px;\n  height: 6px;\n  margin: 3px;\n  background-color: none;\n  transition: background-color 200ms linear;\n  -webkit-transition: background-color 200ms linear;\n  -moz-transition: background-color 200ms linear; }\n\ninput:checked + .side-label::after {\n  background-color: #cbe264; }\n\ninput:hover + .side-label\n, input:hover + .side-label::before\n, input:checked + .side-label\n, input:checked + .side-label::before {\n  color: #cbe264;\n  border-color: #cbe264; }\n\n.button--icon {\n  width: 26px;\n  height: 26px;\n  background-repeat: no-repeat;\n  background-position: center; }\n\n/*.triangle {\n\t//display: none;\n\tposition: relative;\n\twidth: 0;\n\theight: 0;\n\tleft: 3px;\n\tborder-left: 10px solid transparent;\n\tborder-right: 10px solid transparent;\n\tborder-bottom: 10px solid #575757;\n\n\t&:before {\n\t\tcontent: \" \";\n\t\tposition: absolute;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tleft: -9px;\n\t\tmargin-top: 2px;\n\t\tborder-left: 9px solid transparent;\n\t\tborder-right: 9px solid transparent;\n\t\tborder-bottom: 9px solid $sidenavigation-background;\n\t}\n}*/\n.icon1 {\n  background-image: url(/dist/img/icon1.svg);\n  transition: background-image 200ms linear;\n  -webkit-transition: background-image 200ms linear;\n  -moz-transition: background-image 200ms linear; }\n  .icon1:hover {\n    background-image: url(/dist/img/icon1_green.svg); }\n\n.icon2 {\n  width: 30px;\n  height: 30px;\n  background-image: url(/dist/img/icon2.svg);\n  transition: background-image 200ms linear;\n  -webkit-transition: background-image 200ms linear;\n  -moz-transition: background-image 200ms linear; }\n  .icon2:hover {\n    background-image: url(/dist/img/icon2_green.svg); }\n\n.icon3 {\n  background-image: url(/dist/img/icon3.svg);\n  transition: background-image 200ms linear;\n  -webkit-transition: background-image 200ms linear;\n  -moz-transition: background-image 200ms linear; }\n  .icon3:hover {\n    background-image: url(/dist/img/icon3_green.svg); }\n\n.icon4 {\n  background-image: url(/dist/img/icon4.svg);\n  transition: background-image 200ms linear;\n  -webkit-transition: background-image 200ms linear;\n  -moz-transition: background-image 200ms linear; }\n  .icon4:hover {\n    background-image: url(/dist/img/icon4_green.svg); }\n\n.select {\n  width: 170px;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  background: url(/dist/img/arrow_dropdown.png) no-repeat 95% center;\n  transition: background 200ms linear;\n  -webkit-transition: background 200ms linear;\n  -moz-transition: background 200ms linear;\n  margin: 3px 0;\n  padding: 2px 9px;\n  border: 1px solid #fff;\n  transition: border 200ms linear;\n  -webkit-transition: border 200ms linear;\n  -moz-transition: border 200ms linear;\n  border-radius: 3px;\n  color: #fff;\n  transition: color 200ms linear;\n  -webkit-transition: color 200ms linear;\n  -moz-transition: color 200ms linear;\n  font-size: 13px; }\n  .select__option {\n    color: #000; }\n\n.select:hover {\n  border: 1px solid #cbe264;\n  color: #cbe264;\n  background: url(/dist/img/arrow_dropdown_green.png) no-repeat 95% center; }\n\n.select::-ms-expand {\n  display: none;\n  /* hide the default arrow in ie10 and ie11 */ }\n\n.resistanceMatrix {\n  max-width: 2000px;\n  /* or circles are too large */\n  min-width: 1400px;\n  /* or circles are smaller than the font */\n  width: 100%;\n  font-size: 11pt;\n  /**\n    * Resistance Detail (Hover)\n    */ }\n  .resistanceMatrix__bacteriumLabelText {\n    text-anchor: end; }\n  .resistanceMatrix__resistance {\n    cursor: none;\n    pointer-events: visible; }\n  .resistanceMatrix__antibioticLabelText, .resistanceMatrix__bacteriumLabelText {\n    transition: fill 0.2s; }\n    .resistanceMatrix__antibioticLabelText.highlight, .resistanceMatrix__bacteriumLabelText.highlight {\n      fill: #ff623f; }\n  .resistanceMatrix__resistanceDetail {\n    transition: transform 0.2s;\n    pointer-events: none; }\n  .resistanceMatrix__resistanceDetailValueText {\n    font-size: 15pt; }\n  .resistanceMatrix__resistanceDetailValuePercentSign {\n    font-size: 11pt; }\n  .resistanceMatrix__resistanceDetailCircleShadow {\n    fill: #000;\n    opacity: 0.4; }\n\n.search {\n  position: absolute;\n  display: block;\n  left: -210px;\n  transition: left 200ms linear;\n  -webkit-transition: left 200ms linear;\n  -moz-transition: left 200ms linear;\n  top: 155px;\n  z-index: 99;\n  padding: 0;\n  width: 210px;\n  height: 100vw;\n  background-color: #363636; }\n\n.result {\n  padding: 10px 30px;\n  margin: 0;\n  background-color: #d7d5c4; }\n  .result__checkmark {\n    display: block;\n    position: absolute;\n    left: 10px;\n    width: 15px;\n    height: 40px;\n    background: url(/dist/img/checkmark.svg) no-repeat center center; }\n  .result--active {\n    background-color: #fff; }\n  .result:hover {\n    background-color: #fff;\n    cursor: pointer; }\n","// Styling Cross-Browser Compatible Range Inputs with Sass\n// Github: https://github.com/darlanrod/input-range-sass\n// Author: Darlan Rod https://github.com/darlanrod\n// Version 1.4.1\n// MIT License\n\n$track-color: #eceff1 !default;\n$thumb-color: #cbe162 !default;\n\n$thumb-radius: 5px !default;\n$thumb-height: 10px !default;\n$thumb-width: 10px !default;\n$thumb-shadow-size: 0px !default;\n$thumb-shadow-blur: 0px !default;\n$thumb-shadow-color: rgba(0, 0, 0, 1) !default;\n$thumb-border-width: 0px !default;\n$thumb-border-color: #eceff1 !default;\n\n$track-width: 100% !default;\n$track-height: 2px !default;\n$track-shadow-size: 0px !default;\n$track-shadow-blur: 0px !default;\n$track-shadow-color: rgba(0, 0, 0, 1) !default;\n$track-border-width: 0px !default;\n$track-border-color: #929292 !default;\n\n$track-radius: 5px !default;\n$contrast: 5% !default;\n\n@mixin shadow($shadow-size, $shadow-blur, $shadow-color) {\n  box-shadow: $shadow-size $shadow-size $shadow-blur $shadow-color, 0 0 $shadow-size lighten($shadow-color, 5%);\n}\n\n@mixin track {\n  cursor: pointer;\n  height: $track-height;\n  transition: all .2s ease;\n  width: $track-width;\n}\n\n@mixin thumb {\n  @include shadow($thumb-shadow-size, $thumb-shadow-blur, $thumb-shadow-color);\n  background: $thumb-color;\n  border: $thumb-border-width solid $thumb-border-color;\n  border-radius: $thumb-radius;\n  cursor: pointer;\n  height: $thumb-height;\n  width: $thumb-width;\n}\n\n[type='range'] {\n  -webkit-appearance: none;\n  margin: $thumb-height / 2 0;\n  width: $track-width;\n\n  &:focus {\n    outline: 0;\n  }\n\n  &::-webkit-slider-runnable-track {\n    @include track;\n    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);\n    background: $track-color;\n    border: $track-border-width solid $track-border-color;\n    border-radius: $track-radius;\n  }\n\n  &::-webkit-slider-thumb {\n    @include thumb;\n    -webkit-appearance: none;\n    margin-top: ((-$track-border-width * 2 + $track-height) / 2) - ($thumb-height / 2);\n  }\n\n  &::-moz-range-track {\n    @include track;\n    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);\n    background: $track-color;\n    border: $track-border-width solid $track-border-color;\n    border-radius: $track-radius;\n  }\n\n  &::-moz-range-thumb {\n    @include thumb;\n  }\n\n  &::-ms-track {\n    @include track;\n    background: transparent;\n    border-color: transparent;\n    border-width: ($thumb-height / 2) 0;\n    color: transparent;\n  }\n\n  &::-ms-fill-lower {\n    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);\n    background: darken($track-color, $contrast);\n    border: $track-border-width solid $track-border-color;\n    border-radius: $track-radius * 2;\n  }\n\n  &::-ms-fill-upper {\n    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);\n    background: $track-color;\n    border: $track-border-width solid $track-border-color;\n    border-radius: $track-radius * 2;\n  }\n\n  &::-ms-thumb {\n    @include thumb;\n    margin-top: 0;\n  }\n}\n","html {\n\tfont-size: 16px;\n\t-webkit-font-smoothing: antialiased;\n\t-webkit-text-size-adjust: 100%;\n\n\t-moz-osx-font-smoothing: grayscale;\n\n    -ms-touch-action: none !important;\n\n\ttext-rendering: optimizeLegibility;\n\tfont-feature-settings: \"kern\";\n\t-webkit-font-feature-settings: \"kern\";\n\t-moz-font-feature-settings: \"kern\";\n\t-moz-font-feature-settings: \"kern=1\";\n\n\t//@include css3-prefix(hyphens, auto);\n}\n\nbody {\n\tmargin: 0;\n\tfont-family: $font-family--sans-serif;\n\tline-height: $line-height-base;\n\tcolor: #000;\n\tbackground-color: #fff;\n\theight: 100vh;\n\toverflow: hidden;\n\n\t-webkit-overflow-scrolling: touch;\n\n\tfont-size: 18px;\n\tline-height: 1.65;\n}\n\n\n// Reset fonts for relevant elements\ninput,\nbutton,\nselect,\ntextarea {\n\tfont-family: inherit;\n\tfont-size: inherit;\n\tline-height: inherit;\n\n\t&:active,\n\t&:focus {\n\t\toutline: none;\n\t}\n}\n\n\n\nbutton {\n\tbackground: none;\n    cursor: pointer;\n}\n\n// Links\n/*a {\n\t//color: $link-color;\n\t//text-decoration: underline;\n\n\t&:hover {\n\t\tcolor: inherit;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t}\n\n\t&:focus,\n\t&:active {\n\t\tcolor: inherit;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t}\n}*/\n\n// Images\n/*img {\n\tvertical-align: middle;\n\t@include responsive-image();\n}*/\n","//BASE\n$group__title-h1:\t18px;\n$group__title-h2:\t12px;\n$group__title-h3:\t14px;\n\n$hover-color:\t\t#cbe264;\n\n$transition-duration: 200ms;\n\n\n//TOP NAVIGATION\n$navigation-background--lighter: \t#616161;\n$navigation-height: \t\t\t\t65px;\n\n$navigation-button--label-size:\t\t14px;\n$navigation-button--font-size:\t\t26px;\n\n\n//SIDE NAVIGATION\n$sidenavigation-background: \t\t#363636;\n$navigation-min-width: \t\t\t\t210px;\n$navigation-width:\t\t\t\t\t210px;\n$sidenavigation__group__title-size:\t26px;\n$search-box--height:\t\t\t\t70px;\n\n\t//checkbox\n$active__checkbox-color:\t\t\t#cbe264;\n\n\n//BASE\n$font-family--sans-serif: \t\t\t\"acumin-pro-condensed\", \"Helvetica Neue\", Arial;\n$line-height-base:\t\t\t\t\t1.6;",".container {\n\t@include flexbox();\n\t@include flex-direction(row);\n\theight: 100vh;\n\twidth: 100vw;\n\t\n\t&__side-navigation {\n\t\t@include flex-grow(0);\n\t\twidth: $navigation-width;//20vw;\n\t\tmin-width: $navigation-min-width;\n\t}\n\n\t&__main {\n\t\t@include flex-grow(1);\n\t}\n}\n\n\n.main {\n\t@include flexbox();\n\t@include flex-direction(column);\n\n\t&__header {\n\t\t@include flex-grow(0);\n\t\tmin-height: $navigation-height;\n\t}\n\n\t&__matrix {\n\t\t@include flex-grow(1);\n\t\twidth: 100vw;\n\t\toverflow: auto;\n\t}\n}","// Flexbox Mixins\n// http://philipwalton.github.io/solved-by-flexbox/\n// https://github.com/philipwalton/solved-by-flexbox\n// \n// Copyright (c) 2013 Brian Franco\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to\n// permit persons to whom the Software is furnished to do so, subject to\n// the following conditions:\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\n// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY\n// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,\n// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE\n// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n//\n// This is a set of mixins for those who want to mess around with flexbox\n// using the native support of current browsers. For full support table\n// check: http://caniuse.com/flexbox\n//\n// Basically this will use:\n//\n// * Fallback, old syntax (IE10, mobile webkit browsers - no wrapping)\n// * Final standards syntax (FF, Safari, Chrome, IE11, Opera)\n//\n// This was inspired by:\n// \n// * http://dev.opera.com/articles/view/advanced-cross-browser-flexbox/\n// \n// With help from:\n// \n// * http://w3.org/tr/css3-flexbox/\n// * http://the-echoplex.net/flexyboxes/\n// * http://msdn.microsoft.com/en-us/library/ie/hh772069(v=vs.85).aspx\n// * http://css-tricks.com/using-flexbox/\n// * http://dev.opera.com/articles/view/advanced-cross-browser-flexbox/\n// * https://developer.mozilla.org/en-us/docs/web/guide/css/flexible_boxes\n\n//----------------------------------------------------------------------\n\n// Flexbox Containers\n//\n// The 'flex' value causes an element to generate a block-level flex\n// container box.\n//\n// The 'inline-flex' value causes an element to generate a inline-level\n// flex container box. \n//\n// display: flex | inline-flex\n//\n// http://w3.org/tr/css3-flexbox/#flex-containers\n//\n// (Placeholder selectors for each type, for those who rather @extend)\n\n@mixin flexbox {\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -moz-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n}\n\n%flexbox { @include flexbox; }\n\n//----------------------------------\n\n@mixin inline-flex {\n\tdisplay: -webkit-inline-box;\n\tdisplay: -webkit-inline-flex;\n\tdisplay: -moz-inline-flex;\n\tdisplay: -ms-inline-flexbox;\n\tdisplay: inline-flex;\n}\n\n%inline-flex { @include inline-flex; }\n\n//----------------------------------------------------------------------\n\n// Flexbox Direction\n//\n// The 'flex-direction' property specifies how flex items are placed in\n// the flex container, by setting the direction of the flex container's\n// main axis. This determines the direction that flex items are laid out in. \n//\n// Values: row | row-reverse | column | column-reverse\n// Default: row\n//\n// http://w3.org/tr/css3-flexbox/#flex-direction-property\n\n@mixin flex-direction($value: row) {\n\t@if $value == row-reverse {\n\t\t-webkit-box-direction: reverse;\n\t\t-webkit-box-orient: horizontal;\n\t} @else if $value == column {\n\t\t-webkit-box-direction: normal;\n\t\t-webkit-box-orient: vertical;\n\t} @else if $value == column-reverse {\n\t\t-webkit-box-direction: reverse;\n\t\t-webkit-box-orient: vertical;\n\t} @else {\n\t\t-webkit-box-direction: normal;\n\t\t-webkit-box-orient: horizontal;\n\t}\n\t-webkit-flex-direction: $value;\n\t-moz-flex-direction: $value;\n\t-ms-flex-direction: $value;\n\tflex-direction: $value;\n}\n\t// Shorter version:\n\t@mixin flex-dir($args...) { @include flex-direction($args...); }\n\n//----------------------------------------------------------------------\n\n// Flexbox Wrap\n//\n// The 'flex-wrap' property controls whether the flex container is single-line\n// or multi-line, and the direction of the cross-axis, which determines\n// the direction new lines are stacked in. \n//\n// Values: nowrap | wrap | wrap-reverse\n// Default: nowrap\n//\n// http://w3.org/tr/css3-flexbox/#flex-wrap-property\n\n@mixin flex-wrap($value: nowrap) {\n\t// No Webkit Box fallback.\n\t-webkit-flex-wrap: $value;\n\t-moz-flex-wrap: $value;\n\t@if $value == nowrap {\n\t\t-ms-flex-wrap: none;\n\t} @else { \n\t\t-ms-flex-wrap: $value; \n\t}\n\tflex-wrap: $value;\n}\n\n//----------------------------------------------------------------------\n\n// Flexbox Flow (shorthand)\n//\n// The 'flex-flow' property is a shorthand for setting the 'flex-direction'\n// and 'flex-wrap' properties, which together define the flex container's\n// main and cross axes.\n//\n// Values: <flex-direction> | <flex-wrap> \n// Default: row nowrap\n//\n// http://w3.org/tr/css3-flexbox/#flex-flow-property\n\n@mixin flex-flow($values: (row nowrap)) {\n\t// No Webkit Box fallback.\n\t-webkit-flex-flow: $values;\n\t-moz-flex-flow: $values;\n\t-ms-flex-flow: $values;\n\tflex-flow: $values;\n}\n\n//----------------------------------------------------------------------\n\n// Flexbox Order\n//\n// The 'order' property controls the order in which flex items appear within\n// their flex container, by assigning them to ordinal groups.\n//\n// Default: 0\n//\n// http://w3.org/tr/css3-flexbox/#order-property\n\n@mixin order($int: 0) {\n\t-webkit-box-ordinal-group: $int + 1;\n\t-webkit-order: $int;\n\t-moz-order: $int;\n\t-ms-flex-order: $int;\n\torder: $int;\n}\n\n//----------------------------------------------------------------------\n\n// Flexbox Grow\n//\n// The 'flex-grow' property sets the flex grow factor. Negative numbers\n// are invalid.\n//\n// Default: 0\n//\n// http://w3.org/tr/css3-flexbox/#flex-grow-property\n\n@mixin flex-grow($int: 0) {\n\t-webkit-box-flex: $int;\n\t-webkit-flex-grow: $int;\n\t-moz-flex-grow: $int;\n\t-ms-flex-positive: $int;\n\tflex-grow: $int;\n}\n\n//----------------------------------------------------------------------\n\n// Flexbox Shrink\n//\n// The 'flex-shrink' property sets the flex shrink factor. Negative numbers\n// are invalid.\n//\n// Default: 1\n//\n// http://w3.org/tr/css3-flexbox/#flex-shrink-property\n\n@mixin flex-shrink($int: 1) {\n\t-webkit-flex-shrink: $int;\n\t-moz-flex-shrink: $int;\n\t-ms-flex-negative: $int;\n\tflex-shrink: $int;\n}\n\n//----------------------------------------------------------------------\n\n// Flexbox Basis\n//\n// The 'flex-basis' property sets the flex basis. Negative lengths are invalid. \n//\n// Values: Like \"width\" \n// Default: auto\n//\n// http://www.w3.org/TR/css3-flexbox/#flex-basis-property\n\n@mixin flex-basis($value: auto) {\n\t-webkit-flex-basis: $value;\n\t-moz-flex-basis: $value;\n\t-ms-flex-preferred-size: $value;\n\tflex-basis: $value;\n}\n\n//----------------------------------------------------------------------\n\n// Flexbox \"Flex\" (shorthand)\n//\n// The 'flex' property specifies the components of a flexible length: the\n// flex grow factor and flex shrink factor, and the flex basis. When an\n// element is a flex item, 'flex' is consulted instead of the main size\n// property to determine the main size of the element. If an element is\n// not a flex item, 'flex' has no effect.\n//\n// Values: none | <flex-grow> <flex-shrink> || <flex-basis>\n// Default: See individual properties (1 1 0).\n//\n// http://w3.org/tr/css3-flexbox/#flex-property\n\n@mixin flex($fg: 1, $fs: null, $fb: null) {\n    \n\t// Set a variable to be used by box-flex properties\n\t$fg-boxflex: $fg;\n\n\t// Box-Flex only supports a flex-grow value so let's grab the\n\t// first item in the list and just return that.\n\t@if type-of($fg) == 'list' {\n\t\t$fg-boxflex: nth($fg, 1);\n\t}\n\n\t-webkit-box-flex: $fg-boxflex;\n\t-webkit-flex: $fg $fs $fb;\n\t-moz-box-flex: $fg-boxflex;\n\t-moz-flex: $fg $fs $fb;\n\t-ms-flex: $fg $fs $fb;\n\tflex: $fg $fs $fb;\n}\n\n//----------------------------------------------------------------------\n\n// Flexbox Justify Content\n//\n// The 'justify-content' property aligns flex items along the main axis\n// of the current line of the flex container. This is done after any flexible\n// lengths and any auto margins have been resolved. Typically it helps distribute\n// extra free space leftover when either all the flex items on a line are\n// inflexible, or are flexible but have reached their maximum size. It also\n// exerts some control over the alignment of items when they overflow the line.\n//\n// Note: 'space-*' values not supported in older syntaxes.\n//\n// Values: flex-start | flex-end | center | space-between | space-around\n// Default: flex-start\n//\n// http://w3.org/tr/css3-flexbox/#justify-content-property\n\n@mixin justify-content($value: flex-start) {\n\t@if $value == flex-start {\n\t\t-webkit-box-pack: start;\n\t\t-ms-flex-pack: start;\n\t} @else if $value == flex-end {\n\t\t-webkit-box-pack: end;\n\t\t-ms-flex-pack: end;\n\t} @else if $value == space-between {\n\t\t-webkit-box-pack: justify;\n\t\t-ms-flex-pack: justify;\n\t} @else if $value == space-around {\n\t\t-ms-flex-pack: distribute;\t\t\n\t} @else {\n\t\t-webkit-box-pack: $value;\n\t\t-ms-flex-pack: $value;\n\t}\n\t-webkit-justify-content: $value;\n\t-moz-justify-content: $value;\n\tjustify-content: $value;\n}\n\t// Shorter version:\n\t@mixin flex-just($args...) { @include justify-content($args...); }\n\n//----------------------------------------------------------------------\n\n// Flexbox Align Items\n//\n// Flex items can be aligned in the cross axis of the current line of the\n// flex container, similar to 'justify-content' but in the perpendicular\n// direction. 'align-items' sets the default alignment for all of the flex\n// container's items, including anonymous flex items. 'align-self' allows\n// this default alignment to be overridden for individual flex items. (For\n// anonymous flex items, 'align-self' always matches the value of 'align-items'\n// on their associated flex container.) \n//\n// Values: flex-start | flex-end | center | baseline | stretch\n// Default: stretch\n//\n// http://w3.org/tr/css3-flexbox/#align-items-property\n\n@mixin align-items($value: stretch) {\n\t@if $value == flex-start {\n\t\t-webkit-box-align: start;\n\t\t-ms-flex-align: start;\n\t} @else if $value == flex-end {\n\t\t-webkit-box-align: end;\n\t\t-ms-flex-align: end;\n\t} @else {\n\t\t-webkit-box-align: $value;\n\t\t-ms-flex-align: $value;\n\t}\n\t-webkit-align-items: $value;\n\t-moz-align-items: $value;\n\talign-items: $value;\n}\n\n//----------------------------------\n\n// Flexbox Align Self\n//\n// Values: auto | flex-start | flex-end | center | baseline | stretch\n// Default: auto\n\n@mixin align-self($value: auto) {\n\t// No Webkit Box Fallback.\n\t-webkit-align-self: $value;\n\t-moz-align-self: $value;\n\t@if $value == flex-start {\n\t\t-ms-flex-item-align: start;\n\t} @else if $value == flex-end {\n\t\t-ms-flex-item-align: end;\n\t} @else {\n\t\t-ms-flex-item-align: $value;\n\t}\n\talign-self: $value;\n}\n\n//----------------------------------------------------------------------\n\n// Flexbox Align Content\n//\n// The 'align-content' property aligns a flex container's lines within the\n// flex container when there is extra space in the cross-axis, similar to\n// how 'justify-content' aligns individual items within the main-axis. Note,\n// this property has no effect when the flexbox has only a single line.\n//\n// Values: flex-start | flex-end | center | space-between | space-around | stretch\n// Default: stretch\n//\n// http://w3.org/tr/css3-flexbox/#align-content-property\n\n@mixin align-content($value: stretch) {\n\t// No Webkit Box Fallback.\n\t-webkit-align-content: $value;\n\t-moz-align-content: $value;\n\t@if $value == flex-start {\n\t\t-ms-flex-line-pack: start;\n\t} @else if $value == flex-end {\n\t\t-ms-flex-line-pack: end;\n\t} @else {\n\t\t-ms-flex-line-pack: $value;\n\t}\n\talign-content: $value;\n}\n",".gray {\n\tcolor: #a3a3a3 !important;\n}\n\n.margin-top {\n\tmargin-top: 10px !important;\n}",".top-navigation {\n\t@include flexbox();\n\tmin-height: $navigation-height;\n\tborder-bottom: solid 1px #d3d2cd;\n\n\t&__active-filters {\n\t\t@include flex-grow(1);\n\t\t@include flex-wrap(wrap);\n\t}\n\n\t&__slider {\n\t\t@include flex-grow(0);\n\t\twidth: 250px;\n\t\tmin-height: inherit;\n\t\tpadding-right: 20px;\n\t}\n\n\t&__info {\n\t\tbackground-color: red;\n\t\t@include flex-grow(0);\n\t\twidth: 200px;\n\t\tmin-height: inherit;\n\t}\n\n}\n",".side-navigation {\n\t@include flexbox();\n\t@include flex-direction(column);\n\tbackground-color: $sidenavigation-background;\n\n\t&__header {\n\t\t//height: 250px;\n\t\tz-index: 2;\n\t\tbackground-color: $sidenavigation-background;\n\t}\n\n\t&__filters {\n\t\theight: 100vh;\n\t\toverflow-y: auto;\n\t}\n}\n\n.header {\n\n\t&__logo {\n\t\theight: $navigation-height;\n\t}\n\n\t&__search {\n\n\t}\n}\n\n.filter {\n\n}\n\n\n.logo {\n\t@include flexbox();\n\t@include justify-content(left);\n\tpadding-left: 20px;\n\talign-items: center;\n\tbackground-color: $navigation-background--lighter;\n\n\ta {\n\t\theight: $navigation-height - 20px;\n\t\timg {\n\t\t\theight: 100%;\n\t\t}\n\t}\n}\n\n.divider {\n\tmargin: 20px 0;\n\theight: 1px;\n\tborder: 0;\n\tborder-top: 1px solid #575757; \n\n\t&--lead {\n\t\tmargin-top: 0;\n\t}\n}\n",".slider {\n\tfont-size: 12px;\n\ttext-align: center;\n\n\t&__range {\n\t\tpadding: 0;\n\t}\n\n\t&__label {\n\t\tmargin: 0;\n\t\tpadding-top: 15px;\n\t}\n\n\t&__container {\n\t\t@include flexbox();\n\t\t@include flex-direction(row);\n\t\t@include justify-content(center);\n\t\talign-items: center;\n\n\t\t&__before {\n\t\t\tmargin-right: 5px;\n\t\t}\n\n\t\t&__range{\n\t\t\t@include flex-grow(1);\n\t\t}\n\n\t\t&__after {\n\t\t\tmargin-left: 5px;\n\n\t\t}\n\t}\n}\n\n\t",".groups {\n\t@include flexbox();\n\t@include flex-wrap(wrap);\n\talign-items: center;\n}\n\n.group {\n\t@include flexbox();\n\t@include flex-direction(column);\n\t@include justify-content(center);\n\tpadding: 0 20px;\n\tcolor: #fff;\n\t\n\t@include group-header-fonts(15px);\n\n\t&__title {\n\t\t\n\t}\n\n\t&__list {\n\t\t@include flexbox();\n\t\t@include flex-direction(row);\n\t\t@include justify-content(space-evenly);\n\t\tmargin: 0;\n\t\tpadding: 0;\n\n\t\tlist-style-type: none;\n\n\t\t&--vertical {\n\t\t\t@include flex-direction(column);\n\t\t}\n\t}\n\t&__list-item {\n\t\t@include flex-grow(0);\n\t\tmargin-right: 5px;\n\t}\n\n\t//Modifiers\n\t&--vertical {\n\t\t@include flex-direction(row);\n\t}\n\n\t&--space-between {\n\t\t@include justify-content(space-between);\n\t}\n\n\t&--lead {\n\t\tpadding-top: 20px;\n\t\theight: $search-box--height;\n\t}\n\n\t&--black-font {\n\t\tcolor: #000;\n\t}\n}\n\n.list-item {\n\t@include flexbox();\n\t@include flex-direction(row);\n\n\t&__label {\n\t\t\n\t}\n\n\t&--button {\n\t\t\n\t}\n\n\t&--checkbox {\n\t\tfont-size: 11pt;\n\t}\n\n//TODO: DESKTOP ONLY\n\t&:hover {\n\t\t.label--rounded {\n\t\t\t@include border-radius-edges(5px, 0, 0, 5px);\n\t\t}\n\n\t\t.button {\n\t\t\t//display: block;\n\t\t\tright: 0;\n\t\t\t@include transition(right, $transition-duration);\n\t\t\t//display: block;\n\t\t}\n\t}\n}\n\n.label {\n\tline-height: 1.3;\n\tfont-size: $navigation-button--label-size;\n\tmargin: 0;\n\t\n\t&--rounded {\n\t\tpadding: 3px 5px;\n\t\tbackground-color: #d7d5c4;\n\t\t@include border-radius(5px 0 0 5px);\n\t\tz-index: 2;\n\t}\n\n\t&--small {\n\t\tfont-size: ($navigation-button--label-size - 2);\n\t}\n\n\t&--smaller {\n\t\tfont-size: ($navigation-button--label-size - 4);\n\t}\n\n\t&--large {\n\t\tfont-size: $navigation-button--label-size + 2;\n\t}\n\n\t&--larger {\n\t\tfont-size: $navigation-button--label-size + 4;\n\t}\n\n\t&--bold {\n\t\tfont-weight: bold;\n\t}\n\n\t&--thin {\n\t\tfont-weight: 300;\n\t}\n\n\t&--nomargin {\n\t\tmargin: 0;\n\t}\n\n\t&--gray {\n\t\tcolor: #787677;\n\t}\n\n}\n\n.button {\n\tborder: none;\n\tcolor: #ffffff;\n    \n\t&--close {\n\t\tposition: relative;\n\t\tbackground-color: #59291c;\n\t\tpadding: 0 20px;\n\t\t@include border-radius-edges(0, 5px, 5px, 0)\n\t\t\n\t\t&:hover {\n\t\t\tbackground-color: #a52604;\n\t\t}\n\n\t\t$hover-hover: hover;\n\t\t@include hover-interaction($hover-hover) {\n            padding: 0 10px !important;\n       \t}\n\t}\n\n\t&--clearall {\n\t\tbackground-color: #59291c;\n\t\t@include border-radius-edges(5px, 5px, 5px, 5px);\n\n\t\t&:hover {\n\t\t\tbackground-color: #a52604;\n\t\t}\n\t}\n\n\t&--info {\n\t\tbackground-color: #59291c;\n\t\t@include border-radius-edges(5px, 5px, 5px, 5px);\n\t}\n}\n\n.input {\n\tmargin: 5px 0 10px 0;\n}","/// Adds a browser prefix to the property\n/// @param {*} $property Property\n/// @param {*} $value Value\n\n@mixin css3-prefix($property, $value) {\n  -webkit-#{$property}: #{$value};\n   -khtml-#{$property}: #{$value};\n     -moz-#{$property}: #{$value};\n      -ms-#{$property}: #{$value};\n       -o-#{$property}: #{$value};\n          #{$property}: #{$value};\n}\n\n@mixin transition($property, $duration, $easing: linear) {\n\ttransition: $property $duration $easing;\n\t-webkit-transition: $property $duration $easing;\n\t-moz-transition: $property $duration $easing;\n}\n\n@mixin border-radius($radius) {\n\tborder-radius: $radius;\n\t-webkit-border-radius: $radius;\n\t-moz-border-radius: $radius;\n}\n\n@mixin border-radius-edges($topleft, $topright, $bottomright, $bottomleft) {\n\tborder-top-left-radius: $topleft;\n\tborder-top-right-radius: $topright;\n\tborder-bottom-right-radius: $bottomright;\n\tborder-bottom-left-radius: $bottomleft;\n\t-webkit-border-top-left-radius: $topleft;\n\t-webkit-border-top-right-radius: $topright;\n\t-webkit-border-bottom-right-radius: $bottomright;\n\t-webkit-border-bottom-left-radius: $bottomleft;\n\t-moz-border-radius-topleft: $topleft;\n\t-moz-border-radius-topright: $topright;\n\t-moz-border-radius-bottomright: $bottomright;\n\t-moz-border-radius-bottomleft: $bottomleft;\n}\n\n@mixin group-header-fonts($base) {\n\th1 {\n\t\tfont-size: $base;\n\t\tmargin: 0;\n\t}\n\th2 {\n\t\tfont-size: $base - 2;\n\t\tmargin: 0;\n\t\tfont-weight: normal;\n\t}\n\th3 {\n\t\tfont-size: $base - 4;\n\t\tmargin: 0;\n\t}\n}\n\n@mixin hover-interaction($hover) {\n  @include mq($hover-interaction: $hover) {\n    @content;\n  }\n}","//  Author: Rafal Bromirski\n//  www: http://rafalbromirski.com/\n//  github: http://github.com/paranoida/sass-mediaqueries\n//\n//  Licensed under a MIT License\n//\n//  Version:\n//  1.6.1\n\n// --- generator ---------------------------------------------------------------\n\n@mixin mq($args...) {\n  $media-type: 'only screen';\n  $media-type-key: 'media-type';\n  $args: keywords($args);\n  $expr: '';\n\n  @if map-has-key($args, $media-type-key) {\n    $media-type: map-get($args, $media-type-key);\n    $args: map-remove($args, $media-type-key);\n  }\n\n  @each $key, $value in $args {\n    @if $value {\n      $expr: \"#{$expr} and (#{$key}: #{$value})\";\n    }\n  }\n\n  @media #{$media-type} #{$expr} {\n    @content;\n  }\n}\n\n// --- screen ------------------------------------------------------------------\n\n@mixin screen($min, $max, $orientation: false) {\n  @include mq($min-width: $min, $max-width: $max, $orientation: $orientation) {\n    @content;\n  }\n}\n\n@mixin max-screen($max) {\n  @include mq($max-width: $max) {\n    @content;\n  }\n}\n\n@mixin min-screen($min) {\n  @include mq($min-width: $min) {\n    @content;\n  }\n}\n\n@mixin screen-height($min, $max, $orientation: false) {\n  @include mq($min-height: $min, $max-height: $max, $orientation: $orientation) {\n    @content;\n  }\n}\n\n@mixin max-screen-height($max) {\n  @include mq($max-height: $max) {\n    @content;\n  }\n}\n\n@mixin min-screen-height($min) {\n  @include mq($min-height: $min) {\n    @content;\n  }\n}\n\n// --- hdpi --------------------------------------------------------------------\n\n@mixin hdpi($ratio: 1.3) {\n  @media only screen and (-webkit-min-device-pixel-ratio: $ratio),\n  only screen and (min-resolution: #{round($ratio*96)}dpi) {\n    @content;\n  }\n}\n\n// --- hdtv --------------------------------------------------------------------\n\n@mixin hdtv($standard: '1080') {\n  $min-width: false;\n  $min-height: false;\n\n  $standards: ('720p', 1280px, 720px)\n              ('1080', 1920px, 1080px)\n              ('2K', 2048px, 1080px)\n              ('4K', 4096px, 2160px);\n\n  @each $s in $standards {\n    @if $standard == nth($s, 1) {\n      $min-width: nth($s, 2);\n      $min-height: nth($s, 3);\n    }\n  }\n\n  @include mq(\n    $min-device-width: $min-width,\n    $min-device-height: $min-height,\n    $min-width: $min-width,\n    $min-height: $min-height\n  ) {\n    @content;\n  }\n}\n\n// --- iphone4 -----------------------------------------------------------------\n\n@mixin iphone4($orientation: false) {\n  $min: 320px;\n  $max: 480px;\n  $pixel-ratio: 2;\n  $aspect-ratio: '2/3';\n\n  @include mq(\n    $min-device-width: $min,\n    $max-device-width: $max,\n    $orientation: $orientation,\n    $device-aspect-ratio: $aspect-ratio,\n    $-webkit-device-pixel-ratio: $pixel-ratio\n  ) {\n    @content;\n  }\n}\n\n// --- iphone5 -----------------------------------------------------------------\n\n@mixin iphone5($orientation: false) {\n  $min: 320px;\n  $max: 568px;\n  $pixel-ratio: 2;\n  $aspect-ratio: '40/71';\n\n  @include mq(\n    $min-device-width: $min,\n    $max-device-width: $max,\n    $orientation: $orientation,\n    $device-aspect-ratio: $aspect-ratio,\n    $-webkit-device-pixel-ratio: $pixel-ratio\n  ) {\n    @content;\n  }\n}\n\n// --- iphone6 -----------------------------------------------------------------\n\n@mixin iphone6($orientation: false) {\n  $min: 375px;\n  $max: 667px;\n  $pixel-ratio: 2;\n\n  @include mq(\n    $min-device-width: $min,\n    $max-device-width: $max,\n    $orientation: $orientation,\n    $-webkit-device-pixel-ratio: $pixel-ratio\n  ) {\n    @content;\n  }\n}\n\n// --- iphone6 plus ------------------------------------------------------------\n\n@mixin iphone6-plus($orientation: false) {\n  $min: 414px;\n  $max: 736px;\n  $pixel-ratio: 3;\n\n  @include mq(\n    $min-device-width: $min,\n    $max-device-width: $max,\n    $orientation: $orientation,\n    $-webkit-device-pixel-ratio: $pixel-ratio\n  ) {\n    @content;\n  }\n}\n\n// --- ipad (all) --------------------------------------------------------------\n\n@mixin ipad($orientation: false) {\n  $min: 768px;\n  $max: 1024px;\n\n  @include mq(\n    $min-device-width: $min,\n    $max-device-width: $max,\n    $orientation: $orientation\n  ) {\n    @content;\n  }\n}\n\n// --- ipad-retina -------------------------------------------------------------\n\n@mixin ipad-retina($orientation: false) {\n  $min: 768px;\n  $max: 1024px;\n  $pixel-ratio: 2;\n\n  @include mq(\n    $min-device-width: $min,\n    $max-device-width: $max,\n    $orientation: $orientation,\n    $-webkit-device-pixel-ratio: $pixel-ratio\n  ) {\n    @content;\n  }\n}\n\n// --- orientation -------------------------------------------------------------\n\n@mixin landscape() {\n  @include mq($orientation: landscape) {\n    @content;\n  }\n}\n\n@mixin portrait() {\n  @include mq($orientation: portrait) {\n    @content;\n  }\n}\n","input[type=\"checkbox\"] {\n  display: none;\n}\n\n.side-label {\n//  display: block;\n  position: relative;\n//  margin: 10px 0;\n  padding-left: 20px;\n  cursor: pointer;\n  color: #fff;\n  @include transition(color, $transition-duration);\n}\n\n.side-label::before, .side-label::after {\n  content: '';\n  position: absolute;\n  top: 6px;\n  left: 0;\n}\n\n//unchecked\n.side-label::before {\n  display: block;\n  width: 10px;\n  height: 10px;\n  border: 1px solid;\n  border-color: #fff;\n  @include transition(border-color, $transition-duration);  \n}\n\n//checked\n.side-label::after {\n  //display: none;\n  width: 6px;\n  height: 6px;\n  margin: 3px;\n  background-color: none;\n  @include transition(background-color, $transition-duration);\n}\n\ninput:checked + .side-label::after {\n  //display: block;\n  background-color: $active__checkbox-color;\n}\n\ninput:hover + .side-label\n,input:hover + .side-label::before\n,input:checked + .side-label\n,input:checked + .side-label::before {\n  color: $active__checkbox-color;\n  border-color: $active__checkbox-color;\n}\n","\n\n.button--icon {\n\twidth: 26px;\n\theight: 26px;\n\tbackground-repeat: no-repeat;\n\tbackground-position: center;\n}\n\n/*.triangle {\n\t//display: none;\n\tposition: relative;\n\twidth: 0;\n\theight: 0;\n\tleft: 3px;\n\tborder-left: 10px solid transparent;\n\tborder-right: 10px solid transparent;\n\tborder-bottom: 10px solid #575757;\n\n\t&:before {\n\t\tcontent: \" \";\n\t\tposition: absolute;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tleft: -9px;\n\t\tmargin-top: 2px;\n\t\tborder-left: 9px solid transparent;\n\t\tborder-right: 9px solid transparent;\n\t\tborder-bottom: 9px solid $sidenavigation-background;\n\t}\n}*/\n\n$path: '/dist/img/';\n\n.icon1 {\n\tbackground-image: url(#{$path}icon1.svg);\n\t@include transition(background-image, $transition-duration);\n\t&:hover {\n\t\tbackground-image: url(#{$path}icon1_green.svg);\n\t}\n}\n\n.icon2 {\n\twidth: 30px;\n\theight: 30px;\n\tbackground-image: url(#{$path}icon2.svg);\n\t@include transition(background-image, $transition-duration);\n\t&:hover {\n\t\tbackground-image: url(#{$path}icon2_green.svg);\n\t}\n}\n\n.icon3 {\n\tbackground-image: url(#{$path}icon3.svg);\n\t@include transition(background-image, $transition-duration);\n\t&:hover {\n\t\tbackground-image: url(#{$path}icon3_green.svg);\n\t}\n}\n\n.icon4 {\n\tbackground-image: url(#{$path}icon4.svg);\n\t@include transition(background-image, $transition-duration);\n\t&:hover {\n\t\tbackground-image: url(#{$path}icon4_green.svg);\n\t}\n}",".select {\n\twidth: $navigation-width - 40px;\n\t-webkit-appearance: none; \n    -moz-appearance: none;\n    appearance: none;\n\tbackground: url(/dist/img/arrow_dropdown.png) no-repeat 95% center;\n\t@include transition(background, $transition-duration);\n\tmargin: 3px 0;\n\tpadding: 2px 9px;\n\tborder: 1px solid #fff;\n\t@include transition(border, $transition-duration);\n\tborder-radius: 3px;\n\tcolor: #fff;\n\t@include transition(color, $transition-duration);\n\tfont-size: 13px;\n\n\n\t&__option {\n\t\tcolor: #000;\n\t}\n}\n\n.select:hover {\n\tborder: 1px solid $hover-color;\n\tcolor: $hover-color;\n\tbackground: url(/dist/img/arrow_dropdown_green.png) no-repeat 95% center;\n}\t\n\n.select::-ms-expand { \n    display: none; /* hide the default arrow in ie10 and ie11 */\n}\n",".resistanceMatrix {\n\n    max-width:2000px; /* or circles are too large */\n    min-width: 1400px; /* or circles are smaller than the font */\n    width: 100%;\n    font-size: 11pt;\n\n    &__bacteriumLabelText {\n        text-anchor: end;\n    }\n\n    &__resistance {\n        cursor: none;\n        // Use visiblity: hidden to hide resistances (for speed reasons)\n        // and ignore pointer-events on them\n        pointer-events: visible;\n    }\n\n    &__substanceClassLine {\n\n        &--top {\n\n        }\n    }\n\n    &__antibioticLabelText,\n    &__bacteriumLabelText {\n\n        transition: fill 0.2s;\n\n        &.highlight {\n            fill: #ff623f;\n        }\n\n    }\n\n    /**\n    * Resistance Detail (Hover)\n    */\n    &__resistanceDetail {\n        transition: transform 0.2s;\n        // Don't let the <g> cause mouseLeaves on the underlying resistance\n        pointer-events: none;\n    }\n\n    &__resistanceDetailValueText {\n        font-size: 15pt;\n    }\n\n    &__resistanceDetailValuePercentSign {\n        font-size: 11pt;\n    }\n\n    &__resistanceDetailCircle {\n    }\n\n    &__resistanceDetailCircleShadow {\n        fill: #000;\n        opacity: 0.4;\n    }\n\n\n}\n","$padding-lr: 30px;\n\n.search {\n\tposition: absolute;\n\tdisplay: block;\n\tleft: -$navigation-width;\n\t@include transition(left, $transition-duration);\n\ttop: $navigation-height + $search-box--height + 20px;\n\tz-index: 99;\n\tpadding: 0;\n\twidth: $navigation-width;\n\theight: 100vw;\n\tbackground-color: $sidenavigation-background;\n\n\t&__input {\n\t\t\n\t}\n\n\t&__result {\n\n\t}\n\n}\n\n.result {\n\tpadding: 10px $padding-lr;\n\tmargin: 0;\n\t\n\tbackground-color: #d7d5c4;\n\n\t&__checkmark {\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tleft: 10px;\n\t\twidth: 15px;\n\t\theight: 40px;\n\t\t//height: 100%;\n\t\tbackground: url(/dist/img/checkmark.svg) no-repeat center center;\n\t}\n\n\t&--active {\n\t\tbackground-color: #fff;\n\n\t\tspan {\n\n\t\t}\n\t}\n\n\t&:hover {\n\t\tbackground-color: #fff;\n\t\tcursor: pointer;\n\t}\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 593:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(595);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 595:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

/******/ });
//# sourceMappingURL=styles.js.map