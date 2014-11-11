var ToggleButton = require('./togglebutton');
var LevelCompleteBoard = require('./levelcompleteboard');
var PauseBoard = require('./pauseboard');

'use strict';

var Levelgui = function(b, c) {
	Phaser.Group.call(this, b, b.world, "gui");

	this._pauseSignal = new Phaser.Signal();
	this.levelSettings = c;
	this.initLevelCompleteBoard();
	this.initButtons();
	this.addPauseBoard();
	
	Object.defineProperty(this, "pauseSignal", {
					get : function() {
						return this._pauseSignal;
					},
					enumerable : !0,
					configurable : !0
				});

};

Levelgui.prototype = Object.create(Phaser.Group.prototype);
Levelgui.prototype.constructor = Levelgui;

Levelgui.prototype.initButtons = function() {
	var b = this, c = 60;

	this.pauseButton = new ToggleButton(this.game, this.game.width - 60, c,
			"buttonsgroup", "pause.png", "play2.png");
	b.add(this.pauseButton);
	this.pauseButton.callback.add(
					function() {
						b._pauseSignal.dispatch("pause");
					}, this)

};

Levelgui.prototype.initLevelCompleteBoard = function() {
	this.levelCompleteBoard = new LevelCompleteBoard(this.game, this,
			this.levelSettings.levelNumber);
	this.levelCompleteBoard.visible = !1
};
Levelgui.prototype.onLevelComplete = function() {
	this.pauseButton.visible = !1;
	this.levelCompleteBoard.show()
};

Levelgui.prototype.addPauseBoard = function() {
	var a = this;
	this.pauseBoard = new PauseBoard(this.game, this);
	this.pauseBoard.resumeButton.callback
					.add(function() {
								a._pauseSignal.dispatch("resume");
							}, this);
};
Levelgui.prototype.onPause = function() {
	this.pauseBoard.show();
};
Levelgui.prototype.onResume = function() {
	this.pauseBoard.hide();
};
//Levelgui.prototype.destroy = function() {
//	this.pauseButton.destroy();
//	this.levelCompleteBoard.destroy();
//	this.pauseBoard.destroy();
//	
//};

module.exports = Levelgui;
