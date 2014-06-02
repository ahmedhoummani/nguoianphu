/**
    http://examples.phaser.io/_site/view_full.html?d=games&f=tanks.js&t=tanks 
*/

EnemyTank = function (index, game, player, bullets) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 15000;
    this.nextFire = 0;
    this.alive = true;

//    this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
    this.tank = game.add.sprite(x, y, 'enemy');
//    this.turret = game.add.sprite(x, y, 'enemy', 'turret');

//    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5, 0.5);
//    this.turret.anchor.set(0.3, 0.5);
    this.tank.animations.add('left', [0], 20, true);
    this.tank.animations.add('right', [1], 20, true);

    this.tank.name = index.toString();
    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);
	
	// this.tank.body.customSeparateX = true;
    // this.tank.body.customSeparateY = true;
	
	// if (Math.abs(this.tank.body.velocity.x) != 0 ){
		// this.tank.animations.play('left');
	// }
	
	this.tank.body.maxVelocity.y = 50;
	this.tank.body.maxVelocity.x = 50;
	
	// this.tank.body.acceleration.x = 0;
	// this.tank.body.acceleration.y = 0;
    
    //	Tell it we don't want physics to manage the rotation
    this.tank.body.allowRotation = false;

//    this.tank.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

EnemyTank.prototype.damage = function () {

    this.health -= 1;

    if (this.health <= 0) {
        this.alive = false;

//        this.shadow.kill();
        this.tank.kill();
//        this.turret.kill();

        return true;
    }

    return false;

}

EnemyTank.prototype.update = function () {

	if (this.tank.body.velocity.x < 0 ){
		this.tank.animations.play('left');
	} else if (this.tank.body.velocity.x > 0 ) {
		this.tank.animations.play('right');
	}

//    this.shadow.x = this.tank.x;
//    this.shadow.y = this.tank.y;
//    this.shadow.rotation = this.tank.rotation;

//    this.turret.x = this.tank.x;
//    this.turret.y = this.tank.y;
//    this.turret.rotation = this.game.physics.arcade.angleBetween(this.tank, this.player);

    if ( 300 < this.game.physics.arcade.distanceBetween(this.tank, this.player)  && this.game.physics.arcade.distanceBetween(this.tank, this.player) < 350) {
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
            this.nextFire = this.game.time.now + this.fireRate;

            var bullet = this.bullets.getFirstDead();

            bullet.reset(this.tank.x, this.tank.y);

            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 50);
        }
    }
	
	

};

//window.addEventListener('resize', function (event) {
//    resizeGame();
//});
//var resizeGame = function () {
//    game.scale.setShowAll();
//    game.scale.refresh();
//}


var game = new Phaser.Game(320, 480, Phaser.AUTO, 'phaser_example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    game.load.spritesheet('tank', 'assets/duck/duck.png', 59, 50);
	game.load.image('shadow', 'assets/sea/wave80a.png');
    game.load.spritesheet('enemy', 'assets/ship/china2.png', 150, 46);
    // game.load.image('logo', 'assets/logo.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('earth', 'assets/sea/sea.png');
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);

}

var land;

var shadow;
var tank;
var turret;

var enemies;
var enemyBullets;
var enemiesTotal = 0;
var enemiesAlive = 0;
var explosions;

// var logo;

var currentSpeed = 0;
var cursors;

var bullets;
var fireRate = 100;
var nextFire = 0;

function create() {

	// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	// this.scale.minWidth = 320;
	// this.scale.minHeight = 480;
	// this.scale.maxWidth = 800;
	// this.scale.maxHeight = 600;
    // game.scale.refresh();

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(0, 0, 640, 960);

    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, 320, 480, 'earth');
    land.fixedToCamera = true;

    //  The base of our tank
    tank = game.add.sprite(-1500, -1500, 'tank');
    tank.anchor.setTo(0.5, 0.5);
    tank.animations.add('left', [0], 20, true);
    tank.animations.add('right', [1], 20, true);

    //  This will force it to decelerate and limit its speed
    game.physics.enable(tank, Phaser.Physics.ARCADE);
    tank.body.drag.set(0.2);
    
	// tank.body.maxVelocity.x = 10;
	// tank.body.acceleration.x = 0;
	// tank.body.acceleration.y = 0;
	
    tank.body.collideWorldBounds = true;
    
    //	Tell it we don't want physics to manage the rotation
    tank.body.allowRotation = false;
	
	
	shadow = game.add.sprite(-1500, -1500, 'shadow');
    shadow.anchor.setTo(0.5, 0.5);
    shadow.bringToTop();

    //  Finally the turret that we place on-top of the tank body
//    turret = game.add.sprite(0, 0, 'tank', 'turret');
//    turret.anchor.setTo(0.3, 0.5);

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
        enemies.push(new EnemyTank(i, game, tank, enemyBullets));
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

    tank.bringToTop();
//    turret.bringToTop();

    // logo = game.add.sprite(0, 200, 'logo');
    // logo.fixedToCamera = true;

    // game.input.onDown.add(removeLogo, this);

    game.camera.follow(tank);
    // game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);

    //    cursors = game.input.keyboard.createCursorKeys();

}

// function removeLogo() {

    // game.input.onDown.remove(removeLogo, this);
    // logo.kill();

// }

function update() {

	// duck faces

    if (tank.x < game.input.worldX) {
    // if (tank.body.velocity.x > 0) {

        tank.animations.play('right');

    }
    if (tank.x > game.input.worldX) {
    // if (tank.body.velocity.x < 0) {

        tank.animations.play('left');

    }
	
	if (tank.angle != 0) {
        tank.angle = 0;
    }

    game.physics.arcade.overlap(enemyBullets, tank, bulletHitPlayer, null, this);

    

	createEnemies();

    //    if (cursors.left.isDown) {
    //        tank.angle -= 4;
    //    } else if (cursors.right.isDown) {
    //        tank.angle += 4;
    //    }
    //
    //    if (cursors.up.isDown) {
    //        //  The speed we'll travel at
    //        currentSpeed = 300;
    //    } else {
    //        if (currentSpeed > 0) {
    //            currentSpeed -= 4;
    //        }
    //    }

    // follow the poiter

    // moveToPointer(displayObject, speed, pointer, maxTime) → {number}
    //    game.physics.arcade.moveToPointer(tank, 60, game.input.activePointer, 500);
    game.physics.arcade.moveToPointer(tank, 200, game.input.activePointer, currentSpeed);

    // end follow the pointer

    if (currentSpeed > 0) {
        game.physics.arcade.velocityFromRotation(tank.rotation, currentSpeed, tank.body.velocity);
    }

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

    //  Position all the parts and align rotations
//    shadow.x = tank.x;
//    shadow.y = tank.y;
//    shadow.rotation = tank.rotation;

//    turret.x = tank.x;
//    turret.y = tank.y;

//    turret.rotation = game.physics.arcade.angleToPointer(turret);

	// if (Math.abs(tank.body.velocity.x) > 10 && Math.abs(tank.body.velocity.y) > 10) {
	if (Math.abs(tank.body.velocity.x) > 10) {
		
		shadow.x = tank.x;
		shadow.y = tank.y + 25;

	} else {
		shadow.x = -1500;
		shadow.y = -1500;
	}

    if (game.input.activePointer.isDown) {
        //  Boom!
        // fire();
		jump();
    }

}

function bulletHitPlayer(tank, bullet) {

    bullet.kill();
	restart();

}

function bulletHitEnemy(tank, bullet) {

    bullet.kill();

    var destroyed = enemies[tank.name].damage();

    if (destroyed) {
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(tank.x, tank.y);
        explosionAnimation.play('kaboom', 30, false, true);
    }

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);

        bullet.reset(tank.x, tank.y);

        bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
    }

}


function jump() {

    // Add a vertical velocity to the bird
    // tank.body.velocity.y = -350;

    // create an animation on the bird
    var animation = game.add.tween(tank);

    // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    // duck faces

    if (tank.x < game.input.worldX) {

        // tank.animations.play('right');

        animation.to({
            angle: 45
        }, 150);

    }
    if (tank.x > game.input.worldX) {

        // tank.animations.play('left');

        animation.to({
            angle: -45
        }, 150);

    }


    // And start the animation
    animation.start();

    //    jump_sound.play();




}

function render() {

    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
    game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 52);
    game.debug.spriteInfo(tank, 32, 72);

}

function createEnemies() {

	enemiesAlive = 0;

	 for (var i = 0; i < enemies.length; i++) {
			if (enemies[i].alive) {
				enemiesAlive++;
				game.physics.arcade.collide(tank, enemies[i].tank);
				game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
				
				// if (i > 0 ) {
					// if (game.physics.arcade.distanceBetween(enemies[i].tank, enemies[i-1].tank) < 10){
						// // enemies[i].tank.body.acceleration.y = 200;
						// enemies[i].tank.body.acceleration.x = +10;
						// enemies[i-1].tank.body.acceleration.y = -10;
					// }
				// }
				
				enemies[i].update();
			}
		}
	
}

function restart () {

    //  A new level starts
    
    //resets the life count
    // lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    // aliens.removeAll();
    // createAliens();

    //revives the player
    tank.revive();
    //hides the text
    // stateText.visible = false;

}