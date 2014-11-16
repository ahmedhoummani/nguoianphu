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
	this.health = 3;

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 + (30 * i), 30,
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

	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);
	this.game.physics.arcade.collide(this, this.pikachu, this.hitPikachu, null,
			this);

};

Pokemon.prototype.hitBall = function() {

	this.damage();
	var life = this.lives.getFirstAlive();
	if (life) {
		life.kill();
	}

};

Pokemon.prototype.hitPikachu = function() {
	
	alert("ffuf");

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

module.exports = Pokemon;
