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
},{"./states/boot":10,"./states/level":11,"./states/levelsmenu":12,"./states/menu":13,"./states/preload":14}],2:[function(require,module,exports){
var SimpleButton = require('./simplebutton');

'use strict';

var Levelcompleteboard = function(b, c, d) {
	Phaser.Group.call(this, b, c, "Level Complete Board");

	this.levels_num = 28;
	this.levelNumber = d;
	this.addBackGround();
	this.addButtons();
	this.board = this.game.add.image(-10, 250, "bggroup", "levelcomplete.png",
			this)

};

Levelcompleteboard.prototype = Object.create(Phaser.Group.prototype);
Levelcompleteboard.prototype.constructor = Levelcompleteboard;

Levelcompleteboard.prototype.addBackGround = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Levelcompleteboard.prototype.addButtons = function() {
	var a = this, b = 550, c = 120, d = new SimpleButton(this.game,
			this.game.width / 2, b, "buttonsgroup", "restart.png");
	d.callback.addOnce(function() {
				a.game.state.start("level", !0, !1, a.levelNumber)
			}, this);

	var e = new SimpleButton(this.game, d.x - c, b, "buttonsgroup", "menu.png");
	e.callback.addOnce(function() {
				a.game.state.start("levelsmenu")
			}, this);

	var f = new SimpleButton(this.game, d.x + c + .25, b, "buttonsgroup",
			"play2.png");
	f.callback.addOnce(function() {
				a.levelNumber === this.levels_num ? a.game.state
						.start("levelsmenu") : a.game.state.start("level", !0,
						!1, a.levelNumber + 1)
			}, this);

	this.buttons = [e, d, f];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};
Levelcompleteboard.prototype.show = function() {
	var a = this;
	this.visible = !0;
	this.board.y -= 200;
	this.board.alpha = 0;
	var b = 500;
	this.game.add.tween(this.board).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0), this.game.add
			.tween(this.board).to({
						y : this.board.y + 200
					}, b, Phaser.Easing.Back.Out, !0);
	var c = b;
	this.buttons.forEach(function(d) {
				d.y -= 200, d.visible = !1, a.game.add.tween(d).to({
							y : d.y + 200
						}, b, Phaser.Easing.Back.Out, !0, c).onStart.addOnce(
						function() {
							d.visible = !0
						}, a), c += 100
			})
};

module.exports = Levelcompleteboard;

},{"./simplebutton":8}],3:[function(require,module,exports){
var SimpleButton = require('./simplebutton');
var LevelCompleteBoard = require('./levelcompleteboard');
var PauseBoard = require('./pauseboard');

'use strict';

var Levelgui = function(b, c) {
	Phaser.Group.call(this, b, b.world, "gui");

	this.levelSettings = c;
	this.initLevelCompleteBoard();
	this.initButtons();
	this.addPauseBoard();

};

Levelgui.prototype = Object.create(Phaser.Group.prototype);
Levelgui.prototype.constructor = Levelgui;

Levelgui.prototype.initButtons = function() {
	var b = this, c = 60;

	this.pauseButton = new SimpleButton(this.game, this.game.width - 60, c,
			"buttonsgroup", "pause.png");
	this.pauseButton.callback.addOnce(this.onPause, this);

//	var d = new SimpleButton(this.game, this.game.width - 160, c,
//			"buttonsgroup", "menu.png");
//	d.callback.addOnce(function() {
//				b.game.state.start("levelsmenu")
//			});

	this.buttons = [this.pauseButton];
	this.buttons.forEach(function(a) {
				b.add(a)
			})
};

Levelgui.prototype.initLevelCompleteBoard = function() {
	this.levelCompleteBoard = new LevelCompleteBoard(this.game, this,
			this.levelSettings.levelNumber);
	this.levelCompleteBoard.visible = !1
};
Levelgui.prototype.onLevelComplete = function() {
	this.buttons.forEach(function(a) {
				a.visible = !1
			});
	this.levelCompleteBoard.show()
};

Levelgui.prototype.addPauseBoard = function() {
	this.pauseBoard = new PauseBoard(this.game, this);
	this.pauseBoard.visible = !1
};
//Levelgui.prototype.hidePauseButton = function() {
//	this.pauseButton.inputEnabled = !1;
//	this.game.add.tween(this.pauseButton).to({
//				alpha : 0
//			}, 200, Phaser.Easing.Linear.None, !0);
//};
//Levelgui.prototype.showPauseButton = function() {
//	this.pauseButton.inputEnabled = !0;
//	this.game.add.tween(this.pauseButton).to({
//				alpha : 1
//			}, 100, Phaser.Easing.Linear.None, !0);
//};
Levelgui.prototype.onPause = function() {
	this.buttons.forEach(function(a) {
				a.visible = !1
			});
	this.pauseBoard.show();
};
//Levelgui.prototype.onResume = function() {
//	this.showPauseButton();
//	this.pauseBoard.hide();
//};

module.exports = Levelgui;

},{"./levelcompleteboard":2,"./pauseboard":7,"./simplebutton":8}],4:[function(require,module,exports){
'use strict';

var Levelicon = function(b, c, d, e, f) {
	Phaser.Image.call(this, b, c, d, "buttonsgroup", "button.png");

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

},{}],5:[function(require,module,exports){
'use strict';

var Levelresult = function(a) {
	this._levelNumber = a;
	return Object.defineProperty(this, "levelNumber", {
				get : function() {
					return this._levelNumber
				},
				enumerable : !0,
				configurable : !0
			})

};

module.exports = Levelresult;

},{}],6:[function(require,module,exports){
'use strict';

var Levelsettings = function(a) {
	
	this._levelNumber = a;
	
	return Object.defineProperty(this, "levelNumber", {
				get : function() {
					return this._levelNumber
				},
				enumerable : !0,
				configurable : !0
			})

};

module.exports = Levelsettings;

},{}],7:[function(require,module,exports){
var SimpleButton = require('./simplebutton');
var ToggleButton = require('./togglebutton');

'use strict';

var Pauseboard = function(b, c) {
	Phaser.Group.call(this, b, c, "Pause Board");

	this.addBackGround();
	this.board = this.game.add.image(0, 0, "bggroup", "creditbg.png", this);
	this.board.position.set(Math.round(.5
					* (this.game.width - this.board.width)), Math.round(.5
					* (this.game.height - this.board.height)));
	// this.board.visible = !1;
	this.initText();
	this.addButtons();

};

Pauseboard.prototype = Object.create(Phaser.Group.prototype);
Pauseboard.prototype.constructor = Pauseboard;

Pauseboard.prototype.addBackGround = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Pauseboard.prototype.initText = function() {
	var b = "Game Paused", c = {
		font : "56px cantoraone",
		fill : "#FBAF05",
		align : "center",
		stroke : "#FFFFFF",
		strokeThickness : 12
	}, d = new Phaser.Text(this.game, this.game.width / 2,
			this.game.height / 2, b, c);
	d.anchor.set(.5, .5);
	d.setShadow(2, 2, "#FB1A05", 2);
	this.add(d);

};
Pauseboard.prototype.addButtons = function() {
	var a = this, b = 550, c = 120, d = new SimpleButton(this.game,
			this.game.width / 2, b, "buttonsgroup", "menu.png");
	d.callback.addOnce(function() {
				a.game.state.start("levelsmenu")
			}, this);

	var e = new ToggleButton(this.game, d.x - c, b, "buttonsgroup",
			"sound.png", "mute.png");
	e.callback.add(function() {
				a.game.sound.mute = !a.game.sound.mute
			});
	a.game.sound.mute && e.switchTextures();

	var f = new SimpleButton(this.game, d.x + c + .25, b, "buttonsgroup",
			"play2.png");

	this.buttons = [d, e, f];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};
Pauseboard.prototype.show = function() {
	var a = this;
	this.visible = !0;
	this.board.y -= 200;
	this.board.alpha = 0;
	var b = 500;
	this.game.add.tween(this.board).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0), this.game.add
			.tween(this.board).to({
						y : this.board.y + 200
					}, b, Phaser.Easing.Back.Out, !0);
	var c = b;
	this.buttons.forEach(function(d) {
				d.y -= 200, d.visible = !1, a.game.add.tween(d).to({
							y : d.y + 200
						}, b, Phaser.Easing.Back.Out, !0, c).onStart.addOnce(
						function() {
							d.visible = !0
						}, a), c += 100
			})
};
Pauseboard.prototype.hide = function() {
	// this.game.sound.usingWebAudio && this.game.sound.play("whoosh_out", .33);
	this.game.add.tween(this).to({
				alpha : 0
			}, 100, Phaser.Easing.Linear.None, !0, 400);
	this.game.add.tween(this.position).to({
				y : this.game.height / 2 - 200
			}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
			this.onHideComplete, this);
};
Pauseboard.prototype.onHideComplete = function() {
	this.visible = !1;
},

module.exports = Pauseboard;

},{"./simplebutton":8,"./togglebutton":9}],8:[function(require,module,exports){
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
	
	this.inputEnabled && (this.events.onInputDown.add(function() {
				g.game.device.webAudio && g.game.sound.play("tap"), g.game.add
						.tween(g.scale).to({
									x : .9,
									y : .9
								}, 200, Phaser.Easing.Cubic.Out, !0)
			}), this.events.onInputUp.add(function() {
				g.game.add.tween(g.scale).to({
							x : 1,
							y : 1
						}, 100, Phaser.Easing.Cubic.Out, !0).onComplete
						.addOnce(g._callback.dispatch, g)
			}));

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

Simplebutton.prototype.setCallbackDelay = function(a) {
	this.callbackDelay = a;
};

module.exports = Simplebutton;

},{}],9:[function(require,module,exports){
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

},{"./simplebutton":8}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
var LevelSettings = require('../prefabs/levelsettings');
var LevelResult = require('../prefabs/levelresult');
var LevelGUI = require('../prefabs/levelgui');
var SimpleButton = require('../prefabs/simplebutton');

'use strict';

var b;
// !function(a) {
// a[a.ACTIVE = 0] = "ACTIVE", a[a.PAUSED = 1] = "PAUSED", a[a.RESTART = 2] =
// "RESTART"
// }(b || (b = {}));

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
		this.state = 1;
		this._settings = new LevelSettings(b);
		// this.result = new LevelResult(b)
	},

	create : function() {
		this.levels_num = 28;
		// this.state = 1;
		// this._settings = new LevelSettings(this);
		// this.result = new LevelResult(this);

		this.game.add.text(100, 100, this._settings.levelNumber.toString());

		// hack
		var e = new SimpleButton(this.game, 200, 200, "buttonsgroup",
				"play2.png");
		this.world.add(e);
		e.callback.addOnce(this.levelComplete, this);

		// level gui menu
		this.addGui();

	},

	update : function() {
		switch (this.state) {
			case 0 :
				this.doUpdate();
				break;
			case 2 :
				this.doRestart(), this.state = 0
		}
	},

	addGui : function() {
		this.gui = new LevelGUI(this.game, this._settings);
	},

	gotoPrevLevel : function() {
		var b = this._settings.levelNumber;
		c = 1 === b ? this.levels_num : b - 1;
		this.gotoLevel(c)
	},
	gotoNextLevel : function() {
		var b = this._settings.levelNumber;
		c = b >= this.levels_num ? 1 : b + 1;
		this.gotoLevel(c)
	},
	gotoLevel : function(a) {
		this.game.state.start("level", !0, !1, a)
	},

	levelComplete : function() {
		// this.game.device.webAudio && this.game.sound.play("levelcomplete");
		this.saveLevelResult();
		this.gui.onLevelComplete()
	},
	saveLevelResult : function() {
		window.localStorage.setItem(this._settings.levelNumber.toString(),
				"true")
	},

	shutdown : function() {

	}
};
module.exports = Level;

},{"../prefabs/levelgui":3,"../prefabs/levelresult":5,"../prefabs/levelsettings":6,"../prefabs/simplebutton":8}],12:[function(require,module,exports){
var LevelIcon = require('../prefabs/levelicon');
var SimpleButton = require('../prefabs/simplebutton');
var ToggleButton = require('../prefabs/togglebutton');

'use strict';
function Levelsmenu() {
}
Levelsmenu.prototype = {

	create : function() {

		this.levels_num = 28;

		this.game.add.image(0, 0, "bggroup", "bg.png");
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
					b.game.state.start("level", !0, !1, c);
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
				"buttonsgroup", "sound.png", "mute.png");
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
	shutdown : function() {
		this.levelIconsGroup.destroy();
		this.backButton.destroy();
		this.soundButton.destroy();
	}

};
module.exports = Levelsmenu;

},{"../prefabs/levelicon":4,"../prefabs/simplebutton":8,"../prefabs/togglebutton":9}],13:[function(require,module,exports){
var SimpleButton = require('../prefabs/simplebutton');
var ToggleButton = require('../prefabs/togglebutton');

'use strict';

function Menu() {
	this.fromPreloader = !1;
}

Menu.prototype = {

	init : function(a) {
		this.fromPreloader = a
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
	onFocusLost : function() {
		this.game.tweens.pauseAll();
		this.game.sound.mute = !0;
	},
	onFocus : function() {
		this.game.tweens.resumeAll();
		this.game.sound.mute = !1;
	},
	addBackground : function() {
		this.game.add.image(0, 0, "bggroup", "bg.png");
	},
	addTitle : function() {

		var titleStyle = {
			font : "bold 75px cantoraone",
			fill : "#FBAF05",
			align : "center",
			stroke : "#FFFFFF",
			strokeThickness : 12
		};

		var titleTexts = "GAME TITLE";

		this.titleText = this.game.add.text(0, 0, titleTexts.toString(), titleStyle);
		this.titleText.anchor.set(.5, .5);
		this.titleText.position.set(this.game.width / 2, 130);
		this.titleText.setShadow(2, 2, "#FB1A05", 2);

	},
	addOtherImages : function() {

		this.panda = this.game.add.image(this.game.width / 2, this.game.height
						- 50, "panda", "Panda0000");
		this.panda.anchor.set(.5, 1);
		this.panda.angle = -1;
	},
	addButtons : function() {
		var b = this;
		var c = this.game.width / 2 - 50;
		var d = 140;

		this.playButton = new SimpleButton(this.game, this.game.width / 2, c,
				"buttonsgroup", "play.png");
		this.playButton.setCallbackDelay(250);
		this.playButton.callback.addOnce(this.hideAndStartGame, this);

		this.creditsButton = new SimpleButton(this.game, this.playButton.x + d,
				this.playButton.y, "buttonsgroup", "credit.png");
		this.creditsButton.callback.add(this.toggleCredits, this);

		this.soundButton = new ToggleButton(this.game, this.playButton.x - d,
				this.playButton.y, "buttonsgroup", "sound.png", "mute.png");
		this.soundButton.callback.add(function() {
					b.game.sound.mute = !b.game.sound.mute;
				});
		this.game.sound.mute && this.soundButton.switchTextures();

//		this.moreGamesButton = new SimpleButton(this.game, this.playButton.x
//						+ d, this.playButton.y, "buttonsgroup", "button.png");
//		this.moreGamesButton.callback.add(this.onMoreGamesClick, this);
//		this.moreGamesButton.visible = !1;
//		this.moreGamesButton.exists = !1;

		this.buttons = [this.playButton, this.soundButton, this.creditsButton];

		this.buttons.forEach(function(a) {
					b.world.add(a);
				});
	},
	hideAndStartGame : function() {
		this.playButton.input.enabled = !1;
		this.playButton.inputEnabled = !1;
		this.game.state.start("levelsmenu");
	},
	// onMoreGamesClick : function() {
	// window.open("http://play.nguoianphu.com", "_blank");
	// },
	initCredits : function() {

		// credit background
		this.credits = this.game.add.image(0, 0, "bggroup", "creditbg.png");

		this.credits.position.set(Math.round(.5
						* (this.game.width - this.credits.width)), Math
						.round(.5 * (this.game.height - this.credits.height)));
		this.credits.visible = !1;

		// credit text
		var style = {
			font : "45px cantoraone",
			fill : "#fff",
			stroke : "#000",
			strokeThickness : 1,
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
	startMusic : function() {
		this.game.sound.play("main_loop", .33, !0);
		this.soundButton.switchTextures();
		this.soundButton.input.enabled = !0;
		// this.game.sound.mute = !0;
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

	shutdown : function() {
		this.titleText.destroy();
		this.panda.destroy();
		this.credits.destroy();
		this.creditText.destroy();
		this.buttons = null
	}

};

module.exports = Menu;

},{"../prefabs/simplebutton":8,"../prefabs/togglebutton":9}],14:[function(require,module,exports){
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

		// Buttons
		this.load.atlas("buttonsgroup", "assets/graphics/buttonsgroup.png",
				"assets/graphics/buttonsgroup.json");

		// background
		// level complete
		this.load.atlas("bggroup", "assets/graphics/bggroup.png",
				"assets/graphics/bggroup.json");

		// Panda
		this.load.atlasJSONHash("panda", "assets/graphics/panda.png",
				"assets/graphics/panda.json");

		// Sound
		this.load.audio("main_loop", ["assets/audio/MainLoop.ogg",
						"assets/audio/MainLoop.m4a"], !0);
		this.load.audio("tap", ["assets/audio/TapSound.wav"], !0)

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

},{}]},{},[1])