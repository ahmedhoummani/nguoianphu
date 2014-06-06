'use strict';

var Sea_on = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_on');

  // initialize your prefab here
  this.autoScroll(-30, 0);

};

Sea_on.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_on.prototype.constructor = Sea_on;

Sea_on.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Sea_on;
