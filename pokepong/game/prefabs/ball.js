'use strict';

var Ball = function(game, x, y, ball, pikachu) {
	Phaser.Sprite.call(this, game, x, y, ball, pikachu);

	// initialize your prefab here
	this._x = x;
	this._y = y;
	this.pikachu = pikachu;
	this.health = 3;

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(42, 42, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.anchor.setTo(.5, .5);
	this.body.maxVelocity.x = 300;
	this.body.maxVelocity.y = 300;

	this.cachedVelocity = {};

	// this.animations.add('stand', ['1.png', '2.png', '3.png', '4.png'], 7,
	// true);
	// this.animations.add('right', ['run1.png', 'run2.png', 'run3.png',
	// 'run4.png'], 10, true);
	// this.animations.add('left',
	// ['run5.png', 'run6.png', 'run7.png', 'run8.png'], 10, true);
	// this.animations.play('stand');

	this.game.add.existing(this);

};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {

	this.game.physics.arcade.collide(this, this.pikachu, this.hitPikachu, null,
			this);

};

Ball.prototype.hitPikachu = function() {

	var diff = 0;

	if (this.pikachu.x > this.x) {
		// If ball is in the left hand side on the racket
		diff = this.pikachu.x - this.x;
		this.body.velocity.x += (50 * diff);
	} else if (this.pikachu.x < this.x) {
		// If ball is in the right hand side on the racket
		diff = this.x - this.pikachu.x;
		this.body.velocity.x -= (-50 * diff);
	} else {
		// The ball hit the center of the racket, let's add a little bit of a
		// tragic accident(random) of his movement
		this.body.velocity.x = 2 + Math.random() * 50;
	}

};

Ball.prototype.start = function() {
	if (this.game.input.activePointer.isDown && this.x == this._x
			&& this.y == this._y) {
		this.body.velocity.y = -300
	}
};

Ball.prototype.damage = function() {

	this.health -= 1;

	if (this.health <= 0) {
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
