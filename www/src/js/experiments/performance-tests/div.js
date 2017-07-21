const div = document.querySelector('div');

class Ball {
	constructor(id, width, height) {
		this._id = id;
		this._width = width;
		this._height = height;
	}
	_getTransformation(x, y) {
		return `transform: translate(${ Math.round(x) }px, ${ Math.round(y) }px)`;
	}
	draw(div) {
		const el = document.createElement('div');
		el.setAttribute('class', 'ball');
		el.setAttribute('style', this._getTransformation(100, 100));
		el.innerHTML = `
				${ Math.random().toFixed(2) }
			`;
		this._element = el;
		div.appendChild(el);
		this._element.addEventListener('transitionend', () => {
			this.move();
		});
	}
	move() {
		const x = Math.random() * this._width;
		const y = Math.random() * this._height;
		requestAnimationFrame(() => {
			this._element.setAttribute('style', this._getTransformation(x, y));
		});
	}
}

const height = div.getBoundingClientRect().height;
const width = div.getBoundingClientRect().width;
console.error(width, height);
const balls = Array.from(new Array(900)).map((item, index) => {
	return new Ball(index, width, height);
});
balls.forEach((ball) => ball.move());
/*setInterval(() => {
	balls.forEach((ball) => ball.move());
}, 2000);*/

balls.forEach((ball) => ball.draw(div));

console.log(balls);