import { Paddle } from './paddle.js';

class Player extends Paddle {

	constructor(paddleSide) {
		super(paddleSide);
	}

	move(direction, maxHeight) {
		if(direction === 'UP') {
			this._moveUp();
		} else {
			this._moveDown(maxHeight);
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

export { Player };