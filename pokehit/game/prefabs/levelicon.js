'use strict';

var Levelicon = function(b, c, d, e, f) {
	Phaser.Image.call(this, b, c, d, "buttonsgroup", "button.png");

	var g = this;
	this.inputEnabled = !f;
	this.locked = f;
	this._levelNumber = e;

	this.anchor.set(.5, .5);
	this.createGraphics();
	this.inputEnabled
			&& (this.game.device.desktop && (this.input.useHandCursor = !0), this.events.onInputDown
					.add(function() {
						g.game.sound.play("tap", .75), g.tint *= .995, g.game.add
								.tween(g.scale).to({
											x : .9,
											y : .9
										}, 200, Phaser.Easing.Cubic.Out, !0)
					}), this.events.onInputUp.add(function() {
						g.tint = 16777215, g.game.add.tween(g.scale).to({
									x : 1,
									y : 1
								}, 200, Phaser.Easing.Cubic.Out, !0)
					}));

	Object.defineProperty(this, "levelNumber", {
				get : function() {
					return this._levelNumber
				},
				enumerable : !0,
				configurable : !0
			})

};

Levelicon.prototype = Object.create(Phaser.Image.prototype);
Levelicon.prototype.constructor = Levelicon;

Levelicon.prototype.createGraphics = function() {
	this.locked ? this.createLockedGraphics() : this.createUnlockedGraphics()
};
Levelicon.prototype.createLockedGraphics = function() {
	this.loadTexture("buttonsgroup", "buttonlock.png")
};
Levelicon.prototype.createUnlockedGraphics = function() {
	var a = {
		font : "48px font",
		fill : "#218DB7",
		align : "center"
	};
	if (this.game.global.old_android) {
		var b = this.game.add.text(this.x + 90, this.y + 145, this._levelNumber
						.toString(), a);
		b.anchor.set(.5, .5)

	} else {
		var b = this.game.add.text(0, 0, this._levelNumber.toString(), a);
		b.anchor.set(.5, .5);
		var c = this.game.add.renderTexture(this.width, this.height);
		c.renderXY(this, .5 * this.width, .5 * this.height);
		c.renderXY(b, Math.floor(.5 * this.width), Math.floor(.5 * this.height)
						- 1);
		this.setTexture(c);
		b.destroy();
	}
};

module.exports = Levelicon;
