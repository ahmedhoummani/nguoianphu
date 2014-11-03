'use strict';

function Boot() {
}

Boot.prototype = {
	preload : function() {
	},

	create : function() {

		this.game.input.maxPointers = 1;
		this.stage.disableVisibilityChange = !0;

		// scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// have the game centered horizontally
		this.scale.pageAlignHorizontally = !0;
		this.scale.pageAlignVertically = !0;

		// screen size will be set automatically
		this.scale.setScreenSize(!0);

		this.game.state.start('preload');

	}

};

module.exports = Boot;
