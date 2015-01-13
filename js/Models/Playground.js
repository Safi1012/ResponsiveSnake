
define( function() {

    var Pos = function (x, y) {
        this.x = x;
        this.y = y;
    };

    var food;

    function Playground(ctx, BOXSIZE) {
        this.playground = createPlayground(ctx, BOXSIZE);
        this.food = food;
    }

    function createPlayground(ctx, BOXSIZE) {
        var playground = new Array( parseInt(ctx.canvas.width / BOXSIZE) );

        for (var i = 0; i < playground.length; i++) {
            playground[i] = new Array( parseInt(ctx.canvas.height / BOXSIZE) );

            for (var j = 0; j < playground[i].length; j++) {
                playground[i][j] = 0;
            }
        }
        return playground;
    }

    function generateNumber(maxNumber) {
        return Math.floor((Math.random() * maxNumber) + 1);
    }

    function checkIfNumberIsAvailableX(generatedNumber, snake) {
        for (var i = 0; i < snake.length; i++) {

            if (snake[i].x === generatedNumber) {
                return false;
            }
        }
        return true;
    }

    function checkIfNumberIsAvailableY(generatedNumber, snake) {
        for (var i = 0; i < snake.length; i++) {

            if (snake[i].y === generatedNumber) {
                return false;
            }
        }
        return true;
    }





    Playground.prototype = {

        generateFood:function(playground, snake) {

            var foundX = false,
                foundY = false,
                numberX,
                numberY;

            // x and y splitted, to minimalize time for finding a free number
            do {
                numberX = generateNumber(playground.length -1);
                foundX = checkIfNumberIsAvailableX(numberX, snake);
            }
            while (!foundX);

            do {
                numberY = generateNumber(playground[0].length -1);
                foundY = checkIfNumberIsAvailableY(numberY, snake);
            }
            while (!foundY);

            //return new Pos(numberX, numberY);

            this.food = new Pos(numberX, numberY);
        },

        didSnakeAteFood:function(snake) {

            if ( (snake[0].x === this.food.x) && (snake[0].y === this.food.y) ) {
                return true;
            }
            return false;
        }
    };


    return Playground;
});
