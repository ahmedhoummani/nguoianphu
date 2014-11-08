function onLoad() {
	new game.Main();
}

var __extends = this.__extends || function(a, b) {
	function c() {
		this.constructor = a;
	}
	for (var d in b)
		b.hasOwnProperty(d) && (a[d] = b[d]);
	c.prototype = b.prototype, a.prototype = new c();
}, utils;

!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			"undefined" == typeof c && (c = 0), "undefined" == typeof d
					&& (d = 0), a.call(this, b, b.stage, "FPS Meter"), this.x = c, this.y = d, this
					.initBackground(), this.initText(), this.game.time.advancedTiming = !0;
		}
		return __extends(b, a), b.prototype.initBackground = function() {
			var a = 80, b = new Phaser.Graphics(this.game, 0, 0);
			b.beginFill(0, 1), b.drawRect(0, 0, a, 22), b.endFill(), this.bg = new Phaser.Image(
					this.game, -12, -9, "test"), this.bg.setTexture(b
					.generateTexture()), this.add(this.bg), b.destroy(), b = null;
		}, b.prototype.initText = function() {
			var a = {
				font : "18px Consolas",
				fill : "#FFFFFF",
				align : "center"
			};
			this.statsText = this.game.add.text(5, 0, "0 fps", a, this);
		}, b.prototype.update = function() {
			var a = "FPS: " + this.game.time.fps;
			this.statsText.setText(a);
		}, b.prototype.destroy = function() {
			this.game.time.advancedTiming = !1, a.prototype.destroy.call(this);
		}, b;
	}(Phaser.SpriteBatch);
	a.FPSMeter = b;
}(utils || (utils = {}));

var game;

!function(a) {
	var b = function() {
		function a() {
		}
		return a.GAME_WIDTH = 640, a.GAME_HEIGHT = 832, a.HALF_GAME_WIDTH = .5
				* a.GAME_WIDTH, a.HALF_GAME_HEIGHT = .5 * a.GAME_HEIGHT, a;
	}();
	a.Config = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c() {
			b.apply(this, arguments);
		}
		return __extends(c, b), c.prototype.init = function() {
			this.game.device.android
					&& !this.game.device.chrome
					&& (this.game.canvas.parentElement.style.overflow = "visible");
			var a = {
				font : "45px GrilledCheeseBTNToasted",
				fill : "#FFFFFF",
				align : "center"
			}, b = this.add.text(0, 0, "0", a);
			b.setText("Loading..."), b.destroy();
		}, c.prototype.preload = function() {
			this.load.image("rotate", "assets/graphics/rotate-phone.png"), this.load
					.atlasJSONHash("preloader",
							"assets/graphics/preloader.png",
							"assets/graphics/preloader.json");
		}, c.prototype.create = function() {
			this.setupStage(), this.detectWeakDevice(), this.addFPSMeter(), this.input.maxPointers = 1, this.game.state
					.start("Preloader", !0, !1);
		}, c.prototype.setupStage = function() {
			var b = this.game.scale;
			b.scaleMode = Phaser.ScaleManager.SHOW_ALL, b.minWidth = .25
					* a.Config.GAME_WIDTH, b.minHeight = .25
					* a.Config.GAME_HEIGHT, b.aspectRatio = a.Config.GAME_WIDTH
					/ a.Config.GAME_HEIGHT, b.pageAlignHorizontally = !0, b.pageAlignVertically = !0, this.game.device.desktop
					|| b.forceOrientation(!1, !0), b.enterIncorrectOrientation
					.add(this.onEnterIncorrectOrientation, this), b.leaveIncorrectOrientation
					.add(this.onLeaveIncorrectOrientation, this), b
					.setScreenSize(!0), this.stage.disableVisibilityChange = !0, this.stage.backgroundColor = 11193204;
		}, c.prototype.detectWeakDevice = function() {
			var b = !1;
			if (this.game.device.desktop === !1) {
				var c = detect.parse(window.navigator.userAgent);
				this.game.device.iOS
						&& (c.os.major < 7 && (b = !0), c.browser.family
								.indexOf("Chrome") > -1
								&& (b = !0)), this.game.device.android
						&& (c.browser.family.indexOf("Android") > -1
								&& (b = !0), c.browser.family
								.indexOf("Chrome Mobile") > -1
								&& c.browser.major <= 18 && (b = !0)), this.game.device.windowsPhone
						&& c.browser.family.indexOf("IE") > -1
						&& (b = c.browser.major < 10);
			}
			a.Main.weakDevice = b;
		}, c.prototype.addFPSMeter = function() {
			if (a.Main.development) {
				var b = new utils.FPSMeter(this.game, 0, a.Config.GAME_HEIGHT
								- 22);
				b.position.set(0, a.Config.GAME_HEIGHT - 22);
			}
		}, c.prototype.onEnterIncorrectOrientation = function() {
			document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px";
		}, c.prototype.onLeaveIncorrectOrientation = function() {
			document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px", this.game.device.android
					&& !this.game.device.chrome
					&& this.game.scale.setScreenSize(!0), this.game.time.events
					.repeat(500, 3, this.game.scale.setScreenSize, this);
		}, c.prototype.render = function() {
		}, c;
	}(Phaser.State);
	a.Boot = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c() {
			b.apply(this, arguments);
		}
		return __extends(c, b), c.prototype.create = function() {
		}, c.prototype.addSplash = function() {
			var b = this.game.add.image(0, 0, "splash_screen");
			b.anchor.set(.5, .5), b.x = a.Config.HALF_GAME_WIDTH, b.y = a.Config.HALF_GAME_HEIGHT, this.game.add
					.tween(b.scale).to({
								x : .5,
								y : .5
							}, 1500, Phaser.Easing.Linear.None, !0);
		}, c.prototype.gotoMainMenu = function() {
			this.game.input.onTap.removeAll(), this.game.state.start(
					"MainMenu", !0, !1, !0);
		}, c;
	}(Phaser.State);
	a.SplashScreen = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(c, d) {
			b.call(this, c, d), this.overlayDuration = 300, this.active = !0;
			var e = c.add.bitmapData(a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT,
					"overlay", !0);
			e.context.fillStyle = "rgba(0, 0, 0, 1)", e.context.fillRect(0, 0,
					a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT), this.overlay = new Phaser.Image(
					c, 0, 0, e), this.overlay.visible = !1, this.overlay.exists = !1, this.game.stage
					.addChild(this.overlay);
		}
		return __extends(c, b), c.prototype.changeState = function(a, b) {
			this.showOverlay(a, b);
		}, c.prototype.showOverlay = function(a, b) {
			var c = this;
			this.game.input.disabled = !0, this.overlayTween
					&& this.overlayTween.isRunning && this.overlayTween.stop(), this.overlay.visible = !0, this.overlay.alpha = 0, this.overlayTween = this.game.add
					.tween(this.overlay).to({
								alpha : 1
							}, this.overlayDuration, Phaser.Easing.Cubic.Out,
							!0), this.overlayTween.onComplete.addOnce(
					function() {
						c.doChangeState(a, b);
					}, this);
		}, c.prototype.doChangeState = function(a, b) {
			var c = this;
			this.game.state.start(a, !0, !1, b), setTimeout(function() {
						c.hideOverlay();
					}, 100), setTimeout(function() {
						c.overlay.visible = !1, c.overlay.exists = !1;
					}, 100 + this.overlayDuration);
		}, c.prototype.hideOverlay = function() {
			this.game.input.disabled = !1, this.overlayTween
					&& this.overlayTween.isRunning && this.overlayTween.stop(), this.overlayTween = this.game.add
					.tween(this.overlay).to({
								alpha : 0
							}, this.overlayDuration, Phaser.Easing.Cubic.Out,
							!0);
		}, c;
	}(Phaser.Plugin);
	a.StateTransition = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c() {
			b.apply(this, arguments);
		}
		return __extends(c, b), c.prototype.preload = function() {
			this.initPreloadBar(), this.addLoadingText(), this.loadAssets();
		}, c.prototype.initPreloadBar = function() {
			if (a.Main.development === !1) {
				var b = this.add.image(0, 0, "preloader", "Panda_Back0000");
				b.anchor.set(.5, .5), b.x = a.Config.HALF_GAME_WIDTH, b.y = a.Config.HALF_GAME_HEIGHT, b.angle = -90;
				var c = this.game.add.sprite(0, 0, "preloader",
						"Panda_Front0000");
				c.x = a.Config.HALF_GAME_WIDTH - .5 * c.width - 17, c.y = a.Config.HALF_GAME_HEIGHT
						+ .5 * c.height - 11, c.angle = -90, this.load
						.setPreloadSprite(c);
			}
		}, c.prototype.addLoadingText = function() {
			var b = {
				font : "45px GrilledCheeseBTNToasted",
				fill : "#FFFFFF",
				align : "center"
			};
			this.loadingText = this.game.add.text(0, 0, "0%", b), this.loadingText.anchor
					.set(.5, .5), this.loadingText.position.set(
					a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT + 180), this.loadingText
					.setShadow(2, 2, "#666666", 2), this.loadingText.update();
		}, c.prototype.loadAssets = function() {
			this.load.bitmapFont("timer", "assets/fonts/timer.png",
					"assets/fonts/timer.fnt", null, 1), this.load.bitmapFont(
					"level_label", "assets/fonts/level_label.png",
					"assets/fonts/level_label.fnt", null, 1), this.load
					.bitmapFont("fruit_labels",
							"assets/fonts/fruit_labels.png",
							"assets/fonts/fruit_labels.fnt", null, 3), this.load
					.json("texts", "assets/texts.json"), this.game.sound.usingWebAudio
					&& (this.load.audio("tap", ["assets/audio/tap.wav"], !0), this.load
							.audio("select_fruit", ["assets/audio/plop.ogg",
											"assets/audio/plop.m4a"], !0), this.load
							.audio("star_appear", [
											"assets/audio/star_appear.ogg",
											"assets/audio/star_appear.m4a"], !0), this.load
							.audio("level_up", ["assets/audio/level_up.ogg",
											"assets/audio/level_up.m4a"], !0), this.load
							.audio("game_over", ["assets/audio/Game_Over.ogg",
											"assets/audio/Game_Over.m4a"], !0), this.load
							.audio("clock", ["assets/audio/Ticking_Clock.ogg",
											"assets/audio/Ticking_Clock.m4a"],
									!0), this.load.audio("powerup", [
									"assets/audio/line_powerup.ogg",
									"assets/audio/line_powerup.m4a"], !0), this.load
							.audio("panda_chew", [
											"assets/audio/panda_chew.ogg",
											"assets/audio/panda_chew.m4a"], !0), this.load
							.audio("whoosh", ["assets/audio/whoosh.wav"], !0), this.game.device.firefox === !1
							? (this.load.audio("panda_mmm", [
											"assets/audio/panda_mmm.ogg",
											"assets/audio/panda_mmm.m4a"], !0), this.load
									.audio(
											"star_move",
											["assets/audio/star_move.ogg",
													"assets/audio/star_move.m4a"],
											!0), this.load.audio("whoosh_out",
									["assets/audio/whoosh_out.wav"], !0))
							: (this.load.audio("panda_mmm",
									["assets/audio/panda_mmm.m4a"], !0), this.load
									.audio("star_move",
											["assets/audio/star_move.m4a"], !0))), this.load
					.audio("main_loop", ["assets/audio/main_loop.ogg",
									"assets/audio/main_loop.m4a"], !0), this.load
					.atlasJSONHash("graphics_1",
							"assets/graphics/level_graphics.png",
							"assets/graphics/level_graphics.json"), this.load
					.atlasJSONHash("main_menu",
							"assets/graphics/main_menu.png",
							"assets/graphics/main_menu.json"), this.load
					.atlasJSONHash("buttons", "assets/graphics/buttons.png",
							"assets/graphics/buttons.json"), this.load
					.atlasJSONHash("panda", "assets/graphics/panda.png",
							"assets/graphics/panda.json"), this.load
					.atlasJSONHash("tutorial", "assets/graphics/tutorial.png",
							"assets/graphics/tutorial.json"), this.load
					.atlasJSONHash("tutorial_hand",
							"assets/graphics/tutorial_hand.png",
							"assets/graphics/tutorial_hand.json"), this.load
					.atlasJSONHash("leafs", "assets/graphics/leafs.png",
							"assets/graphics/leafs.json"), this.load
					.atlasJSONHash("splashes", "assets/graphics/splashes.png",
							"assets/graphics/splashes.json");
		}, c.prototype.loadUpdate = function() {
			this.loadingText.setText(this.load.progress.toString() + "%");
		}, c.prototype.create = function() {
			this.initLanguage(), this.generateRestartOverlayTexture(), this.game.plugins
					.add(new a.StateTransition(this.game, this)), this.game.state
					.start("MainMenu", !0, !1, !0);
		}, c.prototype.initLanguage = function() {
			var b = this.game.cache.getJSON("texts");
			a.Main.language = "en", a.Main.texts = b[a.Main.language];
		}, c.prototype.getAvailableLanguages = function(a) {
			var b = [];
			for (var c in a)
				a.hasOwnProperty(c) && b.push(c);
			return b;
		}, c.prototype.generateRestartOverlayTexture = function() {
			var b = this.game.add.bitmapData(a.Config.GAME_WIDTH,
					a.Config.GAME_HEIGHT, "restart_overlay", !0);
			b.fill(255, 255, 255);
		}, c;
	}(Phaser.State);
	a.Preloader = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c, d, e, f) {
			var g = this;
			a.call(this, b, c, d, e, f), this.callbackDelay = 20, this.callbackTimer = 0, this.clicked = !1, this._callback = new Phaser.Signal(), this.anchor
					.set(.5, .5), this.inputEnabled = !0, this.game.device.desktop
					&& (this.input.useHandCursor = !0), this.inputEnabled
					&& this.events.onInputDown.add(function() {
						g.game.device.webAudio && g.game.sound.play("tap"), g.game.add
								.tween(g.scale).to({
											x : 1.2,
											y : .8
										}, 200, Phaser.Easing.Back.Out, !0).onComplete
								.addOnce(function() {
									g.clicked = !0, g.callbackTimer = 0, g.game.add
											.tween(g.scale).to({
														x : 1,
														y : 1
													}, 200,
													Phaser.Easing.Back.Out, !0);
								}, g);
					});
		}
		return __extends(b, a), b.prototype.setCallbackDelay = function(a) {
			this.callbackDelay = a;
		}, b.prototype.update = function() {
			this.clicked
					&& (this.callbackTimer += this.game.time.elapsed, this.callbackTimer >= this.callbackDelay
							&& (this._callback.dispatch(), this.clicked = !1, this.callbackTimer = 0));
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this), this._callback.dispose(), this._callback = null;
		}, Object.defineProperty(b.prototype, "callback", {
					get : function() {
						return this._callback;
					},
					enumerable : !0,
					configurable : !0
				}), b;
	}(Phaser.Image);
	a.SimpleButton = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c, d, e, f, g) {
			a.call(this, b, c, d, e, f), this.spriteSheet = e, this.textureKey1 = f, this.textureKey2 = g, this.activeTextureKey = this.textureKey1, this._state = 1, this.events.onInputUp
					.add(this.switchTextures, this, 2);
		}
		return __extends(b, a), b.prototype.switchTextures = function() {
			this.activeTextureKey = this.activeTextureKey === this.textureKey1
					? this.textureKey2
					: this.textureKey1, this.loadTexture(this.spriteSheet,
					this.activeTextureKey), this._state = this.activeTextureKey === this.textureKey1
					? 1
					: 2;
		}, Object.defineProperty(b.prototype, "state", {
					get : function() {
						return this._state;
					},
					enumerable : !0,
					configurable : !0
				}), b;
	}(game.SimpleButton);
	a.ToggleButton = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c() {
			b.apply(this, arguments), this.fromPreloader = !1;
		}
		return __extends(c, b), c.prototype.init = function(a) {
			this.fromPreloader = a;
		}, c.prototype.create = function() {
			this.addBackground(), this.addOtherImages(), this.addButtons(), this
					.initCredits(), this.initAnimation(), this.fromPreloader
					&& (this.soundButton.input.enabled = !1, this.soundButton
							.switchTextures(), this.game.input.onTap.addOnce(
							this.onFirstTap, this), this.game.onBlur.add(
							this.onFocusLost, this), this.game.onFocus.add(
							this.onFocus, this));
		}, c.prototype.onFocusLost = function() {
			a.Main.wasMuted = this.game.sound.mute, this.game.sound.mute = !0;
		}, c.prototype.onFocus = function() {
			a.Main.wasMuted === !1 && (this.game.sound.mute = !1);
		}, c.prototype.addBackground = function() {
			this.game.add.image(0, 0, "main_menu", "main_menu_bg");
		}, c.prototype.addOtherImages = function() {
			this.title = this.game.add.image(a.Config.HALF_GAME_WIDTH, 130,
					"main_menu", "Title0000"), this.title.anchor.set(.5, .5), this.panda = this.game.add
					.image(a.Config.HALF_GAME_WIDTH, a.Config.GAME_HEIGHT - 50,
							"main_menu", "Panda0000"), this.panda.anchor.set(
					.5, 1), this.panda.angle = -1;
		}, c.prototype.addButtons = function() {
			var b = this, c = a.Config.HALF_GAME_HEIGHT - 110, d = 140;
			this.playButton = new a.SimpleButton(this.game,
					a.Config.HALF_GAME_WIDTH, c, "buttons", "Button_Play0000"), this.playButton
					.setCallbackDelay(250), this.playButton.callback.addOnce(
					this.hideAndStartGame, this), this.creditsButton = new a.SimpleButton(
					this.game, this.playButton.x + d, this.playButton.y,
					"buttons", "Button_Credits0000"), this.creditsButton.callback
					.add(this.toggleCredits, this), this.soundButton = new a.ToggleButton(
					this.game, this.playButton.x - d, this.playButton.y,
					"buttons", "Button_Music_On0000", "Button_Music_Off0000"), this.soundButton.callback
					.add(function() {
								b.game.sound.mute = !b.game.sound.mute;
							}), this.game.sound.mute
					&& this.soundButton.switchTextures(), this.moreGamesButton = new a.SimpleButton(
					this.game, this.playButton.x + d, this.playButton.y,
					"buttons", "Button_MoreGames0000"), this.moreGamesButton.callback
					.add(this.onMoreGamesClick, this), this.moreGamesButton.visible = !1, this.moreGamesButton.exists = !1, this.buttons = [
					this.playButton, this.soundButton, this.creditsButton], this.buttons
					.forEach(function(a) {
								b.world.add(a);
							});
		}, c.prototype.onMoreGamesClick = function() {
			window.open("http://m.softgames.de", "_blank");
		}, c.prototype.initCredits = function() {
			this.credits = this.game.add.image(0, 0, "main_menu",
					"CreditsBoard0000"), this.credits.position
					.set(
							Math
									.round(.5
											* (a.Config.GAME_WIDTH - this.credits.width)),
							Math
									.round(.5
											* (a.Config.GAME_HEIGHT - this.credits.height))), this.credits.visible = !1;
		}, c.prototype.toggleCredits = function() {
			this.credits.visible ? this.hideCredits() : this.showCredits();
		}, c.prototype.hideCredits = function() {
			var a = this;
			this.game.add.tween(this.credits).to({
						y : this.credits.y + 200,
						alpha : 0
					}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
					function() {
						a.playButton.input.enabled = !0, a.creditsButton.input.enabled = !0, a.credits.visible = !1;
					}, this);
		}, c.prototype.showCredits = function() {
			var b = this;
			this.credits.visible = !0, this.credits.alpha = 0, this.credits.y = Math
					.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height))
					+ 200, this.game.add.tween(this.credits).to({
						y : this.credits.y - 200,
						alpha : 1
					}, 500, Phaser.Easing.Back.Out, !0), this.playButton.input.enabled = !1, this.creditsButton.input.enabled = !1, this.game.input.onTap
					.addOnce(function() {
								b.hideCredits();
							}, this);
		}, c.prototype.onFirstTap = function() {
			this.stage.disableVisibilityChange = !1, this.tryFullscreen(), this
					.startMusic();
		}, c.prototype.tryFullscreen = function() {
			this.game.device.android
					&& (this.game.scale.startFullScreen(!0), this.game.scale
							.setScreenSize(!0));
		}, c.prototype.startMusic = function() {
			var a = this.game.device.android ? .66 : .33;
			this.game.sound.play("main_loop", a, !0), this.soundButton
					.switchTextures(), this.soundButton.input.enabled = !0;
		}, c.prototype.initAnimation = function() {
			var a = this;
			this.title.y -= 250, this.title.scale.set(0, 1), this.game.add
					.tween(this.title).to({
								y : this.title.y + 250
							}, 600, Phaser.Easing.Back.Out, !0, 300), this.game.add
					.tween(this.title.scale).to({
								x : 1
							}, 600, Phaser.Easing.Back.Out, !0, 500).onComplete
					.addOnce(this.onTitleAnimationComplete, this), this.panda.scale
					.set(0, 0), this.game.add.tween(this.panda.scale).to({
						x : .85,
						y : .85
					}, 500, Phaser.Easing.Back.Out, !0, 1200).onComplete
					.addOnce(this.onPandaAnimationComplete, this);
			var b = 1500;
			this.buttons.forEach(function(c) {
						c.scale.set(0, 0), a.game.add.tween(c.scale).to({
									x : 1,
									y : 1
								}, 300, Phaser.Easing.Back.Out, !0, b), b += 200;
					}), this.game.time.events.repeat(2e3, 1e3,
					this.shakePlayButton, this);
		}, c.prototype.shakePlayButton = function() {
			this.game.add.tween(this.playButton.scale).to({
						x : 1.1,
						y : .9
					}, 150, Phaser.Easing.Cubic.Out, !0, 0, 3, !0);
		}, c.prototype.onTitleAnimationComplete = function() {
			a.Main.weakDevice === !1
					&& this.game.add.tween(this.title.scale).to({
								x : 1.1,
								y : .9
							}, 600, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4,
							!0);
		}, c.prototype.onPandaAnimationComplete = function() {
			this.game.add.tween(this.panda.scale).to({
						y : .88
					}, 600, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0), this.game.add
					.tween(this.panda).to({
								angle : 1
							}, 1200, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4,
							!0);
		}, c.prototype.hideAndStartGame = function() {
			this.playButton.input.enabled = !1, this.playButton.inputEnabled = !1, this.game
					.changeState(a.Main.stats.tutorialViewed
							? "Level"
							: "Tutorial");
		}, c.prototype.destroy = function() {
			this.buttons = null;
		}, c;
	}(Phaser.State);
	a.MainMenu = b;
}(game || (game = {}));

var utils;

!function(a) {
	var b = function() {
		function a() {
		}
		return a.distanceSquared = function(a, b, c, d) {
			var e = c - a, f = d - b;
			return e * e + f * f;
		}, a.distance = function(b, c, d, e) {
			var f = a.distanceSquared(b, c, d, e);
			return Math.sqrt(f);
		}, a.realInRange = function(a, b) {
			return Math.random() * (b - a) + a;
		}, a.integerInRange = function(b, c) {
			return Math.round(a.realInRange(b, c));
		}, a.lowPrecisionSin = function(a) {
			var b;
			return -3.14159265 > a ? a += 6.28318531 : a > 3.14159265
					&& (a -= 6.28318531), b = 0 > a ? 1.27323954 * a
					+ .405284735 * a * a : 1.27323954 * a - .405284735 * a * a;
		}, a.lowPrecisionCos = function(a) {
			var b;
			return -3.14159265 > a ? a += 6.28318531 : a > 3.14159265
					&& (a -= 6.28318531), a += 1.57079632, a > 3.14159265
					&& (a -= 6.28318531), b = 0 > a ? 1.27323954 * a
					+ .405284735 * a * a : 1.27323954 * a - .405284735 * a * a;
		}, a.DEG_TO_RAD = .017453292519943295, a.RAD_TO_DEG = 57.29577951308232, a;
	}();
	a.MathUtil = b;
}(utils || (utils = {}));

var utils;

!function(a) {
	var b = function() {
		function a(a) {
			"undefined" == typeof a && (a = null), this.itemsNum = 0, this.pointer = 0, a
					&& a.length > 0 && this.setItems(a);
		}
		return a.prototype.setItems = function(a) {
			this.items = a, this.itemsNum = this.items.length;
		}, a.prototype.getItem = function() {
			for (var a = 0; a < this.itemsNum; a++) {
				var b = this.items[a];
				if (b.alive === !1)
					return b.onRemoveFromPool(), b;
			}
			return null;
		}, a.prototype.getItemByProperty = function(a, b) {
			for (var c = 0; c < this.itemsNum; c++) {
				var d = this.items[c];
				if (d.alive === !1 && d[a] === b)
					return d.onRemoveFromPool(), d;
			}
			return null;
		}, a.prototype.returnItem = function(a) {
			a.alive = !1, a.onAddToPool();
		}, a.prototype.doReset = function() {
			for (var a = 0; a < this.itemsNum; a++) {
				var b = this.items[a];
				b.alive && b.onAddToPool();
			}
		}, a.prototype.destroy = function() {
			this.items.length = 0, this.items = null;
		}, a;
	}();
	a.ObjectPool = b;
}(utils || (utils = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c), this.initImage(d), this.initText();
		}
		return __extends(b, a), b.prototype.initImage = function(a) {
			this.image = this.game.add.image(0, 0, "level_graphics", a, this);
		}, b.prototype.initText = function() {
			this.textLabel = this.game.add.bitmapText(0, 0, "digits", "0", 30,
					this), this.textLabel.position.set(55, 6);
		}, b.prototype.updateText = function(a) {
			this.textLabel.setText(a.toString());
		}, b;
	}(Phaser.Group);
	a.Label = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, c), this.allCollected = !1, this.initFruitImage(), this
					.initCheckImage(), this.initText();
		}
		return __extends(c, b), c.prototype.setMinitask = function(a) {
			this.minitask = a, this.minitask.updatedSignal.add(this.updateText,
					this), this.minitask.completeSignal.addOnce(
					this.setAllCollected, this), this.reset(), this
					.updateFruitImage(), this
					.updateText(this.minitask.itemsToComplete);
		}, c.prototype.reset = function() {
			this.allCollected = !1, this.hideCheckImage(), this.text.visible = !0, this.fruitImage.alpha = 1;
		}, c.prototype.hideCheckImage = function() {
			this.checkImage.exists = !1, this.checkImage.visible = !1;
		}, c.prototype.updateFruitImage = function() {
			var b = a.ItemType[this.minitask.fruitType] + "_Task0000";
			this.fruitImage.loadTexture("graphics_1", b);
		}, c.prototype.initFruitImage = function() {
			this.fruitImage = this.game.add.image(0, 0, "graphics_1",
					"Fruit_10000", this), this.fruitImage.anchor.set(.5, .5);
		}, c.prototype.initCheckImage = function() {
			this.checkImage = this.game.add.image(10, 20, "graphics_1",
					"Check0000", this), this.checkImage.anchor.set(.5, .5), this.checkImage.exists = !1, this.checkImage.visible = !1;
		}, c.prototype.initText = function() {
			this.text = this.game.add.bitmapText(5, 2, "fruit_labels", "0", 28,
					this);
		}, c.prototype.updateText = function(a) {
			this.text.setText(a.toString());
		}, c.prototype.setAllCollected = function() {
			this.allCollected === !1
					&& (this.allCollected = !0, this.fruitImage.alpha = .4, this.text.visible = !1, this
							.showCheckedImage());
		}, c.prototype.showCheckedImage = function() {
			this.checkImage.exists = !0, this.checkImage.visible = !0, this.checkImage.scale
					.set(0, 0), this.game.add.tween(this.checkImage.scale).to({
						x : 1,
						y : 1
					}, 300, Phaser.Easing.Back.Out, !0);
		}, c.prototype.destroy = function() {
			this.fruitImage = null, this.checkImage = null, this.text = null, this.minitask
					&& (this.minitask = null);
		}, c;
	}(Phaser.Group);
	a.FruitLabel = b;
}(game || (game = {}));

var game;

!function(a) {
	!function(a) {
		a[a.Fruit_1 = 0] = "Fruit_1", a[a.Fruit_2 = 1] = "Fruit_2", a[a.Fruit_3 = 2] = "Fruit_3", a[a.Fruit_4 = 3] = "Fruit_4", a[a.Fruit_5 = 4] = "Fruit_5";
	}(a.ItemType || (a.ItemType = {}));
	a.ItemType;
}(game || (game = {}));

var game;

!function(a) {
	var b = function() {
		function a(a, b) {
			this._itemsToComplete = 0, this._collectedItems = 0, this._complete = !1, this._fruitType = a, this._itemsToComplete = b, this._updatedSignal = new Phaser.Signal(), this._completeSignal = new Phaser.Signal();
		}
		return a.prototype.addCollectedItems = function(a) {
			this._complete === !1
					&& (this._collectedItems += a, this._updatedSignal
							.dispatch(this._itemsToComplete
									- this._collectedItems), this._collectedItems >= this._itemsToComplete
							&& (this._complete = !0, this._completeSignal
									.dispatch()));
		}, a.prototype.destroy = function() {
			this._updatedSignal.dispose(), this._updatedSignal = null, this._completeSignal
					.dispose(), this._completeSignal = null;
		}, Object.defineProperty(a.prototype, "updatedSignal", {
					get : function() {
						return this._updatedSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(a.prototype, "completeSignal", {
					get : function() {
						return this._completeSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(a.prototype, "fruitType", {
					get : function() {
						return this._fruitType;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(a.prototype, "itemsToComplete", {
					get : function() {
						return this._itemsToComplete;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(a.prototype, "complete", {
					get : function() {
						return this._complete;
					},
					enumerable : !0,
					configurable : !0
				}), a;
	}();
	a.MiniTask = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, c), this.initLabels();
		}
		return __extends(c, b), c.prototype.initLabels = function() {
			this.labels = [];
			for (var b = 0, c = 84, d = 5, e = 0; d > e; e++) {
				var f = new a.FruitLabel(this.game, this);
				f.position.set(b, 0), f.exists = !1, f.visible = !1, this.labels
						.push(f), b += c;
			}
		}, c.prototype.syncWithTask = function(a) {
			for (var b = this.labels.length, c = 0; b > c; c++) {
				var d = this.labels[c], e = a[c];
				e
						? (d.setMinitask(e), d.exists = !0, d.visible = !0)
						: (d.exists = !1, d.visible = !1);
			}
		}, c.prototype.updateFruitLabel = function(a, b) {
			var c = this.getLabelByType(a);
			c && c.updateText(b);
		}, c.prototype.setAsChecked = function(a) {
			var b = this.getLabelByType(a);
			b && b.setAllCollected();
		}, c.prototype.getLabelByType = function(a) {
			for (var b = this.labels.length, c = 0; b > c; c++) {
				var d = this.labels[c];
				if (d.type === a)
					return d;
			}
			return null;
		}, c.prototype.destroy = function() {
			this.labels = null;
		}, c;
	}(Phaser.Group);
	a.FruitLabelCollection = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(c) {
			b.call(this, c, 0, 0, "panda"), this.anchor.set(.5, 1), this
					.initAnimations(), a.Main.weakDevice === !1
					&& this.game.add.tween(this.scale).to({
								y : 1.05
							}, 700, Phaser.Easing.Sinusoidal.Out, !0, 0,
							Number.MAX_VALUE, !0);
		}
		return __extends(c, b), c.prototype.initAnimations = function() {
			this.idleAnim = this.addAnimation("idle", 0, 0), this.openMouthAnim = this
					.addAnimation("open_mouth", 1, 1), this.chewAnim = this
					.addAnimation("chew", 2, 35), this.chewAnim.onComplete.add(
					this.onChewComplete, this), this.play("idle");
		}, c.prototype.addAnimation = function(a, b, c) {
			var d = Phaser.Animation.generateFrameNames("Panda", b, c, "", 4), e = this.animations
					.add(a, d, 60);
			return e;
		}, c.prototype.onChewComplete = function() {
			this.play("idle");
		}, c.prototype.openMouth = function() {
			this.play("open_mouth", 60, !1), this.game.sound.usingWebAudio
					&& Math.random() < .33 && this.game.sound.play("panda_mmm");
		}, c.prototype.chew = function() {
			this.play("chew", 60, !1), this.game.sound.usingWebAudio
					&& this.game.sound.play("panda_chew", .75);
		}, c.prototype.isMouthOpen = function() {
			return "open_mouth" === this.animations.currentAnim.name;
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0);
		}, c;
	}(Phaser.Sprite);
	a.Panda = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c) {
			a.call(this, b, c, "task_timer"), this.initIcon(), this.initText(), this.tickSound = this.game.add
					.sound("clock", .33, 3);
		}
		return __extends(b, a), b.prototype.initIcon = function() {
			this.icon = this.game.add.image(0, 0, "graphics_1", "Timer0000",
					this), this.icon.anchor.set(.5, .5);
		}, b.prototype.initText = function() {
			this.text = this.game.add.bitmapText(.5 * this.icon.width + 7, -15,
					"timer", "00:00", 30, this);
		}, b.prototype.setTimer = function(a) {
			this.timer && (this.timer = null), this.timer = a, this.timer.secondPassedSignal
					.add(this.onSecondPassed, this), this.timer.stopSignal.add(
					this.onTimerStop, this), this
					.updateText(this.timer.remainingSeconds);
		}, b.prototype.onTimerStop = function() {
			this.tickSound.stop();
		}, b.prototype.onSecondPassed = function(a) {
			this.updateText(a), 10 >= a
					? (this.playTickSound(), this.game.add.tween(this.text).to(
							{
								y : this.text.y + 3
							}, 100, Phaser.Easing.Back.Out, !0, 0, 3, !0))
					: this.tickSound.stop();
		}, b.prototype.playTickSound = function() {
			this.tickSound.isPlaying === !1 && this.tickSound.play();
		}, b.prototype.updateText = function(a) {
			var b = Math.floor(a / 60), c = a % 60, d = 10 > b ? "0"
					+ b.toString() : b.toString(), e = 10 > c ? "0"
					+ c.toString() : c.toString(), f = d + ":" + e;
			this.text.setText(f);
		}, b.prototype.destroy = function() {
			this.removeTimer(), this.tickSound.stop(), this.text = null, this.icon = null;
		}, b.prototype.removeTimer = function() {
			this.timer = null;
		}, b;
	}(Phaser.Group);
	a.TaskTimerView = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, c, "complete_board"), this.hideDuration = 600, this.exists = !1, this.visible = !1, this._playAgainSignal = new Phaser.Signal(), this
					.initBack(), this.initTitleText(), this.initTextContent(), this
					.initButtons();
		}
		return __extends(c, b), c.prototype.initBack = function() {
			this.back = this.game.add.image(0, 0, "graphics_1",
					"TaskBoard_Back0000", this), this.back.anchor.set(.5, .5);
		}, c.prototype.initTitleText = function() {
			var b = a.Main.texts.game_over, c = {
				font : "46px GrilledCheeseBTNToasted",
				fill : "#FBAF05",
				align : "center"
			};
			this.titleText = new Phaser.Text(this.game, 0, -106, b, c), this.titleText.anchor
					.set(.5, .5), this.titleText.stroke = "#FFFFFF", this.titleText.strokeThickness = 10, this.titleText
					.setShadow(2, 2, "#FB1A05", 2), this.add(this.titleText);
		}, c.prototype.initTextContent = function() {
			this.addText(a.Main.texts.max_level, -40), this.maxLevelText = this
					.addText("10", -5), this.addText(a.Main.texts.scores, 60), this.pointsText = this
					.addText("10450", 95);
		}, c.prototype.addText = function(a, b) {
			var c = {
				font : "34px GrilledCheeseBTNToasted",
				fill : "#FFFFFF",
				align : "center"
			}, d = new Phaser.Text(this.game, 0, b, a, c);
			return d.anchor.set(.5, .5), d.setShadow(2, 2, "#FB1A05", 2), this
					.add(d), d;
		}, c.prototype.initButtons = function() {
			var b = this, c = 80, d = this.back.y + .5 * this.back.height + 20;
			this.playAgainButton = new a.SimpleButton(this.game, -c, d,
					"buttons", "Button_Restart0000"), this.playAgainButton.callback
					.add(this.onPlayAgainButtonClick, this), this.quitButton = new a.SimpleButton(
					this.game, c, d, "buttons", "Button_Menu0000"), this.quitButton.callback
					.add(this.onQuitButtonClick, this), this.buttons = [
					this.playAgainButton, this.quitButton], this.buttons
					.forEach(function(a) {
								a.exists = !1, a.visible = !1, b.add(a);
							});
		}, c.prototype.onPlayAgainButtonClick = function() {
			this.hide();
		}, c.prototype.onQuitButtonClick = function() {
			this.game.sound.play("main_loop", .33, !0), this.game
					.changeState("MainMenu");
		}, c.prototype.show = function(a, b) {
			this.exists = !0, this.visible = !0, this.maxLevelText.setText(a
					.toString()), this.pointsText.setText(b.toString()), this
					.showBoard(), this.showButtons();
		}, c.prototype.showBoard = function() {
			this.alpha = 0, this.position.set(a.Config.HALF_GAME_WIDTH,
					a.Config.HALF_GAME_HEIGHT - 50), this.game.add.tween(this)
					.to({
								alpha : 1
							}, 100, Phaser.Easing.Linear.None, !0), this.game.add
					.tween(this.position).to({
								y : a.Config.HALF_GAME_HEIGHT
							}, 1500, Phaser.Easing.Cubic.Out, !0);
		}, c.prototype.showButtons = function() {
			var a = this, b = 1200;
			this.buttons.forEach(function(c) {
				c.exists = !0, c.visible = !0, c.alpha = 0, a.game.add.tween(c)
						.to({
									alpha : 1
								}, 500, Phaser.Easing.Cubic.Out, !0, b), b += 200;
			});
		}, c.prototype.hide = function() {
			var b = 100;
			this.game.add.tween(this).to({
						alpha : 0
					}, b, Phaser.Easing.Linear.None, !0, this.hideDuration - b), this.game.add
					.tween(this.position).to({
								y : a.Config.HALF_GAME_HEIGHT - 200
							}, this.hideDuration, Phaser.Easing.Back.In, !0).onComplete
					.addOnce(this.onHideComplete, this);
		}, c.prototype.onHideComplete = function() {
			this._playAgainSignal.dispatch(), this.exists = !1, this.visible = !1;
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0, !1), this.buttons = null, this._playAgainSignal
					.dispose(), this._playAgainSignal = null;
		}, Object.defineProperty(c.prototype, "playAgainSignal", {
					get : function() {
						return this._playAgainSignal;
					},
					enumerable : !0,
					configurable : !0
				}), c;
	}(Phaser.Group);
	a.GameOverBoard = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(c) {
			b.call(this, c, 0, 0, a.Main.texts.level_complete, {
						font : "94px GrilledCheeseBTNToasted",
						fill : "#FBAF05",
						align : "center"
					}), this.showDelay = 650, this.showDuration = 500, this.waitDelay = 750, this.hideDuration = 400, this.stroke = "#FFFFFF", this.strokeThickness = 12, this
					.setShadow(2, 2, "#FB1A05", 3), this.exists = !1, this.visible = !1, this.anchor
					.set(.5, .5), this.position.set(a.Config.HALF_GAME_WIDTH,
					a.Config.HALF_GAME_HEIGHT), this._hideCompleteSignal = new Phaser.Signal(), this.events.onAddedToGroup
					.addOnce(this.onAddedToGroup, this);
		}
		return __extends(c, b), c.prototype.onAddedToGroup = function() {
			this.lineSpacing = this.game.device.firefox
					? 0
					: this.game.device.mobileSafari ? -10 : -20;
		}, c.prototype.show = function() {
			this.game.time.events.add(this.showDelay, this.doShow, this);
		}, c.prototype.doShow = function() {
			this.game.sound.usingWebAudio
					&& this.game.sound.play("level_up", .5), this.exists = !0, this.visible = !0, this.y = a.Config.HALF_GAME_HEIGHT
					+ 100, this.alpha = 0, this.scale.set(0, 1), this.game.add
					.tween(this).to({
								alpha : 1
							}, 200, Phaser.Easing.Linear.None, !0), this.game.add
					.tween(this).to({
								y : a.Config.HALF_GAME_HEIGHT
							}, this.showDuration, Phaser.Easing.Back.Out, !0), this.game.add
					.tween(this.scale).to({
								x : 1
							}, this.showDuration, Phaser.Easing.Back.Out, !0).onComplete
					.addOnce(this.wait, this);
		}, c.prototype.wait = function() {
			this.game.time.events.add(this.waitDelay, this.hide, this);
		}, c.prototype.hide = function() {
			this.game.sound.usingWebAudio
					&& this.game.sound.play("whoosh_out", .33);
			var b = 100, c = this.hideDuration - b;
			this.game.add.tween(this).to({
						alpha : 0
					}, b, Phaser.Easing.Linear.None, !0, c), this.game.add
					.tween(this).to({
								y : a.Config.HALF_GAME_HEIGHT - 100
							}, this.hideDuration, Phaser.Easing.Back.In, !0).onComplete
					.addOnce(this.onHideComplete, this);
		}, c.prototype.onHideComplete = function() {
			var a = this;
			this.exists = !1, this.visible = !1, this.game.time.events.add(400,
					function() {
						a._hideCompleteSignal.dispatch();
					}, this);
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0), this._hideCompleteSignal
					.dispose(), this._hideCompleteSignal = null;
		}, Object.defineProperty(c.prototype, "hideCompleteSignal", {
					get : function() {
						return this._hideCompleteSignal;
					},
					enumerable : !0,
					configurable : !0
				}), c;
	}(Phaser.Text);
	a.LevelUpFX = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(c, d) {
			b.call(this, c, d, "task_board"), this.showDuration = 400, this.waitDelay = 2e3, this.hideDuration = 400, this.exists = !1, this.visible = !1, this._hideCompleteSignal = new Phaser.Signal(), this.x = a.Config.HALF_GAME_WIDTH, this
					.initBack(), this.addLevelLabel(), this.initText(), this
					.initFruitLabels();
		}
		return __extends(c, b), c.prototype.initBack = function() {
			this.back = this.game.add.image(0, 0, "graphics_1",
					"TaskBoard_Back0000", this), this.back.anchor.set(.5, .5);
		}, c.prototype.addLevelLabel = function() {
			var b = a.Main.texts.level, c = {
				font : "48px GrilledCheeseBTNToasted",
				fill : "#FFFFFF",
				align : "center"
			};
			this.levelLabel = this.game.add.text(0, -110, b, c, this), this.levelLabel.anchor
					.set(.5, .5), this.levelLabel.setShadow(2, 2, "#666666"), this
					.add(this.levelLabel), this.game.device.firefox
					&& (this.levelLabel.y += 10);
		}, c.prototype.initText = function() {
			var b = a.Main.texts.task_board, c = {
				font : "32px GrilledCheeseBTNToasted",
				fill : "#FFFFFF",
				align : "center"
			};
			this.text = this.game.add.text(0, -15, b, c, this), this.text.anchor
					.set(.5, .5), this.text.wordWrap = !0, this.text.wordWrapWidth = .8
					* this.back.width, this.text.setShadow(2, 2, "#666666"), this
					.add(this.text), this.game.device.firefox === !1
					? this.text.lineSpacing = -5
					: this.text.y += 10;
		}, c.prototype.initFruitLabels = function() {
			var b = 0, c = 80, d = 4;
			this.labelsGroup = this.game.add.group(this), this.labels = [];
			for (var e = 0; d > e; e++) {
				var f = new a.FruitLabel(this.game, this.labelsGroup);
				f.position.set(b, 55), f.exists = !1, this.labelsGroup.add(f), this.labels
						.push(f), b += c;
			}
		}, c.prototype.show = function(b, c) {
			this.game.sound.usingWebAudio
					&& this.game.sound.play("whoosh", .33), this.exists = !0, this.visible = !0, this
					.updateLevelLabel(c), this.updateLabels(b), this.position.y = a.Config.HALF_GAME_HEIGHT
					+ 100, this.alpha = 0, this.scale.set(0, 1), this.game.add
					.tween(this.scale).to({
								x : 1
							}, this.showDuration, Phaser.Easing.Back.Out, !0), this.game.add
					.tween(this).to({
								alpha : 1
							}, 200, Phaser.Easing.Linear.None, !0), this.game.add
					.tween(this.position).to({
								y : a.Config.HALF_GAME_HEIGHT
							}, this.showDuration, Phaser.Easing.Back.Out, !0).onComplete
					.addOnce(this.wait, this);
		}, c.prototype.updateLevelLabel = function(b) {
			var c = a.Main.texts.level + " " + b.toString();
			this.levelLabel.setText(c);
		}, c.prototype.updateLabels = function(a) {
			for (var b = 0; b < this.labels.length; b++) {
				var c = this.labels[b], d = a.miniTasks[b];
				d
						? (c.exists = !0, c.visible = !0, c.setMinitask(d))
						: (c.exists = !1, c.visible = !1);
			}
			this.alignLabels();
		}, c.prototype.alignLabels = function() {
			var a = 60, b = this.labels.reduce(function(a, b) {
						return b.visible && a++, a;
					}, 0), c = b * a, d = .5 * -c;
			this.labelsGroup.position.set(d, 30);
		}, c.prototype.wait = function() {
			this.game.time.events.add(this.waitDelay, this.hide, this);
		}, c.prototype.hide = function() {
			this.game.sound.usingWebAudio
					&& this.game.sound.play("whoosh_out", .33), this.game.add
					.tween(this).to({
								alpha : 0
							}, 100, Phaser.Easing.Linear.None, !0, 300), this.game.add
					.tween(this.position).to({
								y : a.Config.HALF_GAME_HEIGHT - 100
							}, this.hideDuration, Phaser.Easing.Back.In, !0).onComplete
					.addOnce(this.onHideComplete, this);
		}, c.prototype.onHideComplete = function() {
			this.exists = !1, this.visible = !1, this._hideCompleteSignal
					.dispatch();
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0, !1), this.labels = null, this._hideCompleteSignal
					.dispose(), this._hideCompleteSignal = null;
		}, Object.defineProperty(c.prototype, "hideCompleteSignal", {
					get : function() {
						return this._hideCompleteSignal;
					},
					enumerable : !0,
					configurable : !0
				}), c;
	}(Phaser.Group);
	a.TaskBoard = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(c, d) {
			b.call(this, c, d, "pause_board"), this.initBack(), this.initText(), this
					.initButtons(), this.position.set(a.Config.HALF_GAME_WIDTH,
					a.Config.HALF_GAME_HEIGHT), this.exists = !1, this.visible = !1;
		}
		return __extends(c, b), c.prototype.initBack = function() {
			var a = this.game.add.image(0, 0, "graphics_1",
					"TaskBoard_Back0000", this);
			a.anchor.set(.5, .5);
		}, c.prototype.initText = function() {
			var b = a.Main.texts.pause, c = {
				font : "56px GrilledCheeseBTNToasted",
				fill : "#FBAF05",
				align : "center"
			}, d = new Phaser.Text(this.game, 0, -54, b, c);
			d.anchor.set(.5, .5), d.stroke = "#FFFFFF", d.strokeThickness = 12, d
					.setShadow(2, 2, "#FB1A05", 2), this.add(d), this.game.device.firefox === !1
					? d.lineSpacing = -12
					: d.position.y += 10;
		}, c.prototype.initButtons = function() {
			var b = this, c = 96, d = 120;
			this._resumeButton = new a.SimpleButton(this.game, 0, c, "buttons",
					"Button_Resume0000"), this.soundButton = new a.ToggleButton(
					this.game, this._resumeButton.x + d, c, "buttons",
					"Button_Music_On0000", "Button_Music_Off0000"), this.soundButton.callback
					.add(function() {
								b.game.sound.mute = !b.game.sound.mute;
							}), this.game.sound.mute
					&& this.soundButton.switchTextures(), this.menuButton = new a.SimpleButton(
					this.game, this._resumeButton.x - d, c, "buttons",
					"Button_Menu0000"), this.menuButton.callback.addOnce(
					this.gotoMainMenu, this), this.buttons = [this.menuButton,
					this._resumeButton, this.soundButton], this.buttons
					.forEach(function(a) {
								b.add(a);
							});
		}, c.prototype.gotoMainMenu = function() {
			this.game.changeState("MainMenu");
		}, c.prototype.show = function() {
			this.game.sound.usingWebAudio
					&& this.game.sound.play("whoosh", .33), this.exists = !0, this.visible = !0, this.position.y = a.Config.HALF_GAME_HEIGHT
					+ 200, this.alpha = 0, this.game.add.tween(this).to({
						alpha : 1
					}, 200, Phaser.Easing.Linear.None, !0), this.game.add
					.tween(this.position).to({
								y : a.Config.HALF_GAME_HEIGHT
							}, 500, Phaser.Easing.Back.Out, !0).onComplete
					.addOnce(this.onShowComplete, this);
		}, c.prototype.onShowComplete = function() {
		}, c.prototype.hide = function() {
			this.game.sound.usingWebAudio
					&& this.game.sound.play("whoosh_out", .33), this.game.add
					.tween(this).to({
								alpha : 0
							}, 100, Phaser.Easing.Linear.None, !0, 400), this.game.add
					.tween(this.position).to({
								y : a.Config.HALF_GAME_HEIGHT - 200
							}, 500, Phaser.Easing.Back.In, !0).onComplete
					.addOnce(this.onHideComplete, this);
		}, c.prototype.onHideComplete = function() {
			this.exists = !1, this.visible = !1;
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0, !1), this.buttons = null;
		}, Object.defineProperty(c.prototype, "resumeButton", {
					get : function() {
						return this._resumeButton;
					},
					enumerable : !0,
					configurable : !0
				}), c;
	}(Phaser.Group);
	a.PauseBoard = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a) {
			b.call(this, a, a.world, "gui"), this._restartSignal = new Phaser.Signal(), this._pauseSignal = new Phaser.Signal(), this
					.addPanda(), this.initFruitLabels(), this.addTimer(), this
					.addLevelLabel(), this.addPauseButton(), this
					.addGameCompleteBoard(), this.addLevelUpFX(), this
					.addTaskBoard(), this.addPauseBoard(), this
					.addRestartOverlay();
		}
		return __extends(c, b), c.prototype.addRestartOverlay = function() {
			var a = this.game.cache.getBitmapData("restart_overlay");
			this.restartOverlay = this.game.add.image(0, 0, a, null, this), this.restartOverlay.exists = !1, this.restartOverlay.visible = !1;
		}, c.prototype.showRestartOverlay = function() {
			var a = this;
			this.restartOverlay.exists = !0, this.restartOverlay.visible = !0, this.restartOverlay.alpha = 0, this.game.add
					.tween(this.restartOverlay).to({
								alpha : 1
							}, 100, Phaser.Easing.Linear.None, !0).onComplete
					.addOnce(function() {
						a.game.add.tween(a.restartOverlay).to({
									alpha : 0
								}, 800, Phaser.Easing.Linear.None, !0, 300).onComplete
								.addOnce(function() {
									a.restartOverlay.exists = !1, a.restartOverlay.visible = !1;
								});
					});
		}, c.prototype.addPanda = function() {
			this._panda = new game.Panda(this.game), this._panda.position.set(
					110, 144), this.game.world.addAt(this._panda, 2);
		}, c.prototype.addTimer = function() {
			this.timer = new game.TaskTimerView(this.game, this), this.timer.position
					.set(238, 38);
		}, c.prototype.addLevelLabel = function() {
			if ("en" === a.Main.language) {
				var b = this.game.add.bitmapText(0, 0, "level_label",
						"Level 1", 28, this);
				b.position.set(this.timer.x + this.timer.width + 6, 24), this.levelLabel = b;
			} else {
				var c = {
					font : "28px GrilledCheeseBTNToasted",
					fill : "#FFFFFF",
					align : "center"
				}, d = this.game.add.text(0, 28, "", c, this);
				d.anchor.set(.5, .5), d.stroke = "#296B98", d.setShadow(2, 2,
						"#296B98", 1), d.strokeThickness = 5, d.position.set(
						this.timer.x + this.timer.width + 46, 38), this.levelLabel = d;
			}
			this.updateLevelLabel(1);
		}, c.prototype.addPauseButton = function() {
			var a = this;
			this.pauseButton = new game.SimpleButton(this.game,
					game.Config.GAME_WIDTH - 64, this._panda.y - 68, "buttons",
					"Button_Pause0000"), this.pauseButton.callback.add(
					function() {
						a._pauseSignal.dispatch("pause");
					}, this), this.add(this.pauseButton);
		}, c.prototype.initFruitLabels = function() {
			this._fruitsLabels = new game.FruitLabelCollection(this.game, this), this._fruitsLabels.position
					.set(this._panda.x + 130, this._panda.y - 45);
		}, c.prototype.syncWithTask = function(a, b) {
			this.timer.setTimer(a.timer), this._fruitsLabels
					.syncWithTask(a.miniTasks), this.updateLevelLabel(b);
		}, c.prototype.updateLevelLabel = function(b) {
			var c = a.Main.texts.level + b.toString();
			this.levelLabel.setText(c);
		}, c.prototype.addGameCompleteBoard = function() {
			this.gameOverBoard = new game.GameOverBoard(this.game, this), this.gameOverBoard.position
					.set(game.Config.HALF_GAME_WIDTH,
							game.Config.HALF_GAME_HEIGHT), this.gameOverBoard.playAgainSignal
					.add(this._restartSignal.dispatch, this._restartSignal);
		}, c.prototype.gotoMainMenu = function() {
			this.game.changeState("main_menu");
		}, c.prototype.addLevelUpFX = function() {
			this._levelUpFX = new game.LevelUpFX(this.game), this
					.add(this._levelUpFX);
		}, c.prototype.addTaskBoard = function() {
			this._taskBoard = new game.TaskBoard(this.game, this), this
					.add(this._taskBoard), this._taskBoard.position.set(
					game.Config.HALF_GAME_WIDTH, 500);
		}, c.prototype.addPauseBoard = function() {
			var a = this;
			this.pauseBoard = new game.PauseBoard(this.game, this), this.pauseBoard.resumeButton.callback
					.add(function() {
								a._pauseSignal.dispatch("resume");
							}, this);
		}, c.prototype.hidePauseButton = function() {
			this.pauseButton.inputEnabled = !1, this.game.add
					.tween(this.pauseButton).to({
								alpha : 0
							}, 200, Phaser.Easing.Linear.None, !0);
		}, c.prototype.showPauseButton = function() {
			this.pauseButton.inputEnabled = !0, this.game.add
					.tween(this.pauseButton).to({
								alpha : 1
							}, 100, Phaser.Easing.Linear.None, !0);
		}, c.prototype.onPause = function() {
			this.hidePauseButton(), this.pauseBoard.show();
		}, c.prototype.onResume = function() {
			this.showPauseButton(), this.pauseBoard.hide();
		}, c.prototype.onGameOver = function(a, b) {
			this.hidePauseButton(), this.gameOverBoard.show(a, b);
		}, c.prototype.onRestart = function() {
			this.showRestartOverlay(), this.showPauseButton();
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0, !1), this._restartSignal
					.dispose(), this._restartSignal = null, this._pauseSignal
					.dispose(), this._pauseSignal = null;
		}, Object.defineProperty(c.prototype, "panda", {
					get : function() {
						return this._panda;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "restartSignal", {
					get : function() {
						return this._restartSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "pauseSignal", {
					get : function() {
						return this._pauseSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "taskBoard", {
					get : function() {
						return this._taskBoard;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "levelUpFX", {
					get : function() {
						return this._levelUpFX;
					},
					enumerable : !0,
					configurable : !0
				}), c;
	}(Phaser.Group);
	a.LevelGUI = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function() {
		function a() {
			this.level = 1, this.points = 0, this.maxChain = 0;
		}
		return a.prototype.doReset = function() {
			this.points = 0, this.maxChain = 0;
		}, a;
	}();
	a.RoundResult = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c, d, e) {
			a.call(this, b, 0, 0, "graphics_1", c), this.item = null, this._row = d, this._column = e;
		}
		return __extends(b, a), b.prototype.isFree = function() {
			return null === this.item;
		}, Object.defineProperty(b.prototype, "column", {
					get : function() {
						return this._column;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "row", {
					get : function() {
						return this._row;
					},
					enumerable : !0,
					configurable : !0
				}), b.WIDTH = 84, b.HEIGHT = 84, b;
	}(Phaser.Image);
	a.Cell = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, c, "grid"), this._rows = 8, this._columns = 7, this
					.initCells(), this.addFrame();
		}
		return __extends(c, b), c.prototype.initCells = function() {
			this.cells = [];
			for (var a = !0, b = 0; b < this._rows; b++)
				for (var c = 0; c < this._columns; c++) {
					var d = a ? "Dark_Cell0000" : "Bright_Cell0000";
					a = !a, this.addCell(b, c, d);
				}
		}, c.prototype.addCell = function(b, c, d) {
			var e = b * this._columns + c;
			if (this.cells[e])
				return null;
			var f = new game.Cell(this.game, d, b, c);
			return f.x = a.Cell.WIDTH * c, f.y = a.Cell.HEIGHT * b, this.cells[e] = f, this
					.add(f), f;
		}, c.prototype.addFrame = function() {
			var a = this.game.add.image(0, 0, "graphics_1", "Board_Frame0000",
					this);
			a.x = -12, a.y = -12;
		}, c.prototype.getCellAt = function(a, b) {
			var c = a * this._columns + b;
			return this.cells[c];
		}, c.prototype.getFreeCell = function() {
			for (var a = 0; a < this.cells.length; a++) {
				var b = this.cells[a];
				if (b.isFree())
					return b;
			}
			return null;
		}, c.prototype.getFreeCellsNum = function() {
			var a = 0;
			return this.cells.forEach(function(b) {
						b.isFree() && a++;
					}), a;
		}, c.prototype.getCellUnderPoint = function(a, b) {
			var c = a - this.position.x, d = b - this.position.y, e = Math
					.floor(d / game.Cell.WIDTH), f = Math.floor(c
					/ game.Cell.HEIGHT);
			return this.getCellAt(e, f);
		}, c.prototype.getWidth = function() {
			var a = this.cells[0].x, b = this.cells[this.cells.length - 1].x
					+ this.cells[this.cells.length - 1].width;
			return b - a;
		}, c.prototype.getHeight = function() {
			var a = this.cells[0].y, b = this.cells[this.cells.length - 1].y
					+ this.cells[this.cells.length - 1].height;
			return b - a;
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0, !1), this.cells = null;
		}, Object.defineProperty(c.prototype, "rows", {
					get : function() {
						return this._rows;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "columns", {
					get : function() {
						return this._columns;
					},
					enumerable : !0,
					configurable : !0
				}), c;
	}(Phaser.Group);
	a.Grid = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(c, d) {
			var e = a.ItemType[d];
			this.normalTexture = e + "0000", this.highlightedTexture = e
					+ "_Highlighted0000", b.call(this, c, 0, 0, "graphics_1",
					this.normalTexture), this.anchor.set(.5, .5);
		}
		return __extends(c, b), c.prototype.setNormalTexture = function() {
			this.loadTexture("graphics_1", this.normalTexture);
		}, c.prototype.setHighlightedTexture = function() {
			this.loadTexture("graphics_1", this.highlightedTexture);
		}, c;
	}(Phaser.Image);
	a.ItemBody = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b) {
			a.call(this, b, 0, 0, "graphics_1", "FutureBonus_10000"), this._activateSignal = new Phaser.Signal(), this.anchor
					.set(.5, .5), this.pulseTween = this.game.add
					.tween(this.scale).to({
								x : .8,
								y : .8
							}, 500, Phaser.Easing.Sinusoidal.Out, !0, 0,
							Number.MAX_VALUE, !0), this.pulseTween.pause(), this.alive = !1, this.exists = !1, this.visible = !1;
		}
		return __extends(b, a), b.prototype.activate = function() {
			this._activateSignal.dispatch(this), this.onAddToPool();
		}, b.prototype.onAddToPool = function() {
			this.alive = !1, this.exists = !1, this.visible = !1, this.pulseTween
					.pause();
		}, b.prototype.onRemoveFromPool = function() {
			this.alive = !0, this.exists = !0, this.visible = !0, this.pulseTween
					.resume();
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this, !0), this.pulseTween
					&& (this.pulseTween.stop(), this.pulseTween = null), this._activateSignal
					.dispose(), this._activateSignal = null;
		}, Object.defineProperty(b.prototype, "activateSignal", {
					get : function() {
						return this._activateSignal;
					},
					enumerable : !0,
					configurable : !0
				}), b;
	}(Phaser.Image);
	a.FuturePowerUp = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b) {
			a.call(this, b, 0, 0, "graphics_1", "ItemBonus0000"), this.followItem = !1, this.exists = !1, this.visible = !1, this.alive = !1, this.anchor
					.set(.5, .5), this._activateSignal = new Phaser.Signal(), this
					.initPulseTween();
		}
		return __extends(b, a), b.prototype.initPulseTween = function() {
			this.scale.set(.85, 1), this.pulseTween = this.game.add
					.tween(this.scale).to({
								x : 1,
								y : .85
							}, 500, Phaser.Easing.Sinusoidal.Out, !1, 0, 1e3,
							!0);
		}, b.prototype.init = function(a) {
			this.angle = this.game.rnd.normal() > 0 ? 0 : 90, this._item = a, this.position
					.set(this._item.x, this._item.y), this.parent
					.sendToBack(this), this.followItem = !0, this.show();
		}, b.prototype.show = function() {
			this.alpha = 0, this.game.add.tween(this).to({
						alpha : 1
					}, 100, Phaser.Easing.Linear.None, !0), this
					.startPulseTween();
		}, b.prototype.startPulseTween = function() {
			this.scale.set(.85, 1), this.pulseTween.isRunning ? this.pulseTween
					.resume() : this.pulseTween.start();
		}, b.prototype.activate = function() {
			this._activateSignal.dispatch(this), this.pulseTween.pause(), this.followItem = !1, this
					.hide();
		}, b.prototype.hide = function() {
			this.game.add.tween(this).to({
						alpha : 0
					}, 200, Phaser.Easing.Linear.None, !0, 200), this.game.add
					.tween(this.scale).to({
								x : 3,
								y : 2.5
							}, 300, Phaser.Easing.Back.Out, !0).onComplete
					.addOnce(this.onAddToPool, this);
		}, b.prototype.update = function() {
			this.exists && this.followItem && (this.y = this._item.y);
		}, b.prototype.returnToPool = function() {
			this.onAddToPool();
		}, b.prototype.onAddToPool = function() {
			this.exists = !1, this.visible = !1, this.alive = !1;
		}, b.prototype.onRemoveFromPool = function() {
			this.exists = !0, this.visible = !0, this.alive = !0;
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this, !0), this.pulseTween.stop(), this.pulseTween = null, this._activateSignal
					.dispose(), this._activateSignal = null, this._item = null;
		}, Object.defineProperty(b.prototype, "activateSignal", {
					get : function() {
						return this._activateSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "linkedItem", {
					get : function() {
						return this._item;
					},
					enumerable : !0,
					configurable : !0
				}), b;
	}(Phaser.Image);
	a.PowerUp = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, 0, 0, "graphics_1"), this.futurePowerUp = null, this.powerUp = null, this.alive = !1, this.dropDistance = 0, this.collected = !1, this.alive = !1, this.exists = !1, this.visible = !1, this.anchor
					.set(.5, .5), this._itemType = c, this._collectCompleteSignal = new Phaser.Signal(), this
					.initTextures(), this.setNormalTexture(), this.initTweens();
		}
		return __extends(c, b), c.prototype.initTextures = function() {
			var b = a.ItemType[this._itemType];
			this.normalTexture = b + "0000", this.highlightedTexture = b
					+ "_Highlighted0000";
		}, c.prototype.setNormalTexture = function() {
			this.loadTexture("graphics_1", this.normalTexture);
		}, c.prototype.setHighlightedTexture = function() {
			this.loadTexture("graphics_1", this.highlightedTexture);
		}, c.prototype.initTweens = function() {
			this.collectTween = this.game.add.tween(this.scale).to({
						x : 0,
						y : 0
					}, 300, Phaser.Easing.Back.In), this.collectTween.onComplete
					.add(this.onCollectComplete, this), this.scale.set(0, 0), this.showOnGridTween = this.game.add
					.tween(this.scale).to({
								x : 1,
								y : 1
							}, 500, Phaser.Easing.Back.Out, !1, 200), this.scale
					.set(1, 1), this.removeFromGridTween = this.game.add
					.tween(this.scale).to({
								x : 0,
								y : 0
							}, 500, Phaser.Easing.Back.In), this.removeFromGridTween.onComplete
					.add(this.onAddToPool, this), this.highlightTween = this.game.add
					.tween(this.scale).to({
								x : 1.2,
								y : .8
							}, 100, Phaser.Easing.Cubic.Out).to({
								x : 1,
								y : 1
							}, 300, Phaser.Easing.Back.Out), this.scale.set(1,
					1);
		}, c.prototype.highlight = function() {
			this.setHighlightedTexture(), a.Main.weakDevice === !1
					&& this.highlightTween.start();
		}, c.prototype.unhighlight = function() {
			null === this.powerUp && this.setNormalTexture(), this.futurePowerUp
					&& (this.futurePowerUp.onAddToPool(), this.futurePowerUp = null);
		}, c.prototype.showOnGrid = function(a) {
			a === !1 && (this.scale.set(0, 0), this.showOnGridTween.start());
		}, c.prototype.collectToPanda = function(a) {
			this.onCollectStart(), this.unhighlight();
			var b = utils.MathUtil.distance(this.position.x, this.position.y,
					a.x, a.y), c = Phaser.Math.clamp(b, 400, 800);
			this.game.add.tween(this).to({
						x : a.x,
						y : a.y - 56
					}, c, Phaser.Easing.Back.In, !0), this.game.add
					.tween(this.scale).to({
								x : .33,
								y : .33
							}, 300, Phaser.Easing.Back.In, !0, c - 250).onComplete
					.addOnce(this.onCollectComplete, this);
		}, c.prototype.collect = function() {
			this.onCollectStart(), this.collectTween.start();
		}, c.prototype.onCollectStart = function() {
			this.collected = !0, this.futurePowerUp
					&& (this.futurePowerUp.activate(), this.futurePowerUp = null), this.powerUp
					&& (this.powerUp.activate(), this.powerUp = null);
		}, c.prototype.onCollectComplete = function() {
			this._collectCompleteSignal.dispatch(this), this.onAddToPool();
		}, c.prototype.moveTo = function(a) {
			this.game.add.tween(this).to({
						y : a
					}, 500, Phaser.Easing.Cubic.Out, !0);
		}, c.prototype.setFuturePowerUp = function(a) {
			null === this.futurePowerUp && (this.futurePowerUp = a);
		}, c.prototype.hasPowerUp = function() {
			return null !== this.powerUp;
		}, c.prototype.setPowerUp = function(a) {
			null === this.powerUp
					&& (this.powerUp = a, this.setHighlightedTexture());
		}, c.prototype.linkCell = function(a) {
			this.cell && this.clearCell(), this.cell = a, this.cell.item = this;
		}, c.prototype.clearCell = function() {
			this.cell && (this.cell.item = null, this.cell = null);
		}, c.prototype.removeFromGrid = function(a) {
			this.clearCell(), a ? this.onAddToPool() : this.removeFromGridTween
					.start();
		}, c.prototype.collectToBasket = function(a, b) {
			this.clearCell();
			var c = this.x, d = this.y, e = Phaser.Math.distance(c, d, a, b), f = 500
					+ 5e3 / e;
			this.game.add.tween(this).to({
						x : a,
						y : b
					}, 1.2 * e, Phaser.Easing.Cubic.In, !0, f), this.game.add
					.tween(this.scale).to({
								x : .33,
								y : .33
							}, .1 * e, Phaser.Easing.Back.In, !0, f + 1.1 * e).onComplete
					.addOnce(this.onAddToPool, this);
		}, c.prototype.onAddToPool = function() {
			this.alive = !1, this.exists = !1, this.visible = !1, this.futurePowerUp
					&& (this.futurePowerUp.onAddToPool(), this.futurePowerUp = null), this.powerUp
					&& (this.powerUp.returnToPool(), this.powerUp = null);
		}, c.prototype.onRemoveFromPool = function() {
			this.alive = !0, this.exists = !0, this.visible = !0, this.collected = !1, this.alpha = 1, this.scale
					.set(1, 1), this.setNormalTexture();
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0), this._collectCompleteSignal
					.dispose(), this._collectCompleteSignal = null, this.futurePowerUp = null, this.powerUp = null, this
					.clearCell(), this.destroyTweens();
		}, c.prototype.destroyTweens = function() {
			this.showOnGridTween.stop(), this.showOnGridTween = null, this.collectTween
					.stop(), this.collectTween = null, this.highlightTween
					.stop(), this.highlightTween = null, this.removeFromGridTween
					.stop(), this.removeFromGridTween = null;
		}, Object.defineProperty(c.prototype, "itemType", {
					get : function() {
						return this._itemType;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "collectCompleteSignal",
				{
					get : function() {
						return this._collectCompleteSignal;
					},
					enumerable : !0,
					configurable : !0
				}), c.RADIUS = 40, c.RADIUS_SQUARED = c.RADIUS * c.RADIUS, c.CONTACT_RADIUS = 120, c.CONTACT_RADIUS_SQUARED = c.CONTACT_RADIUS
				* c.CONTACT_RADIUS, c.ITEM_TYPES = [0, 1, 2, 3, 4], c;
	}(Phaser.Image);
	a.Item = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function() {
		function b(a, b) {
			this._game = a, this.itemsLayer = b, this.initItems();
		}
		return b.prototype.initItems = function() {
			var b = this;
			this.items = [];
			var c = 20, d = [0, 1, 2, 3, 4];
			d.forEach(function(d) {
						for (var e = 0; c > e; e++) {
							var f = new a.Item(b._game, d);
							b.itemsLayer.add(f), b.items.push(f);
						}
					});
		}, b.prototype.getItem = function(b) {
			var c = this.getAvailableItem(b);
			return null === c
					&& (c = new a.Item(this._game, b), this.items.push(c), this.itemsLayer
							.add(c)), c.onRemoveFromPool(), c;
		}, b.prototype.getAvailableItem = function(a) {
			for (var b = this.items.length, c = 0; b > c; c++) {
				var d = this.items[c];
				if (d.exists === !1 && d.itemType === a)
					return d;
			}
			return null;
		}, b.prototype.returnItem = function(a) {
			a.onAddToPool();
		}, b.prototype.doReset = function() {
			for (var a = this.items.length, b = 0; a > b; b++) {
				var c = this.items[b];
				c.exists && this.returnItem(c);
			}
		}, b.prototype.destroy = function() {
			this._game = null, this.itemsLayer = null, this.items.length = 0, this.items = null;
		}, b;
	}();
	a.ItemsPool = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function() {
		function a(a, b) {
			this.game = a, this.grid = b, this.itemRnd = new Phaser.RandomDataGenerator([10]);
		}
		return a.prototype.setAllowedItemTypes = function(a) {
			this.allowedItemTypes = a;
		}, a.prototype.setAddItemCallback = function(a, b) {
			this.addItemCallback = a, this.addItemCallbackContext = b;
		}, a.prototype.generateItems = function(a, b) {
			for (var c = 0; a > c; c++) {
				var d = b ? b : this.itemRnd.pick(this.allowedItemTypes);
				this.dispatchAddItemCallback(d);
			}
		}, a.prototype.dispatchAddItemCallback = function(a) {
			this.addItemCallback.call(this.addItemCallbackContext, a);
		}, a.prototype.destroy = function() {
			this.game = null, this.grid = null, this.itemRnd = null, this.addItemCallback = null, this.addItemCallbackContext = null, this.allowedItemTypes = null;
		}, a;
	}();
	a.ItemsGenerator = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b() {
			a.call(this);
		}
		return __extends(b, a), b;
	}(utils.ObjectPool);
	a.ChainLinksPool = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a) {
			b.call(this, a, 0, 0, "graphics_1", "Chain_Link0000"), this.anchor
					.set(.5, .5), this.exists = !1, this.visible = !1, this
					.initTween();
		}
		return __extends(c, b), c.prototype.initTween = function() {
			this.scale.set(0, 1), this.showTween = this.game.add
					.tween(this.scale).to({
								x : 1
							}, 150, Phaser.Easing.Linear.None), this.scale.set(
					1, 1);
		}, c.prototype.show = function() {
			this.visible = !0, this.exists = !0, a.Main.weakDevice === !1
					&& (this.scale.set(0, 1), this.showTween.start());
		}, c.prototype.hide = function() {
			this.exists = !1, this.visible = !1;
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0), this.showTween.stop(), this.showTween = null;
		}, c;
	}(Phaser.Image);
	a.ChainLink = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function() {
		function a(a, b, c) {
			this.stack = [], this.foundChain = [], this.game = a, this.grid = b, this.items = c;
		}
		return a.prototype.getPossibleMove = function() {
			for (var a = this.items.length, b = 0; a > b; b++) {
				var c = this.items[b], d = this.getPossibleChain(c);
				if (d && d.length >= 3)
					return d;
			}
			return null;
		}, a.prototype.getPossibleChain = function(a) {
			this.stack.length = 0, this.stack.push(a), this.foundChain.length = 0;
			for (var b = a.itemType; this.stack.length > 0;) {
				var c = this.stack.pop();
				if (this.foundChain.push(c), this.foundChain.length > 2)
					return this.foundChain;
				this.putInStack(c, b, -1, -1), this.putInStack(c, b, -1, 0), this
						.putInStack(c, b, -1, 1), this.putInStack(c, b, 0, 1), this
						.putInStack(c, b, 1, 1), this.putInStack(c, b, 1, 0), this
						.putInStack(c, b, 1, -1), this.putInStack(c, b, 0, -1);
			}
			return null;
		}, a.prototype.putInStack = function(a, b, c, d) {
			var e = this.getItem(a, c, d);
			e && this.itemGoodForChain(e, b) && this.stack.push(e);
		}, a.prototype.getItem = function(a, b, c) {
			var d = a.cell, e = d.row + b, f = d.column + c;
			return e >= 0 && e < this.grid.rows && f >= 0
					&& f < this.grid.columns
					? this.grid.getCellAt(e, f).item
					: void 0;
		}, a.prototype.itemGoodForChain = function(a, b) {
			return a.itemType === b && -1 === this.foundChain.indexOf(a);
		}, a.prototype.destroy = function() {
			this.game = null, this.grid = null, this.items = null, this.stack = null, this.foundChain = null;
		}, a;
	}();
	a.FindChainStrategy = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function() {
		function a(a, b) {
			this.totalSeconds = 0, this.passedSeconds = 0, this._remainingSeconds = 0, this.paused = !1, this.game = a, this.totalSeconds = Math
					.floor(b / 1e3), this._remainingSeconds = this.totalSeconds, this._secondPassedSignal = new Phaser.Signal(), this._completeSignal = new Phaser.Signal(), this._stopSignal = new Phaser.Signal();
		}
		return a.prototype.start = function() {
			this.timerEvent = this.game.time.events.repeat(1e3,
					Number.MAX_VALUE, this.onSecondPassed, this);
		}, a.prototype.addSeconds = function(a) {
			this.timerEvent && (this.totalSeconds += a);
		}, a.prototype.onSecondPassed = function() {
			this.paused === !1
					&& (this.passedSeconds++, this._remainingSeconds = this.totalSeconds
							- this.passedSeconds, this._secondPassedSignal
							.dispatch(this._remainingSeconds), this._remainingSeconds <= 0
							&& (this.stopTimer(), this._completeSignal
									.dispatch()));
		}, a.prototype.stopTimer = function() {
			this.timerEvent
					&& (this.game.time.events.remove(this.timerEvent), this.timerEvent = null, this._stopSignal
							.dispatch());
		}, a.prototype.onPause = function() {
			this.paused = !0, this._stopSignal.dispatch();
		}, a.prototype.onResume = function() {
			this.paused = !1;
		}, a.prototype.destroy = function() {
			this.stopTimer(), this._secondPassedSignal.dispose(), this._secondPassedSignal = null, this._completeSignal
					.dispose(), this._completeSignal = null, this._stopSignal
					.dispose(), this._stopSignal = null;
		}, Object.defineProperty(a.prototype, "remainingSeconds", {
					get : function() {
						return this._remainingSeconds;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(a.prototype, "secondPassedSignal", {
					get : function() {
						return this._secondPassedSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(a.prototype, "completeSignal", {
					get : function() {
						return this._completeSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(a.prototype, "stopSignal", {
					get : function() {
						return this._stopSignal;
					},
					enumerable : !0,
					configurable : !0
				}), a;
	}();
	a.TaskTimer = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function() {
		function b(b, c, d, e) {
			this._isComplete = !1, this.game = b, this.miniTasks = c, this._completeSignal = new Phaser.Signal(), this._timer = new a.TaskTimer(
					this.game, d), this.allowedItemTypes = e;
		}
		return b.prototype.hasItemType = function(a) {
			return this.miniTasks.some(function(b) {
						return b.fruitType === a;
					});
		}, b.prototype.onItemCollected = function(a) {
			var b = this.getMiniTask(a.itemType);
			b && b.addCollectedItems(1);
		}, b.prototype.onCollectCycleComplete = function() {
			this.allMinitasksComplete()
					&& (this._isComplete = !0, this._completeSignal.dispatch());
		}, b.prototype.getMiniTask = function(a) {
			for (var b = this.miniTasks.length, c = 0; b > c; c++) {
				var d = this.miniTasks[c];
				if (d.fruitType === a)
					return d;
			}
			return null;
		}, b.prototype.allMinitasksComplete = function() {
			return this.miniTasks.every(function(a) {
						return a.complete;
					});
		}, b.prototype.destroy = function() {
			this.game = null, this._completeSignal.dispose(), this._completeSignal = null, this
					.destroyMinitasks(), this.destroyTimer();
		}, b.prototype.destroyMinitasks = function() {
			this.miniTasks.forEach(function(a) {
						a.destroy();
					}), this.miniTasks = null;
		}, b.prototype.destroyTimer = function() {
			this._timer.destroy(), this._timer = null;
		}, Object.defineProperty(b.prototype, "completeSignal", {
					get : function() {
						return this._completeSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "timer", {
					get : function() {
						return this._timer;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "isComplete", {
					get : function() {
						return this._isComplete;
					},
					enumerable : !0,
					configurable : !0
				}), b;
	}();
	a.Task = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function() {
		function b(b) {
			this.game = b, this.rnd = new Phaser.RandomDataGenerator([2]), this.fruitTypes = a.Item.ITEM_TYPES
					.slice(0);
		}
		return b.prototype.generateTask = function(b) {
			var c = this.getAllowedItemTypes(b), d = this.getTypesNum(b), e = this
					.createMinitasks(c, d, b), f = this.getTime(b);
			return new a.Task(this.game, e, f, c);
		}, b.prototype.getTypesNum = function(a) {
			var b = 1;
			return b = 2 >= a ? 2 : 4 >= a ? 3 : 4;
		}, b.prototype.createMinitasks = function(b, c, d) {
			for (var e = [], f = this.getTypesForMinitasks(b, c), g = 0; c > g; g++) {
				var h = f[g], i = this.getFruitsNum(d), j = new a.MiniTask(h, i);
				e.push(j);
			}
			return e;
		}, b.prototype.getTypesForMinitasks = function(a, b) {
			var c = a.slice(0);
			Phaser.Utils.shuffle(c);
			var d = c.slice(0, b);
			return d;
		}, b.prototype.getFruitsNum = function(a) {
			var b = 4, c = 3, d = 21, e = b + a * c
					+ this.game.rnd.integerInRange(-3, 3);
			return e > d && (e = d), e;
		}, b.prototype.getTime = function(a) {
			var b = 15e4, c = 15e3, d = 3e4, e = b - a * c;
			return d > e && (e = d), e;
		}, b.prototype.getAllowedItemTypes = function(a) {
			var b = 4;
			return b = 2 >= a ? 4 : 4 >= a ? 5 : 6, this.fruitTypes.slice(0, b);
		}, b.prototype.destroy = function() {
			this.game = null, this.rnd = null, this.fruitTypes = null;
		}, b;
	}();
	a.TaskGenerator = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(c) {
			b.call(this, c, 0, 0, "graphics_1", "BonusStar0000"), this.exists = !1, this.visible = !1, this.alive = !1, this.anchor
					.set(.5, .5), this._requestItemSignal = new Phaser.Signal(), this._moveCompleteSignal = new Phaser.Signal(), a.Main.weakDevice === !1
					&& this.initEmitter();
		}
		return __extends(c, b), c.prototype.initEmitter = function() {
			this.emitter = this.game.add.emitter(0, 0, 15), this.emitter
					.makeParticles("graphics_1", "StarParticle0000"), this.emitter
					.setScale(1.5, .25, 1.5, .25, 1e3), this.emitter.setXSpeed(
					-50, 50), this.emitter.setYSpeed(10, 20), this.emitter.gravity = 150, this.emitter.lifespan = 1e3;
		}, c.prototype.show = function() {
			this.scale.set(0, 0), this.game.add.tween(this.scale).to({
						x : 1.2,
						y : 1.2
					}, 300, Phaser.Easing.Back.Out, !0), this.game.add
					.tween(this).to({
								y : this.y - 30
							}, 800, Phaser.Easing.Back.Out, !0).onComplete
					.addOnce(this._requestItemSignal.dispatch,
							this._requestItemSignal);
		}, c.prototype.moveToItem = function(a, b) {
			var c = utils.MathUtil.distance(this.x, this.y, a, b), d = Phaser.Math
					.clamp(c, 300, 1e3);
			this.game.add.tween(this).to({
						x : a,
						y : b,
						angle : 360
					}, d, Phaser.Easing.Back.In, !0).onComplete.addOnce(
					this.onMoveComplete, this), this.game.sound.usingWebAudio
					&& this.game.sound.play("star_move", .2);
		}, c.prototype.onMoveComplete = function() {
			var a = 100, b = 300;
			this.game.add.tween(this.scale).to({
						x : 3,
						y : 3
					}, b, Phaser.Easing.Back.In, !0), this.game.add.tween(this)
					.to({
								alpha : 0
							}, a, Phaser.Easing.Linear.None, !0, b - a).onComplete
					.addOnce(this.onHideComplete, this);
		}, c.prototype.onHideComplete = function() {
			this._moveCompleteSignal.dispatch(this), this.onAddToPool();
		}, c.prototype.update = function() {
			this.exists
					&& this.emitter
					&& (this.emitter.emitX = this.x, this.emitter.emitY = this.y
							+ 15, this.emitter.emitParticle());
		}, c.prototype.returnToPool = function() {
			this.onAddToPool();
		}, c.prototype.onAddToPool = function() {
			this.exists = !1, this.visible = !1, this.alive = !1, this._requestItemSignal.active = !1, this._moveCompleteSignal.active = !1, this.emitter
					&& (this.emitter.forEachExists(function(a) {
								a.exists = !1;
							}, this), this.emitter.kill());
		}, c.prototype.onRemoveFromPool = function() {
			this.exists = !0, this.visible = !0, this.alive = !0, this._requestItemSignal.active = !0, this._moveCompleteSignal.active = !0, this.alpha = 1, this.emitter
					&& this.emitter.revive();
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0), this.emitter
					&& (this.emitter.destroy(!0, !1), this.emitter = null), this._requestItemSignal
					.dispose(), this._requestItemSignal = null, this._moveCompleteSignal
					.dispose(), this._moveCompleteSignal = null;
		}, Object.defineProperty(c.prototype, "requestItemSignal", {
					get : function() {
						return this._requestItemSignal;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "moveCompleteSignal", {
					get : function() {
						return this._moveCompleteSignal;
					},
					enumerable : !0,
					configurable : !0
				}), c;
	}(Phaser.Image);
	a.StarPowerUp = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c) {
			a.call(this, b, c), this.alive = !1, this._completeSignal = new Phaser.Signal(), this
					.initArrows(), this.hideArrows();
		}
		return __extends(b, a), b.prototype.initArrows = function() {
			this.arrow1 = this.game.add.image(0, 0, "graphics_1",
					"PowerUp_Line0000", this), this.arrow1.anchor.set(.5, .5), this.arrow2 = this.game.add
					.image(0, 0, "graphics_1", "PowerUp_Line0000", this), this.arrow2.anchor
					.set(.5, .5), this.arrow2.angle = 180;
		}, b.prototype.launch = function() {
			this.showArrows();
		}, b.prototype.showArrows = function() {
			this.arrow1.visible = !0, this.arrow1.exists = !0, this.arrow1.alpha = 1, this.arrow2.visible = !0, this.arrow2.exists = !0, this.arrow2.alpha = 1;
		}, b.prototype.launchArrow = function(a, b, c) {
			var d = Phaser.Math.distance(a.x, a.y, b, c), e = this
					.getTweenDuration(d), f = this.game.add.tween(a).to({
						x : b,
						y : c
					}, e, Phaser.Easing.Linear.None, !0);
			return f.duration = e, this.game.add.tween(a).to({
						alpha : 0
					}, .3 * e, Phaser.Easing.Linear.None, !0, .7 * e), f;
		}, b.prototype.getTweenDuration = function(a) {
			return .8 * a;
		}, b.prototype.onComplete = function() {
			this._completeSignal.dispatch(), this.hide();
		}, b.prototype.hide = function() {
			this.hideArrows(), this.onAddToPool();
		}, b.prototype.hideArrows = function() {
			this.arrow1.visible = !1, this.arrow1.exists = !1, this.arrow2.visible = !1, this.arrow2.exists = !1;
		}, b.prototype.onAddToPool = function() {
			this.exists = !1, this.visible = !1, this.alive = !1;
		}, b.prototype.onRemoveFromPool = function() {
			this.exists = !0, this.visible = !0, this.alive = !0;
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this, !0, !1), this.arrow1 = null, this.arrow2 = null, this._completeSignal
					.dispose(), this._completeSignal = null;
		}, Object.defineProperty(b.prototype, "completeSignal", {
					get : function() {
						return this._completeSignal;
					},
					enumerable : !0,
					configurable : !0
				}), b;
	}(Phaser.SpriteBatch);
	a.PowerUpFX = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, c), this.orientation = "horizontal";
		}
		return __extends(c, b), c.prototype.launch = function(c, d) {
			b.prototype.launch.call(this, c, d), this.arrow1.y = d, this.arrow1.x = c;
			var e = this.launchArrow(this.arrow1, 0, d);
			this.arrow2.y = d, this.arrow2.x = c;
			var f = this.launchArrow(this.arrow2, a.Config.GAME_WIDTH, d);
			e.duration > f.duration ? e.onComplete.addOnce(this.onComplete,
					this) : f.onComplete.addOnce(this.onComplete, this);
		}, c;
	}(a.PowerUpFX);
	a.HorizontalPowerUpFX = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, c), this.orientation = "vertical";
		}
		return __extends(c, b), c.prototype.initArrows = function() {
			b.prototype.initArrows.call(this), this.arrow1.angle = -90, this.arrow2.angle = 90;
		}, c.prototype.launch = function(c, d) {
			b.prototype.launch.call(this, c, d), this.arrow1.y = d, this.arrow1.x = c;
			var e = this.launchArrow(this.arrow1, c, a.Config.GAME_HEIGHT);
			this.arrow2.y = d, this.arrow2.x = c;
			var f = this.launchArrow(this.arrow2, c, 0);
			e.duration > f.duration ? e.onComplete.addOnce(this.onComplete,
					this) : f.onComplete.addOnce(this.onComplete, this);
		}, c;
	}(a.PowerUpFX);
	a.VerticalPowerUpFX = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c, d, "tutorial_hand"), this.hidden = !1, this
					.initAnimation(), this.startTweens();
		}
		return __extends(b, a), b.prototype.initAnimation = function() {
			this.animations.add("release", Phaser.Animation.generateFrameNames(
							"Tutorial_Hand", 0, 0, "", 4)), this.animations
					.add("main", Phaser.Animation.generateFrameNames(
									"Tutorial_Hand", 0, 23, "", 4)), this.play(
					"main", 30, !1);
		}, b.prototype.startTweens = function() {
			var a = this;
			this.hidden
					|| (this.position.set(295, 410), this.alpha = 1, this.play(
							"main", 30, !1), this.game.add.tween(this).to({
								x : 115,
								y : 580
							}, 1300, Phaser.Easing.Linear.None, !0, 750).onComplete
							.addOnce(function() {
										a.hidden === !1
												&& (a.game.time.events.add(600,
														a.startTweens, a), a
														.play("release", 30, !1));
									}));
		}, b.prototype.hideAndDestroy = function() {
			this.hidden = !0, this.animations.stop(), this.game.add.tween(this)
					.to({
								alpha : 0
							}, 200, Phaser.Easing.Linear.None, !0).onComplete
					.addOnce(this.destroy, this);
		}, b;
	}(Phaser.Sprite);
	a.TutorHand = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c) {
			var d = {
				font : "26px GrilledCheeseBTNToasted",
				fill : "#296B98",
				align : "center"
			};
			a.call(this, b, 0, 0, c, d), this.stroke = "#FFFFFF", this.strokeThickness = 8, this.anchor
					.set(.5, .5), this.initTweens(), this.exists = !1, this.visible = !1, this.alive = !1;
		}
		return __extends(b, a), b.prototype.initTweens = function() {
			this.scale.set(0, 0), this.showTween = this.game.add
					.tween(this.scale).to({
								x : 1,
								y : 1
							}, 500, Phaser.Easing.Back.Out), this.hideTween = this.game.add
					.tween(this).to({
								alpha : 0
							}, 200, Phaser.Easing.Linear.None, !1, 600), this.hideTween.onComplete
					.add(this.onAddToPool, this);
		}, b.prototype.updateValue = function(a) {
			this.setText("+" + a);
		}, b.prototype.show = function() {
			this.exists = !0, this.visible = !0, this.alpha = 1, this.scale
					.set(0, 0), this.showTween.start(), this.hideTween.start();
		}, b.prototype.onAddToPool = function() {
			this.exists = !1, this.visible = !1, this.alive = !1;
		}, b.prototype.onRemoveFromPool = function() {
			this.exists = !0, this.visible = !0, this.alive = !0;
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this, !0), this.showTween.stop(), this.showTween = null, this.hideTween
					.stop(), this.hideTween = null;
		}, b;
	}(Phaser.Text);
	a.PointsFX = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(a) {
		function b(b, c) {
			var d = {
				font : "35px GrilledCheeseBTNToasted",
				fill : "#FBAF05",
				align : "center"
			};
			a.call(this, b, 0, 0, c, d), this.stroke = "#FFFFFF", this.strokeThickness = 11, this.anchor
					.set(.5, .5), this.initTweens(), this.exists = !1, this.visible = !1;
		}
		return __extends(b, a), b.prototype.initTweens = function() {
			this.scale.set(0, 0), this.showTween = this.game.add
					.tween(this.scale).to({
								x : 1,
								y : 1
							}, 800, Phaser.Easing.Elastic.Out), this.hideTween = this.game.add
					.tween(this).to({
								alpha : 0
							}, 200, Phaser.Easing.Linear.None, !1, 900), this.hideTween.onComplete
					.add(this.onHideComplete, this);
		}, b.prototype.show = function() {
			this.exists = !0, this.visible = !0, this.alpha = 1, this.scale
					.set(0, 0), this.showTween.start(), this.hideTween.start(), this.game.add
					.tween(this).to({
								y : this.y - 30
							}, 300, Phaser.Easing.Back.In, !0, 700);
		}, b.prototype.onHideComplete = function() {
			this.exists = !1, this.visible = !1;
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this, !0), this.showTween.stop(), this.showTween = null, this.hideTween
					.stop(), this.hideTween = null;
		}, b;
	}(Phaser.Text);
	a.TextFX = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, c, "bonus_time_fx"), this.initIcon(), this
					.initText(), this.exists = !1, this.visible = !1;
		}
		return __extends(c, b), c.prototype.initIcon = function() {
			this.icon = this.game.add.image(-26, 0, "graphics_1",
					"BigTimer0000", this), this.icon.anchor.set(.5, .5);
		}, c.prototype.initText = function() {
			this.text = this.game.add.bitmapText(this.icon.x + .5
							* this.icon.width, -25, "timer", "+10", 50, this);
		}, c.prototype.show = function(a, b) {
			this.exists = !0, this.visible = !0, this.text.setText(b), this
					.setPosition(a), this.alpha = 0, this.scale.set(0, 1), this.game.add
					.tween(this).to({
								alpha : 1
							}, 200, Phaser.Easing.Linear.None, !0, 200), this.game.add
					.tween(this).to({
								y : this.y - 118
							}, 400, Phaser.Easing.Back.Out, !0, 200), this.game.add
					.tween(this.scale).to({
								x : 1
							}, 1200, Phaser.Easing.Elastic.Out, !0, 200).onComplete
					.addOnce(this.hide, this);
		}, c.prototype.setPosition = function(b) {
			var c = 110, d = Phaser.Math.clamp(b.x, c, a.Config.GAME_WIDTH - c);
			this.position.set(d, b.y);
		}, c.prototype.hide = function() {
			var a = 400, b = 100, c = a - b;
			this.game.add.tween(this).to({
						alpha : 0
					}, b, Phaser.Easing.Linear.None, !0, c), this.game.add
					.tween(this).to({
								y : this.y - 50
							}, a, Phaser.Easing.Back.In, !0).onComplete
					.addOnce(this.onHideComplete, this);
		}, c.prototype.onHideComplete = function() {
			this.exists = !1, this.visible = !1;
		}, c;
	}(Phaser.Group);
	a.BonusTimeFX = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, 0, 0, "splashes"), this.itemType = c, this
					.initAnimation(), this.anchor.set(.5, .5), this.scale.set(
					1.2, 1.2);
		}
		return __extends(c, b), c.prototype.initAnimation = function() {
			var b = "Splash_" + a.ItemType[this.itemType], c = Phaser.Animation
					.generateFrameNames(b, 0, 19, "", 4), d = this.animations
					.add("main", c, 60, !1);
			d.onComplete.addOnce(this.hide, this), d.play();
		}, c.prototype.hide = function() {
			this.exists = !1, this.visible = !1, this.game.time.events.add(100,
					this.destroy, this);
		}, c;
	}(Phaser.Sprite);
	a.FruitSplash = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(a, c) {
			b.call(this, a, c), this.addMonkey(), this.addBasket(), this._dispatchFruitsComplete = new Phaser.Signal(), this.exists = !1, this.visible = !1;
		}
		return __extends(c, b), c.prototype.addMonkey = function() {
			this.monkey = this.game.add.image(0, 0, "graphics_1", "Monkey0000",
					this), this.monkey.anchor.set(.5, .5);
		}, c.prototype.addBasket = function() {
			this.basket = this.game.add.image(-5, 55, "graphics_1",
					"Monkey_Basket0000", this), this.basket.anchor.set(.5, .5);
		}, c.prototype.show = function() {
			this.exists = !0, this.visible = !0, this.position.y = a.Config.GAME_HEIGHT
					- 94, this.scale.set(0, 0), this.game.add.tween(this.scale)
					.to({
								x : 1,
								y : 1
							}, 1e3, Phaser.Easing.Elastic.Out, !0);
		}, c.prototype.hide = function() {
			this.game.add.tween(this).to({
						y : a.Config.GAME_HEIGHT + 100
					}, 300, Phaser.Easing.Back.In, !0).onComplete.addOnce(
					this.onHideComplete, this);
		}, c.prototype.shakeBasket = function() {
			a.Main.weakDevice === !1
					&& (this.basket.angle = -3, this.game.add
							.tween(this.basket).to({
										angle : 3
									}, 150, Phaser.Easing.Sinusoidal.Out, !0,
									0, 11, !0));
		}, c.prototype.collectFruits = function() {
			this.show(), this.game.time.events.add(1800, this.hide, this);
		}, c.prototype.dispatchFruits = function() {
			this.show(), this.game.time.events.add(300, this.shakeBasket, this), this.game.time.events
					.add(2700, this.onDispatchComplete, this);
		}, c.prototype.onDispatchComplete = function() {
			this.game.time.events.add(500,
					this._dispatchFruitsComplete.dispatch, this), this.hide();
		}, c.prototype.onHideComplete = function() {
			this.exists = !1, this.visible = !1;
		}, Object.defineProperty(c.prototype, "dispatchFruitsComplete", {
					get : function() {
						return this._dispatchFruitsComplete;
					},
					enumerable : !0,
					configurable : !0
				}), c;
	}(Phaser.Group);
	a.Monkey = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c() {
			b.apply(this, arguments), this.chainItemType = null, this.lastItemInChain = null, this.pointerDown = !1, this.pointerEnabled = !0, this.debugRenderFlag = !1;
		}
		return __extends(c, b), c.prototype.init = function() {
			this.pointerEnabled = !0, this.pointerDown = !1, this.chain = [], this.chainItemType = null, this.lastItemInChain = null, this.activeItems = [], this.chainLinks = [], this.chainLinkPos = new Phaser.Point(), this.shuffleDuration = 200, this.firstGridFill = !0, this.level = 1, this.chainCollected = !1, this.powerUpsActivated = 0, this.powerUpsCompleted = 0, this.gameOver = !1;
		}, c.prototype.create = function() {
			this.game.state.onShutDownCallback = this.destroy, this
					.initRoundResult(), this.addLayers(), this.itemsPool = new a.ItemsPool(
					this.game, this.itemsLayer), this.findChainStrategy = new a.FindChainStrategy(
					this.game, this.grid, this.activeItems), this
					.initChainLinks(), this.initItemsGenerator(), this.taskGenerator = new a.TaskGenerator(this.game), this
					.addGUI(), this.setNewTask(), this.addItems(), this
					.initStarsPool(), this.initPowerUpsPool(), this
					.initPowerUpFxsPool(), this.initFuturePowerUpsPool(), this
					.addBonusTimeFX(), this.addMonkey(), this
					.initKeyCallbacks(), this.game.input.onDown.add(
					this.onPointerDown, this), this.game.input.onUp.add(
					this.onPointerUp, this), a.Main.weakDevice
					? (this.addTutorHand(), this.currentTask.timer.start())
					: (this.pointerEnabled = !1, this.hideItemsOverMonkey(), this.activeItems
							.forEach(function(a) {
										a.visible = !1;
									}), this.game.time.events.add(600,
							this.dispatchItemsFromMonkey, this), this.game.time.events
							.add(2600, this.addTutorHand, this));
		}, c.prototype.addTutorHand = function() {
			this.tutorHand = new a.TutorHand(this.game, 295, 410), this.itemsLayer
					.add(this.tutorHand);
		}, c.prototype.initStarsPool = function() {
			for (var b = [], c = 3, d = 0; c > d; d++) {
				var e = new a.StarPowerUp(this.game);
				this.topLayer.add(e), b.push(e);
			}
			this.starsPool = new utils.ObjectPool(b);
		}, c.prototype.initPowerUpsPool = function() {
			for (var b = [], c = 8, d = 0; c > d; d++) {
				var e = new a.PowerUp(this.game);
				this.itemsLayer.add(e), b.push(e);
			}
			this.powerUpsPool = new utils.ObjectPool(b);
		}, c.prototype.initPowerUpFxsPool = function() {
			for (var b = [], c = 8, d = 0; c > d; d++) {
				var e = 4 > d ? new a.VerticalPowerUpFX(this.game,
						this.topLayer) : new a.HorizontalPowerUpFX(this.game,
						this.topLayer);
				this.topLayer.add(e), b.push(e);
			}
			this.powerUpFxsPool = new utils.ObjectPool(b);
		}, c.prototype.initFuturePowerUpsPool = function() {
			for (var b = [], c = 4, d = 0; c > d; d++) {
				var e = new a.FuturePowerUp(this.game);
				this.itemsLayer.addAt(e, 0), b.push(e);
			}
			this.futurePowerUpsPool = new utils.ObjectPool(b);
		}, c.prototype.initRoundResult = function() {
			this.roundResult = new a.RoundResult(), this.roundResult.level = this.level;
		}, c.prototype.addLayers = function() {
			this.addBackground(), this.addGrid(), this.itemsLayer = this.game.add
					.spriteBatch(this.world, "objects_layer"), this.topLayer = this.game.add
					.group(this.world, "above_items"), this.addLeafs();
		}, c.prototype.addBackground = function() {
			var b = this.game.add.image(0, 0, "graphics_1", "BG_Sky0000",
					this.world);
			b.anchor.set(.5, .5), b.x = a.Config.HALF_GAME_WIDTH, b.y = a.Config.HALF_GAME_HEIGHT
					- 1;
		}, c.prototype.addGrid = function() {
			this.grid = new a.Grid(this.game, this.world), this.grid.cacheAsBitmap = !0, this.grid.position
					.set(.5 * (a.Config.GAME_WIDTH - this.grid.getWidth()), .5
									* (a.Config.GAME_HEIGHT - this.grid
											.getHeight()) + 64);
		}, c.prototype.addLeafs = function() {
			var b = (this.game.add.image(566, 682, "leafs",
					"BottomRight_Leafs0000", this.topLayer), this.game.add
					.image(a.Config.HALF_GAME_WIDTH, a.Config.GAME_HEIGHT - 30,
							"leafs", "Bottom_Leafs0000", this.topLayer), this.game.add
					.image(-45, 708, "leafs", "BottomLeft_Leafs0000",
							this.topLayer), this.game.add.image(460, -45,
					"leafs", "TopRight_Leafs0000", this.topLayer), this.game.add
					.image(-50, -40, "leafs", "TopLeft_Leafs0000",
							this.topLayer));
			this.world.addAt(b, 1);
		}, c.prototype.addBonusTimeFX = function() {
			this.bonusTimeFX = new a.BonusTimeFX(this.game, this.topLayer), this.bonusTimeFX.position
					.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT);
		}, c.prototype.addMonkey = function() {
			this.monkey = new a.Monkey(this.game, this.topLayer), this.monkey.position
					.set(a.Config.GAME_WIDTH - 146, a.Config.GAME_HEIGHT - 96), this.world
					.addAt(this.monkey, 4);
		}, c.prototype.initChainLinks = function() {
			var b = 20;
			this.chainLinks = [];
			for (var c = 0; b > c; c++) {
				var d = new a.ChainLink(this.game);
				this.itemsLayer.add(d), this.chainLinks.push(d);
			}
		}, c.prototype.setNewTask = function() {
			this.currentTask
					&& (this.currentTask.destroy(), this.currentTask = null), this.currentTask = this.taskGenerator
					.generateTask(this.level), this.currentTask.timer.completeSignal
					.addOnce(this.onGameOver, this), this.gui.syncWithTask(
					this.currentTask, this.level), this.itemsGenerator
					.setAllowedItemTypes(this.currentTask.allowedItemTypes);
		}, c.prototype.onTaskCompleteStageOne = function() {
			this.gameOver
					|| (this.currentTask.timer.onPause(), this.disableInput(), this.gui
							.hidePauseButton(), this.gui.levelUpFX.hideCompleteSignal
							.addOnce(this.onTaskCompleteStageTwo, this), this.gui.levelUpFX
							.show());
		}, c.prototype.disableInput = function() {
			this.pointerEnabled = !1, this.pointerDown = !1;
		}, c.prototype.activateAllPowerUps = function() {
			this.powerUpsPool.items.forEach(function(a) {
						a.alive && a.activate();
					});
		}, c.prototype.onTaskCompleteStageTwo = function() {
			var a = this.powerUpsPool.items.some(function(a) {
						return a.alive;
					});
			a ? (this.activateAllPowerUps(), this.game.time.events.add(1200,
					this.collectFruitsToBasket, this), this.game.time.events
					.add(3300, this.onTaskCompleteStageThree, this)) : (this
					.collectFruitsToBasket(), this.game.time.events.add(2300,
					this.onTaskCompleteStageThree, this));
		}, c.prototype.collectFruitsToBasket = function() {
			var b = a.Config.GAME_WIDTH - 150, c = a.Config.GAME_HEIGHT - 60;
			this.hideItemsOverMonkey(), this.monkey.collectFruits(), this.activeItems
					.forEach(function(a) {
								a.collectToBasket(b, c);
							}), this.activeItems.length = 0;
		}, c.prototype.removeAllItems = function(a) {
			this.activeItems.forEach(function(b) {
						b.removeFromGrid(a);
					}), this.activeItems.length = 0;
		}, c.prototype.getItemsOverMonkey = function() {
			var a = [];
			return a.push(this.grid.getCellAt(6, 5)), a.push(this.grid
					.getCellAt(6, 6)), a.push(this.grid.getCellAt(7, 4)), a
					.push(this.grid.getCellAt(7, 5)), a.push(this.grid
					.getCellAt(7, 6)), a;
		}, c.prototype.hideItemsOverMonkey = function() {
			var a = this.getItemsOverMonkey();
			a.forEach(function(a) {
						a && a.item && a.item.alive && (a.item.alpha = 0);
					});
		}, c.prototype.showItemsOverMonkey = function() {
			var a = this, b = this.getItemsOverMonkey();
			b.forEach(function(b) {
						b && b.item && b.item.alive
								&& a.game.add.tween(b.item).to({
											alpha : 1
										}, 150, Phaser.Easing.Linear.None, !0);
					});
		}, c.prototype.onTaskCompleteStageThree = function() {
			this.calculateAndSaveResult(), this.roundResult.doReset(), this.level++, this
					.setNewTask(), this.gui.taskBoard.hideCompleteSignal
					.addOnce(this.onTaskBoardHide, this), this.gui.taskBoard
					.show(this.currentTask, this.level);
		}, c.prototype.onTaskBoardHide = function() {
			this.chain.length = 0, this.addItems(), this.hideItemsOverMonkey(), this
					.dispatchItemsFromMonkey();
		}, c.prototype.dispatchItemsFromMonkey = function() {
			var b = this;
			this.monkey.dispatchFruits(), this.monkey.dispatchFruitsComplete
					.addOnce(this.onMonkeyDispatchComplete, this), this.activeItems
					.forEach(function(c) {
						var d = c.x, e = c.y, f = a.Config.GAME_WIDTH - 150, g = a.Config.GAME_HEIGHT
								- 65, h = Phaser.Math.distance(d, e, f, g), i = 400
								+ 150 * (c.cell.column + c.cell.row);
						c.position.set(f, g), c.visible = !1, b.game.add
								.tween(c).to({
											x : d,
											y : e
										}, h, Phaser.Easing.Cubic.Out, !0, i).onStart
								.addOnce(function() {
											c.visible = !0;
										});
					});
		}, c.prototype.onMonkeyDispatchComplete = function() {
			this.showItemsOverMonkey(), this.currentTask.timer.start(), this.pointerEnabled = !0, this.gui
					.showPauseButton();
		}, c.prototype.onGameOver = function() {
			this.gameOver = !0, this.disableInput(), this.fadeInAllItems(), this
					.hideAllChainLinks(), this.gui.onGameOver(this.level,
					a.Main.stats.totalPoints), this.game.sound.stopAll(), this.game.sound.usingWebAudio
					&& this.game.sound.play("game_over");
		}, c.prototype.calculateAndSaveResult = function() {
			var b = 100, c = this.currentTask.timer.remainingSeconds * b, d = this.roundResult.points
					+ c, e = a.Main.stats.totalPoints + d;
			a.Main.stats.updatePoints(e);
		}, c.prototype.initItemsGenerator = function() {
			this.itemsGenerator = new a.ItemsGenerator(this.game, this.grid), this.itemsGenerator
					.setAddItemCallback(this.addItem, this);
		}, c.prototype.addItem = function(a) {
			var b = this.grid.getFreeCell();
			if (b) {
				var c = this.grid.position.x + b.x + .5 * b.width, d = this.grid.position.y
						+ b.y + .5 * b.height, e = this.itemsPool.getItem(a);
				e.position.set(c, d), e.linkCell(b), e
						.showOnGrid(this.firstGridFill), this.activeItems
						.push(e);
			}
		}, c.prototype.addItems = function() {
			var a = this.grid.columns * this.grid.rows;
			this.itemsGenerator.generateItems(a), this.firstGridFill = !1;
		}, c.prototype.addGUI = function() {
			this.gui = new a.LevelGUI(this.game), this.gui.pauseSignal.add(
					this.togglePause, this), this.gui.restartSignal.add(
					this.restartGame, this);
		}, c.prototype.togglePause = function(a) {
			"pause" === a ? this.pauseGame() : "resume" === a
					&& this.resumeGame();
		}, c.prototype.pauseGame = function() {
			this.pointerEnabled = !1, this.currentTask.timer.onPause(), this.gui
					.onPause();
		}, c.prototype.resumeGame = function() {
			this.pointerEnabled = !0, this.currentTask.timer.onResume(), this.gui
					.onResume();
		}, c.prototype.restartGame = function() {
			a.Main.stats.updatePoints(0), this.level = 1, this.setNewTask(), this
					.removeAllItems(!0), this.destoyAllPowerUps(), this
					.addItems(), this.currentTask.timer.start(), this.gui
					.onRestart(), this.pointerEnabled = !0, this.gameOver = !1, this.game.sound
					.play("main_loop", .33, !0);
		}, c.prototype.destoyAllPowerUps = function() {
			this.starsPool.items.forEach(function(a) {
						a.returnToPool();
					}), this.powerUpsPool.items.forEach(function(a) {
						a.returnToPool();
					}), this.futurePowerUpsPool.items.forEach(function(a) {
						a.onAddToPool();
					});
		}, c.prototype.initKeyCallbacks = function() {
			a.Main.development
					&& (this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown
							.add(this.toggleDebugRender, this), this.game.input.keyboard
							.addKey(Phaser.Keyboard.F).onDown.add(
							this.findPossibleMoves, this), this.game.input.keyboard
							.addKey(Phaser.Keyboard.S).onDown.add(
							this.shuffleItems, this), this.game.input.keyboard
							.addKey(Phaser.Keyboard.T).onDown.add(
							this.onTaskCompleteStageOne, this), this.game.input.keyboard
							.addKey(Phaser.Keyboard.O).onDown.add(
							this.onGameOver, this));
		}, c.prototype.findPossibleMoves = function() {
			var a = this, b = this.findChainStrategy.getPossibleMove();
			b && b.forEach(function(b) {
						a.game.add.tween(b.scale).to({
									x : .66,
									y : .66
								}, 666, Phaser.Easing.Back.Out, !0, 0, 1, !0);
					});
		}, c.prototype.toggleDebugRender = function() {
			this.debugRenderFlag = !this.debugRenderFlag;
		}, c.prototype.onRoundEnd = function() {
			this.saveResult();
		}, c.prototype.saveResult = function() {
		}, c.prototype.onPointerDown = function() {
			this.pointerEnabled
					&& (this.pointerDown = !0, this.chain.length = 0, this.chainItemType = null, this.lastItemInChain = null);
		}, c.prototype.onPointerUp = function() {
			this.pointerEnabled
					&& (this.pointerDown = !1, this.hideAllChainLinks(), this
							.fadeInAllItems(), this.chain.length > 2
							? (this.pointerEnabled = !1, this.chainCollected = !1, this.powerUpsActivated = 0, this.powerUpsCompleted = 0, this
									.collectItems())
							: this.unhighlightChainItems());
		}, c.prototype.collectItems = function() {
			var a = this.currentTask.hasItemType(this.chainItemType);
			a && this.gui.panda.openMouth(), this.checkForTimeBonus(), this.lastItemInChain.collectCompleteSignal
					.addOnce(this.onChainCollected, this), this
					.collectItemsInChain();
		}, c.prototype.collectItemsInChain = function() {
			var a = this, b = 0;
			this.chain.forEach(function(c) {
						a.collectItem(c), b += 50;
					});
		}, c.prototype.collectItem = function(a, b) {
			if ("undefined" == typeof b && (b = !1), !a.collected) {
				var c = this.currentTask.hasItemType(a.itemType);
				b || c === !1 ? a.collect() : (this.itemsLayer.bringToTop(a), a
						.collectToPanda(this.gui.panda.position)), a
						.clearCell(), this.removeFromActiveItems(a), this.currentTask
						.onItemCollected(a), this.roundResult.points += 100;
			}
		}, c.prototype.onChainCollected = function() {
			this.chainCollected = !0, this.gui.panda.isMouthOpen()
					&& this.gui.panda.chew(), this.chainCollected
					&& this.powerUpsCompleted === this.powerUpsActivated
					&& this.onCollectComplete();
		}, c.prototype.checkForTimeBonus = function() {
			if (this.chain.length >= 8) {
				var a = this.chain.length;
				this.currentTask.timer.addSeconds(a), this.bonusTimeFX.show(
						this.lastItemInChain.position, "+" + a.toString());
			}
		}, c.prototype.onPowerUpComplete = function() {
			this.currentTask.isComplete
					|| (this.powerUpsCompleted++, this.chainCollected
							&& this.powerUpsCompleted === this.powerUpsActivated
							&& this.onCollectComplete());
		}, c.prototype.onCollectComplete = function() {
			this.moveItems(), this.refillGrid(), this.currentTask
					.onCollectCycleComplete(), this.currentTask.isComplete
					? this.onTaskCompleteStageOne()
					: this.checkPossibleMoves();
		}, c.prototype.moveItems = function() {
			this.resetDropDistances(), this.setDropDistances(), this
					.doMoveItems();
		}, c.prototype.resetDropDistances = function() {
			this.activeItems.forEach(function(a) {
						a.dropDistance = 0;
					});
		}, c.prototype.setDropDistances = function() {
			for (var a = this.grid.cells.length, b = 0; a > b; b++) {
				var c = this.grid.cells[b];
				c.isFree()
						&& this.increaseDropDistanceForColumn(c.row, c.column);
			}
		}, c.prototype.increaseDropDistanceForColumn = function(b, c) {
			for (var d = b - 1; d >= 0; d--) {
				var e = this.grid.getCellAt(d, c);
				e.item && (e.item.dropDistance += a.Cell.HEIGHT);
			}
		}, c.prototype.doMoveItems = function() {
			for (var a = this.grid.cells.length, b = a - 1; b >= 0; b--) {
				var c = this.grid.cells[b], d = c.item;
				if (d && d.dropDistance > 0) {
					var e = d.position.y + d.dropDistance, f = this.grid
							.getCellUnderPoint(d.position.x, e);
					d.linkCell(f), d.moveTo(e);
				}
			}
		}, c.prototype.refillGrid = function() {
			var a = this.grid.getFreeCellsNum();
			this.itemsGenerator.generateItems(a);
		}, c.prototype.checkPossibleMoves = function() {
			var a = this.findChainStrategy.getPossibleMove();
			a
					? this.pointerEnabled = !0
					: (this.shuffleItems(), this.game.time.events.add(
							this.shuffleDuration + 50, this.checkPossibleMoves,
							this));
		}, c.prototype.shuffleItems = function() {
			this.removeRandomItems(), this.game.time.events.add(
					this.shuffleDuration, this.refillGrid, this);
		}, c.prototype.removeRandomItems = function() {
			for (var a = Math.floor(this.activeItems.length / 3), b = 0; a > b; b++) {
				var c = this.game.rnd.pick(this.activeItems);
				c.removeFromGrid(!1), this.removeFromActiveItems(c);
			}
		}, c.prototype.unhighlightChainItems = function() {
			for (var a = this.chain.length, b = 0; a > b; b++)
				this.chain[b].unhighlight();
		}, c.prototype.removeFromActiveItems = function(a) {
			var b = this.activeItems.indexOf(a);
			b > -1 && this.activeItems.splice(b, 1);
		}, c.prototype.update = function() {
			this.selectItems();
		}, c.prototype.selectItems = function() {
			if (this.pointerDown) {
				var a = this.getItemUnderPoint(
						this.game.input.activePointer.worldX,
						this.game.input.activePointer.worldY);
				if (a) {
					var b = null === this.chainItemType
							|| this.chainItemType === a.itemType, c = -1 === this.chain
							.indexOf(a), d = this.lastItemInChain ? this
							.isDistanceFits(this.lastItemInChain, a) : !0;
					if (b && c === !1) {
						var e = this.chain.indexOf(a);
						if (e === this.chain.length - 2)
							return this.lastItemInChain.unhighlight(), this.chain
									.splice(e + 1, 1), this.lastItemInChain = a, void this
									.hideLastUsedChainLink();
					}
					b
							&& c
							&& d
							&& (this.addItemToChain(a), this.chain.length > 1
									&& this.showNewChainLink());
				}
			}
		}, c.prototype.addItemToChain = function(a) {
			this.tutorHand
					&& (this.tutorHand.hideAndDestroy(), this.tutorHand = null), this.game.sound.usingWebAudio
					&& this.game.sound.play("select_fruit", .2), a.highlight(), this.chain
					.push(a), this.lastItemInChain = a;
			var b = this.chain.length;
			1 === b
					&& (this.chainItemType = a.itemType, this
							.fadeOutSomeItems(this.chainItemType)), b > 0
					&& b % 6 === 0 && this.addFuturePowerUp(a);
		}, c.prototype.fadeOutSomeItems = function(a) {
			this.activeItems.forEach(function(b) {
						b.itemType !== a && (b.alpha = .33);
					});
		}, c.prototype.fadeInAllItems = function() {
			this.activeItems.forEach(function(a) {
						a.alpha = 1;
					});
		}, c.prototype.addFuturePowerUp = function(a) {
			var b = this.futurePowerUpsPool.getItem();
			b
					&& (b.x = a.x, b.y = a.y, b.activateSignal.addOnce(
							this.onFuturePowerupActivated, this), a
							.setFuturePowerUp(b), a.hasPowerUp()
							&& (b.visible = !1));
		}, c.prototype.onFuturePowerupActivated = function(a) {
			var b = this.starsPool.getItem();
			b
					&& (b.position.set(a.x, a.y), b.requestItemSignal.addOnce(
							this.onStarRequest, this), b.show(), this.game.sound.usingWebAudio
							&& this.game.sound.play("star_appear", .2));
		}, c.prototype.onStarRequest = function(a) {
			var b = this.findItemForPowerUp();
			b ? (a.moveCompleteSignal.addOnce(this.addPowerUp, this), a
					.moveToItem(b.x, b.y)) : a.returnToPool();
		}, c.prototype.findItemForPowerUp = function() {
			for (var a = 0; a++ <= 100;) {
				var b = this.game.rnd.pick(this.activeItems);
				if (b.hasPowerUp() === !1)
					return b;
			}
			return null;
		}, c.prototype.addPowerUp = function(a) {
			var b = this.getItemUnderPoint(a.x, a.y);
			if (b && b.hasPowerUp() === !1) {
				var c = this.powerUpsPool.getItem();
				c
						&& (c.activateSignal.addOnce(this.applyPowerUp, this), c
								.init(b), b.setPowerUp(c));
			}
		}, c.prototype.applyPowerUp = function(a) {
			var b = this, c = this.getItemsAffectedByPowerUp(a);
			c.forEach(function(c) {
						var d = Phaser.Math.distance(a.x, a.y, c.x, c.y), e = .7
								* d;
						b.game.time.events.add(e, function() {
									b.collectItem(c, !0);
								}, b);
					}), this.showPowerUpFX(a.x, a.y, a.angle), this.game.sound.usingWebAudio
					&& this.game.sound.play("powerup", .4);
		}, c.prototype.getItemsAffectedByPowerUp = function(a) {
			var b = a.linkedItem, c = b.cell, d = 0 === a.angle ? this
					.getItemsInRow(c.row) : this.getItemsInColumn(c.column);
			return d;
		}, c.prototype.showPowerUpFX = function(a, b, c) {
			var d = this.getPowerUpFx(c);
			d
					&& (d.completeSignal.addOnce(this.onPowerUpComplete, this), d
							.launch(a, b), this.powerUpsActivated++);
		}, c.prototype.getPowerUpFx = function(a) {
			var b = 0 === a ? this.powerUpFxsPool.getItemByProperty(
					"orientation", "horizontal") : this.powerUpFxsPool
					.getItemByProperty("orientation", "vertical");
			return b;
		}, c.prototype.getItemsInRow = function(a) {
			for (var b = [], c = 0; c < this.grid.columns; c++) {
				var d = this.grid.getCellAt(a, c), e = d.item;
				e && b.push(e);
			}
			return b;
		}, c.prototype.getItemsInColumn = function(a) {
			for (var b = [], c = 0; c < this.grid.rows; c++) {
				var d = this.grid.getCellAt(c, a), e = d.item;
				e && b.push(e);
			}
			return b;
		}, c.prototype.hideLastUsedChainLink = function() {
			for (var a = this.chainLinks.length; --a > -1;)
				if (this.chainLinks[a].visible === !0)
					return void this.chainLinks[a].hide();
		}, c.prototype.showNewChainLink = function() {
			var a = this.getUnusedLink();
			if (a) {
				var b = this.chain.length, c = this.chain[b - 1], d = this.chain[b
						- 2];
				Phaser.Point.interpolate(c.position, d.position, .5,
						this.chainLinkPos), a.position.set(this.chainLinkPos.x,
						this.chainLinkPos.y), a.rotation = Phaser.Point.angle(
						d.position, c.position)
						+ .5 * Math.PI, a.show(), this.itemsLayer.sendToBack(a);
			}
		}, c.prototype.getUnusedLink = function() {
			for (var a = this.chainLinks.length, b = 0; a > b; b++)
				if (this.chainLinks[b].visible === !1)
					return this.chainLinks[b];
			return null;
		}, c.prototype.hideAllChainLinks = function() {
			for (var a = this.chainLinks.length, b = 0; a > b; b++)
				this.chainLinks[b].hide();
		}, c.prototype.getItemUnderPoint = function(b, c) {
			for (var d = this.activeItems.length, e = 0; d > e; e++) {
				var f = this.activeItems[e], g = utils.MathUtil
						.distanceSquared(f.position.x, f.position.y, b, c);
				if (g < a.Item.RADIUS_SQUARED)
					return f;
			}
			return null;
		}, c.prototype.isDistanceFits = function(b, c) {
			var d = utils.MathUtil.distanceSquared(b.position.x, b.position.y,
					c.position.x, c.position.y);
			return d < a.Item.CONTACT_RADIUS_SQUARED;
		}, c.prototype.destroy = function() {
			this.game.state.onShutDownCallback = null, this.roundResult = null, this.activeItems = null, this.itemsGenerator
					.destroy(), this.itemsGenerator = null, this.chain = null, this.chainLinks = null, this.chainLinkPos = null, this.findChainStrategy
					.destroy(), this.findChainStrategy = null, this.taskGenerator
					.destroy(), this.taskGenerator = null, this.currentTask
					.destroy(), this.currentTask = null, this.monkey = null, this
					.removeKeyCallbacks(), this.destroyPools();
		}, c.prototype.removeKeyCallbacks = function() {
		}, c.prototype.destroyPools = function() {
			this.itemsPool.destroy(), this.itemsPool = null, this.starsPool
					.destroy(), this.starsPool = null, this.powerUpFxsPool
					.destroy(), this.powerUpFxsPool = null, this.powerUpsPool
					.destroy(), this.powerUpsPool = null, this.futurePowerUpsPool
					.destroy(), this.futurePowerUpsPool = null;
		}, c;
	}(Phaser.State);
	a.Level = b;
}(game || (game = {}));

var utils;

!function(a) {
	var b = function() {
		function a() {
			this._enabled = !0, this.init();
		}
		return a.prototype.init = function() {
			try {
				this.localStorage = window.localStorage, this.localStorage
						.setItem("testKey", "testData"), this.localStorage
						.removeItem("testKey");
			} catch (a) {
				this._enabled = !1;
			}
		}, a.prototype.saveValue = function(a, b) {
			if (this._enabled) {
				var c = JSON.stringify(b);
				this.localStorage.setItem(a, c);
			}
		}, a.prototype.getValue = function(a) {
			return this.localStorage.getItem(a);
		}, a.prototype.remove = function(a) {
			this._enabled && this.localStorage.removeItem(a);
		}, a.prototype.clear = function() {
			this._enabled && this.localStorage.clear();
		}, Object.defineProperty(a.prototype, "enabled", {
					get : function() {
						return this._enabled;
					},
					enumerable : !0,
					configurable : !0
				}), a;
	}();
	a.LocalStorageWrapper = b;
}(utils || (utils = {}));

var game;

!function(a) {
	var b = function() {
		function b() {
			this._totalPoints = 0, this._tutorialViewed = !1, this.load();
		}
		return b.prototype.load = function() {
			this._totalPoints = this.getNumericValue("points"), this._tutorialViewed = Boolean(a.Main.storage
					.getValue("tutorial"));
		}, b.prototype.setTutorialViewed = function(b) {
			this._tutorialViewed = b, a.Main.storage.saveValue("tutorial", b);
		}, b.prototype.updatePoints = function(b) {
			b >= 0
					&& (this._totalPoints = b, a.Main.storage.saveValue(
							"points", this._totalPoints));
		}, b.prototype.getNumericValue = function(b) {
			var c = parseInt(a.Main.storage.getValue(b));
			return isNaN(c) ? 0 : c;
		}, b.prototype.clearAll = function() {
			this.updatePoints(0), this.setTutorialViewed(!1);
		}, Object.defineProperty(b.prototype, "totalPoints", {
					get : function() {
						return this._totalPoints;
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "tutorialViewed", {
					get : function() {
						return this._tutorialViewed;
					},
					enumerable : !0,
					configurable : !0
				}), b;
	}();
	a.GameStats = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c(c, d) {
			b.call(this, c, d), this.currentFrame = null, this.tutorialTexts = a.Main.texts.tutorial, this
					.initBack(), this.initFrames(), this.initText(), this.currentFrame = this.frames[0], this.currentFrame.exists = !0, this.currentFrame.visible = !0, this
					.updateText();
		}
		return __extends(c, b), c.prototype.initBack = function() {
			this.back = this.game.add.image(0, 0, "tutorial",
					"Tutorial_Board0000", this), this.back.anchor.set(.5, .5);
		}, c.prototype.initFrames = function() {
			this.frames = [];
			for (var a = 1; 4 >= a; a++) {
				var b = "Tutorial_" + a.toString() + "0000", c = this.game.add
						.image(0, -70, "tutorial", b, this);
				c.visible = !1, c.exists = !1, c.anchor.set(.5, .5), this
						.add(c), this.frames.push(c);
			}
		}, c.prototype.initText = function() {
			var a = {
				font : "34px GrilledCheeseBTNToasted",
				fill : "#FFFFFF",
				align : "center"
			};
			this.text = new Phaser.Text(this.game, 0, 130, "", a), this.text.anchor
					.set(.5, .5), this.text.setShadow(2, 2, "#666666", 2), this.text.wordWrap = !0, this.text.wordWrapWidth = .7
					* this.back.width, this.add(this.text);
		}, c.prototype.isLastFrame = function() {
			var a = this.frames.indexOf(this.currentFrame);
			return a >= this.frames.length - 1;
		}, c.prototype.gotoNextFrame = function() {
			this.hideCurrentFrame();
		}, c.prototype.hideCurrentFrame = function() {
			this.game.add.tween(this.currentFrame).to({
						alpha : 0
					}, 200, Phaser.Easing.Linear.None, !0), this.game.add
					.tween(this.text).to({
								alpha : 0
							}, 200, Phaser.Easing.Linear.None, !0).onComplete
					.addOnce(this.onCurrentFrameHideComplete, this);
		}, c.prototype.onCurrentFrameHideComplete = function() {
			this.currentFrame.exists = !1, this.currentFrame.visible = !1, this
					.setNewFrame(), this.updateText(), this.showNewFrame();
		}, c.prototype.setNewFrame = function() {
			var a = this.frames.indexOf(this.currentFrame), b = a + 1, c = this.frames[b];
			c.exists = !0, c.visible = !0, c.alpha = 0, this.currentFrame = c;
		}, c.prototype.updateText = function() {
			var a = this.frames.indexOf(this.currentFrame), b = this.tutorialTexts[a];
			this.text.setText(b);
		}, c.prototype.showNewFrame = function() {
			this.game.add.tween(this.currentFrame).to({
						alpha : 1
					}, 200, Phaser.Easing.Linear.None, !0), this.game.add
					.tween(this.text).to({
								alpha : 1
							}, 200, Phaser.Easing.Linear.None, !0);
		}, c.prototype.destroy = function() {
			b.prototype.destroy.call(this, !0, !1), this.tutorialTexts = null, this.frames = null, this.currentFrame = null;
		}, c;
	}(Phaser.Group);
	a.TutorialBoard = b;
}(game || (game = {}));

var game;

!function(a) {
	var b = function(b) {
		function c() {
			b.apply(this, arguments);
		}
		return __extends(c, b), c.prototype.create = function() {
			this.game.add.image(0, 0, "main_menu", "main_menu_bg"), this
					.addBoard(), this.addButton(), this.startAnimation();
		}, c.prototype.addBoard = function() {
			this.board = new a.TutorialBoard(this.game, this.world), this.board.position
					.set(a.Config.HALF_GAME_WIDTH, 380);
		}, c.prototype.addButton = function() {
			this.nextButton = new a.SimpleButton(this.game,
					a.Config.HALF_GAME_WIDTH, 730, "buttons",
					"Button_Resume0000"), this.nextButton.callback.add(
					this.onNextButtonClick, this), this.world
					.add(this.nextButton);
		}, c.prototype.onNextButtonClick = function() {
			var a = this;
			this.nextButton.input.enabled = !1, this.game.time.events.add(250,
					function() {
						a.nextButton.input.enabled = !0;
					}, this), this.board.isLastFrame() ? this
					.hideAndStartGame() : this.board.gotoNextFrame();
		}, c.prototype.hideAndStartGame = function() {
			a.Main.stats.setTutorialViewed(!0), this.game.changeState("Level");
		}, c.prototype.startAnimation = function() {
			var a = 200, b = 400, c = 60;
			this.board.alpha = 0, this.board.position.y -= c, this.game.add
					.tween(this.board.position).to({
								y : this.board.position.y + c
							}, b, Phaser.Easing.Back.Out, !0, a), this.game.add
					.tween(this.board).to({
								alpha : 1
							}, 200, Phaser.Easing.Linear.None, !0, a), this.nextButton.position.y += c, this.nextButton.alpha = 0, this.game.add
					.tween(this.nextButton.position).to({
								y : this.nextButton.position.y - c
							}, b, Phaser.Easing.Back.Out, !0, a), this.game.add
					.tween(this.nextButton).to({
								alpha : 1
							}, 200, Phaser.Easing.Linear.None, !0, a);
		}, c;
	}(Phaser.State);
	a.Tutorial = b;
}(game || (game = {})), window.addEventListener("load", onLoad, !1);

var game;

!function(a) {
	var b = function(b) {
		function c() {
			var d = {
				width : a.Config.GAME_WIDTH,
				height : a.Config.GAME_HEIGHT,
				renderer : Phaser.CANVAS,
				parent : "gameContainer",
				transparent : !1,
				antialias : !0,
				enableDebug : c.development
			};
			b.call(this, d), c.storage = new utils.LocalStorageWrapper(), c.stats = new a.GameStats(), this.state
					.add("Boot", a.Boot, !0), this.state.add("Preloader",
					a.Preloader, !1), this.state
					.add("MainMenu", a.MainMenu, !1), this.state.add(
					"Tutorial", a.Tutorial, !1), this.state.add("Level",
					a.Level, !1);
		}
		return __extends(c, b), c.prototype.changeState = function(a, b) {
			this.stateTransitionPlugin
					|| (this.stateTransitionPlugin = this.plugins.plugins[0]), this.stateTransitionPlugin
					.changeState(a, b);
		}, c.development = !1, c.wasMuted = !1, c.weakDevice = !1, c.language = "en", c;
	}(Phaser.Game);
	a.Main = b;
}(game || (game = {}));