(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(640, 832, Phaser.AUTO, 'init');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){
'use strict';

function Boot() {
}

Boot.prototype = {
	preload : function() {
		this.load.image('preloader', 'assets/preloader.gif');
	},
	create : function() {

		this.setupStage();
		this.detectWeakDevice();
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');
	},
	setupStage : function() {
		var b = this.game.scale;
		b.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		b.minWidth = .25 * this.game.world.width;
		b.minHeight = .25 * this.game.world.height;
		b.aspectRatio = this.game.world.width / this.game.world.width;
		b.pageAlignHorizontally = !0;
		b.pageAlignVertically = !0;
		this.game.device.desktop || b.forceOrientation(!1, !0);
		b.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this);
		b.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this);
		b.setScreenSize(!0);
		this.stage.disableVisibilityChange = !0;
		this.stage.backgroundColor = 11193204;
	},
	detectWeakDevice : function() {
		var b = !1;
		if (this.game.device.desktop === !1) {
			var c = detect.parse(window.navigator.userAgent);
			this.game.device.iOS
					&& (c.os.major < 7 && (b = !0), c.browser.family
							.indexOf("Chrome") > -1
							&& (b = !0)), this.game.device.android
					&& (c.browser.family.indexOf("Android") > -1 && (b = !0), c.browser.family
							.indexOf("Chrome Mobile") > -1
							&& c.browser.major <= 18 && (b = !0)), this.game.device.windowsPhone
					&& c.browser.family.indexOf("IE") > -1
					&& (b = c.browser.major < 10);
		}
	},
	onEnterIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px";
	},
	onLeaveIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px", this.game.device.android
				&& !this.game.device.chrome
				&& this.game.scale.setScreenSize(!0), this.game.time.events
				.repeat(500, 3, this.game.scale.setScreenSize, this);
	}

};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
      this.sprite.inputEnabled = true;
      
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      this.sprite.body.bounce.setTo(1,1);
      this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

      this.sprite.events.onInputDown.add(this.clickListener, this);
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;
},{}],6:[function(require,module,exports){
'use strict';
function Preload() {
}

Preload.prototype = {
	preload : function() {
		// load everything here
		this.initPreloadBar();
		this.addLoadingText();
		this.loadAssets();
	},
	create : function() {
		this.game.state.start("menu", !0, !1, !0);
	},
	update : function() {

	},
	initPreloadBar : function() {
		this.asset = this.add.sprite(0, 0, 'preloader');
		// Center the preload bar
		this.asset.x = this.game.world.centerX - this.asset.width / 2;
		this.asset.y = this.game.world.centerY - this.asset.height / 2;
		this.load.setPreloadSprite(this.asset);
	},
	addLoadingText : function() {
		var b = {
			font : "45px GrilledCheeseBTNToasted",
			fill : "#FFFFFF",
			align : "center"
		};
		this.loadingText = this.game.add.text(0, 0, "0%", b), this.loadingText.anchor
				.set(.5, .5), this.loadingText.position.set(
				this.game.world.width / 2, this.game.world.height / 2 + 180), this.loadingText
				.setShadow(2, 2, "#666666", 2), this.loadingText.update();
	},
	loadAssets : function() {

		// FONTS
		this.load.bitmapFont("timer", "assets/fonts/timer.png",
				"assets/fonts/timer.fnt", null, 1);
		this.load.bitmapFont("level_label", "assets/fonts/level_label.png",
				"assets/fonts/level_label.fnt", null, 1);
		this.load.bitmapFont("fruit_labels", "assets/fonts/fruit_labels.png",
				"assets/fonts/fruit_labels.fnt", null, 3);

		// MENU
		this.load.atlasJSONHash("main_menu", "assets/graphics/main_menu.png",
				"assets/graphics/main_menu.json");
				
				
	},
	loadUpdate : function() {
		this.loadingText.setText(this.load.progress.toString() + "%");
	}

};

module.exports = Preload;

},{}]},{},[1])