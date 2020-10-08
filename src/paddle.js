class Paddle {

	constructor(paddleSide) {
		this.y = 8;
		this.velocityY = 8;
		this.speed =  10;

		if(paddleSide === 'left') {
			this._buildLeftPlayer(document.getElementById('player1-block'));
		} else if(paddleSide === 'right') {
			this._buildRightPlayer(document.getElementById('player2-block'));
		}
	}
	
	_buildLeftPlayer(playerEl) {
		this.name = 'Player1';
		this.element = playerEl;
		this.x = 0;
		this.height =  playerEl.getBoundingClientRect().height,
		this.width =  playerEl.getBoundingClientRect().width
	}

	_buildRightPlayer(playerEl) {
		this.name = 'Player2';
		this.element = playerEl;
		this.x = playerEl.getBoundingClientRect().x-document.getElementById('left-grid-cell').getBoundingClientRect().width,
		this.height = playerEl.getBoundingClientRect().height,
		this.width = playerEl.getBoundingClientRect().width
	}

	_moveUp() {
		if(this.y-this.velocityY <= 0) {
			this.element.style.marginTop = 0 + 'px';
		} else {
			this.y -= this.velocityY;
			this.element.style.marginTop = this.y + 'px';
		}
	}
	
	_moveDown(maxHeight) {
		if((this.y+this.height)+this.velocityY >= maxHeight) {
			this.element.style.marginTop = (maxHeight-this.height) + 'px';
		} else {
			this.y += this.velocityY;
			this.element.style.marginTop = this.y + 'px';
		}
	}
}

export { Paddle };