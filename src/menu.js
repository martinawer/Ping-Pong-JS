class Menu {

	_gameMenuEl = document.getElementById('game-menu');
	_winnerScreenEl = document.getElementById('winner-screen');
	_winnerMessageEl = document.getElementById('winner-message');
	_gameModeListEl = document.getElementById('gameMode-list');
	_countdownMessageEl = document.getElementById('countdown-message');

	hide() {
		this._gameMenuEl.style.display = 'none';
	}
	
	display() {
		this._gameMenuEl.style.display = 'flex';
	}

	hideOptions() {
		this._gameModeListEl.style.display = 'none';
	}

	displayOptions() {
		this._gameModeListEl.style.display = 'initial';
	}

	hideCountdown() {
		this._countdownMessageEl.style.display = 'none';
	}

	displayCountdown() {
		this._countdownMessageEl.style.display = 'initial';
	}

	displayWinner(player) {
		this._winnerScreenEl.style.display = 'flex';
		this._winnerMessageEl.innerHTML += `${player} Won!`;
	}

	hideWinner() {
		this._winnerScreenEl.style.display = 'none';
		this._winnerMessageEl.innerHTML = '';
	}

}

export { Menu };