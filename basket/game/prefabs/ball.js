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
