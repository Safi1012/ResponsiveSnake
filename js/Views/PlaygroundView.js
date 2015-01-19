
define( function() {

    var canvas = document.getElementById('playboard'),
        context = canvas.getContext('2d'),
        BOXSIZE,
        canvasWidth,
        canvasHeight,
        borderSizeLeftAndRight,
        borderSizeTopBottom;

    function PlaygroundView() {
        setupCanvas();

        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.BOXSIZE = setBOXSIZE();
        this.borderSizeLeftAndRight = calculateLeftSpace(this.canvasWidth, this.BOXSIZE) / 2;
        this.borderSizeTopBottom = calculateLeftSpace(this.canvasHeight, this.BOXSIZE) / 2;
    }

    function setupCanvas() {
        // context.translate(0.5,0.5);

        var devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = context.webkitBackingStorePixelRatio ||
                                context.mozBackingStorePixelRatio ||
                                context.msBackingStorePixelRatio ||
                                context.oBackingStorePixelRatio ||
                                context.backingStorePixelRatio || 1,
            ratio = devicePixelRatio / backingStoreRatio;

        if (devicePixelRatio !== backingStoreRatio) {

            var oldWidth = window.innerWidth,
                oldHeight = window.innerHeight;

            canvas.width = oldWidth * ratio;
            canvas.height = oldHeight * ratio;

            canvas.style.width = oldWidth + 'px';
            canvas.style.height = oldHeight + 'px';

            context.scale(ratio, ratio);

        } else {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
        }

        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
    }

    function setBOXSIZE() {
        // Values from Bootstrap
        if (window.innerWidth >= 1220) {
            return 20;
        }
        if (window.innerWidth >= 992) {
            return 16;
        }
        if (window.innerWidth >= 768) {
            return 14;
        }
        if (window.innerWidth < 768) {
            return 12;
        }
    }

    function calculateLeftSpace(size, BOXSIZE) {
        return (size - (parseInt(size / BOXSIZE) * BOXSIZE));
    }



    PlaygroundView.prototype = {

        drawPlayground:function() {
            context.fillStyle = '#ffffff';
            context.fillRect(this.borderSizeLeftAndRight, this.borderSizeTopBottom, this.canvasWidth - (this.borderSizeLeftAndRight * 2), this.canvasHeight - (this.borderSizeTopBottom * 2));
        },

        drawSnake:function(snake) {
            for (var i = 0; i < snake.length; i++) {
                context.fillStyle = '#f08624';
                context.fillRect((snake[i].x * this.BOXSIZE) + this.borderSizeLeftAndRight, (snake[i].y * this.BOXSIZE) + this.borderSizeTopBottom, this.BOXSIZE, this.BOXSIZE);

                context.strokeStyle = '#ffffff';
                context.lineWidth   = 1;
                context.strokeRect((snake[i].x * this.BOXSIZE) + this.borderSizeLeftAndRight, (snake[i].y * this.BOXSIZE) + this.borderSizeTopBottom, this.BOXSIZE, this.BOXSIZE);
            }
        },

        clearPlayground:function() {
            context.clearRect ( 0, 0, this.canvasWidth, this.canvasHeight);
        },

        displayGameOver:function() {
            var fontSize = this.BOXSIZE * 3;
            context.font = fontSize + 'px Calibri';
            context.fillStyle = "#5b615c";

            context.textAlign = "center";
            context.fillText("GAME OVER",  (this.canvasWidth / 2) - this.borderSizeLeftAndRight, (this.canvasHeight / 2) - this.borderSizeTopBottom);
        },

        displayTryAgain:function(isMobile) {
            context.fillStyle = "#5b615c";
            var fontSize = this.BOXSIZE * 1.2;
            context.font = fontSize + 'px Calibri';
            context.textAlign = "center";

            if (isMobile) {
                context.fillText("Tap, to try again",  (this.canvasWidth / 2) - this.borderSizeLeftAndRight, (this.canvasHeight / 2) + (this.BOXSIZE * 1.5));
            } else {
                context.fillText("Spacebar, to try again",  (this.canvasWidth / 2) - this.borderSizeLeftAndRight, (this.canvasHeight / 2) + (this.BOXSIZE * 1.5));
            }
        },

        displayFood:function(food) {
            context.fillStyle = '#2accec';
            context.fillRect( ((food.x * this.BOXSIZE) + this.borderSizeLeftAndRight), (food.y * this.BOXSIZE) + this.borderSizeTopBottom, this.BOXSIZE, this.BOXSIZE);

            context.strokeStyle = '#ffffff';
            context.lineWidth   = 1;
            context.strokeRect( ((food.x * this.BOXSIZE) + this.borderSizeLeftAndRight), (food.y * this.BOXSIZE) + this.borderSizeTopBottom, this.BOXSIZE, this.BOXSIZE);
        },

        snakeAteFood:function(snake, food) {

            if ( (snake[0].x === food.x) && (snake[0].y === food.y) ) {
                context.clearRect( ((food.x * this.BOXSIZE) + this.borderSizeLeftAndRight), (food.y * this.BOXSIZE) + this.borderSizeTopBottom, this.BOXSIZE, this.BOXSIZE);
            }
        },

        drawScores:function(score, highscore) {

            var fontSize = this.BOXSIZE * 2;
            context.font = fontSize + 'px Calibri';
            context.fillStyle = "#5b615c";

            context.textAlign = "left";
            context.fillText("Score: " + score, 2 * this.BOXSIZE + this.borderSizeLeftAndRight, 3 * this.BOXSIZE);

            context.textAlign = "right";
            context.fillText("Highscore: " + highscore,  this.canvasWidth - (2 * this.BOXSIZE) - this.borderSizeLeftAndRight,  3 * this.BOXSIZE);
        }

    };

    return PlaygroundView;
});
