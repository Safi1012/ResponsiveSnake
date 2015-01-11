
define( ['Models/Snake', 'Models/Rules', 'Models/Playground', 'Views/PlaygroundView'], function( Snake, Rules, Playground, PlaygroundView ) {

    function startGame() {
        var playground = new Playground();

        PlaygroundView.drawPlayground(playground.ctx, playground.playfield, playground.boxSize, playground.leftSpaceHorizontal, playground.leftSpaceVertical);
    }

    return {
        startGame:startGame
    };
});
