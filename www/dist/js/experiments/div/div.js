(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var div = document.querySelector('div');

var Ball = function () {
	function Ball(id, width, height) {
		_classCallCheck(this, Ball);

		this._id = id;
		this._width = width;
		this._height = height;
	}

	_createClass(Ball, [{
		key: '_getTransformation',
		value: function _getTransformation(x, y) {
			return 'transform: translate(' + Math.round(x) + 'px, ' + Math.round(y) + 'px)';
		}
	}, {
		key: 'draw',
		value: function draw(div) {
			var _this = this;

			var el = document.createElement('div');
			el.setAttribute('class', 'ball');
			el.setAttribute('style', this._getTransformation(100, 100));
			el.innerHTML = '\n\t\t\t\t' + Math.random().toFixed(2) + '\n\t\t\t';
			this._element = el;
			div.appendChild(el);
			this._element.addEventListener('transitionend', function () {
				_this.move();
			});
		}
	}, {
		key: 'move',
		value: function move() {
			var _this2 = this;

			var x = Math.random() * this._width;
			var y = Math.random() * this._height;
			requestAnimationFrame(function () {
				_this2._element.setAttribute('style', _this2._getTransformation(x, y));
			});
		}
	}]);

	return Ball;
}();

var height = div.getBoundingClientRect().height;
var width = div.getBoundingClientRect().width;
console.error(width, height);
var balls = Array.from(new Array(900)).map(function (item, index) {
	return new Ball(index, width, height);
});
balls.forEach(function (ball) {
	return ball.move();
});
/*setInterval(() => {
	balls.forEach((ball) => ball.move());
}, 2000);*/

balls.forEach(function (ball) {
	return ball.draw(div);
});

console.log(balls);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleHBlcmltZW50cy9kaXYvZGl2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaOztJQUVNLEk7QUFDTCxlQUFZLEVBQVosRUFBZ0IsS0FBaEIsRUFBdUIsTUFBdkIsRUFBK0I7QUFBQTs7QUFDOUIsT0FBSyxHQUFMLEdBQVcsRUFBWDtBQUNBLE9BQUssTUFBTCxHQUFjLEtBQWQ7QUFDQSxPQUFLLE9BQUwsR0FBZSxNQUFmO0FBQ0E7Ozs7cUNBQ2tCLEMsRUFBRyxDLEVBQUc7QUFDeEIsb0NBQWdDLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBaEMsWUFBc0QsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUF0RDtBQUNBOzs7dUJBQ0ksRyxFQUFLO0FBQUE7O0FBQ1QsT0FBTSxLQUFLLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0EsTUFBRyxZQUFILENBQWdCLE9BQWhCLEVBQXlCLE1BQXpCO0FBQ0EsTUFBRyxZQUFILENBQWdCLE9BQWhCLEVBQXlCLEtBQUssa0JBQUwsQ0FBd0IsR0FBeEIsRUFBNkIsR0FBN0IsQ0FBekI7QUFDQSxNQUFHLFNBQUgsa0JBQ0ssS0FBSyxNQUFMLEdBQWMsT0FBZCxDQUFzQixDQUF0QixDQURMO0FBR0EsUUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsT0FBSSxXQUFKLENBQWdCLEVBQWhCO0FBQ0EsUUFBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsZUFBL0IsRUFBZ0QsWUFBTTtBQUNyRCxVQUFLLElBQUw7QUFDQSxJQUZEO0FBR0E7Ozt5QkFDTTtBQUFBOztBQUNOLE9BQU0sSUFBSSxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxNQUEvQjtBQUNBLE9BQU0sSUFBSSxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxPQUEvQjtBQUNBLHlCQUFzQixZQUFNO0FBQzNCLFdBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0MsT0FBSyxrQkFBTCxDQUF3QixDQUF4QixFQUEyQixDQUEzQixDQUFwQztBQUNBLElBRkQ7QUFHQTs7Ozs7O0FBR0YsSUFBTSxTQUFTLElBQUkscUJBQUosR0FBNEIsTUFBM0M7QUFDQSxJQUFNLFFBQVEsSUFBSSxxQkFBSixHQUE0QixLQUExQztBQUNBLFFBQVEsS0FBUixDQUFjLEtBQWQsRUFBcUIsTUFBckI7QUFDQSxJQUFNLFFBQVEsTUFBTSxJQUFOLENBQVcsSUFBSSxLQUFKLENBQVUsR0FBVixDQUFYLEVBQTJCLEdBQTNCLENBQStCLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDN0QsUUFBTyxJQUFJLElBQUosQ0FBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCLE1BQXZCLENBQVA7QUFDQSxDQUZhLENBQWQ7QUFHQSxNQUFNLE9BQU4sQ0FBYyxVQUFDLElBQUQ7QUFBQSxRQUFVLEtBQUssSUFBTCxFQUFWO0FBQUEsQ0FBZDtBQUNBOzs7O0FBSUEsTUFBTSxPQUFOLENBQWMsVUFBQyxJQUFEO0FBQUEsUUFBVSxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQVY7QUFBQSxDQUFkOztBQUVBLFFBQVEsR0FBUixDQUFZLEtBQVoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Jyk7XG5cbmNsYXNzIEJhbGwge1xuXHRjb25zdHJ1Y3RvcihpZCwgd2lkdGgsIGhlaWdodCkge1xuXHRcdHRoaXMuX2lkID0gaWQ7XG5cdFx0dGhpcy5fd2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG5cdH1cblx0X2dldFRyYW5zZm9ybWF0aW9uKHgsIHkpIHtcblx0XHRyZXR1cm4gYHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7IE1hdGgucm91bmQoeCkgfXB4LCAkeyBNYXRoLnJvdW5kKHkpIH1weClgO1xuXHR9XG5cdGRyYXcoZGl2KSB7XG5cdFx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JhbGwnKTtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdGhpcy5fZ2V0VHJhbnNmb3JtYXRpb24oMTAwLCAxMDApKTtcblx0XHRlbC5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdCR7IE1hdGgucmFuZG9tKCkudG9GaXhlZCgyKSB9XG5cdFx0XHRgO1xuXHRcdHRoaXMuX2VsZW1lbnQgPSBlbDtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoZWwpO1xuXHRcdHRoaXMuX2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcblx0XHRcdHRoaXMubW92ZSgpO1xuXHRcdH0pO1xuXHR9XG5cdG1vdmUoKSB7XG5cdFx0Y29uc3QgeCA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLl93aWR0aDtcblx0XHRjb25zdCB5ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuX2hlaWdodDtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0dGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdGhpcy5fZ2V0VHJhbnNmb3JtYXRpb24oeCwgeSkpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmNvbnN0IGhlaWdodCA9IGRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5jb25zdCB3aWR0aCA9IGRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbmNvbnNvbGUuZXJyb3Iod2lkdGgsIGhlaWdodCk7XG5jb25zdCBiYWxscyA9IEFycmF5LmZyb20obmV3IEFycmF5KDkwMCkpLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcblx0cmV0dXJuIG5ldyBCYWxsKGluZGV4LCB3aWR0aCwgaGVpZ2h0KTtcbn0pO1xuYmFsbHMuZm9yRWFjaCgoYmFsbCkgPT4gYmFsbC5tb3ZlKCkpO1xuLypzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdGJhbGxzLmZvckVhY2goKGJhbGwpID0+IGJhbGwubW92ZSgpKTtcbn0sIDIwMDApOyovXG5cbmJhbGxzLmZvckVhY2goKGJhbGwpID0+IGJhbGwuZHJhdyhkaXYpKTtcblxuY29uc29sZS5sb2coYmFsbHMpOyJdfQ==
