'use strict';

var Ballopenning = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'ballopenning');

	this.game.physics.arcade.enableBody(this);

	// this.scale.setTo(.8, .8);
	this.anchor.setTo(.5, .5);
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;

	this.animations.add('open', ['01.png', '02.png', '03.png', '04.png'], 4,
			true);
	this.animations.add('close', ['01.png', '02.png'], 2, true);
	this.animations.play('open');

	this.game.add.existing(this);

};

Ballopenning.prototype = Object.create(Phaser.Sprite.prototype);
Ballopenning.prototype.constructor = Ballopenning;

Ballopenning.prototype.update = function() {

};

module.exports = Ballopenning;
