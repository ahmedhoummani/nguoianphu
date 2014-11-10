var SimpleButton = require('./simplebutton');
var ToggleButton = require('./togglebutton');

'use strict';

var Pauseboard = function(b, c) {
	Phaser.Group.call(this, b, c, "Pause Board");

	this.addBackGround();
	this.board = this.game.add.image(0, 0, "bggroup", "creditbg.png", this);
	this.board.position.set(Math.round(.5
					* (this.game.width - this.board.width)), Math.round(.5
					* (this.game.height - this.board.height)));
	// this.board.visible = !1;
	this.initText();
	this.addButtons();

};

Pauseboard.prototype = Object.create(Phaser.Group.prototype);
Pauseboard.prototype.constructor = Pauseboard;

Pauseboard.prototype.addBackGround = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Pauseboard.prototype.initText = function() {
	var b = "Game Paused", c = {
		font : "56px cantoraone",
		fill : "#FBAF05",
		align : "center",
		stroke : "#FFFFFF",
		strokeThickness : 12
	}, d = new Phaser.Text(this.game, this.game.width / 2,
			this.game.height / 2, b, c);
	d.anchor.set(.5, .5);
	d.setShadow(2, 2, "#FB1A05", 2);
	this.add(d);

};
Pauseboard.prototype.addButtons = function() {
	var a = this, b = 550, c = 120, d = new SimpleButton(this.game,
			this.game.width / 2, b, "buttonsgroup", "menu.png");
	d.callback.addOnce(function() {
				a.game.state.start("levelsmenu")
			}, this);

	var e = new ToggleButton(this.game, d.x - c, b, "buttonsgroup",
			"sound.png", "mute.png");
	e.callback.add(function() {
				a.game.sound.mute = !a.game.sound.mute
			});
	a.game.sound.mute && e.switchTextures();

	var f = new SimpleButton(this.game, d.x + c + .25, b, "buttonsgroup",
			"play2.png");

	this.buttons = [d, e, f];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};
Pauseboard.prototype.show = function() {
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
Pauseboard.prototype.hide = function() {
	// this.game.sound.usingWebAudio && this.game.sound.play("whoosh_out", .33);
	this.game.add.tween(this).to({
				alpha : 0
			}, 100, Phaser.Easing.Linear.None, !0, 400);
	this.game.add.tween(this.position).to({
				y : this.game.height / 2 - 200
			}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
			this.onHideComplete, this);
};
Pauseboard.prototype.onHideComplete = function() {
	this.visible = !1;
},

module.exports = Pauseboard;
