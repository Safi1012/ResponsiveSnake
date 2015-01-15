
define( function() {


    var canvas = document.getElementById('playboard'),
        context = canvas.getContext('2d'),
        BOXSIZE = 20,

        // Retina
        devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1,

        ratio = devicePixelRatio / backingStoreRatio;
        context.translate(0.5,0.5);

    // upscale the canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {

        var oldWidth = window.innerWidth;
        var oldHeight = window.innerHeight;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        context.scale(ratio, ratio);
    }

    var canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;

    var leftSpaceHorizontal = canvasWidth - (parseInt(canvasWidth / BOXSIZE) * BOXSIZE),
        leftSpaceVertical = canvasHeight - (parseInt(canvasHeight / BOXSIZE) * BOXSIZE);


    function PlaygroundView() {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.BOXSIZE = BOXSIZE;
    }




    PlaygroundView.prototype = {

        drawPlayground:function() {
            context.fillStyle = '#ffffff';
            context.fillRect( leftSpaceHorizontal / 2, leftSpaceVertical / 2, canvasWidth - leftSpaceHorizontal, canvasHeight - leftSpaceVertical );
        },

        drawSnake:function(snake) {
            for (var i = 0; i < snake.length; i++) {
                context.fillStyle = '#f08624';
                context.fillRect( ((snake[i].x * BOXSIZE) + (leftSpaceHorizontal / 2)), (snake[i].y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);

                context.strokeStyle = '#ffffff';
                context.lineWidth   = 1;
                context.strokeRect( ((snake[i].x * BOXSIZE) + (leftSpaceHorizontal / 2)), (snake[i].y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);
            }
        },

        clearPlayground:function() {
            context.clearRect ( 0, 0, canvasWidth, canvasHeight);
        },

        displayGameOver:function() {
            context.font = "2em Calibri";
            context.fillStyle = "#5b615c";

            context.textAlign = "center";
            context.fillText("GAME OVER",  (canvasWidth / 2) - (leftSpaceHorizontal / 2), (canvasHeight / 2) - (leftSpaceVertical / 2));
        },

        displayFood:function(food) {
            context.fillStyle = '#2accec';
            context.fillRect( ((food.x * BOXSIZE) + (leftSpaceHorizontal / 2)), (food.y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);

            context.strokeStyle = '#ffffff';
            context.lineWidth   = 1;
            context.strokeRect( ((food.x * BOXSIZE) + (leftSpaceHorizontal / 2)), (food.y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);
        },

        snakeAteFood:function(snake, food) {

            if ( (snake[0].x === food.x) && (snake[0].y === food.y) ) {
                context.clearRect( ((food.x * BOXSIZE) + (leftSpaceHorizontal / 2)), (food.y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);
            }
        },

        drawScores:function(score, highscore) {
            context.font = "2em Calibri";
            context.fillStyle = "#5b615c";

            context.textAlign = "left";
            context.fillText("Score: " + score, 2 * BOXSIZE + (leftSpaceHorizontal / 2), 2 * BOXSIZE + (leftSpaceVertical / 2));

            context.textAlign = "right";
            context.fillText("Highscore: " + highscore,  canvasWidth - (2 * BOXSIZE) - (leftSpaceHorizontal / 2),  2 * BOXSIZE + (leftSpaceVertical / 2));
        }

    };

    return PlaygroundView;
});
