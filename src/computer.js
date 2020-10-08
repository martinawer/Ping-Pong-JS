import { Paddle } from './paddle.js';

class Computer extends Paddle {

	constructor(paddleSide) {
		super(paddleSide);
	}

	move(ball, maxHeight) {
		if(this.x > 0 && ball.x >= this.x-150 || this.x === 0 && ball.x <= 150) {
			if(ball.y > this.y+(this.height/2)) {
				this._moveDown(maxHeight);
			} else if(ball.y < this.y+(this.height/2)) {
				this._moveUp();
			}
		}
	}

	_moveUp() {
		if(this.y-this.velocityY <= 0) {
			this.element.style.marginTop = 0 + 'px';
		} else {
			this.y -= this.velocityY;
			this.element.style.marginTop = this.y + 'px';
		}
	}
	
	_moveDown(maxHeight) {
		if((this.y+this.height)+this.velocityY >= maxHeight) {
			this.element.style.marginTop = (maxHeight-this.height) + 'px';
		} else {
			this.y += this.velocityY;
			this.element.style.marginTop = this.y + 'px';
		}
	}
}

export { Computer };