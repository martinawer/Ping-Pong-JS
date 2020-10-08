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

}

export { Player };