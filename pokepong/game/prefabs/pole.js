'use strict';

var Pole = function(game, x, y, width, height) {
	Phaser.TileSprite.call(this, game, x, y, width, height, 'pole');

	// initialize your prefab here
	this.autoScroll(20, 0);
	// this.fixedToCamera = true;

	this.game.physics.arcade.enableBody(this);

	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;

	this.game.add.existing(this);

};

Pole.prototype = Object.create(Phaser.TileSprite.prototype);
Pole.prototype.constructor = Pole;

Pole.prototype.update = function() {

	// write your prefab's specific update code here
	// this.tilePosition.x = -this.game.camera.x;
	// this.tilePosition.y = -this.game.camera.y;

};

module.exports = Pole;
