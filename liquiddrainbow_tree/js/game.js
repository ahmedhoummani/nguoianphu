function onLoad() {
	new game.Main
}
var game;
!function(a) {
	var b = function() {
		function a() {
		}
		return a.TITLE = "Water Game", a.GAME_WIDTH = 640, a.GAME_HEIGHT = 832, a.HALF_GAME_WIDTH = 320, a.HALF_GAME_HEIGHT = 416, a.LEVELS_NUM = 28, a
	}();
	a.Config = b
}(game || (game = {}));
var __extends = this.__extends || function(a, b) {
	function c() {
		this.constructor = a
	}
	for (var d in b)
		b.hasOwnProperty(d) && (a[d] = b[d]);
	c.prototype = b.prototype, a.prototype = new c
}, game;
!function(a) {
	var b = function(a) {
		function b() {
			a.apply(this, arguments)
		}
		return __extends(b, a), b.prototype.init = function() {
			this.game.device.android
					&& !this.game.device.chrome
					&& (this.game.canvas.parentElement.style.overflow = "visible");
			var a = {
				font : "46px TF2 Build"
			}, b = this.add.text(0, 0, "0", a);
			b.destroy()
		}, b.prototype.preload = function() {
			this.load.image("rotate", "assets/graphics/rotate-phone.png"), this.load
					.image("LoadingBar_Outer",
							"assets/graphics/LoadingBar_Outer.png"), this.load
					.image("LoadingBar_Inner",
							"assets/graphics/LoadingBar_Inner.png")
		}, b.prototype.create = function() {
			var a = this.game.scale;
			a.scaleMode = Phaser.ScaleManager.SHOW_ALL, a.minWidth = 160, a.minHeight = 208, a.sourceAspectRatio = this.game.scale.minWidth
					/ this.game.scale.minHeight, a.pageAlignHorizontally = !0, a.pageAlignVertically = !0, this.game.device.desktop
					|| a.forceOrientation(!1, !0), a.enterIncorrectOrientation
					.add(this.onEnterIncorrectOrientation, this), a.leaveIncorrectOrientation
					.add(this.onLeaveIncorrectOrientation, this), a
					.setScreenSize(!0), this.input.maxPointers = 1, this.stage.disableVisibilityChange = !0, this.stage.backgroundColor = 11320911, this.game.state
					.start("Preloader", !0, !1)
		}, b.prototype.onEnterIncorrectOrientation = function() {
			document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px"
		}, b.prototype.onLeaveIncorrectOrientation = function() {
			document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px", this.game.device.android
					&& !this.game.device.chrome
					&& this.game.scale.setScreenSize(!0)
		}, b
	}(Phaser.State);
	a.Boot = b
}(game || (game = {}));
var game;
!function(a) {
	!function(a) {
		a[a.COMMON = 0] = "COMMON", a[a.SAND = 1] = "SAND", a[a.WATER = 2] = "WATER"
	}(a.TileType || (a.TileType = {}));
	var b = (a.TileType, function(a) {
		function b(b, c, d, e) {
			a.call(this, b, c, d, "levelGraphics", e), this.tileType = 0, this
					.setAnchorByFrameName(e), this.updateRowAndColumn()
		}
		return __extends(b, a), b.prototype.setAnchorByFrameName = function(a) {
			var b = game.CommonTile.ANCHORS[a];
			b ? this.anchor.set(b.x, b.y) : this.anchor.set(.5, .5)
		}, b.prototype.updateRowAndColumn = function() {
			this._row = Math.floor(this.y / b.SIZE), this._column = Math
					.floor(this.x / b.SIZE)
		}, Object.defineProperty(b.prototype, "row", {
					get : function() {
						return this._row
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "column", {
					get : function() {
						return this._column
					},
					enumerable : !0,
					configurable : !0
				}), b.SIZE = 70, b.ANCHORS = {
			GroundTile_10000 : new Phaser.Point(.5, .44),
			GroundTile_20000 : new Phaser.Point(.5, .4),
			GroundTile_30000 : new Phaser.Point(.5, .46),
			SandTile0000 : new Phaser.Point(.5, .4),
			WaterTile0000 : new Phaser.Point(.5, .37)
		}, b
	}(Phaser.Image));
	a.CommonTile = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(b) {
		function c() {
			b.apply(this, arguments)
		}
		return __extends(c, b), c.prototype.preload = function() {
			if (a.Main.development === !1) {
				var b = this.add.image(0, 0, "LoadingBar_Outer");
				b.anchor.set(.5, .5), b.x = a.Config.HALF_GAME_WIDTH - .5, b.y = a.Config.HALF_GAME_HEIGHT;
				var c = this.game.add.sprite(0, 0, "LoadingBar_Inner");
				c.x = a.Config.HALF_GAME_WIDTH - .5 * c.width - .5, c.y = a.Config.HALF_GAME_HEIGHT
						- .5 * c.height - 1.5, this.load.setPreloadSprite(c)
			}
			this.game.device.webAudio
					&& (this.load.audio("sand_block",
							["assets/audio/SandTile.wav"], !0), this.load
							.audio("valve", ["assets/audio/valve.wav"], !0), this.load
							.audio("tap", ["assets/audio/TapSound.wav"], !0), this.load
							.audio("water", ["assets/audio/WaterSound.wav"], !0), this.load
							.audio("levelComplete",
									["assets/audio/LevelCompleteSound.wav"], !0)), this.load
					.audio("main_loop", ["assets/audio/MainLoop.ogg",
									"assets/audio/MainLoop.m4a"], !0), this.load
					.atlasJSONHash("valve", "assets/graphics/valve.png",
							"assets/graphics/valve.json"), this.load
					.atlasJSONHash("flower", "assets/graphics/flower.png",
							"assets/graphics/flower.json"), this.load
					.atlasJSONHash("gnome", "assets/graphics/gnome.png",
							"assets/graphics/gnome.json"), this.load
					.atlasJSONHash("tutorial_hand",
							"assets/graphics/tutorial_hand.png",
							"assets/graphics/tutorial_hand.json"), this.load
					.atlasJSONHash("levelGraphics",
							"assets/graphics/levelGraphics.png",
							"assets/graphics/levelGraphics.json"), this.load
					.atlasJSONHash("gui", "assets/graphics/gui.png",
							"assets/graphics/gui.json"), a.Main.development
					? this.load.json("startLevel",
							"assets/levels/StartLevel.json")
					: this.load.json("levelConfigs",
							"assets/levels/Levels.json")
		}, c.prototype.create = function() {
			if (this.prepareTextures(), this.game.cache
					.removeImage("LoadingBar_Outer"), this.game.cache
					.removeImage("LoadingBar_Inner"), a.Main.development) {
				this.cache.getJSON("startLevel").level
			}
			this.game.state.start("MainMenu", !0, !1, !0)
		}, c.prototype.prepareTextures = function() {
			this.prepareBackground(), this.prepareTopRow(), this
					.prepareLockLevelIcon()
		}, c.prototype.prepareBackground = function() {
			for (var b = new Phaser.Image(this.game, 0, 0, "levelGraphics",
					"BgTile_Light0000"), c = new Phaser.Image(this.game, 0, 0,
					"levelGraphics", "BgTile_Dark0000"), d = Math
					.ceil(a.Config.GAME_HEIGHT / a.CommonTile.SIZE)
					+ 1, e = Math.ceil(a.Config.GAME_WIDTH / a.CommonTile.SIZE)
					+ 1, f = new Phaser.RenderTexture(this.game,
					a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT), g = 5, h = -a.CommonTile.SIZE
					+ 4, i = 0; d > i; i++) {
				for (var j = 0; e / 2 > j; j++)
					f.renderXY(b, g, h), g += 2 * a.CommonTile.SIZE;
				g = i % 2 == 0 ? 5 : 5 + a.CommonTile.SIZE, h += a.CommonTile.SIZE
			}
			g = 5 + 2 * a.CommonTile.SIZE, h = -a.CommonTile.SIZE + 4;
			for (var i = 0; d > i; i++) {
				for (var j = 0; e / 2 > j; j++)
					f.renderXY(c, g - 5, h - 6), g += 2 * a.CommonTile.SIZE;
				g = i % 2 == 0 ? 5 + a.CommonTile.SIZE : 5, h += a.CommonTile.SIZE
			}
			this.cache.addRenderTexture("levelBackground", f), b.destroy(), c
					.destroy()
		}, c.prototype.prepareTopRow = function() {
			for (var b = new Phaser.Image(this.game, 0, 0, "levelGraphics",
					"GroundTile_20000"), c = 0, d = 0, e = new Phaser.RenderTexture(
					this.game, a.Config.GAME_WIDTH, b.height), f = 0; 11 > f; f++)
				e.renderXY(b, c, d), c += a.CommonTile.SIZE;
			b.destroy(), this.cache.addRenderTexture("topRow", e)
		}, c.prototype.prepareLockLevelIcon = function() {
			var a = new Phaser.Image(this.game, 0, 0, "gui", "Button_Base0000"), b = new Phaser.Image(
					this.game, 0, 0, "gui", "LevelIcon_Lock0000"), c = new Phaser.RenderTexture(
					this.game, a.width, a.height);
			c.renderXY(a, 0, 0), c.renderXY(b, .5 * (a.width - b.width) + 1, .5
							* (a.height - b.height) - 3, !1), this.cache
					.addRenderTexture("lockedLevelIcon", c), a.destroy(), b
					.destroy()
		}, c
	}(Phaser.State);
	a.Preloader = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d, e) {
			var f = this;
			a.call(this, b, c, d, "gui", e), this._callback = new Phaser.Signal, this.anchor
					.set(.5, .5), this.inputEnabled = !0, this.game.device.desktop
					&& (this.input.useHandCursor = !0), this.inputEnabled
					&& (this.events.onInputDown.add(function() {
						f.game.device.webAudio && f.game.sound.play("tap"), f.tint *= .995, f.game.add
								.tween(f.scale).to({
											x : .9,
											y : .9
										}, 200, Phaser.Easing.Cubic.Out, !0)
					}), this.events.onInputUp.add(function() {
								f.tint = 16777215, f.scale.set(1, 1)
							}, this, 1), this.events.onInputDown.add(
							function() {
								f.game.time.events.add(300,
										f._callback.dispatch, f, [f])
							}, this, 2))
		}
		return __extends(b, a), b.prototype.destroy = function() {
			a.prototype.destroy.call(this), this._callback.dispose()
		}, Object.defineProperty(b.prototype, "callback", {
					get : function() {
						return this._callback
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(Phaser.Image);
	a.SimpleButton = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d, e, f) {
			a.call(this, b, c, d, e), this.textureKey1 = e, this.textureKey2 = f, this.activeTextureKey = this.textureKey1, this._state = 1, this.events.onInputUp
					.add(this.switchTextures, this, 0)
		}
		return __extends(b, a), b.prototype.switchTextures = function() {
			this.activeTextureKey = this.activeTextureKey === this.textureKey1
					? this.textureKey2
					: this.textureKey1, this.loadTexture("gui",
					this.activeTextureKey), this._state = this.activeTextureKey === this.textureKey1
					? 1
					: 2
		}, Object.defineProperty(b.prototype, "state", {
					get : function() {
						return this._state
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(game.SimpleButton);
	a.ToggleButton = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(b) {
		function c() {
			b.apply(this, arguments), this.fromPreloader = !1
		}
		return __extends(c, b), c.prototype.init = function(a) {
			this.fromPreloader = a
		}, c.prototype.create = function() {
			this.initImages(), this.initButtons(), this.initCredits(), this
					.initAnimation(), this.fromPreloader
					&& (this.soundButton.input.enabled = !1, this.soundButton
							.switchTextures(), this.game.input.onTap.addOnce(
							this.startMusic, this), this.stage.disableVisibilityChange = !1, this.game.onBlur
							.add(this.onFocusLost, this), this.game.onFocus
							.add(this.onFocus, this))
		}, c.prototype.onFocusLost = function() {
			this.game.tweens.pauseAll(), a.Main.wasMuted = this.game.sound.mute, this.game.sound.mute = !0
		}, c.prototype.onFocus = function() {
			this.game.tweens.resumeAll(), a.Main.wasMuted === !1
					&& (this.game.sound.mute = !1)
		}, c.prototype.initImages = function() {
			this.add.image(-16, -75, "gui", "LevelsMenu_Background0000"), this.add
					.image(-1, a.Config.GAME_HEIGHT - 388, "gui",
							"MainMenu_Back0000"), this.title = this.add.image(
					0, 0, "gui", "GameTitle0000"), this.title.anchor
					.set(.5, .5), this.title.x = a.Config.HALF_GAME_WIDTH - .5, this.title.y = 150
		}, c.prototype.initButtons = function() {
			var b = this, c = 60;
			this.soundButton = new a.ToggleButton(this.game,
					a.Config.GAME_WIDTH - c, c, "Music_ON_Button0000",
					"Music_OFF_Button0000"), this.soundButton.callback.add(
					function() {
						b.game.sound.mute = !b.game.sound.mute
					}), this.game.sound.mute
					&& this.soundButton.switchTextures(), this.playButton = new a.SimpleButton(
					this.game, a.Config.HALF_GAME_WIDTH, 350,
					"MainMenu_PlayButton0000"), this.playButton.callback
					.addOnce(function() {
								b.game.state.start("LevelsMenu")
							}, this), this.creditsButton = new a.SimpleButton(
					this.game, a.Config.GAME_WIDTH - c, a.Config.GAME_HEIGHT
							- c, "Credits_Button0000"), this.creditsButton.callback
					.add(this.toggleCredits, this), this.buttons = [
					this.playButton, this.soundButton, this.creditsButton], this.buttons
					.forEach(function(a) {
								b.world.add(a)
							})
		}, c.prototype.initCredits = function() {
			this.credits = this.game.add.image(0, 0, "gui", "CreditsBoard0000"), this.credits.position
					.set(
							Math
									.round(.5
											* (a.Config.GAME_WIDTH - this.credits.width)),
							Math
									.round(.5
											* (a.Config.GAME_HEIGHT - this.credits.height))), this.credits.visible = !1
		}, c.prototype.toggleCredits = function() {
			this.credits.visible ? this.hideCredits() : this.showCredits()
		}, c.prototype.hideCredits = function() {
			var a = this;
			this.game.add.tween(this.credits).to({
						y : this.credits.y + 200,
						alpha : 0
					}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
					function() {
						a.playButton.input.enabled = !0, a.creditsButton.input.enabled = !0, a.credits.visible = !1
					}, this)
		}, c.prototype.showCredits = function() {
			var b = this;
			this.credits.visible = !0, this.credits.alpha = 0, this.credits.y = Math
					.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height))
					+ 200, this.game.add.tween(this.credits).to({
						y : this.credits.y - 200,
						alpha : 1
					}, 500, Phaser.Easing.Back.Out, !0), this.playButton.input.enabled = !1, this.creditsButton.input.enabled = !1, this.game.input.onTap
					.addOnce(function() {
								b.hideCredits()
							}, this)
		}, c.prototype.startMusic = function() {
			this.game.sound.play("main_loop", .33, !0), this.soundButton
					.switchTextures(), this.soundButton.input.enabled = !0
		}, c.prototype.initAnimation = function() {
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
		}, c.prototype.destroy = function() {
			this.buttons = null
		}, c
	}(Phaser.State);
	a.MainMenu = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d, e, f) {
			"undefined" == typeof f && (f = !1);
			var g = this;
			a.call(this, b, c, d, "gui", "Button_Base0000"), this.inputEnabled = !f, this.locked = f, this._levelNumber = e, this.anchor
					.set(.5, .5), this.createGraphics(), this.inputEnabled
					&& (this.game.device.desktop
							&& (this.input.useHandCursor = !0), this.events.onInputDown
							.add(function() {
								g.game.sound.play("tap", .75), g.tint *= .995, g.game.add
										.tween(g.scale).to({
													x : .9,
													y : .9
												}, 200,
												Phaser.Easing.Cubic.Out, !0)
							}), this.events.onInputUp.add(function() {
								g.tint = 16777215, g.game.add.tween(g.scale)
										.to({
													x : 1,
													y : 1
												}, 200,
												Phaser.Easing.Cubic.Out, !0)
							}))
		}
		return __extends(b, a), b.prototype.createGraphics = function() {
			this.locked ? this.createLockedGraphics() : this
					.createUnlockedGraphics()
		}, b.prototype.createLockedGraphics = function() {
			var a = "lockedLevelIcon", b = this.game.cache.getTexture(a);
			this.setTexture(b.texture)
		}, b.prototype.createUnlockedGraphics = function() {
			var a = {
				font : "48px TF2 Build",
				fill : "#A07B08",
				align : "center"
			}, b = this.game.add.text(0, 0, this._levelNumber.toString(), a);
			b.anchor.set(.5, .5);
			var c = this.game.add.renderTexture(this.width, this.height);
			c.renderXY(this, .5 * this.width, .5 * this.height), c.renderXY(b,
					Math.floor(.5 * this.width), Math.floor(.5 * this.height)
							- 1), this.setTexture(c), b.destroy()
		}, Object.defineProperty(b.prototype, "levelNumber", {
					get : function() {
						return this._levelNumber
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(Phaser.Image);
	a.LevelIcon = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(b) {
		function c() {
			b.call(this)
		}
		return __extends(c, b), c.prototype.create = function() {
			this.game.add.image(-16, 0, "gui", "LevelsMenu_Background0000"), this
					.initLevelIcons(), this.initButtons(), this
					.initAnimations()
		}, c.prototype.initLevelIcons = function() {
			this.levelIconsGroup = this.game.add.group(this.game.world,
					"LevelIcons Container"), this.levelIconsGroup.x = 85, this.levelIconsGroup.y = 150;
			for (var b = 118, c = 118, d = 59, e = 0, f = 1; f <= a.Config.LEVELS_NUM; f++) {
				var g = f, h = this.levelIsLocked(g), i = new a.LevelIcon(
						this.game, d - .5, e, g, h);
				h === !1
						&& i.events.onInputUp.add(this.onLevelIconInputUp,
								this, 2), this.levelIconsGroup.add(i), d += b, 4 === f
						&& (d = 0, e += c), f > 4 && (f - 4) % 5 === 0
						&& (d = 0, e += c), 24 === f && (d = 59)
			}
		}, c.prototype.levelIsLocked = function(a) {
			if (1 === a)
				return !1;
			var b = a - 1;
			return !("true" === window.localStorage.getItem(b.toString()))
		}, c.prototype.onLevelIconInputUp = function(a) {
			var b = this;
			this.game.time.events.add(200, function() {
						var c = a.levelNumber;
						b.game.state.start("Level", !0, !1, c)
					}, this)
		}, c.prototype.initButtons = function() {
			var b = this, c = 60;
			this.backButton = new a.SimpleButton(this.game, c, c,
					"Back_Button0000"), this.backButton.callback.addOnce(
					function() {
						b.game.state.start("MainMenu")
					}, this), this.world.add(this.backButton), this.soundButton = new a.ToggleButton(
					this.game, a.Config.GAME_WIDTH - c, c,
					"Music_ON_Button0000", "Music_OFF_Button0000"), this.soundButton.callback
					.add(function() {
								b.game.sound.mute = !b.game.sound.mute
							}), this.game.sound.mute
					&& this.soundButton.switchTextures(), this.world
					.add(this.soundButton)
		}, c.prototype.initAnimations = function() {
			this.levelIconsGroup.alpha = 0, this.levelIconsGroup.y += 200, this.game.add
					.tween(this.levelIconsGroup).to({
								y : this.levelIconsGroup.y - 200,
								alpha : 1
							}, 600, Phaser.Easing.Back.Out, !0, 300), this.backButton.x -= 300, this.game.add
					.tween(this.backButton).to({
								x : this.backButton.x + 300
							}, 300, Phaser.Easing.Back.Out, !0, 700), this.soundButton.x += 300, this.game.add
					.tween(this.soundButton).to({
								x : this.soundButton.x - 300
							}, 300, Phaser.Easing.Back.Out, !0, 700)
		}, c
	}(Phaser.State);
	a.LevelsMenu = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c, d, "SandTile0000"), this.tileType = 1, this.canBeDestroyed = !0
		}
		return __extends(b, a), b.prototype.startDestroyTween = function() {
			if (this.canBeDestroyed) {
				this.canBeDestroyed = !1;
				var a = 394, b = -18, c = Phaser.Math.distance(this.x, this.y,
						a, b), d = Math.max(500, 1.1 * c);
				this.game.add.tween(this).to({
							y : -15,
							x : 394
						}, d, Phaser.Easing.Cubic.Out, !0), this.game.add
						.tween(this.scale).to({
									x : 0,
									y : 0
								}, 300, Phaser.Easing.Cubic.Out, !0, d - 150).onComplete
						.addOnce(this.destroy, this)
			}
		}, b
	}(game.CommonTile);
	a.SandTile = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c, d, "WaterTile0000"), this.tileType = 2, this._onWaterArriveComplete = new Phaser.Signal
		}
		return __extends(b, a), b.prototype.startAddAnimation = function(a) {
			var b = this, c = 400;
			this.scale.set(.5, .5), this.alpha = 0, this.addTween = this.game.add
					.tween(this.scale).to({
								x : 1,
								y : 1
							}, .66 * c, Phaser.Easing.Cubic.Out, !0, a), this.addTween.onStart
					.addOnce(function() {
								b.alpha = 1
							}), this.addTween.onComplete.addOnce(
					this._onWaterArriveComplete.dispatch, this)
		}, b.prototype.startRemoveAnimation = function() {
			this.addTween && this.addTween.isRunning && this.addTween.stop(), this.removeTween = this.game.add
					.tween(this).to({
								y : this.y - 8,
								alpha : 0
							}, 300, Phaser.Easing.Linear.None, !0), this.removeTween.onComplete
					.addOnce(this.destroy, this)
		}, b.prototype.destroy = function(b) {
			"undefined" == typeof b && (b = !0), this.addTween
					&& this.game.tweens.remove(this.addTween), this.removeTween
					&& this.game.tweens.remove(this.removeTween), a.prototype.destroy
					.call(this, b), this._onWaterArriveComplete.dispose(), this._onWaterArriveComplete = null
		}, Object.defineProperty(b.prototype, "onWaterArriveComplete", {
					get : function() {
						return this._onWaterArriveComplete
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(game.CommonTile);
	a.WaterTile = b
}(game || (game = {}));
var game;
!function(a) {
	!function(a) {
		a[a.FLOWER = 0] = "FLOWER", a[a.PIPE = 1] = "PIPE", a[a.GNOME = 2] = "GNOME", a[a.VALVE = 3] = "VALVE"
	}(a.GameObjectType || (a.GameObjectType = {}));
	a.GameObjectType
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d, e) {
			a.call(this, b, c, d, "levelGraphics", e), this.initialY = this.y, this.anchor
					.set(.5, .5);
			var f = this.game.rnd.integerInRange(2500, 4e3);
			this.shakeEvent = this.game.time.events.loop(f, this.shake, this)
		}
		return __extends(b, a), b.prototype.shake = function() {
			var a = this;
			this.visible !== !1
					&& this.game.add.tween(this).to({
								y : this.y + 5
							}, 150, Phaser.Easing.Linear.None, !0, 0, 3, !0).onComplete
							.addOnce(function() {
										a.y = a.initialY
									}, this)
		}, b.prototype.show = function() {
			this.y = this.initialY, this.alpha = 0, this.visible = !0, this.game.add
					.tween(this).to({
								alpha : 1
							}, 300, Phaser.Easing.Linear.None, !0)
		}, b.prototype.hide = function() {
			var a = this;
			this.game.add.tween(this).to({
						alpha : 0
					}, 300, Phaser.Easing.Linear.None, !0).onComplete.addOnce(
					function() {
						a.visible = !1
					}, this)
		}, b.prototype.clearShakeEvent = function() {
			this.shakeEvent
					&& (this.game.time.events.remove(this.shakeEvent), this.shakeEvent = null)
		}, b.prototype.destroy = function() {
			this.clearShakeEvent(), a.prototype.destroy.call(this)
		}, b
	}(Phaser.Image);
	a.BubbleTalk = b
}(game || (game = {}));
var utils;
!function(a) {
	var b = function() {
		function a() {
		}
		return a.range = function(a, b, c) {
			arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
			for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;)
				f[e++] = a, a += c;
			return f
		}, a
	}();
	a.ArrayUtil = b
}(utils || (utils = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c, d, "flower"), this._objectType = 0, this._hasWater = !1, this.anchor
					.set(.45, 1), this.setRowAndColumn(), this.initAnimations()
		}
		return __extends(b, a), b.prototype.setRowAndColumn = function() {
			this._row = Math.floor(this.y / game.CommonTile.SIZE), this._column = Math
					.floor(this.x / game.CommonTile.SIZE)
		}, b.prototype.initAnimations = function() {
			this.addAnimation("water", 0, 55), this.addAnimation("no_water",
					56, 57), this.animations.play("no_water")
		}, b.prototype.addAnimation = function(a, b, c) {
			var d = utils.ArrayUtil.range(b, c + 1);
			this.animations.add(a, d, 30, !0)
		}, b.prototype.updateWater = function(a, b) {
			this._hasWater !== a
					&& (this._hasWater = a, this.clearWaterDelayedEvent(), b > 0
							? this.delayedWaterEvent = this._hasWater
									? this.game.time.events.add(b,
											this.onWaterArrive, this)
									: this.game.time.events.add(200,
											this.onWaterLeft, this)
							: this._hasWater ? this.onWaterArrive() : this
									.onWaterLeft())
		}, b.prototype.clearWaterDelayedEvent = function() {
			this.delayedWaterEvent
					&& (this.game.time.events.remove(this.delayedWaterEvent), this.delayedWaterEvent = null)
		}, b.prototype.onWaterArrive = function() {
			this.scale.set(.33, .33), this.alpha = .5, this.game.add
					.tween(this.scale).to({
								x : 1,
								y : 1
							}, 500, Phaser.Easing.Back.Out, !0), this.game.add
					.tween(this).to({
								alpha : 1
							}, 250, Phaser.Easing.Linear.None, !0), this.animations
					.play("water"), this._bubbleTalk && this._bubbleTalk.hide()
		}, b.prototype.onWaterLeft = function() {
			this.alpha = .5, this.game.add.tween(this).to({
						alpha : 1
					}, 250, Phaser.Easing.Linear.None, !0), this.animations
					.play("no_water"), this._bubbleTalk
					&& this._bubbleTalk.show()
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this), this._bubbleTalk = null
		}, Object.defineProperty(b.prototype, "row", {
					get : function() {
						return this._row
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "column", {
					get : function() {
						return this._column
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "objectType", {
					get : function() {
						return this._objectType
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "hasWater", {
					get : function() {
						return this._hasWater
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "bubbleTalk", {
					set : function(a) {
						this._bubbleTalk = a
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(Phaser.Sprite);
	a.Flower = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c, d, "valve"), this._objectType = 3, this.canPump = !0, this._pumpSignal = new Phaser.Signal, this.anchor
					.set(.5, .5), this.initInput(), this.initAnimations(), this
					.setRowAndColumn()
		}
		return __extends(b, a), b.prototype.setRowAndColumn = function() {
			this._row = Math.floor(this.y / game.CommonTile.SIZE), this._column = Math
					.floor(this.x / game.CommonTile.SIZE)
		}, b.prototype.initInput = function() {
			this.inputEnabled = !0, this.input.useHandCursor = !0, this.events.onInputDown
					.add(this.onTap, this)
		}, b.prototype.onTap = function() {
			this.canPump
					&& (this.canPump = !1, this.animations.play("main", 60, !1), this._pumpSignal
							.dispatch(this))
		}, b.prototype.initAnimations = function() {
			this.animations.add("main", null, 60), this.events.onAnimationComplete
					.add(this.onAnimationComplete, this)
		}, b.prototype.onAnimationComplete = function() {
			this.animations.frame = 0, this.canPump = !0
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this), this._pumpSignal.dispose(), this._pumpSignal = null
		}, Object.defineProperty(b.prototype, "row", {
					get : function() {
						return this._row
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "column", {
					get : function() {
						return this._column
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "objectType", {
					get : function() {
						return this._objectType
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "pumpSignal", {
					get : function() {
						return this._pumpSignal
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(Phaser.Sprite);
	a.Valve = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c, d, "gnome"), this._objectType = 2, this._hasWater = !1, this.anchor
					.set(.5, .4), this.setRowAndColumn(), this.initAnimations()
		}
		return __extends(b, a), b.prototype.setRowAndColumn = function() {
			this._row = Math.floor(this.y / game.CommonTile.SIZE), this._column = Math
					.floor(this.x / game.CommonTile.SIZE)
		}, b.prototype.initAnimations = function() {
			this.addAnimation("stay_in_water", 0, 0), this.addAnimation(
					"wave_in_water", 1, 25), this.addAnimation("stay", 26, 26), this
					.addAnimation("shake", 27, 38), this.events.onAnimationComplete
					.add(this.onAnimationComplete, this), this.animations
					.play("stay")
		}, b.prototype.onAnimationComplete = function(a, b) {
			"wave_in_water" === b.name
					? this.animations.play("stay_in_water")
					: "shake" === b.name && this.animations.play("stay")
		}, b.prototype.addAnimation = function(a, b, c, d) {
			"undefined" == typeof d && (d = 30);
			var e = utils.ArrayUtil.range(b, c + 1);
			return this.animations.add(a, e, d, !0, !0)
		}, b.prototype.updateWater = function(a, b) {
			this._hasWater !== a
					&& (this._hasWater = a, this.clearWaterDelayedEvent(), b > 0
							? this.delayedWaterEvent = this._hasWater
									? this.game.time.events.add(b,
											this.onWaterArrive, this)
									: this.game.time.events.add(200,
											this.onWaterLeft, this)
							: this._hasWater ? this.onWaterArrive() : this
									.onWaterLeft())
		}, b.prototype.onWaterArrive = function() {
			var a = this;
			this.clearRepeatAnimationEvent(), this.animations
					.play("stay_in_water"), this.repeatAnimEvent = this.game.time.events
					.loop(5e3, function() {
								a.animations.play("wave_in_water", 30, !1)
							}, this), this._bubbleTalk.show()
		}, b.prototype.onWaterLeft = function() {
			var a = this;
			this.clearRepeatAnimationEvent(), this.animations.play("stay"), this.repeatAnimEvent = this.game.time.events
					.loop(3e3, function() {
								a.animations.play("shake", 30, !1)
							}, this), this._bubbleTalk.hide()
		}, b.prototype.clearWaterDelayedEvent = function() {
			this.delayedWaterEvent
					&& (this.game.time.events.remove(this.delayedWaterEvent), this.delayedWaterEvent = null)
		}, b.prototype.clearRepeatAnimationEvent = function() {
			this.repeatAnimEvent
					&& (this.game.time.events.remove(this.repeatAnimEvent), this.repeatAnimEvent = null)
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this)
		}, Object.defineProperty(b.prototype, "row", {
					get : function() {
						return this._row
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "column", {
					get : function() {
						return this._column
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "objectType", {
					get : function() {
						return this._objectType
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "hasWater", {
					get : function() {
						return this._hasWater
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "bubbleTalk", {
					set : function(a) {
						this._bubbleTalk = a
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(Phaser.Sprite);
	a.Gnome = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d, e, f, g) {
			a.call(this, b, c, d, "levelGraphics", e), this._objectType = 1, this._hasWater = !1, this._pipeName = f, this._linkedPipeName = g, this.anchor
					.set(.5, .5), this._waterSignal = new Phaser.Signal, this
					.setRowAndColumn()
		}
		return __extends(b, a), b.prototype.setRowAndColumn = function() {
			this._row = Math.floor(this.y / game.CommonTile.SIZE), this._column = Math
					.floor(this.x / game.CommonTile.SIZE)
		}, b.prototype.dispatchWater = function() {
			this._linkedPipe.hasWater
					&& this._hasWater === !1
					&& this.game.time.events.add(300,
							this.dispatchWaterAfterDelay, this)
		}, b.prototype.dispatchWaterAfterDelay = function() {
			this._linkedPipe.hasWater
					&& this._hasWater === !1
					&& (this._waterSignal.dispatch(this), this.game.add
							.tween(this.scale).to({
										x : 1.2,
										y : .8
									}, 100, Phaser.Easing.Linear.None, !0).to({
										x : 1,
										y : 1.25
									}, 200, Phaser.Easing.Back.Out).to({
										x : 1,
										y : 1
									}, 100, Phaser.Easing.Linear.None))
		}, b.prototype.updateWater = function(a, b) {
			!this._hasWater && a
					? (this._hasWater = !0, this.clearWaterDelayedEvent(), this.delayedWaterEvent = this.game.time.events
							.add(b, this.onWaterArrive, this))
					: a || (this._hasWater = !1)
		}, b.prototype.onWaterArrive = function() {
			this._linkedPipe.dispatchWater()
		}, b.prototype.clearWaterDelayedEvent = function() {
			this.delayedWaterEvent
					&& (this.game.time.events.remove(this.delayedWaterEvent), this.delayedWaterEvent = null)
		}, b.prototype.destroy = function() {
			a.prototype.destroy.call(this), this._linkedPipe = null
		}, Object.defineProperty(b.prototype, "row", {
					get : function() {
						return this._row
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "column", {
					get : function() {
						return this._column
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "objectType", {
					get : function() {
						return this._objectType
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "waterSignal", {
					get : function() {
						return this._waterSignal
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "pipeName", {
					get : function() {
						return this._pipeName
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "linkedPipeName", {
					get : function() {
						return this._linkedPipeName
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "linkedPipe", {
					set : function(a) {
						this._linkedPipe = a
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(b.prototype, "hasWater", {
					get : function() {
						return this._hasWater
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(Phaser.Image);
	a.Pipe = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function() {
		function a(a) {
			this.grid = a, this.stack = []
		}
		return a.prototype.fillWithWater = function(a, b) {
			this.stack.length = 0, this.stack.push(a, b);
			for (var c = []; this.stack.length > 0;) {
				var d = this.stack.pop(), e = this.stack.pop();
				c.push(this.grid.addWaterTile(d, e)), d - 1 >= 0
						&& this.grid.tileIsEmpty(d - 1, e)
						&& this.notInStack(e, d - 1)
						&& this.stack.push(e, d - 1), e + 1 < this.grid.columns
						&& this.grid.tileIsEmpty(d, e + 1)
						&& this.notInStack(e + 1, d)
						&& this.stack.push(e + 1, d), d + 1 < this.grid.rows
						&& this.grid.tileIsEmpty(d + 1, e)
						&& this.notInStack(e, d + 1)
						&& this.stack.push(e, d + 1), e - 1 >= 0
						&& this.grid.tileIsEmpty(d, e - 1)
						&& this.notInStack(e - 1, d)
						&& this.stack.push(e - 1, d)
			}
			for (var f = 0; f < c.length; f++) {
				var g = c[f], h = utils.MathUtil
						.distance(a, b, g.column, g.row), i = 150 * h;
				g.startAddAnimation(i)
			}
		}, a.prototype.notInStack = function(a, b) {
			for (var c = 0; c < this.stack.length; c += 2)
				if (this.stack[c] == a && this.stack[c + 1] == b)
					return !1;
			return !0
		}, a.prototype.destroy = function() {
			this.stack.length = 0, this.stack = null, this.grid = null
		}, a
	}();
	a.WaterStrategy = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(b) {
		function c(c) {
			b.call(this, c, c.world, "grid"), this._rows = 11, this._columns = 9, this.sandTilesMoves = 0, this.tiles = [], this.pipes = [], this.gnomes = [], this.flowers = [], this.floodFillStrategy = new a.WaterStrategy(this), this._levelCompleteSignal = new Phaser.Signal, this._sandTilesChanged = new Phaser.Signal, this._valveUsed = new Phaser.Signal, this.tilesLayer = this.game.add
					.spriteBatch(this, "tiles"), this.valvesLayer = this.game.add
					.group(this, "valves"), this.objectsLayer = this.game.add
					.spriteBatch(this, "objects_1"), this.game.input.onDown
					.add(this.onTap, this)
		}
		return __extends(c, b), c.prototype.addTutorialSprite = function(a) {
			this.objectsLayer.add(a)
		}, c.prototype.addTile = function(a) {
			this.tilesLayer.add(a), this.addToTilesArray(a)
		}, c.prototype.addObject = function(a) {
			var b = this;
			switch (a.objectType) {
				case 2 :
					this.gnomes.push(a);
					break;
				case 0 :
					this.flowers.push(a);
					break;
				case 3 :
					a.pumpSignal.add(this.transferWater, this);
					break;
				case 1 :
					this.pipes.push(a), a.waterSignal.add(function(a) {
								b.floodFillAt(a.row, a.column)
							}, this)
			}
			3 === a.objectType ? this.valvesLayer.add(a) : this.objectsLayer
					.add(a)
		}, c.prototype.transferWater = function(a) {
			var b = this;
			this.game.device.webAudio && this.game.sound.play("valve"), this._valveUsed
					.dispatch();
			for (var c = this.getNeighbours(a.row, a.column), d = [], e = [], f = 0; f < c.length; f++) {
				var g = c[f];
				if (void 0 === g) {
					var h = new Phaser.Point;
					0 == f ? (h.x = a.column, h.y = a.row - 1) : 1 == f
							? (h.x = a.column + 1, h.y = a.row)
							: 2 == f
									? (h.x = a.column, h.y = a.row + 1)
									: (h.x = a.column - 1, h.y = a.row), e
							.push(h)
				} else
					g && 2 === g.tileType && d.push(g)
			}
			e.length > 0 && d.length > 0 && (d.forEach(function(a) {
						b.removeWaterFrom(a.row, a.column)
					}), e.forEach(function(a) {
						b.floodFillAt(a.y, a.x)
					}))
		}, c.prototype.removeWaterFrom = function(a, b) {
			var c = this.getTileAt(a, b);
			c
					&& 2 === c.tileType
					&& (c.startRemoveAnimation(), this.removeFromTilesArray(c), this
							.removeWaterFrom(a - 1, b), this.removeWaterFrom(a,
							b + 1), this.removeWaterFrom(a + 1, b), this
							.removeWaterFrom(a, b - 1))
		}, c.prototype.onTap = function(a) {
			var b = a.x - this.x, c = a.y - this.y;
			if (this.inBounds(a.x, a.y)) {
				var d = this.getTileUnderPoint(b, c);
				if (d && 1 === d.tileType) {
					var e = d;
					e.startDestroyTween(), this.onSandTileRemove(e), this.sandTilesMoves++, this._sandTilesChanged
							.dispatch(this.sandTilesMoves, "removed"), this.game.device.webAudio
							&& this.game.sound.play("sand_block")
				} else if (!d && !this.isObjectUnderPoint(b, c)
						&& this.canAddSandTile()) {
					var e = this.addSandTile(b, c);
					e.scale.setTo(.75, .75), this.game.add.tween(e.scale).to({
								x : 1,
								y : 1
							}, 150, Phaser.Easing.Cubic.Out, !0), this
							.sortTiles(), this.sandTilesMoves--, this._sandTilesChanged
							.dispatch(this.sandTilesMoves, "added"), this.game.device.webAudio
							&& this.game.sound.play("sand_block")
				}
			}
		}, c.prototype.inBounds = function(a, b) {
			return this.bounds.contains(a, b)
		}, c.prototype.isObjectUnderPoint = function(a, b) {
			for (var c = Math.floor(b / game.CommonTile.SIZE), d = Math.floor(a
					/ game.CommonTile.SIZE), e = 0; e < this.gnomes.length; e++) {
				var f = this.gnomes[e];
				if (f.row === c && f.column === d)
					return !0
			}
			for (var e = 0; e < this.pipes.length; e++) {
				var g = this.pipes[e];
				if (g.row === c && g.column === d)
					return !0
			}
			return !1
		}, c.prototype.canAddSandTile = function() {
			return this.sandTilesMoves > 0
		}, c.prototype.addSandTile = function(a, b) {
			var c = new game.SandTile(this.game, a, b);
			return this.addTile(c), this.alignTile(c), c
		}, c.prototype.alignTile = function(a) {
			a.x = a.column * game.CommonTile.SIZE + .5 * game.CommonTile.SIZE, a.y = a.row
					* game.CommonTile.SIZE + .5 * game.CommonTile.SIZE
		}, c.prototype.init = function() {
			this.bounds = new Phaser.Rectangle(this.x, this.y, this._columns
							* game.CommonTile.SIZE, this._rows
							* game.CommonTile.SIZE), this.linkPipes(), this
					.addBubbleTalks(), this.updateWaterDependants(!1), this
					.sortTiles()
		}, c.prototype.addBubbleTalks = function() {
			var a = this;
			this.flowers.forEach(function(b) {
						var c = new game.BubbleTalk(a.game, b.x - 26, b.y - 80,
								"WaterBubble0000");
						c.show(), a.objectsLayer.add(c), b.bubbleTalk = c
					}), this.gnomes.forEach(function(b) {
						var c = new game.BubbleTalk(a.game, b.x - 26, b.y - 40,
								"SadBubble0000");
						c.visible = !1, a.objectsLayer.add(c), b.bubbleTalk = c
					})
		}, c.prototype.linkPipes = function() {
			var a = this;
			this.pipes.forEach(function(b) {
						var c = a.getPipeByName(b.linkedPipeName);
						c && (b.linkedPipe = c)
					})
		}, c.prototype.getPipeByName = function(a) {
			for (var b = 0; b < this.pipes.length; b++) {
				var c = this.pipes[b];
				if (c.pipeName === a)
					return c
			}
			return null
		}, c.prototype.onSandTileRemove = function(a) {
			this.removeFromTilesArray(a), this.thereIsWaterAround(a.row,
					a.column)
					&& this.floodFillAt(a.row, a.column)
		}, c.prototype.floodFillAt = function(a, b) {
			this.tileIsEmpty(a, b)
					&& (this.game.device.webAudio
							&& this.game.sound.play("water"), this.floodFillStrategy
							.fillWithWater(b, a), this.updateWaterDependants(
							!0, a, b), this.sortTiles())
		}, c.prototype.addWaterTile = function(a, b) {
			var c = b * game.CommonTile.SIZE + .5 * game.CommonTile.SIZE, d = a
					* game.CommonTile.SIZE + .5 * game.CommonTile.SIZE, e = new game.WaterTile(
					this.game, c, d);
			return this.addTile(e), e
		}, c.prototype.updateWaterDependants = function(a, b, c) {
			var d = this;
			"undefined" == typeof b && (b = 0), "undefined" == typeof c
					&& (c = 0);
			var e = 0;
			this.flowers.forEach(function(f) {
						var g = d.thereIsWaterAround(f.row, f.column), h = a
								? d.calculateDelay(b, c, f)
								: e;
						f.updateWater(g, h)
					}), this.gnomes.forEach(function(f) {
						var g = d.getTileAt(f.row, f.column), h = Boolean(g
								&& 2 === g.tileType), i = a ? d.calculateDelay(
								b, c, f) : e;
						f.updateWater(h, i)
					}), this.pipes.forEach(function(f) {
						var g = d.getTileAt(f.row, f.column), h = Boolean(g
								&& 2 === g.tileType), i = a ? d.calculateDelay(
								b, c, f) : e;
						f.updateWater(h, i)
					}), this.checkLevelComplete()
		}, c.prototype.calculateDelay = function(a, b, c) {
			var d = Phaser.Math.distance(b, a, c.column, c.row);
			return 150 * d
		}, c.prototype.checkLevelComplete = function() {
			this.allWaterDependantsHappy()
					&& this.game.time.events.add(1500,
							this.doubleCheckLevelComplete, this)
		}, c.prototype.doubleCheckLevelComplete = function() {
			this.allWaterDependantsHappy()
					&& (this.exists = !1, this.game.input.onDown.remove(
							this.onTap, this), this.valvesLayer.forEach(
							function(a) {
								a.inputEnabled = !1
							}, this, !0), this._levelCompleteSignal.dispatch())
		}, c.prototype.allWaterDependantsHappy = function() {
			var a = this.flowers.every(function(a) {
						return a.hasWater
					}), b = this.gnomes.every(function(a) {
						return a.hasWater === !1
					});
			return a && b
		}, c.prototype.thereIsWaterAround = function(a, b) {
			var c = this.getNeighbours(a, b), d = c.some(function(a) {
						return Boolean(a && 2 === a.tileType)
					});
			return d
		}, c.prototype.getNeighbours = function(a, b) {
			var c = a > 0 ? this.getTileAt(a - 1, b) : null, d = b < this._columns
					- 1 ? this.getTileAt(a, b + 1) : null, e = a < this._rows
					- 1 ? this.getTileAt(a + 1, b) : null, f = b > 0 ? this
					.getTileAt(a, b - 1) : null;
			return [c, d, e, f]
		}, c.prototype.getTileUnderPoint = function(a, b) {
			var c = Math.floor(b / game.CommonTile.SIZE), d = Math.floor(a
					/ game.CommonTile.SIZE);
			return this.getTileAt(c, d)
		}, c.prototype.getTileAt = function(a, b) {
			if (0 > a || a > this._rows - 1 || 0 > b || b > this._columns - 1)
				return null;
			var c = this._columns, d = a * c + b;
			return this.tiles[d]
		}, c.prototype.getRandomCell = function() {
			var a = this.game.rnd.integerInRange(0, this.tiles.length - 1), b = this.tiles[a];
			return b
		}, c.prototype.tileIsEmpty = function(a, b) {
			var c = this.getTileAt(a, b);
			return void 0 === c
		}, c.prototype.addToTilesArray = function(a) {
			var b = this._columns, c = a.row * b + a.column;
			void 0 === this.tiles[c] && (this.tiles[c] = a)
		}, c.prototype.removeFromTilesArray = function(a) {
			var b = this.tiles.indexOf(a);
			b > -1 && delete this.tiles[b]
		}, c.prototype.sortTiles = function() {
			this.tilesLayer.sort("y")
		}, c.prototype.render = function() {
			this.renderLines()
		}, c.prototype.renderLines = function() {
			for (var a = game.CommonTile.SIZE, b = 0, c = game.CommonTile.SIZE, d = game.Config.GAME_HEIGHT, e = new Phaser.Line(
					a, b, c, d), f = 0; f < this._columns; f++)
				this.game.debug.geom(e, "0xffffff"), a = c = a
						+ game.CommonTile.SIZE, e.setTo(a, b, c, d);
			a = 0, c = game.Config.GAME_WIDTH, b = 0, d = 0;
			for (var f = 0; f < this._rows; f++)
				b = d = b + game.CommonTile.SIZE, e.setTo(a, b, c, d), this.game.debug
						.geom(e, "0xffffff")
		}, c.prototype.destroy = function(a, c) {
			"undefined" == typeof a && (a = !0), "undefined" == typeof c
					&& (c = !1), b.prototype.destroy.call(this, a, c), this.tiles = null, this.flowers = null, this.gnomes = null, this.bounds = null, this.pipes = null, this._sandTilesChanged
					.dispose(), this._sandTilesChanged = null, this._valveUsed
					.dispose(), this._valveUsed = null, this._levelCompleteSignal
					.dispose(), this._levelCompleteSignal = null, this.floodFillStrategy
					.destroy(), this.floodFillStrategy = null
		}, Object.defineProperty(c.prototype, "rows", {
					get : function() {
						return this._rows
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "columns", {
					get : function() {
						return this._columns
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "levelCompleteSignal", {
					get : function() {
						return this._levelCompleteSignal
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "sandTilesChanged", {
					get : function() {
						return this._sandTilesChanged
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(c.prototype, "valveUsed", {
					get : function() {
						return this._valveUsed
					},
					enumerable : !0,
					configurable : !0
				}), c
	}(Phaser.Group);
	a.Grid = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function() {
		function a(a) {
			this._levelNumber = a
		}
		return Object.defineProperty(a.prototype, "levelNumber", {
					get : function() {
						return this._levelNumber
					},
					enumerable : !0,
					configurable : !0
				}), a
	}();
	a.LevelSettings = b
}(game || (game = {}));
var utils;
!function(a) {
	var b = function() {
		function a() {
		}
		return a.distanceSquared = function(a, b, c, d) {
			var e = c - a, f = d - b;
			return e * e + f * f
		}, a.distance = function(b, c, d, e) {
			var f = a.distanceSquared(b, c, d, e);
			return Math.sqrt(f)
		}, a.DEG_TO_RAD = .017453292519943295, a.RAD_TO_DEG = 57.29577951308232, a
	}();
	a.MathUtil = b
}(utils || (utils = {}));
var utils;
!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			"undefined" == typeof c && (c = 0), "undefined" == typeof d
					&& (d = 0), a.call(this, b, b.world, "FPS Meter"), this.x = c, this.y = d, this
					.initBackground(), this.initText(), b.time.advancedTiming
					? this.loopEvent = this.game.time.events.loop(500,
							this.updateText, this)
					: this.statsText.setText("error")
		}
		return __extends(b, a), b.prototype.initBackground = function() {
			var a = 80;
			this.bg = new Phaser.Graphics(this.game, 0, 0), this.bg.beginFill(
					0, 1), this.bg.drawRect(0, 0, a, 22), this.bg.endFill(), this
					.add(this.bg)
		}, b.prototype.initText = function() {
			var a = {
				font : "18px Consolas",
				fill : "#FFFFFF",
				align : "center"
			};
			this.statsText = this.game.add.text(5, 0, "0 fps", a, this)
		}, b.prototype.updateText = function() {
			var a = "FPS: " + this.game.time.fps;
			this.statsText.setText(a)
		}, b.prototype.destroy = function() {
			this.game.time.events.remove(this.loopEvent), this.loopEvent = null, a.prototype.destroy
					.call(this)
		}, b
	}(Phaser.Group);
	a.FPSMeter = b
}(utils || (utils = {}));
var game;
!function(a) {
	var b = function() {
		function a(a) {
			this._levelNumber = a
		}
		return a.prototype.doReset = function() {
			this.sheepsArrived = 0, this.allSheepsArrived = !1, this.startTime = 0
		}, a.prototype.saveForReset = function() {
		}, Object.defineProperty(a.prototype, "levelNumber", {
					get : function() {
						return this._levelNumber
					},
					enumerable : !0,
					configurable : !0
				}), a
	}();
	a.LevelResult = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d, e) {
			a.call(this, b, c, d, "debug_gui", e), this.inputEnabled = !0, this.input.useHandCursor = !0, this.anchor
					.set(.5, .5)
		}
		return __extends(b, a), b
	}(Phaser.Image);
	a.DebugButton = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c) {
			a.call(this, b, c, "SandTilesLabel"), this.initBack(), this
					.initText()
		}
		return __extends(b, a), b.prototype.initBack = function() {
			var a = new Phaser.Image(this.game, 0, 0, "gui",
					"SandTiles_Label0000");
			this.add(a)
		}, b.prototype.initText = function() {
			var a = {
				font : "42px TF2 Build",
				fill : "#FDF490",
				align : "center"
			};
			this.text = new Phaser.Text(this.game, 55, 6, "0", a), this
					.add(this.text)
		}, b.prototype.updateText = function(a) {
			this.text.setText(a.toString())
		}, b
	}(Phaser.SpriteBatch);
	a.SandTilesLabel = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c, "Level Complete Board"), this.levelNumber = d, this
					.addBack(), this.addButtons(), this.board = this.game.add
					.image(-10, 250, "gui", "LevelCompleteBoard0000", this)
		}
		return __extends(b, a), b.prototype.addBack = function() {
			var a = this.game.add.graphics(0, 0, this);
			a.beginFill(0, .5), a.drawRect(0, 0, game.Config.GAME_WIDTH,
					game.Config.GAME_HEIGHT), a.endFill()
		}, b.prototype.addButtons = function() {
			var a = this, b = 550, c = 120, d = new game.SimpleButton(
					this.game, game.Config.HALF_GAME_WIDTH, b,
					"Restart_Button0000");
			d.callback.addOnce(function() {
						a.game.state.start("Level", !0, !1, a.levelNumber)
					}, this);
			var e = new game.SimpleButton(this.game, d.x - c, b,
					"Menu_Button0000");
			e.callback.addOnce(function() {
						a.game.state.start("LevelsMenu")
					}, this);
			var f = new game.SimpleButton(this.game, d.x + c + .25, b,
					"Play_Button0000");
			f.callback.addOnce(function() {
						a.levelNumber === game.Config.LEVELS_NUM ? a.game.state
								.start("LevelsMenu") : a.game.state.start(
								"Level", !0, !1, a.levelNumber + 1)
					}, this), this.buttons = [e, d, f], this.buttons.forEach(
					function(b) {
						a.add(b)
					})
		}, b.prototype.show = function() {
			var a = this;
			this.visible = !0, this.board.y -= 200, this.board.alpha = 0;
			var b = 500;
			this.game.add.tween(this.board).to({
						alpha : 1
					}, 200, Phaser.Easing.Linear.None, !0), this.game.add
					.tween(this.board).to({
								y : this.board.y + 200
							}, b, Phaser.Easing.Back.Out, !0);
			var c = b;
			this.buttons.forEach(function(d) {
						d.y -= 200, d.visible = !1, a.game.add.tween(d).to({
									y : d.y + 200
								}, b, Phaser.Easing.Back.Out, !0, c).onStart
								.addOnce(function() {
											d.visible = !0
										}, a), c += 100
					})
		}, b
	}(Phaser.Group);
	a.LevelCompleteBoard = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c) {
			a.call(this, b, b.world, "gui"), this.levelSettings = c, this
					.initSandTilesLabel(), this.initButtons(), this
					.initLevelCompleteBoard()
		}
		return __extends(b, a), b.prototype.initSandTilesLabel = function() {
			this._sandTilesLabel = new game.SandTilesLabel(this.game, this), this._sandTilesLabel.position
					.set(375, 14)
		}, b.prototype.initButtons = function() {
			var a = this, b = 45, c = new game.SimpleButton(this.game, 505, b,
					"Restart_Button0000");
			c.callback.addOnce(function() {
						a.game.state.start("Level", !0, !1,
								a.levelSettings.levelNumber)
					}, this);
			var d = new game.SimpleButton(this.game, 590, b, "Menu_Button0000");
			d.callback.addOnce(function() {
						a.game.state.start("LevelsMenu")
					}), this.buttons = [c, d], this.buttons.forEach(
					function(b) {
						a.add(b)
					})
		}, b.prototype.initLevelCompleteBoard = function() {
			this.levelCompleteBoard = new game.LevelCompleteBoard(this.game,
					this, this.levelSettings.levelNumber), this.levelCompleteBoard.visible = !1
		}, b.prototype.onLevelComplete = function() {
			this._sandTilesLabel.position.set(0, -300), this._sandTilesLabel.exists = !1, this.buttons
					.forEach(function(a) {
								a.visible = !1
							}), this.levelCompleteBoard.show()
		}, Object.defineProperty(b.prototype, "sandTilesLabel", {
					get : function() {
						return this._sandTilesLabel
					},
					enumerable : !0,
					configurable : !0
				}), b
	}(Phaser.Group);
	a.LevelGUI = b
}(game || (game = {}));
var game;
!function(a) {
	var b;
	!function(a) {
		a[a.ACTIVE = 0] = "ACTIVE", a[a.PAUSED = 1] = "PAUSED", a[a.RESTART = 2] = "RESTART"
	}(b || (b = {}));
	var c = function(b) {
		function c() {
			b.apply(this, arguments)
		}
		return __extends(c, b), c.prototype.init = function(b) {
			this.debugRenderFlag = !1, this.state = 1, this.tutorHands = [], this._settings = new a.LevelSettings(b), this.result = new a.LevelResult(b)
		}, c.prototype.preload = function() {
			if (a.Main.development) {
				var b = this._settings.levelNumber.toString(), c = "assets/levels/Level_"
						+ b + ".json";
				this.load.json("level_" + b, c)
			}
		}, c.prototype.create = function() {
			this.game.state.onShutDownCallback = this.destroy, this.state = 1, this
					.addLayers(), this.parse(), this.initKeyCallbacks(), a.Main.development
					&& this.addFPSMeter(), this.grid.init(), 5 === this._settings.levelNumber
					&& (this.tutorHands[1].visible = !1, this.tutorHands[2].visible = !1), this.state = 0
		}, c.prototype.addLayers = function() {
			this.addBackground(), this.addTopRow(), this.addGrid(), this
					.addSideGrass(), this.addGui()
		}, c.prototype.addBackground = function() {
			var a = "levelBackground", b = this.cache.getTexture(a), c = this.game.add
					.image(0, 0, a);
			c.setTexture(b.texture)
		}, c.prototype.addTopRow = function() {
			var a = "topRow", b = this.cache.getTexture(a), c = this.game.add
					.image(4, -16, a);
			c.setTexture(b.texture)
		}, c.prototype.addSideGrass = function() {
			var b = 26, c = new Phaser.Image(this.game, -b,
					a.Config.HALF_GAME_HEIGHT, "levelGraphics", "EdgeGrass0000");
			c.anchor.set(.5, .5), c.angle = -90, this.world.add(c);
			var d = new Phaser.Image(this.game, a.Config.GAME_WIDTH + b,
					a.Config.HALF_GAME_HEIGHT, "levelGraphics", "EdgeGrass0000");
			d.anchor.set(.5, .5), d.angle = 90, this.world.add(d)
		}, c.prototype.addGrid = function() {
			this.grid = new a.Grid(this.game), this.grid.x = 5, this.grid.y = 55, this.grid.levelCompleteSignal
					.addOnce(this.levelComplete, this), this.grid.sandTilesChanged
					.add(this.onSandTilesChanged, this), 3 === this._settings.levelNumber
					&& this.grid.valveUsed.addOnce(this.hideTutorHands, this)
		}, c.prototype.onSandTilesChanged = function(a, b) {
			this.gui.sandTilesLabel.updateText(a), 1 === this._settings.levelNumber
					&& "removed" === b
					? this.hideTutorHands()
					: 5 === this._settings.levelNumber
							&& ("removed" === b
									? (this.tutorHands[0].visible = !1, this.tutorHands[1].visible = !0, this.tutorHands[2].visible = !0)
									: this.hideTutorHands())
		}, c.prototype.hideTutorHands = function() {
			this.tutorHands.forEach(function(a) {
						a.exists && a.hideAndDestroy()
					})
		}, c.prototype.addGui = function() {
			this.gui = new a.LevelGUI(this.game, this._settings)
		}, c.prototype.addFPSMeter = function() {
			this.time.advancedTiming = !0, this.fpsMeter = new utils.FPSMeter(
					this.game, 0, 0)
		}, c.prototype.parse = function() {
			var b;
			if (a.Main.development)
				b = this.game.cache.getJSON("level_"
						+ this._settings.levelNumber.toString());
			else {
				var c = "Level_" + this._settings.levelNumber, d = this.game.cache
						.getJSON("levelConfigs");
				b = d[c]
			}
			a.Main.parser.parse(this, b)
		}, c.prototype.initKeyCallbacks = function() {
			var b = this;
			this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(
					this.restart, this), this.game.input.keyboard
					.addKey(Phaser.Keyboard.P).onDown.add(this.togglePause,
					this), this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown
					.add(this.gotoChooseLevelMenu, this), a.Main.development
					&& (this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown
							.add(function() {
										b.fpsMeter.visible = !b.fpsMeter.visible
									}), this.game.input.keyboard
							.addKey(Phaser.Keyboard.D).onDown.add(
							this.toggleDebugRender, this), this.game.input.keyboard
							.addKey(Phaser.Keyboard.LEFT).onDown.add(
							this.gotoPrevLevel, this), this.game.input.keyboard
							.addKey(Phaser.Keyboard.RIGHT).onDown.add(
							this.gotoNextLevel, this))
		}, c.prototype.gotoPrevLevel = function() {
			var b = this._settings.levelNumber, c = 1 === b
					? a.Config.LEVELS_NUM
					: b - 1;
			this.gotoLevel(c)
		}, c.prototype.gotoNextLevel = function() {
			var b = this._settings.levelNumber, c = b >= a.Config.LEVELS_NUM
					? 1
					: b + 1;
			this.gotoLevel(c)
		}, c.prototype.gotoLevel = function(a) {
			this.game.state.start("Level", !0, !1, a)
		}, c.prototype.restart = function() {
			this.state = 2
		}, c.prototype.toggleDebugRender = function() {
			this.debugRenderFlag = !this.debugRenderFlag
		}, c.prototype.gotoChooseLevelMenu = function() {
			this.game.state.start("LevelsMenu", !0, !1)
		}, c.prototype.togglePause = function() {
			this.game.paused = !this.game.paused, this.game.paused ? this
					.onPause() : this.onResume()
		}, c.prototype.onPause = function() {
			this.state = 1
		}, c.prototype.onResume = function() {
			this.state = 1
		}, c.prototype.update = function() {
			switch (this.state) {
				case 0 :
					this.doUpdate();
					break;
				case 2 :
					this.doRestart(), this.state = 0
			}
		}, c.prototype.doRestart = function() {
			this.gotoLevel(this._settings.levelNumber)
		}, c.prototype.doUpdate = function() {
		}, c.prototype.levelComplete = function() {
			this.game.device.webAudio && this.game.sound.play("levelComplete"), this
					.saveLevelResult(), this.gui.onLevelComplete()
		}, c.prototype.saveLevelResult = function() {
			window.localStorage.setItem(this.settings.levelNumber.toString(),
					"true")
		}, c.prototype.render = function() {
			this.debugRenderFlag && this.debugRender()
		}, c.prototype.debugRender = function() {
			this.grid.render()
		}, c.prototype.destroy = function() {
			this.game.state.onShutDownCallback = null, this
					.removeKeyCallbacks(), this._settings = null, this.result = null, this.tutorHands = null
		}, c.prototype.removeKeyCallbacks = function() {
			this.game.input.keyboard.removeKey(Phaser.Keyboard.R), this.game.input.keyboard
					.removeKey(Phaser.Keyboard.P), this.game.input.keyboard
					.removeKey(Phaser.Keyboard.ESC), this.game.input.keyboard
					.removeKey(Phaser.Keyboard.D)
		}, Object.defineProperty(c.prototype, "settings", {
					get : function() {
						return this._settings
					},
					enumerable : !0,
					configurable : !0
				}), c
	}(Phaser.State);
	a.Level = c
}(game || (game = {}));
var game;
!function(a) {
	var b = function(a) {
		function b(b, c, d) {
			a.call(this, b, c, d, "tutorial_hand"), this.initAnimation()
		}
		return __extends(b, a), b.prototype.initAnimation = function() {
			this.animations.add("main", null), this.play("main", 30, !0)
		}, b.prototype.hideAndDestroy = function() {
			this.animations.stop(), this.game.add.tween(this).to({
						alpha : 0
					}, 300, Phaser.Easing.Linear.None, !0).onComplete.addOnce(
					this.destroy, this)
		}, b
	}(Phaser.Sprite);
	a.TutorHand = b
}(game || (game = {}));
var game;
!function(a) {
	var b = function() {
		function a(a) {
			this.game = a, this.initCallbacks()
		}
		return a.prototype.initCallbacks = function() {
			this.callbacks = {}, this.callbacks.SandTile = this.addSandTile, this.callbacks.WaterTile = this.addWaterTile, this.callbacks.Tile = this.addTile, this.callbacks.Flower = this.addFlower, this.callbacks.Valve = this.addValve, this.callbacks.Gnome = this.addGnome, this.callbacks.Pipe = this.addPipe, this.callbacks.Tutorial_Hand = this.addTutorialHand
		}, a.prototype.parse = function(a, b) {
			this.newLevel = a, this.levelConfig = b, this.parseObjects(), this
					.cleanup()
		}, a.prototype.cleanup = function() {
			this.newLevel = null, this.levelConfig = null
		}, a.prototype.parseObjects = function() {
			var a = this, b = this.levelConfig;
			b.forEach(function(b) {
						a.addGameObject(b)
					})
		}, a.prototype.addGameObject = function(a) {
			var b = a.type, c = this.getCallback(b), d = c
					? c.call(this, a)
					: this.addImage(a);
			d && d.body && (d.body = null)
		}, a.prototype.getCallback = function(a) {
			for (var b in this.callbacks)
				if (a.indexOf(b) > -1)
					return this.callbacks[b];
			return null
		}, a.prototype.addFlower = function(a) {
			var b = a.x, c = a.y + 35, d = new game.Flower(this.game, b, c);
			return this.newLevel.grid.addObject(d), d
		}, a.prototype.addGnome = function(a) {
			var b = a.x, c = a.y, d = new game.Gnome(this.game, b, c);
			return this.newLevel.grid.addObject(d), d
		}, a.prototype.addValve = function(a) {
			var b = Math.round(a.x), c = Math.round(a.y) + .5 + 5, d = new game.Valve(
					this.game, b, c);
			return this.newLevel.grid.addObject(d), d
		}, a.prototype.addPipe = function(a) {
			var b = a.pipeName, c = a.linkedPipe, d = a.type + "0000", e = new game.Pipe(
					this.game, a.x, a.y + 6, d, b, c);
			return this.newLevel.grid.addObject(e), e
		}, a.prototype.addTile = function(a) {
			var b = a.x, c = a.y, d = a.type + "0000";
			if (null !== this.game.cache.getFrameByName("levelGraphics", d)) {
				var e = new game.CommonTile(this.game, b, c, d);
				return this.newLevel.grid.addTile(e), e
			}
			return null
		}, a.prototype.addSandTile = function(a) {
			var b = a.x, c = a.y, d = new game.SandTile(this.game, b, c);
			return this.newLevel.grid.addTile(d), d
		}, a.prototype.addWaterTile = function(a) {
			var b = a.x, c = a.y, d = new game.WaterTile(this.game, b, c);
			return this.newLevel.grid.addTile(d), d
		}, a.prototype.addTutorialHand = function(a) {
			var b = new game.TutorHand(this.game, a.x, a.y);
			b.x -= 40, b.y -= 65, this.newLevel.grid.addTutorialSprite(b), this.newLevel.tutorHands
					.push(b)
		}, a.prototype.addImage = function(a) {
			var b = a.x, c = a.y, d = a.type + "0000";
			if (null !== this.game.cache.getFrameByName("levelGraphics", d)) {
				var e = new Phaser.Image(this.game, b, c, "levelGraphics_1", d);
				return e.anchor.set(.5, .5), e.scale.set(a.scaleX, a.scaleY), this.newLevel.world
						.add(e), e
			}
			return null
		}, a
	}();
	a.LevelParser = b
}(game || (game = {})), window.addEventListener("load", onLoad, !1);
var game;
!function(a) {
	var b = function(b) {
		function c() {
			b.call(this, a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT,
					Phaser.CANVAS, "gameContainer"), c.parser = new a.LevelParser(this), this
					.initStates(), this.state.start("Boot")
		}
		return __extends(c, b), c.prototype.initStates = function() {
			this.state.add("Boot", a.Boot, !1), this.state.add("Preloader",
					a.Preloader, !1), this.state
					.add("MainMenu", a.MainMenu, !1), this.state.add(
					"LevelsMenu", a.LevelsMenu, !1), this.state.add("Level",
					a.Level, !1)
		}, c.development = !1, c.wasMuted = !1, c
	}(Phaser.Game);
	a.Main = b
}(game || (game = {}));
