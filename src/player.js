class Player {

	constructor(playerEl, isFirstPlayer) {
		if(isFirstPlayer === 'player1') {
			this._buildFirstPlayer(playerEl);
		} else {
			this._buildSecondPlayer(playerEl);
		}
	}

	move() {

	}

	moveUp(playerEl) {
		if(this.y-this.velocityY <= 0) {
			playerEl.style.marginTop = 0 + 'px';
		} else {
			this.y -= this.velocityY;
			playerEl.style.marginTop = this.y + 'px';
		}
	}
	
	moveDown(playerEl, maxHeight) {
		if((this.y+this.height)+this.velocityY >= maxHeight) {
			playerEl.style.marginTop = (maxHeight-this.height) + 'px';
		} else {
			this.y += this.velocityY;
			playerEl.style.marginTop = this.y + 'px';
		}
	}

	_buildFirstPlayer(playerEl) {
		this.type = 'player1';
		this.x = 0;
		this.y = 0;
		this.velocityY = 8,
		this.speed =  10,
		//this.properties = playerEl.getBoundingClient();
		this.top = playerEl.getBoundingClientRect().top,
		this.bottom = playerEl.getBoundingClientRect().bottom,
		this.height =  playerEl.getBoundingClientRect().height,
		this.width =  playerEl.getBoundingClientRect().width,
		this.score = 0,
		this.ready = false
	}

	_buildSecondPlayer(computerEl) {
		const leftGridCellWidth = computerEl.getBoundingClientRect().x-document.getElementById('game-window').getBoundingClientRect().width; //TODO: refactor: gameWindow hat hier auch nix zu suchen
		const topGridCellHeight = document.getElementById('game-title').getBoundingClientRect().height; //TODO: refactor: title hat hier nix zu suchen

		this.type = 'player2',
		this.x = computerEl.getBoundingClientRect().x-leftGridCellWidth-computerEl.getBoundingClientRect().width,	
		this.y = computerEl.getBoundingClientRect().y-topGridCellHeight,
		this.velocityY = 8,
		this.speed = 10,
		this.top = computerEl.getBoundingClientRect().top,
		this.bottom = computerEl.getBoundingClientRect().bottom,
		this.height = computerEl.getBoundingClientRect().height,
		this.width = computerEl.getBoundingClientRect().width,
		this.score = 0
	}
}

export { Player };