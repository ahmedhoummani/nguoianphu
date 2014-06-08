'use strict';

var Duck = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'duck', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);

};

Duck.prototype = Object.create(Phaser.Sprite.prototype);
Duck.prototype.constructor = Duck;

Duck.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Duck;
