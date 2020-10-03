class Menu {

	_gameMenuEl = document.getElementById('game-menu');

	hide() {
		this._gameMenuEl.style.display = 'none';
		return this;
	}

}

export { Menu };