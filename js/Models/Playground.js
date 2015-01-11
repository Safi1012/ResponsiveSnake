
define( function() {

    function Playground(ctx, BOXSIZE) {
        this.playground = createPlayground(ctx, BOXSIZE);
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

    return Playground;
});
