class Scoreboard {

	_player1ScoreEl = document.getElementById('player1-score');
	_player2ScoreEl = document.getElementById('player2-score');

	player1_score;
	player2_score;

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
		return this.isGameOver();
	}

	isGameOver() {
		if(this.player1_score === 2) {
			this.resetScoreboard();
			return 1;
		} else if(this.player2_score === 2) {
			this.resetScoreboard();
			return 2;
		}
		return false;
	}

	resetScoreboard() {
		this._player1ScoreEl.innerHTML = 0;
		this._player2ScoreEl.innerHTML = 0;
		this.player1_score = 0;
		this.player2_score = 0;
	}
}

export { Scoreboard };