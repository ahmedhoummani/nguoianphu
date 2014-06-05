(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'flapp1');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],2:[function(require,module,exports){
'use strict';

var Duck = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'duck', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);

};

Duck.prototype = Object.create(Phaser.Sprite.prototype);
Duck.prototype.constructor = Duck;

Duck.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Duck;

},{}],3:[function(require,module,exports){
'use strict';

var Sea_under = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_under');

  // initialize your prefab here

  // enable physics on the ground sprite
  // this is needed for collision detection
  this.game.physics.arcade.enableBody(this);

  // we don't want the ground's body
  // to be affected by gravity or external forces
  this.body.allowGravity = false;
  this.body.immovable = true;

};

Sea_under.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_under.prototype.constructor = Sea_under;

Sea_under.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Sea_under;

},{}],4:[function(require,module,exports){
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
      this.scale.minWidth = 480;
      this.scale.minHeight = 260;
      this.scale.maxWidth = 800;
      this.scale.maxHeight = 600;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.setScreenSize(true);
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 480;
      this.scale.minHeight = 260;
      this.scale.maxWidth = 800;
      this.scale.maxHeight = 600;
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

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){
  'use strict';

  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      // create a group to put the title assets in
      // so they can be manipulated as a whole
      //      this.titleGroup = this.game.add.group();

      // add the sky sprite
      this.sky_bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height - 259, 'sky_bg');

      // add the background sprite

      // Axis Y : from bottom (this.game.world.height) to top = sea_bottom height + sea_on heith
      this.sea_on = this.game.add.tileSprite(0, this.game.world.height - 166 - 93, this.game.world.width, 259, 'sea_on');
      this.sea_on.autoScroll(-30, 0);
      //      this.titleGroup.add(this.sea_on);

      // Axis Y : from bottom to top = sea3 height
      this.sea_bottom = this.game.add.tileSprite(0, this.game.world.height - 166, this.game.world.width, 166, 'sea_bottom');
      //      this.titleGroup.add(this.sea_bottom);


      // add the duck
      this.duck = this.game.add.sprite(100, this.game.world.height - 166 - 88, 'duck');
      //      this.titleGroup.add(this.duck);

      // add the ship
      this.ship = this.game.add.sprite(this.game.world.height - 100, this.game.world.height - 166 - 70, 'ship');
      //      this.titleGroup.add(this.ship);

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5, 0.5);
      this.startButton.inputEnabled = true;
      this.startButton.input.useHandCursor = true;

      //      this.titleGroup.add(this.startButton);


      /*this.titleGroup.x = this.game.world.width / 2;
      this.titleGroup.y = this.game.world.height / 2;

      this.game.add.tween(this.titleGroup).to({
        y: 115
      }, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);*/

    },

    update: function() {},

    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');

    }

  };

  module.exports = Menu;

},{}],7:[function(require,module,exports){
'use strict';
var Duck = require('../prefabs/duck');
var Sea_under = require('../prefabs/sea_under');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 500;


    // add the duck
    // Create a new duck object
    this.duck = new Duck(this.game, 100, this.game.height / 2);
    // and add it to the game
    this.game.add.existing(this.duck);

    // create and add a new Sea_under object
    this.sea_under = new Sea_under(this.game, 0, this.game.world.height - 73, this.game.world.width, 73);
    this.game.add.existing(this.sea_under);

  },

  update: function() {


    this.game.physics.arcade.collide(this.duck, this.sea_under);

  }

};

module.exports = Play;

},{"../prefabs/duck":2,"../prefabs/sea_under":3}],8:[function(require,module,exports){
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

    this.load.image('sky_bg', 'assets/sky/sky_bg.png');

    this.load.image('sea_on', 'assets/sea/sea_on.png');
    this.load.image('sea_face', 'assets/sea/sea_face.png');
    this.load.image('sea_bottom', 'assets/sea/sea_bottom.png');
    this.load.image('sea_under', 'assets/sea/sea_under.png');

    this.load.image('ship', 'assets/ship/china_200l.png');

    this.load.image('duck', 'assets/duck/duck.png');

    this.load.image('startButton', 'assets/menu/start-button.png');


  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if ( !! this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])