(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.onload = function () {
  var game = new Phaser.Game(640, 832, Phaser.AUTO, 'pokepong');

		// Is the game running under Apache Cordova Phonegap and Android OS
		// older
		// than 4.3?
			function getAndroidVersion(ua) {
				ua = (ua || navigator.userAgent).toLowerCase();
				var match = ua.match(/android\s([0-9\.]*)/);
				return match ? match[1] : false;
			};
			// getAndroidVersion(); // "4.2.1"
			// parseInt(getAndroidVersion()); // 4
			var andoidVersion = parseFloat(getAndroidVersion()); // 4.2
			if (andoidVersion < 4.3){
				var oldAndroid = true
			} else {
				var oldAndroid = false
			}
  // Global variables
  // call them: this.game.global.phonegap
  game.global = {
  		levels_num: 28,
		phonegap: false,
		old_android: oldAndroid,
		enable_sound: true
		
	};
	
  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('level', require('./states/level'));
  game.state.add('levelsmenu', require('./states/levelsmenu'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":21,"./states/level":22,"./states/levelsmenu":23,"./states/menu":24,"./states/preload":25}],2:[function(require,module,exports){
'use strict';

var Ball = function(game, x, y, pikachu, trap, level) {
	Phaser.Sprite.call(this, game, x, y, 'ballred', pikachu, trap, level);

	this._x = x;
	this._y = y;
	this.pikachu = pikachu;
	this.trap = trap;

	this.level = level;

	if (this.level > 5){
		this.level = 10;
	} else if (this.level > 1) {
		this.level += 4;
	} else {
		this.level = 5;
	}

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(32, 32, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(2, 3);
	this.anchor.setTo(.5, .5);

	this.body.maxVelocity.x = 100 * (this.level);
	this.body.maxVelocity.y = 100 * (this.level);

	this.cachedVelocity = {};
	this.notPause = !0;

	this.animations.add('start', ['01.png', '02.png', '03.png', '04.png'], 2,
			true);
	this.animations.add('ghost', ['05.png', '01.png', '05.png'], 2, true);
	this.animations.play('start');

	this.health = 3;
	this.ghostUntil = 1;
	this.ghostUntilTimer = 2000;

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 - 70 - (50 * i), 45,
				'ballred', '01.png');
		life.scale.setTo(0.7, 0.7);
		life.anchor.setTo(0.5, 0.5);
	}

	this.game.add.existing(this);

	this._levelFailSignal = new Phaser.Signal;

	Object.defineProperty(this, "levelFailSignal", {
				get : function() {
					return this._levelFailSignal
				},
				enumerable : !0,
				configurable : !0
			});

	this.explosionPool = this.game.add.group();
	this.explosionPool.enableBody = true;
	this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.explosionPool.createMultiple(3, 'explosion_boom');
	this.explosionPool.setAll('anchor.x', 0.5);
	this.explosionPool.setAll('anchor.y', 0.5);
	this.explosionPool.forEach(function(explosion) {
				explosion.animations.add('boom');
			});

};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {

	if (this.ghostUntil > this.game.time.now) {
		this.animations.play('ghost');

	} else {
		this.animations.play('start');
		this.ghostUntil = 1;
	}

	this.game.physics.arcade.collide(this, this.pikachu, this.hitPikachu, null,
			this);
	this.game.physics.arcade.collide(this, this.trap, this.damage, null, this);

};

Ball.prototype.hitPikachu = function() {

	this.game.global.enable_sound && this.game.sound.play("plop");
	var diff = 0;
	if (this.pikachu.x > this.x) {
		// If ball is in the left hand side on the racket
		diff = this.pikachu.x - this.x;
		this.body.velocity.x -= (100 * diff * this.level);
	} else if (this.pikachu.x < this.x) {
		// If ball is in the right hand side on the racket
		diff = this.x - this.pikachu.x;
		this.body.velocity.x += (100 * diff * this.level);
	} else {
		// The ball hit the center of the racket, let's add a little bit of a
		// tragic accident(random) of his movement
		this.body.velocity.x = this.game.rnd.between(1, 5) * 50 * this.level;
		this.body.velocity.y -= this.game.rnd.between(1, 5) * 50 * this.level;
	}

};

Ball.prototype.start = function() {
	if (this.game.input.activePointer.isDown && this.x == this._x
			&& this.y == this._y) {
		this.body.velocity.y = -300 * this.level;
	}
};

Ball.prototype.damage = function() {

	if (this.ghostUntil > this.game.time.now) {
		return;
	}

	this.health -= 1;
	this.explode();
	var life = this.lives.getFirstAlive();
	if (life) {
		this.ghostUntil = this.game.time.now + this.ghostUntilTimer;
		// this.play('ghost');
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
		this.notPause = !0;
		if (this.body) {
			this.body.velocity.x = this.cachedVelocity.x;
			this.body.velocity.y = this.cachedVelocity.y;
		}
	} else if (status == 'on') {
		this.notPause = !1;
		if (this.body) {
			this.cachedVelocity.x = this.body.velocity.x;
			this.cachedVelocity.y = this.body.velocity.y;
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}
	}

};

Ball.prototype.explode = function() {

	if (this.explosionPool.countDead() === 0) {
		return;
	}
	this.game.global.enable_sound && this.game.sound.play("player-explosion");
	var explosion = this.explosionPool.getFirstExists(false);
	explosion.reset(this.x, this.y);
	explosion.play('boom', 15, false, true);
	// add the original sprite's velocity to the explosion
	// explosion.body.velocity.x = this.body.velocity.x;
	// explosion.body.velocity.y = this.body.velocity.y;

};

module.exports = Ball;

},{}],3:[function(require,module,exports){
'use strict';

var Ballopening = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'ballopening');

	this.anchor.setTo(.5, .5);

	this.animations.add('open', ['01.png', '02.png', '03.png', '04.png'], 4,
			true);
	this.animations.add('close', ['01.png', '02.png'], 2, true);
	this.animations.play('open');

	this.game.add.existing(this);

};

Ballopening.prototype = Object.create(Phaser.Sprite.prototype);
Ballopening.prototype.constructor = Ballopening;

Ballopening.prototype.update = function() {

};

module.exports = Ballopening;

},{}],4:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height, ground) {
	Phaser.TileSprite.call(this, game, x, y, width, height, ground);
	
	this.game.add.existing(this);

};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

};

module.exports = Ground;

},{}],5:[function(require,module,exports){
'use strict';

var Island = function(game, x, y, ball) {
	Phaser.Sprite.call(this, game, x, y, 'island', ball);

	this.ball = ball;

	this.game.physics.arcade.enableBody(this);
	this.body.setSize(30, 80, 0, 0);
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;
	this.anchor.setTo(.5, .5);

};

Island.prototype = Object.create(Phaser.Sprite.prototype);
Island.prototype.constructor = Island;

Island.prototype.update = function() {
	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);
};

Island.prototype.hitBall = function() {
	
	// avoid case: the ball doesn't come back
	if (this.ball.body.velocity.x > 0){
		this.ball.body.x += this.game.rnd.between(5,10);
	} else if (this.ball.body.velocity.x < 0){
		this.ball.body.x -= this.game.rnd.between(5, 10);
	}

};

module.exports = Island;

},{}],6:[function(require,module,exports){
'use strict';

var Level2pokemon = function(a) {

	this._levelNumber = a;

	var pokemon, pokemon_name, pokemon_type, pokemon_icon, frame_left = [], frame_ghostleft = [], frame_right = [], frame_ghostright = [];

	switch (this._levelNumber) {
		case 1 :
			pokemon = 'weedle', pokemon_name = 'Weedle', pokemon_type = 'grass', pokemon_icon = 'weedle_icon.png', frame_left = [
					'01.png', '02.png', '03.png'], frame_ghostleft = ['07.png',
					'08.png', '09.png'], frame_right = ['04.png', '05.png',
					'06.png'], frame_ghostright = ['10.png', '11.png', '12.png'];
			break;
		case 2 :
			pokemon = 'muk', pokemon_name = 'Muk', pokemon_type = 'sand', pokemon_icon = 'muk_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '04.png'], frame_ghostleft = [
					'09.png', '09.png', '10.png', '10.png'], frame_right = [
					'05.png', '06.png',
					'07.png', '08.png', '08.png'], frame_ghostright = [
					'11.png', '11.png', '12.png', '12.png'];
			break;
		case 3 :
			pokemon = 'beedrill', pokemon_name = 'Beedrill', pokemon_type = 'grass', pokemon_icon = 'beedrill_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png'], frame_ghostleft = [
					'11.png','11.png','12.png','12.png'], frame_right = [
					'06.png','07.png', '08.png', '09.png', '10.png'], frame_ghostright = [
					'11.png','11.png','12.png','12.png'];
			break;
		case 4 :
			pokemon = 'arcanine', pokemon_name = 'Arcanine', pokemon_type = 'sand', pokemon_icon = 'arcanine_icon.png', frame_left = [
					'01.png', '01.png', '02.png', '02.png'], frame_ghostleft = [
					'05.png', '05.png', '06.png', '06.png'], frame_right = [
					'03.png', '03.png', '04.png', '04.png'], frame_ghostright = [
					'07.png', '07.png', '08.png', '08.png'];
			break;
		case 5 :
			pokemon = 'steelix', pokemon_name = 'Steelix', pokemon_type = 'sand', pokemon_icon = 'steelix_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png', '06.png',
					'07.png', '08.png', '09.png'], frame_ghostleft = ['19.png', '20.png', '21.png'], frame_right = ['10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png'], frame_ghostright = ['22.png', '23.png', '24.png'];			
			break;
		case 6 :
			pokemon = 'gyarados', pokemon_name = 'Gyarados', pokemon_type = 'water', pokemon_icon = 'gyarados_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png', '06.png',
					'07.png', '08.png', '09.png', '10.png', '11.png', '12.png'], frame_ghostleft = ['25.png', '25.png', '26.png', '26.png'], frame_right = ['13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png', '24.png'], frame_ghostright = [
					'27.png', '27.png', '28.png', '28.png'];			
			break;
		case 7 :
			pokemon = 'charizard', pokemon_name = 'Charizard', pokemon_type = 'sand', pokemon_icon = 'charizard_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png', '06.png',
					'07.png', '08.png'], frame_ghostleft = ['17.png', '18.png',
					'19.png'], frame_right = ['09.png', '010.png', '11.png',
					'12.png', '13.png', '14.png', '15.png', '16.png'], frame_ghostright = [
					'17.png', '18.png', '19.png'];			
			break;
		default :
			pokemon = 'weedle', pokemon_name = 'Weedle', pokemon_type = 'grass', pokemon_icon = 'weedle_icon.png', frame_left = [
					'01.png', '02.png', '03.png'], frame_ghostleft = ['07.png',
					'08.png', '09.png'], frame_right = ['04.png', '05.png',
					'06.png'], frame_ghostright = ['10.png', '11.png', '12.png'];
	}

	Object.defineProperty(this, "levelNumber", {
				get : function() {
					return this._levelNumber
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "pokemon", {
				get : function() {
					return pokemon
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "pokemon_name", {
				get : function() {
					return pokemon_name
				},
				enumerable : !0,
				configurable : !0
			}),
			
	Object.defineProperty(this, "pokemon_type", {
				get : function() {
					return pokemon_type
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "pokemon_icon", {
				get : function() {
					return pokemon_icon
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "frame_left", {
				get : function() {
					return frame_left
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "frame_ghostleft", {
				get : function() {
					return frame_ghostleft
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "frame_right", {
				get : function() {
					return frame_right
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "frame_ghostright", {
				get : function() {
					return frame_ghostright
				},
				enumerable : !0,
				configurable : !0
			})

};

module.exports = Level2pokemon;

},{}],7:[function(require,module,exports){
var SimpleButton = require('./simplebutton');
var Level2pokemon = require('./level2pokemon');
var Ballopening = require('./ballopening');

'use strict';

var Levelcompleteboard = function(b, c, d) {
	Phaser.Group.call(this, b, c, "Level Complete Board");

	this.levels_num = this.game.global.levels_num;
	this.levelNumber = d;

	this._level2pokemon = new Level2pokemon(this.levelNumber);

	this.addBackGround();
	this.completeboard = this.game.add.image(-10, 250, "bggroup",
			"creditbg.png", this);
	this.completeboard.position.set(this.game.width / 2
					- this.completeboard.width / 2, this.game.height / 2
					- this.completeboard.height / 2);

	this.addBallopening();

	this.initPokemon(this._level2pokemon.pokemon,
			this._level2pokemon.pokemon_name, this._level2pokemon.pokemon_icon);

	this.addButtons();

};

Levelcompleteboard.prototype = Object.create(Phaser.Group.prototype);
Levelcompleteboard.prototype.constructor = Levelcompleteboard;

Levelcompleteboard.prototype.addBackGround = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Levelcompleteboard.prototype.addBallopening = function() {
	this.ballopening = new Ballopening(this.game, this.game.width / 2 + 200,
			this.game.height / 2 - 100);

	this.ballopening.anchor.set(.5, .5)
	this.add(this.ballopening);

};
Levelcompleteboard.prototype.initPokemon = function(key, name, _icon) {
	this.icon = new Phaser.Image(this.game, this.game.width / 2 - 100,
			this.game.height / 2 - 100, key, _icon);

	this.icon.anchor.set(.5, .5)
	this.add(this.icon);

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
	this.completeboard.y -= 200;
	this.completeboard.alpha = 0;
	var b = 500;
	this.game.add.tween(this.completeboard).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0), this.game.add
			.tween(this.completeboard).to({
						y : this.completeboard.y + 200
					}, b, Phaser.Easing.Back.Out, !0);
	var c = b;
	this.buttons.forEach(function(d) {
				d.y -= 200, d.visible = !1, a.game.add.tween(d).to({
							y : d.y + 200
						}, b, Phaser.Easing.Back.Out, !0, c).onStart.addOnce(
						function() {
							d.visible = !0
						}, a), c += 100
			});

	// move the pokemon icon to the openning ball
	var d = Phaser.Math.distance(this.icon.x, this.icon.y, this.ballopening.x,
			this.ballopening.y);
	this.game.add.tween(this.icon).to({
				x : this.ballopening.x,
				y : this.ballopening.y - 56
			}, 2000, Phaser.Easing.Back.In, !0), this.game.add
			.tween(this.icon.scale).to({
						x : .33,
						y : .33
					}, 1000, Phaser.Easing.Back.In, !0, 2000).onComplete
			.addOnce(function() {
						this.icon.kill();
						this.ballopening.animations.play('close');
						this.ballopening.position.set(this.game.width / 2,
								this.game.height / 2 - this.ballopening.height
										/ 2);
					}, this);

};

module.exports = Levelcompleteboard;

},{"./ballopening":3,"./level2pokemon":6,"./simplebutton":16}],8:[function(require,module,exports){
var SimpleButton = require('./simplebutton');
var ToggleButton = require('./togglebutton');

'use strict';

var Levelfailboard = function(b, c, d) {
	Phaser.Group.call(this, b, c, "Level Fail Board");

	this.levels_num = this.game.global.levels_num;
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

},{"./simplebutton":16,"./togglebutton":17}],9:[function(require,module,exports){
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
	
	// delay 1 seconds
	var timeDelay = 0;
	this.pauseButton.callback.add(function() {
			if (this.game.time.now > timeDelay){
					b._pauseSignal.dispatch("pause"),
					timeDelay = this.game.time.now + 1000
				}
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
	this.pauseButton.inputEnabled = !1;
	this.pauseButton.visible = !1;
	this.pauseBoard.show();
};
Levelgui.prototype.onResume = function() {
	this.pauseBoard.hide();
	this.pauseButton.visible = !0;
	this.pauseButton.inputEnabled = !0;
};

module.exports = Levelgui;

},{"./levelcompleteboard":7,"./levelfailboard":8,"./pauseboard":13,"./simplebutton":16}],10:[function(require,module,exports){
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
	if (this.game.global.old_android) {
		var b = this.game.add.text(this.x + 90, this.y + 145, this._levelNumber
						.toString(), a);
		b.anchor.set(.5, .5)

	} else {
		var b = this.game.add.text(0, 0, this._levelNumber.toString(), a);
		b.anchor.set(.5, .5);
		var c = this.game.add.renderTexture(this.width, this.height);
		c.renderXY(this, .5 * this.width, .5 * this.height);
		c.renderXY(b, Math.floor(.5 * this.width), Math.floor(.5 * this.height)
						- 1);
		this.setTexture(c);
		b.destroy();
	}
};

module.exports = Levelicon;

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
var Level2pokemon = require('./level2pokemon');

'use strict';

var Levelstartboard = function(game, parent, level) {
	Phaser.Group.call(this, game, parent.world, "Level Start Board");

	this.levels_num = this.game.global.levels_num;
	this.levelNumber = level;
	this._level2pokemon = new Level2pokemon(this.levelNumber);
	// this._level2pokemon.pokemon
	// this._level2pokemon.pokemon_name
	// this._level2pokemon.pokemon_icon

	this.addBackGround();

	this.startboard = this.game.add.image(0, 0, "bggroup", "creditbg.png", this);
	this.startboard.position.set(this.game.width / 2 - this.startboard.width / 2,
			this.game.height / 2 - this.startboard.height / 2);

	this.initPokemon(this._level2pokemon.pokemon,
			this._level2pokemon.pokemon_name, this._level2pokemon.pokemon_icon);

	this.exists = !1;
	this.visible = !1;

};

Levelstartboard.prototype = Object.create(Phaser.Group.prototype);
Levelstartboard.prototype.constructor = Levelstartboard;

Levelstartboard.prototype.addBackGround = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Levelstartboard.prototype.initPokemon = function(key, name, _icon) {
	this.icon = new Phaser.Image(this.game, this.game.width / 2,
			this.game.height / 2 - 100, key, _icon);
	this.style = {
		font : "76px font",
		fill : "#FBAF05",
		align : "center",
		stroke : "#FFFFFF",
		strokeThickness : 12
	};
	this.text = new Phaser.Text(this.game, this.game.width / 2,
			this.game.height / 2 + 100, name, this.style);
	this.icon.anchor.set(.5, .5)
	this.text.anchor.set(.5, .5);
	this.text.setShadow(2, 2, "#FB1A05", 2);
	this.add(this.icon);
	this.add(this.text);

};
Levelstartboard.prototype.update = function() {

	if (this.game.input.activePointer.isDown) {
		this.hide();
		this.destroy();
	}

};

Levelstartboard.prototype.show = function() {
	this.exists = !0;
	this.visible = !0;

	this.alpha = 0;
	this.startboard.y -= 200;
	this.game.add.tween(this).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0);
	this.game.add.tween(this.startboard).to({
				y : 200
			}, 500, Phaser.Easing.Back.Out, !0).onComplete.addOnce(
			this.onShowComplete, this);

};
Levelstartboard.prototype.onShowComplete = function() {
};

Levelstartboard.prototype.hide = function() {
	this.game.add.tween(this).to({
				alpha : 0
			}, 100, Phaser.Easing.Linear.None, !0, 400);
	this.game.add.tween(this.startboard).to({
				y : 500
			}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
			this.onHideComplete, this);

};
Levelstartboard.prototype.onHideComplete = function() {
	this.exists = !1;
	this.visible = !1;
};

Levelstartboard.prototype.destroy = function() {
	this.startboard.destroy();
	this.icon.destroy();
	this.text.destroy();
};

module.exports = Levelstartboard;

},{"./level2pokemon":6}],13:[function(require,module,exports){
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
					a.menuBtn.inputEnabled = !1,
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

},{"./simplebutton":16,"./togglebutton":17}],14:[function(require,module,exports){
'use strict';

var Pikachu = function(game, x, y, level) {
	Phaser.Sprite.call(this, game, x, y, 'pikachu100', level);

	this.level = level;

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(100, 25, 0, 25);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(0, 0);
	this.body.allowRotation = false;
	this.body.immovable = true;
	this.anchor.setTo(.5, .5);

	this.angle = -8;
	this.game.add.tween(this).to({
				angle : 8
			}, 500, Phaser.Easing.Linear.NONE, true, 0, Number.MAX_VALUE, true);

	this.notPause = !0;

	this.game.add.existing(this);

};

Pikachu.prototype = Object.create(Phaser.Sprite.prototype);
Pikachu.prototype.constructor = Pikachu;

Pikachu.prototype.update = function() {

	if (this.game.input.activePointer.isDown && this.notPause) {
		this.x = this.game.input.x;
		 this.scale.setTo(1.2, 1.2);

	} else {
		 this.scale.setTo(1, 1);

	}

};

module.exports = Pikachu;

},{}],15:[function(require,module,exports){
var Level2pokemon = require('./level2pokemon');

'use strict';

var Pokemon = function(game, x, y, ball, level) {

	this._level2pokemon = new Level2pokemon(level);

	Phaser.Sprite.call(this, game, x, y, this._level2pokemon.pokemon, ball,
			level);

	// initialize your prefab here
	this._x = x;
	this._y = y;

	this.ball = ball;

	this.level = level;
	if (this.level > 5) {
		this.level = 6;
	} else {
		this.level = 4;
	}

	// this.pokemon_type = this._level2pokemon.pokemon_type;
	
	this.health = 3;
	this.ghostUntil = 1;
	this.ghostUntilTimer = 2000;
	var frame = [0, 1, 2, 3, 4, 5];

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 + 40 + (70 * i), 45,
				this._level2pokemon.pokemon, '01.png');
		life.scale.setTo(0.7, 0.7);
		life.anchor.setTo(0.5, 0.5);
	}

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(40, 40, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.anchor.setTo(.5, .5);
	this.body.immovable = true;

	this.cachedVelocity = {};
	this.notPause = !0;

	this.animations.add('left', this._level2pokemon.frame_left, 10, true);
	this.animations.add('ghostleft', this._level2pokemon.frame_ghostleft, 10,
			true);
	this.animations.add('right', this._level2pokemon.frame_right, 10, true);
	this.animations.add('ghostright', this._level2pokemon.frame_ghostright, 10,
			true);

	this.game.add.existing(this);

	this.game.physics.arcade.velocityFromRotation(Math.floor(this.game.rnd
					.between(1, 5)
					* 50), 200, this.body.velocity);

	this._levelCompleteSignal = new Phaser.Signal;

	Object.defineProperty(this, "levelCompleteSignal", {
				get : function() {
					return this._levelCompleteSignal
				},
				enumerable : !0,
				configurable : !0
			});

	this.explosionPool = this.game.add.group();
	this.explosionPool.enableBody = true;
	this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.explosionPool.createMultiple(3, 'explosion');
	this.explosionPool.setAll('anchor.x', 0.5);
	this.explosionPool.setAll('anchor.y', 0.5);
	this.explosionPool.forEach(function(explosion) {
				explosion.animations.add('boom');
			});

};

Pokemon.prototype = Object.create(Phaser.Sprite.prototype);
Pokemon.prototype.constructor = Pokemon;

Pokemon.prototype.update = function() {

	if (this.ghostUntil > this.game.time.now) {
		if (this.body.velocity.x < 0) {

			this.animations.play('ghostleft');

		} else if (this.body.velocity.x > 0) {

			this.animations.play('ghostright');
		}
	} else

	if (this.body.velocity.x < 0) {

		this.animations.play('left');
		this.ghostUntil = 1;

	} else if (this.body.velocity.x > 0) {

		this.animations.play('right');
		this.ghostUntil = 1;
	}

	if (this.notPause && this.y > (this.game.height - 300)) {

		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.body.velocity.y = -Math.floor(this.game.rnd.between(140, 150) + this.level);
		this.body.velocity.x = Math.floor(this.game.rnd.between(140, 150) + this.level);

	}

	// if (this.game.physics.arcade.distanceBetween(this, this.ball) < 200) {
	// this.game.physics.arcade.moveToObject(this, this.ball, -50);
	// }

	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);

};

Pokemon.prototype.hitBall = function() {

	if (this.ghostUntil > this.game.time.now) {
		return;
	}

	this.damage();
	this.explode();
	var life = this.lives.getFirstAlive();
	if (life) {
		this.ghostUntil = this.game.time.now + this.ghostUntilTimer;
		// this.play('ghost');
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

Pokemon.prototype.explode = function() {

	if (this.explosionPool.countDead() === 0) {
		return;
	}
	this.game.global.enable_sound && this.game.sound.play("explosion");
	var explosion = this.explosionPool.getFirstExists(false);
	explosion.reset(this.x, this.y);
	explosion.play('boom', 15, false, true);
	// add the original sprite's velocity to the explosion
	explosion.body.velocity.x = this.body.velocity.x;
	explosion.body.velocity.y = this.body.velocity.y;

};

module.exports = Pokemon;

},{"./level2pokemon":6}],16:[function(require,module,exports){
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
				g.game.global.enable_sound && g.game.sound.play("tap"), g.game.add
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

},{}],17:[function(require,module,exports){
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

},{"./simplebutton":16}],18:[function(require,module,exports){
'use strict';

var Trap = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'saw_spin');

	this.game.physics.arcade.enableBody(this);

	// this.scale.setTo(.8, .8);
	this.anchor.setTo(.5, .5);
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;

	// this.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
	this.animations.add('spin');
	this.animations.play('spin', 10, true);

	this.game.add.existing(this);

};

Trap.prototype = Object.create(Phaser.Sprite.prototype);
Trap.prototype.constructor = Trap;

Trap.prototype.update = function() {

};

module.exports = Trap;

},{}],19:[function(require,module,exports){
'use strict';

var Tree = function(game, x, y, ball) {
	Phaser.Sprite.call(this, game, x, y, 'tree', ball);

	this.ball = ball;

	this.game.physics.arcade.enableBody(this);
	this.body.setSize(30, 80, 0, 0);
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;
	this.anchor.setTo(.5, .5);

};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function() {
	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);
};

Tree.prototype.hitBall = function() {

	// avoid case: the ball doesn't come back
	if (this.ball.body.velocity.x > 0){
		this.ball.body.x += this.game.rnd.between(5,10);
	} else if (this.ball.body.velocity.x < 0){
		this.ball.body.x -= this.game.rnd.between(5, 10);
	}
	
};

module.exports = Tree;

},{}],20:[function(require,module,exports){
'use strict';

var Tutorialhand = function(game, x, y, pikachu) {
	Phaser.Sprite.call(this, game, x, y, 'hands', pikachu);

	this.pikachu = pikachu;
	this.anchor.setTo(.5, .5);

	this.animations.add('hand');
	this.animations.play('hand', 20, true);

	this.game.add.existing(this);
	
	// this.x = this.pikachu.x + 5;
	// this.y = this.pikachu.y + 50
};

Tutorialhand.prototype = Object.create(Phaser.Sprite.prototype);
Tutorialhand.prototype.constructor = Tutorialhand;

module.exports = Tutorialhand;

},{}],21:[function(require,module,exports){
'use strict';

function Boot() {
}

Boot.prototype = {

	init : function() {
		// still load if unfocus
		this.stage.disableVisibilityChange = !0;
		this.game.add.text(100, 100, "Please reload it...");
	},
	preload : function() {
		this.load.image('LoadingBar_Outer', 'assets/LoadingBar_Outer.png');
		this.load.image('LoadingBar_Inner', 'assets/LoadingBar_Inner.png');
	},
	create : function() {
		this.setupStage();
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');
	},
	setupStage : function() {
		var b = this.game.scale;
		b.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		b.pageAlignHorizontally = !0;
		b.pageAlignVertically = !0;
		b.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this);
		b.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this);
		b.setScreenSize(!0);
		
		this.stage.backgroundColor = 11193204;
	},
	onEnterIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px";
	},
	onLeaveIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px";
	}

};

module.exports = Boot;

},{}],22:[function(require,module,exports){
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

},{"../prefabs/ball":2,"../prefabs/ground":4,"../prefabs/island":5,"../prefabs/level2pokemon":6,"../prefabs/levelgui":9,"../prefabs/levelsettings":11,"../prefabs/levelstartboard":12,"../prefabs/pikachu":14,"../prefabs/pokemon":15,"../prefabs/trap":18,"../prefabs/tree":19,"../prefabs/tutorialhand":20}],23:[function(require,module,exports){
var LevelIcon = require('../prefabs/levelicon');
var SimpleButton = require('../prefabs/simplebutton');
var ToggleButton = require('../prefabs/togglebutton');

'use strict';
function Levelsmenu() {
}
Levelsmenu.prototype = {

	init : function() {
		// still load if unfocus
		// it override the state level
		this.stage.disableVisibilityChange = !0;
	},
	create : function() {
		this.levels_num = this.game.global.levels_num;
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

},{"../prefabs/levelicon":10,"../prefabs/simplebutton":16,"../prefabs/togglebutton":17}],24:[function(require,module,exports){
var SimpleButton = require('../prefabs/simplebutton');
var ToggleButton = require('../prefabs/togglebutton');

'use strict';

function Menu() {
	this.fromPreloader = !1;
}

Menu.prototype = {

	init : function(a) {
		// still load if unfocus
		this.stage.disableVisibilityChange = !0;
		this.fromPreloader = a
	},
	create : function() {
		// this.stage.disableVisibilityChange = !0;
		// add menu object

		this.addBackground();
		this.addTitle();
		this.addOtherImages();
		this.addButtons();
		this.initCredits();
		this.initAnimation();

		this.game.global.enable_sound
				&& this.fromPreloader
				&& (this.soundButton.input.enabled = !1, this.soundButton
						.switchTextures(), this.game.input.onTap.addOnce(
						this.startMusic, this));
	},
	onFocusLost : function() {
		// this.game.tweens.pauseAll();
		// this.game.sound.mute = !0;
	},
	onFocus : function() {
		// this.game.tweens.resumeAll();
		// this.game.sound.mute = !1;
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

		this.titleText = this.game.add.text(0, 0, titleTexts.toString(),
				titleStyle);
		this.titleText.anchor.set(.5, .5);
		this.titleText.position.set(this.game.width / 2, 130);
		this.titleText.setShadow(2, 2, "#FB1A05", 2);

	},
	addOtherImages : function() {

		this.pikachu = this.game.add.sprite(this.game.width / 2,
				this.game.height - 80, "pikachu_ball");
		this.pikachu.anchor.set(.5, 1);
		this.pikachu.angle = -5;
		this.pikachu.animations.add('ball', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
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

		this.buttons = [this.playButton, this.soundButton, this.creditsButton];

		this.buttons.forEach(function(a) {
					b.world.add(a);
				});
	},
	hideAndStartGame : function() {
		this.playButton.input.enabled = !1;
		this.playButton.inputEnabled = !1;

		if ("true" === window.localStorage.getItem("1")) {
			this.game.state.start("levelsmenu");
		} else {
			this.game.state.start("level", !0, !1, 1);
		}
	},
	initCredits : function() {

		// credit background
		this.credits = this.game.add.image(0, 0, "bggroup", "creditbg.png");

		this.credits.position.set(Math.round(.5
						* (this.game.width - this.credits.width)), Math
						.round(.5 * (this.game.height - this.credits.height)));
		this.credits.visible = !1;

		// credit text
		var style = {
			font : "30px font",
			fill : "#fff",
			stroke : "#000",
			strokeThickness : 1,
			align : "center"
		};

		var creditTextContent = "www.NguoiAnPhu.com\n\n" + "Game made with\n"
				+ "Phaser JS Framework\n\n" + "Developed by Tuan Vo\n"
				+ "vohungtuan@gmail.com";

		this.creditText = this.game.add.text(0, 0,
				creditTextContent.toString(), style);
		this.creditText.anchor.set(.5, 0);
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
		this.pikachu.scale.set(2, 2);
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
		this.game.add.tween(this.pikachu).to({
					angle : 5
				}, 1200, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
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

},{"../prefabs/simplebutton":16,"../prefabs/togglebutton":17}],25:[function(require,module,exports){
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
		this.load.image("line", "assets/graphics/line.png");
		
		this.load.image("grass", "assets/graphics/grass.png");
		this.load.image("sand", "assets/graphics/sand.png");
		this.load.image("water", "assets/graphics/water.png");

		// trap
		this.load.spritesheet("saw_spin", "assets/graphics/spinning_saw.png",
				70, 69);

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

},{}]},{},[1])