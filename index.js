//Constants
const playerBlockEl = document.getElementById('player-block');
const comuterBlockEl = document.getElementById('computer-block');
const gameWindowEl = document.getElementById('game-window');
const titleEl = document.getElementById('game-title');
const ballEl = document.getElementById('game-ball');
const canvasWrapper = document.getElementById('canvas-wrapper');

const playerSpeed = 7.5;
const keys = {
	ARROW_UP: 38,
	ARROW_DOWN: 40
}

// Variables
let gameWindow = {
	top: gameWindowEl.getBoundingClientRect().top,
	bottom: gameWindowEl.getBoundingClientRect().bottom,
	height: gameWindowEl.getBoundingClientRect().height,
	width: gameWindowEl.getBoundingClientRect().width
}

let playerPosition = {	
	y: 0,
	top: playerBlockEl.getBoundingClientRect().top,
	height: playerBlockEl.getBoundingClientRect().height
}
let ball;
let ballRefreshRate = 8; //10 (faster) > 20 (slower) = Movement Speed
let playerMovementSpeed = 20;
let ballRadius = 20;
let ballPosition = {
	x: 100,
	y: 100,
	dx: -2,
	dy: -2,
}

function detectKey(event) {
	if(event.keyCode === keys.ARROW_UP) {
		//can use event.repeat?
		moveUp();
	} else if(event.keyCode === keys.ARROW_DOWN) {
		moveDown();
	}
}

function initBall() {
	ball = ballEl.getContext('2d');
	setInterval(draw, ballRefreshRate);
}

function draw() {
	ball.clearRect(0, 0, gameWindow.width, gameWindow.height);
	ball.beginPath();
	ball.fillStyle = '#E3563D';
	ball.arc(ballPosition.x, ballPosition.y, ballRadius, 0, Math.PI*2, true);
	ball.closePath();
	ball.fill();
	ballPosition.x += ballPosition.dx;
	ballPosition.y += ballPosition.dy;

	//check boundaries
	//TODO: check the direction the ball is coming from
	//if ball hits bottom or right wall it goes in to the center of the ball
	if( (ballPosition.x-ballRadius) < 0 || ballPosition.x>gameWindow.width) ballPosition.dx =- ballPosition.dx; 
	if( (ballPosition.y-ballRadius) < 0 || ballPosition.y>gameWindow.height) ballPosition.dy =- ballPosition.dy; 
	ballPosition.x += ballPosition.dx; 
	ballPosition.y += ballPosition.dy
}

function moveUp() {
	if(playerPosition.y-playerSpeed <= 0) {
		playerBlockEl.style.marginTop = 0 + 'px';
	} else {
		playerPosition.y -= playerSpeed;
		playerBlockEl.style.marginTop = playerPosition.y + 'px';
	}
}

function moveDown() {
	if((playerPosition.y+playerPosition.height)+playerSpeed >= gameWindow.height) {
		playerBlockEl.style.marginTop = (gameWindow.height-playerPosition.height) + 'px';
	} else {
		playerPosition.y += playerSpeed;
		playerBlockEl.style.marginTop = playerPosition.y + 'px';
	}
}

function debug() {
	console.log('Player Position: ', playerPosition);
	console.log('Game Window: ', gameWindow);
	console.log('Ball Canvas size: ', ballEl.getBoundingClientRect());
}

function sync() {
	gameWindow.top = gameWindowEl.getBoundingClientRect().top;
	gameWindow.bottom = gameWindowEl.getBoundingClientRect().bottom;
	gameWindow.height = gameWindowEl.getBoundingClientRect().height;
	init();
	console.log('Sync window size');
}

initBall();

function init() {
	ballEl.height = canvasWrapper.clientHeight;
	ballEl.width = canvasWrapper.clientWidth;
	console.log('Init');
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
        var thisTime = Date.now();
        var deltaTime = thisTime - lastTime;
        var delay = Math.max(interval - deltaTime, 0);
        timeout = setTimeout(loop, delay);
        lastTime = thisTime + delay;
        render(thisTime);
    }
}

(function (interval) {
    var keyboard = {};

    window.addEventListener("keyup", keyup, false);
    window.addEventListener("keydown", keydown, false);

    function keyup(event) {
		//sometimes keyCode is undefined
        keyboard[event.keyCode].pressed = false;
    }

    function keydown(event) {
        var keyCode = event.keyCode;
        var key = keyboard[keyCode];

        if (key) {
            if (!key.start)
                key.start = key.timer.start();
            key.pressed = true;
        } else {
            var timer = new DeltaTimer(function (time) {
                if (key.pressed) {
                    var event = document.createEvent("Event");
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
})(playerMovementSpeed);

window.addEventListener('keypressed', detectKey);
//close if game ended, restart, start menu
window.onresize = sync;