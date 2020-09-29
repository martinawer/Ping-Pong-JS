import { Game } from "./src/game.js";

const game = new Game();

window.onresize = synchronizeGame;
window.addEventListener('keypressed', detect);

function detect(event) {
	game.detectKey(event);
}

function synchronizeGame() {
	game.sync();
	//funktioniert immer noch nicht ganz so wie erhofft, mal schaun, ball position und spieler position müssen vielleicht angepasst werden
}

function DeltaTimer(render, interval) {
    let timeout;
    let lastTime;

    this.start = start;
    this.stop = stop;

    function start() {
        timeout = setTimeout(loop, 0);
        lastTime = Date.now();
        return lastTime;
    }

    function stop() {
        clearTimeout(timeout);
        return lastTime;
    }

    function loop() {
        let thisTime = Date.now();
        let deltaTime = thisTime - lastTime;
        let delay = Math.max(interval - deltaTime, 0);
        timeout = setTimeout(loop, delay);
        lastTime = thisTime + delay;
        render(thisTime);
    }
}

(function (interval) {
    let keyboard = {};

    window.addEventListener("keyup", keyup, false);
    window.addEventListener("keydown", keydown, false);

    function keyup(event) {
		if(keyboard[event.keyCode]) {
			keyboard[event.keyCode].pressed = false;
		}
    }

    function keydown(event) {
        let keyCode = event.keyCode;
        let key = keyboard[keyCode];

        if (key) {
            if (!key.start)
                key.start = key.timer.start();
            key.pressed = true;
        } else {
            let timer = new DeltaTimer(function (time) {
                if (key.pressed) {
                    let event = document.createEvent("Event");
                    event.initEvent("keypressed", true, true);
                    event.time = time - key.start;
                    event.keyCode = keyCode;
                    window.dispatchEvent(event);
                } else {
                    key.start = 0;
                    timer.stop();
                }
            }, interval);

            key = keyboard[keyCode] = {
                pressed: true,
                timer: timer
            };

            key.start = timer.start();
        }
    }
})(10);

export { game as gameInstance };