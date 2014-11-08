var SimpleButton = require('../prefabs/simplebutton');
var ToggleButton = require('../prefabs/togglebutton');

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
		this.addButtons();
		this.initCredits();
		this.initAnimation();

		this.fromPreloader
				&& (this.soundButton.input.enabled = !1, this.soundButton
						.switchTextures(), this.game.input.onTap.addOnce(
						this.startMusic, this), this.stage.disableVisibilityChange = !1, this.game.onBlur
						.add(this.onFocusLost, this), this.game.onFocus.add(
						this.onFocus, this));

	},
	update : function() {

	},
	onFocusLost : function() {
		this.game.tweens.pauseAll();
		this.game.sound.mute = !0;
	},
	onFocus : function() {
		this.game.tweens.resumeAll();
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
		var b = this;
		var c = this.game.width / 2 - 50;
		var d = 140;

		this.playButton = new SimpleButton(this.game, this.game.width / 2, c,
				"buttons", "Button_Play0000");
		this.playButton.setCallbackDelay(250);
		this.playButton.callback.addOnce(this.hideAndStartGame, this);

		this.creditsButton = new SimpleButton(this.game, this.playButton.x + d,
				this.playButton.y, "buttons", "Button_Credits0000");
		this.creditsButton.callback.add(this.toggleCredits, this);

		this.soundButton = new ToggleButton(this.game, this.playButton.x - d,
				this.playButton.y, "buttons", "Button_Music_On0000",
				"Button_Music_Off0000");
		this.soundButton.callback.add(function() {
					b.game.sound.mute = !b.game.sound.mute;
				});
		this.game.sound.mute && this.soundButton.switchTextures();

		this.moreGamesButton = new SimpleButton(this.game, this.playButton.x
						+ d, this.playButton.y, "buttons",
				"Button_MoreGames0000");
		this.moreGamesButton.callback.add(this.onMoreGamesClick, this);
		this.moreGamesButton.visible = !1;
		this.moreGamesButton.exists = !1;

		this.buttons = [this.playButton, this.soundButton, this.creditsButton];

		this.buttons.forEach(function(a) {
					b.world.add(a);
				});
	},
	hideAndStartGame : function() {
		this.playButton.input.enabled = !1;
		this.playButton.inputEnabled = !1;
		this.game.state.start("levelsmenu");
	},
	onMoreGamesClick : function() {
		window.open("http://m.softgames.de", "_blank");
	},
	initCredits : function() {
		this.credits = this.game.add.image(0, 0, "main_menu",
				"CreditsBoard0000"), this.credits.position.set(Math.round(.5
						* (this.game.width - this.credits.width)), Math
						.round(.5 * (this.game.height - this.credits.height))), this.credits.visible = !1;
	},
	toggleCredits : function() {
		this.credits.visible ? this.hideCredits() : this.showCredits();
	},
	hideCredits : function() {
		var a = this;
		this.game.add.tween(this.credits).to({
					y : this.credits.y + 200,
					alpha : 0
				}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
				function() {
					a.playButton.input.enabled = !0, a.creditsButton.input.enabled = !0, a.credits.visible = !1;
				}, this);
	},
	showCredits : function() {
		this.credits.visible = !0, this.credits.alpha = 0, this.credits.y = Math
				.round(.5 * (this.game.width - this.credits.height))
				+ 200, this.game.add.tween(this.credits).to({
					y : this.credits.y - 200,
					alpha : 1
				}, 500, Phaser.Easing.Back.Out, !0), this.playButton.input.enabled = !1, this.creditsButton.input.enabled = !1, this.game.input.onTap
				.addOnce(function() {
							this.hideCredits();
						}, this);
	},
	initAnimation : function() {
		var a = this;
		this.title.y -= 280, this.game.add.tween(this.title).to({
					y : this.title.y + 280
				}, 600, Phaser.Easing.Back.Out, !0, 300);
		var b = 800;
		this.buttons.forEach(function(c) {
					c.scale.set(0, 0), a.game.add.tween(c.scale).to({
								x : 1,
								y : 1
							}, 300, Phaser.Easing.Back.Out, !0, b), b += 200
				})
	},
	destroy : function() {
		this.buttons = null
	}

};

module.exports = Menu;