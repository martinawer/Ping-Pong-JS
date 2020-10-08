class KeyboardMode {
	listenerKey;

	constructor() {
	}

	init() {
		throw new Error('No Keyboard Mode specified.');
	}

	detectKey() {
		throw new Error('No Keyboard Mode specified.');
	}

	terminate() {
		//throw new Error('No Keyboard Mode specified.'); TODO: throws error?
	}

}

export { KeyboardMode };