import { keys } from '../enum/keys.js';
import { KeyboardMode } from './keyboardMode.js';
import { initKeypressedEvent, terminateKeypressedEvent } from '../keyboardEvents/keypressed.js'

class Keyboard1PlayerMode extends KeyboardMode {

	listenerKey = 'keypressed';
	_computerInterval;
	
	constructor() {
		super();
	}

	init() {
		initKeypressedEvent(18);
		this._computerInterval = setInterval(() => this._moveComputer, 50);
	}

	detectKey(event) {
		let state;
		if(event.keyCode === keys.W) {
			return state = { player: 'Player1', direction: 'UP' };
		} else if(event.keyCode === keys.S) {
			return state = { player: 'Player1', direction: 'DOWN' };
		}
	}

	_moveComputer() {

	}

	terminate() {
		terminateKeypressedEvent();
	}
}

export { Keyboard1PlayerMode };