var Pikachu = require('../prefabs/pikachu');
var Ball = require('../prefabs/ball');
var Pokemon = require('../prefabs/pokemon');
var Ground = require('../prefabs/ground');
var Pole = require('../prefabs/pole');
// var Objects = require('../prefabs/objects');
var Tree = require('../prefabs/tree');

var Levelstartboard = require('../prefabs/levelstartboard');
var LevelSettings = require('../prefabs/levelsettings');
var LevelResult = require('../prefabs/levelresult');
var LevelGUI = require('../prefabs/levelgui');
var SimpleButton = require('../prefabs/simplebutton');

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

		// add ground
		this.addGround();

		// add Pole
		this.addPole();

		// add pikachu
		this.addPikachu();
		// add ball
		this.addBall();
		// add pokemon
		this.addPokemon();

		// add objects
		this.addObjects();

		// add LevelText
		this.addLevelText();

		// add start screen
		this.addStartScreen();

		// level gui menu
		this.addGui();
	},

	update : function() {
		this.ball.start();
	},

	render : function() {

		// this.game.debug.body(this.pikachu);
		// this.game.debug.body(this.ball);
		// this.game.debug.body(this.pokemon);
	},

	addLevelText : function() {

		var titleStyle = {
			font : "42px font",
			fill : "#FBAF05",
			align : "center",
			stroke : "#FFFFFF",
			strokeThickness : 8
		};

		var titleTexts = this._settings.levelNumber;

		this.titleText = this.game.add.text(0, 0, titleTexts.toString(),
				titleStyle);
		this.titleText.anchor.set(.5, .5);
		this.titleText.position.set(this.game.width / 2, 30);
		this.titleText.setShadow(2, 2, "#FB1A05", 2);

	},

	levelFail : function() {
		// this.game.device.webAudio && this.game.sound.play("levelcomplete");
		this.gui.onLevelFail();

		this.pokemon.visible = !1;
		this.pikachu.visible = !1;
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
	addGround : function() {
		this.ground = new Ground(this.game, 0, this.game.height - 64,
				this.game.width, 64);

	},
	addPole : function() {
		this.pole = new Pole(this.game, 0, this.game.height - 31,
				this.game.width, 31);

	},
	addPikachu : function() {
		this.pikachu = new Pikachu(this.game, this.game.width / 2,
				this.game.height - 80, this._settings.levelNumber);
	},
	addBall : function() {
		this.ball = new Ball(this.game, this.game.width / 2, this.pikachu.y
						- 45, this.pikachu, this.pole,
				this._settings.levelNumber);
		this.ball.levelFailSignal.addOnce(this.levelFail, this);

	},
	addPokemon : function() {

		this.pokemon = new Pokemon(this.game, this.game.width / 2, 100,
				this.ball, this._settings.levelNumber);
		this.pokemon.levelCompleteSignal.addOnce(this.levelComplete, this);
	},

	addObjects : function() {

		// this.objects = this.game.add.group();
		// this.objectGroup = this.objects.getFirstExists(false);
		//
		// if (!this.objectGroup) {
		// this.objectGroup = new Objects(this.game, this.objects, this.ball,
		// "pokemon_type");
		// }
		// this.objectGroup.reset(100, 100);

		this.numberOfTree = 3;
		this.trees = this.game.add.group();

		for (var i = 1; i <= this.numberOfTree; i++) {
			var randomX = this.game.rnd.between(10, this.game.width - 10), randomY = this.game.rnd
					.between(100, this.game.height / 2);
			this.tree = new Tree(this.game, randomX, randomY, this.ball);
			this.trees.add(this.tree);

		}

	},
	addGui : function() {
		this.gui = new LevelGUI(this.game, this._settings);
		this.gui.pauseSignal.add(this.togglePause, this);
	},
	addStartScreen : function() {

		this.startScreen = new Levelstartboard(this.game, this,
				this._settings.levelNumber);

		this.startScreen.show();
	},
	togglePause : function(a) {
		"pause" === a ? this.pauseGame() : "resume" === a && this.resumeGame();
	},
	pauseGame : function() {
		this.gui.onPause();
		this.ball.pause('on');
		this.pokemon.pause('on');
		this.pikachu.notPause = !1;

	},
	resumeGame : function() {
		this.gui.onResume();
		this.ball.pause('off');
		this.pokemon.pause('off');
		this.pikachu.notPause = !0;
	},
	shutdown : function() {
		this.ball.destroy();
		this.pikachu.destroy();
		this.pokemon.destroy();
		this.trees.destroy();
	}
};
module.exports = Level;
