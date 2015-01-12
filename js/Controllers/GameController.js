
define( ['Models/Snake', 'Models/Rules', 'Models/Playground', 'Views/PlaygroundView'], function( Snake, Rules, Playground, PlaygroundView ) {

    function startGame() {

        var playgroundView = new PlaygroundView();
        var playground = new Playground(playgroundView.ctx, playgroundView.BOXSIZE);

        var snake = new Snake(playground.playground);


        setInterval(function() {

            playgroundView.clearPlayground();

            document.onkeydown = function(e) {
                switch (e.keyCode) {
                    case 37:
                        snake.controlSnake('left');
                        break;
                    case 38:
                        snake.controlSnake('up');
                        break;
                    case 39:
                        snake.controlSnake('right');
                        break;
                    case 40:
                        snake.controlSnake('bottom');
                        break;
                }
            };

            snake.detectDirection(snake.lastDirection);
            playgroundView.drawSnake(snake.snake);

        }, 150);
    }

    return {
        startGame:startGame
    };
});
