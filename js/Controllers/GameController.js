
define( ['Models/Snake', 'Models/Rules', 'Models/Playground', 'Models/Score', 'Views/PlaygroundView'],
function( Snake, Rules, Playground, Score, PlaygroundView ) {

    function startGame() {

        // registrate events for user inputs

        window.addEventListener('resize', handleResize, false);

        if (is_touch_device()) {
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchmove', handleTouchMove, false);

            var xDown = null;
            var yDown = null;
        } else {
            document.addEventListener('keydown', keydown, false);
        }


        var playgroundView = new PlaygroundView(),
            playground = new Playground(playgroundView.canvasWidth, playgroundView.canvasHeight, playgroundView.BOXSIZE),
            snake = new Snake(playground.playground),
            rules = new Rules(true);
            score = new Score();


        // used to reset interval in controlGame and resizing
        var controlID,
            resizeID;


        playground.generateFood(playground.playground, snake.snake);
        draw();
        controlGame();



        function controlGame() {

            controlID = setInterval(function() {

                if (rules.isSnakeAlive(snake.snake, playground.playground)) {

                    snake.controlSnake(snake.lastDirection);

                    if (playground.didSnakeAteFood(snake.snake)) {
                        snake.inkrementSnake();
                        score.inkrementScore();
                        score.saveHighscore();
                        playground.generateFood(playground.playground, snake.snake);
                    }

                } else {
                    clearInterval(controlID);
                    score.saveHighscore();
                }

            }, 70);
        }

        function draw() {
            window.requestAnimationFrame(draw);

            playgroundView.clearPlayground();
            playgroundView.drawPlayground();
            playgroundView.drawScores(score.score, score.highscore);
            playgroundView.drawSnake(snake.snake);
            playgroundView.displayFood(playground.food);

            if (!rules.isSnakeAlive(snake.snake, playground.playground)) {
                playgroundView.displayGameOver();
                playgroundView.displayTryAgain(is_touch_device());
            }
        }

        function is_touch_device() {
            return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
        }

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;

            if (!rules.isSnakeAlive(snake.snake, playground.playground)) {
                snake = new Snake(playground.playground);
                rules = new Rules(true);
                score.resetScore();
                playground.generateFood(playground.playground, snake.snake);
                controlGame();
            }
        }

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }
            evt.preventDefault();

            var xUp = evt.touches[0].clientX,
                yUp = evt.touches[0].clientY,

                xDiff = xDown - xUp,
                yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
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
                case 32:
                    if (!rules.isSnakeAlive(snake.snake, playground.playground)) {
                        snake = new Snake(playground.playground);
                        rules = new Rules(true);
                        score.resetScore();
                        playground.generateFood(playground.playground, snake.snake);
                        controlGame();
                    }
            }
        }

        function handleResize() {
            clearInterval(controlID);
            clearTimeout(resizeID);
            resizeID = setTimeout(doneResizing, 1000);
        }

        function doneResizing() {
            playgroundView = new PlaygroundView();
            playground = new Playground(playgroundView.canvasWidth, playgroundView.canvasHeight, playgroundView.BOXSIZE);
            snake = new Snake(playground.playground);
            score.resetScore();

            playground.generateFood(playground.playground, snake.snake);
            controlGame();
        }
    }

    return {
        startGame:startGame
    };
});
