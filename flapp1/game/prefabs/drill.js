'use strict';

var Drill = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'drill', frame);

  // initialize your prefab here
  
};

Drill.prototype = Object.create(Phaser.Sprite.prototype);
Drill.prototype.constructor = Drill;

Drill.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Drill;
