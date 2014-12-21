'use strict';

var Ball = function(game, x, y, pikachu, arrow, win, level) {
	Phaser.Sprite.call(this, game, x, y, 'ballred', pikachu, arrow, level);

	this._x = x;
	this._y = y;
	this.pikachu = pikachu;
	this.arrow = arrow;

	this.level = level;

	this.game.physics.arcade.enableBody(this);

	this.body.setSize(40, 40, 0, 0);
	this.body.collideWorldBounds = !1;
	
	this.body.bounce.setTo(1, 1);
	this.anchor.setTo(.5, .5);

	this.cachedVelocity = {};
	this.startRun = !0;
	this.win = win;
	this.notPause = !0;

	this.animations.add('start', ['01.png', '02.png', '03.png', '04.png'], 2,
			true);
	this.animations.add('ghost', ['05.png', '01.png', '05.png'], 2, true);
	this.animations.play('start');

	this.health = 4;

	this.lives = this.game.add.group();
	for (var i = 0; i < this.health; i++) {

		var life = this.lives.create(this.game.width / 2 - 70 - (50 * i), 45,
				'ballred', '01.png');
		life.scale.setTo(0.9, 0.9);
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
	this.game.physics.arcade.collide(this, this.pikachu, null, null, this);
			
	if (!this.game.world.bounds.contains(this.x, this.y)){
		var win = this.damage();
		
		this.position.set(this.game.width / 2,
				this.game.height - 120);
		this.startRun = !0;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		
		if (win) {this.arrow.visible = !0}
	}

};

Ball.prototype.start = function() {
	this.game.global.enable_sound && this.game.sound.play("plop");
	if (this.alive && this.startRun) {
		this.startRun = !1;
		this.arrow.visible = !1;
		this.game.physics.arcade.velocityFromAngle(this.arrow.angle - 90, 500 + this.level, this.body.velocity);
	}
};

Ball.prototype.damage = function() {

	this.health -= 1;
	this.explode();
	var life = this.lives.getFirstAlive();
	if (life) {
		life.kill();
	}
	if (this.health <= 0) {
		this._levelFailSignal.dispatch();
		this.kill();
		return false;
	} else {
		return true;
	}
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
	
	var ex_x, ex_y;
	if (this.x > this.game.width / 2){
		ex_x = this.x - 50;
	} else {
		ex_x = this.x + 50;
	}
	if (this.y > this.game.height / 2){
		ex_y = this.y - 50;
	} else {
		ex_y = this.y + 50;
	}
	
	this.game.global.enable_sound && this.game.sound.play("player-explosion");
	var explosion = this.explosionPool.getFirstExists(false);
	explosion.reset(ex_x, ex_y);
	explosion.play('boom', 15, false, true);

};

module.exports = Ball;
