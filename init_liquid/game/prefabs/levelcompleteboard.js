var SimpleButton = require('./simplebutton');

'use strict';

var Levelcompleteboard = function(b, c, d) {
	Phaser.Group.call(this, b, c, "Level Complete Board");

	this.levels_num = 28;
	this.levelNumber = d;
	this.addBack();
	this.addButtons();
	this.board = this.game.add.image(-10, 250, "bggroup", "levelcomplete.png",
			this)

};

Levelcompleteboard.prototype = Object.create(Phaser.Group.prototype);
Levelcompleteboard.prototype.constructor = Levelcompleteboard;

Levelcompleteboard.prototype.addBack = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Levelcompleteboard.prototype.addButtons = function() {
	var a = this, b = 550, c = 120, d = new SimpleButton(this.game,
			this.game.width / 2, b, "buttonsgroup", "restart.png");
	d.callback.addOnce(function() {
				a.game.state.start("level", !0, !1, a.levelNumber)
			}, this);

	var e = new SimpleButton(this.game, d.x - c, b, "buttonsgroup", "menu.png");
	e.callback.addOnce(function() {
				a.game.state.start("levelsmenu")
			}, this);

	var f = new SimpleButton(this.game, d.x + c + .25, b, "buttonsgroup",
			"play76.png");
	f.callback.addOnce(function() {
				a.levelNumber === this.levels_num ? a.game.state
						.start("levelsmenu") : a.game.state.start("level", !0,
						!1, a.levelNumber + 1)
			}, this);

	this.buttons = [e, d, f];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};
Levelcompleteboard.prototype.show = function() {
	var a = this;
	this.visible = !0;
	this.board.y -= 200;
	this.board.alpha = 0;
	var b = 500;
	this.game.add.tween(this.board).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0), this.game.add
			.tween(this.board).to({
						y : this.board.y + 200
					}, b, Phaser.Easing.Back.Out, !0);
	var c = b;
	this.buttons.forEach(function(d) {
				d.y -= 200, d.visible = !1, a.game.add.tween(d).to({
							y : d.y + 200
						}, b, Phaser.Easing.Back.Out, !0, c).onStart.addOnce(
						function() {
							d.visible = !0
						}, a), c += 100
			})
};

module.exports = Levelcompleteboard;
