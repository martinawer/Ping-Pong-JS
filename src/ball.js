class Ball {

	_ballEl = document.getElementById('game-ball');
	_canvasWrapper = document.getElementById('canvas-wrapper').getBoundingClientRect();

	constructor() {
		this.canvas = this._ballEl.getContext('2d');
		this.radius = 10;
		this.speed = 5;
		this.maxSpeed = 16;
		this.x = this._canvasWrapper.width/2;
		this.y = this._canvasWrapper.height/2;
		this.velocityX = 4;
		this.velocityY = 0;
		this.fieldWidth = this._canvasWrapper.width;
		this.fieldHeight = this._canvasWrapper.height;
	}

	setBallSize() {
		this._ballEl.height = this._canvasWrapper.height;
		this._ballEl.width = this._canvasWrapper.width;
	}

	draw() {
		this.canvas.clearRect(0, 0, this._ballEl.width, this._ballEl.height);
		this.canvas.beginPath();
		this.canvas.fillStyle = '#E3563D';
		this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		this.canvas.closePath();
		this.canvas.fill();
	}
	
	resetBall() {
		this.x = this._ballEl.width/2;
		this.y = this._ballEl.height/2;
		this.velocityX = this.velocityX < 0 ? 4 : -4;
		this.velocityY = 0;
		this.speed = 5;
	}

}

export { Ball };