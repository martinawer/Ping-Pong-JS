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
}

export { Computer };