'use strict';

var Pokemon = function(game, x, y, frame, ball) {
	Phaser.Sprite.call(this, game, x, y, 'pokemon', frame, ball);

	// initialize your prefab here
	this._x = x;
	this._y = y;
	this.ball = ball;
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
	this.body.maxVelocity.x = 100;
	this.body.maxVelocity.y = 50;

	this.cachedVelocity = {};

	this.animations.add('left', [frame[0], frame[1], frame[2]], 10, true);
	this.animations.add('right', [frame[3], frame[4], frame[5]], 10, true);

	this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random()
					* 100)
					+ 50, 100, this.body.velocity);

	this.game.add.existing(this);

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

	this.damage();
	var life = this.lives.getFirstAlive();
	if (life) {
		life.kill();
	}

};

Pokemon.prototype.start = function() {
	if (this.game.input.activePointer.isDown && this.x == this._x
			&& this.y == this._y) {
		this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random()
						* 100)
						+ 50, 100, this.body.velocity);
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
