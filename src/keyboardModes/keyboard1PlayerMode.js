import { keys } from '../enum/keys.js';
import { KeyboardMode } from './keyboardMode.js';
import { initKeypressedEvent, terminateKeypressedEvent } from '../keyboardEvents/keypressed.js'

class Keyboard1PlayerMode extends KeyboardMode {

	listenerKey = 'keypressed';
	
	constructor(gameMode) {
		super(gameMode);
	}

	init() {
		initKeypressedEvent(18);
	}

	detectKey(event) {
		let state;
		if(event.keyCode === keys.W) {
			return state = { player: 'Player1', direction: 'UP' };
		} else if(event.keyCode === keys.S) {
			return state = { player: 'Player1', direction: 'DOWN' };
		}
	}

	terminate() {
		terminateKeypressedEvent();
	}
}

export { Keyboard1PlayerMode };