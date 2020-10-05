import { GameBoard } from "./src/gameBoard.js";

const game = new GameBoard();

window.onresize = () => game.sync();
document.addEventListener('click', (event) => startGame(event));

function startGame(event) {
	if(event.target.id === 'start-btn') {
		game.prepare();
		game.start();
	}
}