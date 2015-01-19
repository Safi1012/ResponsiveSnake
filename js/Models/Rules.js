
define( function() {

	var alive = 1;

	function Rules(alive) {
		this.alive = alive;
	}

	function snakeEatingItself(snake) {
		for (var i = 1; i < snake.length; i++) {
			if ( (snake[0].x === snake[i].x) && (snake[0].y === snake[i].y) ) {
				return true;
			}
		}
		return false;
	}

	function crashedInWall(snake, playground) {
		if ( (snake[0].x === -1) || (snake[0].x === playground.length) || (snake[0].y === -1) || (snake[0].y === playground[0].length ) ) {
			return true;
		}
		return false;
	}



	Rules.prototype = {
		
		isSnakeAlive:function(snake, playground) {
			if ( snakeEatingItself(snake) || crashedInWall(snake, playground) ) {
				return false;
			} else {
				return true;
			}
		}
	};

	return Rules;
});
