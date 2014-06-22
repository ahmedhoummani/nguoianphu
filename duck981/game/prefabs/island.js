'use strict';

var Island = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'island');

 // initialize your prefab here
  this.game.physics.arcade.enableBody(this);
   this.anchor.set(0.5, 0.5);
  this.game.add.existing(this);
  
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;

  this.body.immovable = true;

};

Island.prototype = Object.create(Phaser.Sprite.prototype);
Island.prototype.constructor = Island;

Island.prototype.update = function() {

  // write your prefab's specific update code here
};

module.exports = Island;
