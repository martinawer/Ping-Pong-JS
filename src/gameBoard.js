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
	_countdownMessageEl = document.getElementById('countdown-message');
	_updateInterval;
	_computerInterval;
	_nextRound = false;

	currentGameMode;
	player1;
	player2;

	constructor() {
		this.ball = new Ball().setBallSize().draw();
		this.field = this._fieldEl.getBoundingClientRect();
		this.scoreBoard = new Scoreboard(0, 0);
		this.menu = new Menu();
		this.keyboard = new Keyboard();	
		this._attachEventListener();
	}

	sync() {
		this.field = this._fieldEl.getBoundingClientRect();
		this.ball.setBallSize();
	}

	async detectKey(event) {
		let state = this.keyboard.detectKey(event);
		if(state) {
			if(state === 'Start') {
				this.prepare();
				await this.start();
			} else if(state === 'New Game') {
				this.keyboard.setMode(this.currentGameMode);
				await this.start();
			} else if(state === 'Menu') {
				this._detachEventListener();
				this.keyboard.setMode(gameModes.menu);
				this.menu.hide();
				this.menu.displayMenu();
				this._nextRound = true;
			}
			else if(state.player === 'Player1') this.player1.move(state.direction, this._player1El, this.field.height);
			else if(state.player === 'Player2') this.player2.move(state.direction, this._player2El, this.field.height);
		}
	}

	prepare() {
		if(!this._nextRound) this._detachEventListener(); //TODO: do these even work?
		this.currentGameMode = this._getCheckedRadioButtonValue();
		this.keyboard.setMode(this.currentGameMode);
		this.initPlayers();
		this.keyboard._safeMode = false;
		if(!this._nextRound) this._attachEventListener();
	}

	initPlayers() {
		if(this.currentGameMode === gameModes.singlePlayer) {
			this.player1 = new Player(this._player1El, 'player1');
			this.player2 = new Player(this._player2El, 'computer2');
		} else if(this.currentGameMode === gameModes.multiPlayer) {
			this.player1 = new Player(this._player1El, 'player1');
			this.player2 = new Player(this._player2El, 'player2');
		}
	}

	async start() {
		this.menu.hide();
		this.menu.displayCountdown();
		await this._countdown();
		this._updateInterval = setInterval(() => { this._update() }, 1000/60);
		this.menu.hide();
	}

	_attachEventListener() {
		window.addEventListener(this.keyboard.getListenerKey(), (event) => this.detectKey(event));
	}

	_detachEventListener() {
		window.removeEventListener(this.keyboard.getListenerKey(), (event) => this.detectKey(event));
	}

	_getCheckedRadioButtonValue() {
		const radioButtons = document.querySelectorAll('input[name="gameMode"]');
		for(const rbtn of radioButtons) {
			if(rbtn.checked) {
				return rbtn.value;
			}
		}
	}

	_moveComputer(computerEl, maxHeight) {
		if(this.ball.y > this.player2.y+(this.player2.height/2)) {
			this.player2.move('DOWN', computerEl, maxHeight);
		} else if(this.ball.y < this.player2.y+(this.player2.height/2)) {
			this.player2.move('UP', computerEl, maxHeight);
		}

	}

	async _countdown() {
		let counter = 3;	
		this.player1.ready = true;
		while(counter >= 0) {
			this._countdownMessageEl.innerText = counter--;
			await sleep(750);
		}
	}

	_update() {
		this.ball.draw();
		//TODO: only move computer when its flying in his direction and is on his field
		if(this.ball.x >= (this.field.width-this.field.width/3)) {
			this._moveComputer(this._player2El, this.field.height);
		}
		const player = (this.ball.x + this.ball.radius < this.ball.fieldWidth/2) ? this.player1 : this.player2;
		const winner = (player === this.player1) ? this.player2 : this.player1;
		const goal = checkBoundaries(this.ball, player);
		
		if(goal) {
			this.scoreBoard.addScoreTo(goal);
			this.ball.resetBall().draw();
		}

		if(this.scoreBoard.isGameOver()) {
			clearInterval(this._updateInterval);
			this.menu.displayWinner(winner.type);
			this.keyboard.setMode(gameModes.gameOver);
		}

	}

}

export { GameBoard };