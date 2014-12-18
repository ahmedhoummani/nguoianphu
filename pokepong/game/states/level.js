var Pikachu = require('../prefabs/pikachu');
var Ball = require('../prefabs/ball');
var Pokemon = require('../prefabs/pokemon');
var Ground = require('../prefabs/ground');
var Trap = require('../prefabs/trap');
var Tree = require('../prefabs/tree');
var Island = require('../prefabs/island');

var Levelstartboard = require('../prefabs/levelstartboard');
var LevelSettings = require('../prefabs/levelsettings');
var LevelGUI = require('../prefabs/levelgui');
var Level2pokemon = require('../prefabs/level2pokemon');
var Tutorialhand = require('../prefabs/tutorialhand');

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
		// still load if unfocus
		// levelsmenu overrides it :(
		// this.stage.disableVisibilityChange = !0;
		this._settings = new LevelSettings(b);
	},

	create : function() {
	
		// this.levels_num = 28;
		this.levels_num = this.game.global.levels_num;
		
		this._level2pokemon = new Level2pokemon(this._settings.levelNumber);

		// add ground
		this.addGround();

		// add traps
		this.addTrap();

		// add pikachu
		this.addPikachu();
		
		// draw a line below pikachu
		this.line = this.game.add.tileSprite(50, this.game.height - 165,
				this.game.width - 100, 10, 'line');
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

		// tutorial
		if (this._settings.levelNumber == 1) {
			this.addTutorial()
		}
	},

	update : function() {

		if (this._settings.levelNumber == 1
				&& this.game.input.activePointer.isDown
				&& this.tutorial.visible) {
				
			this.tutorial.position.set(this.pikachu.x + 5, this.pikachu.y + 50);
			// move to left - delay 2s
			this.game.add.tween(this.tutorial).to({
				x : this.game.width / 2 - 100
			}, 1000, Phaser.Easing.Bounce.In, !0).onComplete
				.addOnce(function() {
				// move to right - delay 2s
					this.game.add.tween(this.tutorial).to({
						x : this.game.width / 2 + 100
					}, 1000, Phaser.Easing.Bounce.Out, !0).onComplete
						.addOnce(function() {
							this.game.add.tween(this.tutorial).to({
								x : this.game.width / 2
							}, 500, Phaser.Easing.Bounce.In, !0)
						}, this)
				}, this);
			
			// tutorial delay 5s
			this.game.time.events.add(Phaser.Timer.SECOND * 5, function() {
						this.tutorial.animations.stop();
						this.game.add.tween(this.tutorial).to({
									alpha : 0
								}, 300, Phaser.Easing.Back.Out, !0).onComplete
								.addOnce(function() {
											this.tutorial.visible = !1;
											this.tutorial.destroy();
										}, this);
						this.tutorialText.destroy();
					}, this);

		}

		// start the ball
		this.ball.start()

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
		this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
				this.game.global.enable_sound && this.game.sound.play("levelfail")
			}, this);
		this.gui.onLevelFail();

		this.pokemon.visible = !1;
		this.pikachu.visible = !1;
	},

	levelComplete : function() {
		this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
			this.game.global.enable_sound && this.game.sound.play("levelcomplete")
			}, this);
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

		this.ground = new Ground(this.game, 0, 0, this.game.width,
				this.game.height, this._level2pokemon.pokemon_type.toString());

	},
	addTrap : function() {

		this.numberOfTrap = 3;
		this.traps = this.game.add.group();

		for (var i = 0; i < this.numberOfTrap; i++) {
			this.trap = new Trap(this.game, 120 + i * 200, this.game.height - 50);
			this.traps.add(this.trap);

		}

	},
	addPikachu : function() {
		this.pikachu = new Pikachu(this.game, this.game.width / 2,
				this.game.height - 210, this._settings.levelNumber);
	
	},
	addBall : function() {
		this.ball = new Ball(this.game, this.game.width / 2, this.pikachu.y
						- 45, this.pikachu, this.traps,
				this._settings.levelNumber);
		this.ball.levelFailSignal.addOnce(this.levelFail, this);

	},
	addPokemon : function() {

		this.pokemon = new Pokemon(this.game, this.game.width / 2, 100,
				this.ball, this._settings.levelNumber);
		this.pokemon.levelCompleteSignal.addOnce(this.levelComplete, this);
	},

	addObjects : function() {

		this.numberOfObjects = 3;
		this.objects = this.game.add.group();

		for (var i = 1; i <= this.numberOfObjects; i++) {
			var randomX = this.game.rnd.between(10, this.game.width - 10), randomY = this.game.rnd
					.between(100, this.game.height / 2);
			if (this._level2pokemon.pokemon_type.toString() == "water") {
				this.object = new Island(this.game, randomX, randomY, this.ball);
			} else {
				this.object = new Tree(this.game, randomX, randomY, this.ball);
			}
			this.objects.add(this.object);
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
	addTutorial : function() {
		this.tutorial = new Tutorialhand(this.game, this.game.width / 2,
				this.game.height / 2, this.pikachu);
		this.tutorial.visible = !0;

		var tutorialStyle = {
			font : "32px font",
			fill : "#def",
			align : "center",
			stroke : "#0f0",
			strokeThickness : 1
		};

		var tutorialTexts = "Avoid Ball hit to Circular Saw!\n\n" +
							"touch Pikachu to defend Ball";

		this.tutorialText = this.game.add.text(0, 0, tutorialTexts.toString(),
				tutorialStyle);
		this.tutorialText.anchor.set(.5, .5);
		this.tutorialText.position.set(this.game.width / 2, this.game.height - 100 );
		this.tutorialText.setShadow(2, 2, "#000", 2);

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
		this.objects.destroy();
		this.traps.destroy();
		this._level2pokemon = null;
		this.line.destroy();
	}
};
module.exports = Level;
