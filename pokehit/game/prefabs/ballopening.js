'use strict';

var Ballopening = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'ballopening');

	this.anchor.setTo(.5, .5);

	this.animations.add('open', ['01.png', '02.png', '03.png', '04.png'], 4,
			true);
	this.animations.add('close', ['01.png', '02.png'], 2, true);
	this.animations.play('open');

	this.game.add.existing(this);

};

Ballopening.prototype = Object.create(Phaser.Sprite.prototype);
Ballopening.prototype.constructor = Ballopening;

Ballopening.prototype.update = function() {

};

module.exports = Ballopening;
