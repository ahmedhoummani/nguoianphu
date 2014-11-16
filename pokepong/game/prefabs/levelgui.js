var SimpleButton = require('./simplebutton');
var LevelCompleteBoard = require('./levelcompleteboard');
var LevelFailBoard = require('./levelfailboard');
var PauseBoard = require('./pauseboard');

'use strict';

var Levelgui = function(b, c) {
	Phaser.Group.call(this, b, b.world, "gui");

	this._pauseSignal = new Phaser.Signal();
	this.levelSettings = c;
	this.initLevelFailBoard();
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

	this.pauseButton = new SimpleButton(this.game, this.game.width - 60, c,
			"buttonsgroup", "pause.png");
	b.add(this.pauseButton);
	this.pauseButton.callback.add(function() {
				b._pauseSignal.dispatch("pause");
			}, this)

};

Levelgui.prototype.initLevelFailBoard = function() {
	this.levelFailBoard = new LevelFailBoard(this.game, this,
			this.levelSettings.levelNumber);
	this.levelFailBoard.visible = !1
};
Levelgui.prototype.onLevelFail = function() {
	this.pauseButton.visible = !1;
	this.levelFailBoard.show()
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
	this.pauseBoard.resumeButton.callback.add(function() {
				a._pauseSignal.dispatch("resume");
			}, this);
};
Levelgui.prototype.onPause = function() {
	this.pauseBoard.show();
	this.pauseButton.visible = !1;
};
Levelgui.prototype.onResume = function() {
	this.pauseBoard.hide();
	this.pauseButton.visible = !0;
};

module.exports = Levelgui;
