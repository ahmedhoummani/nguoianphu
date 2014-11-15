'use strict';

var Ball = function(game, x, y, pikachu) {
	Phaser.Sprite.call(this, game, x, y, 'ballred', pikachu);

	// initialize your prefab here

	this.pikachu = pikachu;
	this.health = 3;

	this.game.physics.arcade.enableBody(this);

	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.anchor.setTo(.5, .5);
	this.body.maxVelocity = 200;

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

	if (this.game.input.activePointer.isDown && this.body.velocity.y === 0) {
		this.body.velocity.y = -200
	}

	this.game.physics.arcade
			.collide(this, this.pikachu, this.hitPikachu, null, this);

};

Ball.prototype.hitPikachu = function(pikachu) {

	pikachu = this.pikachu;
	var diff = 0;

	if (pikachu.x > this.x) {
		// If ball is in the left hand side on the racket
		diff = pikachu.x - this.x;
		this.body.velocity.x = (10 * diff);
	} else if (pikachu.x < this.x) {
		// If ball is in the right hand side on the racket
		diff = this.x - pikachu.x;
		this.body.velocity.x = (-10 * diff);
	} else {
		// The ball hit the center of the racket, let's add a little bit of a
		// tragic accident(random) of his movement
		this.body.velocity.x = 2 + Math.random() * 8;
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

module.exports = Ball;
