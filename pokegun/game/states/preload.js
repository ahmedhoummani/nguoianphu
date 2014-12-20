'use strict';
function Preload() {
}

Preload.prototype = {

	init : function() {
		// still load if unfocus
		this.stage.disableVisibilityChange = !0;
	},
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
		// this.load.image("line", "assets/graphics/line.png");
		
		this.load.image("grass", "assets/graphics/grass.png");
		this.load.image("sand", "assets/graphics/sand.png");
		this.load.image("water", "assets/graphics/water.png");

		/* //trap
		this.load.spritesheet("saw_spin", "assets/graphics/spinning_saw.png",
				70, 69);
		*/
		// background
		// level complete
		this.load.atlas("bggroup", "assets/graphics/bggroup.png",
				"assets/graphics/bggroup.json");

		// Pikachu
		this.load.spritesheet("pikachu_ball",
				"assets/graphics/pikachu_ball55x96.png", 55, 96);
		this.load.image("pikachu100", "assets/graphics/pikachu100.png");

		// Ball
		this.load.atlas("ballopening", "assets/graphics/ballopening.png",
				"assets/graphics/ballopening.json");
		this.load.atlas("ballred", "assets/graphics/ballred.png",
				"assets/graphics/ballred.json");

		// explosion
		this.load.spritesheet("explosion", "assets/graphics/explosion.png",
				128, 128);
		this.load.spritesheet("explosion_boom",
				"assets/graphics/explosion_boom.png", 64, 64);

		// objects
		this.load.image("tree", "assets/graphics/treereal.png");
		this.load.image("island", "assets/graphics/island.png");

		// Sound
		this.game.global.enable_sound
				&& (this.load.audio("main_loop", ["assets/audio/MainLoop1.ogg",
								"assets/audio/MainLoop.m4a"], !0),
					this.load.audio("tap", ["assets/audio/TapSound.wav"], !0),
					this.load.audio("explosion", ["assets/audio/explosion.ogg",
								"assets/audio/explosion.wav"], !0),
					this.load.audio("player-explosion", ["assets/audio/player-explosion.ogg",
								"assets/audio/player-explosion.wav"], !0),
					this.load.audio("levelfail", ["assets/audio/Game_Over.ogg"], !0),
					this.load.audio("levelcomplete", ["assets/audio/LevelCompleteSound.wav"], !0),
					this.load.audio("plop", ["assets/audio/plop.ogg"], !0)
					);

		// tutorial hand
		this.load.atlas("hands", "assets/graphics/hands.png",
				"assets/graphics/hands.json");

		// Pokemon

		// weedle
		this.load.atlas("weedle", "assets/graphics/pokemons/weedle.png",
				"assets/graphics/pokemons/weedle.json");
				
		// muk
		this.load.atlas("muk", "assets/graphics/pokemons/muk.png",
				"assets/graphics/pokemons/muk.json");
				
		// beedrill
		this.load.atlas("beedrill", "assets/graphics/pokemons/beedrill.png",
				"assets/graphics/pokemons/beedrill.json");

		// arcanine
		this.load.atlas("arcanine", "assets/graphics/pokemons/arcanine.png",
				"assets/graphics/pokemons/arcanine.json");
				
		// steelix
		this.load.atlas("steelix", "assets/graphics/pokemons/steelix.png",
				"assets/graphics/pokemons/steelix.json");

		// gyarados
		this.load.atlas("gyarados", "assets/graphics/pokemons/gyarados.png",
				"assets/graphics/pokemons/gyarados.json");

		// charizard
		this.load.atlas("charizard", "assets/graphics/pokemons/charizard.png",
				"assets/graphics/pokemons/charizard.json");

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
