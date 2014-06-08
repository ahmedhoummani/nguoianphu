(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'duck981');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":9,"./states/gameover":10,"./states/menu":11,"./states/play":12,"./states/preload":13}],2:[function(require,module,exports){
'use strict';

var Drill = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'drill', frame);

  // initialize your prefab here


  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;

  this.body.allowRotation = false;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 50) + 50, 100, this.body.velocity);
  this.game.add.existing(this);

  this.alive = false;


};

Drill.prototype = Object.create(Phaser.Sprite.prototype);
Drill.prototype.constructor = Drill;

Drill.prototype.update = function() {

  // write your prefab's specific update code here

  // Drill don't want to be kill

  if (this.y > (this.game.world.height - 300)) {

    this.body.velocity.y = - Math.floor(Math.random() * 10) - 50;

    if (this.body.velocity.x > 0) {
      this.body.velocity.x = this.body.velocity.x + Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x = this.body.velocity.x - Math.floor(Math.random() * 50);
    }

  }

  this.animations.play('left');


};

module.exports = Drill;

},{}],3:[function(require,module,exports){
'use strict';

var Ducks = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ducks', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.alive = false;


};

Ducks.prototype = Object.create(Phaser.Sprite.prototype);
Ducks.prototype.constructor = Ducks;

Ducks.prototype.update = function() {

  // write your prefab's specific update code here

  // ducks faces to pointer

  if (this.x < this.game.input.worldX) {

    this.animations.play('right');

  } else if (this.x > this.game.input.worldX) {

    this.animations.play('left');

  }

  // ducks face up
  if (this.angle != 0) {
    this.angle = 0;
  }


};


Ducks.prototype.move = function() {

  if (!this.alive) {

    // ducks move to the pointer
    this.game.physics.arcade.moveToPointer(this, 300, this.game.input.activePointer, 0);

    // ducks face down

    this.animation = this.game.add.tween(this);

    if (this.x < this.game.input.worldX) {

      this.animation.to({
        angle: 20
      }, 150);

    }
    if (this.x > this.game.input.worldX) {

      this.animation.to({
        angle: -20
      }, 150);

    }

    this.animation.start();

  }


};

module.exports = Ducks;

},{}],4:[function(require,module,exports){
'use strict';

var Pole = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pole', frame);

  // initialize your prefab here
  this.animations.add('tide');
  this.animations.play('tide', 2, true);
    

};

Pole.prototype = Object.create(Phaser.Sprite.prototype);
Pole.prototype.constructor = Pole;

Pole.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Pole;

},{}],5:[function(require,module,exports){
'use strict';

var Sea_face = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_face');

  // initialize your prefab here
  this.autoScroll(-20, 20);
  this.fixedToCamera = true;

};

Sea_face.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_face.prototype.constructor = Sea_face;

Sea_face.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_face;

},{}],6:[function(require,module,exports){
'use strict';

var Sea_on = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_on');

  // initialize your prefab here
  this.autoScroll(-35, 0);
  this.fixedToCamera = true;

};

Sea_on.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_on.prototype.constructor = Sea_on;

Sea_on.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_on;

},{}],7:[function(require,module,exports){
'use strict';

var Sea_under = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_under');

  // initialize your prefab here
  this.autoScroll(30, 0);
  this.fixedToCamera = true;

};

Sea_under.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_under.prototype.constructor = Sea_under;

Sea_under.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_under;

},{}],8:[function(require,module,exports){
'use strict';

var Ships = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ships', frame);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;

  this.body.allowRotation = false;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 200, this.body.velocity);
  this.game.add.existing(this);

  this.alive = false;

};

Ships.prototype = Object.create(Phaser.Sprite.prototype);
Ships.prototype.constructor = Ships;

Ships.prototype.update = function() {

  // write your prefab's specific update code here

  // ships cannot over sea_on

  if (this.y < 60) {

    this.body.velocity.y = Math.floor(Math.random() * 10) + 5;

    if (this.body.velocity.x > 0) {
      this.body.velocity.x = this.body.velocity.x + Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x = this.body.velocity.x - Math.floor(Math.random() * 50);
    }

  }

  // ships don't want to be kill

  if (this.y > (this.game.world.height - 100)) {

    this.body.velocity.y = -Math.floor(Math.random() * 10) - 5;

    if (this.body.velocity.x > 0) {
      this.body.velocity.x = this.body.velocity.x + Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x = this.body.velocity.x - Math.floor(Math.random() * 50);
    }

  }

  // ships left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }

};

module.exports = Ships;

},{}],9:[function(require,module,exports){
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
      this.scale.minHeight = 240;
      this.scale.maxWidth = 1024;
      this.scale.maxHeight = 600;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.setScreenSize(true);
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 480;
      this.scale.minHeight = 240;
      this.scale.maxWidth = 1024;
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

},{}],10:[function(require,module,exports){

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

},{}],11:[function(require,module,exports){
  'use strict';

  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      // add the sky sprite
      this.sky = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height - 259, 'sky');

      // add the background sprite

      // Axis Y : from bottom (this.game.world.height) to top = sea_bottom height + sea_on heith
      this.sea_on = this.game.add.tileSprite(0, this.game.world.height - 166 - 93, this.game.world.width, 259, 'sea_on');
      this.sea_on.autoScroll(-20, 0);

      // Axis Y : from bottom to top = sea3 height
      this.sea_bottom = this.game.add.tileSprite(0, this.game.world.height - 166, this.game.world.width, 166, 'sea_bottom');
      this.sea_bottom.autoScroll(20, 0)


      // add the duck
      this.duck = this.game.add.sprite(this.game.world.width / 2 - 200, this.game.world.height - 166 - 88, 'duck');

      // add the drill
      this.drill = this.game.add.sprite(this.game.width / 2 + 150, this.game.height - 235, 'drill');

      // add the ship
      this.ship = this.game.add.sprite(this.game.width / 2 , this.game.height - 166 - 70, 'ship');

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5, 0.5);
      this.startButton.inputEnabled = true;
      this.startButton.input.useHandCursor = true;


      this.pole = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 73, 'pole');
      this.pole.animations.add('tide');
      this.pole.animations.play('tide', 2, true);


    },

    update: function() {},

    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');

    }

  };

  module.exports = Menu;

},{}],12:[function(require,module,exports){
'use strict';
var Sea_on = require('../prefabs/sea_on');
var Sea_face = require('../prefabs/sea_face');
var Sea_under = require('../prefabs/sea_under');

var Pole = require('../prefabs/pole');

var Ships = require('../prefabs/ships');
var Drill = require('../prefabs/drill');

var Ducks = require('../prefabs/ducks');

function Play() {}

Play.prototype = {

  create: function() {


    this.game.world.setBounds(0, 0, 2000, 600);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //    this.game.physics.arcade.gravity.y = 500;


    // create and add a new Sea_on object
    this.sea_on = new Sea_on(this.game, 0, 0, this.game.world.width, 93);
    this.game.add.existing(this.sea_on);


    // create and add a new Sea_face object
    this.sea_face = new Sea_face(this.game, 0, 93, this.game.world.width, this.game.world.height - 73);
    this.game.add.existing(this.sea_face);

    // create and add a new Sea_under object
    this.sea_under = new Sea_under(this.game, 0, this.game.world.height - 73, this.game.world.width, 73);
    this.game.add.existing(this.sea_under);

    // add the pole
    // Create a new pole object
    this.pole = new Pole(this.game, 400, this.game.world.height - 73);
    // and add it to the game
    this.game.add.existing(this.pole);

    // add the drill
    // Create a new drill object
    this.drill = new Drill(this.game, this.game.world.randomX, this.game.world.randomY);
    // and add it to the game
    this.game.add.existing(this.drill);


    // add the ships
    this.shipsAlive = 5;
    this.shipGroup = this.game.add.group();

    for (var i = 0; i < this.shipsAlive; i++) {
      this.ships = new Ships(this.game, this.game.world.randomX, this.game.world.randomY);
      this.shipGroup.add(this.ships);
    }


    // add the ducks
    // Create a new ducks object
    this.ducks = new Ducks(this.game, 100, 100);
    // and add it to the game
    this.game.add.existing(this.ducks);
    this.game.input.onDown.add(this.ducks.move, this.ducks);


    this.game.camera.follow(this.ducks);
    this.game.camera.focusOnXY(0, 0);

  },

  update: function() {

    this.game.physics.arcade.collide(this.ducks, this.shipGroup);
    this.game.physics.arcade.collide(this.ducks, this.drill);
    this.game.physics.arcade.collide(this.shipGroup, this.drill);


  }



};

module.exports = Play;

},{"../prefabs/drill":2,"../prefabs/ducks":3,"../prefabs/pole":4,"../prefabs/sea_face":5,"../prefabs/sea_on":6,"../prefabs/sea_under":7,"../prefabs/ships":8}],13:[function(require,module,exports){
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

    this.load.image('sky', 'assets/sky/sky_bg.png');

    this.load.image('sea_on', 'assets/sea/sea_on.png');
    this.load.image('sea_face', 'assets/sea/sea_face.png');
    this.load.image('sea_bottom', 'assets/sea/sea_bottom.png');
    this.load.image('sea_under', 'assets/sea/sea_under.png');

    this.load.spritesheet('pole', 'assets/pole/pole.png', 100, 73, 2);

    this.load.image('ship', 'assets/ship/china_200l.png');
    this.load.spritesheet('ships', 'assets/ship/ships.png', 200, 61, 2);
      
    this.load.spritesheet('drill', 'assets/drill/drill.png', 200, 234, 2);

    this.load.image('duck', 'assets/duck/duck.png');
    this.load.spritesheet('ducks', 'assets/duck/ducks.png', 125, 96, 2);

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