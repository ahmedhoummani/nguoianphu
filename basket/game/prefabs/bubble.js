'use strict';

var Bubble = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'bubble');

	// initialize your prefab here
	this.game.physics.arcade.enableBody(this);
	this.anchor.set(0.5, 0.5);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);

	this.game.physics.arcade.velocityFromRotation(this.game.rnd.integerInRange(
					30, 60), 200, this.body.velocity);
	this.animations.add('bub1', [0, 1, 2], 5, true);
	this.animations.add('bub2', [3, 4, 5], 5, true);
	this.animations.add('bub3', [6, 7, 8], 10, true);
	this.animations.add('bub4', [9, 10, 11], 10, true);
	this.animations.add('bub5', [12, 13, 14], 10, true);

};

Bubble.prototype = Object.create(Phaser.Sprite.prototype);
Bubble.prototype.constructor = Bubble;

Bubble.prototype.update = function() {

	// write your prefab's specific update code here
	this.animations.play('bub2');

};

module.exports = Bubble;
