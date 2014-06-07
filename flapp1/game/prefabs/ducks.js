'use strict';

var Ducks = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ducks', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.alive = false;


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


Ducks.prototype.move = function() {

  if (!this.alive) {

    this.game.physics.arcade.moveToPointer(this, 300, this.game.input.activePointer, 0);

  }


};

module.exports = Ducks;
