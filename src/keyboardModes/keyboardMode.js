class KeyboardMode {
	listenerKey;

	constructor(gameMode) {
		this.gameMode = gameMode;
	}

	init() {
		throw new Error('No Keyboard Mode specified.');
	}

	detectKey() {
		throw new Error('No Keyboard Mode specified.');
	}

}

export { KeyboardMode };