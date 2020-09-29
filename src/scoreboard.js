class Scoreboard {

	static _player1ScoreEl = document.getElementById('player1-score');
	static _player2ScoreEl = document.getElementById('player2-score');

	static player1_score = this._player1ScoreEl.innerHTML;
	static player2_score = this._player2ScoreEl.innerHTML;

	constructor() {}

	static addScoreTo(player) {
		if(player == 'player1') {
			this._player1ScoreEl.innerHTML = ++this.player1_score;
		} else {
			this._player2ScoreEl.innerHTML = ++this.player2_score;
		}
	}
}

export { Scoreboard };