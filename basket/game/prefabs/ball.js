'use strict';

var Ball = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'ball');

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);
  this.anchor.set(0.5, 0.5);
  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.game.physics.arcade.velocityFromRotation(this.game.rnd.integerInRange(30, 60), 200, this.body.velocity);


};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Ball;
