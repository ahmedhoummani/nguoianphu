var Tree = require('./tree');

'use strict';

var Objects = function(game, parent, ball, pokemon_type) {
	Phaser.Group.call(this, game, "Object group", false, true, parent, ball,
			pokemon_type);

	this.ball = ball;
	this.pokemon_type = pokemon_type;
	this.numberOfTree = 3;

	for (var i = 1; i <= this.numberOfTree; i++) {
		var randomX = this.game.rnd.between(10, this.game.width - 10), randomY = this.game.rnd
				.between(100, this.game.height - 200);
		this.tree = new Tree(this.game, randomX, randomY, this.ball);
		this.add(this.tree);

	}

};

Objects.prototype = Object.create(Phaser.Group.prototype);
Objects.prototype.constructor = Objects;

Objects.prototype.reset = function(x, y) {
	this.exists = true;
};

Objects.prototype.destroy = function(x, y) {
	this.numberOfTree = 0;
	this.removeAll();
};

module.exports = Objects;
