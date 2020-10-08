import { Game } from "./src/game.js";

const game = new Game();

window.onresize = () => game.sync();
document.addEventListener('click', (event) => startGame(event));

function startGame(event) {
	if(event.target.id === 'start-btn') {
		game.prepare();
		game.start();
	}
}