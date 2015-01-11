
define( function() {

    function drawPlayground(ctx, playfield, boxSize, leftSpaceHorizontal, leftSpaceVertical) {
        for (var i = 0; i < playfield.length; i++) {
            for (var j = 0; j < playfield[i].length; j++) {

                ctx.fillStyle = '#0000ff';
                ctx.fillRect( ((i * boxSize) + (leftSpaceHorizontal / 2)), (j * boxSize) + (leftSpaceVertical / 2), boxSize, boxSize);
            }
        }
    }


    return {
        drawPlayground:drawPlayground
    };
});
