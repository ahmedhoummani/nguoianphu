EnemyTank = function(index, game, player, bullets) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.tank = game.add.sprite(x, y, 'tank');
    this.tank.anchor.set(0.5);

    this.tank.name = index.toString();
    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);

    this.tank.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

EnemyTank.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0) {
        this.alive = false;

        this.tank.kill();

        return true;
    }

    return false;

}

EnemyTank.prototype.update = function() {

    if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 300) {
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
            this.nextFire = this.game.time.now + this.fireRate;

            var bullet = this.bullets.getFirstDead();

            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
        }
    }

};


function bulletHitPlayer(tank, bullet) {

    bullet.kill();

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);

        bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
    }

}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser_example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    // the duck
    game.load.spritesheet('duck', 'assets/duck/duck.png', 59, 50);

    // enemy
    game.load.spritesheet('tank', 'assets/ship/china2.png', 150, 46);

    // bullet
    game.load.image('bullet', 'assets/bullet.png');

    game.load.audio('jump', 'assets/audio/jump.wav');

    // the bg
    game.load.image('sea', 'assets/sea/sea.png');

    game.load.image('wave', 'assets/sea/wave80a.png');
}

var duck;
var currentSpeed = 0;

var tank;
var enemies;
var enemyBullets;
var enemiesTotal = 0;
var enemiesAlive = 0;
var explosions;

var bullets;
var fireRate = 100;
var nextFire = 0;

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
    
    
    //  The base of our tank
    tank = game.add.sprite(0, 0, 'tank');
    tank.anchor.setTo(0.5, 0.5);
    tank.animations.add('move', [0, 1], 20, true);

    //  This will force it to decelerate and limit its speed
    game.physics.enable(tank, Phaser.Physics.ARCADE);
    tank.body.drag.set(0.2);
    tank.body.maxVelocity.setTo(400, 400);
    tank.body.collideWorldBounds = true;


    //  The enemies bullet group
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');

    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  Create some baddies to waste :)
    enemies = [];

    enemiesTotal = 20;
    enemiesAlive = 20;

    for (var i = 0; i < enemiesTotal; i++) {
//        enemies.push(new EnemyTank(i, game, tank, enemyBullets));
    }

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    //  Explosion pool
    explosions = game.add.group();

    for (var i = 0; i < 10; i++) {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }



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



    game.physics.arcade.moveToPointer(duck, 100, game.input.activePointer, currentSpeed);

    if (currentSpeed > 0) {
        game.physics.arcade.velocityFromRotation(duck.rotation, currentSpeed, duck.body.velocity);

    }

    sea.tilePosition.x = -game.camera.x;
    sea.tilePosition.y = -game.camera.y;


    game.physics.arcade.overlap(enemyBullets, duck, bulletHitPlayer, null, this);

    enemiesAlive = 0;

    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].alive) {
            enemiesAlive++;
            game.physics.arcade.collide(duck, enemies[i].tank);
            game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
            enemies[i].update();
        }
    }
    
    
    if (game.input.activePointer.isDown) {
        //  Boom!
        fire();
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
