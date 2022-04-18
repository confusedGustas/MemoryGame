const main_game = ( sketch ) => {
    const WIDTH = 1000;
    const HEIGHT = 600;

    let word = [];
    let save_word = [];
    let random_word;

    let order;
    let squares;
    let time = 0;

    let sqaures_hidden = false;
    let game_time_stop = false;
    let game_time = 3;
    document.getElementById("TimeNumbers").innerHTML = game_time;

    let counter = 0;

    let highscore = 0;
    let highscore_ = 0;

    // Initial canvas setup
    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
        sketch.frameRate(120);

        sketch.GenerateWord();
        sketch.CreateObject();
        sketch.HideSquares();
    };

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
        setTimeout(() => {
            squares.forEach(f => {
                f.hide_squares(sketch);
            });
        }, 3000);
    }

    // Infinate loop to draw/move/check_collision of the squares
    sketch.draw = () => {
        sketch.background(16, 16, 16);
    
        squares.forEach(a => {
            a.show(sketch);
            a.move(sketch);
            a.check_collision(sketch, WIDTH, HEIGHT);
        }); 
        
        // Change speed
        if (time == 60){
            squares.forEach(t => {
                t.change_speed(sketch);
            });
    
            time = 0;
        } else time++;

        sketch.Timer();
        document.getElementById("PopupRetryButton").addEventListener("click", () => {
            sketch.Retry();
        });
    };

    // Change game time 
    sketch.Timer = () => {
        if (sketch.frameCount % 75 == 0 && game_time > 0 && sqaures_hidden != true){
            game_time--;
            document.getElementById("TimeNumbers").innerHTML = game_time;
            if (game_time == 0){
                sqaures_hidden = true;
                game_time = 5;
                document.getElementById("TimeNumbers").innerHTML = game_time;
            }
        }
        if (sqaures_hidden == true && game_time_stop != true && sketch.frameCount % 75 == 0 && game_time > 0){
            game_time--;
            document.getElementById("TimeNumbers").innerHTML = game_time;
            if (game_time == 0){
                game_time_stop = true;
                document.getElementById("Main-RetryPopupContainer").classList.remove("PopupAnimationOut");
                document.getElementById("Main-RetryPopupContainer").classList.add("PopupAnimationIn");
                sketch.noLoop();
            }
        }
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
                sketch.noLoop();
            }
        }
        if (counter == 5){
            highscore++;
            document.getElementById("Highscore").innerHTML = "HIGHSCORE: " + highscore;
            sketch.GenerateWord();
            sketch.CreateObject();
            sketch.HideSquares();
            sketch.Reset();
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
        sqaures_hidden = false;
        game_time = 3;
        counter = 0;
    }

    // Reset everything after fail
    sketch.Retry = () => {
        sketch.GenerateWord();
        sketch.CreateObject();
        sketch.HideSquares();
        sketch.Reset();

        if (highscore > highscore_)highscore_ = highscore;
        highscore = 0;
        game_time_stop = false;

        document.getElementById("Highscore").innerHTML = "HIGHSCORE: " + highscore_;
        document.getElementById("TimeNumbers").innerHTML = game_time;

        // Fixes timer bug
        sketch.frameCount = 0;

        sketch.loop();
    }
};

let once = 0;

// Create Game Object
function Game() {
    if (once != 1){
        main = new p5(main_game, "Game-Container");
        once = 1;
    }

    document.getElementById("Main-InfoContainer").style.display = "block";
}