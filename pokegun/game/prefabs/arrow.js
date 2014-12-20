'use strict';

var Arrow = function(game, x, y, level) {
	Phaser.Sprite.call(this, game, x, y, 'arrow', level);

	// this.level = level;

	this.game.physics.arcade.enableBody(this);

	this.body.immovable = true;
	this.anchor.setTo(.5, .5);

	this.angle = -60;
	this.game.add.tween(this).to({
				angle : 60
			}, 1000, Phaser.Easing.Linear.NONE, true, 0, Number.MAX_VALUE, true);

	this.game.add.existing(this);

};

Arrow.prototype = Object.create(Phaser.Sprite.prototype);
Arrow.prototype.constructor = Arrow;

Arrow.prototype.update = function() {

	if (this.game.input.activePointer.isDown && this.notPause) {
		 this.visible = !1;
	}

};

module.exports = Arrow;
