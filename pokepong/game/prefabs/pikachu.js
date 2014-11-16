'use strict';

var Pikachu = function(game, x, y, level) {
	Phaser.Sprite.call(this, game, x, y, 'pikachu', level);

	// initialize your prefab here

	this.level = level;

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(72, 57, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(0, 0);
	this.body.allowRotation = false;
	this.body.immovable = true;
	this.anchor.setTo(.5, .5);

	this.animations.add('stand', ['1.png', '2.png', '3.png', '4.png'], 7, true);
	this.animations.add('right', ['run1.png', 'run2.png', 'run3.png',
					'run4.png'], 10, true);
	this.animations.add('left',
			['run5.png', 'run6.png', 'run7.png', 'run8.png'], 10, true);

	this.animations.play('stand');

	this.notPause = !0;

	this.game.add.existing(this);

};

Pikachu.prototype = Object.create(Phaser.Sprite.prototype);
Pikachu.prototype.constructor = Pikachu;

Pikachu.prototype.update = function() {

	if (this.game.input.activePointer.isDown
			&& this.game.physics.arcade.distanceToPointer(this) > 15
			&& this.notPause) {

		if (this.x < this.game.input.x) {
			this.animations.play('right');
			this.body.velocity.x = 100 * this.level;;
		} else if (this.x > this.game.input.x) {
			this.animations.play('left');
			this.body.velocity.x = -100 * this.level;
		}
	} else {
		this.animations.play('stand');
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}

};

module.exports = Pikachu;
