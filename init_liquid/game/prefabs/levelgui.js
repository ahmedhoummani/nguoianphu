var SimpleButton = require('./simplebutton');
var LevelCompleteBoard = require('./levelcompleteboard');
var PauseBoard = require('./pauseboard');

'use strict';

var Levelgui = function(b, c) {
	Phaser.Group.call(this, b, b.world, "gui");

	this.levelSettings = c;
	this.initLevelCompleteBoard();
	this.initButtons();
	this.addPauseBoard();

};

Levelgui.prototype = Object.create(Phaser.Group.prototype);
Levelgui.prototype.constructor = Levelgui;

Levelgui.prototype.initButtons = function() {
	var b = this, c = 60;

	this.pauseButton = new SimpleButton(this.game, this.game.width - 160, c,
			"buttonsgroup", "pause.png");
	this.pauseButton.callback.addOnce(this.onPause, this);

	var d = new SimpleButton(this.game, this.game.width - 60, c,
			"buttonsgroup", "menu.png");
	d.callback.addOnce(function() {
				b.game.state.start("levelsmenu")
			});

	this.buttons = [this.pauseButton, d];
	this.buttons.forEach(function(a) {
				b.add(a)
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

Levelgui.prototype.addPauseBoard = function() {
	this.pauseBoard = new PauseBoard(this.game, this);
	this.pauseBoard.visible = !1
};
//Levelgui.prototype.hidePauseButton = function() {
//	this.pauseButton.inputEnabled = !1;
//	this.game.add.tween(this.pauseButton).to({
//				alpha : 0
//			}, 200, Phaser.Easing.Linear.None, !0);
//};
//Levelgui.prototype.showPauseButton = function() {
//	this.pauseButton.inputEnabled = !0;
//	this.game.add.tween(this.pauseButton).to({
//				alpha : 1
//			}, 100, Phaser.Easing.Linear.None, !0);
//};
Levelgui.prototype.onPause = function() {
	this.buttons.forEach(function(a) {
				a.visible = !1
			});
	this.pauseBoard.show();
};
//Levelgui.prototype.onResume = function() {
//	this.showPauseButton();
//	this.pauseBoard.hide();
//};

module.exports = Levelgui;
