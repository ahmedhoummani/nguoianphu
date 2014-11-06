'use strict';

var Simplebutton = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'simplebutton', frame);

  // initialize your prefab here
  
};

Simplebutton.prototype = Object.create(Phaser.Sprite.prototype);
Simplebutton.prototype.constructor = Simplebutton;

Simplebutton.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Simplebutton;
