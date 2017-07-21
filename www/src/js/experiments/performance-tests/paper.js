/* global paper */
const canvas = document.querySelector('canvas');
paper.setup(canvas);


class Ball {
	constructor(id, width, height) {
		this._id = id;
		this._width = width;
		this._height = height;
		this._xSpeed = Math.random() * 5;
		this._ySpeed = Math.random() * 5;
	}

	draw(circleDef) {

		const radius = Math.round(Math.random() * 20);
		const text = new paper.PointText(new paper.Point(radius / 2, radius / 2));
		text.justification = 'center';
		text.fillColor = 'black';
		text.content = Math.random().toFixed(2);

		const circle = new paper.Shape.Circle(new paper.Point(0, 0), radius);
		circle.fillColor = 'red';
		circle.onMouseDown = function(ev) {
			console.log(ev.target);
			this.fillColor = 'blue';
		};

		const center = new paper.Point(Math.random() * this._width, Math.random() * this._height);
		const group = new paper.Group([circle, text]);
		group.position = center;

		circle.onFrame = (ev) => {
			const x = group.position.x + this._xSpeed;
			const y = group.position.y + this._ySpeed;
			if (x < 0 || x > this._width) this._xSpeed *= -1;
			if (y < 0 || y > this._height) this._ySpeed *= -1;
			group.position = new paper.Point(x, y);
		};

		this._group = group;
		this._circle = circle;
		this._text = text;
	}

}	


//const circle = new paper.Shape.Circle(new paper.Point(100, 100), 20);
//circle.fillColor = 'red';
const width = canvas.offsetWidth;
const height = canvas.offsetHeight;
const balls = Array.from(new Array(900)).map((item, index) => {
	return new Ball(index, width, height);
});
balls.forEach((ball) => ball.draw());


