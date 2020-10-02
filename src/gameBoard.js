import { Ball } from './ball.js';
import { Player } from './player.js'
import { keys } from './enum/keys.js';
import { sleep } from './util.js';
import { Scoreboard } from './scoreboard.js';
import { checkBoundaries } from './boundariesChecker.js';


class GameBoard {

	_fieldEl = document.getElementById('game-window');
	_player1El = document.getElementById('player1-block');
	_player2El = document.getElementById('player2-block');
	_gameMenuEl = document.getElementById('game-menu');

	ball;	 //Ping Pong Ball
	player1; //User
	player2; //Second User or Computer
	field = this._fieldEl.getBoundingClientRect();
	scoreBoard = new Scoreboard(0, 0);

	constructor() {
		this.player1 = new Player(this._player1El, 'player1');
		this.player2 = new Player(this._player2El, 'player2');
		this.ball = new Ball();
		this.ball.setBallSize();
	}

	sync() {
		this.field = this._fieldEl.getBoundingClientRect();
		this.ball.setBallSize();
	}

	async detectKey(event) {
		switch(event.keyCode) {
			case keys.ARROW_UP:
				this.player2.moveUp(this._player2El);
				break;
			case keys.ARROW_DOWN:
				this.player2.moveDown(this._player2El, this.field.height);
				break;
			case keys.SPACE:
				if(!this.player1.ready) {
					await this.start();
				}
				break;
			case keys.W:
				this.player1.moveUp(this._player1El);
				break;
			case keys.S:
				this.player1.moveDown(this._player1El, this.field.height);
				break;
		}
	}

	async start() {
		await this._countdown();
		setInterval(async () => { await this._update() }, 1000/60);
		this._gameMenuEl.style.display = 'none';
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