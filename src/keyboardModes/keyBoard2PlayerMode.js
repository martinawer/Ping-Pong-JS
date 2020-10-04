import { keys } from '../enum/keys.js';
import { KeyboardMode } from './keyboardMode.js';

class Keyboard2PlayerMode extends KeyboardMode {

	listenerKey = 'keypressed';
	
	constructor(gameMode) {
		super(gameMode);
	}

	detectKey(event) {
		let state;
		if(event.keyCode === keys.W) {
			return state = { player: 'Player1', direction: 'UP' };
		} else if(event.keyCode === keys.S) {
			return state = { player: 'Player1', direction: 'DOWN' };
		} else if(event.keyCode === keys.ARROW_UP)  {
			return state = { player: 'Player2', direction: 'UP' };
		} else if(event.keyCode === keys.ARROW_DOWN) {
			return state = { player: 'Player2', direction: 'DOWN' };
		}
	}
}

export { Keyboard2PlayerMode };