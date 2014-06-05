'use strict';

var Sea_under = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_under');

  // initialize your prefab here
  this.autoScroll(30, 0);

};

Sea_under.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_under.prototype.constructor = Sea_under;

Sea_under.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Sea_under;
