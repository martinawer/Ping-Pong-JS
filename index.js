import { GameBoard } from "./src/gameBoard.js";
import { initKeypressedEvent } from './src/keyboardEvents/keypressed.js';

const game = new GameBoard();

initKeypressedEvent(18);
window.onresize = () => game.sync();
window.addEventListener('keypressed', (event) => game.detectKey(event));

export { game as gameInstance };