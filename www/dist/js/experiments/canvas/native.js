(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var Ball = function () {
	function Ball(id) {
		_classCallCheck(this, Ball);

		this._id = id;
		this._radius = Math.random() * 5 + 2;
		this._xSpeed = Math.random() * 10;
		this._ySpeed = Math.random() * 10;
		this._x = 100;
		this._y = 100;
	}

	_createClass(Ball, [{
		key: 'move',
		value: function move() {
			//console.log(this._fabric.getLeft());
			if (this._y <= 0 || this._y >= this._height - this._radius) this._ySpeed *= -1;
			if (this._x <= 0 || this._x >= this._width - this._radius) this._xSpeed *= -1;
			this._x += this._xSpeed;
			this._y += this._ySpeed;
		}
	}, {
		key: 'setDimensions',
		value: function setDimensions(width, height) {
			this._height = height;
			this._width = width;
		}
	}, {
		key: 'draw',
		value: function draw(context, offscreenCanvas) {
			/*context.beginPath();
   context.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
   context.closePath();
   context.fill();*/
			context.drawImage(offscreenCanvas, this._x, this._y, this._radius, this._radius);
			context.font = 'Futura';
			context.fillText(Math.random().toFixed(2), this._x, this._y);
		}
	}]);

	return Ball;
}();

var offscreenCanvas = document.createElement('canvas');
offscreenCanvas.height = 10;
offscreenCanvas.width = 10;
var offscreenContext = offscreenCanvas.getContext('2d');
offscreenContext.fillStyle = 'red';
offscreenContext.beginPath();
offscreenContext.arc(5, 5, 5, 0, Math.PI * 2);
offscreenContext.closePath();
offscreenContext.fill();

var balls = Array.from(new Array(1500)).map(function (item, index) {
	return new Ball(index);
});
console.log(balls.length);

var height = canvas.offsetHeight;
var width = canvas.offsetWidth;
context.canvas.width = width;
context.canvas.height = height;

balls.forEach(function (ball) {
	ball.setDimensions(width, height);
});

function animate() {
	context.clearRect(0, 0, width, height);
	balls.forEach(function (ball) {
		ball.move();
		ball.draw(context, offscreenCanvas);
	});
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleHBlcmltZW50cy9jYW52YXMvbmF0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBTSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0EsSUFBTSxVQUFVLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFoQjs7SUFFTSxJO0FBQ0wsZUFBWSxFQUFaLEVBQWdCO0FBQUE7O0FBQ2YsT0FBSyxHQUFMLEdBQVcsRUFBWDtBQUNBLE9BQUssT0FBTCxHQUFlLEtBQUssTUFBTCxLQUFnQixDQUFoQixHQUFvQixDQUFuQztBQUNBLE9BQUssT0FBTCxHQUFlLEtBQUssTUFBTCxLQUFnQixFQUEvQjtBQUNBLE9BQUssT0FBTCxHQUFlLEtBQUssTUFBTCxLQUFnQixFQUEvQjtBQUNBLE9BQUssRUFBTCxHQUFVLEdBQVY7QUFDQSxPQUFLLEVBQUwsR0FBVSxHQUFWO0FBQ0E7Ozs7eUJBRU07QUFDTjtBQUNBLE9BQUksS0FBSyxFQUFMLElBQVcsQ0FBWCxJQUFnQixLQUFLLEVBQUwsSUFBVyxLQUFLLE9BQUwsR0FBZSxLQUFLLE9BQW5ELEVBQTRELEtBQUssT0FBTCxJQUFnQixDQUFDLENBQWpCO0FBQzVELE9BQUksS0FBSyxFQUFMLElBQVcsQ0FBWCxJQUFnQixLQUFLLEVBQUwsSUFBVyxLQUFLLE1BQUwsR0FBYyxLQUFLLE9BQWxELEVBQTJELEtBQUssT0FBTCxJQUFnQixDQUFDLENBQWpCO0FBQzNELFFBQUssRUFBTCxJQUFXLEtBQUssT0FBaEI7QUFDQSxRQUFLLEVBQUwsSUFBVyxLQUFLLE9BQWhCO0FBQ0E7OztnQ0FFYSxLLEVBQU8sTSxFQUFRO0FBQzVCLFFBQUssT0FBTCxHQUFlLE1BQWY7QUFDQSxRQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0E7Ozt1QkFFSSxPLEVBQVMsZSxFQUFpQjtBQUM5Qjs7OztBQUlBLFdBQVEsU0FBUixDQUFrQixlQUFsQixFQUFtQyxLQUFLLEVBQXhDLEVBQTRDLEtBQUssRUFBakQsRUFBcUQsS0FBSyxPQUExRCxFQUFtRSxLQUFLLE9BQXhFO0FBQ0EsV0FBUSxJQUFSLEdBQWUsUUFBZjtBQUNBLFdBQVEsUUFBUixDQUFpQixLQUFLLE1BQUwsR0FBYyxPQUFkLENBQXNCLENBQXRCLENBQWpCLEVBQTJDLEtBQUssRUFBaEQsRUFBb0QsS0FBSyxFQUF6RDtBQUNBOzs7Ozs7QUFJRixJQUFNLGtCQUFrQixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBeEI7QUFDQSxnQkFBZ0IsTUFBaEIsR0FBeUIsRUFBekI7QUFDQSxnQkFBZ0IsS0FBaEIsR0FBd0IsRUFBeEI7QUFDQSxJQUFNLG1CQUFtQixnQkFBZ0IsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FBekI7QUFDQSxpQkFBaUIsU0FBakIsR0FBNkIsS0FBN0I7QUFDQSxpQkFBaUIsU0FBakI7QUFDQSxpQkFBaUIsR0FBakIsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUMsS0FBSyxFQUFMLEdBQVUsQ0FBM0M7QUFDQSxpQkFBaUIsU0FBakI7QUFDQSxpQkFBaUIsSUFBakI7O0FBR0EsSUFBTSxRQUFRLE1BQU0sSUFBTixDQUFXLElBQUksS0FBSixDQUFVLElBQVYsQ0FBWCxFQUE0QixHQUE1QixDQUFnQyxVQUFDLElBQUQsRUFBTyxLQUFQO0FBQUEsUUFBaUIsSUFBSSxJQUFKLENBQVMsS0FBVCxDQUFqQjtBQUFBLENBQWhDLENBQWQ7QUFDQSxRQUFRLEdBQVIsQ0FBWSxNQUFNLE1BQWxCOztBQUVBLElBQU0sU0FBUyxPQUFPLFlBQXRCO0FBQ0EsSUFBTSxRQUFRLE9BQU8sV0FBckI7QUFDQSxRQUFRLE1BQVIsQ0FBZSxLQUFmLEdBQXVCLEtBQXZCO0FBQ0EsUUFBUSxNQUFSLENBQWUsTUFBZixHQUF3QixNQUF4Qjs7QUFFQSxNQUFNLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBVTtBQUN2QixNQUFLLGFBQUwsQ0FBbUIsS0FBbkIsRUFBMEIsTUFBMUI7QUFDQSxDQUZEOztBQUlBLFNBQVMsT0FBVCxHQUFtQjtBQUNsQixTQUFRLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBeEIsRUFBK0IsTUFBL0I7QUFDQSxPQUFNLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBVTtBQUN2QixPQUFLLElBQUw7QUFDQSxPQUFLLElBQUwsQ0FBVSxPQUFWLEVBQW1CLGVBQW5CO0FBQ0EsRUFIRDtBQUlBLHVCQUFzQixPQUF0QjtBQUNBO0FBQ0Qsc0JBQXNCLE9BQXRCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5jbGFzcyBCYWxsIHtcblx0Y29uc3RydWN0b3IoaWQpIHtcblx0XHR0aGlzLl9pZCA9IGlkO1xuXHRcdHRoaXMuX3JhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiA1ICsgMjtcblx0XHR0aGlzLl94U3BlZWQgPSBNYXRoLnJhbmRvbSgpICogMTA7XG5cdFx0dGhpcy5feVNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDEwO1xuXHRcdHRoaXMuX3ggPSAxMDA7XG5cdFx0dGhpcy5feSA9IDEwMDtcblx0fVxuXG5cdG1vdmUoKSB7XG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLl9mYWJyaWMuZ2V0TGVmdCgpKTtcblx0XHRpZiAodGhpcy5feSA8PSAwIHx8IHRoaXMuX3kgPj0gdGhpcy5faGVpZ2h0IC0gdGhpcy5fcmFkaXVzKSB0aGlzLl95U3BlZWQgKj0gLTE7XG5cdFx0aWYgKHRoaXMuX3ggPD0gMCB8fCB0aGlzLl94ID49IHRoaXMuX3dpZHRoIC0gdGhpcy5fcmFkaXVzKSB0aGlzLl94U3BlZWQgKj0gLTE7XG5cdFx0dGhpcy5feCArPSB0aGlzLl94U3BlZWQ7XG5cdFx0dGhpcy5feSArPSB0aGlzLl95U3BlZWQ7XG5cdH1cblxuXHRzZXREaW1lbnNpb25zKHdpZHRoLCBoZWlnaHQpIHtcblx0XHR0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5fd2lkdGggPSB3aWR0aDtcblx0fVxuXG5cdGRyYXcoY29udGV4dCwgb2Zmc2NyZWVuQ2FudmFzKSB7XG5cdFx0Lypjb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdGNvbnRleHQuYXJjKHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3JhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdGNvbnRleHQuY2xvc2VQYXRoKCk7XG5cdFx0Y29udGV4dC5maWxsKCk7Ki9cblx0XHRjb250ZXh0LmRyYXdJbWFnZShvZmZzY3JlZW5DYW52YXMsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3JhZGl1cywgdGhpcy5fcmFkaXVzKTtcblx0XHRjb250ZXh0LmZvbnQgPSAnRnV0dXJhJztcblx0XHRjb250ZXh0LmZpbGxUZXh0KE1hdGgucmFuZG9tKCkudG9GaXhlZCgyKSwgdGhpcy5feCwgdGhpcy5feSk7XG5cdH1cblxufVxuXG5jb25zdCBvZmZzY3JlZW5DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbm9mZnNjcmVlbkNhbnZhcy5oZWlnaHQgPSAxMDtcbm9mZnNjcmVlbkNhbnZhcy53aWR0aCA9IDEwO1xuY29uc3Qgb2Zmc2NyZWVuQ29udGV4dCA9IG9mZnNjcmVlbkNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xub2Zmc2NyZWVuQ29udGV4dC5maWxsU3R5bGUgPSAncmVkJztcbm9mZnNjcmVlbkNvbnRleHQuYmVnaW5QYXRoKCk7XG5vZmZzY3JlZW5Db250ZXh0LmFyYyg1LCA1LCA1LCAwLCBNYXRoLlBJICogMik7XG5vZmZzY3JlZW5Db250ZXh0LmNsb3NlUGF0aCgpO1xub2Zmc2NyZWVuQ29udGV4dC5maWxsKCk7XG5cblxuY29uc3QgYmFsbHMgPSBBcnJheS5mcm9tKG5ldyBBcnJheSgxNTAwKSkubWFwKChpdGVtLCBpbmRleCkgPT4gbmV3IEJhbGwoaW5kZXgpKTtcbmNvbnNvbGUubG9nKGJhbGxzLmxlbmd0aCk7XG5cbmNvbnN0IGhlaWdodCA9IGNhbnZhcy5vZmZzZXRIZWlnaHQ7XG5jb25zdCB3aWR0aCA9IGNhbnZhcy5vZmZzZXRXaWR0aDtcbmNvbnRleHQuY2FudmFzLndpZHRoID0gd2lkdGg7XG5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbmJhbGxzLmZvckVhY2goKGJhbGwpID0+IHtcblx0YmFsbC5zZXREaW1lbnNpb25zKHdpZHRoLCBoZWlnaHQpO1xufSk7XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG5cdGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRiYWxscy5mb3JFYWNoKChiYWxsKSA9PiB7XG5cdFx0YmFsbC5tb3ZlKCk7XG5cdFx0YmFsbC5kcmF3KGNvbnRleHQsIG9mZnNjcmVlbkNhbnZhcyk7XG5cdH0pO1xuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG59XG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7Il19
