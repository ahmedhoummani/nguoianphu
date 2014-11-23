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
			font : "45px font",
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
		this.load.bitmapFont("font", "assets/fonts/font.png",
				"assets/fonts/font.fnt", null, 1);

		// Buttons
		this.load.atlas("buttonsgroup", "assets/graphics/buttonsgroup.png",
				"assets/graphics/buttonsgroup.json");

		// ground
		this.load.image("ground", "assets/graphics/stone.png");

		// pole
		this.load.image("pole", "assets/graphics/pole.png");

		// tree
		this.load.image("tree", "assets/graphics/treereal.png");

		// background
		// level complete
		this.load.atlas("bggroup", "assets/graphics/bggroup.png",
				"assets/graphics/bggroup.json");

		// Pikachu
		// this.load.atlas("pikachu", "assets/graphics/pikachu.png",
		// "assets/graphics/pikachu.json");
		this.load.spritesheet("pikachu_ball",
				"assets/graphics/pikachu_play_ball41x80.png", 41, 80);
		this.load.spritesheet("pikachu_waving",
				"assets/graphics/pikachu_waving108x139.png", 108, 139);

		// Ball
		this.load.image("ball", "assets/graphics/ballred40.png");
		this.load.atlas("ballred", "assets/graphics/ballred.png",
				"assets/graphics/ballred.json");

		// Pulse explosion
		this.load.spritesheet("explosion", "assets/graphics/explosion.png",
				128, 128);

		// Pokemon

		// weedle
		this.load.atlas("weedle", "assets/graphics/pokemons/weedle.png",
				"assets/graphics/pokemons/weedle.json");

		// charizard
		this.load.atlas("charizard", "assets/graphics/pokemons/charizard.png",
				"assets/graphics/pokemons/charizard.json");

		// Sound
		this.game.device.webAudio
				&& (this.load.audio("main_loop", ["assets/audio/MainLoop.ogg",
								"assets/audio/MainLoop.m4a"], !0), this.load
						.audio("tap", ["assets/audio/TapSound.wav"], !0))

	},
	loadUpdate : function() {
		this.loadingText.setText(this.load.progress.toString() + "%");
	},
	shudown : function() {

		this.LoadingBar_Outer.destroy();
		this.LoadingBar_Inner.destroy();
		this.loadingText.destroy();

	}

};

module.exports = Preload;
