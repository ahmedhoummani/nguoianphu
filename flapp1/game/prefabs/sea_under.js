'use strict';

var Sea_under = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'sea_under', frame);

  // initialize your prefab here

  // enable physics on the ground sprite
  // this is needed for collision detection
  this.game.physics.arcade.enableBody(this);

  // we don't want the ground's body
  // to be affected by gravity or external forces
  this.body.allowGravity = false;
  this.body.immovable = true;

};

Sea_under.prototype = Object.create(Phaser.Sprite.prototype);
Sea_under.prototype.constructor = Sea_under;

Sea_under.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Sea_under;
