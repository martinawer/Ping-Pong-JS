import { KeyboardMenuMode } from './keyboardModes/keyboardMenuMode.js';
import { Keyboard2PlayerMode } from './keyboardModes/keyBoard2PlayerMode.js';
import { Keyboard1PlayerMode } from './keyboardModes/keyboard1PlayerMode.js';
import { KeyboardGameOverMode } from './keyboardModes/keyboardGameOverMode.js';
import { gameModes } from './enum/gameModes.js';


class Keyboard {
	currentMode;
	keyboardModes = new Map([ 
		[gameModes.menu, new KeyboardMenuMode()],
		[gameModes.singlePlayer, new Keyboard1PlayerMode()],
		[gameModes.multiPlayer, new Keyboard2PlayerMode()],
		[gameModes.gameOver, new KeyboardGameOverMode()]
	]); 

	constructor() {
		this.currentMode = this.keyboardModes.get(gameModes.menu);
	}	

	setMode(gameMode) {
		this.currentMode.terminate();
		this.currentMode = this.keyboardModes.get(gameMode);
		this.currentMode.init();
	}

	detectKey(event) {
		return this.currentMode.detectKey(event);
	}

	getListenerKey() {
		return this.currentMode.listenerKey;
	}

}

export { Keyboard };