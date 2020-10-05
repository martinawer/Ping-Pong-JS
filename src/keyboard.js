import { KeyboardMenuMode } from './keyboardModes/keyboardMenuMode.js';
import { Keyboard2PlayerMode } from './keyboardModes/keyBoard2PlayerMode.js';
import { Keyboard1PlayerMode } from './keyboardModes/keyboard1PlayerMode.js';
import { gameModes } from './enum/gameModes.js';


class Keyboard {
	currentMode;
	//keyboardModes = [new KeyboardMenuMode(), new Keyboard2PlayerMode()];
	keyboardModes = new Map([ 
		[gameModes.menu, new KeyboardMenuMode()],
		[gameModes.singlePlayer, new Keyboard1PlayerMode()],
		[gameModes.multiPlayer, new Keyboard2PlayerMode()]
	]); 

	constructor() {
		this.currentMode = this.keyboardModes.get(gameModes.menu);
	}

	setMode(gameMode) {
		this._reset();
		this.currentMode = this.keyboardModes.get(gameMode);
		this.currentMode.init();
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