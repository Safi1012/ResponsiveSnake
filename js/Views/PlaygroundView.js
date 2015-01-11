
define( function() {

    var BOXSIZE = 20;
    var canvas = document.getElementById('playboard'),
        ctx = canvas.getContext('2d');
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

    var leftSpaceHorizontal = ctx.canvas.width - (parseInt(ctx.canvas.width / BOXSIZE) * BOXSIZE);
    var leftSpaceVertical = ctx.canvas.height - (parseInt(ctx.canvas.height / BOXSIZE) * BOXSIZE);


    function PlaygroundView() {
        this.ctx = ctx;
        this.BOXSIZE = BOXSIZE;
    }


    PlaygroundView.prototype = {

        drawSnake:function(snake) {
            for (var i = 0; i < snake.length; i++) {
                ctx.fillStyle = '#f08624';
                ctx.fillRect( ((snake[i].x * BOXSIZE) + (leftSpaceHorizontal / 2)), (snake[i].y * BOXSIZE) + (leftSpaceVertical / 2), BOXSIZE, BOXSIZE);
            }
        }

    };

    return PlaygroundView;
});
