'use strict';

var Sea_top = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_top');

  // initialize your prefab here
  this.autoScroll(-35, 0);
  this.fixedToCamera = true;

};

Sea_top.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_top.prototype.constructor = Sea_top;

Sea_top.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_top;
