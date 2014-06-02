var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser_example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    game.load.spritesheet('ducks', 'assets/duck/ducks1.png', 59, 50);
    game.load.audio('jump', 'assets/audio/jump.wav');
}

var ducks;

function create() {

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(-1000, -1000, 2000, 2000);

    game.stage.backgroundColor = '#0072bc';

    ducks = game.add.sprite(0, 0, 'ducks');
    ducks.anchor.setTo(0.5, 0.5);

    //  Our two animations, walking left and right.
    ducks.animations.add('left', [0], 5, true);
    ducks.animations.add('right', [1], 5, true);
    //    ducks.animations.add('face', [2], 5, true);
    //    ducks.animations.add('back', [3], 5, true);

    //  This will force it to decelerate and limit its speed
    game.physics.enable(ducks, Phaser.Physics.ARCADE);
    ducks.body.drag.set(0.2);
    ducks.body.maxVelocity.setTo(400, 400);
    ducks.body.collideWorldBounds = true;
        ducks.body.bounce.y = 0.2;
    //    ducks.body.gravity.y = 6;

    ducks.bringToTop();

    //    game.camera.follow(ducks);
    //    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    //    game.camera.focusOnXY(0, 0);



    //	Enable Arcade Physics for the sprite
    //    game.physics.enable(duck, Phaser.Physics.ARCADE);

    //	Tell it we don't want physics to manage the rotation
    ducks.body.allowRotation = false;

    jump_sound = this.game.add.audio('jump');

    //  Our controls.
    //    var space_key =
    //            game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //        space_key.onDown.add(jump, this);

    game.input.onDown.add(jump, this);

}

function update() {

    game.physics.arcade.moveToPointer(ducks, 100, game.input.activePointer, 1000);

    // ducks faces

    if (ducks.x < game.input.x) {

        ducks.animations.play('right');

        if (ducks.angle > 0) {
            ducks.angle = 0;
        }

    }
    if (ducks.x > game.input.x) {

        ducks.animations.play('left');

        if (ducks.angle < 0) {
            ducks.angle = 0;
        }

    }
    //    if (ducks.y < game.input.y) {
    //
    //        ducks.animations.play('face');
    //    }

    //    if (ducks.y > game.input.y) {
    //
    //        ducks.animations.play('back');
    //    }

}

function jump() {

    // Add a vertical velocity to the bird
    ducks.body.velocity.y = -1000;

    // create an animation on the bird
    var animation = game.add.tween(ducks);

    // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    // ducks faces

    if (ducks.x < game.input.x) {

        ducks.animations.play('right');

        animation.to({
            angle: 50
        }, 150);

    }
    if (ducks.x > game.input.x) {

        ducks.animations.play('left');

        animation.to({
            angle: -50
        }, 150);

    }


    // And start the animation
    animation.start();

    jump_sound.play();




}

function render() {

    game.debug.spriteInfo(ducks, 32, 32);
    //    game.debug.text(tan_right, 32, game.world.centerY);
    //    game.debug.spriteInfo(duck, 32, 100);
    //    game.debug.inputInfo(32, 42);

}