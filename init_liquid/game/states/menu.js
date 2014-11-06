'use strict';
function Menu() {
	this.fromPreloader = !1;
}

Menu.prototype = {
	preload : function() {

	},
	create : function() {

		// add menu object

		this.addBackground();
		this.addOtherImages();
//		 this.addButtons();
		// this.initCredits();
		// this.initAnimation();
		// this.fromPreloader
		// && (this.soundButton.input.enabled = !1, this.soundButton
		// .switchTextures(), this.game.input.onTap.addOnce(
		// this.onFirstTap, this), this.game.onBlur.add(
		// this.onFocusLost, this), this.game.onFocus.add(
		// this.onFocus, this));

	},
	update : function() {

	},
	onFocusLost : function() {
		this.game.sound.mute = !0;
	},
	onFocus : function() {
		this.game.sound.mute = !1;
	},
	addBackground : function() {
		this.game.add.image(0, 0, "main_menu", "main_menu_bg");
	},
	addOtherImages : function() {
		this.title = this.game.add.image(this.game.width / 2, 130, "main_menu",
				"Title0000");
		this.title.anchor.set(.5, .5);
		this.panda = this.game.add.image(this.game.width / 2, this.game.height
						- 50, "main_menu", "Panda0000");
		this.panda.anchor.set(.5, 1);
		this.panda.angle = -1;
	},
	addButtons : function() {
		var b = this, c = this.game.width / 2 - 110, d = 140;
		this.playButton = new this.game.SimpleButton(this.game, this.game.width / 2, c,
				"buttons", "Button_Play0000");
		this.playButton.setCallbackDelay(250);
		this.playButton.callback.addOnce(this.hideAndStartGame, this);
		this.creditsButton = new this.game.SimpleButton(this.game, this.playButton.x
						+ d, this.playButton.y, "buttons", "Button_Credits0000");
		this.creditsButton.callback.add(this.toggleCredits, this);
		this.soundButton = new this.game.ToggleButton(this.game, this.playButton.x - d,
				this.playButton.y, "buttons", "Button_Music_On0000",
				"Button_Music_Off0000");
		this.soundButton.callback.add(function() {
					b.game.sound.mute = !b.game.sound.mute;
				});
		this.game.sound.mute && this.soundButton.switchTextures();
		this.moreGamesButton = new this.game.SimpleButton(this.game, this.playButton.x
						+ d, this.playButton.y, "buttons",
				"Button_MoreGames0000");
		this.moreGamesButton.callback.add(this.onMoreGamesClick, this);
		this.moreGamesButton.visible = !1;
		this.moreGamesButton.exists = !1;
		this.buttons = [this.playButton, this.soundButton, this.creditsButton];
		this.buttons.forEach(function(a) {
					b.world.add(a);
				});
	}

};

module.exports = Menu;
