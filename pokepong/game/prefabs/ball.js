'use strict';

var Ball = function(game, x, y, pikachu, trap, level) {
	Phaser.Sprite.call(this, game, x, y, 'ballred', pikachu, trap, level);

	this._x = x;
	this._y = y;
	this.pikachu = pikachu;
	this.trap = trap;

	this.level = level;
	
	// Is the game running under Apache Cordova? PHONEGAP
	if (this.game.device.cordova) {
		if (this.level > 1) {
			this.level *= 8;
		} else {
			this.level = 15;
		}
	
	} else {
		if (this.level > 1) {
			this.level *= 2;
		} else {
			this.level = 4;
		}
	
	}

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(32, 32, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(2, 3);
	this.anchor.setTo(.5, .5);

	this.body.maxVelocity.x = 100 * (this.level);
	this.body.maxVelocity.y = 100 * (this.level);

	this.cachedVelocity = {};
	this.notPause = !0;

	this.animations.add('start', ['01.png', '02.png', '03.png', '04.png'], 2,
			true);
	this.animations.add('ghost', ['05.png', '01.png', '05.png'], 2, true);
	this.animations.play('start');

	this.health = 3;
	this.ghostUntil = 1;
	this.ghostUntilTimer = 2000;

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 - 70 - (50 * i), 30,
				'ballred', '01.png');
		life.scale.setTo(0.7, 0.7);
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
			});

	this.explosionPool = this.game.add.group();
	this.explosionPool.enableBody = true;
	this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.explosionPool.createMultiple(3, 'explosion_boom');
	this.explosionPool.setAll('anchor.x', 0.5);
	this.explosionPool.setAll('anchor.y', 0.5);
	this.explosionPool.forEach(function(explosion) {
				explosion.animations.add('boom');
			});

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
	this.game.physics.arcade.collide(this, this.trap, this.damage, null, this);

};

Ball.prototype.hitPikachu = function() {

	var diff = 0;

	if (this.pikachu.x > this.x) {
		// If ball is in the left hand side on the racket
		diff = this.pikachu.x - this.x;
		this.body.velocity.x -= (100 * diff * this.level);
	} else if (this.pikachu.x < this.x) {
		// If ball is in the right hand side on the racket
		diff = this.x - this.pikachu.x;
		this.body.velocity.x += (100 * diff * this.level);
	} else {
		// The ball hit the center of the racket, let's add a little bit of a
		// tragic accident(random) of his movement
		this.body.velocity.x = this.game.rnd.between(1, 5) * 50 * this.level;
		this.body.velocity.y -= this.game.rnd.between(1, 5) * 50 * this.level;
	}

};

Ball.prototype.start = function() {
	if (this.game.input.activePointer.isDown && this.x == this._x
			&& this.y == this._y) {
		this.body.velocity.y = -300 * this.level;
	}
};

Ball.prototype.damage = function() {

	if (this.ghostUntil > this.game.time.now) {
		return;
	}

	this.health -= 1;
	this.explode();
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
		this.notPause = !0;
		if (this.body) {
			this.body.velocity.x = this.cachedVelocity.x;
			this.body.velocity.y = this.cachedVelocity.y;
		}
	} else if (status == 'on') {
		this.notPause = !1;
		if (this.body) {
			this.cachedVelocity.x = this.body.velocity.x;
			this.cachedVelocity.y = this.body.velocity.y;
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}
	}

};

Ball.prototype.explode = function() {

	if (this.explosionPool.countDead() === 0) {
		return;
	}

	var explosion = this.explosionPool.getFirstExists(false);
	explosion.reset(this.x, this.y);
	explosion.play('boom', 15, false, true);
	// add the original sprite's velocity to the explosion
	// explosion.body.velocity.x = this.body.velocity.x;
	// explosion.body.velocity.y = this.body.velocity.y;

};

module.exports = Ball;
