(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(320, 480, Phaser.AUTO, 'duck981');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/menu":3,"./states/play":4,"./states/preload":5}],2:[function(require,module,exports){

'use strict';

function Boot() {}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;

    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 320;
      this.scale.minHeight = 480;
      this.scale.maxWidth = 640;
      this.scale.maxHeight = 960;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.setScreenSize(true);
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 320;
      this.scale.minHeight = 480;
      this.scale.maxWidth = 640;
      this.scale.maxHeight = 960;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.forceOrientation(true, false);
      //      this.scale.hasResized.add(this.gameResized, this);
      //      this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
      //      this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
      this.scale.setScreenSize(true);
    }

    this.game.state.start('preload');

  },

  gameResized: function(width, height) {

    //  This could be handy if you need to do any extra processing if the game resizes.
    //  A resize could happen if for example swapping orientation on a device.

  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],4:[function(require,module,exports){

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
},{}],5:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image('sea_on', 'assets/sea/sea_on.png');
    this.load.image('sea_face', 'assets/sea/sea_face.png');
    this.load.image('sea_under', 'assets/sea/sea_under.png');

    this.load.image('scoreboard', 'assets/score/scoreboard.png');
    this.load.spritesheet('medals', 'assets/score/medals.png', 44, 46, 2);
    this.load.image('particle', 'assets/score/particle.png');

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

    this.load.spritesheet('pole', 'assets/pole/pole.png', 100, 73, 2);

    this.load.spritesheet('ships', 'assets/ship/ships.png', 200, 61, 2);
    this.load.spritesheet('ship1', 'assets/ship/warship1.png', 200, 68, 2);
    this.load.spritesheet('ship2', 'assets/ship/warship2.png', 200, 68, 2);

    this.load.spritesheet('drill', 'assets/drill/rigs.png', 125, 198, 2);

    this.load.spritesheet('ducks', 'assets/duck/ducks.png', 125, 96, 2);

    this.load.image('health', 'assets/health/heart.png');
      
    this.load.image('startButton', 'assets/menu/start-button.png');

    this.load.spritesheet('rockets', 'assets/bullets/rockets.png', 80, 25, 3);

    this.load.spritesheet('kaboom', 'assets/bullets/explosion.png', 64, 64, 23);
	
    this.load.spritesheet('mermaid', 'assets/mermaid/mermaid.png', 56, 48);

    // this.load.audio('boom', 'assets/audio/boom.ogg');
    // this.load.audio('shot', 'assets/audio/shot.ogg');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])