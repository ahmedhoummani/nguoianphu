'use strict';

var Sea_face = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_face');

  // initialize your prefab here
  this.autoScroll(-10, 20);

};

Sea_face.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_face.prototype.constructor = Sea_face;

Sea_face.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Sea_face;
