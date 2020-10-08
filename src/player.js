class Player {

	constructor(playerEl, playerType) {
		if(playerType === 'player1') {
			this._buildFirstPlayer(playerEl, playerType);
		} else if(playerType === 'player2') {
			this._buildSecondPlayer(playerEl, playerType);
		} else if(playerType === 'computer1') {
			this._buildFirstPlayer(playerEl, playerType);
		} else if(playerType === 'computer2') {
			this._buildSecondPlayer(playerEl, playerType);
		}
	}

	move(direction, playerEl, maxHeight) {
		if(direction === 'UP') {
			this._moveUp(playerEl);
		} else {
			this._moveDown(playerEl, maxHeight);
		}
	}

	_moveUp(playerEl) {
		if(this.y-this.velocityY <= 0) {
			playerEl.style.marginTop = 0 + 'px';
		} else {
			this.y -= this.velocityY;
			playerEl.style.marginTop = this.y + 'px';
		}
	}
	
	_moveDown(playerEl, maxHeight) {
		if((this.y+this.height)+this.velocityY >= maxHeight) {
			playerEl.style.marginTop = (maxHeight-this.height) + 'px';
		} else {
			this.y += this.velocityY;
			playerEl.style.marginTop = this.y + 'px';
		}
	}

	_buildFirstPlayer(playerEl, playerType) {
		this.type = playerType;
		this.x = 0;
		this.y = 8;
		this.velocityY = 8,
		this.speed =  10,
		this.top = playerEl.getBoundingClientRect().top,
		this.bottom = playerEl.getBoundingClientRect().bottom,
		this.height =  playerEl.getBoundingClientRect().height,
		this.width =  playerEl.getBoundingClientRect().width,
		this.score = 0,
		this.ready = false
	}

	_buildSecondPlayer(playerEl, playerType) {
		const leftGridCellWidth = playerEl.getBoundingClientRect().x-document.getElementById('game-window').getBoundingClientRect().width; //TODO: refactor: gameWindow hat hier auch nix zu suchen

		this.type = playerType,
		this.x = playerEl.getBoundingClientRect().x-leftGridCellWidth-playerEl.getBoundingClientRect().width,	
		this.y = 8,
		this.velocityY = 8,
		this.speed = 10,
		this.top = playerEl.getBoundingClientRect().top,
		this.bottom = playerEl.getBoundingClientRect().bottom,
		this.height = playerEl.getBoundingClientRect().height,
		this.width = playerEl.getBoundingClientRect().width,
		this.score = 0
	}
}

export { Player };