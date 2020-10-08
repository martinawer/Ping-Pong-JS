import { DeltaTimer } from '../utils/deltaTimer.js';

let keyboard = {};
let repeat_interval;
let isWaiting = false;

function initKeypressedEvent(interval) {
    isWaiting = false;
    repeat_interval = interval;
    window.addEventListener("keyup", keyup, { cancelable: true });
    window.addEventListener("keydown", keydown, { cancelable: true });
};

function keydown(event) {
    let keyCode = event.keyCode;
    let key = keyboard[keyCode];

    if (key) {
        if (!key.start)
            key.start = key.timer.start();
        key.pressed = true;
    } else {
        let timer = new DeltaTimer(function (time) {
            if (key.pressed && !isWaiting) {
                let event = document.createEvent("Event");
                event.initEvent("keypressed", true, true);
                event.time = time - key.start;
                event.keyCode = keyCode;
                window.dispatchEvent(event);
            } else {
                key.start = 0;
                timer.stop();
            }
        }, repeat_interval);

        key = keyboard[keyCode] = {
            pressed: true,
            timer: timer
        };

        key.start = timer.start();
    }
}

function keyup(event) {
    if(keyboard[event.keyCode]) {
        keyboard[event.keyCode].pressed = false;
    }
}

function terminateKeypressedEvent() {
    isWaiting = true;
    window.removeEventListener("keyup", keyup, { cancelable: true });
    window.removeEventListener("keydown", keydown, { cancelable: true });
    keyboard = {};
}

export { initKeypressedEvent, terminateKeypressedEvent};