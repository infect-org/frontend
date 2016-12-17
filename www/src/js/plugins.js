// Avoid `console` errors in browsers that lack a console.
(function() {
		var method;
		var noop = function () {};
		var methods = [
				'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
				'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
				'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
				'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
				method = methods[length];

				// Only stub undefined methods.
				if (!console[method]) {
						console[method] = noop;
				}
		}
}());




// IE 11 does not know classList on svg elements – shim it.
// See https://github.com/angular/angular/issues/6327
if (!('classList' in document.createElementNS('http://www.w3.org/2000/svg','g'))){
	var descr = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList');
	Object.defineProperty(SVGElement.prototype, 'classList', descr);
}

