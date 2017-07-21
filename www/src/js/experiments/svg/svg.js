const svg = document.querySelector('svg');

class Ball {
	constructor(id, width, height) {
		this._id = id;
		this._width = width;
		this._height = height;
	}
	_getTransformation(x, y) {
		return `transform: translate(${ x }px, ${ y }px)`;
	}
	draw(canvas) {
		const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		el.setAttribute('style', this._getTransformation(100, 100));
		el.innerHTML = `
				<circle r="12" fill="red"></circle>
				<text>${ Math.random().toFixed(2) }</text>
			`;
		this._element = el;
		canvas.appendChild(el);
	}
	move() {
		const x = Math.random() * this._width;
		const y = Math.random() * this._height;
		requestAnimationFrame(() => {
			this._element.setAttribute('style', this._getTransformation(x, y));
		});
	}
}

const height = svg.getBoundingClientRect().height;
const width = svg.getBoundingClientRect().width;
const balls = Array.from(new Array(900)).map((item, index) => {
	return new Ball(index, width, height);
});
balls.forEach((ball) => ball.move());
setInterval(() => {
	balls.forEach((ball) => ball.move());
}, 2000);

balls.forEach((ball) => ball.draw(svg));

console.log(balls);