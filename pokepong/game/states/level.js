var LevelSettings = require('../prefabs/levelsettings');
var LevelResult = require('../prefabs/levelresult');
var LevelGUI = require('../prefabs/levelgui');
var SimpleButton = require('../prefabs/simplebutton');
var Pikachu = require('../prefabs/pikachu');
var Ball = require('../prefabs/ball');
var Pokemon = require('../prefabs/pokemon');

'use strict';

function Level() {
}
Object.defineProperty(this, "settings", {
			get : function() {
				return this._settings
			},
			enumerable : !0,
			configurable : !0
		});

Level.prototype = {

	init : function(b) {

		this._settings = new LevelSettings(b);
	},

	create : function() {

		this.levels_num = 28;

		this.game.add.text(50, 50, this._settings.levelNumber.toString());

		// add pikachu
		this.addPikachu();
		// add ball
		this.addBall();
		// add pokemon
		this.addPokemon();

		// level gui menu
		this.addGui();
	},

	render : function() {

		this.game.debug.body(this.pikachu);
		this.game.debug.body(this.ball);
		this.game.debug.body(this.pokemon);
	},

	levelComplete : function() {
		// this.game.device.webAudio && this.game.sound.play("levelcomplete");
		this.saveLevelResult();
		this.gui.onLevelComplete();

		this.ball.visible = !1;
		this.pikachu.visible = !1;
	},
	saveLevelResult : function() {
		window.localStorage.setItem(this._settings.levelNumber.toString(),
				"true")
	},

	addPikachu : function() {
		this.pikachu = new Pikachu(this.game, this.game.width / 2,
				this.game.height - 80);
	},
	addBall : function() {
		this.ball = new Ball(this.game, this.game.width / 2, this.pikachu.y
						- 45, "ballred", this.pikachu);
	},
	addPokemon : function() {

		var frame = [0, 1, 2, 3, 4, 5];
		this.pokemon = new Pokemon(this.game, this.game.width / 2, 100, frame,
				this.ball);
		this.pokemon.levelCompleteSignal.addOnce(this.levelComplete, this)
	},

	addGui : function() {
		this.gui = new LevelGUI(this.game, this._settings);
		this.gui.pauseSignal.add(this.togglePause, this);
	},
	togglePause : function(a) {
		"pause" === a ? this.pauseGame() : "resume" === a && this.resumeGame();
	},
	pauseGame : function() {
		this.gui.onPause();
	},
	resumeGame : function() {
		this.gui.onResume();
	},
	shutdown : function() {

		this.ball.destroy();
		this.pikachu.destroy();
		this.pokemon.destroy();
	}
};
module.exports = Level;
