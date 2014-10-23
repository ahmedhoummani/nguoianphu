'use strict';

var Ducks = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ducks', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(0.2, 0.2);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.health = 3;
  this.alive = true;


};

Ducks.prototype = Object.create(Phaser.Sprite.prototype);
Ducks.prototype.constructor = Ducks;

Ducks.prototype.update = function() {

  // write your prefab's specific update code here

  // ducks faces to pointer

  if (this.x < this.game.input.worldX) {

    this.animations.play('right');

  } else if (this.x > this.game.input.worldX) {

    this.animations.play('left');

  }

  // ducks face up
  if (this.angle != 0) {
    this.angle = 0;
  }


};


Ducks.prototype.move = function() {

  if (this.alive) {

    // ducks move to the pointer
    this.game.physics.arcade.moveToPointer(this, 100, this.game.input.activePointer, 0);

    // ducks face down

    this.animation = this.game.add.tween(this);

    if (this.x < this.game.input.worldX) {

      this.animation.to({
        angle: 20
      }, 150);

    }
    if (this.x > this.game.input.worldX) {

      this.animation.to({
        angle: -20
      }, 150);

    }

    this.animation.start();

  }


};


Ducks.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Ducks;
