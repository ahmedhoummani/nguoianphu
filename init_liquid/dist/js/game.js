(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(640, 832, Phaser.AUTO, 'init');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('level', require('./states/level'));
  game.state.add('levelsmenu', require('./states/levelsmenu'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":5,"./states/level":6,"./states/levelsmenu":7,"./states/menu":8,"./states/preload":9}],2:[function(require,module,exports){
'use strict';

var Levelicon = function(b, c, d, e, f) {
	Phaser.Image.call(this, b, c, d, "buttonsgroup", "buttonblue.png");

	// initialize your prefab here
	"undefined" == typeof f && (f = !1);
	var g = this;
	this.inputEnabled = !f;
	this.locked = f;
	this._levelNumber = e;

	this.anchor.set(.5, .5);
	this.createGraphics();
	this.inputEnabled
			&& (this.game.device.desktop && (this.input.useHandCursor = !0), this.events.onInputDown
					.add(function() {
						g.game.sound.play("tap", .75), g.tint *= .995, g.game.add
								.tween(g.scale).to({
											x : .9,
											y : .9
										}, 200, Phaser.Easing.Cubic.Out, !0)
					}), this.events.onInputUp.add(function() {
						g.tint = 16777215, g.game.add.tween(g.scale).to({
									x : 1,
									y : 1
								}, 200, Phaser.Easing.Cubic.Out, !0)
					}));

	Object.defineProperty(this, "levelNumber", {
				get : function() {
					return this._levelNumber
				},
				enumerable : !0,
				configurable : !0
			})

};

Levelicon.prototype = Object.create(Phaser.Image.prototype);
Levelicon.prototype.constructor = Levelicon;

Levelicon.prototype.createGraphics = function() {
	this.locked ? this.createLockedGraphics() : this.createUnlockedGraphics()
};
Levelicon.prototype.createLockedGraphics = function() {
	this.loadTexture("buttonsgroup", "buttonlock.png")
};
Levelicon.prototype.createUnlockedGraphics = function() {
	var a = {
		font : "48px TF2 Build",
		fill : "#218DB7",
		align : "center"
	};
	var b = this.game.add.text(0, 0, this._levelNumber.toString(), a);
	b.anchor.set(.5, .5);
	var c = this.game.add.renderTexture(this.width, this.height);
	c.renderXY(this, .5 * this.width, .5 * this.height);
	c
			.renderXY(b, Math.floor(.5 * this.width), Math.floor(.5
							* this.height)
							- 1);
	this.setTexture(c);
	b.destroy();
};

module.exports = Levelicon;

},{}],3:[function(require,module,exports){
'use strict';

var Simplebutton = function(b, c, d, e, f) {
	Phaser.Image.call(this, b, c, d, e, f);

	// initialize your prefab here
	var g = this;
	this.callbackDelay = 20;
	this.callbackTimer = 0;
	this.clicked = !1;
	this._callback = new Phaser.Signal();
	this.anchor.set(.5, .5);
	this.inputEnabled = !0;
	this.game.device.desktop && (this.input.useHandCursor = !0);
	this.inputEnabled && this.events.onInputDown.add(function() {
				g.game.device.webAudio && g.game.sound.play("tap"), g.game.add
						.tween(g.scale).to({
									x : 1.2,
									y : .8
								}, 200, Phaser.Easing.Back.Out, !0).onComplete
						.addOnce(function() {
							g.clicked = !0, g.callbackTimer = 0, g.game.add
									.tween(g.scale).to({
												x : 1,
												y : 1
											}, 200, Phaser.Easing.Back.Out, !0);
						}, g);
			});

	Object.defineProperty(this, "callback", {
				get : function() {
					return this._callback;
				},
				enumerable : !0,
				configurable : !0
			});

};

Simplebutton.prototype = Object.create(Phaser.Image.prototype);
Simplebutton.prototype.constructor = Simplebutton;

Simplebutton.prototype.update = function() {

	// write your prefab's specific update code here
	this.clicked
			&& (this.callbackTimer += this.game.time.elapsed, this.callbackTimer >= this.callbackDelay
					&& (this._callback.dispatch(), this.clicked = !1, this.callbackTimer = 0));
};

Simplebutton.prototype.setCallbackDelay = function(a) {
	this.callbackDelay = a;
};

Simplebutton.prototype.destroy = function() {
	this._callback.dispose();
	this._callback = null;
};

module.exports = Simplebutton;

},{}],4:[function(require,module,exports){
'use strict';

var Simplebutton = require('./simplebutton');

var Togglebutton = function(b, c, d, e, f, g) {
	Simplebutton.call(this, b, c, d, e, f);

	// initialize your prefab here
	this.spriteSheet = e;
	this.textureKey1 = f;
	this.textureKey2 = g;
	this.activeTextureKey = this.textureKey1;
	this._state = 1;
	this.events.onInputUp.add(this.switchTextures, this, 2);

	Object.defineProperty(this, "state", {
				get : function() {
					return this._state;
				},
				enumerable : !0,
				configurable : !0
			});

};

Togglebutton.prototype = Object.create(Phaser.Image.prototype);
Togglebutton.prototype.constructor = Togglebutton;

Togglebutton.prototype.switchTextures = function() {
	this.activeTextureKey = this.activeTextureKey === this.textureKey1
			? this.textureKey2
			: this.textureKey1;
	this.loadTexture(this.spriteSheet, this.activeTextureKey);
	this._state = this.activeTextureKey === this.textureKey1 ? 1 : 2;
};

module.exports = Togglebutton;

},{"./simplebutton":3}],5:[function(require,module,exports){
'use strict';

function Boot() {
}

Boot.prototype = {
	preload : function() {
		this.load.image('LoadingBar_Outer', 'assets/LoadingBar_Outer.png');
		this.load.image('LoadingBar_Inner', 'assets/LoadingBar_Inner.png');
	},
	create : function() {

		this.setupStage();
		this.detectWeakDevice();
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');
	},
	setupStage : function() {
		var b = this.game.scale;
		b.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		b.minWidth = .25 * this.game.world.width;
		b.minHeight = .25 * this.game.world.height;
		b.aspectRatio = this.game.world.width / this.game.world.width;
		b.pageAlignHorizontally = !0;
		b.pageAlignVertically = !0;
		this.game.device.desktop || b.forceOrientation(!1, !0);
		b.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this);
		b.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this);
		b.setScreenSize(!0);
		this.stage.disableVisibilityChange = !0;
		this.stage.backgroundColor = 11193204;
	},
	detectWeakDevice : function() {
		var b = !1;
		if (this.game.device.desktop === !1) {
			var c = detect.parse(window.navigator.userAgent);
			this.game.device.iOS
					&& (c.os.major < 7 && (b = !0), c.browser.family
							.indexOf("Chrome") > -1
							&& (b = !0)), this.game.device.android
					&& (c.browser.family.indexOf("Android") > -1 && (b = !0), c.browser.family
							.indexOf("Chrome Mobile") > -1
							&& c.browser.major <= 18 && (b = !0)), this.game.device.windowsPhone
					&& c.browser.family.indexOf("IE") > -1
					&& (b = c.browser.major < 10);
		}
	},
	onEnterIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px";
	},
	onLeaveIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px", this.game.device.android
				&& !this.game.device.chrome
				&& this.game.scale.setScreenSize(!0), this.game.time.events
				.repeat(500, 3, this.game.scale.setScreenSize, this);
	}

};

module.exports = Boot;

},{}],6:[function(require,module,exports){
'use strict';
  function Level() {}
  Level.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // This method is called after the game engine successfully switches states. 
      // Feel free to add any setup code here (do not load anything here, override preload() instead).
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = Level;

},{}],7:[function(require,module,exports){
var LevelIcon = require('../prefabs/levelicon');
var SimpleButton = require('../prefabs/simplebutton');
var ToggleButton = require('../prefabs/togglebutton');

'use strict';
function Levelsmenu() {
}
Levelsmenu.prototype = {

	create : function() {

		this.levels_num = 28;

		this.game.add.image(-16, 0, "gui", "LevelsMenu_Background0000");
		this.initLevelIcons();
		this.initButtons();
		this.initAnimations();
	},

	initLevelIcons : function() {
		this.levelIconsGroup = this.game.add.group(this.game.world,
				"LevelIcons Container");
		this.levelIconsGroup.x = 85;
		this.levelIconsGroup.y = 150;

		var b = 118, c = 118, d = 59, e = 0;
		for (var f = 1; f <= this.levels_num; f++) {
			var g = f;
			var h = this.levelIsLocked(g);
			var i = new LevelIcon(this.game, d - .5, e, g, h);
			h === !1
					&& i.events.onInputUp.add(this.onLevelIconInputUp, this, 2);
			this.levelIconsGroup.add(i);
			d += b;
			4 === f && (d = 0, e += c);
			f > 4 && (f - 4) % 5 === 0 && (d = 0, e += c), 24 === f && (d = 59);
		}

	},
	levelIsLocked : function(a) {
		if (1 === a)
			return !1;

		var b = a - 1;
		return !("true" === window.localStorage.getItem(b.toString()))
	},
	onLevelIconInputUp : function(a) {
		var b = this;
		this.game.time.events.add(200, function() {
			var c = a.levelNumber;
			b.game.state.start("Level", !0, !1, c);
				// this.destroy();
			}, this)
	},
	initButtons : function() {
		var b = this, c = 60;

		this.backButton = new SimpleButton(this.game, c, c, "buttonsgroup",
				"home.png");
		this.backButton.callback.addOnce(function() {
					b.game.state.start("menu")
				}, this);
		this.world.add(this.backButton);

		this.soundButton = new ToggleButton(this.game, this.game.width - c, c,
				"buttonsgroup", "soundonblue.png", "muteblue.png");
		this.soundButton.callback.add(function() {
					b.game.sound.mute = !b.game.sound.mute
				});
		this.game.sound.mute && this.soundButton.switchTextures();
		this.world.add(this.soundButton)
	},
	initAnimations : function() {
		this.levelIconsGroup.alpha = 0;
		this.levelIconsGroup.y += 200;
		this.game.add.tween(this.levelIconsGroup).to({
					y : this.levelIconsGroup.y - 200,
					alpha : 1
				}, 600, Phaser.Easing.Back.Out, !0, 300);

		this.backButton.x -= 300;
		this.game.add.tween(this.backButton).to({
					x : this.backButton.x + 300
				}, 300, Phaser.Easing.Back.Out, !0, 700);

		this.soundButton.x += 300;
		this.game.add.tween(this.soundButton).to({
					x : this.soundButton.x - 300
				}, 300, Phaser.Easing.Back.Out, !0, 700)
	},
	destroy : function() {
		this.levelIconsGroup.destroy();
		this.backButton.destroy();
		this.soundButton.destroy();

	}

};
module.exports = Levelsmenu;

},{"../prefabs/levelicon":2,"../prefabs/simplebutton":3,"../prefabs/togglebutton":4}],8:[function(require,module,exports){
var SimpleButton = require('../prefabs/simplebutton');
var ToggleButton = require('../prefabs/togglebutton');

'use strict';

function Menu() {
	this.fromPreloader = !1;
}

Menu.prototype = {
	preload : function() {

	},
	create : function() {

		// add menu object

		this.addBackground();
		this.addTitle();
		this.addOtherImages();
		this.addButtons();
		this.initCredits();
		this.initAnimation();

		this.fromPreloader
				&& (this.soundButton.input.enabled = !1, this.soundButton
						.switchTextures(), this.game.input.onTap.addOnce(
						this.startMusic, this), this.stage.disableVisibilityChange = !1, this.game.onBlur
						.add(this.onFocusLost, this), this.game.onFocus.add(
						this.onFocus, this));

	},
	update : function() {

	},
	onFocusLost : function() {
		this.game.tweens.pauseAll();
		this.game.sound.mute = !0;
	},
	onFocus : function() {
		this.game.tweens.resumeAll();
		this.game.sound.mute = !1;
	},
	addBackground : function() {
		this.game.add.image(0, 0, "main_menu", "main_menu_bg");
	},
	addTitle : function() {

		var style = {
			font : "85px cantoraone",
			fill : "#fcfcfc",
			stroke : "#d4dbd9",
			strokeThickness : 2,
			align : "center"
		};

		var titleTexts = "GAME TITLE";

		this.titleText = this.game.add.text(0, 0, titleTexts.toString(), style);
		this.titleText.anchor.set(.5, .5);
		this.titleText.position.set(this.game.width / 2, 130);
		this.titleText.setShadow(2, 2, "#666666", 2);

	},
	addOtherImages : function() {

		this.panda = this.game.add.image(this.game.width / 2, this.game.height
						- 50, "main_menu", "Panda0000");
		this.panda.anchor.set(.5, 1);
		this.panda.angle = -1;
	},
	addButtons : function() {
		var b = this;
		var c = this.game.width / 2 - 50;
		var d = 140;

		this.playButton = new SimpleButton(this.game, this.game.width / 2, c,
				"buttonsgroup", "play2.png");
		this.playButton.setCallbackDelay(250);
		this.playButton.callback.addOnce(this.hideAndStartGame, this);

		this.creditsButton = new SimpleButton(this.game, this.playButton.x + d,
				this.playButton.y, "buttonsgroup", "creditblue.png");
		this.creditsButton.callback.add(this.toggleCredits, this);

		this.soundButton = new ToggleButton(this.game, this.playButton.x - d,
				this.playButton.y, "buttonsgroup", "soundonblue.png",
				"muteblue.png");
		this.soundButton.callback.add(function() {
					b.game.sound.mute = !b.game.sound.mute;
				});
		this.game.sound.mute && this.soundButton.switchTextures();

		this.moreGamesButton = new SimpleButton(this.game, this.playButton.x
						+ d, this.playButton.y, "buttonsgroup",
				"buttonblue.png");
		this.moreGamesButton.callback.add(this.onMoreGamesClick, this);
		this.moreGamesButton.visible = !1;
		this.moreGamesButton.exists = !1;

		this.buttons = [this.playButton, this.soundButton, this.creditsButton];

		this.buttons.forEach(function(a) {
					b.world.add(a);
				});
	},
	hideAndStartGame : function() {
		this.playButton.input.enabled = !1;
		this.playButton.inputEnabled = !1;
		this.game.state.start("levelsmenu");
		this.destroy();
	},
	onMoreGamesClick : function() {
		window.open("http://play.nguoianphu.com", "_blank");
	},
	initCredits : function() {

		// credit background
		this.credits = this.game.add.image(0, 0, "creditbg");

		this.credits.position.set(Math.round(.5
						* (this.game.width - this.credits.width)), Math
						.round(.5 * (this.game.height - this.credits.height)));
		this.credits.visible = !1;

		// credit text
		var style = {
			font : "45px cantoraone",
			fill : "#fcfcfc",
			stroke : "#d4dbd9",
			strokeThickness : 2,
			align : "center"
		};

		var creditTextContent = "Hello\n" + "Phaser is very good!\n"
				+ "Let's go!";

		this.creditText = this.game.add.text(0, 0,
				creditTextContent.toString(), style);
		this.creditText.anchor.set(.5, .5);
		this.creditText.position.set(this.game.width / 2, this.game.height / 2);
		this.creditText.setShadow(2, 2, "#666666", 2);

		this.creditText.visible = !1;

		// credit bg
		// this.completionSprite = this.game.add.graphics(0, 0);
		// this.completionSprite.beginFill(0xFFFF00, 1);
		// this.completionSprite.bounds = new PIXI.Rectangle(0, 0, 200, 200);
		//
		// this.completionSprite.boundsPadding = 0;
		// // set the line style to have a width of 5 and set the color to red
		// this.completionSprite.lineStyle(5, 0xFF0000);
		// this.completionSprite.drawRect(0, 0, 150, 150);
		// this.completionSprite.alpha = 0.3;
	},
	toggleCredits : function() {
		this.credits.visible ? this.hideCredits() : this.showCredits();
	},
	hideCredits : function() {
		var a = this;

		this.game.add.tween(this.creditText).to({
					y : this.creditText.y + 200,
					alpha : 0
				}, 500, Phaser.Easing.Back.In, !0);

		this.game.add.tween(this.credits).to({
					y : this.credits.y + 200,
					alpha : 0
				}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
				function() {
					a.playButton.input.enabled = !0;
					a.creditsButton.input.enabled = !0;
					a.credits.visible = !1;
					a.creditText.visible = !1;
				}, this);
	},
	showCredits : function() {
		this.credits.visible = !0;
		this.creditText.visible = !0;
		this.credits.alpha = 0;
		
		this.credits.y = Math.round(.5
				* (this.game.width - this.credits.height))
				+ 200;

		this.creditText.y = Math.round(.5
				* (this.game.width - this.creditText.height))
				+ 200;

		this.game.add.tween(this.credits).to({
					y : this.credits.y - 200,
					alpha : 1
				}, 500, Phaser.Easing.Back.Out, !0);

		this.game.add.tween(this.creditText).to({
					y : this.creditText.y - 200,
					alpha : 1
				}, 500, Phaser.Easing.Back.Out, !0);

		this.playButton.input.enabled = !1;
		this.creditsButton.input.enabled = !1;

		this.game.input.onTap.addOnce(function() {
					this.hideCredits();
				}, this);
	},
	initAnimation : function() {
		var a = this;

		// tween title
		this.titleText.y -= 250;
		this.titleText.scale.set(0, 1);
		this.game.add.tween(this.titleText).to({
					y : this.titleText.y + 250
				}, 600, Phaser.Easing.Back.Out, !0, 300);
		this.game.add.tween(this.titleText.scale).to({
					x : 1
				}, 600, Phaser.Easing.Back.Out, !0, 500).onComplete.addOnce(
				this.onTitleAnimationComplete, this);

		// tween panda
		this.panda.scale.set(0, 0);
		this.game.add.tween(this.panda.scale).to({
					x : .85,
					y : .85
				}, 500, Phaser.Easing.Back.Out, !0, 1200).onComplete.addOnce(
				this.onPandaAnimationComplete, this);
		var b = 1500;

		// tween buttons
		this.buttons.forEach(function(c) {
					c.scale.set(0, 0), a.game.add.tween(c.scale).to({
								x : 1,
								y : 1
							}, 300, Phaser.Easing.Back.Out, !0, b), b += 200;
				});
		this.game.time.events.repeat(2e3, 1e3, this.shakePlayButton, this);
	},
	shakePlayButton : function() {
		this.game.add.tween(this.playButton.scale).to({
					x : 1.1,
					y : .9
				}, 150, Phaser.Easing.Cubic.Out, !0, 0, 3, !0);
	},
	onTitleAnimationComplete : function() {
		this.game.add.tween(this.titleText.scale).to({
					x : 1.1,
					y : .9
				}, 600, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0);
	},
	onPandaAnimationComplete : function() {
		this.game.add.tween(this.panda.scale).to({
					y : .88
				}, 600, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0), this.game.add
				.tween(this.panda).to({
							angle : 1
						}, 1200, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0);
	},

	destroy : function() {
		this.titleText.destroy();
		this.panda.destroy();
		this.credits.destroy();
		this.creditText.destroy();
		this.buttons = null
	}

};

module.exports = Menu;

},{"../prefabs/simplebutton":3,"../prefabs/togglebutton":4}],9:[function(require,module,exports){
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
		this.load.atlasJSONHash("graphics_1",
				"assets/graphics/level_graphics.png",
				"assets/graphics/level_graphics.json");

		// Buttons
		this.load.atlas("buttonsgroup", "assets/graphics/buttonsgroup.png",
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

				
		// credit bg
		this.load.image('creditbg', 'assets/graphics/creditbg.png');

	},
	loadUpdate : function() {
		this.loadingText.setText(this.load.progress.toString() + "%");
	}

};

module.exports = Preload;

},{}]},{},[1])