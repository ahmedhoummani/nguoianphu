'use strict';

var Helicopter = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'helicopter');

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

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
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 150, this.body.velocity);
  this.game.add.existing(this);


};

Helicopter.prototype = Object.create(Phaser.Sprite.prototype);
Helicopter.prototype.constructor = Helicopter;

Helicopter.prototype.update = function() {

  // write your prefab's specific update code here

  // Helicopter cannot over sea_on

  // if (this.y < 100) {

    // this.body.velocity.y += Math.floor(Math.random() * 10);

    // if (this.body.velocity.x > 0) {
      // this.body.velocity.x += Math.floor(Math.random() * 50);
    // } else {
      // this.body.velocity.x -= Math.floor(Math.random() * 50);
    // }

  // }

  // Helicopter don't want to be kill

  // if (this.y > (this.game.world.height - 120)) {

    // this.body.velocity.y -= 20;

    // if (this.body.velocity.x > 0) {
      // this.body.velocity.x -= Math.floor(Math.random() * 50);
    // } else {
      // this.body.velocity.x -= Math.floor(Math.random() * 50);
    // }

  // }

  // Helicopter left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }
  
  // else 
  
  // if (this.body.velocity.y > 0) {

    // this.animations.play('face');
  // }
  // else if (this.body.velocity.y < 0) {

    // this.animations.play('back');
  // }
  


};

module.exports = Helicopter;
