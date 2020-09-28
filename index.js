const playerBlockEl = document.getElementById('player-block');
const computerBlockEl = document.getElementById('computer-block');
const gameWindowEl = document.getElementById('game-window');
const ballEl = document.getElementById('game-ball');
const canvasWrapper = document.getElementById('canvas-wrapper');
const gameMenuEl = document.getElementById('game-menu');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const gameTitelEl = document.getElementById('game-title');

const keys = {
	ARROW_UP: 38,
	ARROW_DOWN: 40,
	SPACE: 32,
	W: 87,
	S: 83
}

const gameWindow = {
	top: gameWindowEl.getBoundingClientRect().top,
	bottom: gameWindowEl.getBoundingClientRect().bottom,
	height: gameWindowEl.getBoundingClientRect().height,
	width: gameWindowEl.getBoundingClientRect().width
}

const player = {
	name: 'player',	
	x: 0,	
	y: 0,
	velocityY: 8,
	speed: 20,
	top: playerBlockEl.getBoundingClientRect().top,
	bottom: playerBlockEl.getBoundingClientRect().bottom,
	height: playerBlockEl.getBoundingClientRect().height,
	width: playerBlockEl.getBoundingClientRect().width,
	score: 0,
	ready: false
}

const leftGridCellWidth = computerBlockEl.getBoundingClientRect().x-gameWindow.width;
const topGridCellHeight = gameTitelEl.getBoundingClientRect().height;

const computer = {
	name: 'computer',
	x: computerBlockEl.getBoundingClientRect().x-leftGridCellWidth-computerBlockEl.getBoundingClientRect().width,	
	y: computerBlockEl.getBoundingClientRect().y-topGridCellHeight,
	velocityY: 8,
	speed: 20,
	top: computerBlockEl.getBoundingClientRect().top,
	bottom: computerBlockEl.getBoundingClientRect().bottom,
	height: computerBlockEl.getBoundingClientRect().height,
	width: computerBlockEl.getBoundingClientRect().width,
	score: 0
}

let ballCanvas;
const ball = {
	refreshIntervalMs: 20,
	radius: 10,
	speed: 5,
	x: gameWindow.width/2,
	y: gameWindow.height/2,
	velocityX: 4,
	velocityY: 4
}

async function detectKey(event) {
	if(event.keyCode === keys.ARROW_UP) {
		moveUp(player, playerBlockEl);
	} else if(event.keyCode === keys.ARROW_DOWN) {
		moveDown(player, playerBlockEl);
	} else if(event.keyCode === keys.SPACE && !player.ready) {
		await startGame();
	} else if(event.keyCode === keys.W) {
		moveUp(computer, computerBlockEl);
	} else if(event.keyCode === keys.S) {
		moveDown(computer, computerBlockEl);
	}
}



async function draw() {
	ballCanvas.clearRect(0, 0, gameWindow.width, gameWindow.height);
	ballCanvas.beginPath();
	ballCanvas.fillStyle = '#E3563D';
	ballCanvas.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
	ballCanvas.closePath();
	ballCanvas.fill();
	await checkBoundaries();
}

async function checkBoundaries() {
	if( (ball.x-ball.radius) < 0 ) {
		computerScoreEl.innerHTML = ++computer.score;
		resetBall();
	} else if (ball.x> gameWindow.width-ball.radius) {
		playerScoreEl.innerHTML = ++player.score;
		resetBall();
	}


	if( (ball.y-ball.radius) < 0 || ball.y> gameWindow.height-ball.radius) {
		ball.velocityY = -ball.velocityY;
	}

	let lastHit = (ball.x + ball.radius < gameWindow.width/2) ? player : computer;
	let angleRad = 0;

	if(collision(ball, lastHit)) {
		let collidePoint = (ball.y - (lastHit.y + lastHit.height/2));
		collidePoint = collidePoint / (lastHit.height/2);

		angleRad = (Math.PI/4) * collidePoint;

		// change the X and Y velocity direction
		let direction;
		if(lastHit.name === 'player') {
			direction = (ball.x + ball.radius < ballCanvas.width/2) ? -1 : 1;
		} else {
			direction = (ball.x + ball.radius < ballCanvas.width/2) ? 1 : -1;
		}

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
		ball.velocityY = ball.speed * Math.sin(angleRad);
		ball.speed += 0.3;
	}

	ball.x += ball.velocityX;
    ball.y += ball.velocityY;

}

function collision(ball, player) {
	player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;
    
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
	ball.right = ball.x + ball.radius;

    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
}

function moveUp(player, playerEl) {
	if(player.y-player.velocityY <= 0) {
		playerEl.style.marginTop = 0 + 'px';
	} else {
		player.y -= player.velocityY;
		playerEl.style.marginTop = player.y + 'px';
	}
}

function moveDown(player, playerEl) {
	if((player.y+player.height)+player.velocityY >= gameWindow.height) {
		playerEl.style.marginTop = (gameWindow.height-player.height) + 'px';
	} else {
		player.y += player.velocityY;
		playerEl.style.marginTop = player.y + 'px';
	}
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
})(player.speed);

function sync() {
	gameWindow.top = gameWindowEl.getBoundingClientRect().top;
	gameWindow.bottom = gameWindowEl.getBoundingClientRect().bottom;
	gameWindow.height = gameWindowEl.getBoundingClientRect().height;
	init();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function resetBall() {
	ball.x = gameWindow.width/2;
	ball.y = gameWindow.height/2;
	ball.velocityX = ball.velocityX < 0 ? 4 : -4;
	ball.refreshIntervalMs = 20;
	ball.speed = 5;
}

function init() {
	ballEl.height = canvasWrapper.clientHeight;
	ballEl.width = canvasWrapper.clientWidth;
}

async function startGame() {
	let counter = 3;
	player.ready = true;
	while(counter >= 0) {
		gameMenuEl.innerHTML = counter--;
		await sleep(10);
	}

	await initBall();
}

async function initBall() {
	ballCanvas = ballEl.getContext('2d');
	setInterval(await draw, ball.refreshIntervalMs);

	gameMenuEl.style.display = 'none';
}

window.addEventListener('keypressed', detectKey);
window.onresize = sync;