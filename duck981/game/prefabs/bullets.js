'use strict';

var Bullets = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullets');

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.body.outOfBoundsKill = true;
  this.body.checkWorldBounds = true;

  this.game.add.existing(this);

};

Bullets.prototype = Object.create(Phaser.Sprite.prototype);
Bullets.prototype.constructor = Bullets;

Bullets.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Bullets;
