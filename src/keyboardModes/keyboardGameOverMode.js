import { keys } from '../enum/keys.js';
import { KeyboardMode } from './keyboardMode.js';

class KeyboardGameOverMode extends KeyboardMode {
	_optionEl = document.getElementById('gameOver-form').lastElementChild;

	listenerKey = 'keyup';	
	
	constructor() {
		super();
		this._optionEl.style.color = '#E3563D';
	}

	init() {}

	detectKey(event) {
		if(event.keyCode === keys.W || event.keyCode === keys.ARROW_UP) {
			this._moveToNext(this._optionEl.previousElementSibling);
		} else if(event.keyCode === keys.S || event.keyCode === keys.ARROW_DOWN) {
			this._moveToNext(this._optionEl.nextElementSibling);
		} else if(event.keyCode === keys.SPACE) {
			if(this._optionEl.innerText === 'New Game') {
				return 'New Game';
			}
			else if(this._optionEl.innerText === 'Menu') return 'Menu';
		}
	}

	terminiate() {}

	_moveToNext(element) {
		if(element && element.id === 'clickable') {
			this._optionEl.style = '#E5E5E5'
			this._optionEl = element;
			element.style.color = '#E3563D';
		}
	}

}

export { KeyboardGameOverMode };