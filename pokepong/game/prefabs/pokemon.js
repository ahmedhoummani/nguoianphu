'use strict';

var Pokemon = function(game, x, y, key, frame, ball) {
	Phaser.Sprite.call(this, game, x, y, key, frame, ball);

	// initialize your prefab here
	var x = x, y = y;
	this.ball = ball;
	this.health = 3;

	this.game.physics.arcade.enableBody(this);

	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.anchor.setTo(.5, .5);
	this.body.immovable = true;
	this.body.maxVelocity.x = 200;
	this.body.maxVelocity.y = 200;

	// this.animations.add('stand', ['1.png', '2.png', '3.png', '4.png'], 7,
	// true);
	// this.animations.add('right', ['run1.png', 'run2.png', 'run3.png',
	// 'run4.png'], 10, true);
	// this.animations.add('left',
	// ['run5.png', 'run6.png', 'run7.png', 'run8.png'], 10, true);
	// this.animations.play('stand');

	this.game.add.existing(this);

};

Pokemon.prototype = Object.create(Phaser.Sprite.prototype);
Pokemon.prototype.constructor = Pokemon;

Pokemon.prototype.update = function() {

	if (this.game.input.activePointer.isDown && this.body.velocity.y === 0) {
		this.body.velocity.y = -200
	}

	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);

};

Pokemon.prototype.hitBall = function(ball) {

	var ball = this.ball;
	this.damage();

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
