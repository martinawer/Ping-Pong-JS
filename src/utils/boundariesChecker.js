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
	let direction;
	if(collision(ball, player)) {
		let collidePoint = (ball.y - (player.y + player.height/2));
		collidePoint = collidePoint / (player.height/2);

		angleRad = (Math.PI/4) * collidePoint;

		if(player.x === 0) {
			direction = (ball.x + ball.radius < ball.canvas.width/2) ? -1 : 1;
		} else {
			direction = (ball.x + ball.radius < ball.canvas.width/2) ? 1 : -1;
		}

		ball.velocityX = direction * ball.speed * Math.cos(angleRad);
		ball.velocityY = ball.speed * Math.sin(angleRad);

		if(ball.speed < ball.maxSpeed) {
			ball.speed += 0.2;
		}
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

	// console.log(`${player.type} p.left < b.right: ${player.left} < ${ball.right} 
	// p.top < b.bottom: ${player.top} < ${ball.bottom} 
	// p.right > b.left: ${player.right} > ${ball.left} 
	// p.bottom > b.top: ${player.bottom} > ${ball.top}`);

	return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
}

export { checkBoundaries };