var SimpleButton = require('../prefabs/simplebutton');
var ToggleButton = require('../prefabs/togglebutton');

'use strict';

function Menu() {
	this.fromPreloader = !1;
}

Menu.prototype = {

	init : function(a) {
		this.fromPreloader = a
	},
	create : function() {

		// add menu object

		this.addBackground();
		this.addTitle();
		this.addOtherImages();
		this.addButtons();
		this.initCredits();
		this.initAnimation();

		this.game.global.enable_sound
				&& this.fromPreloader
				&& (this.soundButton.input.enabled = !1, this.soundButton
						.switchTextures(), this.game.input.onTap.addOnce(
						this.startMusic, this), this.stage.disableVisibilityChange = !1, this.game.onBlur
						.add(this.onFocusLost, this), this.game.onFocus.add(
						this.onFocus, this));
	},
	onFocusLost : function() {
		// this.game.tweens.pauseAll();
		// this.game.sound.mute = !0;
	},
	onFocus : function() {
		// this.game.tweens.resumeAll();
		// this.game.sound.mute = !1;
	},
	addBackground : function() {
		this.game.add.image(0, 0, "bggroup", "bg.png");
	},
	addTitle : function() {

		var titleStyle = {
			font : "bold 75px font",
			fill : "#FBAF05",
			align : "center",
			stroke : "#FFFFFF",
			strokeThickness : 12
		};

		var titleTexts = "Poke Pong";

		this.titleText = this.game.add.text(0, 0, titleTexts.toString(),
				titleStyle);
		this.titleText.anchor.set(.5, .5);
		this.titleText.position.set(this.game.width / 2, 130);
		this.titleText.setShadow(2, 2, "#FB1A05", 2);

	},
	addOtherImages : function() {

		this.pikachu = this.game.add.sprite(this.game.width / 2,
				this.game.height - 80, "pikachu_ball");
		this.pikachu.anchor.set(.5, 1);
		this.pikachu.angle = -5;
		this.pikachu.animations.add('ball', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		this.pikachu.animations.play('ball');
	},
	addButtons : function() {
		var b = this;
		var c = this.game.width / 2 - 50;
		var d = 140;

		this.playButton = new SimpleButton(this.game, this.game.width / 2, c,
				"buttonsgroup", "play.png");
		this.playButton.setCallbackDelay(250);
		this.playButton.callback.addOnce(this.hideAndStartGame, this);

		this.creditsButton = new SimpleButton(this.game, this.playButton.x + d,
				this.playButton.y, "buttonsgroup", "credit.png");
		this.creditsButton.callback.add(this.toggleCredits, this);

		this.soundButton = new ToggleButton(this.game, this.playButton.x - d,
				this.playButton.y, "buttonsgroup", "sound.png", "mute.png");
		this.soundButton.callback.add(function() {
					b.game.sound.mute = !b.game.sound.mute;
				});
		this.game.sound.mute && this.soundButton.switchTextures();

		this.buttons = [this.playButton, this.soundButton, this.creditsButton];

		this.buttons.forEach(function(a) {
					b.world.add(a);
				});
	},
	hideAndStartGame : function() {
		this.playButton.input.enabled = !1;
		this.playButton.inputEnabled = !1;

		if ("true" === window.localStorage.getItem("1")) {
			this.game.state.start("levelsmenu");
		} else {
			this.game.state.start("level", !0, !1, 1);
		}
	},
	initCredits : function() {

		// credit background
		this.credits = this.game.add.image(0, 0, "bggroup", "creditbg.png");

		this.credits.position.set(Math.round(.5
						* (this.game.width - this.credits.width)), Math
						.round(.5 * (this.game.height - this.credits.height)));
		this.credits.visible = !1;

		// credit text
		var style = {
			font : "30px font",
			fill : "#fff",
			stroke : "#000",
			strokeThickness : 1,
			align : "center"
		};

		var creditTextContent = "www.NguoiAnPhu.com\n\n" + "Game made with\n"
				+ "Phaser JS Framework\n\n" + "Developed by Tuan Vo\n"
				+ "vohungtuan@gmail.com";

		this.creditText = this.game.add.text(0, 0,
				creditTextContent.toString(), style);
		this.creditText.anchor.set(.5, 0);
		this.creditText.position.set(this.game.width / 2, this.game.height / 2);
		this.creditText.setShadow(2, 2, "#666666", 2);

		this.creditText.visible = !1;
	},
	toggleCredits : function() {
		this.credits.visible ? this.hideCredits() : this.showCredits();
	},
	hideCredits : function() {
		var a = this;

		this.game.add.tween(this.creditText).to({
					y : this.creditText.y + 200,
					alpha : 0
				}, 500, Phaser.Easing.Back.In, !0);

		this.game.add.tween(this.credits).to({
					y : this.credits.y + 200,
					alpha : 0
				}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
				function() {
					a.playButton.input.enabled = !0;
					a.creditsButton.input.enabled = !0;
					a.credits.visible = !1;
					a.creditText.visible = !1;
				}, this);
	},
	showCredits : function() {
		this.credits.visible = !0;
		this.creditText.visible = !0;
		this.credits.alpha = 0;

		this.credits.y = Math.round(.5
				* (this.game.width - this.credits.height))
				+ 200;

		this.creditText.y = Math.round(.5
				* (this.game.width - this.creditText.height))
				+ 200;

		this.game.add.tween(this.credits).to({
					y : this.credits.y - 200,
					alpha : 1
				}, 500, Phaser.Easing.Back.Out, !0);

		this.game.add.tween(this.creditText).to({
					y : this.creditText.y - 200,
					alpha : 1
				}, 500, Phaser.Easing.Back.Out, !0);

		this.playButton.input.enabled = !1;
		this.creditsButton.input.enabled = !1;

		this.game.input.onTap.addOnce(function() {
					this.hideCredits();
				}, this);
	},
	startMusic : function() {
		this.game.sound.play("main_loop", .33, !0);
		this.soundButton.switchTextures();
		this.soundButton.input.enabled = !0;
		// this.game.sound.mute = !0;
	},
	initAnimation : function() {
		var a = this;

		// tween title
		this.titleText.y -= 250;
		this.titleText.scale.set(0, 1);
		this.game.add.tween(this.titleText).to({
					y : this.titleText.y + 250
				}, 600, Phaser.Easing.Back.Out, !0, 300);
		this.game.add.tween(this.titleText.scale).to({
					x : 1
				}, 600, Phaser.Easing.Back.Out, !0, 500).onComplete.addOnce(
				this.onTitleAnimationComplete, this);

		// tween pikachu
		this.pikachu.scale.set(2, 2);
		this.game.add.tween(this.pikachu.scale).to({
					x : 3,
					y : 3
				}, 500, Phaser.Easing.Back.Out, !0, 1200).onComplete.addOnce(
				this.onPandaAnimationComplete, this);
		var b = 1500;

		// tween buttons
		this.buttons.forEach(function(c) {
					c.scale.set(0, 0), a.game.add.tween(c.scale).to({
								x : 1,
								y : 1
							}, 300, Phaser.Easing.Back.Out, !0, b), b += 200;
				});
		this.game.time.events.repeat(2e3, 1e3, this.shakePlayButton, this);
	},
	shakePlayButton : function() {
		this.game.add.tween(this.playButton.scale).to({
					x : 1.1,
					y : .9
				}, 150, Phaser.Easing.Cubic.Out, !0, 0, 3, !0);
	},
	onTitleAnimationComplete : function() {
		this.game.add.tween(this.titleText.scale).to({
					x : 1.1,
					y : .9
				}, 600, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0);
	},
	onPandaAnimationComplete : function() {
		this.game.add.tween(this.pikachu).to({
					angle : 5
				}, 1200, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
	},

	shutdown : function() {
		this.titleText.destroy();
		this.pikachu.destroy();
		this.credits.destroy();
		this.creditText.destroy();
		this.buttons = null
	}

};

module.exports = Menu;
