var LevelSettings = require('../prefabs/levelsettings');
var LevelResult = require('../prefabs/levelresult');
var LevelGUI = require('../prefabs/levelgui');
var SimpleButton = require('../prefabs/simplebutton');

'use strict';

function Level() {
}
Object.defineProperty(this, "settings", {
			get : function() {
				return this._settings
			},
			enumerable : !0,
			configurable : !0
		});

Level.prototype = {

	init : function(b) {
	
		this._settings = new LevelSettings(b);
	},

	create : function() {

		this.levels_num = 28;

		this.game.add.text(100, 100, this._settings.levelNumber.toString());

		// hack
		var e = new SimpleButton(this.game, 200, 200, "buttonsgroup",
				"play2.png");
		this.world.add(e);
		e.callback.addOnce(this.levelComplete, this);

		// level gui menu
		this.addGui();
	},
	gotoPrevLevel : function() {
		var b = this._settings.levelNumber;
		c = 1 === b ? this.levels_num : b - 1;
		this.gotoLevel(c)
	},
	gotoNextLevel : function() {
		var b = this._settings.levelNumber;
		c = b >= this.levels_num ? 1 : b + 1;
		this.gotoLevel(c)
	},
	gotoLevel : function(a) {
		this.game.state.start("level", !0, !1, a)
	},

	levelComplete : function() {
		// this.game.device.webAudio && this.game.sound.play("levelcomplete");
		this.saveLevelResult();
		this.gui.onLevelComplete()
	},
	saveLevelResult : function() {
		window.localStorage.setItem(this._settings.levelNumber.toString(),
				"true")
	},
	
	addGui : function() {
		this.gui = new LevelGUI(this.game, this._settings);
		this.gui.pauseSignal.add(this.togglePause, this);
	},
	togglePause : function(a) {
			"pause" === a ? this.pauseGame() : "resume" === a
					&& this.resumeGame();
	},
	pauseGame : function() {
			 this.gui.onPause();
	}, 
	resumeGame : function() {
			this.gui.onResume();
	},

	shutdown : function() {
		this.gui.destroy();
	}
};
module.exports = Level;
