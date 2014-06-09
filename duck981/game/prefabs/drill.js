'use strict';

var Drill = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'drill', frame);

  // initialize your prefab here


  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('rigs');
  this.animations.play('rigs', 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;

  this.body.allowRotation = false;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 50) + 50, 100, this.body.velocity);
  this.game.add.existing(this);

  this.alive = false;


};

Drill.prototype = Object.create(Phaser.Sprite.prototype);
Drill.prototype.constructor = Drill;

Drill.prototype.update = function() {

  // write your prefab's specific update code here

  // Drill don't want to be kill

  if (this.y > (this.game.world.height - 300)) {

    this.body.velocity.y = - Math.floor(Math.random() * 10) - 30;

    if (this.body.velocity.x > 0) {
      this.body.velocity.x = this.body.velocity.x + Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x = this.body.velocity.x - Math.floor(Math.random() * 50);
    }

  }

  this.animations.play('left');


};

module.exports = Drill;
