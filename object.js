class Square {
    constructor(x, y, width, height, xspeed, yspeed, ord, text, roll, sketch, vis) {
        this.ord = ord;
        this.pos = sketch.createVector(x, y);
        this.roll = roll;
        this.width = width;
        this.height = height;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.square_color = sketch.color(75, 75, 75);
        this.text_color = sketch.color(255, 255, 255);
        this.text = text;
        this.vis = vis;
    }

    // Show the squares
    show(sketch) {
        sketch.fill(this.square_color);
        sketch.rect(this.pos.x, this.pos.y, this.width, this.height, 5);
        sketch.fill(this.text_color);
        sketch.textFont('Dongle');
        sketch.text(this.text, this.pos.x + this.width - 40, this.pos.y + this.height - 28);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textSize(100);
        sketch.noStroke();
    }

    // Move squares
    move(sketch) {
        switch (this.roll) {
            case 1:
                // move right down
                this.pos.x += this.xspeed;
                this.pos.y += this.yspeed;
                break;
            case 2:
                // move  left up
                this.pos.x -= this.xspeed;
                this.pos.y -= this.yspeed;
                break;
            case 3:
                // move right up
                this.pos.x += this.xspeed;
                this.pos.y -= this.yspeed;
                break;
            case 4:
                // move left down
                this.pos.x -= this.xspeed;
                this.pos.y += this.yspeed;
                break;
            default:
                break;
        }
    }

    // Check collision with the walls of the canvas
    check_collision(sketch, WIDTH, HEIGHT){
        if (this.pos.x + this.width >= WIDTH) {
            this.xspeed = -this.xspeed;
            this.pos.x = WIDTH - this.width;
        } else if (this.pos.x <= 0) {
            this.xspeed = -this.xspeed;
            this.pos.x = 0;
        }
        
        if (this.pos.y + this.height >= HEIGHT) {
            this.yspeed = -this.yspeed;
            this.pos.y = HEIGHT - this.height;
        } else if (this.pos.y <= 0) {
            this.yspeed = -this.yspeed;
            this.pos.y = 0;
        }
    }

    // Check if a square was clicked
    clicked(sketch, order, squares) {
        if (sketch.mouseX > this.pos.x && sketch.mouseX < this.pos.x + this.width && sketch.mouseY > this.pos.y && sketch.mouseY < this.pos.y + this.height){
            order.push(squares[this.ord - 1]);
        }
    }

    // Hide the squares leters after x seconds
    hide_squares(sketch) {
        this.text_color = this.square_color = sketch.color(75, 75, 75);
    }

    // Show squares leter
    show_square(sketch) {
        this.text_color = sketch.color(255, 255, 255);
    }

    // Change square vis
    change_vis(sketch) {
        this.vis = "no";
    }

    // Change the speed of the squares
    change_speed(sketch) {
        if (this.xspeed < 0) {
            this.xspeed = -sketch.int(sketch.random(1, 3));
        } else {
            this.xspeed = sketch.int(sketch.random(1, 3));
        }

        if (this.yspeed < 0) {
            this.yspeed = -sketch.int(sketch.random(1, 3));
        } else {
            this.yspeed = sketch.int(sketch.random(1, 3));
        }
    }
}