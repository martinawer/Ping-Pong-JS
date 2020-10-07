class Scoreboard {

	_player1ScoreEl = document.getElementById('player1-score');
	_player2ScoreEl = document.getElementById('player2-score');

	player1_score;
	player2_score;
	max_score = 2;

	constructor(player1_score, player2_score) {
		this.player1_score = player1_score;
		this.player2_score = player2_score;
	}

	addScoreTo(player) {
		if(player === 1) {
			this._player1ScoreEl.innerHTML = ++this.player1_score;
		} else {
			this._player2ScoreEl.innerHTML = ++this.player2_score;
		}
	}

	isGameOver() {
		if(this.player1_score === this.max_score || this.player2_score === this.max_score) {
			this.resetScoreboard();
			return true;
		} else {
			return false;
		}
	}

	resetScoreboard() {
		this._player1ScoreEl.innerHTML = 0;
		this._player2ScoreEl.innerHTML = 0;
		this.player1_score = 0;
		this.player2_score = 0;
	}
}

export { Scoreboard };