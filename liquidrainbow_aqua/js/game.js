function onLoad() {
    var a = {
        id: "576742227280292114"
    };
    window.GameAPI.loadAPI(function (a) {
        window.__SpilAPI = a, new game.Main
    }, a)
}
var game;
! function (a) {
    var b = function () {
        function a() {}
        return a.GAME_WIDTH = 640, a.GAME_HEIGHT = 832, a.HALF_GAME_WIDTH = .5 * a.GAME_WIDTH, a.HALF_GAME_HEIGHT = .5 * a.GAME_HEIGHT, a.LEVELS_NUM = 60, a
    }();
    a.Config = b
}(game || (game = {}));
var __extends = this.__extends || function (a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = b.prototype, a.prototype = new c
    },
    game;
! function (a) {
    var b = function (b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), c.prototype.init = function () {
            this.game.device.android && !this.game.device.chrome && (this.game.canvas.parentElement.style.overflow = "visible");
            var a = {
                    font: "10px GrilledCheeseBTNToasted"
                },
                b = this.add.text(0, 0, "0", a);
            b.destroy()
        }, c.prototype.preload = function () {
            this.load.image("rotate", "assets/graphics/rotate-phone.png"), this.load.image("LoadingBar_Outer", "assets/graphics/LoadingBar_Outer.png"), this.load.image("LoadingBar_Inner", "assets/graphics/LoadingBar_Inner.png");
            var b = a.Main.spilAPI.Branding.getLogo();
            b.image && (a.Main.logoAction = b.action, this.load.image("spilLogo", b.image)), a.Main.moreGamesAction = a.Main.spilAPI.Branding.getLink("more_games").action
        }, c.prototype.create = function () {
            var b = this.game.scale;
            b.scaleMode = Phaser.ScaleManager.SHOW_ALL, b.minWidth = .25 * a.Config.GAME_WIDTH, b.minHeight = .25 * a.Config.GAME_HEIGHT, b.aspectRatio = a.Config.GAME_WIDTH / a.Config.GAME_HEIGHT, b.pageAlignHorizontally = !0, b.pageAlignVertically = !0, this.game.device.desktop || b.forceOrientation(!1, !0), b.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this), b.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this), b.setScreenSize(!0), this.input.maxPointers = 1, this.stage.disableVisibilityChange = !0, this.stage.backgroundColor = 8179412, this.game.state.start("Preloader", !0, !1)
        }, c.prototype.onEnterIncorrectOrientation = function () {
            document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px"
        }, c.prototype.onLeaveIncorrectOrientation = function () {
            document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px", this.game.device.android && !this.game.device.chrome && this.game.scale.setScreenSize(!0)
        }, c
    }(Phaser.State);
    a.Boot = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), c.prototype.create = function () {
            var b = this;
            a.Main.spilAPI.Branding.displaySplashScreen(function () {
                b.gotoMainMenu()
            }, a.Main.spilData)
        }, c.prototype.addSplash = function () {}, c.prototype.gotoMainMenu = function () {
            this.game.state.start("MainMenu", !0, !1, !0)
        }, c
    }(Phaser.State);
    a.SplashScreen = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(c, d) {
            b.call(this, c, d), this.overlayDuration = 300;
            var e = c.add.bitmapData(a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT, "overlay", !0);
            e.context.fillStyle = "rgba(0, 0, 0, 1)", e.context.fillRect(0, 0, a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT), this.overlay = new Phaser.Image(c, 0, 0, e), this.overlay.visible = !1, this.game.stage.addChild(this.overlay)
        }
        return __extends(c, b), c.prototype.changeState = function (a, b) {
            this.showOverlay(a, b)
        }, c.prototype.showOverlay = function (a, b) {
            var c = this;
            this.game.input.disabled = !0, this.overlayTween && this.overlayTween.isRunning && this.overlayTween.stop(), this.overlay.visible = !0, this.overlay.alpha = 0, this.overlayTween = this.game.add.tween(this.overlay).to({
                alpha: 1
            }, this.overlayDuration, Phaser.Easing.Cubic.Out, !0), this.overlayTween.onComplete.addOnce(function () {
                c.doChangeState(a, b)
            }, this)
        }, c.prototype.doChangeState = function (a, b) {
            var c = this;
            this.game.state.start(a, !0, !1, b), setTimeout(function () {
                c.hideOverlay()
            }, 100), setTimeout(function () {
                c.overlay.visible && (c.overlay.visible = !1)
            }, 100 + this.overlayDuration)
        }, c.prototype.hideOverlay = function () {
            this.game.input.disabled = !1, this.overlayTween && this.overlayTween.isRunning && this.overlayTween.stop(), this.overlayTween = this.game.add.tween(this.overlay).to({
                alpha: 0
            }, this.overlayDuration, Phaser.Easing.Cubic.Out, !0)
        }, c
    }(Phaser.Plugin);
    a.StateTransition = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), c.prototype.init = function () {
            this.addLoadingText(), this.addLogo()
        }, c.prototype.addLoadingText = function () {
            var b = {
                    font: "45px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                },
                c = this.game.add.text(0, 0, "Loading...", b);
            c.anchor.set(.5, .5), c.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT + 100), c.setShadow(2, 2, "#249BC8")
        }, c.prototype.addLogo = function () {
            if (this.cache.checkImageKey("spilLogo")) {
                var b = this.game.add.image(0, 0, "spilLogo");
                b.anchor.set(.5, .5), b.scale.set(1.5, 1.5), b.x = a.Config.HALF_GAME_WIDTH, b.y = a.Config.HALF_GAME_HEIGHT - b.height - 20, b.inputEnabled = !0, b.events.onInputDown.add(a.Main.logoAction, this), b.input.useHandCursor = !0
            }
        }, c.prototype.preload = function () {
            this.addPreloadBar(), this.loadAssets()
        }, c.prototype.addPreloadBar = function () {
            if (a.Main.development === !1) {
                var b = this.game.add.sprite(0, 0, "LoadingBar_Inner");
                b.x = a.Config.HALF_GAME_WIDTH - .5 * b.width - .5, b.y = a.Config.HALF_GAME_HEIGHT - .5 * b.height - 1.5;
                var c = this.add.image(0, 0, "LoadingBar_Outer");
                c.anchor.set(.5, .5), c.x = a.Config.HALF_GAME_WIDTH - .5, c.y = a.Config.HALF_GAME_HEIGHT, this.load.setPreloadSprite(b)
            }
        }, c.prototype.loadAssets = function () {
            this.load.audio("main_loop", ["assets/audio/MainLoop.ogg", "assets/audio/MainLoop.m4a"], !0), this.game.device.webAudio && (this.load.audio("tap", ["assets/audio/TapSound.wav"], !0), this.load.audio("onLevelComplete", ["assets/audio/LevelCompleteSound.wav"], !0), this.load.audio("on_down", ["assets/audio/OnDown.wav"], !0), this.load.audio("on_up", ["assets/audio/OnUp.wav"], !0), this.load.audio("star", ["assets/audio/Star.wav"], !0), this.load.audio("star_taken", ["assets/audio/StarTaken.wav"], !0)), this.load.image("splash_screen", "http://www8.agame.com/mirror/img/Splash_Image_GGG.png"), this.load.atlasJSONHash("gui", "assets/graphics/gui.png", "assets/graphics/gui.json"), this.load.atlasJSONHash("level_graphics", "assets/graphics/level_graphics.png", "assets/graphics/level_graphics.json"), this.load.atlasJSONHash("manta_ray", "assets/graphics/manta_ray.png", "assets/graphics/manta_ray.json"), this.load.atlasJSONHash("level_complete", "assets/graphics/level_complete.png", "assets/graphics/level_complete.json"), this.load.atlasJSONHash("tutor_hand", "assets/graphics/tutorial_hand.png", "assets/graphics/tutorial_hand.json"), this.load.atlasJSONHash("tutorial", "assets/graphics/tutorial.png", "assets/graphics/tutorial.json"), this.load.atlasJSONHash("yellow_fish", "assets/graphics/yellow_fish.png", "assets/graphics/yellow_fish.json"), this.load.atlasJSONHash("pink_fish", "assets/graphics/pink_fish.png", "assets/graphics/pink_fish.json"), this.load.json("texts", "assets/texts.json"), a.Main.development ? this.load.json("startLevel", "assets/levels/StartLevel.json") : this.load.json("levelConfigs", "assets/levels/Levels.json")
        }, c.prototype.create = function () {
            if (this.initLanguage(), this.prepareTextures(), this.game.plugins.add(a.StateTransition), this.game.cache.removeImage("LoadingBar_Outer"), this.game.cache.removeImage("LoadingBar_Inner"), a.Main.development) {
                this.cache.getJSON("startLevel").level
            }
            this.game.state.start("SplashScreen", !0, !1)
        }, c.prototype.initLanguage = function () {
            var b = this.game.cache.getJSON("texts");
            a.Main.texts = b[a.Main.language]
        }, c.prototype.prepareTextures = function () {}, c
    }(Phaser.State);
    a.Preloader = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d, e, f) {
            var g = this;
            a.call(this, b, c, d, e, f), this._callback = new Phaser.Signal, this.anchor.set(.5, .5), this.inputEnabled = !0, this.game.device.desktop && (this.input.useHandCursor = !0), this.inputEnabled && (this.events.onInputDown.add(function () {
                g.game.device.webAudio && g.game.sound.play("tap"), g.game.add.tween(g.scale).to({
                    x: .9,
                    y: .9
                }, 200, Phaser.Easing.Cubic.Out, !0)
            }), this.events.onInputUp.add(function () {
                g.game.add.tween(g.scale).to({
                    x: 1,
                    y: 1
                }, 100, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(g._callback.dispatch, g)
            }))
        }
        return __extends(b, a), b.prototype.destroy = function () {
            a.prototype.destroy.call(this), this._callback.dispose()
        }, Object.defineProperty(b.prototype, "callback", {
            get: function () {
                return this._callback
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.SimpleButton = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d, e, f) {
            a.call(this, b, c, d, "gui", e), this.textureKey1 = e, this.textureKey2 = f, this.activeTextureKey = this.textureKey1, this._state = 1, this.events.onInputUp.add(this.switchTextures, this, 2)
        }
        return __extends(b, a), b.prototype.switchTextures = function () {
            this.activeTextureKey = this.activeTextureKey === this.textureKey1 ? this.textureKey2 : this.textureKey1, this.loadTexture("gui", this.activeTextureKey), this._state = this.activeTextureKey === this.textureKey1 ? 1 : 2
        }, Object.defineProperty(b.prototype, "state", {
            get: function () {
                return this._state
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(game.SimpleButton);
    a.ToggleButton = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c() {
            b.apply(this, arguments), this.fromPreloader = !1
        }
        return __extends(c, b), c.prototype.init = function (a) {
            this.fromPreloader = a
        }, c.prototype.create = function () {
            this.initImages(), this.addCreatures(), this.initButtons(), this.initLogo(), this.initCredits(), this.initAnimation(), this.fromPreloader && (this.soundButton.input.enabled = !1, this.soundButton.switchTextures(), this.game.input.onTap.addOnce(this.startMusic, this), this.stage.disableVisibilityChange = !1, this.game.onBlur.add(this.onFocusLost, this), this.game.onFocus.add(this.onFocus, this))
        }, c.prototype.onFocusLost = function () {
            this.game.tweens.pauseAll(), a.Main.wasMuted = this.game.sound.mute, this.game.sound.mute = !0
        }, c.prototype.onFocus = function () {
            this.game.tweens.resumeAll(), a.Main.wasMuted === !1 && (this.game.sound.mute = !1)
        }, c.prototype.initImages = function () {
            this.game.add.image(-32, 0, "gui", "BG_20000"), this.title = this.add.image(0, 0, "gui", "GameTitle0000"), this.title.anchor.set(.5, .5), this.title.x = a.Config.HALF_GAME_WIDTH - .5, this.title.y = 150
        }, c.prototype.addCreatures = function () {
            this.needlefish = this.game.add.image(a.Config.HALF_GAME_WIDTH + 15, 550, "gui", "Needlefish0000"), this.needlefish.angle = 120, this.octopus = this.game.add.image(a.Config.HALF_GAME_WIDTH + 190, 760, "gui", "Octopus0000"), this.jelly = this.game.add.image(a.Config.HALF_GAME_WIDTH - 145, 740, "gui", "Jelly0000"), [this.needlefish, this.octopus, this.jelly].forEach(function (a) {
                a.anchor.set(.5, .5)
            })
        }, c.prototype.initButtons = function () {
            var b = this,
                c = 60;
            this.soundButton = new a.ToggleButton(this.game, a.Config.GAME_WIDTH - c, c, "Music_On_Button0000", "Music_Off_Button0000"), this.soundButton.callback.add(function () {
                b.game.sound.mute = !b.game.sound.mute
            }), this.game.sound.mute && this.soundButton.switchTextures(), this.playButton = new a.SimpleButton(this.game, a.Config.HALF_GAME_WIDTH, 330, "gui", "Play_Button0000"), this.playButton.callback.addOnce(function () {
                b.game.changeState("LevelsMenu")
            }, this), this.creditsButton = new a.SimpleButton(this.game, a.Config.HALF_GAME_WIDTH + 130, 345, "gui", "Credits_Button0000"), this.creditsButton.callback.add(this.toggleCredits, this), this.moreGamesButton = new a.SimpleButton(this.game, a.Config.HALF_GAME_WIDTH - 130, 345, "gui", "MoreGames_Button0000"), this.moreGamesButton.callback.add(a.Main.moreGamesAction, this), this.buttons = [this.playButton, this.soundButton, this.moreGamesButton, this.creditsButton], this.buttons.forEach(function (a) {
                b.world.add(a)
            })
        }, c.prototype.initLogo = function () {
            if (this.cache.checkImageKey("spilLogo")) {
                var b = this.game.add.image(0, 0, "spilLogo");
                b.scale.set(1.5, 1.5), b.x = .5 * (a.Config.GAME_WIDTH - b.width), b.y = a.Config.GAME_HEIGHT - b.height - 20, b.inputEnabled = !0, b.events.onInputDown.add(a.Main.logoAction, this), b.input.useHandCursor = !0
            }
        }, c.prototype.initCredits = function () {
            this.credits = this.game.add.image(0, 0, "gui", "CreditsBoard0000"), this.credits.position.set(Math.round(.5 * (a.Config.GAME_WIDTH - this.credits.width)), Math.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height))), this.credits.visible = !1
        }, c.prototype.toggleCredits = function () {
            this.credits.visible ? this.hideCredits() : this.showCredits()
        }, c.prototype.hideCredits = function () {
            var a = this;
            this.game.add.tween(this.credits).to({
                y: this.credits.y + 200,
                alpha: 0
            }, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(function () {
                a.playButton.input.enabled = !0, a.creditsButton.input.enabled = !0, a.credits.visible = !1
            }, this)
        }, c.prototype.showCredits = function () {
            var b = this;
            this.credits.visible = !0, this.credits.alpha = 0, this.credits.y = Math.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height)) + 200, this.game.add.tween(this.credits).to({
                y: this.credits.y - 200,
                alpha: 1
            }, 500, Phaser.Easing.Back.Out, !0), this.playButton.input.enabled = !1, this.creditsButton.input.enabled = !1, this.game.input.onTap.addOnce(function () {
                b.hideCredits()
            }, this)
        }, c.prototype.startMusic = function () {
            this.game.sound.play("main_loop", .33, !0), this.soundButton.switchTextures(), this.soundButton.input.enabled = !0
        }, c.prototype.initAnimation = function () {
            var a = this;
            this.title.y -= 280, this.game.add.tween(this.title).to({
                y: this.title.y + 280
            }, 600, Phaser.Easing.Back.Out, !0, 300);
            var b = 800;
            this.needlefish.y += 500, this.octopus.x += 400, this.jelly.x -= 400, this.game.add.tween(this.needlefish).to({
                y: this.needlefish.y - 500,
                angle: 354
            }, 700, Phaser.Easing.Back.Out, !0, b), this.game.add.tween(this.octopus).to({
                x: this.octopus.x - 400
            }, 600, Phaser.Easing.Back.Out, !0, b + 300), this.game.add.tween(this.jelly).to({
                x: this.jelly.x + 400
            }, 600, Phaser.Easing.Back.Out, !0, b + 300);
            var c = 1600;
            this.buttons.forEach(function (b) {
                b.scale.set(0, 0), a.game.add.tween(b.scale).to({
                    x: 1,
                    y: 1
                }, 300, Phaser.Easing.Back.Out, !0, c), c += 200
            })
        }, c.prototype.destroy = function () {
            this.buttons = null
        }, c
    }(Phaser.State);
    a.MainMenu = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d, e, f) {
            "undefined" == typeof f && (f = !1);
            var g = this;
            a.call(this, b, c, d, "gui", "Button_Clear0000"), this.inputEnabled = !f, this.locked = f, this._levelNumber = e, this.anchor.set(.5, .5), this.createGraphics(), this.inputEnabled && (this.game.device.desktop && (this.input.useHandCursor = !0), this.events.onInputDown.add(function () {
                g.game.sound.play("tap", .75), g.game.add.tween(g.scale).to({
                    x: .9,
                    y: .9
                }, 200, Phaser.Easing.Cubic.Out, !0)
            }), this.events.onInputUp.add(function () {
                g.game.add.tween(g.scale).to({
                    x: 1,
                    y: 1
                }, 200, Phaser.Easing.Cubic.Out, !0)
            }))
        }
        return __extends(b, a), b.prototype.createGraphics = function () {
            this.locked ? this.createLockedGraphics() : this.createUnlockedGraphics()
        }, b.prototype.createLockedGraphics = function () {
            this.loadTexture("gui", "Button_Lock0000")
        }, b.prototype.createUnlockedGraphics = function () {
            var a = -2;
            this.game.device.firefox && (a = 8);
            var b = {
                    font: "42px GrilledCheeseBTNToasted",
                    fill: "#218DB7",
                    align: "center"
                },
                c = this.game.add.text(0, 0, this._levelNumber.toString(), b);
            c.anchor.set(.5, .5);
            var d = this.game.add.renderTexture(this.width, this.height);
            d.renderXY(this, .5 * this.width, .5 * this.height), d.renderXY(c, Math.floor(.5 * this.width) - 2, Math.floor(.5 * this.height) + a), this.setTexture(d), c.destroy()
        }, Object.defineProperty(b.prototype, "levelNumber", {
            get: function () {
                return this._levelNumber
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.LevelIcon = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d, e) {
            a.call(this, b, c), this._width = 0;
            for (var f = 0, g = 30, h = 0; d > h; h++) {
                var i = b.add.image(f, 0, "gui", "Star_NO0000", this);
                i.anchor.set(.5, .5), f += g, this._width += g
            }
            f = 0;
            for (var h = 0; e > h; h++) {
                var j = b.add.image(f, 0, "gui", "Star_YES0000", this);
                j.anchor.set(.5, .5), f += g
            }
        }
        return __extends(b, a), b.prototype.getWidth = function () {
            return this._width
        }, b
    }(Phaser.SpriteBatch);
    a.LevelIconStars = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function () {
        function a() {}
        return a
    }();
    a.LevelResult = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c) {
            b.call(this, a, c), this.distanceBetweenPages = 560, this.isTweening = !1, this._iconClicked = new Phaser.Signal, this.initIconSets(), this.calculateWidth(), this.currentPage = 0, this.pages[this.currentPage].visible = !0
        }
        return __extends(c, b), c.prototype.initIconSets = function () {
            this.pages = [];
            for (var a = 1, b = 20, c = 0, d = 0; 3 > d; d++) {
                var e = a,
                    f = e + b - 1,
                    g = this.createIconSet(e, f);
                g.visible = !1, g.x = c, c += this.distanceBetweenPages, a += b, this.pages[d] = g
            }
        }, c.prototype.createIconSet = function (b, c) {
            for (var d = this.game.add.group(this), e = 120, f = 144, g = 0, h = 0, i = b; c >= i; i++) {
                var j = i,
                    k = this.levelIsLocked(j),
                    l = new a.LevelIcon(this.game, g, h, j, k);
                k === !1 && l.events.onInputUp.addOnce(this.dispatchIconClicked, this);
                var m = this.getLevelResult(j);
                if (m) {
                    var n = new a.LevelIconStars(this.game, d, m.starsAvailable, m.starsEarned),
                        o = g - .5 * n.getWidth() + 13;
                    n.position.set(o, h + 62)
                }
                d.add(l), g += e, i % 4 === 0 && (g = 0, h += f)
            }
            return d
        }, c.prototype.levelIsLocked = function (b) {
            if (1 === b) return !1;
            var c = b - 1,
                d = c.toString(),
                e = a.Main.storage.getValue(d);
            return null === e
        }, c.prototype.getLevelResult = function (b) {
            var c = b.toString(),
                d = a.Main.storage.getValue(c);
            return d && d.length > 0 ? JSON.parse(d) : null
        }, c.prototype.dispatchIconClicked = function (a) {
            this.game.time.events.add(200, this._iconClicked.dispatch, this, a.levelNumber)
        }, c.prototype.calculateWidth = function () {
            var a = 0,
                b = this.pages[0].getTop().x;
            this._width = b - a
        }, c.prototype.showPage = function (a) {
            if (!this.isTweening) {
                var b;
                if ("next_page" === a ? b = Math.min(this.currentPage + 1, this.pages.length - 1) : "prev_page" === a && (b = Math.max(0, this.currentPage - 1)), b !== this.currentPage) {
                    this.isTweening = !0;
                    var c = "next_page" === a ? -this.distanceBetweenPages : this.distanceBetweenPages;
                    this.currentPage = b, this.pages.forEach(function (a) {
                        a.visible = !0
                    }), this.game.add.tween(this).to({
                        x: this.x + c
                    }, 600, Phaser.Easing.Cubic.InOut, !0).onComplete.addOnce(this.onTweenComplete, this)
                }
            }
        }, c.prototype.onTweenComplete = function () {
            this.isTweening = !1;
            for (var a = 0; a < this.pages.length; a++) a !== this.currentPage && (this.pages[a].visible = !1)
        }, c.prototype.getWidth = function () {
            return this._width
        }, c.prototype.isFirstPage = function () {
            return 0 === this.currentPage
        }, c.prototype.isLastPage = function () {
            return this.currentPage === this.pages.length - 1
        }, c.prototype.destroy = function () {
            b.prototype.destroy.call(this, !0), this._iconClicked.dispose(), this._iconClicked = null, this.pages = null
        }, Object.defineProperty(c.prototype, "iconClicked", {
            get: function () {
                return this._iconClicked
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.LevelIcons = b
}(game || (game = {}));
var utils;
! function (a) {
    var b = function () {
        function b() {}
        return b.createArrayWithNumbers = function (a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
            for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;) f[e++] = a, a += c;
            return f
        }, b.getRandomItem = function (b) {
            var c = a.MathUtil.integerInRange(0, b.length - 1);
            return b[c]
        }, b
    }();
    a.ArrayUtil = b
}(utils || (utils = {}));
var utils;
! function (a) {
    var b = function () {
        function a() {}
        return a.distanceSquared = function (a, b, c, d) {
            var e = c - a,
                f = d - b;
            return e * e + f * f
        }, a.distance = function (b, c, d, e) {
            var f = a.distanceSquared(b, c, d, e);
            return Math.sqrt(f)
        }, a.realInRange = function (a, b) {
            return Math.random() * (b - a) + a
        }, a.integerInRange = function (b, c) {
            return Math.round(a.realInRange(b, c))
        }, a.DEG_TO_RAD = .017453292519943295, a.RAD_TO_DEG = 57.29577951308232, a
    }();
    a.MathUtil = b
}(utils || (utils = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c, d, e) {
            b.call(this, a, c, d, e), this.anchor.set(.5, .5);
            var f = a.rnd.realInRange(1, 2);
            this.scale.set(f, f), this.target = new Phaser.Point, this.velocity = new Phaser.Point, this.setTarget(), this.addAnimation("main", 0, 19), this.play("main")
        }
        return __extends(c, b), c.prototype.addAnimation = function (a, b, c) {
            var d = utils.ArrayUtil.createArrayWithNumbers(b, c + 1);
            this.animations.add(a, d, 30, !0)
        }, c.prototype.setTarget = function () {
            this.target.x = this.x < a.Config.HALF_GAME_WIDTH ? a.Config.GAME_WIDTH + 100 : -100, this.target.y = this.game.rnd.integerInRange(60, a.Config.GAME_HEIGHT - 60), this.maxSpeed = this.game.rnd.realInRange(2, 3), this.velocity = this.target.clone().subtract(this.x, this.y).normalize().multiply(this.maxSpeed, this.maxSpeed), this.scale.x = this.velocity.x > 0 ? -1 * Math.abs(this.scale.x) : Math.abs(this.scale.x)
        }, c.prototype.update = function () {
            var a = utils.MathUtil.distanceSquared(this.x, this.y, this.target.x, this.target.y);
            a < this.maxSpeed * this.maxSpeed && this.setTarget(), this.x += this.velocity.x, this.y += this.velocity.y
        }, c.prototype.destroy = function () {
            b.prototype.destroy.call(this, !0), this.target = null, this.velocity = null
        }, c
    }(Phaser.Sprite);
    a.Fish = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d) {
            var e = this;
            a.call(this, b, 0, 0, c, d), this.hidden = !1, this.anchor.set(.5, .5), this.inputEnabled = !0, this.events.onInputDown.add(function () {
                e.game.device.webAudio && e.game.sound.play("tap"), e.game.add.tween(e.scale).to({
                    x: .9,
                    y: .9
                }, 200, Phaser.Easing.Cubic.Out, !0)
            }), this.events.onInputUp.add(function () {
                e.game.add.tween(e.scale).to({
                    x: 1,
                    y: 1
                }, 200, Phaser.Easing.Cubic.Out, !0)
            }, this, 1)
        }
        return __extends(b, a), b.prototype.show = function () {
            this.hidden && (this.hidden = !1, this.input.enabled = !0, this.game.add.tween(this).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0))
        }, b.prototype.hide = function (a) {
            "undefined" == typeof a && (a = !1), this.hidden === !1 && (this.hidden = !0, this.input.enabled = !1, a ? this.alpha = 0 : this.game.add.tween(this).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0))
        }, b
    }(Phaser.Image);
    a.ArrowButton = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c() {
            b.call(this)
        }
        return __extends(c, b), c.prototype.create = function () {
            this.game.add.image(-32, 0, "gui", "BG_20000"), this.addFishes(), this.initLevelIcons(), this.initNavigationArrows(), this.initButtons(), a.Main.development && (this.addFPSMeter(), this.game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(this.clearSavedData, this))
        }, c.prototype.clearSavedData = function () {
            var b = window.confirm("Do you want to clear all saved data?");
            b && (a.Main.storage.clear(), this.game.state.restart(!0, !1))
        }, c.prototype.addFishes = function () {
            var b = this,
                c = new a.Fish(this.game, this.game.rnd.integerInRange(0, a.Config.GAME_WIDTH), 100, "yellow_fish"),
                d = new a.Fish(this.game, this.game.rnd.integerInRange(0, a.Config.GAME_WIDTH), 300, "yellow_fish"),
                e = new a.Fish(this.game, this.game.rnd.integerInRange(0, a.Config.GAME_WIDTH), 600, "pink_fish");
            [c, d, e].forEach(function (a) {
                b.world.add(a)
            })
        }, c.prototype.initLevelIcons = function () {
            this.levelIcons = new a.LevelIcons(this.game, this.world), this.levelIcons.iconClicked.addOnce(this.onLevelIconClicked, this), this.levelIcons.x = .5 * (a.Config.GAME_WIDTH - this.levelIcons.getWidth()) + 2, this.levelIcons.y = 155
        }, c.prototype.onLevelIconClicked = function (a) {
            this.changeState("Level", a)
        }, c.prototype.initNavigationArrows = function () {
            var b = this,
                c = a.Config.HALF_GAME_HEIGHT + 27;
            this.leftArrow = new a.ArrowButton(this.game, "gui", "Button_L0000"), this.leftArrow.events.onInputUp.add(function () {
                b.changeLevelIconsPage("prev_page")
            }, this, 2), this.leftArrow.x = 41, this.leftArrow.y = c, this.leftArrow.hide(!0), this.world.add(this.leftArrow), this.rightArrow = new a.ArrowButton(this.game, "gui", "Button_R0000"), this.rightArrow.events.onInputUp.add(function () {
                b.changeLevelIconsPage("next_page")
            }, this, 2), this.rightArrow.x = a.Config.GAME_WIDTH - 38, this.rightArrow.y = c, this.world.add(this.rightArrow)
        }, c.prototype.changeLevelIconsPage = function (a) {
            this.levelIcons.showPage(a), this.levelIcons.isFirstPage() ? this.leftArrow.hide() : this.levelIcons.isLastPage() ? this.rightArrow.hide() : (this.leftArrow.show(), this.rightArrow.show())
        }, c.prototype.initButtons = function () {
            var b = this,
                c = 60;
            this.backButton = new a.SimpleButton(this.game, c, c, "gui", "Home_Button0000"), this.backButton.callback.addOnce(function () {
                b.changeState("MainMenu")
            }, this), this.world.add(this.backButton), this.soundButton = new a.ToggleButton(this.game, a.Config.GAME_WIDTH - c + .5, c, "Music_On_Button0000", "Music_Off_Button0000"), this.soundButton.callback.add(function () {
                b.game.sound.mute = !b.game.sound.mute
            }), this.game.sound.mute && this.soundButton.switchTextures(), this.world.add(this.soundButton)
        }, c.prototype.changeState = function (a, b) {
            this.game.changeState(a, b)
        }, c.prototype.addFPSMeter = function () {
            new utils.FPSMeter(this.game, 0, a.Config.GAME_HEIGHT - 22)
        }, c
    }(Phaser.State);
    a.LevelsMenu = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function () {
        function a(a) {
            this._ballsToSpawn = 20, this._baseSpeed = 20, this._levelNumber = a
        }
        return Object.defineProperty(a.prototype, "levelNumber", {
            get: function () {
                return this._levelNumber
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(a.prototype, "ballsToSpawn", {
            get: function () {
                return this._ballsToSpawn
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(a.prototype, "baseSpeed", {
            get: function () {
                return this._baseSpeed
            },
            enumerable: !0,
            configurable: !0
        }), a
    }();
    a.LevelSettings = b
}(game || (game = {}));
var utils;
! function (a) {
    var b = function (a) {
        function b(b, c, d) {
            "undefined" == typeof c && (c = 0), "undefined" == typeof d && (d = 0), a.call(this, b, b.world, "FPS Meter"), this.x = c, this.y = d, this.initBackground(), this.initText(), this.game.time.advancedTiming = !0, this.loopEvent = this.game.time.events.loop(500, this.updateText, this)
        }
        return __extends(b, a), b.prototype.initBackground = function () {
            var a = 80;
            this.bg = new Phaser.Graphics(this.game, 0, 0), this.bg.beginFill(0, 1), this.bg.drawRect(0, 0, a, 22), this.bg.endFill(), this.add(this.bg)
        }, b.prototype.initText = function () {
            var a = {
                font: "18px Consolas",
                fill: "#FFFFFF",
                align: "center"
            };
            this.statsText = this.game.add.text(5, 0, "0 fps", a, this)
        }, b.prototype.updateText = function () {
            var a = "FPS: " + this.game.time.fps;
            this.statsText.setText(a)
        }, b.prototype.destroy = function () {
            this.game.time.events.remove(this.loopEvent), this.loopEvent = null, this.game.time.advancedTiming = !1, a.prototype.destroy.call(this)
        }, b
    }(Phaser.Group);
    a.FPSMeter = b
}(utils || (utils = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d, e) {
            a.call(this, b, c, d, "debug_gui", e), this.inputEnabled = !0, this.input.useHandCursor = !0
        }
        return __extends(b, a), b
    }(Phaser.Image);
    a.DebugButton = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c) {
            a.call(this, b, c, "SandTilesLabel"), this.initBack(), this.initText()
        }
        return __extends(b, a), b.prototype.initBack = function () {
            var a = new Phaser.Image(this.game, 0, 0, "gui", "SandTiles_Label0000");
            this.add(a)
        }, b.prototype.initText = function () {
            var a = {
                font: "42px TF2 Build",
                fill: "#FDF490",
                align: "center"
            };
            this.text = new Phaser.Text(this.game, 55, 6, "0", a), this.add(this.text)
        }, b.prototype.updateText = function (a) {
            this.text.setText(a.toString())
        }, b
    }(Phaser.SpriteBatch);
    a.SandTilesLabel = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c, d, e) {
            b.call(this, a, c, "Level Complete Board"), this.levelNumber = d, this.starsNum = e, this.boardGroup = this.game.add.group(this), this.addBoard(), this.addLabel(), this.addStars(), this.addButtons()
        }
        return __extends(c, b), c.prototype.addBoard = function () {
            var a = this.game.add.image(0, 0, "level_complete", "LevelComplete_Board0000", this.boardGroup);
            this._width = a.width
        }, c.prototype.addLabel = function () {
            var b = a.Main.texts.level_complete,
                c = {
                    font: "45px GrilledCheeseBTNToasted",
                    fill: "#249BC8",
                    align: "center"
                },
                d = new Phaser.Text(this.game, 50, 20, b, c);
            d.anchor.set(.5, .5), d.x = .5 * this._width, d.y = 60, this.boardGroup.add(d)
        }, c.prototype.addStars = function () {
            var a = this.game.add.group(this.boardGroup, "stars");
            this.stars = [];
            for (var b = 0, c = 100, d = 0, e = 0; e < this.starsNum; e++) {
                var f = this.game.add.image(b, 0, "level_complete", "NoStar0000", a);
                f.anchor.set(.5, .5);
                var g = this.game.add.image(b - 2, -1, "level_complete", "Star0000", a);
                g.anchor.set(.5, .5), g.visible = !1, this.stars.push(g), b += c, d += c
            }
            d -= c, a.x = .5 * (this._width - d), a.y = 146
        }, c.prototype.addButtons = function () {
            var a = this,
                b = this.game.add.group(this),
                c = 116,
                d = new game.SimpleButton(this.game, 0, 0, "level_complete", "Home_Button0000");
            d.callback.addOnce(function () {
                a.game.changeState("LevelsMenu")
            }, this);
            var e = new game.SimpleButton(this.game, c, 0, "level_complete", "Restart_Button0000");
            e.callback.add(function () {
                var b = a.game.state.getCurrentState();
                b.restart()
            }, this);
            var f = new game.SimpleButton(this.game, 2 * c, 0, "level_complete", "NextLevel_Button0000");
            f.callback.addOnce(function () {
                a.levelNumber === game.Config.LEVELS_NUM ? a.game.changeState("LevelsMenu") : a.game.changeState("Level", a.levelNumber + 1)
            }, this), this.buttons = [d, e, f], this.buttons.forEach(function (a) {
                b.add(a)
            }), b.position.set(118, 300)
        }, c.prototype.show = function (a) {
            this.showStars(a), this.startAnimation()
        }, c.prototype.showStars = function (a) {
            this.stars.forEach(function (a) {
                a.visible = !1
            });
            for (var b = 0; b < a.starsEarned; b++) this.stars[b].visible = !0
        }, c.prototype.startAnimation = function () {
            var a = this;
            this.visible = !0, this.boardGroup.y -= 200, this.boardGroup.alpha = 0, this.game.add.tween(this.boardGroup).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0), this.game.add.tween(this.boardGroup).to({
                y: this.boardGroup.y + 200
            }, 500, Phaser.Easing.Back.Out, !0);
            var b = 600,
                c = 800;
            this.stars.forEach(function (d) {
                d.visible && (d.scale.set(3, 3), d.alpha = 0, a.game.add.tween(d).to({
                    alpha: 1
                }, .5 * c, Phaser.Easing.Cubic.Out, !0, b), a.game.add.tween(d.scale).to({
                    x: 1,
                    y: 1
                }, c, Phaser.Easing.Bounce.Out, !0, b).onStart.addOnce(function () {
                    a.game.sound.usingWebAudio && a.game.sound.play("star")
                }), b += 500)
            });
            var d = 200;
            this.buttons.forEach(function (b) {
                b.scale.set(0, 0), b.visible = !1, b.y += 200, a.game.add.tween(b).to({
                    y: b.y - 200
                }, 500, Phaser.Easing.Back.Out, !0, d), a.game.add.tween(b.scale).to({
                    x: 1,
                    y: 1
                }, 500, Phaser.Easing.Back.Out, !0, d).onStart.addOnce(function () {
                    b.visible = !0
                }, a), d += 100
            })
        }, c.prototype.hide = function () {
            var a = this;
            this.game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(function () {
                a.visible = !1, a.alpha = 1
            }, this)
        }, c.prototype.getWidth = function () {
            return this._width
        }, c.prototype.destroy = function () {
            b.prototype.destroy.call(this, !0), this.buttons = null, this.stars = null
        }, c
    }(Phaser.Group);
    a.LevelCompleteBoard = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c) {
            b.call(this, a, a.world, "gui"), this.levelSettings = c, this.initLevelLabel(), this.initButtons()
        }
        return __extends(c, b), c.prototype.initLevelLabel = function () {
            var a = "Level " + this.levelSettings.levelNumber,
                b = {
                    font: "45px GrilledCheeseBTNToasted",
                    fill: "#249BC8",
                    align: "center"
                };
            this.label = new Phaser.Text(this.game, 50, 20, a, b), this.add(this.label), this.label.x = .5 * (game.Config.GAME_WIDTH - this.label.getLocalBounds().width), this.label.y = 20
        }, c.prototype.initButtons = function () {
            var a = this,
                b = 55,
                c = new game.ToggleButton(this.game, 505, b, "Music_On_Button0000", "Music_Off_Button0000");
            c.callback.add(function () {
                a.game.sound.mute = !a.game.sound.mute
            }), this.game.sound.mute && c.switchTextures();
            var d = new game.SimpleButton(this.game, 590, b, "gui", "Home_Button0000");
            d.callback.addOnce(function () {
                a.game.changeState("LevelsMenu")
            }), this.buttons = [d, c], this.buttons.forEach(function (b) {
                a.add(b)
            })
        }, c.prototype.gotoNextLevel = function () {
            this.levelSettings.levelNumber === game.Config.LEVELS_NUM ? this.game.state.start("Level", !0, !1, 1) : this.game.state.start("Level", !0, !1, this.levelSettings.levelNumber + 1)
        }, c.prototype.gotoPrevLevel = function () {
            1 === this.levelSettings.levelNumber ? this.game.state.start("Level", !0, !1, a.Config.LEVELS_NUM) : this.game.state.start("Level", !0, !1, this.levelSettings.levelNumber - 1)
        }, c.prototype.initCompleteBoard = function (a) {
            this.completeBoard = new game.LevelCompleteBoard(this.game, this, this.levelSettings.levelNumber, a), this.completeBoard.position.set(.5 * (game.Config.GAME_WIDTH - this.completeBoard.getWidth()), 200), this.completeBoard.visible = !1
        }, c.prototype.onLevelComplete = function (a) {
            this.buttons.forEach(function (a) {
                a.visible = !1
            }), this.completeBoard.show(a)
        }, c.prototype.onRestart = function () {
            this.buttons.forEach(function (a) {
                a.visible = !0
            }), this.completeBoard.hide()
        }, c.prototype.destroy = function () {
            b.prototype.destroy.call(this, !0), this.buttons = null
        }, c
    }(Phaser.Group);
    a.LevelGUI = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d) {
            a.call(this, b, c, d, "level_graphics", "HexCell0000"), this.anchor.set(.5, .5)
        }
        return __extends(b, a), b.RADIUS = 55, b.RADIUS_SQUARED = b.RADIUS * b.RADIUS, b
    }(Phaser.Image);
    a.HexCell = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function () {
        function a(a, b) {
            this.numericValue = a, this.stringValue = b.toUpperCase()
        }
        return a.getDelta = function (a, b) {
            if (a === b) return 0;
            var c = 6,
                d = 3,
                e = Math.abs(a.numericValue - b.numericValue);
            return e > d && (e = c - e), e
        }, a.getDirectionByAngle = function (b) {
            switch (b) {
            case 0:
                return a.TOP;
            case 60:
                return a.RIGHT_TOP;
            case 120:
                return a.RIGHT_BOTTOM;
            case 180:
                return a.BOTTOM;
            case 240:
                return a.LEFT_BOTTOM;
            case 300:
                return a.LEFT_TOP;
            default:
                return null
            }
        }, a.getAngleByDirection = function (b) {
            switch (b) {
            case a.TOP:
                return 0;
            case a.RIGHT_TOP:
                return 60;
            case a.RIGHT_BOTTOM:
                return 120;
            case a.BOTTOM:
                return 180;
            case a.LEFT_BOTTOM:
                return 240;
            case a.LEFT_TOP:
                return 300;
            default:
                return null
            }
        }, a.prototype.toString = function () {
            return "[Direction: " + this.stringValue + "]"
        }, a.TOP = new a(1, "top"), a.RIGHT_TOP = new a(2, "right_top"), a.RIGHT_BOTTOM = new a(3, "right_bottom"), a.BOTTOM = new a(4, "bottom"), a.LEFT_BOTTOM = new a(5, "left_bottom"), a.LEFT_TOP = new a(6, "left_top"), a
    }();
    a.HandDirection = b
}(game || (game = {}));
var game;
! function (a) {
    ! function (a) {
        a[a.Octopus = 0] = "Octopus", a[a.Crab = 1] = "Crab", a[a.Jellyfish = 2] = "Jellyfish", a[a.Needlefish = 3] = "Needlefish", a[a.ElectricRay = 4] = "ElectricRay"
    }(a.CreatureType || (a.CreatureType = {}));
    a.CreatureType
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c) {
            this.happyTexture = c + "_HappyFace0000", this.sadTexture = c + "_SadFace0000", this.isHappy = !1, a.call(this, b, 0, 0, "level_graphics", this.sadTexture), this.anchor.set(.5, .5)
        }
        return __extends(b, a), b.prototype.setHappiness = function (a) {
            a !== this.isHappy && (this.isHappy = a, this.game.add.tween(this.scale).to({
                x: 0,
                y: 0
            }, 150, Phaser.Easing.Back.In, !0).onComplete.addOnce(this.changeTexture, this))
        }, b.prototype.changeTexture = function () {
            this.isHappy ? this.loadTexture("level_graphics", this.happyTexture) : this.loadTexture("level_graphics", this.sadTexture), this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 150, Phaser.Easing.Back.Out, !0)
        }, b
    }(Phaser.Image);
    a.Face = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c, d) {
            b.call(this, a, c), this.isHappy = !1, this.onHappyArea = !1, this.isRayAround = !1, this.hasHands = !1, this._type = d, this.addBody(), this.addFace()
        }
        return __extends(c, b), c.prototype.addBody = function () {
            var b = a.CreatureType[this._type] + "_Body0000";
            this.body = this.game.add.image(0, 0, "level_graphics", b, this), this.body.anchor.set(.5, .5)
        }, c.prototype.addFace = function () {
            var b = a.CreatureType[this._type];
            this.face = new game.Face(this.game, b), this.add(this.face)
        }, c.prototype.onDragComplete = function () {}, c.prototype.updateHappiness = function () {}, c.prototype.returnToLastCell = function () {
            var a = Phaser.Math.distance(this.position.x, this.position.y, this.cell.x, this.cell.y),
                b = Math.min(200, 1.5 * a);
            this.game.add.tween(this.position).to({
                x: this.cell.x,
                y: this.cell.y
            }, b, Phaser.Easing.Cubic.Out, !0)
        }, Object.defineProperty(c.prototype, "type", {
            get: function () {
                return this._type
            },
            enumerable: !0,
            configurable: !0
        }), c.CONTACT_RADIUS = 2 * a.HexCell.RADIUS, c.CONTACT_RADIUS_SQUARED = c.CONTACT_RADIUS * c.CONTACT_RADIUS, c.BODY_RADIUS = 48, c.BODY_RADIUS_SQUARED = c.BODY_RADIUS * c.BODY_RADIUS, c
    }(Phaser.SpriteBatch);
    a.BaseCreature = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(c, d, e) {
            b.call(this, c, 0, 0, "level_graphics", d), this.free = !0, this.anchor.set(.5, 1), this.angle = e, this.currentDirection = a.HandDirection.getDirectionByAngle(e)
        }
        return __extends(c, b), c.prototype.connect = function (b, c) {
            this.free && (this.free = !1, this.connectedHand = b, this.currentDirection = a.HandDirection.getDirectionByAngle(c), this.rotateTo(c))
        }, c.prototype.rotateTo = function (a) {
            this.tween && this.tween.stop();
            var b = 360,
                c = (a - this.angle) % b;
            c !== c % (b / 2) && (c = 0 > c ? c + b : c - b);
            var d = 4 * Math.abs(c);
            this.tween = this.game.add.tween(this).to({
                angle: this.angle + c
            }, d, Phaser.Easing.Cubic.Out, !0)
        }, c.prototype.disconnect = function () {
            this.free === !1 && (this.free = !0, this.connectedHand.disconnect(), this.connectedHand = null, this.angle = a.HandDirection.getAngleByDirection(this.currentDirection), this.tween && this.tween.stop())
        }, c.prototype.destroy = function () {
            this.connectedHand = null
        }, c
    }(Phaser.Image);
    a.Hand = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d, e) {
            a.call(this, b, c, d), this.hasHands = !0, this.addHands(e)
        }
        return __extends(b, a), b.prototype.addHands = function () {}, b.prototype.addHand = function (a) {
            this.addAt(a, 0), this.hands.push(a)
        }, b.prototype.getFreeHands = function () {
            var a = [];
            return this.hands.forEach(function (b) {
                b.free && a.push(b)
            }), a
        }, b.prototype.getFreeHand = function (a) {
            if (this.isDirectionTaken(a)) return null;
            var b = 6,
                c = null;
            return this.hands.forEach(function (d) {
                if (d.free) {
                    var e = game.HandDirection.getDelta(d.currentDirection, a);
                    b > e && (c = d, b = e)
                }
            }), c
        }, b.prototype.isDirectionTaken = function (a) {
            for (var b = 0; b < this.hands.length; b++) {
                var c = this.hands[b];
                if (c.free === !1 && c.currentDirection === a) return !0
            }
            return !1
        }, b.prototype.onDragComplete = function () {
            a.prototype.onDragComplete.call(this), this.disconnectAllHands()
        }, b.prototype.disconnectAllHands = function () {
            this.hands.forEach(function (a) {
                a.disconnect()
            })
        }, b.prototype.hasFreeHands = function () {
            return this.hands.some(function (a) {
                return a.free
            })
        }, b.prototype.updateHappiness = function () {
            var a = this.isHappy;
            this.isHappy = this.onHappyArea ? !0 : this.isRayAround ? !1 : this.hasFreeHands() === !1, this.face.setHappiness(this.isHappy), this.isHappy && a === !1 && this.shake()
        }, b.prototype.shake = function () {
            this.bodyTween && this.bodyTween.isRunning && (this.bodyTween.stop(), this.body.angle = 0), this.bodyTween = this.game.add.tween(this.body).to({
                angle: 15
            }, 100, Phaser.Easing.Cubic.Out, !0, 0, 5, !0)
        }, b.prototype.destroy = function () {
            a.prototype.destroy.call(this, !0, !1), this.hands = null
        }, b
    }(a.BaseCreature);
    a.CreatureWithHands = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c, d, e) {
            b.call(this, a, c, d, e)
        }
        return __extends(c, b), c.prototype.addHands = function (b) {
            this.hands = [];
            for (var c = this.getHandAngles(b), d = 0; b > d; d++) {
                var e = c[d],
                    f = a.CreatureType[this.type] + "_Hand0000",
                    g = new a.Hand(this.game, f, e);
                this.addHand(g)
            }
        }, c.prototype.getHandAngles = function (a) {
            switch (a) {
            case 1:
                return [180];
            case 2:
                return [120, 240];
            case 3:
                return [120, 180, 240];
            case 4:
                return [300, 60, 120, 240];
            case 5:
                return [300, 60, 120, 180, 240];
            case 6:
                return [300, 0, 60, 120, 180, 240];
            default:
                return null
            }
        }, c
    }(a.CreatureWithHands);
    a.Octopus = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c) {
            a.call(this, b, c, 3), this.areCreaturesAround = !0
        }
        return __extends(b, a), b.prototype.updateHappiness = function () {
            this.isHappy = this.onHappyArea ? !0 : this.areCreaturesAround === !1, this.face.setHappiness(this.isHappy)
        }, b
    }(a.BaseCreature);
    a.Needlefish = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c, d) {
            b.call(this, a, c, d), this.initialAngle = d, this.currentAngle = d
        }
        return __extends(c, b), c.prototype.connect = function (a) {
            this.free && (this.free = !1, this.connectedHand = a)
        }, c.prototype.disconnect = function () {
            this.free === !1 && (this.free = !0, this.connectedHand.disconnect(), this.connectedHand = null)
        }, c.prototype.setRotation = function (b) {
            this.currentAngle = (b + this.initialAngle + 360) % 360, this.currentDirection = a.HandDirection.getDirectionByAngle(this.currentAngle)
        }, c
    }(a.Hand);
    a.CrabHand = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c, d) {
            b.call(this, a, c, 1, 2), this._rotatedSignal = new Phaser.Signal, this.rotation = Phaser.Math.degToRad(d), this.currentRotation = this.rotation, this.updateHands(), this.body.x -= 1, this.body.y += 3
        }
        return __extends(c, b), c.prototype.addFace = function () {
            b.prototype.addFace.call(this), this.face.x -= 1, this.face.y -= 16
        }, c.prototype.addHands = function () {
            this.hands = [];
            var b = new a.CrabHand(this.game, "Crab_Hand0000", 300),
                c = new a.CrabHand(this.game, "Crab_Hand0000", 60);
            this.addHand(b), this.addHand(c)
        }, c.prototype.getFreeHand = function (a) {
            for (var b = 0; b < this.hands.length; b++) {
                var c = this.hands[b];
                if (c.free && c.currentDirection === a) return c
            }
            return null
        }, c.prototype.rotate = function () {
            this.currentRotation += Phaser.Math.degToRad(60), this.game.add.tween(this).to({
                rotation: this.currentRotation
            }, 100, Phaser.Easing.Linear.None, !0), this.updateHands(), this._rotatedSignal.dispatch(this)
        }, c.prototype.updateHands = function () {
            var a = Phaser.Math.radToDeg(this.currentRotation);
            a = Math.round(a), this.hands.forEach(function (b) {
                b.setRotation(a), b.disconnect()
            })
        }, c.prototype.destroy = function () {
            b.prototype.destroy.call(this), this._rotatedSignal.dispose(), this._rotatedSignal = null
        }, Object.defineProperty(c.prototype, "rotatedSignal", {
            get: function () {
                return this._rotatedSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(a.CreatureWithHands);
    a.Crab = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d) {
            a.call(this, b, c, 2, d)
        }
        return __extends(b, a), b.prototype.addFace = function () {
            a.prototype.addFace.call(this), this.face.y -= 3
        }, b
    }(a.Octopus);
    a.Jelly = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d) {
            a.call(this, b, c, d), this.isHappy = !0
        }
        return __extends(b, a), b.prototype.addFace = function () {}, b.prototype.addBody = function () {
            this.body = this.game.add.sprite(0, 0, "manta_ray", "", this), this.body.anchor.set(.5, .45), this.body.animations.add("main", null, 30, !0), this.body.animations.play("main")
        }, b
    }(a.BaseCreature);
    a.ElectricRay = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function () {
        function b() {}
        return b.create = function (c, d, e) {
            var f = e.hands,
                g = e.type.split("_")[0],
                h = b.TYPES[g];
            switch (h) {
            case 0:
                return new a.Octopus(c, d, h, f);
            case 2:
                return new a.Jelly(c, d, f);
            case 1:
                return new a.Crab(c, d, e.rotation);
            case 3:
                return new a.Needlefish(c, d);
            case 4:
                return new a.ElectricRay(c, d, 4);
            default:
                return null
            }
        }, b.TYPES = {
            Octopus: 0,
            Jellyfish: 2,
            Crab: 1,
            Needlefish: 3,
            ElectricRay: 4
        }, b
    }();
    a.CreatureFactory = b
}(game || (game = {}));
var game;
! function (a) {
    ! function (a) {
        a[a.Stone = 0] = "Stone", a[a.Happy = 1] = "Happy", a[a.Star = 2] = "Star"
    }(a.ObjectType || (a.ObjectType = {}));
    a.ObjectType
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d) {
            a.call(this, b, 0, 0, "level_graphics", c), this._type = d, this.anchor.set(.5, .5)
        }
        return __extends(b, a), Object.defineProperty(b.prototype, "type", {
            get: function () {
                return this._type
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.GridObject = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c) {
            a.call(this, b, c, 0)
        }
        return __extends(b, a), b
    }(a.GridObject);
    a.Stone = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c) {
            a.call(this, b, c, 1), this.game.add.tween(this).to({
                angle: 360
            }, 5e3, Phaser.Easing.Linear.None, !0, 0, 1e4)
        }
        return __extends(b, a), b
    }(a.GridObject);
    a.HappyArea = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b) {
            a.call(this, b, "Star0000", 2), this._isTaken = !1, this.freeTexture = "Star0000", this.takenTexture = "Star_Taken0000", this.anchor.set(.48, .5), this.startFreeTween()
        }
        return __extends(b, a), b.prototype.startFreeTween = function () {
            (this.angleTween || this.scaleTween) && (this.angleTween.stop(), this.scaleTween.stop());
            var a = 800;
            this.angle = -15, this.angleTween = this.game.add.tween(this).to({
                angle: 15
            }, a, Phaser.Easing.Cubic.Out, !0, 0, 1e4, !0), this.scaleTween = this.game.add.tween(this.scale).to({
                x: 1.1,
                y: 1.1
            }, .5 * a, Phaser.Easing.Cubic.Out, !0, 0, 1e4, !0)
        }, b.prototype.onTaken = function () {
            this._isTaken === !1 && (this.game.sound.usingWebAudio && this.game.sound.play("star_taken", .25), this._isTaken = !0, this.loadTexture("level_graphics", this.takenTexture), this.scaleTween && this.scaleTween.stop(), this.scale.set(1, 1))
        }, b.prototype.onFree = function () {
            this._isTaken && (this._isTaken = !1, this.loadTexture("level_graphics", this.freeTexture), this.startFreeTween())
        }, Object.defineProperty(b.prototype, "isTaken", {
            get: function () {
                return this._isTaken
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(a.GridObject);
    a.Star = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a) {
            b.call(this, a, a.world, "grid"), this.startDragPosition = new Phaser.Point, this.cells = [], this.creatures = [], this.stars = [], this.stones = [], this.happyAreas = [], this._levelCompleteSignal = new Phaser.Signal, this.bottomLayer = this.game.add.group(this, "cells_rocks"), this.topLayer = this.game.add.group(this, "creatures_objects"), this.initInput()
        }
        return __extends(c, b), c.prototype.initInput = function () {
            this.game.input.onDown.add(this.onDown, this), this.game.input.onUp.add(this.onUp, this)
        }, c.prototype.disableInput = function () {
            this.game.input.onDown.remove(this.onDown, this), this.game.input.onUp.remove(this.onUp, this)
        }, c.prototype.addCell = function (a) {
            this.bottomLayer.add(a), this.cells.push(a)
        }, c.prototype.addCreature = function (a) {
            var b = this.getCellUnderPoint(a.x, a.y),
                c = game.CreatureFactory.create(this.game, this.topLayer, a);
            c.position.set(b.x, b.y), c.cell = b, this.creatures.push(c), 1 === c.type && c.rotatedSignal.add(this.onCrabRotate, this)
        }, c.prototype.onCrabRotate = function () {
            this.updateCreatures(), this.checkLevelComplete(), this.crabRotateSignal && this.crabRotateSignal.dispatch()
        }, c.prototype.addGridObject = function (b) {
            var c, d = b.type,
                e = d + "0000";
            if (d.indexOf("Stone") > -1 ? (c = new a.Stone(this.game, e), this.stones.push(c)) : d.indexOf("Happy") > -1 ? (c = new a.HappyArea(this.game, e), this.happyAreas.push(c)) : d.indexOf("Star") > -1 && (c = new a.Star(this.game), this.stars.push(c)), c) {
                0 === c.type ? this.bottomLayer.add(c) : this.topLayer.addAt(c, 0);
                var f = this.getCellUnderPoint(b.x, b.y);
                f ? (c.cell = f, c.x = f.x, c.y = f.y, 1 === c.type && (f.alpha = .66)) : (c.x = b.x, c.y = b.y)
            }
        }, c.prototype.onDown = function (a) {
            var b = this.getCreatureUnderPoint(a.worldX - this.x, a.worldY - this.y);
            b && (this.game.sound.usingWebAudio && this.game.sound.play("on_down", .5), 1 === b.type ? (this.selectedCrab = b, this.startDragPosition.set(a.worldX, a.worldY)) : this.startDragCreature(b))
        }, c.prototype.getCreatureUnderPoint = function (b, c) {
            for (var d = 0; d < this.creatures.length; d++) {
                var e = this.creatures[d],
                    f = utils.MathUtil.distanceSquared(e.position.x, e.position.y, b, c);
                if (f < a.BaseCreature.BODY_RADIUS_SQUARED) return e
            }
            return null
        }, c.prototype.onUp = function () {
            if (this.selectedCrab && (this.selectedCrab.rotate(), this.selectedCrab = null), this.draggedCreature) {
                this.game.sound.usingWebAudio && this.game.sound.play("on_up", .5);
                var a = this.getCellUnderPoint(this.draggedCreature.position.x, this.draggedCreature.position.y),
                    b = this.getCreatureInCell(a);
                !a || this.getRockInCell(a) ? this.draggedCreature.returnToLastCell() : (b ? this.swapCreatures(this.draggedCreature, b) : (this.game.add.tween(this.draggedCreature.position).to({
                    x: a.x,
                    y: a.y
                }, 150, Phaser.Easing.Cubic.Out, !0), this.draggedCreature.cell = a, this.draggedCreature.onDragComplete()), this.updateCreatures(), this.updateStars(), this.checkLevelComplete()), this.cellHighlight.visible = !1, this.game.add.tween(this.draggedCreature.scale).to({
                    x: 1,
                    y: 1
                }, 150, Phaser.Easing.Cubic.In, !0), this.draggedCreature = null
            }
        }, c.prototype.swapCreatures = function (a, b) {
            var c = a.cell,
                d = b.cell;
            a.cell = null, b.cell = null, this.game.add.tween(a.position).to({
                x: d.x,
                y: d.y
            }, 150, Phaser.Easing.Cubic.Out, !0), a.cell = d, a.onDragComplete(), this.game.add.tween(b.position).to({
                x: c.x,
                y: c.y
            }, 150, Phaser.Easing.Cubic.Out, !0), b.cell = c, b.onDragComplete()
        }, c.prototype.cellIsEmpty = function (a) {
            var b = this.creatures.some(function (b) {
                    return b.cell === a
                }),
                c = this.stones.some(function (b) {
                    return b.cell === a
                });
            return b === !1 && c === !1
        }, c.prototype.updateCreatures = function () {
            var a = this;
            this.creatures.forEach(function (b) {
                b.onHappyArea = null !== a.getHappyAreaInCell(b.cell), b.isRayAround = a.getNeighbourCreatures(b).some(function (a) {
                    return 4 === a.type
                });
                var c = a.getNeighbourCreatures(b);
                if (3 === b.type) {
                    var d = b;
                    d.areCreaturesAround = c.length > 0
                } else b.hasHands && a.connectCreaturesAround(b, c);
                b.updateHappiness()
            })
        }, c.prototype.getRockInCell = function (a) {
            for (var b = 0; b < this.stones.length; b++) {
                var c = this.stones[b];
                if (c.cell === a) return c
            }
            return null
        }, c.prototype.getHappyAreaInCell = function (a) {
            for (var b = 0; b < this.happyAreas.length; b++) {
                var c = this.happyAreas[b];
                if (c.cell === a) return c
            }
            return null
        }, c.prototype.getCreatureInCell = function (a) {
            for (var b = 0; b < this.creatures.length; b++) {
                var c = this.creatures[b];
                if (c.cell === a) return c
            }
            return null
        }, c.prototype.getCellUnderPoint = function (b, c) {
            for (var d = 0; d < this.cells.length; d++) {
                var e = this.cells[d],
                    f = utils.MathUtil.distanceSquared(b, c, e.x, e.y);
                if (f < a.HexCell.RADIUS_SQUARED) return e
            }
            return null
        }, c.prototype.connectCreaturesAround = function (a, b) {
            var c = this;
            0 !== b.length && b.forEach(2 === a.type ? function (b) {
                if (2 === b.type) {
                    var d = b;
                    d.hasFreeHands() && c.connectHands(a, d)
                }
            } : function (b) {
                if (1 === b.type || 0 === b.type) {
                    var d = b;
                    d.hasFreeHands() && c.connectHands(a, d)
                }
            })
        }, c.prototype.getNeighbourCreatures = function (a) {
            for (var b = a.cell.x, c = a.cell.y, d = [], e = 0; e < this.creatures.length; e++) {
                var f = this.creatures[e];
                if (f !== a) {
                    var g = utils.MathUtil.distanceSquared(f.cell.x, f.cell.y, b, c);
                    g < game.BaseCreature.CONTACT_RADIUS_SQUARED && d.push(f)
                }
            }
            return d
        }, c.prototype.connectHands = function (a, b) {
            var c = this.getAngleBetweenCells(a.cell, b.cell),
                d = (c + 180) % 360,
                e = game.HandDirection.getDirectionByAngle(c),
                f = game.HandDirection.getDirectionByAngle(d),
                g = a.getFreeHand(e),
                h = b.getFreeHand(f);
            g && h && (g.connect(h, c), h.connect(g, d))
        }, c.prototype.getAngleBetweenCells = function (a, b) {
            var c = a.x - b.x,
                d = a.y - b.y,
                e = Math.atan2(d, c) * utils.MathUtil.RAD_TO_DEG - 90;
            return e = (e + 720) % 360, e = Phaser.Math.snapTo(e, 10, 0)
        }, c.prototype.checkLevelComplete = function () {
            this.allCreaturesHappy() && this.game.time.events.add(1e3, this.finalCheckLevelComplete, this)
        }, c.prototype.finalCheckLevelComplete = function () {
            if (this.allCreaturesHappy()) {
                if (this.draggedCreature) {
                    var a = this.draggedCreature.cell;
                    this.game.add.tween(this.draggedCreature.position).to({
                        x: a.x,
                        y: a.y
                    }, 150, Phaser.Easing.Cubic.Out, !0), this.draggedCreature.cell = a, this.draggedCreature.onDragComplete(), this.draggedCreature = null
                }
                this.disableInput(), this.onLevelComplete()
            }
        }, c.prototype.allCreaturesHappy = function () {
            return this.creatures.every(function (a) {
                return a.isHappy
            })
        }, c.prototype.onLevelComplete = function () {
            var b = new a.LevelResult;
            b.starsAvailable = this.stars.length, b.starsEarned = this.getStarsEarnedNum(), b.starsAvailable > 3 && (b.starsAvailable = 3), this._levelCompleteSignal.dispatch(b)
        }, c.prototype.getStarsAvailable = function () {
            return this.stars.length
        }, c.prototype.getStarsEarnedNum = function () {
            var a = 0;
            return this.stars.forEach(function (b) {
                b.isTaken && a++
            }), a
        }, c.prototype.init = function () {
            this.bottomLayer.cacheAsBitmap = !0, this.initBounds(), this.addCellHighlight(), this.sortCreatures(), this.updateCreatures(), this.updateStars()
        }, c.prototype.initBounds = function () {
            var a = 1e3,
                b = 0,
                c = 1e3,
                d = 0;
            this.cells.forEach(function (e) {
                e.x < a && (a = e.x), e.x > b && (b = e.x), e.y < c && (c = e.y), e.y > d && (d = e.y)
            }), this.bounds = new Phaser.Rectangle(a, c, b - a, d - c)
        }, c.prototype.addCellHighlight = function () {
            this.cellHighlight = this.game.add.image(0, 0, "level_graphics", "HexCell_Highlight0000", this), this.cellHighlight.anchor.set(.5, .5), this.cellHighlight.visible = !1, this.bringToTop(this.topLayer)
        }, c.prototype.sortCreatures = function () {
            var a = this.creatures.filter(function (a) {
                    return 1 === a.type
                }),
                b = this.creatures.filter(function (a) {
                    return 0 === a.type
                });
            b.sort(function (a, b) {
                return b.getFreeHands().length - a.getFreeHands().length
            });
            var c = this.creatures.filter(function (a) {
                return 2 === a.type
            });
            c.sort(function (a, b) {
                return b.getFreeHands().length - a.getFreeHands().length
            });
            var d = this.creatures.filter(function (a) {
                return 3 === a.type || 4 === a.type
            });
            this.creatures = [].concat(a, b, c, d)
        }, c.prototype.update = function () {
            if (this.selectedCrab) {
                var a = this.game.input.activePointer,
                    b = Phaser.Math.distance(a.x, a.y, this.startDragPosition.x, this.startDragPosition.y);
                b > 20 && (this.startDragCreature(this.selectedCrab), this.selectedCrab = null)
            }
            if (this.draggedCreature) {
                var c = this.game.input.activePointer.worldX - this.x,
                    d = this.game.input.activePointer.worldY - this.y;
                this.draggedCreature.position.set(c, d);
                var e = this.getCellUnderPoint(c, d);
                e ? (this.cellHighlight.visible = !0, this.cellHighlight.x = e.x, this.cellHighlight.y = e.y) : this.cellHighlight.visible = !1
            }
        }, c.prototype.startDragCreature = function (a) {
            this.draggedCreature = a, this.topLayer.bringToTop(a), this.game.add.tween(this.draggedCreature.scale).to({
                x: 1.25,
                y: 1.25
            }, 150, Phaser.Easing.Cubic.Out, !0), this.creatureDragSignal && this.creatureDragSignal.dispatch()
        }, c.prototype.updateStars = function () {
            var a = this;
            this.stars.forEach(function (b) {
                var c = a.getCreatureInCell(b.cell);
                c ? b.onTaken() : b.onFree()
            })
        }, c.prototype.render = function () {
            this.renderCells()
        }, c.prototype.renderCreatures = function () {
            var b = this,
                c = new Phaser.Circle(0, 0, a.BaseCreature.CONTACT_RADIUS);
            this.creatures.forEach(function (d) {
                c.radius = a.BaseCreature.CONTACT_RADIUS, c.x = d.position.x + b.x, c.y = d.position.y + b.y, b.game.debug.geom(c, "red", !1), c.radius = a.BaseCreature.BODY_RADIUS, c.x = d.position.x + b.x, c.y = d.position.y + b.y, b.game.debug.geom(c, "blue", !0)
            })
        }, c.prototype.renderCells = function () {
            var b = this,
                c = new Phaser.Circle(0, 0, 10);
            this.cells.forEach(function (d) {
                c.radius = a.HexCell.RADIUS, c.x = d.x + b.x, c.y = d.y + b.y, b.game.debug.geom(c, "red", !1)
            })
        }, c.prototype.onRestart = function () {
            this.visible = !0, this.initInput()
        }, c.prototype.destroy = function (a, c) {
            "undefined" == typeof a && (a = !0), "undefined" == typeof c && (c = !1), b.prototype.destroy.call(this, a, c), this.bounds = null, this._levelCompleteSignal.dispose(), this._levelCompleteSignal = null, this.stars = null, this.creatures = null, this.happyAreas = null, this.stones = null, this.cells = null, this.selectedCrab = null, this.draggedCreature = null, this.startDragPosition = null
        }, Object.defineProperty(c.prototype, "levelCompleteSignal", {
            get: function () {
                return this._levelCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.Grid = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d, e) {
            a.call(this, b, c, d, "tutor_hand"), this.start = new Phaser.Point(c, d), this.destination = e, this.show(), this.initAnimation(), this.initTweens()
        }
        return __extends(b, a), b.prototype.show = function () {
            this.alpha = 0, this.game.add.tween(this).to({
                alpha: 1
            }, 500, Phaser.Easing.Cubic.Out, !0, 1e3)
        }, b.prototype.initAnimation = function () {
            this.animations.add("main", utils.ArrayUtil.createArrayWithNumbers(5, 20), 30, !1)
        }, b.prototype.initTweens = function () {
            this.repeatEvent = this.game.time.events.repeat(1700, Number.MAX_VALUE, this.startTween, this)
        }, b.prototype.startTween = function () {
            this.x = this.start.x, this.y = this.start.y, this.animations.play("main", 30, !1, !1), this.game.add.tween(this).to({
                x: this.destination.x,
                y: this.destination.y
            }, 800, Phaser.Easing.Cubic.Out, !0, 600)
        }, b.prototype.hideAndDestroy = function () {
            this.game.time.events.remove(this.repeatEvent), this.repeatEvent = null, this.start = null, this.destination = null, this.visible = !1
        }, b
    }(Phaser.Sprite);
    a.MovingTutorHand = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (a) {
        function b(b, c, d) {
            a.call(this, b, c, d, "tutor_hand"), this.initAnimation()
        }
        return __extends(b, a), b.prototype.initAnimation = function () {
            this.animations.add("main", null), this.play("main", 30, !0)
        }, b.prototype.hideAndDestroy = function () {
            this.animations.stop(), this.game.add.tween(this).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, !0).onComplete.addOnce(this.destroy, this)
        }, b
    }(Phaser.Sprite);
    a.TutorHand = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function (b) {
        function c(a, c, d, e, f) {
            b.call(this, a, c), this._closedSignal = new Phaser.Signal, this.addBack(), this.addTitle(d), this.addImage(e), this.addDescription(f), this.addCloseButton()
        }
        return __extends(c, b), c.prototype.addBack = function () {
            var a = this.game.add.image(0, 0, "tutorial", "Tutor_Board0000", this);
            this._width = a.width, this._height = a.height
        }, c.prototype.addTitle = function (a) {
            var b = {
                    font: "50px GrilledCheeseBTNToasted",
                    fill: "#ffffff",
                    align: "center"
                },
                c = new Phaser.Text(this.game, 50, 20, a, b);
            this.add(c), c.x = .5 * (this._width - c.getLocalBounds().width), c.y = 20
        }, c.prototype.addImage = function (a) {
            var b = this.game.add.image(0, 100, "tutorial", a, this);
            b.x = .5 * (this._width - b.width)
        }, c.prototype.addDescription = function (b) {
            var c = {
                    font: "32px GrilledCheeseBTNToasted",
                    fill: "#ffffff",
                    align: "center"
                },
                d = new Phaser.Text(this.game, 50, 20, b, c);
            this.add(d), d.lineSpacing = -5, d.wordWrapWidth = .8 * this._width, d.wordWrap = !0, d.x = 10 + .5 * (this._width - d.wordWrapWidth), d.y = 255, "ru" === a.Main.language && (d.lineSpacing = -10)
        }, c.prototype.addCloseButton = function () {
            var b = new a.SimpleButton(this.game, .5 * this._width, this._height, "tutorial", "Close_Button0000");
            b.callback.addOnce(this.hide, this), this.add(b)
        }, c.prototype.hide = function () {
            var b = this;
            this.game.add.tween(this).to({
                y: a.Config.GAME_HEIGHT + 30
            }, 600, Phaser.Easing.Back.In, !0).onComplete.addOnce(function () {
                b._closedSignal.dispatch(), b.destroy()
            }, this)
        }, c.prototype.getWidth = function () {
            return this._width
        }, c.prototype.getHeight = function () {
            return this._height
        }, c.prototype.destroy = function () {
            this.visible = !1, this._closedSignal.dispose(), this._closedSignal = null, b.prototype.destroy.call(this, !0)
        }, Object.defineProperty(c.prototype, "closedSignal", {
            get: function () {
                return this._closedSignal
            },
            enumerable: !0,
            configurable: !0
        }), c.OCTOPUS = "octopus", c.JELLY = "jellyfish", c.CRAB = "crab", c.NEEDLEFISH = "needlefish", c.MANTA_RAY = "manta_ray", c.HAPPY_AREA = "happy_area", c
    }(Phaser.Group);
    a.TutorBoard = b
}(game || (game = {}));
var game;
! function (a) {
    var b = function () {
        function b() {}
        return b.getBoard = function (a, c, d) {
            var e = b.BOARDS_BY_LEVELS[d];
            return e ? b.createBoard(a, c, e) : null
        }, b.createBoard = function (c, d, e) {
            var f = a.Main.texts[e];
            if (!f) return null;
            var g = b.getImageKeyById(e);
            return new a.TutorBoard(c, d, f.title, g, f.description)
        }, b.getImageKeyById = function (b) {
            switch (b) {
            case a.TutorBoard.OCTOPUS:
                return "Tutor_Octopus0000";
            case a.TutorBoard.CRAB:
                return "Tutor_Crab0000";
            case a.TutorBoard.MANTA_RAY:
                return "Tutor_MantaRay0000";
            case a.TutorBoard.NEEDLEFISH:
                return "Tutor_NeedleFish0000";
            case a.TutorBoard.JELLY:
                return "Tutor_JellyFish0000";
            case a.TutorBoard.HAPPY_AREA:
                return "Tutor_HappyArea0000";
            default:
                return "Tutor_Octopus0000"
            }
        }, b.BOARDS_BY_LEVELS = {
            1: a.TutorBoard.OCTOPUS,
            5: a.TutorBoard.CRAB,
            11: a.TutorBoard.MANTA_RAY,
            19: a.TutorBoard.NEEDLEFISH,
            31: a.TutorBoard.HAPPY_AREA,
            40: a.TutorBoard.JELLY
        }, b
    }();
    a.TutorBoardFactory = b
}(game || (game = {}));
var game;
! function (a) {
    var b;
    ! function (a) {
        a[a.ACTIVE = 0] = "ACTIVE", a[a.PAUSED = 1] = "PAUSED", a[a.RESTART = 2] = "RESTART"
    }(b || (b = {}));
    var c = function (b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), c.prototype.init = function (b) {
            this.debugRenderFlag = !1, this.state = 1, this._settings = new a.LevelSettings(b)
        }, c.prototype.preload = function () {
            if (a.Main.development) {
                var b = this._settings.levelNumber.toString(),
                    c = "assets/levels/Level_" + b + ".json";
                this.load.json("level_" + b, c)
            }
        }, c.prototype.create = function () {
            this.game.state.onShutDownCallback = this.destroy, this.state = 1, this.addLayers(), a.Main.development && this.addFPSMeter(), this.parse(), this.afterParsing(), this.initKeyCallbacks(), this._settings.levelNumber > 1 && this.showAds(), this.state = 0
        }, c.prototype.showAds = function () {
            var b = this;
            a.Main.spilAPI.GameBreak.request(function () {
                b.pauseGame()
            }, function () {
                b.resumeGame()
            })
        }, c.prototype.pauseGame = function () {
            a.Main.wasPaused = !0, a.Main.wasMuted = this.game.sound.mute, this.game.sound.mute = !0, this.game.tweens.pauseAll()
        }, c.prototype.resumeGame = function () {
            a.Main.wasPaused && (a.Main.wasPaused = !1, this.game.sound.mute = a.Main.wasMuted, this.game.tweens.resumeAll())
        }, c.prototype.addLayers = function () {
            this.game.add.image(-33, 0, "level_graphics", "Level_BG20000"), this.addGrid(), this.addGUI()
        }, c.prototype.addGrid = function () {
            this.grid = new a.Grid(this.game), this.grid.levelCompleteSignal.add(this.onLevelComplete, this)
        }, c.prototype.addGUI = function () {
            this.gui = new a.LevelGUI(this.game, this._settings)
        }, c.prototype.addFPSMeter = function () {
            this.fpsMeter = new utils.FPSMeter(this.game, 0, a.Config.GAME_HEIGHT - 22)
        }, c.prototype.parse = function () {
            var b;
            if (a.Main.development) b = this.game.cache.getJSON("level_" + this._settings.levelNumber.toString());
            else {
                var c = "Level_" + this._settings.levelNumber,
                    d = this.game.cache.getJSON("levelConfigs");
                b = d[c]
            }
            a.Main.parser.parse(this, b)
        }, c.prototype.afterParsing = function () {
            this.grid.init(), this.grid.position.set(.5 * (a.Config.GAME_WIDTH - this.grid.bounds.width) - this.grid.bounds.x, .5 * (a.Config.GAME_HEIGHT - this.grid.bounds.height) - this.grid.bounds.y), this.grid.position.x = Math.round(this.grid.position.x), this.grid.position.y = Math.round(this.grid.position.y);
            var b = this.grid.getStarsAvailable();
            this.gui.initCompleteBoard(b), this.initTutorial()
        }, c.prototype.initTutorial = function () {
            this.initTutorHands(), this.initTutorBoards()
        }, c.prototype.initTutorHands = function () {
            1 === this._settings.levelNumber ? this.addMovingTutorHand() : 5 === this._settings.levelNumber && this.addSimpleTutorHand()
        }, c.prototype.addMovingTutorHand = function () {
            var b = this,
                c = new a.MovingTutorHand(this.game, 350, 125, new Phaser.Point(185, 210));
            this.grid.add(c), this.grid.creatureDragSignal = new Phaser.Signal, this.grid.creatureDragSignal.addOnce(function () {
                c.hideAndDestroy(), b.grid.creatureDragSignal.dispose(), b.grid.creatureDragSignal = null
            })
        }, c.prototype.addSimpleTutorHand = function () {
            var b = this,
                c = new a.TutorHand(this.game, 108, 160);
            this.grid.add(c), this.grid.crabRotateSignal = new Phaser.Signal, this.grid.crabRotateSignal.addOnce(function () {
                c.hideAndDestroy(), b.grid.crabRotateSignal.dispose(), b.grid.crabRotateSignal = null
            })
        }, c.prototype.initTutorBoards = function () {
            var b = this,
                c = a.TutorBoardFactory.getBoard(this.game, this.world, this._settings.levelNumber);
            if (c) {
                c.position.set(.5 * (a.Config.GAME_WIDTH - c.getWidth()), -c.getHeight());
                var d = .5 * (a.Config.GAME_HEIGHT - c.getHeight());
                this.game.add.tween(c).to({
                    y: d
                }, 600, Phaser.Easing.Back.Out, !0, 150), this.grid.visible = !1, this.grid.alpha = 0, c.closedSignal.addOnce(function () {
                    b.grid.visible = !0, b.game.add.tween(b.grid).to({
                        alpha: 1
                    }, 200, Phaser.Easing.Linear.None, !0)
                }, this)
            }
        }, c.prototype.initKeyCallbacks = function () {
            var b = this;
            this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.gotoChooseLevelMenu, this), a.Main.development && (this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function () {
                b.fpsMeter.visible = !b.fpsMeter.visible
            }), this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.toggleDebugRender, this), this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.gotoPrevLevel, this), this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.gotoNextLevel, this))
        }, c.prototype.gotoPrevLevel = function () {
            var b = this._settings.levelNumber,
                c = 1 === b ? a.Config.LEVELS_NUM : b - 1;
            this.gotoLevel(c)
        }, c.prototype.gotoNextLevel = function () {
            var b = this._settings.levelNumber,
                c = b >= a.Config.LEVELS_NUM ? 1 : b + 1;
            this.gotoLevel(c)
        }, c.prototype.gotoLevel = function (a) {
            this.game.changeState("Level", a)
        }, c.prototype.restart = function () {
            this.gui.onRestart(), this.grid.onRestart()
        }, c.prototype.toggleDebugRender = function () {
            this.debugRenderFlag = !this.debugRenderFlag
        }, c.prototype.gotoChooseLevelMenu = function () {
            this.game.changeState("LevelsMenu")
        }, c.prototype.onLevelComplete = function (a) {
            this.game.sound.usingWebAudio && this.game.sound.play("onLevelComplete", .66);
            try {
                this.saveLevelResult(a)
            } catch (b) {}
            1 === this._settings.levelNumber ? this.gotoNextLevel() : (this.grid.visible = !1, this.gui.onLevelComplete(a))
        }, c.prototype.saveLevelResult = function (b) {
            b.levelNumber = this._settings.levelNumber;
            var c = this._settings.levelNumber.toString();
            a.Main.storage.saveValue(c, b)
        }, c.prototype.render = function () {
            this.debugRenderFlag && this.grid.render()
        }, c.prototype.destroy = function () {
            this.game.state.onShutDownCallback = null, this.removeKeyCallbacks(), this._settings = null
        }, c.prototype.removeKeyCallbacks = function () {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.R), this.game.input.keyboard.removeKey(Phaser.Keyboard.P), this.game.input.keyboard.removeKey(Phaser.Keyboard.ESC), this.game.input.keyboard.removeKey(Phaser.Keyboard.D)
        }, Object.defineProperty(c.prototype, "settings", {
            get: function () {
                return this._settings
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.State);
    a.Level = c
}(game || (game = {}));
var game;
! function (a) {
    var b = function () {
        function a(a) {
            this.game = a, this.initCallbacks()
        }
        return a.prototype.initCallbacks = function () {
            this.callbacks = {}, this.callbacks.HexCell = this.addGridCell, this.callbacks.Octopus = this.addCreature, this.callbacks.Jellyfish = this.addCreature, this.callbacks.Crab = this.addCreature, this.callbacks.Needlefish = this.addCreature, this.callbacks.ElectricRay = this.addCreature, this.callbacks.Stone = this.addGridObject, this.callbacks.HappyArea = this.addGridObject, this.callbacks.Star = this.addGridObject
        }, a.prototype.parse = function (a, b) {
            this.newLevel = a, this.levelConfig = b, this.parseObjects(), this.cleanup()
        }, a.prototype.cleanup = function () {
            this.newLevel = null, this.levelConfig = null
        }, a.prototype.parseObjects = function () {
            var a = this;
            this.levelConfig.forEach(function (b) {
                a.addGameObject(b)
            })
        }, a.prototype.addGameObject = function (a) {
            {
                var b = a.type,
                    c = this.getCallback(b);
                c ? c.call(this, a) : this.addImage(a)
            }
        }, a.prototype.getCallback = function (a) {
            for (var b in this.callbacks)
                if (a.indexOf(b) > -1) return this.callbacks[b];
            return null
        }, a.prototype.addCreature = function (a) {
            this.newLevel.grid.addCreature(a)
        }, a.prototype.addGridCell = function (a) {
            var b = Math.round(a.x),
                c = Math.round(a.y),
                d = new game.HexCell(this.game, b, c);
            this.newLevel.grid.addCell(d)
        }, a.prototype.addGridObject = function (a) {
            this.newLevel.grid.addGridObject(a)
        }, a.prototype.addImage = function () {}, a
    }();
    a.LevelParser = b
}(game || (game = {}));
var utils;
! function (a) {
    var b = function () {
        function a() {
            this._enabled = !0, this.init()
        }
        return a.prototype.init = function () {
            try {
                this.localStorage = window.localStorage, this.localStorage.setItem("testKey", "testData"), this.localStorage.removeItem("testKey")
            } catch (a) {
                this._enabled = !1
            }
        }, a.prototype.saveValue = function (a, b) {
            if (this._enabled) {
                var c = JSON.stringify(b);
                this.localStorage.setItem(a, c)
            }
        }, a.prototype.getValue = function (a) {
            return this.localStorage.getItem(a)
        }, a.prototype.remove = function (a) {
            this._enabled && this.localStorage.removeItem(a)
        }, a.prototype.clear = function () {
            this._enabled && this.localStorage.clear()
        }, Object.defineProperty(a.prototype, "enabled", {
            get: function () {
                return this._enabled
            },
            enumerable: !0,
            configurable: !0
        }), a
    }();
    a.LocalStorageWrapper = b
}(utils || (utils = {})), window.addEventListener("load", onLoad, !1);
var game;
! function (a) {
    var b = function (b) {
        function c() {
            b.call(this, a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT, Phaser.CANVAS, "gameContainer"), c.spilAPI = window.__SpilAPI, c.parser = new a.LevelParser(this), c.storage = new utils.LocalStorageWrapper, this.setupLanguage(), this.state.add("Boot", a.Boot, !1), this.state.add("SplashScreen", a.SplashScreen, !1), this.state.add("Preloader", a.Preloader, !1), this.state.add("MainMenu", a.MainMenu, !1), this.state.add("LevelsMenu", a.LevelsMenu, !1), this.state.add("Level", a.Level, !1), this.state.start("Boot")
        }
        return __extends(c, b), c.prototype.setupLanguage = function () {
            c.language = "en"
        }, c.prototype.changeState = function (a, b) {
            this.stateTransitionPlugin || (this.stateTransitionPlugin = this.plugins.plugins[0]), this.stateTransitionPlugin.changeState(a, b)
        }, c.spilData = {
            id: "576742227280292114"
        }, c.wasPaused = !1, c.wasMuted = !1, c.development = !1, c.language = "en", c
    }(Phaser.Game);
    a.Main = b
}(game || (game = {}));
