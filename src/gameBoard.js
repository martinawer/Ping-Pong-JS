import { Ball } from './ball.js';
import { Player } from './player.js'
import { Menu } from './menu.js';
import { sleep } from './utils/helper.js';
import { Scoreboard } from './scoreboard.js';
import { checkBoundaries } from './utils/boundariesChecker.js';
import { Keyboard } from './keyboard.js';
import { gameModes } from './enum/gameModes.js';


class GameBoard {

	_fieldEl = document.getElementById('game-window');
	_player1El = document.getElementById('player1-block');
	_player2El = document.getElementById('player2-block');
	_gameMenuEl = document.getElementById('game-menu');

	constructor() {
		this.player1 = new Player(this._player1El, 'player1');
		this.player2 = new Player(this._player2El, 'player2');
		this.ball = new Ball().setBallSize().draw();
		this.field = this._fieldEl.getBoundingClientRect();
		this.scoreBoard = new Scoreboard(0, 0);
		this.menu = new Menu();
		this.keyboard = new Keyboard();	
		this._attachEventListener();
	}

	_attachEventListener() {
		window.addEventListener(this.keyboard.getListenerKey(), (event) => this.detectKey(event));
	}

	_detachEventListener() {
		window.removeEventListener(this.keyboard.getListenerKey(), (event) => this.detectKey(event));
	}

	sync() {
		this.field = this._fieldEl.getBoundingClientRect();
		this.ball.setBallSize();
	}

	detectKey(event) { //TODO: is now dependent from gameBoard and not from keyboard, keyboard mode or gamemode (Needs change)
		let state = this.keyboard.detectKey(event);
		if(state) {
			if(state === 'Start') {
				this.prepare();
				this.start();
			}
			else if(state.player === 'Player1') this.player1.move(state.direction, this._player1El, this.field.height);
			else if(state.player === 'Player2') this.player2.move(state.direction, this._player2El, this.field.height);
		}
	}

	prepare() {
		this._detachEventListener();
		const gameMode = this.getCheckedRadioButtonValue();
		this.keyboard.setMode(gameMode);
		this._attachEventListener();
	}

	getCheckedRadioButtonValue() {
		const radioButtons = document.querySelectorAll('input[name="gameMode"]');
		console.log(radioButtons);
		for(const rbtn of radioButtons) {
			if(rbtn.checked) {
				return rbtn.value;
			}
		}
	}

	async start() {
		await this._countdown();
		setInterval(async () => { await this._update() }, 1000/60);
		this.menu.hide();
	}

	async _countdown() {
		let counter = 3;
		this.player1.ready = true;
		while(counter >= 0) {
			this._gameMenuEl.innerHTML = counter--;
			await sleep(750);
		}
	}

	async _update() {
		this.ball.draw();
		let player = (this.ball.x + this.ball.radius < this.ball.fieldWidth/2) ? this.player1 : this.player2;
		let goal = checkBoundaries(this.ball, player);
		
		if(goal) {
			this.updateScoreBoard(goal);
			this.ball.resetBall();
		}
	}

	updateScoreBoard(player) {
		this.scoreBoard.addScoreTo(player);
	}
}

export { GameBoard };