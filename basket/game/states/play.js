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
