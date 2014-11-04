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
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],2:[function(require,module,exports){
'use strict';

var Ball = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'ball');

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);
  this.anchor.set(0.5, 0.5);
  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);
  this.body.gravity.y = 1000;

  this.speed = 200;

  this.animations.add('down', [0, 1, 2, 3, 4, 5, 6], 10, true);
  this.animations.add('up', [6, 5, 4, 3, 2, 1, 0], 10, true);

  // clone the current position of the sprite into a new Phaser.Point so we remember where it started
  this.originalPosition = this.position.clone();
  // set it to be draggable
  this.inputEnabled = true;
  this.input.enableDrag();
  this.events.onDragStart.add(this.startDrag, this);
  this.events.onDragStop.add(this.stopDrag, this);

  //	this.game.physics.arcade.velocityFromRotation(this.game.rnd.integerInRange(
  //					30, 60), 200, this.body.velocity);


};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {

  // write your prefab's specific update code here
  if (this.body.velocity.y > 20 || this.body.velocity.x > 20) {

    this.animations.play('down');

  } else if (this.body.velocity.y < -20 || this.body.velocity.x < -20) {

    this.animations.play('up');

  } else {

    this.animations.stop();
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
  //	}


};
Ball.prototype.startDrag = function() {

  // adding a parameter to 'startDrag' and 'stopDrag' allows us to determine which sprite is being dragged
  this.body.moves = false;


};
Ball.prototype.stopDrag = function(mysprite) {

  this.body.moves = true;
  // overlap provides a boolean return value to determine if an overlap has occurred - we'll use this to snap the sprite back in the event it doesn't overlap
  if (!this.game.physics.arcade.overlap(this, mysprite, function() {
    // ... an overlap occurred, so do something here
  })) {
    // ... no overlap occurred so snap the sprite back to the original position by copying the values to the current position
    this.position.copyFrom(this.originalPosition);
  }


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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
var Ball = require('../prefabs/ball');
var Bubble = require('../prefabs/bubble');

'use strict';

function Play() {}
Play.prototype = {
  create: function() {

    // setup the game
    this.game.world.setBounds(0, 0, 320, 480);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Init the object
    this.initBall();
    this.initBubble();

  },
  update: function() {

    // make everything collide
    this.collideObject();

  },
  initBall: function() {

    this.ballGroup = this.game.add.group();

    for (var i = 0; i < 1; i++) {
      this.ball = new Ball(this.game, this.game.width / 2, 40);
      this.ballGroup.add(this.ball);

    }

  },
  initBubble: function() {

    this.bubbleGroup = this.game.add.group();

    // 5 colors
    for (var i = 1; i <= 10; i++) {
      this.color = this.rnd.between(1, 5);
      this.bubble = new Bubble(this.game, this.game.width / 2, this.game.height - 40, this.color);
      this.bubbleGroup.add(this.bubble);

    }

  },

  collideObject: function() {

    this.game.physics.arcade.collide(this.ballGroup, this.bubbleGroup);

  }

};

module.exports = Play;

},{"../prefabs/ball":2,"../prefabs/bubble":3}],8:[function(require,module,exports){
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

		this.load.spritesheet('ball', 'assets/ball_32.png', 32, 32);
		this.load.spritesheet('bubble', 'assets/bubble_color_13.png', 13, 13);
	}

};

module.exports = Preload;

},{}]},{},[1])