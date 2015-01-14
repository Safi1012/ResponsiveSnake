
define( function() {

    var BOXSIZE = 20,
        canvas = document.getElementById('playboard'),
        ctx = canvas.getContext('2d');

        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

    var leftSpaceHorizontal = ctx.canvas.width - (parseInt(ctx.canvas.width / BOXSIZE) * BOXSIZE);
        leftSpaceVertical = ctx.canvas.height - (parseInt(ctx.canvas.height / BOXSIZE) * BOXSIZE);

    function PlaygroundView() {
        this.ctx = ctx;
        this.BOXSIZE = BOXSIZE;
    }


    PlaygroundView.prototype = {

        drawPlayground:function() {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect((leftSpaceHorizontal / 2), (leftSpaceVertical / 2), ctx.canvas.width - leftSpaceHorizontal, ctx.canvas.height - leftSpaceVertical);
        },

        drawSnake:function(snake) {
            for (var i = 0; i < snake.length; i++) {
                ctx.fillStyle = '#f08624';
                ctx.fillRect( ((snake[i].x * BOXSIZE) + (leftSpaceHorizontal / 2)), (snake[i].y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth   = 1;
                ctx.strokeRect( ((snake[i].x * BOXSIZE) + (leftSpaceHorizontal / 2)), (snake[i].y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);
            }
        },

        clearPlayground:function() {
            ctx.clearRect ( 0, 0, ctx.canvas.width, ctx.canvas.height);
        },

        displayGameOver:function() {
            return confirm("Try it again?");
        },

        displayFood:function(food) {
            ctx.fillStyle = '#2accec';
            ctx.fillRect( ((food.x * BOXSIZE) + (leftSpaceHorizontal / 2)), (food.y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth   = 1;
            ctx.strokeRect( ((food.x * BOXSIZE) + (leftSpaceHorizontal / 2)), (food.y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);
        },

        snakeAteFood:function(snake, food) {

            if ( (snake[0].x === food.x) && (snake[0].y === food.y) ) {
                ctx.clearRect( ((food.x * BOXSIZE) + (leftSpaceHorizontal / 2)), (food.y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);
            }
        }

    };

    return PlaygroundView;
});
