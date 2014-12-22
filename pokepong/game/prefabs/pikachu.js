'use strict';

var Pikachu = function(game, x, y, level) {
	Phaser.Sprite.call(this, game, x, y, 'pikachu100', level);

	this.level = level;

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(100, 100, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;
	this.anchor.setTo(.5, .5);

	this.angle = -8;
	this.game.add.tween(this).to({
				angle : 8
			}, 500, Phaser.Easing.Linear.NONE, true, 0, Number.MAX_VALUE, true);

	this.notPause = !0;

	this.game.add.existing(this);

};

Pikachu.prototype = Object.create(Phaser.Sprite.prototype);
Pikachu.prototype.constructor = Pikachu;

Pikachu.prototype.update = function() {

	if (this.game.input.activePointer.isDown && this.notPause) {
		this.x = this.game.input.x;
		 this.scale.setTo(1.2, 1.2);

	} else {
		 this.scale.setTo(1, 1);

	}

};

module.exports = Pikachu;
