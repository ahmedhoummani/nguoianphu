(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(320, 480, Phaser.AUTO, 'shmup');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){
'use strict';

function Boot() {}

Boot.prototype = {

  preload: function() {

    this.load.image('preloader', 'assets/preloader.gif');

  },

  create: function() {

    this.game.input.maxPointers = 1;
	this.stage.disableVisibilityChange = !0;
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = !0;
	this.scale.hasResized.add(this.gameResized, this);
	this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
	this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
	this.scale.setScreenSize(!0);

    this.game.state.start('preload');

  },

  gameResized: function () {},
        
  enterIncorrectOrientation: function () {
            this.orientated = !1, document.getElementById("orientation").style.display = "block"
  },
  leaveIncorrectOrientation: function () {
            this.orientated = !0, document.getElementById("orientation").style.display = "none"
  }

};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){
'use strict';

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.sea = this.add.tileSprite(0, 0, 320, 480, 'sea');


    this.enemy = this.game.add.sprite(this.game.world.centerX, 50, 'boss');
    this.enemy.animations.add('fly', [0, 1, 2], 20, true);
    this.enemy.play('fly');
    this.enemy.anchor.setTo(0.5, 0.5);
    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);


    this.player = this.add.sprite(this.game.world.centerX, 400, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);


    this.enemy.angle = -20;
    this.game.add.tween(this.enemy).to({
      angle: 20
    }, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.player.angle = -20;
    this.game.add.tween(this.player).to({
      angle: 20
    }, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);


    var style = {
      font: '45px Arial',
      fill: '#ffffff',
      align: 'center'
    };
    this.titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 15, 'Air War', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 15, 'Click anywhere to play', {
      font: '12px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    this.instructionsText.anchor.setTo(0.5, 0.5);



  },
  update: function() {

    this.sea.tilePosition.y += 0.6;

    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }

  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){
'use strict';

function Play() {}
Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sea = this.add.tileSprite(0, 0, 320, 480, 'sea');
    this.sea.autoScroll(0, 12);

    this.explosionSFX = this.add.audio('explosion');
    this.playerExplosionSFX = this.add.audio('playerExplosion');
    this.enemyFireSFX = this.add.audio('enemyFire');
    this.playerFireSFX = this.add.audio('playerFire');
    this.powerUpSFX = this.add.audio('powerUp');

    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(15, 'greenEnemy');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);

    this.enemyPool.setAll('reward', 100, false, false, 0, true);
    this.enemyPool.setAll('dropRate', 0.3, false, false, 0, true);

    // Set the animation for each sprite
    this.enemyPool.forEach(function(enemy) {
      enemy.animations.add('fly', [0, 1, 2], 20, true);
      enemy.animations.add('hit', [3, 1, 3, 2], 20, false);

      enemy.events.onAnimationComplete.add(function(e) {
        e.play('fly');
      }, this);

    });

    this.nextEnemyAt = 0;
    this.enemyDelay = 1000;
    this.enemyInitialHealth = 2;


    this.shooterPool = this.add.group();
    this.shooterPool.enableBody = true;
    this.shooterPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.shooterPool.createMultiple(20, 'whiteEnemy');
    this.shooterPool.setAll('anchor.x', 0.5);
    this.shooterPool.setAll('anchor.y', 0.5);
    this.shooterPool.setAll('checkWorldBounds', true);
    this.shooterPool.setAll('outOfBoundsKill', true);
    this.shooterPool.setAll('reward', 400, false, false, 0, true);
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
    this.shooterDelay = 2000;
    this.shooterShotDelay = 3000;
    this.shooterInitialHealth = 5;


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
    this.bossInitialHealth = 300;


    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 20, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.animations.add('ghost', [3, 0, 3, 1], 20, true);
    this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 50;
    this.player.body.collideWorldBounds = true; // have to put after enable the physic
    this.player.body.bounce.setTo(0, 0);
    // 20 x 20 pixel hitbox, centered a little bit higher than the center
    this.player.body.setSize(20, 20, 0, -5);
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


    this.nextShotAt = 0;
    this.shotDelay = 400;

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
      this.game.world.width / 2, 30, '' + this.score, {
        font: '20px monospace',
        fill: '#fff',
        align: 'center'
      }
    );
    this.scoreText.anchor.setTo(0.5, 0.5);

    this.lives = this.add.group();
    for (var i = 0; i < 3; i++) {
      var life = this.lives.create(924 + (30 * i), 30, 'player');
      life.scale.setTo(0.5, 0.5);
      life.anchor.setTo(0.5, 0.5);
    }


  },
  update: function() {

    this.sea.tilePosition.y += 0.6;

    if (this.input.activePointer.isDown &&
      this.physics.arcade.distanceToPointer(this.player) > 15) {
      this.physics.arcade.moveToPointer(this.player, this.player.speed);

      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      }

    }
    //    else {
    this.fire();
    //    }

    //    this.game.physics.arcade.collide(this.player, this.enemyPool);

    this.physics.arcade.overlap(
      this.player, this.enemyPool, this.playerHit, null, this
    );


    this.physics.arcade.overlap(
      this.bulletPool, this.enemyPool, this.enemyHit, null, this
    );

    this.physics.arcade.overlap(
      this.bulletPool, this.shooterPool, this.enemyHit, null, this
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
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      // spawn at a random location top of the screen
      //      enemy.reset(this.rnd.integerInRange(20, 780), 0);
      enemy.reset(this.rnd.integerInRange(20, 1004), 0, this.enemyInitialHealth);
      // also randomize the speed
      enemy.body.velocity.y = this.rnd.integerInRange(30, 60);
      enemy.play('fly');
    }


    if (this.nextShooterAt < this.time.now && this.shooterPool.countDead() > 0) {
      this.nextShooterAt = this.time.now + this.shooterDelay;
      var shooter = this.shooterPool.getFirstExists(false);
      // spawn at a random location at the top
      shooter.reset(this.rnd.integerInRange(20, 1004), 0,
        this.shooterInitialHealth);
      // choose a random target location at the bottom
      var target = this.rnd.integerInRange(20, 1004);
      // move to target and rotate the sprite accordingly
      shooter.rotation = this.physics.arcade.moveToXY(
        shooter, target, 768, this.rnd.integerInRange(30, 80)
      ) - Math.PI / 2;
      shooter.play('fly');
      // each shooter has their own shot timer
      shooter.nextShotAt = 0;
    }

    this.shooterPool.forEachAlive(function(enemy) {
      if (this.time.now > enemy.nextShotAt && this.enemyBulletPool.countDead() > 0 && enemy.y < 400 && enemy.inWorld) {
        var bullet = this.enemyBulletPool.getFirstExists(false);
        bullet.reset(enemy.x, enemy.y);
        this.physics.arcade.moveToObject(bullet, this.player, 150);
        this.enemyFireSFX.play();
        enemy.nextShotAt = this.time.now + this.shooterShotDelay;
      }
    }, this);

    if (this.bossApproaching === false && this.boss.alive &&
      this.boss.nextShotAt < this.time.now &&
      this.enemyBulletPool.countDead() > 4) {
      this.boss.nextShotAt = this.time.now + 1500;
      this.enemyFireSFX.play();
      for (var i = 0; i < 3; i++) {
        // process 2 bullets at a time
        var leftBullet = this.enemyBulletPool.getFirstExists(false);
        leftBullet.reset(this.boss.x - 10 - i * 10, this.boss.y + 20);
        var rightBullet = this.enemyBulletPool.getFirstExists(false);
        rightBullet.reset(this.boss.x + 10 + i * 10, this.boss.y + 20);
        if (this.boss.health > 100) {
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
        this.game.world.width / 2, this.game.world.height / 2,
        'Click anywhere to go back to Main Menu', {
          font: '12px sans-serif',
          fill: '#fff'
        }
      );
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;
    }

    if (this.bossApproaching && this.boss.y > 80) {
      this.bossApproaching = false;
      this.boss.health = this.bossInitialHealth;
      this.boss.nextShotAt = 0;
      this.boss.body.velocity.y = 0;
      this.boss.body.velocity.x = 200;
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

    this.nextShotAt = this.time.now + this.shotDelay;
    this.playerFireSFX.play();

    var bullet;
    if (this.weaponLevel === 0) {
      if (this.bulletPool.countDead() === 0) {
        return;
      }
      bullet = this.bulletPool.getFirstExists(false);
      bullet.reset(this.player.x, this.player.y - 20);
      bullet.body.velocity.y = -500;
    } else {
      if (this.bulletPool.countDead() < this.weaponLevel * 2) {
        return;
      }
      for (var i = 0; i < this.weaponLevel; i++) {
        bullet = this.bulletPool.getFirstExists(false);
        // spawn left bullet slightly left off center
        bullet.reset(this.player.x - (10 + i * 6), this.player.y - 20);
        // the left bullets spread from -95 degrees to -135 degrees
        this.physics.arcade.velocityFromAngle(-95 - i * 10, 500, bullet.body.velocity);

        bullet = this.bulletPool.getFirstExists(false);
        // spawn right bullet slightly right off center
        bullet.reset(this.player.x + (10 + i * 6), this.player.y - 20);
        // the right bullets spread from -85 degrees to -45
        this.physics.arcade.velocityFromAngle(-85 + i * 10, 500, bullet.body.velocity);
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

    this.playerExplosionSFX.play();

    // crashing into an enemy only deals 5 damage
    this.damageEnemy(enemy, 5);
    this.weaponLevel = 0;

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
      this.explosionSFX.play();
      this.addToScore(enemy.reward);
      this.spawnPowerUp(enemy);
      if (enemy.key === 'boss') {
        this.enemyPool.destroy();
        this.shooterPool.destroy();
        this.bossPool.destroy();
        this.enemyBulletPool.destroy();
        this.displayEnd(true);
      }
    }
  },

  addToScore: function(score) {
    this.score += score;
    this.scoreText.text = this.score;

    // this approach prevents the boss from spawning again upon winning
    if (this.score >= 5000 && this.bossPool.countDead() == 1) {
      this.spawnBoss();
    }

  },

  displayEnd: function(win) {
    // you can't win and lose at the same time
    if (this.endText && this.endText.exists) {
      return;
    }

    var msg = win ? 'You Win!!!' : 'Game Over!';
    this.endText = this.add.text(
      this.game.world.width / 2, this.game.world.height / 2 - 100, msg, {
        font: '40px serif',
        fill: '#fff'
      }
    );
    this.endText.anchor.setTo(0.5, 0);
    this.showReturn = this.time.now + 2000;
  },

  spawnPowerUp: function(enemy) {
    if (this.powerUpPool.countDead() === 0 || this.weaponLevel === 3) {
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
    this.boss.body.velocity.y = 15;
    this.boss.play('fly');
  },

  playerPowerUp: function(player, powerUp) {
    this.addToScore(powerUp.reward);
    powerUp.kill();
    this.powerUpSFX.play();
    if (this.weaponLevel < 3) {
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
    // Then let's go back to the main menu.
    this.state.start('menu');
  }


};

module.exports = Play;

},{}],6:[function(require,module,exports){
'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);


    this.load.image('sea', 'assets/sea.png');

    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('enemyBullet', 'assets/enemy-bullet.png');

    this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
    this.load.spritesheet('whiteEnemy', 'assets/shooting-enemy.png', 32, 32);
    this.load.spritesheet('boss', 'assets/boss.png', 93, 75);

    this.load.spritesheet('player', 'assets/player.png', 64, 64);
    this.load.image('powerup1', 'assets/powerup1.png');

    this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);

    this.load.audio('explosion', ['assets/explosion.wav']);
    this.load.audio('playerExplosion', ['assets/player-explosion.wav']);
    this.load.audio('enemyFire', ['assets/enemy-fire.wav']);
    this.load.audio('playerFire', ['assets/player-fire.wav']);
    this.load.audio('powerUp', ['assets/powerup.wav']);

  },
  create: function() {
    this.asset.cropEnabled = false;

  },
  update: function() {
    if ( !! this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])
(function e(t,s,o){function i(h,a){if(!s[h]){if(!t[h]){var n="function"==typeof require&&require;if(!a&&n)return n(h,!0);if(l)return l(h,!0);throw Error("Cannot find module '"+h+"'")}var r=s[h]={exports:{}};t[h][0].call(r.exports,function(e){var s=t[h][1][e];return i(s?s:e)},r,r.exports,e,t,s,o)}return s[h].exports}for(var l="function"==typeof require&&require,h=0;o.length>h;h++)i(o[h]);return i})({1:[function(t){"use strict";window.onload=function(){var e=new Phaser.Game(240,480,Phaser.AUTO,"shmup");e.state.add("boot",t("./states/boot")),e.state.add("gameover",t("./states/gameover")),e.state.add("menu",t("./states/menu")),e.state.add("play",t("./states/play")),e.state.add("preload",t("./states/preload")),e.state.start("boot")}},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){this.load.image("preloader","assets/preloader.gif")},create:function(){this.game.input.maxPointers=1,this.stage.disableVisibilityChange=!0,this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.scale.pageAlignHorizontally=!0,this.scale.hasResized.add(this.gameResized,this),this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation,this),this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation,this),this.scale.setScreenSize(!0),this.game.state.start("preload")},gameResized:function(){},enterIncorrectOrientation:function(){this.orientated=!1,document.getElementById("orientation").style.display="block"},leaveIncorrectOrientation:function(){this.orientated=!0,document.getElementById("orientation").style.display="none"}},e.exports=s},{}],3:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){},create:function(){var t={font:"65px Arial",fill:"#ffffff",align:"center"};this.titleText=this.game.add.text(this.game.world.centerX,100,"Game Over!",t),this.titleText.anchor.setTo(.5,.5),this.congratsText=this.game.add.text(this.game.world.centerX,200,"You Win!",{font:"32px Arial",fill:"#ffffff",align:"center"}),this.congratsText.anchor.setTo(.5,.5),this.instructionText=this.game.add.text(this.game.world.centerX,300,"Click To Play Again",{font:"16px Arial",fill:"#ffffff",align:"center"}),this.instructionText.anchor.setTo(.5,.5)},update:function(){this.game.input.activePointer.justPressed()&&this.game.state.start("play")}},e.exports=s},{}],4:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){},create:function(){this.sea=this.add.tileSprite(0,0,240,480,"sea"),this.enemy=this.game.add.sprite(this.game.world.centerX,50,"boss"),this.enemy.animations.add("fly",[0,1,2],20,!0),this.enemy.play("fly"),this.enemy.anchor.setTo(.5,.5),this.physics.enable(this.enemy,Phaser.Physics.ARCADE),this.player=this.add.sprite(this.game.world.centerX,400,"player"),this.player.anchor.setTo(.5,.5),this.player.animations.add("fly",[0,1,2],20,!0),this.player.play("fly"),this.physics.enable(this.player,Phaser.Physics.ARCADE),this.enemy.angle=-20,this.game.add.tween(this.enemy).to({angle:20},1e3,Phaser.Easing.Linear.NONE,!0,0,1e3,!0),this.player.angle=-20,this.game.add.tween(this.player).to({angle:20},1e3,Phaser.Easing.Linear.NONE,!0,0,1e3,!0);var t={font:"45px Arial",fill:"#ffffff",align:"center"};this.titleText=this.game.add.text(this.game.world.centerX,this.game.world.centerY-15,"'Allo, 'Allo!",t),this.titleText.anchor.setTo(.5,.5),this.instructionsText=this.game.add.text(this.game.world.centerX,this.game.world.centerY+15,"Click anywhere to play",{font:"12px Arial",fill:"#ffffff",align:"center"}),this.instructionsText.anchor.setTo(.5,.5)},update:function(){this.sea.tilePosition.y+=.6,this.game.input.activePointer.justPressed()&&this.game.state.start("play")}},e.exports=s},{}],5:[function(t,e){"use strict";function s(){}s.prototype={create:function(){this.game.physics.startSystem(Phaser.Physics.ARCADE),this.sea=this.add.tileSprite(0,0,240,480,"sea"),this.sea.autoScroll(0,12),this.explosionSFX=this.add.audio("explosion"),this.playerExplosionSFX=this.add.audio("playerExplosion"),this.enemyFireSFX=this.add.audio("enemyFire"),this.playerFireSFX=this.add.audio("playerFire"),this.powerUpSFX=this.add.audio("powerUp"),this.enemyPool=this.add.group(),this.enemyPool.enableBody=!0,this.enemyPool.physicsBodyType=Phaser.Physics.ARCADE,this.enemyPool.createMultiple(15,"greenEnemy"),this.enemyPool.setAll("anchor.x",.5),this.enemyPool.setAll("anchor.y",.5),this.enemyPool.setAll("outOfBoundsKill",!0),this.enemyPool.setAll("checkWorldBounds",!0),this.enemyPool.setAll("reward",100,!1,!1,0,!0),this.enemyPool.setAll("dropRate",.3,!1,!1,0,!0),this.enemyPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.nextEnemyAt=0,this.enemyDelay=1e3,this.enemyInitialHealth=2,this.shooterPool=this.add.group(),this.shooterPool.enableBody=!0,this.shooterPool.physicsBodyType=Phaser.Physics.ARCADE,this.shooterPool.createMultiple(10,"whiteEnemy"),this.shooterPool.setAll("anchor.x",.5),this.shooterPool.setAll("anchor.y",.5),this.shooterPool.setAll("checkWorldBounds",!0),this.shooterPool.setAll("outOfBoundsKill",!0),this.shooterPool.setAll("reward",400,!1,!1,0,!0),this.shooterPool.setAll("dropRate",.5,!1,!1,0,!0),this.shooterPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.nextShooterAt=this.time.now+5e3,this.shooterDelay=3e3,this.shooterShotDelay=3e3,this.shooterInitialHealth=5,this.bossPool=this.add.group(),this.bossPool.enableBody=!0,this.bossPool.physicsBodyType=Phaser.Physics.ARCADE,this.bossPool.createMultiple(1,"boss"),this.bossPool.setAll("anchor.x",.5),this.bossPool.setAll("anchor.y",.5),this.bossPool.setAll("checkWorldBounds",!0),this.bossPool.setAll("outOfBoundsKill",!0),this.bossPool.setAll("reward",1e4,!1,!1,0,!0),this.bossPool.setAll("dropRate",0,!1,!1,0,!0),this.bossPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.boss=this.bossPool.getTop(),this.bossApproaching=!1,this.bossInitialHealth=300,this.player=this.add.sprite(this.game.world.centerX,this.game.world.height-20,"player"),this.player.anchor.setTo(.5,.5),this.player.animations.add("fly",[0,1,2],20,!0),this.player.animations.add("ghost",[3,0,3,1],20,!0),this.player.play("fly"),this.physics.enable(this.player,Phaser.Physics.ARCADE),this.player.speed=80,this.player.body.collideWorldBounds=!0,this.player.body.bounce.setTo(0,0),this.player.body.setSize(20,20,0,-5),this.weaponLevel=0,this.powerUpPool=this.add.group(),this.powerUpPool.enableBody=!0,this.powerUpPool.physicsBodyType=Phaser.Physics.ARCADE,this.powerUpPool.createMultiple(3,"powerup1"),this.powerUpPool.setAll("anchor.x",.5),this.powerUpPool.setAll("anchor.y",.5),this.powerUpPool.setAll("checkWorldBounds",!0),this.powerUpPool.setAll("outOfBoundsKill",!0),this.powerUpPool.setAll("reward",100,!1,!1,0,!0),this.bulletPool=this.add.group(),this.bulletPool.enableBody=!0,this.bulletPool.physicsBodyType=Phaser.Physics.ARCADE,this.bulletPool.createMultiple(100,"bullet"),this.bulletPool.setAll("anchor.x",.5),this.bulletPool.setAll("anchor.y",.5),this.bulletPool.setAll("checkWorldBounds",!0),this.bulletPool.setAll("outOfBoundsKill",!0),this.nextShotAt=0,this.shotDelay=400,this.enemyBulletPool=this.add.group(),this.enemyBulletPool.enableBody=!0,this.enemyBulletPool.physicsBodyType=Phaser.Physics.ARCADE,this.enemyBulletPool.createMultiple(100,"enemyBullet"),this.enemyBulletPool.setAll("anchor.x",.5),this.enemyBulletPool.setAll("anchor.y",.5),this.enemyBulletPool.setAll("checkWorldBounds",!0),this.enemyBulletPool.setAll("outOfBoundsKill",!0),this.enemyBulletPool.setAll("reward",0,!1,!1,0,!0),this.explosionPool=this.add.group(),this.explosionPool.enableBody=!0,this.explosionPool.physicsBodyType=Phaser.Physics.ARCADE,this.explosionPool.createMultiple(100,"explosion"),this.explosionPool.setAll("anchor.x",.5),this.explosionPool.setAll("anchor.y",.5),this.explosionPool.forEach(function(t){t.animations.add("boom")}),this.score=0,this.scoreText=this.add.text(this.game.world.width/2,30,""+this.score,{font:"20px monospace",fill:"#fff",align:"center"}),this.scoreText.anchor.setTo(.5,.5),this.lives=this.add.group();for(var t=0;3>t;t++){var e=this.lives.create(924+30*t,30,"player");e.scale.setTo(.5,.5),e.anchor.setTo(.5,.5)}},update:function(){if(this.sea.tilePosition.y+=.6,this.input.activePointer.isDown&&this.physics.arcade.distanceToPointer(this.player)>15&&(this.physics.arcade.moveToPointer(this.player,this.player.speed),this.returnText&&this.returnText.exists&&this.quitGame()),this.fire(),this.physics.arcade.overlap(this.player,this.enemyPool,this.playerHit,null,this),this.physics.arcade.overlap(this.bulletPool,this.enemyPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.bulletPool,this.shooterPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.player,this.shooterPool,this.playerHit,null,this),this.physics.arcade.overlap(this.player,this.enemyBulletPool,this.playerHit,null,this),this.physics.arcade.overlap(this.player,this.powerUpPool,this.playerPowerUp,null,this),this.nextEnemyAt<this.time.now&&this.enemyPool.countDead()>0){this.nextEnemyAt=this.time.now+this.enemyDelay;var t=this.enemyPool.getFirstExists(!1);t.reset(this.rnd.integerInRange(20,1004),0,this.enemyInitialHealth),t.body.velocity.y=this.rnd.integerInRange(30,60),t.play("fly")}if(this.nextShooterAt<this.time.now&&this.shooterPool.countDead()>0){this.nextShooterAt=this.time.now+this.shooterDelay;var e=this.shooterPool.getFirstExists(!1);e.reset(this.rnd.integerInRange(20,1004),0,this.shooterInitialHealth);var s=this.rnd.integerInRange(20,1004);e.rotation=this.physics.arcade.moveToXY(e,s,768,this.rnd.integerInRange(30,80))-Math.PI/2,e.play("fly"),e.nextShotAt=0}if(this.shooterPool.forEachAlive(function(t){if(this.time.now>t.nextShotAt&&this.enemyBulletPool.countDead()>0&&400>t.y&&t.inWorld){var e=this.enemyBulletPool.getFirstExists(!1);e.reset(t.x,t.y),this.physics.arcade.moveToObject(e,this.player,150),this.enemyFireSFX.play(),t.nextShotAt=this.time.now+this.shooterShotDelay}},this),this.bossApproaching===!1&&this.boss.alive&&this.boss.nextShotAt<this.time.now&&this.enemyBulletPool.countDead()>4){this.boss.nextShotAt=this.time.now+1500,this.enemyFireSFX.play();for(var o=0;3>o;o++){var i=this.enemyBulletPool.getFirstExists(!1);i.reset(this.boss.x-10-10*o,this.boss.y+20);var l=this.enemyBulletPool.getFirstExists(!1);l.reset(this.boss.x+10+10*o,this.boss.y+20),this.boss.health>100?(this.physics.arcade.moveToObject(i,this.player,150),this.physics.arcade.moveToObject(l,this.player,150)):(this.physics.arcade.moveToXY(i,this.player.x-100*o,this.player.y,150),this.physics.arcade.moveToXY(l,this.player.x+100*o,this.player.y,150))}}this.ghostUntil&&this.ghostUntil<this.time.now&&(this.ghostUntil=null,this.player.play("fly")),this.showReturn&&this.time.now>this.showReturn&&(this.returnText=this.add.text(this.game.world.width/2,this.game.world.height/2,"Click anywhere to go back to Main Menu",{font:"12px sans-serif",fill:"#fff"}),this.returnText.anchor.setTo(.5,.5),this.showReturn=!1),this.bossApproaching&&this.boss.y>80&&(this.bossApproaching=!1,this.boss.health=this.bossInitialHealth,this.boss.nextShotAt=0,this.boss.body.velocity.y=0,this.boss.body.velocity.x=200,this.boss.body.bounce.x=1,this.boss.body.collideWorldBounds=!0),this.bossApproaching===!1&&(this.physics.arcade.overlap(this.bulletPool,this.bossPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.player,this.bossPool,this.playerHit,null,this))},fire:function(){if(this.player.alive&&!(this.nextShotAt>this.time.now)){this.nextShotAt=this.time.now+this.shotDelay,this.playerFireSFX.play();var t;if(0===this.weaponLevel){if(0===this.bulletPool.countDead())return;t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x,this.player.y-20),t.body.velocity.y=-500}else{if(this.bulletPool.countDead()<2*this.weaponLevel)return;for(var e=0;this.weaponLevel>e;e++)t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x-(10+6*e),this.player.y-20),this.physics.arcade.velocityFromAngle(-95-10*e,500,t.body.velocity),t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x+(10+6*e),this.player.y-20),this.physics.arcade.velocityFromAngle(-85+10*e,500,t.body.velocity)}}},enemyHit:function(t,e){t.kill(),this.damageEnemy(e,1)},playerHit:function(t,e){if(!(this.ghostUntil&&this.ghostUntil>this.time.now)){this.playerExplosionSFX.play(),this.damageEnemy(e,5),this.weaponLevel=0;var s=this.lives.getFirstAlive();s?(s.kill(),this.ghostUntil=this.time.now+3e3,this.player.play("ghost")):(this.explode(t),t.kill(),this.displayEnd(!1))}},explode:function(t){if(0!==this.explosionPool.countDead()){var e=this.explosionPool.getFirstExists(!1);e.reset(t.x,t.y),e.play("boom",15,!1,!0),e.body.velocity.x=t.body.velocity.x,e.body.velocity.y=t.body.velocity.y}},damageEnemy:function(t,e){t.damage(e),t.alive?t.play("hit"):(this.explode(t),this.explosionSFX.play(),this.addToScore(t.reward),this.spawnPowerUp(t),"boss"===t.key&&(this.enemyPool.destroy(),this.shooterPool.destroy(),this.bossPool.destroy(),this.enemyBulletPool.destroy(),this.displayEnd(!0)))},addToScore:function(t){this.score+=t,this.scoreText.text=this.score,this.score>=5e3&&1==this.bossPool.countDead()&&this.spawnBoss()},displayEnd:function(t){if(!this.endText||!this.endText.exists){var e=t?"You Win!!!":"Game Over!";this.endText=this.add.text(this.game.world.width/2,this.game.world.height/2-100,e,{font:"40px serif",fill:"#fff"}),this.endText.anchor.setTo(.5,0),this.showReturn=this.time.now+2e3}},spawnPowerUp:function(t){if(0!==this.powerUpPool.countDead()&&3!==this.weaponLevel&&this.rnd.frac()<t.dropRate){var e=this.powerUpPool.getFirstExists(!1);e.reset(t.x,t.y),e.body.velocity.y=100}},spawnBoss:function(){this.bossApproaching=!0,this.boss.reset(this.game.world.centerX,0,this.bossInitialHealth),this.game.physics.enable(this.boss,Phaser.Physics.ARCADE),this.boss.body.velocity.y=15,this.boss.play("fly")},playerPowerUp:function(t,e){this.addToScore(e.reward),e.kill(),this.powerUpSFX.play(),3>this.weaponLevel&&this.weaponLevel++},quitGame:function(){this.sea.destroy(),this.player.destroy(),this.enemyPool.destroy(),this.bulletPool.destroy(),this.explosionPool.destroy(),this.shooterPool.destroy(),this.enemyBulletPool.destroy(),this.powerUpPool.destroy(),this.bossPool.destroy(),this.scoreText.destroy(),this.endText.destroy(),this.returnText.destroy(),this.state.start("menu")}},e.exports=s},{}],6:[function(t,e){"use strict";function s(){this.asset=null,this.ready=!1}s.prototype={preload:function(){this.asset=this.add.sprite(this.game.world.width/2,this.game.world.height/2,"preloader"),this.asset.anchor.setTo(.5,.5),this.load.onLoadComplete.addOnce(this.onLoadComplete,this),this.load.setPreloadSprite(this.asset),this.load.image("sea","assets/sea.png"),this.load.image("bullet","assets/bullet.png"),this.load.image("enemyBullet","assets/enemy-bullet.png"),this.load.spritesheet("greenEnemy","assets/enemy.png",32,32),this.load.spritesheet("whiteEnemy","assets/shooting-enemy.png",32,32),this.load.spritesheet("boss","assets/boss.png",93,75),this.load.spritesheet("player","assets/player.png",64,64),this.load.image("powerup1","assets/powerup1.png"),this.load.spritesheet("explosion","assets/explosion.png",32,32),this.load.audio("explosion",["assets/explosion.wav"]),this.load.audio("playerExplosion",["assets/player-explosion.wav"]),this.load.audio("enemyFire",["assets/enemy-fire.wav"]),this.load.audio("playerFire",["assets/player-fire.wav"]),this.load.audio("powerUp",["assets/powerup.wav"])},create:function(){this.asset.cropEnabled=!1},update:function(){this.ready&&this.game.state.start("menu")},onLoadComplete:function(){this.ready=!0}},e.exports=s},{}]},{},[1])(function e(t,s,o){function i(h,a){if(!s[h]){if(!t[h]){var n="function"==typeof require&&require;if(!a&&n)return n(h,!0);if(l)return l(h,!0);throw Error("Cannot find module '"+h+"'")}var r=s[h]={exports:{}};t[h][0].call(r.exports,function(e){var s=t[h][1][e];return i(s?s:e)},r,r.exports,e,t,s,o)}return s[h].exports}for(var l="function"==typeof require&&require,h=0;o.length>h;h++)i(o[h]);return i})({1:[function(t){"use strict";window.onload=function(){var e=new Phaser.Game(240,480,Phaser.AUTO,"shmup");e.state.add("boot",t("./states/boot")),e.state.add("gameover",t("./states/gameover")),e.state.add("menu",t("./states/menu")),e.state.add("play",t("./states/play")),e.state.add("preload",t("./states/preload")),e.state.start("boot")}},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){this.load.image("preloader","assets/preloader.gif")},create:function(){this.game.input.maxPointers=1,this.stage.disableVisibilityChange=!0,this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.scale.pageAlignHorizontally=!0,this.scale.hasResized.add(this.gameResized,this),this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation,this),this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation,this),this.scale.setScreenSize(!0),this.game.state.start("preload")},gameResized:function(){},enterIncorrectOrientation:function(){this.orientated=!1,document.getElementById("orientation").style.display="block"},leaveIncorrectOrientation:function(){this.orientated=!0,document.getElementById("orientation").style.display="none"}},e.exports=s},{}],3:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){},create:function(){var t={font:"65px Arial",fill:"#ffffff",align:"center"};this.titleText=this.game.add.text(this.game.world.centerX,100,"Game Over!",t),this.titleText.anchor.setTo(.5,.5),this.congratsText=this.game.add.text(this.game.world.centerX,200,"You Win!",{font:"32px Arial",fill:"#ffffff",align:"center"}),this.congratsText.anchor.setTo(.5,.5),this.instructionText=this.game.add.text(this.game.world.centerX,300,"Click To Play Again",{font:"16px Arial",fill:"#ffffff",align:"center"}),this.instructionText.anchor.setTo(.5,.5)},update:function(){this.game.input.activePointer.justPressed()&&this.game.state.start("play")}},e.exports=s},{}],4:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){},create:function(){this.sea=this.add.tileSprite(0,0,800,600,"sea"),this.enemy=this.game.add.sprite(this.game.world.centerX,138,"boss"),this.enemy.animations.add("fly",[0,1,2],20,!0),this.enemy.play("fly"),this.enemy.anchor.setTo(.5,.5),this.physics.enable(this.enemy,Phaser.Physics.ARCADE),this.player=this.add.sprite(400,550,"player"),this.player.anchor.setTo(.5,.5),this.player.animations.add("fly",[0,1,2],20,!0),this.player.play("fly"),this.physics.enable(this.player,Phaser.Physics.ARCADE),this.enemy.angle=-20,this.game.add.tween(this.enemy).to({angle:20},1e3,Phaser.Easing.Linear.NONE,!0,0,1e3,!0),this.player.angle=-20,this.game.add.tween(this.player).to({angle:20},1e3,Phaser.Easing.Linear.NONE,!0,0,1e3,!0);var t={font:"65px Arial",fill:"#ffffff",align:"center"};this.titleText=this.game.add.text(this.game.world.centerX,300,"'Allo, 'Allo!",t),this.titleText.anchor.setTo(.5,.5),this.instructionsText=this.game.add.text(this.game.world.centerX,400,"Click anywhere to play",{font:"16px Arial",fill:"#ffffff",align:"center"}),this.instructionsText.anchor.setTo(.5,.5)},update:function(){this.sea.tilePosition.y+=.6,this.game.input.activePointer.justPressed()&&this.game.state.start("play")}},e.exports=s},{}],5:[function(t,e){"use strict";function s(){}s.prototype={create:function(){this.game.physics.startSystem(Phaser.Physics.ARCADE),this.sea=this.add.tileSprite(0,0,800,600,"sea"),this.sea.autoScroll(0,12),this.explosionSFX=this.add.audio("explosion"),this.playerExplosionSFX=this.add.audio("playerExplosion"),this.enemyFireSFX=this.add.audio("enemyFire"),this.playerFireSFX=this.add.audio("playerFire"),this.powerUpSFX=this.add.audio("powerUp"),this.enemyPool=this.add.group(),this.enemyPool.enableBody=!0,this.enemyPool.physicsBodyType=Phaser.Physics.ARCADE,this.enemyPool.createMultiple(20,"greenEnemy"),this.enemyPool.setAll("anchor.x",.5),this.enemyPool.setAll("anchor.y",.5),this.enemyPool.setAll("outOfBoundsKill",!0),this.enemyPool.setAll("checkWorldBounds",!0),this.enemyPool.setAll("reward",100,!1,!1,0,!0),this.enemyPool.setAll("dropRate",.3,!1,!1,0,!0),this.enemyPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.nextEnemyAt=0,this.enemyDelay=1e3,this.enemyInitialHealth=2,this.shooterPool=this.add.group(),this.shooterPool.enableBody=!0,this.shooterPool.physicsBodyType=Phaser.Physics.ARCADE,this.shooterPool.createMultiple(10,"whiteEnemy"),this.shooterPool.setAll("anchor.x",.5),this.shooterPool.setAll("anchor.y",.5),this.shooterPool.setAll("outOfBoundsKill",!0),this.shooterPool.setAll("checkWorldBounds",!0),this.shooterPool.setAll("reward",400,!1,!1,0,!0),this.shooterPool.setAll("dropRate",.5,!1,!1,0,!0),this.shooterPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.nextShooterAt=this.time.now+5e3,this.shooterDelay=3e3,this.shooterShotDelay=5e3,this.shooterInitialHealth=5,this.bossPool=this.add.group(),this.bossPool.enableBody=!0,this.bossPool.physicsBodyType=Phaser.Physics.ARCADE,this.bossPool.createMultiple(1,"boss"),this.bossPool.setAll("anchor.x",.5),this.bossPool.setAll("anchor.y",.5),this.bossPool.setAll("outOfBoundsKill",!0),this.bossPool.setAll("checkWorldBounds",!0),this.bossPool.setAll("reward",1e4,!1,!1,0,!0),this.bossPool.setAll("dropRate",0,!1,!1,0,!0),this.bossPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.boss=this.bossPool.getTop(),this.bossApproaching=!1,this.bossInitialHealth=300,this.player=this.add.sprite(400,550,"player"),this.player.anchor.setTo(.5,.5),this.player.animations.add("fly",[0,1,2],20,!0),this.player.animations.add("ghost",[3,0,3,1],20,!0),this.player.play("fly"),this.physics.enable(this.player,Phaser.Physics.ARCADE),this.player.speed=300,this.player.body.collideWorldBounds=!0,this.player.body.bounce.setTo(.1,.1),this.player.body.setSize(20,20,0,-5),this.weaponLevel=0,this.powerUpPool=this.add.group(),this.powerUpPool.enableBody=!0,this.powerUpPool.physicsBodyType=Phaser.Physics.ARCADE,this.powerUpPool.createMultiple(3,"powerup1"),this.powerUpPool.setAll("anchor.x",.5),this.powerUpPool.setAll("anchor.y",.5),this.powerUpPool.setAll("outOfBoundsKill",!0),this.powerUpPool.setAll("checkWorldBounds",!0),this.powerUpPool.setAll("reward",100,!1,!1,0,!0),this.bulletPool=this.add.group(),this.bulletPool.enableBody=!0,this.bulletPool.physicsBodyType=Phaser.Physics.ARCADE,this.bulletPool.createMultiple(100,"bullet"),this.bulletPool.setAll("anchor.x",.5),this.bulletPool.setAll("anchor.y",.5),this.bulletPool.setAll("outOfBoundsKill",!0),this.bulletPool.setAll("checkWorldBounds",!0),this.nextShotAt=0,this.shotDelay=300,this.enemyBulletPool=this.add.group(),this.enemyBulletPool.enableBody=!0,this.enemyBulletPool.physicsBodyType=Phaser.Physics.ARCADE,this.enemyBulletPool.createMultiple(100,"enemyBullet"),this.enemyBulletPool.setAll("anchor.x",.5),this.enemyBulletPool.setAll("anchor.y",.5),this.enemyBulletPool.setAll("outOfBoundsKill",!0),this.enemyBulletPool.setAll("checkWorldBounds",!0),this.enemyBulletPool.setAll("reward",0,!1,!1,0,!0),this.explosionPool=this.add.group(),this.explosionPool.enableBody=!0,this.explosionPool.physicsBodyType=Phaser.Physics.ARCADE,this.explosionPool.createMultiple(100,"explosion"),this.explosionPool.setAll("anchor.x",.5),this.explosionPool.setAll("anchor.y",.5),this.explosionPool.forEach(function(t){t.animations.add("boom")}),this.score=0,this.scoreText=this.add.text(this.game.world.width/2,30,""+this.score,{font:"20px monospace",fill:"#fff",align:"center"}),this.scoreText.anchor.setTo(.5,.5),this.lives=this.add.group();for(var t=0;3>t;t++){var e=this.lives.create(924+30*t,30,"player");e.scale.setTo(.5,.5),e.anchor.setTo(.5,.5)}},update:function(){if(this.sea.tilePosition.y+=.6,this.input.activePointer.isDown&&this.physics.arcade.distanceToPointer(this.player)>15&&(this.physics.arcade.moveToPointer(this.player,this.player.speed),this.returnText&&this.returnText.exists?this.quitGame():this.fire()),this.physics.arcade.overlap(this.player,this.enemyPool,this.playerHit,null,this),this.physics.arcade.overlap(this.bulletPool,this.enemyPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.bulletPool,this.shooterPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.player,this.shooterPool,this.playerHit,null,this),this.physics.arcade.overlap(this.player,this.enemyBulletPool,this.playerHit,null,this),this.physics.arcade.overlap(this.player,this.powerUpPool,this.playerPowerUp,null,this),this.nextEnemyAt<this.time.now&&this.enemyPool.countDead()>0){this.nextEnemyAt=this.time.now+this.enemyDelay;var t=this.enemyPool.getFirstExists(!1);t.reset(this.rnd.integerInRange(20,1004),0,this.enemyInitialHealth),t.body.velocity.y=this.rnd.integerInRange(30,60),t.play("fly")}if(this.nextShooterAt<this.time.now&&this.shooterPool.countDead()>0){this.nextShooterAt=this.time.now+this.shooterDelay;var e=this.shooterPool.getFirstExists(!1);e.reset(this.rnd.integerInRange(20,1004),0,this.shooterInitialHealth);var s=this.rnd.integerInRange(20,1004);e.rotation=this.physics.arcade.moveToXY(e,s,768,this.rnd.integerInRange(30,80))-Math.PI/2,e.play("fly"),e.nextShotAt=0}if(this.shooterPool.forEachAlive(function(t){if(this.time.now>t.nextShotAt&&this.enemyBulletPool.countDead()>0&&500>t.y){var e=this.enemyBulletPool.getFirstExists(!1);e.reset(t.x,t.y),this.physics.arcade.moveToObject(e,this.player,150),t.nextShotAt=this.time.now+this.shooterShotDelay,this.enemyFireSFX.play()}},this),this.bossApproaching===!1&&this.boss.alive&&this.boss.nextShotAt<this.time.now&&this.enemyBulletPool.countDead()>4){this.boss.nextShotAt=this.time.now+1500,this.enemyFireSFX.play();for(var o=0;3>o;o++){var i=this.enemyBulletPool.getFirstExists(!1);i.reset(this.boss.x-10-10*o,this.boss.y+20);var l=this.enemyBulletPool.getFirstExists(!1);l.reset(this.boss.x+10+10*o,this.boss.y+20),this.boss.health>100?(this.physics.arcade.moveToObject(i,this.player,150),this.physics.arcade.moveToObject(l,this.player,150)):(this.physics.arcade.moveToXY(i,this.player.x-100*o,this.player.y,150),this.physics.arcade.moveToXY(l,this.player.x+100*o,this.player.y,150))}}this.ghostUntil&&this.ghostUntil<this.time.now&&(this.ghostUntil=null,this.player.play("fly")),this.showReturn&&this.time.now>this.showReturn&&(this.returnText=this.add.text(this.game.world.width/2,300,"Click anywhere to go back to Main Menu",{font:"16px sans-serif",fill:"#fff"}),this.returnText.anchor.setTo(.5,.5),this.showReturn=!1),this.bossApproaching&&this.boss.y>80&&(this.bossApproaching=!1,this.boss.health=this.bossInitialHealth,this.boss.nextShotAt=0,this.boss.body.velocity.y=0,this.boss.body.velocity.x=200,this.boss.body.bounce.x=1,this.boss.body.collideWorldBounds=!0),this.bossApproaching===!1&&(this.physics.arcade.overlap(this.bulletPool,this.bossPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.player,this.bossPool,this.playerHit,null,this))},fire:function(){if(this.player.alive&&!(this.nextShotAt>this.time.now)){this.nextShotAt=this.time.now+this.shotDelay,this.playerFireSFX.play();var t;if(0===this.weaponLevel){if(0===this.bulletPool.countDead())return;t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x,this.player.y-20),t.body.velocity.y=-500}else{if(this.bulletPool.countDead()<2*this.weaponLevel)return;for(var e=0;this.weaponLevel>e;e++)t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x-(10+6*e),this.player.y-20),this.physics.arcade.velocityFromAngle(-95-10*e,500,t.body.velocity),t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x+(10+6*e),this.player.y-20),this.physics.arcade.velocityFromAngle(-85+10*e,500,t.body.velocity)}}},enemyHit:function(t,e){t.kill(),this.damageEnemy(e,1)},playerHit:function(t,e){if(!(this.ghostUntil&&this.ghostUntil>this.time.now)){this.playerExplosionSFX.play(),this.damageEnemy(e,5),this.weaponLevel=0;var s=this.lives.getFirstAlive();s?(s.kill(),this.ghostUntil=this.time.now+3e3,this.player.play("ghost")):(this.explode(t),t.kill(),this.displayEnd(!1))}},explode:function(t){if(0!==this.explosionPool.countDead()){var e=this.explosionPool.getFirstExists(!1);e.reset(t.x,t.y),e.play("boom",15,!1,!0),e.body.velocity.x=t.body.velocity.x,e.body.velocity.y=t.body.velocity.y}},damageEnemy:function(t,e){t.damage(e),t.alive?t.play("hit"):(this.explode(t),this.explosionSFX.play(),this.addToScore(t.reward),this.spawnPowerUp(t),"boss"===t.key&&(this.enemyPool.destroy(),this.shooterPool.destroy(),this.bossPool.destroy(),this.enemyBulletPool.destroy(),this.displayEnd(!0)))},addToScore:function(t){this.score+=t,this.scoreText.text=this.score,this.score>=5e3&&1==this.bossPool.countDead()&&this.spawnBoss()},displayEnd:function(t){if(!this.endText||!this.endText.exists){var e=t?"You Win!!!":"Game Over!";this.endText=this.add.text(this.game.world.width/2,220,e,{font:"72px serif",fill:"#fff"}),this.endText.anchor.setTo(.5,0),this.showReturn=this.time.now+2e3}},spawnPowerUp:function(t){if(0!==this.powerUpPool.countDead()&&3!==this.weaponLevel&&this.rnd.frac()<t.dropRate){var e=this.powerUpPool.getFirstExists(!1);e.reset(t.x,t.y),e.body.velocity.y=100}},spawnBoss:function(){this.bossApproaching=!0,this.boss.reset(512,0,this.bossInitialHealth),this.game.physics.enable(this.boss,Phaser.Physics.ARCADE),this.boss.body.velocity.y=15,this.boss.play("fly")},playerPowerUp:function(t,e){this.addToScore(e.reward),e.kill(),this.powerUpSFX.play(),3>this.weaponLevel&&this.weaponLevel++},quitGame:function(){this.sea.destroy(),this.player.destroy(),this.enemyPool.destroy(),this.bulletPool.destroy(),this.explosionPool.destroy(),this.shooterPool.destroy(),this.enemyBulletPool.destroy(),this.powerUpPool.destroy(),this.bossPool.destroy(),this.scoreText.destroy(),this.endText.destroy(),this.returnText.destroy(),this.state.start("menu")}},e.exports=s},{}],6:[function(t,e){"use strict";function s(){this.asset=null,this.ready=!1}s.prototype={preload:function(){this.asset=this.add.sprite(this.game.world.width/2,this.game.world.height/2,"preloader"),this.asset.anchor.setTo(.5,.5),this.load.onLoadComplete.addOnce(this.onLoadComplete,this),this.load.setPreloadSprite(this.asset),this.load.image("sea","assets/sea.png"),this.load.image("bullet","assets/bullet.png"),this.load.image("enemyBullet","assets/enemy-bullet.png"),this.load.spritesheet("greenEnemy","assets/enemy.png",32,32),this.load.spritesheet("whiteEnemy","assets/shooting-enemy.png",32,32),this.load.spritesheet("boss","assets/boss.png",93,75),this.load.spritesheet("player","assets/player.png",64,64),this.load.image("powerup1","assets/powerup1.png"),this.load.spritesheet("explosion","assets/explosion.png",32,32),this.load.audio("explosion",["assets/explosion.wav"]),this.load.audio("playerExplosion",["assets/player-explosion.wav"]),this.load.audio("enemyFire",["assets/enemy-fire.wav"]),this.load.audio("playerFire",["assets/player-fire.wav"]),this.load.audio("powerUp",["assets/powerup.wav"])},create:function(){this.asset.cropEnabled=!1},update:function(){this.ready&&this.game.state.start("menu")},onLoadComplete:function(){this.ready=!0}},e.exports=s},{}]},{},[1])(function e(t,s,o){function i(h,a){if(!s[h]){if(!t[h]){var n="function"==typeof require&&require;if(!a&&n)return n(h,!0);if(l)return l(h,!0);throw Error("Cannot find module '"+h+"'")}var r=s[h]={exports:{}};t[h][0].call(r.exports,function(e){var s=t[h][1][e];
return i(s?s:e)},r,r.exports,e,t,s,o)}return s[h].exports}for(var l="function"==typeof require&&require,h=0;o.length>h;h++)i(o[h]);return i})({1:[function(t){"use strict";window.onload=function(){var e=new Phaser.Game(800,600,Phaser.AUTO,"shmup");e.state.add("boot",t("./states/boot")),e.state.add("gameover",t("./states/gameover")),e.state.add("menu",t("./states/menu")),e.state.add("play",t("./states/play")),e.state.add("preload",t("./states/preload")),e.state.start("boot")}},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){this.load.image("preloader","assets/preloader.gif")},create:function(){this.game.input.maxPointers=1,this.stage.disableVisibilityChange=!0,this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.scale.pageAlignHorizontally=!0,this.scale.hasResized.add(this.gameResized,this),this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation,this),this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation,this),this.scale.setScreenSize(!0),this.game.state.start("preload")},gameResized:function(){},enterIncorrectOrientation:function(){this.orientated=!1,document.getElementById("orientation").style.display="block"},leaveIncorrectOrientation:function(){this.orientated=!0,document.getElementById("orientation").style.display="none"}},e.exports=s},{}],3:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){},create:function(){var t={font:"65px Arial",fill:"#ffffff",align:"center"};this.titleText=this.game.add.text(this.game.world.centerX,100,"Game Over!",t),this.titleText.anchor.setTo(.5,.5),this.congratsText=this.game.add.text(this.game.world.centerX,200,"You Win!",{font:"32px Arial",fill:"#ffffff",align:"center"}),this.congratsText.anchor.setTo(.5,.5),this.instructionText=this.game.add.text(this.game.world.centerX,300,"Click To Play Again",{font:"16px Arial",fill:"#ffffff",align:"center"}),this.instructionText.anchor.setTo(.5,.5)},update:function(){this.game.input.activePointer.justPressed()&&this.game.state.start("play")}},e.exports=s},{}],4:[function(t,e){"use strict";function s(){}s.prototype={preload:function(){},create:function(){this.sea=this.add.tileSprite(0,0,800,600,"sea"),this.enemy=this.game.add.sprite(this.game.world.centerX,138,"boss"),this.enemy.animations.add("fly",[0,1,2],20,!0),this.enemy.play("fly"),this.enemy.anchor.setTo(.5,.5),this.physics.enable(this.enemy,Phaser.Physics.ARCADE),this.player=this.add.sprite(400,550,"player"),this.player.anchor.setTo(.5,.5),this.player.animations.add("fly",[0,1,2],20,!0),this.player.play("fly"),this.physics.enable(this.player,Phaser.Physics.ARCADE),this.enemy.angle=-20,this.game.add.tween(this.enemy).to({angle:20},1e3,Phaser.Easing.Linear.NONE,!0,0,1e3,!0),this.player.angle=-20,this.game.add.tween(this.player).to({angle:20},1e3,Phaser.Easing.Linear.NONE,!0,0,1e3,!0);var t={font:"65px Arial",fill:"#ffffff",align:"center"};this.titleText=this.game.add.text(this.game.world.centerX,300,"'Allo, 'Allo!",t),this.titleText.anchor.setTo(.5,.5),this.instructionsText=this.game.add.text(this.game.world.centerX,400,"Click anywhere to play",{font:"16px Arial",fill:"#ffffff",align:"center"}),this.instructionsText.anchor.setTo(.5,.5)},update:function(){this.sea.tilePosition.y+=.6,this.game.input.activePointer.justPressed()&&this.game.state.start("play")}},e.exports=s},{}],5:[function(t,e){"use strict";function s(){}s.prototype={create:function(){this.game.physics.startSystem(Phaser.Physics.ARCADE),this.sea=this.add.tileSprite(0,0,800,600,"sea"),this.explosionSFX=this.add.audio("explosion"),this.playerExplosionSFX=this.add.audio("playerExplosion"),this.enemyFireSFX=this.add.audio("enemyFire"),this.playerFireSFX=this.add.audio("playerFire"),this.powerUpSFX=this.add.audio("powerUp"),this.enemyPool=this.add.group(),this.enemyPool.enableBody=!0,this.enemyPool.physicsBodyType=Phaser.Physics.ARCADE,this.enemyPool.createMultiple(20,"greenEnemy"),this.enemyPool.setAll("anchor.x",.5),this.enemyPool.setAll("anchor.y",.5),this.enemyPool.setAll("outOfBoundsKill",!0),this.enemyPool.setAll("checkWorldBounds",!0),this.enemyPool.setAll("reward",100,!1,!1,0,!0),this.enemyPool.setAll("dropRate",.3,!1,!1,0,!0),this.enemyPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.nextEnemyAt=0,this.enemyDelay=1e3,this.enemyInitialHealth=2,this.shooterPool=this.add.group(),this.shooterPool.enableBody=!0,this.shooterPool.physicsBodyType=Phaser.Physics.ARCADE,this.shooterPool.createMultiple(10,"whiteEnemy"),this.shooterPool.setAll("anchor.x",.5),this.shooterPool.setAll("anchor.y",.5),this.shooterPool.setAll("outOfBoundsKill",!0),this.shooterPool.setAll("checkWorldBounds",!0),this.shooterPool.setAll("reward",400,!1,!1,0,!0),this.shooterPool.setAll("dropRate",.5,!1,!1,0,!0),this.shooterPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.nextShooterAt=this.time.now+5e3,this.shooterDelay=3e3,this.shooterShotDelay=5e3,this.shooterInitialHealth=5,this.bossPool=this.add.group(),this.bossPool.enableBody=!0,this.bossPool.physicsBodyType=Phaser.Physics.ARCADE,this.bossPool.createMultiple(1,"boss"),this.bossPool.setAll("anchor.x",.5),this.bossPool.setAll("anchor.y",.5),this.bossPool.setAll("outOfBoundsKill",!0),this.bossPool.setAll("checkWorldBounds",!0),this.bossPool.setAll("reward",1e4,!1,!1,0,!0),this.bossPool.setAll("dropRate",0,!1,!1,0,!0),this.bossPool.forEach(function(t){t.animations.add("fly",[0,1,2],20,!0),t.animations.add("hit",[3,1,3,2],20,!1),t.events.onAnimationComplete.add(function(t){t.play("fly")},this)}),this.boss=this.bossPool.getTop(),this.bossApproaching=!1,this.bossInitialHealth=300,this.player=this.add.sprite(400,550,"player"),this.player.anchor.setTo(.5,.5),this.player.animations.add("fly",[0,1,2],20,!0),this.player.animations.add("ghost",[3,0,3,1],20,!0),this.player.play("fly"),this.physics.enable(this.player,Phaser.Physics.ARCADE),this.player.speed=300,this.player.body.collideWorldBounds=!0,this.player.body.bounce.setTo(.1,.1),this.player.body.setSize(20,20,0,-5),this.weaponLevel=0,this.powerUpPool=this.add.group(),this.powerUpPool.enableBody=!0,this.powerUpPool.physicsBodyType=Phaser.Physics.ARCADE,this.powerUpPool.createMultiple(3,"powerup1"),this.powerUpPool.setAll("anchor.x",.5),this.powerUpPool.setAll("anchor.y",.5),this.powerUpPool.setAll("outOfBoundsKill",!0),this.powerUpPool.setAll("checkWorldBounds",!0),this.powerUpPool.setAll("reward",100,!1,!1,0,!0),this.bulletPool=this.add.group(),this.bulletPool.enableBody=!0,this.bulletPool.physicsBodyType=Phaser.Physics.ARCADE,this.bulletPool.createMultiple(100,"bullet"),this.bulletPool.setAll("anchor.x",.5),this.bulletPool.setAll("anchor.y",.5),this.bulletPool.setAll("outOfBoundsKill",!0),this.bulletPool.setAll("checkWorldBounds",!0),this.nextShotAt=0,this.shotDelay=300,this.enemyBulletPool=this.add.group(),this.enemyBulletPool.enableBody=!0,this.enemyBulletPool.physicsBodyType=Phaser.Physics.ARCADE,this.enemyBulletPool.createMultiple(100,"enemyBullet"),this.enemyBulletPool.setAll("anchor.x",.5),this.enemyBulletPool.setAll("anchor.y",.5),this.enemyBulletPool.setAll("outOfBoundsKill",!0),this.enemyBulletPool.setAll("checkWorldBounds",!0),this.enemyBulletPool.setAll("reward",0,!1,!1,0,!0),this.explosionPool=this.add.group(),this.explosionPool.enableBody=!0,this.explosionPool.physicsBodyType=Phaser.Physics.ARCADE,this.explosionPool.createMultiple(100,"explosion"),this.explosionPool.setAll("anchor.x",.5),this.explosionPool.setAll("anchor.y",.5),this.explosionPool.forEach(function(t){t.animations.add("boom")}),this.score=0,this.scoreText=this.add.text(this.game.world.width/2,30,""+this.score,{font:"20px monospace",fill:"#fff",align:"center"}),this.scoreText.anchor.setTo(.5,.5),this.lives=this.add.group();for(var t=0;3>t;t++){var e=this.lives.create(924+30*t,30,"player");e.scale.setTo(.5,.5),e.anchor.setTo(.5,.5)}},update:function(){if(this.sea.tilePosition.y+=.6,this.input.activePointer.isDown&&this.physics.arcade.distanceToPointer(this.player)>15&&(this.physics.arcade.moveToPointer(this.player,this.player.speed),this.returnText&&this.returnText.exists?this.quitGame():this.fire()),this.physics.arcade.overlap(this.player,this.enemyPool,this.playerHit,null,this),this.physics.arcade.overlap(this.bulletPool,this.enemyPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.bulletPool,this.shooterPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.player,this.shooterPool,this.playerHit,null,this),this.physics.arcade.overlap(this.player,this.enemyBulletPool,this.playerHit,null,this),this.physics.arcade.overlap(this.player,this.powerUpPool,this.playerPowerUp,null,this),this.nextEnemyAt<this.time.now&&this.enemyPool.countDead()>0){this.nextEnemyAt=this.time.now+this.enemyDelay;var t=this.enemyPool.getFirstExists(!1);t.reset(this.rnd.integerInRange(20,1004),0,this.enemyInitialHealth),t.body.velocity.y=this.rnd.integerInRange(30,60),t.play("fly")}if(this.nextShooterAt<this.time.now&&this.shooterPool.countDead()>0){this.nextShooterAt=this.time.now+this.shooterDelay;var e=this.shooterPool.getFirstExists(!1);e.reset(this.rnd.integerInRange(20,1004),0,this.shooterInitialHealth);var s=this.rnd.integerInRange(20,1004);e.rotation=this.physics.arcade.moveToXY(e,s,768,this.rnd.integerInRange(30,80))-Math.PI/2,e.play("fly"),e.nextShotAt=0}if(this.shooterPool.forEachAlive(function(t){if(this.time.now>t.nextShotAt&&this.enemyBulletPool.countDead()>0&&500>t.y){var e=this.enemyBulletPool.getFirstExists(!1);e.reset(t.x,t.y),this.physics.arcade.moveToObject(e,this.player,150),t.nextShotAt=this.time.now+this.shooterShotDelay,this.enemyFireSFX.play()}},this),this.bossApproaching===!1&&this.boss.alive&&this.boss.nextShotAt<this.time.now&&this.enemyBulletPool.countDead()>4){this.boss.nextShotAt=this.time.now+1500,this.enemyFireSFX.play();for(var o=0;3>o;o++){var i=this.enemyBulletPool.getFirstExists(!1);i.reset(this.boss.x-10-10*o,this.boss.y+20);var l=this.enemyBulletPool.getFirstExists(!1);l.reset(this.boss.x+10+10*o,this.boss.y+20),this.boss.health>100?(this.physics.arcade.moveToObject(i,this.player,150),this.physics.arcade.moveToObject(l,this.player,150)):(this.physics.arcade.moveToXY(i,this.player.x-100*o,this.player.y,150),this.physics.arcade.moveToXY(l,this.player.x+100*o,this.player.y,150))}}this.ghostUntil&&this.ghostUntil<this.time.now&&(this.ghostUntil=null,this.player.play("fly")),this.showReturn&&this.time.now>this.showReturn&&(this.returnText=this.add.text(this.game.world.width/2,300,"Click anywhere to go back to Main Menu",{font:"16px sans-serif",fill:"#fff"}),this.returnText.anchor.setTo(.5,.5),this.showReturn=!1),this.bossApproaching&&this.boss.y>80&&(this.bossApproaching=!1,this.boss.health=this.bossInitialHealth,this.boss.nextShotAt=0,this.boss.body.velocity.y=0,this.boss.body.velocity.x=200,this.boss.body.bounce.x=1,this.boss.body.collideWorldBounds=!0),this.bossApproaching===!1&&(this.physics.arcade.overlap(this.bulletPool,this.bossPool,this.enemyHit,null,this),this.physics.arcade.overlap(this.player,this.bossPool,this.playerHit,null,this))},fire:function(){if(this.player.alive&&!(this.nextShotAt>this.time.now)){this.nextShotAt=this.time.now+this.shotDelay,this.playerFireSFX.play();var t;if(0===this.weaponLevel){if(0===this.bulletPool.countDead())return;t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x,this.player.y-20),t.body.velocity.y=-500}else{if(this.bulletPool.countDead()<2*this.weaponLevel)return;for(var e=0;this.weaponLevel>e;e++)t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x-(10+6*e),this.player.y-20),this.physics.arcade.velocityFromAngle(-95-10*e,500,t.body.velocity),t=this.bulletPool.getFirstExists(!1),t.reset(this.player.x+(10+6*e),this.player.y-20),this.physics.arcade.velocityFromAngle(-85+10*e,500,t.body.velocity)}}},enemyHit:function(t,e){t.kill(),this.damageEnemy(e,1)},playerHit:function(t,e){if(!(this.ghostUntil&&this.ghostUntil>this.time.now)){this.playerExplosionSFX.play(),this.damageEnemy(e,5),this.weaponLevel=0;var s=this.lives.getFirstAlive();s?(s.kill(),this.ghostUntil=this.time.now+3e3,this.player.play("ghost")):(this.explode(t),t.kill(),this.displayEnd(!1))}},explode:function(t){if(0!==this.explosionPool.countDead()){var e=this.explosionPool.getFirstExists(!1);e.reset(t.x,t.y),e.play("boom",15,!1,!0),e.body.velocity.x=t.body.velocity.x,e.body.velocity.y=t.body.velocity.y}},damageEnemy:function(t,e){t.damage(e),t.alive?t.play("hit"):(this.explode(t),this.explosionSFX.play(),this.addToScore(t.reward),this.spawnPowerUp(t),"boss"===t.key&&(this.enemyPool.destroy(),this.shooterPool.destroy(),this.bossPool.destroy(),this.enemyBulletPool.destroy(),this.displayEnd(!0)))},addToScore:function(t){this.score+=t,this.scoreText.text=this.score,this.score>=5e3&&1==this.bossPool.countDead()&&this.spawnBoss()},displayEnd:function(t){if(!this.endText||!this.endText.exists){var e=t?"You Win!!!":"Game Over!";this.endText=this.add.text(this.game.world.width/2,220,e,{font:"72px serif",fill:"#fff"}),this.endText.anchor.setTo(.5,0),this.showReturn=this.time.now+2e3}},spawnPowerUp:function(t){if(0!==this.powerUpPool.countDead()&&3!==this.weaponLevel&&this.rnd.frac()<t.dropRate){var e=this.powerUpPool.getFirstExists(!1);e.reset(t.x,t.y),e.body.velocity.y=100}},spawnBoss:function(){this.bossApproaching=!0,this.boss.reset(512,0,this.bossInitialHealth),this.game.physics.enable(this.boss,Phaser.Physics.ARCADE),this.boss.body.velocity.y=15,this.boss.play("fly")},playerPowerUp:function(t,e){this.addToScore(e.reward),e.kill(),this.powerUpSFX.play(),3>this.weaponLevel&&this.weaponLevel++},quitGame:function(){this.sea.destroy(),this.player.destroy(),this.enemyPool.destroy(),this.bulletPool.destroy(),this.explosionPool.destroy(),this.shooterPool.destroy(),this.enemyBulletPool.destroy(),this.powerUpPool.destroy(),this.bossPool.destroy(),this.scoreText.destroy(),this.endText.destroy(),this.returnText.destroy(),this.state.start("menu")}},e.exports=s},{}],6:[function(t,e){"use strict";function s(){this.asset=null,this.ready=!1}s.prototype={preload:function(){this.asset=this.add.sprite(this.game.world.width/2,this.game.world.height/2,"preloader"),this.asset.anchor.setTo(.5,.5),this.load.onLoadComplete.addOnce(this.onLoadComplete,this),this.load.setPreloadSprite(this.asset),this.load.image("sea","assets/sea.png"),this.load.image("bullet","assets/bullet.png"),this.load.image("enemyBullet","assets/enemy-bullet.png"),this.load.spritesheet("greenEnemy","assets/enemy.png",32,32),this.load.spritesheet("whiteEnemy","assets/shooting-enemy.png",32,32),this.load.spritesheet("boss","assets/boss.png",93,75),this.load.spritesheet("player","assets/player.png",64,64),this.load.image("powerup1","assets/powerup1.png"),this.load.spritesheet("explosion","assets/explosion.png",32,32),this.load.audio("explosion",["assets/explosion.wav"]),this.load.audio("playerExplosion",["assets/player-explosion.wav"]),this.load.audio("enemyFire",["assets/enemy-fire.wav"]),this.load.audio("playerFire",["assets/player-fire.wav"]),this.load.audio("powerUp",["assets/powerup.wav"])},create:function(){this.asset.cropEnabled=!1},update:function(){this.ready&&this.game.state.start("menu")},onLoadComplete:function(){this.ready=!0}},e.exports=s},{}]},{},[1]);