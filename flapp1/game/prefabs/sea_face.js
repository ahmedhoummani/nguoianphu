'use strict';

var Sea_face = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_face');

  // initialize your prefab here
  this.autoScroll(-10, 20);
  this.fixedToCamera = true;

};

Sea_face.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_face.prototype.constructor = Sea_face;

Sea_face.prototype.update = function() {

  // write your prefab's specific update code here
    this.tilePosition.x = -this.game.camera.x;
    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_face;
