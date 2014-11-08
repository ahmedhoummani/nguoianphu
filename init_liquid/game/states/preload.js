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
		var b = {
			font : "45px GrilledCheeseBTNToasted",
			fill : "#FFFFFF",
			align : "center"
		};
		this.loadingText = this.game.add.text(0, 0, "0%", b), this.loadingText.anchor
				.set(.5, .5), this.loadingText.position.set(
				this.game.world.width / 2, this.game.world.height / 2 + 180), this.loadingText
				.setShadow(2, 2, "#666666", 2), this.loadingText.update();
	},
	loadAssets : function() {

		// FONTS
		this.load.bitmapFont("timer", "assets/fonts/timer.png",
				"assets/fonts/timer.fnt", null, 1);
		this.load.bitmapFont("level_label", "assets/fonts/level_label.png",
				"assets/fonts/level_label.fnt", null, 1);
		this.load.bitmapFont("fruit_labels", "assets/fonts/fruit_labels.png",
				"assets/fonts/fruit_labels.fnt", null, 3);

		// MENU
		this.load.atlasJSONHash("main_menu", "assets/graphics/main_menu.png",
				"assets/graphics/main_menu.json");
		// Levels
		this.load.atlasJSONHash("graphics_1",
				"assets/graphics/level_graphics.png",
				"assets/graphics/level_graphics.json");
		// Buttons
		this.load.atlasJSONHash("buttons", "assets/graphics/buttons.png",
				"assets/graphics/buttons.json");
		this.load.atlasJSONHash("buttonsgroup",
				"assets/graphics/buttonsgroup.png",
				"assets/graphics/buttonsgroup.json");
		// Panda
		this.load.atlasJSONHash("panda", "assets/graphics/panda.png",
				"assets/graphics/panda.json");
		// tuttorial
		this.load.atlasJSONHash("tutorial", "assets/graphics/tutorial.png",
				"assets/graphics/tutorial.json");
		this.load.atlasJSONHash("tutorial_hand",
				"assets/graphics/tutorial_hand.png",
				"assets/graphics/tutorial_hand.json");

		// LET ME GROW
		// the GUI
		this.load.atlasJSONHash("gui", "assets/graphics/gui.png",
				"assets/graphics/gui.json");
		this.load.atlasJSONHash("gui_aqua", "assets/graphics/gui_aqua.png",
				"assets/graphics/gui_aqua.json");

	},
	loadUpdate : function() {
		this.loadingText.setText(this.load.progress.toString() + "%");
	}

};

module.exports = Preload;
