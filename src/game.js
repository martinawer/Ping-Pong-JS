import { Ball } from './ball.js';
import { Player } from './player.js'
import { keys } from '../src/enum/keys.js';
import { sleep } from './util.js';

class Game {

	_fieldEl = document.getElementById('game-window');
	_player1El = document.getElementById('player1-block');
	_player2El = document.getElementById('player2-block');
	_gameMenuEl = document.getElementById('game-menu');


	field = {
		top: this._fieldEl.getBoundingClientRect().top,
		bottom: this._fieldEl.getBoundingClientRect().bottom,
		height: this._fieldEl.getBoundingClientRect().height,
		width: this._fieldEl.getBoundingClientRect().width
	}

	ball;	 //Ping Pong Ball
	static player1; //User
	static player2; //Second User or Computer

	constructor() {
		this.player1 = new Player(this._player1El, 'player1');
		this.player2 = new Player(this._player2El, 'player2');
		this.ball = new Ball(this.field);
	}

	sync() {
		this.field.top = this._fieldEl.getBoundingClientRect().top;
		this.field.bottom = this._fieldEl.getBoundingClientRect().bottom;
		this.field.height = this._fieldEl.getBoundingClientRect().height;
		this.ball.setBallSize();
	}

	async detectKey(event) {
		if(event.keyCode === keys.ARROW_UP) {
			this.player2.moveUp(this._player2El);
		} else if(event.keyCode === keys.ARROW_DOWN) {
			this.player2.moveDown(this._player2El, this.field.height);
		}  else if(event.keyCode === keys.SPACE && !this.player1.ready) {
			await this.start();
		} else if(event.keyCode === keys.W) {
			this.player1.moveUp(this._player1El);
		} else if(event.keyCode === keys.S) {
			this.player1.moveDown(this._player1El, this.field.height);
		}
	}

	async start() {
		let counter = 3;
		this.player1.ready = true;
		while(counter >= 0) {
			this._gameMenuEl.innerHTML = counter--;
			await sleep(250);
		}
		this.ball.shootBall();
		this._gameMenuEl.style.display = 'none';
	}

}

export { Game };