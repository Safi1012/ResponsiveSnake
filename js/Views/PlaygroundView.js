
define( function() {

    var canvas = document.getElementById('playboard'),
        context = canvas.getContext('2d'),
        BOXSIZE,
        canvasWidth,
        canvasHeight,
        leftSpaceHorizontal,
        leftSpaceVertical;


    function PlaygroundView() {
        setupCanvas();

        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.BOXSIZE = setBOXSIZE();
        this.leftSpaceHorizontal = calculateLeftSpace(this.canvasWidth, this.BOXSIZE);
        this.leftSpaceVertical = calculateLeftSpace(this.canvasHeight, this.BOXSIZE);
    }

    function setupCanvas() {
        var devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1,

            ratio = devicePixelRatio / backingStoreRatio;
            context.translate(0.5,0.5);

        if (devicePixelRatio !== backingStoreRatio) {

            var oldWidth = window.innerWidth;
            var oldHeight = window.innerHeight;

            canvas.width = oldWidth * ratio;
            canvas.height = oldHeight * ratio;

            canvas.style.width = oldWidth + 'px';
            canvas.style.height = oldHeight + 'px';

            context.scale(ratio, ratio);
        }

        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
    }

    function setBOXSIZE() {

        // Values from Bootstrap
        if (window.innerWidth < 768) {
            return 10;
        }
        if (window.innerWidth >= 768) {
            return 15;
        }
        if (window.innerWidth >= 992) {
            return 20;
        }
        if (window.innerWidth >= 1220) {
            return 25;
        }
    }

    function calculateLeftSpace(size, BOXSIZE) {
        return (size - (parseInt(size / BOXSIZE) * BOXSIZE));
    }










    PlaygroundView.prototype = {

        drawPlayground:function() {
            context.fillStyle = '#ffffff';
            context.fillRect( this.leftSpaceHorizontal / 2, this.leftSpaceVertical / 2, this.canvasWidth - this.leftSpaceHorizontal, this.canvasHeight - this.leftSpaceVertical );
        },

        drawSnake:function(snake) {
            for (var i = 0; i < snake.length; i++) {
                context.fillStyle = '#f08624';
                context.fillRect( ((snake[i].x * this.BOXSIZE) + (this.leftSpaceHorizontal / 2)), (snake[i].y * this.BOXSIZE) + (this.leftSpaceVertical / 2), this.BOXSIZE, this.BOXSIZE);

                context.strokeStyle = '#ffffff';
                context.lineWidth   = 1;
                context.strokeRect( ((snake[i].x * this.BOXSIZE) + (this.leftSpaceHorizontal / 2)), (snake[i].y * this.BOXSIZE) + (this.leftSpaceVertical / 2), this.BOXSIZE, this.BOXSIZE);
            }
        },

        clearPlayground:function() {
            context.clearRect ( 0, 0, this.canvasWidth, this.canvasHeight);
        },

        displayGameOver:function() {
            var fontSize = this.BOXSIZE * 4;
            context.font = fontSize + 'px Calibri';
            context.fillStyle = "#5b615c";

            context.textAlign = "center";
            context.fillText("GAME OVER",  (this.canvasWidth / 2) - (this.leftSpaceHorizontal / 2), (this.canvasHeight / 2) - (this.leftSpaceVertical / 2));
        },

        displayFood:function(food) {
            context.fillStyle = '#2accec';
            context.fillRect( ((food.x * this.BOXSIZE) + (this.leftSpaceHorizontal / 2)), (food.y * this.BOXSIZE) + (this.leftSpaceVertical / 2), this.BOXSIZE, this.BOXSIZE);

            context.strokeStyle = '#ffffff';
            context.lineWidth   = 1;
            context.strokeRect( ((food.x * this.BOXSIZE) + (this.leftSpaceHorizontal / 2)), (food.y * this.BOXSIZE) + (this.leftSpaceVertical / 2), this.BOXSIZE, this.BOXSIZE);
        },

        snakeAteFood:function(snake, food) {

            if ( (snake[0].x === food.x) && (snake[0].y === food.y) ) {
                context.clearRect( ((food.x * this.BOXSIZE) + (this.leftSpaceHorizontal / 2)), (food.y * this.BOXSIZE) + (this.leftSpaceVertical / 2), this.BOXSIZE, this.BOXSIZE);
            }
        },

        drawScores:function(score, highscore) {

            var fontSize = this.BOXSIZE * 2;
            context.font = fontSize + 'px Calibri';
            context.fillStyle = "#5b615c";

            context.textAlign = "left";
            context.fillText("Score: " + score, 2 * this.BOXSIZE + (this.leftSpaceHorizontal / 2), 3 * this.BOXSIZE);

            context.textAlign = "right";
            context.fillText("Highscore: " + highscore,  this.canvasWidth - (2 * this.BOXSIZE) - (this.leftSpaceHorizontal / 2),  3 * this.BOXSIZE);
        }

    };

    return PlaygroundView;
});
