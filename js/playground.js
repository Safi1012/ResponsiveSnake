function drawPlayground() {
    'use strict';

    console.log("Hello");


    // Canvas
    var canvas = document.getElementById('playboard'), ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;



    // class
    var Person = function(number) {
        this.number = number;
        var privatProperty = 44;

        dd = 55;

        function lucky() {
            if (number == privatProperty) {
                console.log("You are a lucky person");
            }
        }





        var dd =99;
    };

    Person.prototype.sayHello = function() {
        console.log("Hello");
    };

    Person.prototype.getPrivateProperty = function() {
        return this.privatProperty;
    };


    // instance / object
    var person1 = new Person(44);








    person1.number = 44;
    console.log(person1.lucky());
    console.log(person1.getPrivateProperty());


}






//
//
//
//     // Generate Playboard
//     var BOXSIZE = 40;
//     var X_LEFT_SPACE = calculateLeftSpace(ctx.canvas.width, 40);
//     var Y_LEFT_SPACE = calculateLeftSpace(ctx.canvas.height, 40);
//
//     drawLine(BOXSIZE, ctx, X_LEFT_SPACE, Y_LEFT_SPACE);
//
//
//
//
//     var playboard = createPlayground(ctx, BOXSIZE);
//
//
//
//
//
//
//     console.log(BOXSIZE);
//     console.log(X_LEFT_SPACE);
//     console.log(Y_LEFT_SPACE);
// }
//
//
//
// function calculateLeftSpace(pixelsize,  BOXSIZE) {
//
//     var numberCubes = parseInt (pixelsize / BOXSIZE);
//     return (pixelsize - (BOXSIZE * numberCubes)) / 2;
// }
//
// function drawLine(boxSize, ctx, xLeftSpace, yLeftSpace) {
//
//     //fillRect(x,y,width,height)
//
//     for (var i = 0; i < ctx.canvas.width - boxSize; i += boxSize) {
//
//         for (var j = 0; j < ctx.canvas.height - boxSize; j += boxSize) {
//
//             ctx.fillStyle = '#0000ff';
//             ctx.fillRect (i + xLeftSpace, j + yLeftSpace, boxSize, boxSize);
//         }
//     }
// }
//
// function createPlayground(ctx, BOXSIZE) {
//     var numberCubesX = parseInt (ctx.canvas.width / BOXSIZE);
//     var numberCubeY = parseInt (ctx.canvas.height / BOXSIZE);
//
//     var playboard = new Array(numberCubesX);
//
//     for (var i = 0; i < playboard.length; i++) {
//         playboard[i] = new Array(numberCubeY);
//
//         for (var j = 0; j < playboard[i].length; j++) {
//             playboard[i][j] = 0;
//         }
//     }
//     return playboard;
// }
