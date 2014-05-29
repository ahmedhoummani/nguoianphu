var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser_example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    
    //  This sets a limit on the up-scale
//    game.scale.maxWidth = 800;
//    game.scale.maxHeight = 600;

    //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
//    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//    game.scale.setScreenSize();
    
    game.load.image('duck', 'assets/duck/duck-r50.png');
    //    game.load.image('shadow', 'assets/duck/shadow.png');
    game.load.spritesheet('ducks', 'assets/duck/ducks.png', 60, 50, 4);
    game.load.audio('jump', 'assets/audio/jump.wav');
}

var duck;
var ducks;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0072bc';

    duck = game.add.sprite(400, 300, 'duck');
    duck.anchor.setTo(0.5, 0.5);

    ducks = game.add.sprite(game.world.width / 2, game.world.height / 2, 'ducks');
    ducks.anchor.setTo(0.5, 0.5);

    //  Our two animations, walking left and right.
    ducks.animations.add('left', [0], 6, true);
    ducks.animations.add('right', [1], 6, true);
    ducks.animations.add('face', [2], 6, true);
    ducks.animations.add('back', [3], 6, true);

    //  This will force it to decelerate and limit its speed
    game.physics.enable(ducks, Phaser.Physics.ARCADE);
    ducks.body.drag.set(0.2);
    ducks.body.maxVelocity.setTo(400, 400);
    ducks.body.collideWorldBounds = true;
    ducks.body.bounce.y = 0.2;
    //    ducks.body.gravity.y = 6;

    //  A shadow below our ducks
    //    shadow = game.add.sprite(game.world.width / 2, game.world.height / 2, 'shadow');
    //    shadow.anchor.setTo(0.5, 0.5);



    jump_sound = this.game.add.audio('jump');

    //	Enable Arcade Physics for the sprite
    game.physics.enable(duck, Phaser.Physics.ARCADE);

    //	Tell it we don't want physics to manage the rotation
    duck.body.allowRotation = false;


    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(jump, this);




}

function update() {

    game.physics.arcade.moveToPointer(duck, 60, game.input.activePointer, 500);

    if (duck.angle < 0) {
        duck.angle = 0;
    }


    // ducks faces

    if (ducks.x < game.input.x) {

        ducks.animations.play('right');

    }
    if (ducks.x > game.input.x) {

        ducks.animations.play('left');

    }
    if (ducks.y < game.input.y) {

        ducks.animations.play('face');
    }

    if (ducks.y > game.input.y) {

        ducks.animations.play('back');
    }

}

function render() {

    game.debug.spriteInfo(ducks, 32, 32);
    game.debug.spriteInfo(duck, 32, 100);
    //    game.debug.inputInfo(32, 42);

}

function jump() {

    // create an animation on the bird
    var animation = game.add.tween(duck);

    // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    animation.to({
        angle: -45
    }, 100);

    // And start the animation
    animation.start();

    jump_sound.play();


}