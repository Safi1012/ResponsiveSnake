
define( ['Models/Snake', 'Models/Rules', 'Models/Playground', 'Views/PlaygroundView'], function( Snake, Rules, Playground, PlaygroundView ) {

    function startGame() {

        var playgroundView = new PlaygroundView();
        var playground = new Playground(playgroundView.ctx, playgroundView.BOXSIZE);

        var snake = new Snake(playground.playground);
        var rules = new Rules(true);

        if (is_touch_device()) {
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchmove', handleTouchMove, false);

            var xDown = null;
            var yDown = null;
        } else {
            document.addEventListener('keydown', keydown, false);
        }


        //generate food, for game start
        playground.generateFood(playground.playground, snake.snake);
        controlGame();

        function controlGame() {

            draw();

            var timerId = setInterval(function() {

                if (rules.isSnakeAlive(snake.snake, playground.playground)) {

                    snake.controlSnake(snake.lastDirection);

                    if (playground.didSnakeAteFood(snake.snake)) {
                        snake.inkrementSnake();
                        playground.generateFood(playground.playground, snake.snake);
                    }

                } else {

                    if (playgroundView.displayGameOver()) {
                        snake = new Snake(playground.playground);
                        rules = new Rules(true);
                    } else {
                        clearInterval(timerId);
                    }
                }

            }, 50);
        }







        function draw() {
            window.requestAnimationFrame(draw);

            playgroundView.clearPlayground();
            playgroundView.drawPlayground();
            playgroundView.drawScore();
            playgroundView.drawSnake(snake.snake);
            playgroundView.displayFood(playground.food);
        }

        function is_touch_device() {
            return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
        }

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        }

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }
            evt.preventDefault();

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    snake.validateDirection('left');
                } else {
                    snake.validateDirection('right');
                }
            } else {
                if ( yDiff > 0 ) {
                    snake.validateDirection('up');
                } else {
                    snake.validateDirection('bottom');
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        }

        function keydown(evt) {
            switch (evt.keyCode) {
                case 37:
                    snake.validateDirection('left');
                    break;
                case 38:
                    snake.validateDirection('up');
                    break;
                case 39:
                    snake.validateDirection('right');
                    break;
                case 40:
                    snake.validateDirection('bottom');
                    break;
            }
        }

    }

    return {
        startGame:startGame
    };
});
