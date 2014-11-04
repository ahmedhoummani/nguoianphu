'use strict';

var Sky = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'sky');

	// initialize your prefab here

	this.game.physics.arcade.enableBody(this);
	this.anchor.set(0.5, 0.5);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(0, 0);
	this.scale.setTo(2, 1);
	this.body.immovable = true

};

Sky.prototype = Object.create(Phaser.Sprite.prototype);
Sky.prototype.constructor = Sky;

Sky.prototype.update = function() {

	// write your prefab's specific update code here

};

module.exports = Sky;
