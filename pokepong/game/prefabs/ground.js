'use strict';

var Ground = function(game, x, y, width, height) {
	Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

	// initialize your prefab here
	// this.autoScroll(-20, 20);
	// this.fixedToCamera = true;
	this.game.add.existing(this);

};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

	// write your prefab's specific update code here
	// this.tilePosition.x = -this.game.camera.x;
	// this.tilePosition.y = -this.game.camera.y;

};

module.exports = Ground;
