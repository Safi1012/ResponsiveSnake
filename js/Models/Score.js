define( function() {

    var highscore = 0;
    var score = 0;

    function Score() {
        this.score = score;
        this.highscore = highscore;
    }

    Score.prototype = {

        inkrementScore:function() {
            this.score++;
        },

        saveHighscore:function() {
            if (this.score > this.highscore) {
                this.highscore = this.score;
            }
        },

        resetScore:function() {
            this.score = 0;
        }

    };

    return Score;
});
