'use strict';

var Sky = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sky');

  // initialize your prefab here
  
};

Sky.prototype = Object.create(Phaser.TileSprite.prototype);
Sky.prototype.constructor = Sky;

Sky.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Sky;
