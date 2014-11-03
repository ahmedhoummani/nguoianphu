'use strict';

var Bubble = function(game, x, y, color) {
	Phaser.Sprite.call(this, game, x, y, 'bubble', color);

	// initialize your prefab here
	this.color = color;
	this.game.physics.arcade.enableBody(this);
	this.anchor.set(0.5, 0.5);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
		this.body.gravity.y = -1000;

	this.game.physics.arcade.velocityFromRotation(this.game.rnd.integerInRange(
					30, 60), 200, this.body.velocity);
					
	this.animations.add('1', [0, 1, 2], 5, true);
	this.animations.add('2', [3, 4, 5], 5, true);
	this.animations.add('3', [6, 7, 8], 5, true);
	this.animations.add('4', [9, 10, 11], 5, true);
	this.animations.add('5', [12, 13, 14], 5, true);

};

Bubble.prototype = Object.create(Phaser.Sprite.prototype);
Bubble.prototype.constructor = Bubble;

Bubble.prototype.update = function() {

	// write your prefab's specific update code here
	this.animations.play(this.color);

};

module.exports = Bubble;
