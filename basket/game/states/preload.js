'use strict';

function Preload() {
}

Preload.prototype = {
	preload : function() {

		// Add the sprite
		this.addSprite();

	},

	create : function() {
	},

	update : function() {

		this.game.state.start('play');

	},

	addSprite : function() {

		this.load.spritesheet('ball', 'assets/ball_64x64.png', 64, 64);
		this.load.spritesheet('bubble', 'assets/bubble_26x26.png', 26, 26);
	}

};

module.exports = Preload;
