
define( ['Models/Snake', 'Models/Rules', 'Models/Playground', 'Views/PlaygroundView'], function( Snake, Rules, Playground, PlaygroundView ) {

    function startGame() {

        var playgroundView = new PlaygroundView();
        var playground = new Playground(playgroundView.ctx, playgroundView.BOXSIZE);

        var snake = new Snake(playground.playground);
        var rules = new Rules(true);


        var timerId = setInterval(function() {

            if (rules.isSnakeAlive(snake.snake, playground.playground)) {
                document.onkeydown = function(e) {
                    switch (e.keyCode) {
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
                };
                snake.controlSnake(snake.lastDirection);
                playgroundView.clearPlayground();
                playgroundView.drawSnake(snake.snake);

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

    return {
        startGame:startGame
    };
});
