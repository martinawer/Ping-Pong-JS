class Paddle {

	constructor(paddleSide) {
		if(paddleSide === 'left') {
			this._buildLeftPlayer(document.getElementById('player1-block'));
		} else if(paddleSide === 'right') {
			this._buildRightPlayer(document.getElementById('player2-block'));
		}
	}
	
	_buildLeftPlayer(playerEl) {
		this.element = playerEl;
		this.x = 0;
		this.y = 8;
		this.velocityY = 8,
		this.speed =  10,
		this.height =  playerEl.getBoundingClientRect().height,
		this.width =  playerEl.getBoundingClientRect().width
	}

	_buildRightPlayer(playerEl) {
		this.element = playerEl;
		this.x = playerEl.getBoundingClientRect().x-document.getElementById('left-grid-cell').getBoundingClientRect().width,
		this.y = 8,
		this.velocityY = 8,
		this.speed = 10,
		this.height = playerEl.getBoundingClientRect().height,
		this.width = playerEl.getBoundingClientRect().width
	}
}

export { Paddle };