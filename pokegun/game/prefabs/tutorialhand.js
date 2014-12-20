'use strict';

var Tutorialhand = function(game, x, y, pikachu) {
	Phaser.Sprite.call(this, game, x, y, 'hands', pikachu);

	this.pikachu = pikachu;
	this.anchor.setTo(.5, .5);

	this.animations.add('hand');
	this.animations.play('hand', 20, true);

	this.game.add.existing(this);
	
	// this.x = this.pikachu.x + 5;
	// this.y = this.pikachu.y + 50
};

Tutorialhand.prototype = Object.create(Phaser.Sprite.prototype);
Tutorialhand.prototype.constructor = Tutorialhand;

module.exports = Tutorialhand;
