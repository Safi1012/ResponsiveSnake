
define( function() {


    var Pos = function (x, y) {
        this.x = x;
        this.y = y;
    };

    var snake = [];

    function Snake(playground){
        this.snake = generateSnakeHead(playground);
    }

    function generateSnakeHead(playground) {

        // starting positing = center
        var xSnakeHead = parseInt(playground.length / 2);
        var ySnakeHead = parseInt(playground[0].length / 2);

        snake.push(new Pos(xSnakeHead, ySnakeHead) );
        snake.push(new Pos(xSnakeHead -1, ySnakeHead) );
        snake.push(new Pos(xSnakeHead -2, ySnakeHead) );

        return snake;
    }


    Snake.prototype = {

        controlSnake:function(direction) {


            var safeSnake = this.snake;



            switch (direction) {

                case 'left':
                    if ( (this.snake[0].x === this.snake[1].x) ) {
                        --this.snake[0].x;
                    }
                    break;

                case 'up':
                    if ( (this.snake[0].x !== this.snake[1].x) ) {
                        --this.snake[0].y;
                    }

                    break;

                case 'right':
                    if ( (this.snake[0].x === this.snake[1].x) ) {
                        ++this.snake[0].x;
                    }
                    break;

                case 'bottom':
                    if ( (this.snake[0].x !== this.snake[1].x) ) {
                        ++this.snake[0].y;
                    }
                    break;
            }
        },



        inkrementSnake:function() {
            for (var i = 0; i < snake.length; i++) {
                this.snake[i].x += 1;
            }
        }

    };

    return Snake;
});
