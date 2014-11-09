'use strict';
function Preload() {
}

Preload.prototype = {
	preload : function() {
		// load everything here
		this.initPreloadBar();
		this.addLoadingText();
		this.loadAssets();

	},
	create : function() {
		this.game.state.start("menu", !0, !1, !0);
	},
	update : function() {

	},
	initPreloadBar : function() {

		// loadding bars
		this.LoadingBar_Outer = this.add.image(0, 0, 'LoadingBar_Outer');
		this.LoadingBar_Inner = this.add.sprite(0, 0, 'LoadingBar_Inner');

		// Center the preload bar
		this.LoadingBar_Outer.anchor.set(.5, .5);
		this.LoadingBar_Outer.x = this.game.width / 2 - .5;
		this.LoadingBar_Outer.y = this.game.height / 2;

		this.LoadingBar_Inner.x = this.game.width / 2 - .5
				- this.LoadingBar_Inner.width / 2;
		this.LoadingBar_Inner.y = this.game.height / 2
				- this.LoadingBar_Inner.height / 2 - 1.5;

		this.load.setPreloadSprite(this.LoadingBar_Inner);
	},
	addLoadingText : function() {
		var style = {
			font : "45px cantoraone",
			fill : "#FFFFFF",
			align : "center"
		};
		this.loadingText = this.game.add.text(0, 0, "0%", style);
		this.loadingText.anchor.set(.5, .5);
		this.loadingText.position.set(this.game.world.width / 2,
				this.game.world.height / 2 + 180);
		this.loadingText.setShadow(2, 2, "#666666", 2);
		this.loadingText.update();
	},
	loadAssets : function() {

		// FONTS
		this.load.bitmapFont("cantoraone", "assets/fonts/cantoraone.png",
				"assets/fonts/cantoraone.fnt", null, 1);

		// MENU
		this.load.atlasJSONHash("main_menu", "assets/graphics/main_menu.png",
				"assets/graphics/main_menu.json");
		// Levels

		// Buttons
		this.load.atlas("buttonsgroup", "assets/graphics/buttonsgroup.png",
				"assets/graphics/buttonsgroup.json");

		// Panda
		this.load.atlasJSONHash("panda", "assets/graphics/panda.png",
				"assets/graphics/panda.json");
		// tuttorial

		// LET ME GROW
		// the GUI
		this.load.atlasJSONHash("gui", "assets/graphics/gui.png",
				"assets/graphics/gui.json");
				
		// credit bg
		this.load.image('creditbg', 'assets/graphics/creditbg.png');

	},
	loadUpdate : function() {
		this.loadingText.setText(this.load.progress.toString() + "%");
	}

};

module.exports = Preload;
