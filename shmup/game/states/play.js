'use strict';

function Play() {}
Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');

    //    this.enemy = this.game.add.sprite(this.game.world.centerX, 138, 'greenEnemy');
    //    this.enemy.animations.add('fly', [0, 1, 2], 20, true);
    //    this.enemy.play('fly');
    //    this.enemy.anchor.setTo(0.5, 0.5);
    //    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);

    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(50, 'greenEnemy');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);

    // Set the animation for each sprite
    this.enemyPool.forEach(function(enemy) {
      enemy.animations.add('fly', [0, 1, 2], 20, true);
    });

    this.nextEnemyAt = 0;
    this.enemyDelay = 1000;


    this.player = this.add.sprite(400, 550, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 300;
    this.player.body.collideWorldBounds = true; // have to put after enable the physic
    this.player.body.bounce.setTo(0.3, 0.3);


    //    this.bullet = this.add.sprite(this.player.x, this.player.y, 'bullet');
    //    this.bullet.anchor.setTo(0.5, 0.5);
    //    this.physics.enable(this.bullet, Phaser.Physics.ARCADE);
    //    this.bullet.body.velocity.y = -50;

    //    this.bullets = [];

    // Add an empty sprite group into our game
    this.bulletPool = this.add.group();

    // Enable physics to the whole sprite group
    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;

    // Add 100 'bullet' sprites in the group.
    // By default this uses the first frame of the sprite sheet and
    //   sets the initial state as non-existing (i.e. killed/dead)
    this.bulletPool.createMultiple(100, 'bullet');

    // Sets anchors of all sprites
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);

    // Automatically kill the bullet sprites when they go out of bounds
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);

    this.nextShotAt = 0;
    this.shotDelay = 100;



  },
  update: function() {

    this.sea.tilePosition.y += 0.2;

    if (this.input.activePointer.isDown &&
      this.physics.arcade.distanceToPointer(this.player) > 15) {
      this.physics.arcade.moveToPointer(this.player, this.player.speed);
      this.fire();

    }


    //    this.physics.arcade.overlap(
    //      this.bullet, this.enemy, this.enemyHit, null, this
    //    );
    //    for (var i = 0; i < this.bullets.length; i++) {
    //      this.physics.arcade.overlap(
    //        this.bullets[i], this.enemy, this.enemyHit, null, this
    //      );
    //    }

    this.physics.arcade.overlap(
      this.bulletPool, this.enemyPool, this.enemyHit, null, this
    );

    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      // spawn at a random location top of the screen
      enemy.reset(this.rnd.integerInRange(20, 780), 0);
      // also randomize the speed
      enemy.body.velocity.y = this.rnd.integerInRange(30, 60);
      enemy.play('fly');
    }

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;



  },

  fire: function() {

    if (this.nextShotAt > this.time.now) {
      return;
    }

    if (this.bulletPool.countDead() === 0) {
      return;
    }


    this.nextShotAt = this.time.now + this.shotDelay;

    //    var bullet = this.add.sprite(this.player.x, this.player.y - 20, 'bullet');
    //    bullet.anchor.setTo(0.5, 0.5);
    //    this.physics.enable(bullet, Phaser.Physics.ARCADE);
    //    bullet.body.velocity.y = -500;
    //    this.bullets.push(bullet);

    // Find the first dead bullet in the pool
    var bullet = this.bulletPool.getFirstExists(false);

    // Reset (revive) the sprite and place it in a new location
    bullet.reset(this.player.x, this.player.y - 20);

    bullet.body.velocity.y = -500;

  },


  enemyHit: function(bullet, enemy) {
    bullet.kill();
    enemy.kill();

    var explosion = this.add.sprite(enemy.x, enemy.y, 'explosion');
    explosion.anchor.setTo(0.5, 0.5);
    explosion.animations.add('boom');
    explosion.play('boom', 15, false, true);


  }

};

module.exports = Play;
