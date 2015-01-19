define( function() {

    var highscore = 0;
    var score = 0;

    function Score() {
        this.score = score;
        this.highscore = initializeScore();
    }

    function initializeScore() {
        if(typeof(Storage) !== "undefined") {
            if (localStorage.highscore !== undefined) {
                return localStorage.highscore;
            }
        }
        return 0;
    }


    Score.prototype = {

        inkrementScore:function() {
            this.score++;
        },

        saveHighscore:function() {
            if (this.score > this.highscore) {
                this.highscore = this.score;

                if(typeof(Storage) !== "undefined") {
                    localStorage.highscore = this.score;
                }
            }
        },

        resetScore:function() {
            this.score = 0;
        }

    };

    return Score;
});
