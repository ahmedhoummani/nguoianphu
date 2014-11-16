(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(640, 832, Phaser.AUTO, 'pokepong');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('level', require('./states/level'));
  game.state.add('levelsmenu', require('./states/levelsmenu'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":16,"./states/level":17,"./states/levelsmenu":18,"./states/menu":19,"./states/preload":20}],2:[function(require,module,exports){
'use strict';

var Ball = function(game, x, y, ball, pikachu, pole, level) {
	Phaser.Sprite.call(this, game, x, y, ball, pikachu, pole, level);

	// initialize your prefab here
	this._x = x;
	this._y = y;
	this.pikachu = pikachu;
	this.pole = pole;

	this.level = level;
	if (this.level > 3) {
		this.level *= .5;
	} else {
		this.level = 2;
	}

	this.health = 3;

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 - 50 - (30 * i), 30,
				'ball');
		life.scale.setTo(0.5, 0.5);
		life.anchor.setTo(0.5, 0.5);
	}

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(42, 42, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.anchor.setTo(.5, .5);
	this.body.maxVelocity.x = 100 * (this.level);
	this.body.maxVelocity.y = 100 * (this.level);

	this.cachedVelocity = {};

	// this.animations.add('stand', ['1.png', '2.png', '3.png', '4.png'], 7,
	// true);
	// this.animations.add('right', ['run1.png', 'run2.png', 'run3.png',
	// 'run4.png'], 10, true);
	// this.animations.add('left',
	// ['run5.png', 'run6.png', 'run7.png', 'run8.png'], 10, true);
	// this.animations.play('stand');

	this.game.add.existing(this);

	this._levelFailSignal = new Phaser.Signal;

	Object.defineProperty(this, "levelFailSignal", {
				get : function() {
					return this._levelFailSignal
				},
				enumerable : !0,
				configurable : !0
			})

};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {

	this.game.physics.arcade.collide(this, this.pikachu, this.hitPikachu, null,
			this);
	this.game.physics.arcade.collide(this, this.pole, this.damage, null, this);

};

Ball.prototype.hitPikachu = function() {

	var diff = 0;

	if (this.pikachu.x > this.x) {
		// If ball is in the left hand side on the racket
		diff = this.pikachu.x - this.x;
		this.body.velocity.x += (50 * diff * this.level);
	} else if (this.pikachu.x < this.x) {
		// If ball is in the right hand side on the racket
		diff = this.x - this.pikachu.x;
		this.body.velocity.x -= (-50 * diff * this.level);
	} else {
		// The ball hit the center of the racket, let's add a little bit of a
		// tragic accident(random) of his movement
		this.body.velocity.x = 2 + Math.random() * 50 * this.level;
	}

};

Ball.prototype.start = function() {
	if (this.game.input.activePointer.isDown && this.x == this._x
			&& this.y == this._y) {
		this.body.velocity.y = -100 * this.level;
	}
};

Ball.prototype.damage = function() {

	this.health -= 1;

	var life = this.lives.getFirstAlive();
	if (life) {
		life.kill();
	}

	if (this.health <= 0) {
		this._levelFailSignal.dispatch();
		this.alive = false;
		this.kill();

		return true;
	}

	return false;

};

Ball.prototype.pause = function(status) {

	if (status == 'off') {
		if (this.body) {
			this.body.velocity.x = this.cachedVelocity.x;
			this.body.velocity.y = this.cachedVelocity.y;
		}
	} else if (status == 'on') {
		if (this.body) {
			this.cachedVelocity.x = this.body.velocity.x;
			this.cachedVelocity.y = this.body.velocity.y;
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}
	}

};

module.exports = Ball;

},{}],3:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {
	Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

	// initialize your prefab here
	// this.autoScroll(-20, 20);
	// this.fixedToCamera = true;
	this.game.add.existing(this);

};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

	// write your prefab's specific update code here
	// this.tilePosition.x = -this.game.camera.x;
	// this.tilePosition.y = -this.game.camera.y;

};

module.exports = Ground;

},{}],4:[function(require,module,exports){
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

},{"./simplebutton":14}],5:[function(require,module,exports){
var SimpleButton = require('./simplebutton');
var ToggleButton = require('./togglebutton');

'use strict';

var Levelfailboard = function(b, c, d) {
	Phaser.Group.call(this, b, c, "Level Fail Board");

	this.levels_num = 28;
	this.levelNumber = d;

	this.addBackGround();

	this.board = this.game.add.image(0, 0, "bggroup", "creditbg.png", this);
	this.board.position.set(this.game.width / 2 - this.board.width / 2,
			this.game.height / 2 - this.board.height / 2);

	this.initText();
	this.addButtons();

	this.exists = !1;
	this.visible = !1;

};

Levelfailboard.prototype = Object.create(Phaser.Group.prototype);
Levelfailboard.prototype.constructor = Levelfailboard;

Levelfailboard.prototype.addBackGround = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Levelfailboard.prototype.initText = function() {
	var b = "You Lost!", c = {
		font : "76px font",
		fill : "#FBAF05",
		align : "center",
		stroke : "#FFFFFF",
		strokeThickness : 12
	}, d = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2
					- 100, b, c);
	d.anchor.set(.5, .5);
	d.setShadow(2, 2, "#FB1A05", 2);
	this.add(d);

};
Levelfailboard.prototype.addButtons = function() {
	var a = this, b = this.game.height / 2, c = 120;

	this.menuBtn = new SimpleButton(this.game, this.game.width / 2, b,
			"buttonsgroup", "menu.png");
	this.menuBtn.callback.addOnce(function() {
				a.game.state.start("levelsmenu")
			}, this);

	this.soundBtn = new ToggleButton(this.game, this.menuBtn.x - c, b,
			"buttonsgroup", "sound.png", "mute.png"), this.soundBtn.callback
			.add(function() {
						a.game.sound.mute = !a.game.sound.mute;
					}), this.game.sound.mute && this.soundBtn.switchTextures();

	this.restartBtn = new SimpleButton(this.game, this.menuBtn.x + c, b,
			"buttonsgroup", "restart.png");
	this.restartBtn.callback.addOnce(function() {
				a.game.state.start("level", !0, !1, a.levelNumber)
			}, this);

	this.buttons = [this.menuBtn, this.soundBtn, this.restartBtn];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};

Levelfailboard.prototype.show = function() {
	this.exists = !0;
	this.visible = !0;

	this.alpha = 0;
	this.board.y -= 200;
	this.game.add.tween(this).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0);
	this.game.add.tween(this.board).to({
				y : 200
			}, 500, Phaser.Easing.Back.Out, !0).onComplete.addOnce(
			this.onShowComplete, this);

	var a = this, b = 500, c = b;
	this.buttons.forEach(function(d) {
				d.y -= 200;
				d.visible = !1;
				a.game.add.tween(d).to({
							y : d.y + 200
						}, b, Phaser.Easing.Back.Out, !0, c).onStart.addOnce(
						function() {
							d.visible = !0
						}, a), c += 100
			});
};
Levelfailboard.prototype.onShowComplete = function() {
};
// Levelfailboard.prototype.hide = function() {
// this.game.add.tween(this).to({
// alpha : 0
// }, 100, Phaser.Easing.Linear.None, !0, 400);
// this.game.add.tween(this.board).to({
// y : 500
// }, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
// this.onHideComplete, this);
//
// };
// Levelfailboard.prototype.onHideComplete = function() {
// this.exists = !1;
// this.visible = !1;
// };

module.exports = Levelfailboard;

},{"./simplebutton":14,"./togglebutton":15}],6:[function(require,module,exports){
var SimpleButton = require('./simplebutton');
var LevelCompleteBoard = require('./levelcompleteboard');
var LevelFailBoard = require('./levelfailboard');
var PauseBoard = require('./pauseboard');

'use strict';

var Levelgui = function(b, c) {
	Phaser.Group.call(this, b, b.world, "gui");

	this._pauseSignal = new Phaser.Signal();
	this.levelSettings = c;
	this.initLevelFailBoard();
	this.initLevelCompleteBoard();
	this.initButtons();
	this.addPauseBoard();

	Object.defineProperty(this, "pauseSignal", {
				get : function() {
					return this._pauseSignal;
				},
				enumerable : !0,
				configurable : !0
			});

};

Levelgui.prototype = Object.create(Phaser.Group.prototype);
Levelgui.prototype.constructor = Levelgui;

Levelgui.prototype.initButtons = function() {
	var b = this, c = 60;

	this.pauseButton = new SimpleButton(this.game, this.game.width - 60, c,
			"buttonsgroup", "pause.png");
	b.add(this.pauseButton);
	this.pauseButton.callback.add(function() {
				b._pauseSignal.dispatch("pause");
			}, this)

};

Levelgui.prototype.initLevelFailBoard = function() {
	this.levelFailBoard = new LevelFailBoard(this.game, this,
			this.levelSettings.levelNumber);
	this.levelFailBoard.visible = !1
};
Levelgui.prototype.onLevelFail = function() {
	this.pauseButton.visible = !1;
	this.levelFailBoard.show()
};

Levelgui.prototype.initLevelCompleteBoard = function() {
	this.levelCompleteBoard = new LevelCompleteBoard(this.game, this,
			this.levelSettings.levelNumber);
	this.levelCompleteBoard.visible = !1
};
Levelgui.prototype.onLevelComplete = function() {
	this.pauseButton.visible = !1;
	this.levelCompleteBoard.show()
};

Levelgui.prototype.addPauseBoard = function() {
	var a = this;
	this.pauseBoard = new PauseBoard(this.game, this);
	this.pauseBoard.resumeButton.callback.add(function() {
				a._pauseSignal.dispatch("resume");
			}, this);
};
Levelgui.prototype.onPause = function() {
	this.pauseBoard.show();
	this.pauseButton.visible = !1;
};
Levelgui.prototype.onResume = function() {
	this.pauseBoard.hide();
	this.pauseButton.visible = !0;
};

module.exports = Levelgui;

},{"./levelcompleteboard":4,"./levelfailboard":5,"./pauseboard":10,"./simplebutton":14}],7:[function(require,module,exports){
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
		font : "48px font",
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
var SimpleButton = require('./simplebutton');
var ToggleButton = require('./togglebutton');

'use strict';

var Pauseboard = function(b, c) {
	Phaser.Group.call(this, b, c, "Pause Board");

	this.addBackGround();
	this.board = this.game.add.image(0, 0, "bggroup", "creditbg.png", this);
	this.board.position.set(this.game.width / 2 - this.board.width / 2,
			this.game.height / 2 - this.board.height / 2);

	this.initText();
	this.addButtons();
	this.exists = !1;
	this.visible = !1;

	Object.defineProperty(this, "resumeButton", {
				get : function() {
					return this._resumeButton;
				},
				enumerable : !0,
				configurable : !0
			});

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
		font : "56px font",
		fill : "#FBAF05",
		align : "center",
		stroke : "#FFFFFF",
		strokeThickness : 12
	}, d = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2
					- 100, b, c);
	d.anchor.set(.5, .5);
	d.setShadow(2, 2, "#FB1A05", 2);
	this.add(d);

};
Pauseboard.prototype.addButtons = function() {
	var a = this, b = this.game.height / 2, c = 120;

	this.menuBtn = new SimpleButton(this.game, this.game.width / 2, b,
			"buttonsgroup", "menu.png");
	this.menuBtn.callback.add(function() {
				a.game.state.start("levelsmenu")
			});

	this.soundBtn = new ToggleButton(this.game, this.menuBtn.x - c, b,
			"buttonsgroup", "sound.png", "mute.png"), this.soundBtn.callback
			.add(function() {
						a.game.sound.mute = !a.game.sound.mute;
					}), this.game.sound.mute && this.soundBtn.switchTextures();

	this._resumeButton = new SimpleButton(this.game, this.menuBtn.x + c + .25,
			b, "buttonsgroup", "restart.png"),

	this.buttons = [this.menuBtn, this.soundBtn, this._resumeButton];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};
Pauseboard.prototype.show = function() {
	this.exists = !0;
	this.visible = !0;

	this.alpha = 0;
	this.board.y -= 200;
	this.game.add.tween(this).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0);
	this.game.add.tween(this.board).to({
				y : 200
			}, 500, Phaser.Easing.Back.Out, !0).onComplete.addOnce(
			this.onShowComplete, this);

	var a = this, b = 500, c = b;
	this.buttons.forEach(function(d) {
				d.y -= 200;
				d.visible = !1;
				a.game.add.tween(d).to({
							y : d.y + 200
						}, b, Phaser.Easing.Back.Out, !0, c).onStart.addOnce(
						function() {
							d.visible = !0
						}, a), c += 100
			});
};
Pauseboard.prototype.onShowComplete = function() {
};
Pauseboard.prototype.hide = function() {
	this.game.add.tween(this).to({
				alpha : 0
			}, 100, Phaser.Easing.Linear.None, !0, 400);
	this.game.add.tween(this.board).to({
				y : 500
			}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
			this.onHideComplete, this);

};
Pauseboard.prototype.onHideComplete = function() {
	this.exists = !1;
	this.visible = !1;
};

module.exports = Pauseboard;

},{"./simplebutton":14,"./togglebutton":15}],11:[function(require,module,exports){
'use strict';

var Pikachu = function(game, x, y, level) {
	Phaser.Sprite.call(this, game, x, y, 'pikachu', level);

	// initialize your prefab here

	this.level = level;
	if (this.level > 3) {
		this.level *= .5;
	} else {
		this.level = 2;
	}

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(72, 57, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(0, 0);
	this.body.allowRotation = false;
	this.body.immovable = true;
	this.anchor.setTo(.5, .5);

	this.animations.add('stand', ['1.png', '2.png', '3.png', '4.png'], 7, true);
	this.animations.add('right', ['run1.png', 'run2.png', 'run3.png',
					'run4.png'], 10, true);
	this.animations.add('left',
			['run5.png', 'run6.png', 'run7.png', 'run8.png'], 10, true);

	this.animations.play('stand');

	this.notPause = !0;

	this.game.add.existing(this);

};

Pikachu.prototype = Object.create(Phaser.Sprite.prototype);
Pikachu.prototype.constructor = Pikachu;

Pikachu.prototype.update = function() {

	if (this.game.input.activePointer.isDown
			&& this.game.physics.arcade.distanceToPointer(this) > 15
			&& this.notPause) {

		if (this.x < this.game.input.x) {
			this.animations.play('right');
			this.body.velocity.x = 100 * this.level;;
		} else if (this.x > this.game.input.x) {
			this.animations.play('left');
			this.body.velocity.x = -100 * this.level;
		}
	} else {
		this.animations.play('stand');
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}

};

module.exports = Pikachu;

},{}],12:[function(require,module,exports){
'use strict';

var Pokemon = function(game, x, y, frame, pikachu, ball, level) {
	Phaser.Sprite
			.call(this, game, x, y, 'pokemon', frame, pikachu, ball, level);

	// initialize your prefab here
	this._x = x;
	this._y = y;

	this.pikachu = pikachu;
	this.ball = ball;

	this.level = level;
	if (this.level > 3) {
		this.level *= .5;
	} else {
		this.level = 2;
	}

	this.health = 3;

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 + 50 + (30 * i), 30,
				'pokemon', frame[0]);
		life.scale.setTo(0.5, 0.5);
		life.anchor.setTo(0.5, 0.5);
	}

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(36, 40, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.anchor.setTo(.5, .5);
	this.body.immovable = true;
	this.body.maxVelocity.x = 100 * this.level;
	this.body.maxVelocity.y = 50 * this.level;

	this.cachedVelocity = {};
	this.notPause = !0;

	this.animations.add('left', [frame[0], frame[1], frame[2]], 10, true);
	this.animations.add('right', [frame[3], frame[4], frame[5]], 10, true);

	this.game.add.existing(this);

	this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random()
					* 100)
					+ 50, 100 * this.level, this.body.velocity);

	this._levelCompleteSignal = new Phaser.Signal;

	Object.defineProperty(this, "levelCompleteSignal", {
				get : function() {
					return this._levelCompleteSignal
				},
				enumerable : !0,
				configurable : !0
			})

};

Pokemon.prototype = Object.create(Phaser.Sprite.prototype);
Pokemon.prototype.constructor = Pokemon;

Pokemon.prototype.update = function() {

	if (this.body.velocity.x < 0) {

		this.animations.play('left');

	} else if (this.body.velocity.x > 0) {

		this.animations.play('right');
	}

	if (this.notPause && this.y > (this.game.height - 200)) {

		this.body.velocity.y = 0;
		this.body.velocity.y = -Math.floor(Math.random() * 10 * this.level);

	}

	// if (this.game.physics.arcade.distanceBetween(this, this.ball) < 200) {
	// this.game.physics.arcade.moveToObject(this, this.ball, -50);
	// }

	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);

};

Pokemon.prototype.hitBall = function() {

	this.damage();
	var life = this.lives.getFirstAlive();
	if (life) {
		life.kill();
	}

};

Pokemon.prototype.damage = function() {

	this.health -= 1;

	if (this.health <= 0) {
		this._levelCompleteSignal.dispatch();
		this.alive = false;
		this.kill();

		return true;
	}

	return false;

};

Pokemon.prototype.pause = function(status) {

	if (status == 'off') {
		if (this.body) {
			this.body.velocity.x = this.cachedVelocity.x;
			this.body.velocity.y = this.cachedVelocity.y;
			this.notPause = !0;
		}
	} else if (status == 'on') {
		if (this.body) {
			this.cachedVelocity.x = this.body.velocity.x;
			this.cachedVelocity.y = this.body.velocity.y;
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			this.notPause = !1;
		}
	}

};

module.exports = Pokemon;

},{}],13:[function(require,module,exports){
'use strict';

var Pole = function(game, x, y, width, height) {
	Phaser.TileSprite.call(this, game, x, y, width, height, 'pole');

	// initialize your prefab here
	this.autoScroll(20, 0);
	// this.fixedToCamera = true;

	this.game.physics.arcade.enableBody(this);

	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;

	this.game.add.existing(this);

};

Pole.prototype = Object.create(Phaser.TileSprite.prototype);
Pole.prototype.constructor = Pole;

Pole.prototype.update = function() {

	// write your prefab's specific update code here
	// this.tilePosition.x = -this.game.camera.x;
	// this.tilePosition.y = -this.game.camera.y;

};

module.exports = Pole;

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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
	this.events.onInputUp.add(this.switchTextures, this, 0);

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

},{"./simplebutton":14}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
var LevelSettings = require('../prefabs/levelsettings');
var LevelResult = require('../prefabs/levelresult');
var LevelGUI = require('../prefabs/levelgui');
var SimpleButton = require('../prefabs/simplebutton');
var Pikachu = require('../prefabs/pikachu');
var Ball = require('../prefabs/ball');
var Pokemon = require('../prefabs/pokemon');
var Ground = require('../prefabs/ground');
var Pole = require('../prefabs/pole');

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
		
		// add LevelText
		this.addLevelText();

		// add Pole
		this.addPole();

		// add pikachu
		this.addPikachu();
		// add ball
		this.addBall();
		// add pokemon
		this.addPokemon();

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
		this.ground = new Ground(this.game, 0, this.game.height - 98,
				this.game.width, 98);

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
						- 45, "ball", this.pikachu, this.pole,
				this._settings.levelNumber);
		this.ball.levelFailSignal.addOnce(this.levelFail, this);

	},
	addPokemon : function() {

		var frame = [0, 1, 2, 3, 4, 5];
		this.pokemon = new Pokemon(this.game, this.game.width / 2, 100, frame,
				this.pikachu, this.ball, this._settings.levelNumber);
		this.pokemon.levelCompleteSignal.addOnce(this.levelComplete, this);
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
	}
};
module.exports = Level;

},{"../prefabs/ball":2,"../prefabs/ground":3,"../prefabs/levelgui":6,"../prefabs/levelresult":8,"../prefabs/levelsettings":9,"../prefabs/pikachu":11,"../prefabs/pokemon":12,"../prefabs/pole":13,"../prefabs/simplebutton":14}],18:[function(require,module,exports){
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

},{"../prefabs/levelicon":7,"../prefabs/simplebutton":14,"../prefabs/togglebutton":15}],19:[function(require,module,exports){
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
			font : "bold 75px font",
			fill : "#FBAF05",
			align : "center",
			stroke : "#FFFFFF",
			strokeThickness : 12
		};

		var titleTexts = "Poke Pong";

		this.titleText = this.game.add.text(0, 0, titleTexts.toString(), titleStyle);
		this.titleText.anchor.set(.5, .5);
		this.titleText.position.set(this.game.width / 2, 130);
		this.titleText.setShadow(2, 2, "#FB1A05", 2);

	},
	addOtherImages : function() {

		this.pikachu = this.game.add.sprite(this.game.width / 2, this.game.height
						- 80, "pikachu_ball");
		this.pikachu.anchor.set(.5, 1);
		this.pikachu.angle = -2;
		this.pikachu.animations.add('ball', [0, 1, 2, 3, 4, 5 ,6 ,7], 10, true);
		this.pikachu.animations.play('ball');
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
			font : "45px font",
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

		// tween pikachu
		this.pikachu.scale.set(2.5, 2.5);
		this.game.add.tween(this.pikachu.scale).to({
					x : 3,
					y : 3
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
		 this.game.add
				.tween(this.pikachu).to({
							angle : 1
						}, 1200, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0);
	},

	shutdown : function() {
		this.titleText.destroy();
		this.pikachu.destroy();
		this.credits.destroy();
		this.creditText.destroy();
		this.buttons = null
	}

};

module.exports = Menu;

},{"../prefabs/simplebutton":14,"../prefabs/togglebutton":15}],20:[function(require,module,exports){
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
		this.load.image("ground", "assets/graphics/border1.png");
		
		// pole
		this.load.image("pole", "assets/graphics/pole.png");

		// background
		// level complete
		this.load.atlas("bggroup", "assets/graphics/bggroup.png",
				"assets/graphics/bggroup.json");

		// Pikachu
		this.load.atlas("pikachu", "assets/graphics/pikachu.png",
				"assets/graphics/pikachu.json");
		this.load.spritesheet("pikachu_ball",
				"assets/graphics/pikachu_ball55x96.png", 55, 96);

		// Ball
		this.load.image("ball", "assets/graphics/ballred40.png");
		this.load.image("ballblue", "assets/graphics/ballblue40.png");

		// Pokemon
		this.load.atlas("pokemon", "assets/graphics/worm.png",
				"assets/graphics/worm.json");

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