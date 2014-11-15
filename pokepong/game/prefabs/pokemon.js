'use strict';

var Pokemon = function(game, x, y, frame, ball) {
	Phaser.Sprite.call(this, game, x, y, 'pokemon', frame, ball);

	// initialize your prefab here
	var x = x, y = y;
	this.ball = ball;
	this.health = 3;

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(36, 40 ,0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.anchor.setTo(.5, .5);
	this.body.immovable = true;
	this.body.maxVelocity.x = 100;
	this.body.maxVelocity.y = 50;

	this.animations.add('right', [frame[3], frame[4], frame[5]], 10, true);
	this.animations.add('left', [frame[0], frame[1], frame[2]], 10, true);

	this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random()
					* 100)
					+ 50, 100, this.body.velocity);
	this.game.add.existing(this);

};

Pokemon.prototype = Object.create(Phaser.Sprite.prototype);
Pokemon.prototype.constructor = Pokemon;

Pokemon.prototype.update = function() {

	if (this.body.velocity.x < 0) {

		this.animations.play('left');

	} else if (this.body.velocity.x > 0) {

		this.animations.play('right');
	}

	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);

	if (this.y > (this.game.height - 200)) {

		this.body.velocity.y -= Math.floor(Math.random() * 10);

		if (this.body.velocity.x > 0) {
			this.body.velocity.x += Math.floor(Math.random() * 50);
		} else {
			this.body.velocity.x -= Math.floor(Math.random() * 50);
		}

	}

};

Pokemon.prototype.hitBall = function() {

	// this.damage();

};

Pokemon.prototype.damage = function() {

	this.health -= 1;

	if (this.health <= 0) {
		this.alive = false;
		this.kill();

		return true;
	}

	return false;

};

module.exports = Pokemon;
