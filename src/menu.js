class Menu {

	_gameMenuEl = document.getElementById('game-menu');
	_gameModeListEl = document.getElementById('gameMode-list');
	_winnerScreenEl = document.getElementById('winner-screen');
	_winnerMessageEl = document.getElementById('winner-message');
	_countdownMessageEl = document.getElementById('countdown-wrapper');

	hide() {
		this._hideMenu();
		this._hideCountdown();
		this._hideWinner();
	}
	
	displayMenu() {
		this._gameMenuEl.style.display = 'flex';
		this._gameModeListEl.style.display = 'initial';
	}

	displayCountdown() {
		this._countdownMessageEl.style.display = 'flex';
	}

	displayWinner(player) {
		this._winnerScreenEl.style.display = 'flex';
		this._winnerMessageEl.innerHTML = `${player} Won!`;
	}

	_hideMenu() {
		this._gameMenuEl.style.display = 'none';
	}

	_hideOptions() {
		this._gameModeListEl.style.display = 'none';
	}

	_hideCountdown() {
		this._countdownMessageEl.style.display = 'none';
	}

	_hideWinner() {
		this._winnerScreenEl.style.display = 'none';
		this._winnerMessageEl.innerHTML = '';
	}

}

export { Menu };