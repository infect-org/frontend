(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var data = require('./model');

},{"./model":2}],2:[function(require,module,exports){
'use strict';

function getData() {

	return {
		columns: {
			'subs-amingikosyde': { visible: true },
			'ab-genatimicin': { visible: false },
			'ab-tobramycin': { visible: false }
		},
		headers: {
			// Col (0 is name of ab)
			1: {
				// Level: bottom to top
				1: { name: 'Aminglykoside', visible: false }
			},
			3: {
				1: { name: 'Betalactame' }
			},
			4: {
				2: { name: 'Mono' }
			},
			6: {
				1: { name: 'Carpenteme' },
				2: { name: 'Penicilline' }
			}
		},
		body: {
			'AB1': {
				visible: false,
				data: [{ resistance: 0.4, sampleSize: 3 }, {}, { resistance: 0.2, sampleSize: 1 }, {}, { resistance: 0.2, sampleSize: 1 }, {}]
			}
		}
	};
}

module.exports = getData();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleHBlcmltZW50cy9tYXRyaXgvbWF0cml4LmpzIiwiZXhwZXJpbWVudHMvbWF0cml4L21vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE9BQU8sUUFBUSxTQUFSLENBQWI7Ozs7O0FDQUEsU0FBUyxPQUFULEdBQW1COztBQUVsQixRQUFPO0FBQ04sV0FBUztBQUNSLHdCQUFxQixFQUFFLFNBQVMsSUFBWCxFQURiO0FBRU4scUJBQWtCLEVBQUUsU0FBUyxLQUFYLEVBRlo7QUFHTixvQkFBaUIsRUFBRSxTQUFTLEtBQVg7QUFIWCxHQURIO0FBTUosV0FBUztBQUNWO0FBQ0EsTUFBRztBQUNGO0FBQ0EsT0FBRyxFQUFFLE1BQU0sZUFBUixFQUF5QixTQUFTLEtBQWxDO0FBRkQsSUFGTztBQU1SLE1BQUc7QUFDSixPQUFHLEVBQUUsTUFBTSxhQUFSO0FBREMsSUFOSztBQVNSLE1BQUc7QUFDSixPQUFHLEVBQUUsTUFBTSxNQUFSO0FBREMsSUFUSztBQVlSLE1BQUc7QUFDSixPQUFHLEVBQUUsTUFBTSxZQUFSLEVBREM7QUFFRixPQUFHLEVBQUUsTUFBTSxhQUFSO0FBRkQ7QUFaSyxHQU5MO0FBdUJKLFFBQU07QUFDUCxVQUFPO0FBQ04sYUFBUyxLQURIO0FBRUosVUFBTSxDQUNQLEVBQUUsWUFBWSxHQUFkLEVBQW1CLFlBQVksQ0FBL0IsRUFETyxFQUVMLEVBRkssRUFHTCxFQUFFLFlBQVksR0FBZCxFQUFtQixZQUFZLENBQS9CLEVBSEssRUFJTCxFQUpLLEVBS0wsRUFBRSxZQUFZLEdBQWQsRUFBbUIsWUFBWSxDQUEvQixFQUxLLEVBTUwsRUFOSztBQUZGO0FBREE7QUF2QkYsRUFBUDtBQXNDQTs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsU0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgZGF0YSA9IHJlcXVpcmUoJy4vbW9kZWwnKTtcbiIsImZ1bmN0aW9uIGdldERhdGEoKSB7XG5cblx0cmV0dXJuIHtcblx0XHRjb2x1bW5zOiB7XG5cdFx0XHQnc3Vicy1hbWluZ2lrb3N5ZGUnOiB7IHZpc2libGU6IHRydWUgfVxuXHRcdFx0LCAnYWItZ2VuYXRpbWljaW4nOiB7IHZpc2libGU6IGZhbHNlIH1cblx0XHRcdCwgJ2FiLXRvYnJhbXljaW4nOiB7IHZpc2libGU6IGZhbHNlIH1cblx0XHR9XG5cdFx0LCBoZWFkZXJzOiB7XG5cdFx0XHQvLyBDb2wgKDAgaXMgbmFtZSBvZiBhYilcblx0XHRcdDE6IHtcblx0XHRcdFx0Ly8gTGV2ZWw6IGJvdHRvbSB0byB0b3Bcblx0XHRcdFx0MTogeyBuYW1lOiAnQW1pbmdseWtvc2lkZScsIHZpc2libGU6IGZhbHNlIH1cblx0XHRcdH1cblx0XHRcdCwgMzoge1xuXHRcdFx0XHQxOiB7IG5hbWU6ICdCZXRhbGFjdGFtZScgfVxuXHRcdFx0fVxuXHRcdFx0LCA0OiB7XG5cdFx0XHRcdDI6IHsgbmFtZTogJ01vbm8nIH1cblx0XHRcdH1cblx0XHRcdCwgNjoge1xuXHRcdFx0XHQxOiB7IG5hbWU6ICdDYXJwZW50ZW1lJyB9XG5cdFx0XHRcdCwgMjogeyBuYW1lOiAnUGVuaWNpbGxpbmUnIH1cblx0XHRcdH1cblx0XHR9XG5cdFx0LCBib2R5OiB7XG5cdFx0XHQnQUIxJzoge1xuXHRcdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0XHQsIGRhdGE6IFtcblx0XHRcdFx0XHR7IHJlc2lzdGFuY2U6IDAuNCwgc2FtcGxlU2l6ZTogMyB9XG5cdFx0XHRcdFx0LCB7fVxuXHRcdFx0XHRcdCwgeyByZXNpc3RhbmNlOiAwLjIsIHNhbXBsZVNpemU6IDEgfVxuXHRcdFx0XHRcdCwge31cblx0XHRcdFx0XHQsIHsgcmVzaXN0YW5jZTogMC4yLCBzYW1wbGVTaXplOiAxIH1cblx0XHRcdFx0XHQsIHt9XG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXREYXRhKCk7Il19
