'use strict';

var Drill = function(game, x, y, player, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, 'drill', player, enemyBullets);

  // initialize your prefab here
  
	this.game.physics.arcade.enableBody(this);
  
	this.player = player;
	this.enemyBullets = enemyBullets;
	this.game = game;
	this.health = 10;
    this.fireRate = 700;
    this.nextFire = 100;
    this.alive = true;


  this.anchor.set(0.5, 0.5);

  this.animations.add('rigs');
  this.animations.play('rigs', 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 50) + 50, 100, this.body.velocity);
  this.game.add.existing(this);


};

Drill.prototype = Object.create(Phaser.Sprite.prototype);
Drill.prototype.constructor = Drill;

Drill.prototype.update = function() {

  // write your prefab's specific update code here

  this.animations.play('rigs');
  
   // fire the bullets

  if (this.game.physics.arcade.distanceBetween(this, this.player) < 300) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 130);
	  
	  // wanted the duck
		this.game.physics.arcade.moveToObject(this, this.player, 30);

    }
	
	}
	

};

Drill.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Drill;
