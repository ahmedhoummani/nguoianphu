'use strict';

function Play() {}
Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');

    this.enemy = this.game.add.sprite(this.game.world.centerX, 138, 'greenEnemy');
    this.enemy.animations.add('fly', [0, 1, 2], 20, true);
    this.enemy.play('fly');
    this.enemy.anchor.setTo(0.5, 0.5);
    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);


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

    this.bullets = [];
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
    for (var i = 0; i < this.bullets.length; i++) {
      this.physics.arcade.overlap(
        this.bullets[i], this.enemy, this.enemyHit, null, this
      );
    }


  },

  fire: function() {

    if (this.nextShotAt > this.time.now) {
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;

    var bullet = this.add.sprite(this.player.x, this.player.y - 20, 'bullet');
    bullet.anchor.setTo(0.5, 0.5);
    this.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.body.velocity.y = -500;
    this.bullets.push(bullet);
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
