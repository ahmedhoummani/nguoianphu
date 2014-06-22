'use strict';

var Drill = function(game, x, y, pole1, pole2) {
  Phaser.Sprite.call(this, game, x, y, 'drill', pole1, pole2);

  // initialize your prefab here
	this.pole1 = pole1;
	this.pole2 = pole2;

  this.game.physics.arcade.enableBody(this);

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

  this.alive = false;


};

Drill.prototype = Object.create(Phaser.Sprite.prototype);
Drill.prototype.constructor = Drill;

Drill.prototype.update = function() {

  // write your prefab's specific update code here

  // ships don't want to be kill

  if (this.game.physics.arcade.distanceBetween(this, this.pole1) < 150) {
  
	this.game.physics.arcade.moveToObject(this, this.pole1, -100);
  }
  
  // ships don't want to be kill

  if (this.game.physics.arcade.distanceBetween(this, this.pole2) < 150) {
  
	this.game.physics.arcade.moveToObject(this, this.pole2, -100);
  }

  this.animations.play('left');


};

module.exports = Drill;
