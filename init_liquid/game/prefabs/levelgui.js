var SimpleButton = require('./simplebutton');
var LevelCompleteBoard = require('./levelcompleteboard');

'use strict';

var Levelgui = function(b, c) {
	Phaser.Group.call(this, b, b.world, "gui");

	this.levelSettings = c;
	this.initLevelCompleteBoard();
	this.initButtons();

};

Levelgui.prototype = Object.create(Phaser.Group.prototype);
Levelgui.prototype.constructor = Levelgui;

Levelgui.prototype.initButtons = function() {
	var a = this, b = 60, c = new SimpleButton(this.game,
			this.game.width - 160, b, "buttonsgroup", "restart.png");
	c.callback.addOnce(function() {
				a.game.state
						.start("level", !0, !1, a.levelSettings.levelNumber)
			}, this);

	var d = new SimpleButton(this.game, this.game.width - 60, b,
			"buttonsgroup", "menu.png");
	d.callback.addOnce(function() {
				a.game.state.start("levelsmenu")
			});

	

	this.buttons = [c, d];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};

Levelgui.prototype.initLevelCompleteBoard = function() {
	this.levelCompleteBoard = new LevelCompleteBoard(this.game, this,
			this.levelSettings.levelNumber);
	this.levelCompleteBoard.visible = !1
};
Levelgui.prototype.onLevelComplete = function() {
	this.buttons.forEach(function(a) {
				a.visible = !1
			});
	this.levelCompleteBoard.show()
};

module.exports = Levelgui;
