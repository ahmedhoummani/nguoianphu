var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser_example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    // the duck
    game.load.spritesheet('duck', 'assets/duck/duck.png', 59, 50);

    game.load.audio('jump', 'assets/audio/jump.wav');

    // the bg
    game.load.image('sea', 'assets/sea/sea.png');

    game.load.image('wave', 'assets/sea/wave80a.png');
}

var duck;
var currentSpeed = 0;

var sea;
var wave;

function create() {

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(0, 0, 2000, 600);

    //  Our tiled scrolling background
    sea = game.add.tileSprite(0, 0, 800, 600, 'sea');
    sea.fixedToCamera = true;

    duck = game.add.sprite(50, 100, 'duck');
    duck.anchor.setTo(0.5, 0.5);
    duck.bringToTop();

    //  Our two animations, walking left and right.
    duck.animations.add('left', [0], 5, true);
    duck.animations.add('right', [1], 5, true);
    //    duck.animations.add('face', [2], 5, true);
    //    duck.animations.add('back', [3], 5, true);

    //  This will force it to decelerate and limit its speed
    game.physics.enable(duck, Phaser.Physics.ARCADE);
    duck.body.drag.set(0.2);
    duck.body.maxVelocity.setTo(500, 500);
    duck.body.collideWorldBounds = true;
    duck.body.bounce.y = 0.2;
    //    duck.body.gravity.y = 6;


    wave = game.add.sprite(-100, -100, 'wave');
    wave.anchor.setTo(0.5, 0.5);
    wave.bringToTop();

    game.camera.follow(duck);
    //    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);



    jump_sound = this.game.add.audio('jump');

    //	Enable Arcade Physics for the sprite
    game.physics.enable(duck, Phaser.Physics.ARCADE);

    //	Tell it we don't want physics to manage the rotation
    duck.body.allowRotation = false;


    //  Our controls.
    game.input.onDown.add(jump, this);

}

function update() {

    // duck faces

    if (duck.x < game.input.worldX) {

        duck.animations.play('right');

    }
    if (duck.x > game.input.worldX) {

        duck.animations.play('left');

    }

    if (duck.angle != 0) {
        duck.angle = 0;
    }

    if (duck.body.moves) {
//    if (duck.x != game.input.y) {
        wave.x = duck.x - 0;
        wave.y = duck.y + 25;

    } else {
        wave.x = 100;
        wave.y = -100;
    }

    sea.tilePosition.x = -game.camera.x;
    sea.tilePosition.y = -game.camera.y;

    game.physics.arcade.moveToPointer(duck, 100, game.input.activePointer, currentSpeed);

    if (currentSpeed > 0) {
        game.physics.arcade.velocityFromRotation(duck.rotation, currentSpeed, duck.body.velocity);

    }

}

function jump() {

    // Add a vertical velocity to the bird
    duck.body.velocity.y = -350;

    // create an animation on the bird
    var animation = game.add.tween(duck);

    // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    // duck faces

    if (duck.x < game.input.worldX) {

        duck.animations.play('right');

        animation.to({
            angle: 45
        }, 150);

    }
    if (duck.x > game.input.worldX) {

        duck.animations.play('left');

        animation.to({
            angle: -45
        }, 150);

    }


    // And start the animation
    animation.start();

    //    jump_sound.play();




}

function render() {

    game.debug.spriteInfo(duck, 32, 32);
    //    game.debug.text(tan_right, 32, game.world.centerY);
    //    game.debug.spriteInfo(duck, 32, 100);
    game.debug.inputInfo(32, 92);

}