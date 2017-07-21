import {fabric} from 'fabric';

const canvasElement = document.querySelector('canvas');
//console.log(canvasElement);

const canvas = new fabric.StaticCanvas('canvas');

class Ball {
	constructor(id) {
		this._id = id;
		this._radius = Math.random() * 5 + 5;
		this._xSpeed = Math.random() * 3;
		this._ySpeed = Math.random() * 3;
		this._x = 100;
		this._y = 100;
		this._fabric = new fabric.Circle({
			left: this._x
			, top: this._y
			, fill: 'red'
			, selectable: false
			, hasControls: false
			, hasRotatingPoint: false
			, selection: false
			, radius: this._radius
		});
	}

	move() {
		//console.log(this._fabric.getLeft());
		if (this._y <= 0 || this._y >= this._height - this._radius) this._ySpeed *= -1;
		if (this._x <= 0 || this._x >= this._width - this._radius) this._xSpeed *= -1;
		this._x += this._xSpeed;
		this._y += this._ySpeed;
		this._fabric.setLeft(this._x);
		this._fabric.setTop(this._y);
	}

	setDimensions(width, height) {
		this._height = height;
		this._width = width;
	}

	add(canvas) {
		canvas.add(this._fabric);
	}

}



const balls = Array.from(new Array(500)).map((item, index) => new Ball(index));
console.log(balls.length);
const height = canvasElement.offsetHeight;
const width = canvasElement.offsetWidth;
balls.forEach((ball) => {
	ball.setDimensions(width, height);
	ball.add(canvas);
});
//console.log(balls);

function animate() {
	balls.forEach((ball) => ball.move());
	canvas.renderAll();
	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);