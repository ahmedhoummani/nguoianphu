'use strict';

var Tree = function(game, x, y, ball) {
	Phaser.Sprite.call(this, game, x, y, 'tree', ball);

	this.ball = ball;

	this.game.physics.arcade.enableBody(this);
	this.body.setSize(30, 80, 0, 0);
	this.body.bounce.setTo(1, 1);
	this.body.allowRotation = false;
	this.body.immovable = true;
	this.anchor.setTo(.5, .5);

};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function() {
	this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this);
};

Tree.prototype.hitBall = function() {

	// avoid case: the ball doesn't come back
	if (this.ball.body.velocity.x > 0){
		this.ball.body.x += this.game.rnd.between(5,10);
	} else if (this.ball.body.velocity.x < 0){
		this.ball.body.x -= this.game.rnd.between(5, 10);
	}
	
};

module.exports = Tree;
