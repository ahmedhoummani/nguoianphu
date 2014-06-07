'use strict';

var Ducks = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ducks', frame);

  // initialize your prefab here

//  this.ducks = game.add.sprite(x, y, 'ducks');

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

};

Ducks.prototype = Object.create(Phaser.Sprite.prototype);
Ducks.prototype.constructor = Ducks;

Ducks.prototype.update = function() {

  // write your prefab's specific update code here

  if (this.x < this.game.input.worldX) {

    this.animations.play('right');

  } else
  if (this.x > this.game.input.worldX) {

    this.animations.play('left');

  }


};

module.exports = Ducks;
