'use strict';

var Ships = function(game, x, y, player, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, 'ship1', player, enemyBullets);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.player = player;
  this.enemyBullets = enemyBullets;

  this.game = game;
  this.health = 2;
  this.fireRate = 2000;
  this.nextFire = 100;
  this.alive = true;

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 300, this.body.velocity);
  this.game.add.existing(this);


};

Ships.prototype = Object.create(Phaser.Sprite.prototype);
Ships.prototype.constructor = Ships;

Ships.prototype.update = function() {

  // write your prefab's specific update code here

  // ships cannot over sea_on

  if (this.y < 70) {

    this.body.velocity.y += Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  // ships left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }


  // fire the bullets

  if (this.game.physics.arcade.distanceBetween(this, this.player) < 300) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 190);
//      this.shot.play();

		// wanted the duck
		// this.game.physics.arcade.moveToObject(this, this.player, 10);
    }
  }


};

Ships.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Ships;
