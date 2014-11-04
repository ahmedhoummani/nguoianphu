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

		this.load.spritesheet('ball', 'assets/ball_32.png', 32, 32);
		this.load.spritesheet('bubble', 'assets/bubble_color_13.png', 13, 13);
	}

};

module.exports = Preload;
