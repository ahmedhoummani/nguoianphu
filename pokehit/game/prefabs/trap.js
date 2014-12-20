'use strict';

var Trap = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'saw_spin');

	this.game.physics.arcade.enableBody(this);

	// this.scale.setTo(.8, .8);
	this.anchor.setTo(.5, .5);
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;

	// this.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
	this.animations.add('spin');
	this.animations.play('spin', 10, true);

	this.game.add.existing(this);

};

Trap.prototype = Object.create(Phaser.Sprite.prototype);
Trap.prototype.constructor = Trap;

Trap.prototype.update = function() {

};

module.exports = Trap;
