var ToggleButton = require('./togglebutton');
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

	this.pauseButton = new ToggleButton(this.game, this.game.width - 60, c,
			"buttonsgroup", "pause.png", "play2.png");
	b.add(this.pauseButton);
	// this.pauseButton.callback.addOnce(this.onPause, this);
	this.pauseButton.callback.add(function() {
		b.game.state.getCurrentState().pauseGame();
			// b.onPause();
			// alert("sas");
		});

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
	this.pauseBoard = new PauseBoard(this.game, this);
	this.pauseBoard.visible = !1;
};
Levelgui.prototype.onPause = function() {
	// this.pauseButton.visible = !1;
	this.pauseBoard.show();
};
Levelgui.prototype.onResume = function() {
	// this.pauseButton.visible = !1;
	this.pauseBoard.hide();
};

module.exports = Levelgui;
