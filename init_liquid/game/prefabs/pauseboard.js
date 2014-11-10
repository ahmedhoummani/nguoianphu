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

	this.initText();
	this.addButtons();
	this.exists = !1;
	this.visible = !1;
	
	Object.defineProperty(this, "resumeButton", {
					get : function() {
						return this._resumeButton;
					},
					enumerable : !0,
					configurable : !0
				});

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
	var a = this, b = 550, c = 120;

	this.menuBtn = new SimpleButton(this.game,
			this.game.width / 2, b, "buttonsgroup", "menu.png");
	this.menuBtn.callback.addOnce(function() {
				a.game.state.start("levelsmenu")
			}, this);

	this.soundBtn = new ToggleButton(this.game, this.menuBtn.x - c, b, "buttonsgroup",
			"sound.png", "mute.png");
	this.soundBtn.callback.add(function() {
				a.game.sound.mute = !a.game.sound.mute
			});
			a.game.sound.mute && e.switchTextures();

	this._resumeButton = new SimpleButton(this.game, this.menuBtn.x + c + .25, b, "buttonsgroup",
			"play2.png");

	this.buttons = [this.menuBtn, this.soundBtn, this._resumeButton];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};
Pauseboard.prototype.show = function() {
	this.exists = !0;
	this.visible = !0;
	this.alpha = 0;
	this.game.add.tween(this).to({
		alpha : 1
	}, 200, Phaser.Easing.Linear.None, !0);
	this.game.add
	.tween(this.position).to({
				y : -100
			}, 500, Phaser.Easing.Back.Out, !0).onComplete
	.addOnce(this.onShowComplete, this);
};
Pauseboard.prototype.onShowComplete = function() {
		};
Pauseboard.prototype.hide = function() {
	this.game.add.tween(this).to({
				alpha : 0
			}, 100, Phaser.Easing.Linear.None, !0, 400);
	this.game.add.tween(this.position).to({
				y :  100
			}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
			this.onHideComplete, this);
};
Pauseboard.prototype.onHideComplete = function() {
	this.exists = !1;
	this.visible = !1;
};
Pauseboard.prototype.destroy = function() {
	this.board.destroy();
	this.buttons = null;
},

module.exports = Pauseboard;
