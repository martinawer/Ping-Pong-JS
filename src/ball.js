import { gameInstance } from '../index.js';
import { Scoreboard } from './scoreboard.js';

class Ball {

	_ballEl = document.getElementById('game-ball');
	_canvasWrapper = document.getElementById('canvas-wrapper');
	_gameWindowEl = document.getElementById('game-window');


	constructor(field) {
		this.canvas = this._ballEl.getContext('2d');
		this.refreshIntervalMs = 10;
		this.maxRefreshIntervalMs = 5;
		this.radius = 10;
		this.speed = 5;
		this.maxSpeed = 17;
		this.x = field.width/2;
		this.fieldWidth = field.width;
		this.fieldHeight = field.height;
		this.y = field.height/2;
		this.velocityX = 4;
		this.velocityY = 0;
		this.setBallSize();
	}

	setBallSize() {
		this._ballEl.height = this._canvasWrapper.clientHeight;
		this._ballEl.width = this._canvasWrapper.clientWidth;
		this.resetBall();
		//constructor: this.x und this.y vielleicht ohne field (gameWindow), sondern eher mit canvasWrapper mal schaun
	}

	shootBall() {
		setInterval(async () => { await this.draw() }, this.refreshIntervalMs);
	}

	async draw() {
		this.canvas.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
		this.canvas.beginPath();
		this.canvas.fillStyle = '#E3563D';
		this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		this.canvas.closePath();
		this.canvas.fill();
		await this.checkBoundaries();
	}

	async checkBoundaries() {
		if( (this.x-this.radius) < 0 ) {
			Scoreboard.addScoreTo('player2');
			this.resetBall();
		} else if (this.x > this.fieldWidth-this.radius) {
			Scoreboard.addScoreTo('player1');
			this.resetBall();
		}
	
	
		if( (this.y-this.radius) < 0 || this.y> this.fieldHeight-this.radius) {
			this.velocityY = -this.velocityY;
		}
		
		let lastHit = (this.x + this.radius < this.fieldWidth/2) ? gameInstance.player1 : gameInstance.player2;
		let angleRad = 0;

		if(this.collision(this, lastHit)) {
			let collidePoint = (this.y - (lastHit.y + lastHit.height/2));
			collidePoint = collidePoint / (lastHit.height/2);
	
			angleRad = (Math.PI/4) * collidePoint;
	
			// change the X and Y velocity direction
			let direction;
			if(lastHit.type === 'player1') {
				direction = (this.x + this.radius < this.canvas.width/2) ? -1 : 1;
			} else {
				direction = (this.x + this.radius < this.canvas.width/2) ? 1 : -1;
			}
	
			this.velocityX = direction * this.speed * Math.cos(angleRad);
			this.velocityY = this.speed * Math.sin(angleRad);
	
			if(this.speed < this.maxSpeed) {
				this.speed += 1;
			} else {
				if(this.refreshIntervalMs > this.maxRefreshIntervalMs) {
					this.refreshIntervalMs -= 1;
				}
			}
		}
	
		this.x += this.velocityX;
		this.y += this.velocityY;
	
	}

	collision(ball, player) {
		player.top = player.y;
		player.bottom = player.y + player.height;
		player.left = player.x;
		player.right = player.x + player.width;
		
		ball.top = ball.y - ball.radius;
		ball.bottom = ball.y + ball.radius;
		ball.left = ball.x - ball.radius;
		ball.right = ball.x + ball.radius;
	
		return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
	}

	resetBall() {
		this.x = this.fieldWidth/2;
		this.y = this.fieldHeight/2;
		this.velocityX = this.velocityX < 0 ? 4 : -4;
		this.velocityY = 0;
		this.refreshIntervalMs = 20;
		this.speed = 5;
	}

}

export { Ball };