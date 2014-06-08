'use strict';

var Pole = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pole', frame);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('tide');
  this.animations.play('tide', 2, true);


};

Pole.prototype = Object.create(Phaser.Sprite.prototype);
Pole.prototype.constructor = Pole;

Pole.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Pole;
