function checkBoundaries(ball, player) {
	if( (ball.x-ball.radius) < 0 ) {
		return -1;
	} else if (ball.x > ball.fieldWidth-ball.radius) {
		return 1;
	}


	if( (ball.y-ball.radius) < 0 || ball.y> ball.fieldHeight-ball.radius) {
		ball.velocityY = -ball.velocityY;
	}
	
	let angleRad = 0;

	if(collision(ball, player)) {
		let collidePoint = (ball.y - (player.y + player.height/2));
		collidePoint = collidePoint / (player.height/2);

		angleRad = (Math.PI/4) * collidePoint;

		let direction;
		if(player.type === 'player1') {
			direction = (ball.x + ball.radius < ball.canvas.width/2) ? -1 : 1;
		} else {
			direction = (ball.x + ball.radius < ball.canvas.width/2) ? 1 : -1;
		}

		ball.velocityX = direction * ball.speed * Math.cos(angleRad);
		ball.velocityY = ball.speed * Math.sin(angleRad);

		if(ball.speed < ball.maxSpeed) {
			ball.speed += 0.5;
		}
	}

	if((ball.y += ball.velocityY) > ball._canvasWrapper.clientHeight) {
		ball.y = ball._canvasWrapper.clientHeight-0.5;
	} else {
		ball.x += ball.velocityX;
		ball.y += ball.velocityY;
	}
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

export { checkBoundaries };