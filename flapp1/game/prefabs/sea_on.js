'use strict';

var Sea_on = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_on');

  // initialize your prefab here
  this.autoScroll(-30, 0);
  this.fixedToCamera = true;

};

Sea_on.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_on.prototype.constructor = Sea_on;

Sea_on.prototype.update = function() {

  // write your prefab's specific update code here
    this.tilePosition.x = -this.game.camera.x;
    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_on;
