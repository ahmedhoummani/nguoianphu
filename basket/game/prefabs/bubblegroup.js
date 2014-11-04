var Bubble = require('./bubble');

'use strict';

var BubbleGroup = function(game, parent) {
	Phaser.Group.call(this, game, parent);

	// initialize your prefab here
	this.numberOfBubble = 1;

	for (var i = 1; i <= this.numberOfBubble; i++) {
		this.color = this.game.rnd.between(1, 5);
		this.bubble = new Bubble(this.game, this.game.width / 2,
				this.game.height - 40, this.color);
		this.add(this.bubble);

	}

};

BubbleGroup.prototype = Object.create(Phaser.Group.prototype);
BubbleGroup.prototype.constructor = BubbleGroup;
BubbleGroup.prototype.reset = function(x, y) {
	this.exists = true;
};

module.exports = BubbleGroup;
