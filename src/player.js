function detectKey(event) {
	if(event.keyCode === keys.ARROW_UP) {
		moveUp();
	} else if(event.keyCode === keys.ARROW_DOWN) {
		moveDown();
	}
}