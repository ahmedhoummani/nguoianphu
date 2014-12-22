var Pikachu = require('../prefabs/pikachu');
var Arrow = require('../prefabs/arrow');
var Ball = require('../prefabs/ball');
var Pokemon = require('../prefabs/pokemon');
var Ground = require('../prefabs/ground');
// var Trap = require('../prefabs/trap');
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
		// this.addTrap();

		// add pikachu
		this.addPikachu();
		
		// add arrow
		this.addArrow();
		
		// draw a line below pikachu
		// this.line = this.game.add.tileSprite(50, this.game.height - 165,
				// this.game.width - 100, 10, 'line');
		
		this.win = !1;
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
			this.tutorialText.visible = !0;
			this.tutorial.position.set(this.game.width / 2 + 100, this.game.height / 2 + 200);
			
			/*
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
			*/
			
			// tutorial delay 3s
			this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
						this.tutorial.animations.stop();
						this.game.add.tween(this.tutorial).to({
									alpha : 0
								}, 300, Phaser.Easing.Back.Out, !0).onComplete
								.addOnce(function() {
											this.tutorial.destroy();
										}, this);
						this.tutorialText.destroy();
					}, this);

		}
		if (!this.startScreen.visible) {
			this.game.input.onDown.add(this.ball.start, this.ball);
		}
	},

	render : function() {

		// this.game.debug.body(this.pikachu);
		// this.game.debug.body(this.ball);
		// this.game.debug.body(this.pokemon);
		// this.game.debug.body(this.arrow);
		// this.game.debug.spriteInfo(this.arrow, 32, 100,  "#000");
		// this.game.debug.spriteInfo(this.ball, 32, 200,  "#000");
		
		// this.game.debug.text('this.arrow.body.angularVelocity: ' + this.arrow.body.angularVelocity, 32, 300, null,"22px font");
		// this.game.debug.text('this.ball.body.angularVelocity: ' + this.ball.body.angularVelocity, 32, 330, null,"22px font");
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
		if (this.win){
			return
		}
		this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
				this.game.global.enable_sound && this.game.sound.play("levelfail")
			}, this);
		this.gui.onLevelFail();

		// this.arrow.kill();
		this.pokemon.visible = !1;
		this.pikachu.visible = !1;
	},

	levelComplete : function() {
		this.win = !0;
		this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
			this.game.global.enable_sound && this.game.sound.play("levelcomplete")
			}, this);
		this.saveLevelResult();
		this.gui.onLevelComplete();

		this.arrow.destroy();
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
		this.pikachu = new Pikachu(this.game, this.game.width / 2 + 10,
				this.game.height - 50, this._settings.levelNumber);
	
	},
	addArrow : function() {
		this.arrow = new Arrow(this.game, this.game.width / 2,
				this.game.height - 200, this._settings.levelNumber);
	
	},
	addBall : function() {
		this.ball = new Ball(this.game, this.game.width / 2,
				this.game.height - 120, this.pikachu, this.arrow, this.win, this._settings.levelNumber);
		
		this.ball.levelFailSignal.addOnce(this.levelFail, this);

	},
	addPokemon : function() {

		this.pokemon = new Pokemon(this.game, this.game.width / 2, 100,
				this.ball, this._settings.levelNumber);
		this.pokemon.levelCompleteSignal.addOnce(this.levelComplete, this);
	},

	addObjects : function() {

		this.numberOfObjects = 5;
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
			font : "42px font",
			fill : "#def",
			align : "center",
			stroke : "#0f0",
			strokeThickness : 1
		};

		var tutorialTexts = "Shoot the Pokemon!\n\n" +
							"Touch any where to fire the Ball";

		this.tutorialText = this.game.add.text(0, 0, tutorialTexts.toString(),
				tutorialStyle);
		this.tutorialText.anchor.set(.5, .5);
		this.tutorialText.position.set(this.game.width / 2, this.game.height / 2 );
		this.tutorialText.setShadow(2, 2, "#000", 2);
		this.tutorialText.visible = !1;

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
		// this.arrow.destroy();
		this.pikachu.destroy();
		this.pokemon.destroy();
		this.objects.destroy();
		// this.traps.destroy();
		this._level2pokemon = null;
		// this.line.destroy();
	}
};
module.exports = Level;
