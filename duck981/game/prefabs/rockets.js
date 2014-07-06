'use strict';

var Rockets = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'rockets', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('fire');
  this.animations.play('fire', 3, true);

  this.body.outOfBoundsKill = true;
  this.body.checkWorldBounds = true;

  this.game.add.existing(this);

};

Rockets.prototype = Object.create(Phaser.Sprite.prototype);
Rockets.prototype.constructor = Rockets;

Rockets.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Rockets;
