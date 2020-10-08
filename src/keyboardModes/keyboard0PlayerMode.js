import { keys } from '../enum/keys.js';
import { KeyboardMode } from './keyboardMode.js';
import { initKeypressedEvent, terminateKeypressedEvent } from '../keyboardEvents/keypressed.js'

class Keyboard0PlayerMode extends KeyboardMode {

	listenerKey = 'keypressed';
	_computerInterval;
	
	constructor() {
		super();
	}

	init() {
		initKeypressedEvent(18);
	}

	detectKey(event) {}

	terminate() {
		terminateKeypressedEvent();
	}
}

export { Keyboard0PlayerMode };