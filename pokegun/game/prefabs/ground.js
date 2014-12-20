'use strict';

var Ground = function(game, x, y, width, height, ground) {
	Phaser.TileSprite.call(this, game, x, y, width, height, ground);
	
	this.game.add.existing(this);

};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

};

module.exports = Ground;
