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
		this.asset = this.add.sprite(0, 0, 'preloader');
		// Center the preload bar
		this.asset.x = this.game.world.centerX - this.asset.width / 2;
		this.asset.y = this.game.world.centerY - this.asset.height / 2;
		this.load.setPreloadSprite(this.asset);
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
		// Panda
		this.load.atlasJSONHash("panda", "assets/graphics/panda.png",
				"assets/graphics/panda.json");
		// tuttorial
		this.load.atlasJSONHash("tutorial", "assets/graphics/tutorial.png",
				"assets/graphics/tutorial.json");
		this.load.atlasJSONHash("tutorial_hand",
				"assets/graphics/tutorial_hand.png",
				"assets/graphics/tutorial_hand.json");
		// leafs
		this.load.atlasJSONHash("leafs", "assets/graphics/leafs.png",
				"assets/graphics/leafs.json");
		// splashes
		this.load.atlasJSONHash("splashes", "assets/graphics/splashes.png",
				"assets/graphics/splashes.json");

	},
	loadUpdate : function() {
		this.loadingText.setText(this.load.progress.toString() + "%");
	}

};

module.exports = Preload;
