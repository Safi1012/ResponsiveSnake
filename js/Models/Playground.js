
define( function() {

    // private
    var BOXSIZE = 20;
    var canvas = document.getElementById('playboard'),
        ctx = canvas.getContext('2d');
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

    // constructor
    function Playground() {
        // public
        this.ctx = ctx;
        this.boxSize = BOXSIZE;
        this.playfield = createPlayfield();
        this.leftSpaceHorizontal = calculateLeftSpaceHorizontal();
        this.leftSpaceVertical = calculateLeftSpaceVertical();
    }

    function createPlayfield() {
        playfield = new Array( parseInt(ctx.canvas.width / BOXSIZE) );

        for (var i = 0; i < playfield.length; i++) {
            playfield[i] = new Array( parseInt(ctx.canvas.height / BOXSIZE) );

            for (var j = 0; j < playfield[i].length; j++) {
                playfield[i][j] = 0;
            }
        }
        return playfield;
    }

    function calculateLeftSpaceHorizontal() {
        return ctx.canvas.width - (parseInt(ctx.canvas.width / BOXSIZE) * BOXSIZE);
    }

    function calculateLeftSpaceVertical() {
        return ctx.canvas.height - (parseInt(ctx.canvas.height / BOXSIZE) * BOXSIZE);
    }




    // pulbic method
    Playground.prototype = {
        donot:function() {
            console.log('ddd');
        }
    };

    return Playground;

});
