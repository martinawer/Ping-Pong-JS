//Constants
const playerBlockEl = document.getElementById('player-block');
const comuterBlockEl = document.getElementById('computer-block');
const gameWindowEl = document.getElementById('game-window');
const titleEl = document.getElementById('game-title');
const ballEl = document.getElementById('game-ball');
const canvasWrapper = document.getElementById('canvas-wrapper');
const gameMenuEl = document.getElementById('game-menu');

const playerSpeed = 7.5;
const keys = {
	ARROW_UP: 38,
	ARROW_DOWN: 40,
	SPACE: 32
}

// Variables
let gameWindow = {
	top: gameWindowEl.getBoundingClientRect().top,
	bottom: gameWindowEl.getBoundingClientRect().bottom,
	height: gameWindowEl.getBoundingClientRect().height,
	width: gameWindowEl.getBoundingClientRect().width
}

let player = {	
	y: 0,
	top: playerBlockEl.getBoundingClientRect().top,
	height: playerBlockEl.getBoundingClientRect().height,
	movementSpeed: 20,
	ready: false
}
let ballCanvas;
let ball = {
	speed: 12,
	radius: 20,
	x: gameWindow.width/2,
	y: gameWindow.height/2,
	velocityX: 0,
	velocityY: 0
}

function start() {
	if(Math.random() <= 0.25) {
		ball.velocityX = -2;
		ball.velocityY = -2;
	} else if(Math.random() <= 0.5) {
		ball.velocityX = 2;
		ball.velocityY = -2;
	} else if(Math.random() <= 0.75) {
		ball.velocityX = -2;
		ball.velocityY = 2;
	} else {
		ball.velocityX = 0;
		ball.velocityY = 0;
	}
	gameMenuEl.style.display = 'none';
}

async function detectKey(event) {
	if(event.keyCode === keys.ARROW_UP) {
		moveUp();
	} else if(event.keyCode === keys.ARROW_DOWN) {
		moveDown();
	} else if(event.keyCode === keys.SPACE && !player.ready) {
		await startGame();
	}
}

function initBall() {
	ballCanvas = ballEl.getContext('2d');
	setInterval(draw, ball.speed);
}

function draw() {
	ballCanvas.clearRect(0, 0, gameWindow.width, gameWindow.height);
	ballCanvas.beginPath();
	ballCanvas.fillStyle = '#E3563D';
	ballCanvas.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
	ballCanvas.closePath();
	ballCanvas.fill();
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;
	checkBoundaries();
}

function checkBoundaries() {
	if( (ball.x-ball.radius) < 0 || ball.x>gameWindow.width-ball.radius) ball.velocityX =- ball.velocityX; 
	if( (ball.y-ball.radius) < 0 || ball.y>gameWindow.height-ball.radius) ball.velocityY =- ball.velocityY; 
	ball.x += ball.velocityX; 
	ball.y += ball.velocityY;
}

// function checkBoundaries() {
// 	if( (ball.x-ball.radius) < 0 || ball.x> gameWindow.width-ball.radius) resetBall();
// 	if( (ball.y-ball.radius) < 0 || ball.y> gameWindow.height-ball.radius) resetBall();
// 	ball.x += ball.velocityX; 
//  ball.y += ball.velocityY;
// }

function moveUp() {
	if(player.y-playerSpeed <= 0) {
		playerBlockEl.style.marginTop = 0 + 'px';
	} else {
		player.y -= playerSpeed;
		playerBlockEl.style.marginTop = player.y + 'px';
	}
}

function moveDown() {
	if((player.y+player.height)+playerSpeed >= gameWindow.height) {
		playerBlockEl.style.marginTop = (gameWindow.height-player.height) + 'px';
	} else {
		player.y += playerSpeed;
		playerBlockEl.style.marginTop = player.y + 'px';
	}
}

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
		if(keyboard[event.keyCode]) {
			keyboard[event.keyCode].pressed = false;
		}
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
})(player.movementSpeed);

function sync() {
	gameWindow.top = gameWindowEl.getBoundingClientRect().top;
	gameWindow.bottom = gameWindowEl.getBoundingClientRect().bottom;
	gameWindow.height = gameWindowEl.getBoundingClientRect().height;
	init();
	console.log('Sync window size');
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

async function startGame() {
	let counter = 3;
	player.ready = true;
	while(counter >= 0) {
		gameMenuEl.innerHTML = counter--;
		await sleep(1000);
	}
	start();
}

function resetBall() {
	ball.x = gameWindow.width/2;
	ball.y = gameWindow.height/2;
}

initBall();

window.addEventListener('keypressed', detectKey);
window.onresize = sync;