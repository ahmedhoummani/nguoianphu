'use strict';

var Sea_wave = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_wave');

  // initialize your prefab here
  this.autoScroll(30, 0);
  this.fixedToCamera = true;

};

Sea_wave.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_wave.prototype.constructor = Sea_wave;

Sea_wave.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_wave;
