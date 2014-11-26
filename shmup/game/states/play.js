'use strict';

function Play() {}
Play.prototype = {
  create: function() {

    this.game.world.setBounds(0, 0, 320, 480);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sea = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sea');
    this.sea.autoScroll(0, 12);

    //    this.explosionSFX = this.add.audio('explosion');
    //    this.playerExplosionSFX = this.add.audio('playerExplosion');
    //    this.enemyFireSFX = this.add.audio('enemyFire');
    //    this.playerFireSFX = this.add.audio('playerFire');
    //    this.powerUpSFX = this.add.audio('powerUp');

    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(10, 'greenEnemy');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);

    this.enemyPool.setAll('reward', 200, false, false, 0, true);
    this.enemyPool.setAll('dropRate', 0.3, false, false, 0, true);

    // Set the animation for each sprite
    this.enemyPool.forEach(function(enemy) {
      enemy.animations.add('fly', [0, 1, 2], 20, true);
      enemy.animations.add('hit', [3, 1, 3, 2], 20, false);

      enemy.events.onAnimationComplete.add(function(e) {
        e.play('fly');
      }, this);

    });

    this.nextEnemyAt = this.time.now + 5000;
    this.enemyDelay = 4000;
    this.enemyInitialHealth = 2;


    this.shooterPool = this.add.group();
    this.shooterPool.enableBody = true;
    this.shooterPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.shooterPool.createMultiple(5, 'whiteEnemy');
    this.shooterPool.setAll('anchor.x', 0.5);
    this.shooterPool.setAll('anchor.y', 0.5);
    this.shooterPool.setAll('checkWorldBounds', true);
    this.shooterPool.setAll('outOfBoundsKill', true);
    this.shooterPool.setAll('reward', 500, false, false, 0, true);
    this.shooterPool.setAll('dropRate', 0.5, false, false, 0, true);
    // Set the animation for each sprite
    this.shooterPool.forEach(function(enemy) {
      enemy.animations.add('fly', [0, 1, 2], 20, true);
      enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
      enemy.events.onAnimationComplete.add(function(e) {
        e.play('fly');
      }, this);
    });
    // start spawning 5 seconds into the game
    this.nextShooterAt = this.time.now + 5000;
    this.shooterDelay = 7000;
    this.shooterShotDelay = 5000;
    this.shooterInitialHealth = 3;


    this.bossPool = this.add.group();
    this.bossPool.enableBody = true;
    this.bossPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.bossPool.createMultiple(1, 'boss');
    this.bossPool.setAll('anchor.x', 0.5);
    this.bossPool.setAll('anchor.y', 0.5);
    this.bossPool.setAll('checkWorldBounds', true);
    this.bossPool.setAll('outOfBoundsKill', true);
    this.bossPool.setAll('reward', 10000, false, false, 0, true);
    this.bossPool.setAll('dropRate', 0, false, false, 0, true);
    // Set the animation for each sprite
    this.bossPool.forEach(function(enemy) {
      enemy.animations.add('fly', [0, 1, 2], 20, true);
      enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
      enemy.events.onAnimationComplete.add(function(e) {
        e.play('fly');
      }, this);
    });
    this.boss = this.bossPool.getTop();
    this.bossApproaching = false;
    this.bossInitialHealth = 50;
	this.bossPrevent = 0;
	this.bossPrevent = 0;


    this.player = this.add.sprite(this.game.width / 2, this.game.height - 20, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.animations.add('ghost', [3, 0, 3, 1], 20, true);
    this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 180;
    this.player.body.collideWorldBounds = true; // have to put after enable the physic
    this.player.body.bounce.setTo(0.2, 0.2);
    this.weaponLevel = 0;

    this.powerUpPool = this.add.group();
    this.powerUpPool.enableBody = true;
    this.powerUpPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.powerUpPool.createMultiple(3, 'powerup1');
    this.powerUpPool.setAll('anchor.x', 0.5);
    this.powerUpPool.setAll('anchor.y', 0.5);
    this.powerUpPool.setAll('checkWorldBounds', true);
    this.powerUpPool.setAll('outOfBoundsKill', true);
    this.powerUpPool.setAll('reward', 100, false, false, 0, true);

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
    this.bulletPool.setAll('checkWorldBounds', true);
    this.bulletPool.setAll('outOfBoundsKill', true);


    this.nextShotAt = 0;;
    this.shotDelay = 500;

    this.enemyBulletPool = this.add.group();
    this.enemyBulletPool.enableBody = true;
    this.enemyBulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBulletPool.createMultiple(100, 'enemyBullet');
    this.enemyBulletPool.setAll('anchor.x', 0.5);
    this.enemyBulletPool.setAll('anchor.y', 0.5);
    this.enemyBulletPool.setAll('checkWorldBounds', true);
    this.enemyBulletPool.setAll('outOfBoundsKill', true);
    this.enemyBulletPool.setAll('reward', 0, false, false, 0, true);

    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.createMultiple(100, 'explosion');
    this.explosionPool.setAll('anchor.x', 0.5);
    this.explosionPool.setAll('anchor.y', 0.5);
    this.explosionPool.forEach(function(explosion) {
      explosion.animations.add('boom');
    });


    this.score = 0;
    this.scoreText = this.add.text(
      this.game.width / 2, 30, '' + this.score, {
        font: '17px monospace',
        fill: '#fff',
        align: 'center'
      }
    );
    this.scoreText.anchor.setTo(0.5, 0.5);

    this.lives = this.add.group();
    for (var i = 0; i < 3; i++) {
      var life = this.lives.create(20 + (30 * i), 30, 'player');
      life.scale.setTo(0.5, 0.5);
      life.anchor.setTo(0.5, 0.5);
    }

    // add our pause button without a callback
    this.pauseButton = this.game.add.sprite(this.game.width - 32, this.game.height - 32, 'pauseButton');
    this.pauseButton.anchor.setTo(0.5, 0.5);
    this.pauseButton.inputEnabled = true;
    //    this.pauseButton.input.useHandCursor = true;


  },
  update: function() {

    this.sea.tilePosition.y += 0.6;

    // add our pause button without a callback
    this.pauseButton.events.onInputUp.add(function() {
      this.game.paused = true;
    }, this);
    this.game.input.onDown.add(function() {
      if (this.game.paused) this.game.paused = false;
    }, this);


    if (this.input.activePointer.isDown) {

      if (this.returnText && this.returnText.exists) {
        this.quitGame();
		return;
      }

      this.physics.arcade.moveToPointer(this.player, this.player.speed);
    }

    //      this.player.body.velocity.x = (this.input.activePointer.position.x - this.input.activePointer.positionDown.x) * 2;
    //
    //      this.player.body.velocity.y = (this.input.activePointer.position.y - this.input.activePointer.positionDown.y);
    //
    //    } else {
    //      this.player.body.velocity.x = 0;
    //      this.player.body.velocity.y = 0;
    //    }

    this.fire();


    this.physics.arcade.overlap(
      this.bulletPool, this.enemyPool, this.enemyHit, null, this
    );

    this.physics.arcade.overlap(
      this.bulletPool, this.shooterPool, this.enemyHit, null, this
    );

    this.physics.arcade.overlap(
      this.player, this.enemyPool, this.playerHit, null, this
    );

    this.physics.arcade.overlap(
      this.player, this.shooterPool, this.playerHit, null, this
    );

    this.physics.arcade.overlap(
      this.player, this.enemyBulletPool, this.playerHit, null, this
    );

    this.physics.arcade.overlap(
      this.player, this.powerUpPool, this.playerPowerUp, null, this
    );

    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay + this.bossPrevent;
      var enemy = this.enemyPool.getFirstExists(false);
      // spawn at a random location top of the screen
      //      enemy.reset(this.rnd.integerInRange(20, 780), 0);
      enemy.reset(this.rnd.integerInRange(32, this.game.width -32), 0, this.enemyInitialHealth);
      // also randomize the speed
      enemy.body.velocity.y = this.rnd.integerInRange(50, 80);
      enemy.play('fly');
      enemy.checkWorldBounds = true;
      enemy.outOfBoundsKill = true;
    }


    if (this.nextShooterAt < this.time.now && this.shooterPool.countDead() > 0) {
      this.nextShooterAt = this.time.now + this.shooterDelay + this.bossPrevent;
      var shooter = this.shooterPool.getFirstExists(false);
      // spawn at a random location at the top
      shooter.reset(this.rnd.integerInRange(32, this.game.width -32), 0,
        this.shooterInitialHealth);
      // choose a random target location at the bottom
      var target = this.rnd.integerInRange(32, this.game.width -32);
      // move to target and rotate the sprite accordingly
      shooter.rotation = this.physics.arcade.moveToXY(
        shooter, target, 768, this.rnd.integerInRange(70, 100)
      ) - Math.PI / 2;
      shooter.play('fly');
      // each shooter has their own shot timer
      shooter.nextShotAt = 0;
      shooter.checkWorldBounds = true;
      shooter.outOfBoundsKill = true;
    }

    this.shooterPool.forEachAlive(function(enemy) {
      if (this.time.now > enemy.nextShotAt && this.enemyBulletPool.countDead() > 0 && enemy.y < this.game.height - 100 && enemy.x > 0 && enemy.x < this.game.width) {
        var bullet = this.enemyBulletPool.getFirstExists(false);
        bullet.reset(enemy.x, enemy.y);
        this.physics.arcade.moveToObject(bullet, this.player, 150);
        //        this.enemyFireSFX.play();
        enemy.nextShotAt = this.time.now + this.shooterShotDelay;
      }
    }, this);

    if (this.bossApproaching === false && this.boss.alive &&
      this.boss.nextShotAt < this.time.now &&
      this.enemyBulletPool.countDead() > 4) {
      this.boss.nextShotAt = this.time.now + 1500;
      //      this.enemyFireSFX.play();
      for (var i = 0; i < 1; i++) {
        // process 2 bullets at a time
        var leftBullet = this.enemyBulletPool.getFirstExists(false);
        leftBullet.reset(this.boss.x - 10 - i * 10, this.boss.y + 20);
        var rightBullet = this.enemyBulletPool.getFirstExists(false);
        rightBullet.reset(this.boss.x + 10 + i * 10, this.boss.y + 20);
        if (this.boss.health > 10) {
          // aim directly at the player
          this.physics.arcade.moveToObject(leftBullet, this.player, 150);
          this.physics.arcade.moveToObject(rightBullet, this.player, 150);
        } else {
          // aim slightly off center of the player
          this.physics.arcade.moveToXY(
            leftBullet, this.player.x - i * 100, this.player.y, 150
          );
          this.physics.arcade.moveToXY(
            rightBullet, this.player.x + i * 100, this.player.y, 150
          );
        }
      }
    }


    if (this.ghostUntil && this.ghostUntil < this.time.now) {
      this.ghostUntil = null;
      this.player.play('fly');
    }

    if (this.showReturn && this.time.now > this.showReturn) {
      this.returnText = this.add.text(
        this.game.width / 2, this.game.height / 2 + 15,
        'Click anywhere to go back to Main Menu', {
          font: '12px Arial',
          fill: '#ffffff',
          align: 'center'
        }
      );
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;
    }

    if (this.bossApproaching && this.boss.y > 70) {
      this.bossApproaching = false;
      this.boss.health = this.bossInitialHealth;
      this.boss.nextShotAt = 0;
      this.boss.body.velocity.y = 0;
      this.boss.body.velocity.x = 80;
      // allow bouncing off world bounds
      this.boss.body.bounce.x = 1;
      this.boss.body.collideWorldBounds = true;
    }

    if (this.bossApproaching === false) {
      this.physics.arcade.overlap(
        this.bulletPool, this.bossPool, this.enemyHit, null, this
      );
      this.physics.arcade.overlap(
        this.player, this.bossPool, this.playerHit, null, this
      );
    }

  },

  fire: function() {

    if (!this.player.alive || this.nextShotAt > this.time.now) {
      return;
    }

    var bullet;
    if (this.weaponLevel === 0) {

      if (this.bulletPool.countDead() === 0) {
        return;
      }
		this.nextShotAt = this.time.now + this.shotDelay;
		bullet = this.bulletPool.getFirstExists(false);
		bullet.reset(this.player.x, this.player.y - 20);
		bullet.body.velocity.y = -300;

    } else if (this.weaponLevel === 1) {

      if (this.bulletPool.countDead() < 10) {
        return;
      }
		for (var i = 0; i < 3; i++) {
			this.nextShotAt = this.time.now + (this.shotDelay)*2;
			bullet = this.bulletPool.getFirstExists(false);
			bullet.reset(this.player.x, this.player.y - i * 10);
			bullet.body.velocity.y = -200;
      }

    } else {

      if (this.bulletPool.countDead() < 20) {
        return;
      }
		for (var i = 0; i < 3; i++) {
			this.nextShotAt = this.time.now + (this.shotDelay)*3;
			bullet = this.bulletPool.getFirstExists(false);
			// spawn left bullet slightly left off center
			bullet.reset(this.player.x - (20 + i * 6), this.player.y - 20);
			// the left bullets spread from -95 degrees to -135 degrees
			// velocityFromAngle(angle, speed, point)
			this.physics.arcade.velocityFromAngle(-95 - i * 10, 300, bullet.body.velocity);

			bullet = this.bulletPool.getFirstExists(false);
			// spawn right bullet slightly right off center
			bullet.reset(this.player.x + (20 + i * 6), this.player.y - 20);
			// the right bullets spread from -85 degrees to -45
			this.physics.arcade.velocityFromAngle(-85 + i * 10, 300, bullet.body.velocity);
		}

    }

  },

  enemyHit: function(bullet, enemy) {
    bullet.kill();
    this.damageEnemy(enemy, 1);
  },

  playerHit: function(player, enemy) {

    // check first if this.ghostUntil is not not undefined or null
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }

    //    this.playerExplosionSFX.play();

    // crashing into an enemy only deals 5 damage
    this.damageEnemy(enemy, 5);

    if (this.weaponLevel > 0) {
      this.weaponLevel -= 1;
    }

    var life = this.lives.getFirstAlive();
    if (life) {
      life.kill();
      this.ghostUntil = this.time.now + 3000;
      this.player.play('ghost');
    } else {
      this.explode(player);
      player.kill();
      this.displayEnd(false);
    }

  },

  explode: function(sprite) {

    if (this.explosionPool.countDead() === 0) {

      return;

    }

    var explosion = this.explosionPool.getFirstExists(false);
    explosion.reset(sprite.x, sprite.y);
    explosion.play('boom', 15, false, true);
    // add the original sprite's velocity to the explosion
    explosion.body.velocity.x = sprite.body.velocity.x;
    explosion.body.velocity.y = sprite.body.velocity.y;

  },

  damageEnemy: function(enemy, damage) {

    enemy.damage(damage);

    if (enemy.alive) {
      enemy.play('hit');
    } else {

      this.explode(enemy);
      //      this.explosionSFX.play();
      this.addToScore(enemy.reward);
      this.spawnPowerUp(enemy);

      if (enemy.key === 'boss') {
        this.enemyPool.destroy();
        this.shooterPool.destroy();
        this.bossPool.destroy();
        this.enemyBulletPool.destroy();
        this.addToScore(this.lives.countLiving() * 500);
        this.lives.destroy();
        this.displayEnd(true);
      }

    }
  },

  addToScore: function(score) {
    this.score += score;
    this.scoreText.text = this.score;

    // this approach prevents the boss from spawning again upon winning
    if (this.score >= 3500 && this.bossPool.countDead() == 1) {
      this.spawnBoss();
	  this.bossPrevent = 30000;
    }

  },

  displayEnd: function(win) {
    // you can't win and lose at the same time
    if (this.endText && this.endText.exists) {
      return;
    }

    var msg = win ? 'You Win!!!' : 'Game Over!';
    this.endText = this.add.text(
      this.game.width / 2, this.game.height / 2 - 15, msg, {
        font: '45px Arial',
        fill: '#ffffff',
        align: 'center'
      }
    );
    this.pauseButton.kill();
    this.endText.anchor.setTo(0.5, 0.5);
    this.showReturn = this.time.now + 2000;
  },

  spawnPowerUp: function(enemy) {
    if (this.powerUpPool.countDead() === 0 || this.weaponLevel === 2) {
      return;
    }

    if (this.rnd.frac() < enemy.dropRate) {
      var powerUp = this.powerUpPool.getFirstExists(false);
      powerUp.reset(enemy.x, enemy.y);
      powerUp.body.velocity.y = 100;
    }
  },

  spawnBoss: function() {
    this.bossApproaching = true;
    this.boss.reset(this.game.world.centerX, 0, this.bossInitialHealth);
    this.game.physics.enable(this.boss, Phaser.Physics.ARCADE);
    this.boss.body.velocity.y = 10;
    this.boss.play('fly');
  },

  playerPowerUp: function(player, powerUp) {
    this.addToScore(powerUp.reward);
    powerUp.kill();
    //    this.powerUpSFX.play();
    if (this.weaponLevel < 2) {
      this.weaponLevel++;
    }
  },

  quitGame: function(pointer) {
    // Here you should destroy anything you no longer need.
    // Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.sea.destroy();
    this.player.destroy();
    this.enemyPool.destroy();
    this.bulletPool.destroy();
    this.explosionPool.destroy();
    this.shooterPool.destroy();
    this.enemyBulletPool.destroy();
    this.powerUpPool.destroy();
    this.bossPool.destroy();
    this.scoreText.destroy();
    this.endText.destroy();
    this.returnText.destroy();
    this.lives.destroy();
    this.pauseButton.destroy();
    // Then let's go back to the main menu.
    this.state.start('menu');
  }


};

module.exports = Play;
