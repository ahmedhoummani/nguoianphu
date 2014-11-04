(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(320, 480, Phaser.AUTO, 'baseket');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/menu":8,"./states/play":9,"./states/preload":10}],2:[function(require,module,exports){
'use strict';

var Ball = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'ball');

	// initialize your prefab here
	this.game.physics.arcade.enableBody(this);
	this.anchor.set(0.5, 0.5);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(0.5, 0.5);
	this.body.gravity.y = -1000;

	this.speed = 500;
	this.ballFly = false;

	this.animations.add('down', [0, 1, 2, 3, 4, 5, 6], 10, true);
	this.animations.add('up', [6, 5, 4, 3, 2, 1, 0], 10, true);

	// clone the current position of the sprite into a new Phaser.Point so we
	// remember where it started
	this.originalPosition = this.position.clone();
	// set it to be draggable
	this.inputEnabled = true;
	this.input.enableDrag();
	this.events.onDragStart.add(this.startDrag, this);
	this.events.onDragStop.add(this.stopDrag, this);

	// this.game.physics.arcade.velocityFromRotation(this.game.rnd.integerInRange(
	// 30, 60), 200, this.body.velocity);

};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {

	// write your prefab's specific update code here

	if (this.body.velocity.y > this.speed || this.body.velocity.x > this.speed) {

		this.body.bounce.setTo(0.5, 0.5);
		this.animations.play('down');
		this.ballFly = true;

	} else if (this.body.velocity.y < -this.speed
			|| this.body.velocity.x < -this.speed) {

		this.body.bounce.setTo(0.5, 0.5);
		this.animations.play('up');
		this.ballFly = true;

	} else {

		this.body.bounce.setTo(0.2, 0.5);
		this.animations.stop();
		this.ballFly = false;

	}

	// if (Math.abs(this.body.velocity.x) != this.speed) {
	// if (this.body.velocity.x > 0)
	// this.body.velocity.x = this.speed;
	// else
	// this.body.velocity.x = -this.speed;
	// }
	// if (Math.abs(this.body.velocity.y) != this.speed) {
	// if (this.body.velocity.y > 0)
	// this.body.velocity.y = this.speed;
	// else
	// this.body.velocity.y = -this.speed;
	// }

};
Ball.prototype.startDrag = function() {

	// adding a parameter to 'startDrag' and 'stopDrag' allows us to determine
	// which sprite is being dragged
	this.body.moves = false;
	this.ballFly = true;

};
Ball.prototype.stopDrag = function(mysprite) {

	this.body.moves = true;
	// overlap provides a boolean return value to determine if an overlap has
	// occurred - we'll use this to snap the sprite back in the event it doesn't
	// overlap
	if (!this.game.physics.arcade.overlap(this, mysprite, function() {
				// ... an overlap occurred, so do something here
			})) {
		// ... no overlap occurred so snap the sprite back to the original
		// position by copying the values to the current position
		this.position.copyFrom(this.originalPosition);
	}
	
	this.ballFly = true;

};

module.exports = Ball;

},{}],3:[function(require,module,exports){
'use strict';

var Bubble = function(game, x, y, color) {
	Phaser.Sprite.call(this, game, x, y, 'bubble', color);

	// initialize your prefab here
	this.color = color;
	this.game.physics.arcade.enableBody(this);
	this.anchor.set(0.5, 0.5);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
		this.body.gravity.y = -1000;

	this.game.physics.arcade.velocityFromRotation(this.game.rnd.integerInRange(
					30, 60), 200, this.body.velocity);
					
	this.animations.add('1', [0, 1, 2], 5, true);
	this.animations.add('2', [3, 4, 5], 5, true);
	this.animations.add('3', [6, 7, 8], 5, true);
	this.animations.add('4', [9, 10, 11], 5, true);
	this.animations.add('5', [12, 13, 14], 5, true);

};

Bubble.prototype = Object.create(Phaser.Sprite.prototype);
Bubble.prototype.constructor = Bubble;

Bubble.prototype.update = function() {

	// write your prefab's specific update code here
	this.animations.play(this.color);

};

module.exports = Bubble;

},{}],4:[function(require,module,exports){
var Bubble = require('./bubble');

'use strict';

var BubbleGroup = function(game, parent) {
	Phaser.Group.call(this, game, parent);

	// initialize your prefab here
	this.numberOfBubble = 1;

	for (var i = 1; i <= this.numberOfBubble; i++) {
		this.color = this.game.rnd.between(1, 5);
		this.bubble = new Bubble(this.game, this.game.width / 2,
				this.game.height - 40, this.color);
		this.add(this.bubble);

	}

};

BubbleGroup.prototype = Object.create(Phaser.Group.prototype);
BubbleGroup.prototype.constructor = BubbleGroup;
BubbleGroup.prototype.reset = function(x, y) {
	this.exists = true;
};

module.exports = BubbleGroup;

},{"./bubble":3}],5:[function(require,module,exports){
'use strict';

var Sky = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'sky');

	// initialize your prefab here

	this.game.physics.arcade.enableBody(this);
	this.anchor.set(0.5, 0.5);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(0, 0);
	this.scale.setTo(2, 1);
	this.body.immovable = true

};

Sky.prototype = Object.create(Phaser.Sprite.prototype);
Sky.prototype.constructor = Sky;

Sky.prototype.update = function() {

	// write your prefab's specific update code here

};

module.exports = Sky;

},{}],6:[function(require,module,exports){
'use strict';

function Boot() {
}

Boot.prototype = {
	preload : function() {
	},

	create : function() {

		this.game.input.maxPointers = 1;
		this.stage.disableVisibilityChange = !0;

		// scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// have the game centered horizontally
		this.scale.pageAlignHorizontally = !0;
		this.scale.pageAlignVertically = !0;

		// screen size will be set automatically
		this.scale.setScreenSize(!0);

		this.game.state.start('preload');

	}

};

module.exports = Boot;

},{}],7:[function(require,module,exports){
'use strict';
function GameOver() {
}

GameOver.prototype = {
	preload : function() {

	},
	create : function() {

	},
	update : function() {

	}
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){
'use strict';

function Menu() {
}

Menu.prototype = {
	preload : function() {

	},
	create : function() {

	},
	update : function() {

	}
};

module.exports = Menu;

},{}],9:[function(require,module,exports){
var Ball = require('../prefabs/ball');
var BubbleGroup = require('../prefabs/bubblegroup');
var Sky = require('../prefabs/sky');

'use strict';

function Play() {
}
Play.prototype = {
	create : function() {

		// setup the game
		this.game.world.setBounds(0, -480, 320, 960);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Init the object

		this.initSky();
		this.initBall();

		this.initBubbles();

	},
	update : function() {

		// make everything collide
		this.collideBallSky();
		this.collideBallBubble();

	},
	initSky : function() {

		this.sky = new Sky(this.game, 0, 20);
		this.game.add.existing(this.sky);

	},
	initBall : function() {

		this.ball = new Ball(this.game, 0, 400);
		this.game.add.existing(this.ball);
		this.game.camera.follow(this.ball);
		this.game.camera.focusOnXY(0.5, 0.5);

	},
	initBubbles : function() {

		this.bubbles = this.game.add.group();
		var bubbleGroup = this.bubbles.getFirstExists(false);

		if (!bubbleGroup) {
			bubbleGroup = new BubbleGroup(this.game, this.bubbles);
		}
		bubbleGroup.reset(100, 100);

	},

	collideBallBubble : function() {

		// enable collisions between the bird and each group in the pipes group
		this.bubbles.forEach(function(bubbleGroup) {
					this.game.physics.arcade.collide(this.ball, bubbleGroup);
				}, this);

	},

	collideBallSky : function() {
		if (!this.ball.ballFly) {
			this.game.physics.arcade.collide(this.ball, this.sky);
		}

	},

	clean : function() {
		this.ball.destroy();
		this.bubbles.destroy();

	}

};

module.exports = Play;

},{"../prefabs/ball":2,"../prefabs/bubblegroup":4,"../prefabs/sky":5}],10:[function(require,module,exports){
'use strict';

function Preload() {
}

Preload.prototype = {
	preload : function() {

		// Add the sprite
		this.addSprite();

	},

	create : function() {
	},

	update : function() {

		this.game.state.start('play');

	},

	addSprite : function() {

		this.load.image('sky', 'assets/sky_bg.png');
		this.load.spritesheet('ball', 'assets/ball_32.png', 32, 32);
		this.load.spritesheet('bubble', 'assets/bubble_color_13.png', 13, 13);
	}

};

module.exports = Preload;

},{}]},{},[1])