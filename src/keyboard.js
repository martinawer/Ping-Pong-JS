import { KeyboardMenuMode } from './keyboardModes/keyboardMenuMode.js';
import { Keyboard2PlayerMode } from './keyboardModes/keyBoard2PlayerMode.js';
import { initKeypressedEvent, terminateKeypressedEvent } from './keyboardEvents/keypressed.js';


class Keyboard {
	currentMode;
	keyboardModes = [new KeyboardMenuMode(), new Keyboard2PlayerMode()];

	constructor() {
		this.currentMode = this.keyboardModes[0];
	}

	setMode(gameMode) {
		this._reset();
		// keyboardModes.forEach(mode => {
		// 	if(mode.gameMode === gameMode) {
		// 		this.currentMode = mode;
		// 	}
		// });
		if(gameMode === '2Player') {
			this.currentMode = this.keyboardModes[1];
			initKeypressedEvent(18);
		}
	}

	detectKey(event) {
		return this.currentMode.detectKey(event);
	}

	getListenerKey() {
		return this.currentMode.listenerKey;
	}

	_reset() {
	}
}

export { Keyboard };