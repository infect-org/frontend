const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

class Ball {
	constructor(id) {
		this._id = id;
		this._radius = Math.random() * 5 + 2;
		this._xSpeed = Math.random() * 10;
		this._ySpeed = Math.random() * 10;
		this._x = 100;
		this._y = 100;
	}

	move() {
		//console.log(this._fabric.getLeft());
		if (this._y <= 0 || this._y >= this._height - this._radius) this._ySpeed *= -1;
		if (this._x <= 0 || this._x >= this._width - this._radius) this._xSpeed *= -1;
		this._x += this._xSpeed;
		this._y += this._ySpeed;
	}

	setDimensions(width, height) {
		this._height = height;
		this._width = width;
	}

	draw(context, offscreenCanvas) {
		/*context.beginPath();
		context.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
		context.closePath();
		context.fill();*/
		context.drawImage(offscreenCanvas, this._x, this._y, this._radius, this._radius);
		context.font = 'Futura';
		context.fillText(Math.random().toFixed(2), this._x, this._y);
	}

}

const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.height = 10;
offscreenCanvas.width = 10;
const offscreenContext = offscreenCanvas.getContext('2d');
offscreenContext.fillStyle = 'red';
offscreenContext.beginPath();
offscreenContext.arc(5, 5, 5, 0, Math.PI * 2);
offscreenContext.closePath();
offscreenContext.fill();


const balls = Array.from(new Array(1500)).map((item, index) => new Ball(index));
console.log(balls.length);

const height = canvas.offsetHeight;
const width = canvas.offsetWidth;
context.canvas.width = width;
context.canvas.height = height;

balls.forEach((ball) => {
	ball.setDimensions(width, height);
});

function animate() {
	context.clearRect(0, 0, width, height);
	balls.forEach((ball) => {
		ball.move();
		ball.draw(context, offscreenCanvas);
	});
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);