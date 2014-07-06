'use strict';

var Helicopter = function(game, x, y, player, enemyBullets, pole) {
  Phaser.Sprite.call(this, game, x, y, 'helicopter', player, enemyBullets, pole);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.player = player;
  this.enemyBullets = enemyBullets;
  this.pole = pole;
  this.game = game;
  this.health = 1;
  this.fireRate = 800;
  this.nextFire = 0;
  this.alive = true;
  
  this.anchor.set(0.5, 0.5);
  // this.scale.setTo(2, 2);

  // this.animations.add('face', [0, 1, 2], 3, true);
  this.animations.add('right', [0, 1, 2, 3], 4, true);
  this.animations.add('left', [7, 6, 5, 4], 4, true);
  // this.animations.add('back', [9, 10, 11], 3, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  // this.body.allowRotation = false;
  // this.bringToTop();
  // this.body.drag.set(0.2);

  this.body.immovable = false;

  // this.body.maxVelocity.y = 50;
  // this.body.maxVelocity.x = 50;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 200, this.body.velocity);
  this.game.add.existing(this);


};

Helicopter.prototype = Object.create(Phaser.Sprite.prototype);
Helicopter.prototype.constructor = Helicopter;

Helicopter.prototype.update = function() {

  // write your prefab's specific update code here


  // Helicopter don't want to be kill

  // if (this.game.physics.arcade.distanceBetween(this, this.pole) < 100 ) {

    // this.game.physics.arcade.moveToObject(this, this.pole, -100);

  // }

  // Helicopter left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }
  
  // fire the bullets

  if (250 < this.game.physics.arcade.distanceBetween(this, this.player) && this.game.physics.arcade.distanceBetween(this, this.player) < 400) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 100);
//      this.shot.play();
    }
  }

};

Helicopter.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Helicopter;
