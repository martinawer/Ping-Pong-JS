import { DeltaTimer } from '../deltaTimer.js';

function initKeypressedEvent(interval) {
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
};

export { initKeypressedEvent };