
define( function() {

    var Pos = function (x, y) {
        this.x = x;
        this.y = y;
    };

    var snake = [];
    var lastDirection;

    function Snake(playground){
        this.snake = generateSnakeHead(playground);
        this.lastDirection = 'right';
    }

    function generateSnakeHead(playground) {
        // starting positing = center
        var xSnakeHead = parseInt(playground.length / 2),
            ySnakeHead = parseInt(playground[0].length / 2);

        snake = [];

        snake.push(new Pos(xSnakeHead, ySnakeHead));
        snake.push(new Pos(xSnakeHead -1, ySnakeHead));
        snake.push(new Pos(xSnakeHead -2, ySnakeHead));
        snake.push(new Pos(xSnakeHead -3, ySnakeHead));
        snake.push(new Pos(xSnakeHead -4, ySnakeHead));
        snake.push(new Pos(xSnakeHead -5, ySnakeHead));
        snake.push(new Pos(xSnakeHead -6, ySnakeHead));
        snake.push(new Pos(xSnakeHead -7, ySnakeHead));
        snake.push(new Pos(xSnakeHead -8, ySnakeHead));

        return snake;
    }

    function moveSnake(xDirection, yDirection) {
        var previousPos;
        var nextPos;

        for (var i = 0; i < snake.length; i++) {

            if (i === 0) {
                previousPos = new Pos(snake[i].x, snake[i].y);
                snake[i].x += xDirection;
                snake[i].y += yDirection;

            } else {
                actualPos = new Pos(snake[i].x, snake[i].y);
                snake[i].x = previousPos.x;
                snake[i].y = previousPos.y;
                previousPos = new Pos(actualPos.x, actualPos.y);
            }
        }
    }



    Snake.prototype = {

        controlSnake:function(lastDirection) {
            switch (lastDirection) {

                case 'left':
                    moveSnake(-1, 0);
                    break;

                case 'up':
                    moveSnake(0, -1);
                    break;

                case 'right':
                    moveSnake(1, 0);
                    break;

                case 'bottom':
                    moveSnake(0, 1);
                    break;
            }
        },

        validateDirection:function(direction) {
            switch (direction) {

                case 'left':
                    if ( (this.snake[0].x === this.snake[1].x) ) {
                        this.lastDirection = 'left';
                    }
                    break;

                case 'up':
                    if ( (this.snake[0].x !== this.snake[1].x) ) {
                        this.lastDirection = 'up';
                    }
                    break;

                case 'right':
                    if ( (this.snake[0].x === this.snake[1].x) ) {
                        this.lastDirection = 'right';
                    }
                    break;

                case 'bottom':
                    if ( (this.snake[0].x !== this.snake[1].x) ) {
                        this.lastDirection = 'bottom';
                    }
                    break;
            }
        },

        inkrementSnake:function() {
            var lastSnakePosition = this.snake.length - 1,
                xPosLastSnakeBodyPiece = this.snake[lastSnakePosition].x,
                yPosLastSnakeBodyPiece = this.snake[lastSnakePosition].y;

            // left
            if (this.snake[lastSnakePosition].x < this.snake[lastSnakePosition - 1].x) {
                this.snake.push(new Pos(xPosLastSnakeBodyPiece - 1, yPosLastSnakeBodyPiece));
            }

            // top
            if (this.snake[lastSnakePosition].y < this.snake[lastSnakePosition - 1].y) {
                this.snake.push(new Pos(xPosLastSnakeBodyPiece, yPosLastSnakeBodyPiece - 1));
            }

            // right
            if (this.snake[lastSnakePosition].x > this.snake[lastSnakePosition - 1].x) {
                this.snake.push(new Pos(xPosLastSnakeBodyPiece + 1, yPosLastSnakeBodyPiece));
            }

            // bottom
            if (this.snake[lastSnakePosition].y > this.snake[lastSnakePosition - 1].y) {
                this.snake.push(new Pos(xPosLastSnakeBodyPiece, yPosLastSnakeBodyPiece + 1));
            }
        }
    };

    return Snake;
});
