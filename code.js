const main_game = ( sketch ) => {
    const WIDTH = 1000;
    const HEIGHT = 600;

    let word = [];
    let save_word = [];
    let random_word;

    let order;
    let squares;

    let sqaures_hidden = false;
    let game_time_stop = false;
    let game_time = 3;

    let counter = 0;

    let highscore = 0;
    let highscore_ = 0;

    let start;

    // Initial canvas setup
    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);

        sketch.startTime();
        sketch.GenerateWord();
        sketch.CreateObject();
    };

    // Infinate loop to draw/move/check_collision of the squares
    sketch.draw = () => {
        sketch.background(16, 16, 16);
        
        sketch.ShowSquares();
    };

    // Calling all the needed function for sqaures to work
    sketch.ShowSquares = () => {
        squares.forEach(a => {
            a.show(sketch);
            a.move(sketch);
            a.check_collision(sketch, WIDTH, HEIGHT);
        }); 
    }

    // Change game time
    sketch.Time = () => {
        game_time--;
        document.getElementById("TimeNumbers").innerHTML = game_time;

        // Change speed
        squares.forEach(t => {
            t.change_speed(sketch);
        });

        if (game_time == 0 && sqaures_hidden != true){
            game_time = 4;
            document.getElementById("TimeNumbers").innerHTML = game_time;
            sketch.HideSquares();
            sqaures_hidden = true;
        }
        else if (game_time == 0 && sqaures_hidden == true) {
            game_time_stop = true;
            document.getElementById("Main-RetryPopupContainer").classList.remove("PopupAnimationOut");
            document.getElementById("Main-RetryPopupContainer").classList.add("PopupAnimationIn");
            document.getElementById("PopupRetryButton").disabled = false;
            sketch.stopTime();
            sketch.noLoop();
        }
    }
    
    // Start Time function
    sketch.startTime = () => {
        start = setInterval(sketch.Time, 1000);
    }

    // Stop Time function
    sketch.stopTime = () => {
        clearInterval(start);
    }

    // Event listiner for the Retry button
    document.getElementById("PopupRetryButton").addEventListener("click", () => {
        sketch.Retry();
        sketch.startTime();
    });

    // Pick a random word from the words.js file
    sketch.GenerateWord = () => {
        random_word = list[sketch.int(sketch.random(0, 10000))];
        document.getElementById("RandomWord").innerHTML = "WORD: " + random_word.toUpperCase();

        for (let j = 0; j < 5; j++){
            word[j] = random_word[j].toUpperCase();
            save_word[j] = word[j];
        }
        word = word.sort(() => Math.random() - 0.5);
    }

    // Create squares
    sketch.CreateObject = () => {
        squares = [];
        for (var i = 0; i < 5; i++) {
            squares.push(
                new Square(
                    sketch.int(sketch.random(200, 800)), 
                    sketch.int(sketch.random(200, 500)), 
                    80, 
                    80, 
                    sketch.int(sketch.random(2, 4)), 
                    sketch.int(sketch.random(2, 4)), 
                    i + 1, 
                    word[i], 
                    sketch.int(sketch.random(1, 5)), 
                    sketch,
                    "yes"
                )
            );
        }
    }

    // Hide the leters after x seconds
    sketch.HideSquares = () => {
        squares.forEach(f => {
            f.hide_squares(sketch);
        });
    }

    // Check if the clicked order is correct
    sketch.CheckForWord = () => {
        if (order[order.length - 1].vis == "yes"){
            order[order.length - 1].change_vis(sketch);

            if (order[order.length - 1].text == save_word[counter]){
                counter++;
            }
            else {
                game_time_stop = true;
                document.getElementById("Main-RetryPopupContainer").classList.remove("PopupAnimationOut");
                document.getElementById("Main-RetryPopupContainer").classList.add("PopupAnimationIn");
                document.getElementById("PopupRetryButton").disabled = false;
                sketch.stopTime();
                sketch.noLoop();
            }
        }
        if (counter == 5){
            sketch.Reset();
            sketch.startTime();
        }
    }

    // Record the Click event
    sketch.mouseClicked = () => {
        order = [];
    
        squares.forEach(s => {
            s.clicked(sketch, order, squares);
        });
    
        if (order[order.length - 1] != undefined && sqaures_hidden == true && game_time_stop == false) {
            order[order.length - 1].show_square(sketch);

            sketch.CheckForWord();
        }
    }

    // Reset after first correct
    sketch.Reset = () => {
        highscore++;

        sketch.CheckHighscore();
        sketch.GenerateWord();
        sketch.CreateObject();

        sqaures_hidden = false;
        game_time = 3;
        counter = 0;

        document.getElementById("TimeNumbers").innerHTML = game_time;

        sketch.stopTime();
    }

    // Reset everything after fail
    sketch.Retry = () => {
        sketch.GenerateWord();
        sketch.CreateObject();
        sketch.CheckHighscore();
        
        sqaures_hidden = false;
        game_time_stop = false;
        game_time = 3;
        counter = 0;
        highscore = 0;

        document.getElementById("TimeNumbers").innerHTML = game_time;

        sketch.loop();
    }

    sketch.CheckHighscore = () => {
        if (highscore > highscore_){
            highscore_ = highscore;
            document.getElementById("Highscore").innerHTML = "HIGHSCORE: " + highscore_;
        }
    }
};