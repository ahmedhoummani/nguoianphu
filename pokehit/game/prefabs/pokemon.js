var Level2pokemon = require('./level2pokemon');

'use strict';

var Pokemon = function(game, x, y, ball, level) {

	this._level2pokemon = new Level2pokemon(level);

	Phaser.Sprite.call(this, game, x, y, this._level2pokemon.pokemon, ball,
			level);

	// initialize your prefab here
	this._x = x;
	this._y = y;

	this.ball = ball;

	this.level = level;

	// this.pokemon_type = this._level2pokemon.pokemon_type;
	
	this.health = 2;
	this.ghostUntil = 1;
	this.ghostUntilTimer = 1000;
	var frame = [0, 1, 2, 3, 4, 5];

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 + 70 + (70 * i), 45,
				this._level2pokemon.pokemon, '01.png');
		life.scale.setTo(0.8, 0.8);
		life.anchor.setTo(0.5, 0.5);
	}

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(52, 52, 0, 0);
	this.body.collideWorldBounds = true;
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.anchor.setTo(.5, .5);
	this.body.immovable = true;

	this.cachedVelocity = {};
	this.notPause = !0;

	this.animations.add('left', this._level2pokemon.frame_left, 10, true);
	this.animations.add('ghostleft', this._level2pokemon.frame_ghostleft, 10,
			true);
	this.animations.add('right', this._level2pokemon.frame_right, 10, true);
	this.animations.add('ghostright', this._level2pokemon.frame_ghostright, 10,
			true);

	this.game.add.existing(this);

	this.game.physics.arcade.velocityFromRotation(Math.floor(this.game.rnd
					.between(1, 5)
					* 50), 200 + this.level, this.body.velocity);

	this._levelCompleteSignal = new Phaser.Signal;

	Object.defineProperty(this, "levelCompleteSignal", {
				get : function() {
					return this._levelCompleteSignal
				},
				enumerable : !0,
				configurable : !0
			});

	this.explosionPool = this.game.add.group();
	this.explosionPool.enableBody = true;
	this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.explosionPool.createMultiple(3, 'explosion');
	this.explosionPool.setAll('anchor.x', 0.5);
	this.explosionPool.setAll('anchor.y', 0.5);
	this.explosionPool.forEach(function(explosion) {
				explosion.animations.add('boom');
			});

};

Pokemon.prototype = Object.create(Phaser.Sprite.prototype);
Pokemon.prototype.constructor = Pokemon;

Pokemon.prototype.update = function() {

	if (this.ghostUntil > this.game.time.now) {
		if (this.body.velocity.x < 0) {

			this.animations.play('ghostleft');

		} else if (this.body.velocity.x > 0) {

			this.animations.play('ghostright');
		}
	} else

	if (this.body.velocity.x < 0) {

		this.animations.play('left');
		this.ghostUntil = 1;

	} else if (this.body.velocity.x > 0) {

		this.animations.play('right');
		this.ghostUntil = 1;
	}

	if (this.notPause && this.y > (this.game.height - 300 - this.level)) {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.body.velocity.y = -Math.floor(this.game.rnd.between(140, 150) + this.level);
		this.body.velocity.x = Math.floor(this.game.rnd.between(140, 150) + this.level);
	}

	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);

};

Pokemon.prototype.hitBall = function() {

	if (this.ghostUntil > this.game.time.now) {
		return;
	}

	this.damage();
	this.explode();
	var life = this.lives.getFirstAlive();
	if (life) {
		this.ghostUntil = this.game.time.now + this.ghostUntilTimer;
		life.kill();
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
			this.notPause = !0;
		}
	} else if (status == 'on') {
		if (this.body) {
			this.cachedVelocity.x = this.body.velocity.x;
			this.cachedVelocity.y = this.body.velocity.y;
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			this.notPause = !1;
		}
	}

};

Pokemon.prototype.explode = function() {

	if (this.explosionPool.countDead() === 0) {
		return;
	}
	this.game.global.enable_sound && this.game.sound.play("explosion");
	var explosion = this.explosionPool.getFirstExists(false);
	explosion.reset(this.x, this.y);
	explosion.play('boom', 15, false, true);
	// add the original sprite's velocity to the explosion
	explosion.body.velocity.x = this.body.velocity.x;
	explosion.body.velocity.y = this.body.velocity.y;

};

module.exports = Pokemon;