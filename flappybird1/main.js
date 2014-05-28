// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() {
        // Function called first to load all the assets

        // change the bg color
        this.game.stage.backgroundColor = '#71c6cf';

        // load the bird sprite
        this.game.load.image('bird', 'assets/bird.png');

        this.game.load.image('pipe', 'assets/pipe.png');

        this.game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {
        // Fuction called after 'preload' to setup the game 

        // show the bird
        this.bird = this.game.add.sprite(100, 254, 'bird');

        this.jump_sound = this.game.add.audio('jump');

        // add gravity to the bird

        this.bird.body.gravity.y = 1000;

        // call the jump
        var space_key =
            this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);

        //Since we are going to handle a lot of pipes in the game, it's easier to use a group of sprites. The group will contain 20 sprites that we will be able to use as we want. 

        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');

        // To actually add pipes in the game, we need to call the add_row_of_pipes() function every 1.5 seconds
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);

        this.score = 0;
        var style = {
            font: "30px Arial",
            fill: "#ffffff"
        };
        this.label_score = this.game.add.text(20, 20, "0", style);

        this.bird.anchor.setTo(-0.2, 0.5);

    },

    update: function() {
        // Function called 60 times per second

        // If the bird is out of the world (too high or too low), call the 'restart_game' function
        if (this.bird.inWorld == false)
            this.restart_game();

        //        this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);
        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);

        if (this.bird.angle < 20)
            this.bird.angle += 1;
    },

    // Make the bird jump 
    jump: function() {

        if (this.bird.alive == false)
            return;
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;

        this.jump_sound.play();


        // create an animation on the bird
        var animation = this.game.add.tween(this.bird);

        // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
        animation.to({
            angle: -20
        }, 100);
        // create an animation on the bird
        var animation = this.game.add.tween(this.bird);

        // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
        animation.to({
            angle: -20
        }, 100);

        // And start the animation
        animation.start();
        // And start the animation
        animation.start();
    },

    // Restart the game
    restart_game: function() {

        this.game.time.events.remove(this.timer);
        // Start the 'main' state, which restarts the game
        this.game.state.start('main');


    },

    hit_pipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p) {
            p.body.velocity.x = 0;
        }, this);
    },

    //Now we need a new function to add a pipe in the game. By default, all the pipes contained in the group are dead and not displayed. So we pick a dead pipe, display it, and make sure to automatically kill it when it's no longer visible. This way we never run out of pipes.

    add_one_pipe: function(x, y) {
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();

        // Set the new position of the pipe
        pipe.reset(x, y);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Kill the pipe when it's no longer visible 
        pipe.outOfBoundsKill = true;
    },
    
    // we have a 400x490px game
    // a pipe is 50x50px
    // good to put 8 pipes in a vertical row
    
    //The previous function displays one pipe, but we need to display 6 pipes in a row with a hole somewhere in the middle. So let's create a new function that does just that. 

    add_row_of_pipes: function() {
        
        // The Math.floor(x) function returns the largest integer less than or equal to a number "x".
        // Return a random number between 0 (inclusive) and 1 (exclusive) ( 0.xxxx)
        
        // 5 x 0.xxx + 1
        
        var hole = Math.floor(Math.random() * 5) + 1;
        
        // we have a vertical row with 8 pipes inside. But we remove 2 pipe for the bird to fly. Then we have 6 pipes per row
        for (var i = 0; i < 8; i++)
//            if ( (i != hole) && (i != hole + 1) && (i != hole + 2) ) // remove 2 pipes 
            if ( (i != hole) && (i != hole + 1) && (i != hole + 2) ) // remove 3 pipes 
                this.add_one_pipe(400, i * 60 + 10); // raw the pipe from top to bottom

        this.score += 1;
        this.label_score.content = this.score;
    },


};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);
game.state.start('main');