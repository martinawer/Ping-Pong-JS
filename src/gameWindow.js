const gameWindowEl = document.getElementById('game-window');
const titleEl = document.getElementById('game-title');


let gameWindow = {
	top: gameWindowEl.getBoundingClientRect().top,
	bottom: gameWindowEl.getBoundingClientRect().bottom,
	height: gameWindowEl.getBoundingClientRect().height
}