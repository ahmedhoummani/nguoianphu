'use strict';

var Ball = function(game, x, y, pikachu, pole, level) {
	Phaser.Sprite.call(this, game, x, y, 'ballred', pikachu, pole, level);

	// initialize your prefab here
	this._x = x;
	this._y = y;
	this.pikachu = pikachu;
	this.pole = pole;

	this.level = level;
	if (this.level > 3) {
		this.level *= .5;
	} else {
		this.level = 2;
	}

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(32, 32, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.anchor.setTo(.5, .5);

	this.body.maxVelocity.x = 100 * (this.level);
	this.body.maxVelocity.y = 100 * (this.level);

	this.cachedVelocity = {};

	this.animations
			.add('start', ['01.png', '02.png', '03.png', '04.png'], 2, true);
	this.animations.add('ghost', ['05.png', '01.png', '05.png'], 2, true);
	this.animations.play('start');

	this.health = 3;
	this.ghostUntil = 1;
	this.ghostUntilTimer = 2000;

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 - 50 - (30 * i), 30,
				'ballred', '01.png');
		life.scale.setTo(0.5, 0.5);
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
			})

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
	this.game.physics.arcade.collide(this, this.pole, this.damage, null, this);

};

Ball.prototype.hitPikachu = function() {

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

Ball.prototype.start = function() {
	if (this.game.input.activePointer.isDown && this.x == this._x
			&& this.y == this._y) {
		this.body.velocity.y = -100 * this.level;
	}
};

Ball.prototype.damage = function() {

	if (this.ghostUntil > this.game.time.now) {
		return;
	}

	this.health -= 1;

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
