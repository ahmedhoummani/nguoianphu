(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'shmup');

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
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
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

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');


    this.enemy = this.game.add.sprite(this.game.world.centerX, 138, 'greenEnemy');
    this.enemy.animations.add('fly', [0, 1, 2], 20, true);
    this.enemy.play('fly');
    this.enemy.anchor.setTo(0.5, 0.5);
    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);


    this.player = this.add.sprite(400, 550, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);


    this.enemy.angle = -20;
    this.game.add.tween(this.enemy).to({
      angle: 20
    }, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.bullet = this.add.sprite(this.enemy.x, this.enemy.y, 'bullet');
    this.bullet.anchor.setTo(0.5, 0.5);
    this.physics.enable(this.bullet, Phaser.Physics.ARCADE);
    this.bullet.body.velocity.y = +50;

    var style = {
      font: '65px Arial',
      fill: '#ffffff',
      align: 'center'
    };
    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play', {
      font: '16px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    this.instructionsText.anchor.setTo(0.5, 0.5);



  },
  update: function() {

    this.sea.tilePosition.y += 0.2;

    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }

  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){
'use strict';

function Play() {}
Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');

    this.enemy = this.game.add.sprite(this.game.world.centerX, 138, 'greenEnemy');
    this.enemy.animations.add('fly', [0, 1, 2], 20, true);
    this.enemy.play('fly');
    this.enemy.anchor.setTo(0.5, 0.5);
    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);


    this.player = this.add.sprite(400, 550, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 300;
    this.player.body.collideWorldBounds = true; // have to put after enable the physic
    this.player.body.bounce.setTo(0.3, 0.3);


    //    this.bullet = this.add.sprite(this.player.x, this.player.y, 'bullet');
    //    this.bullet.anchor.setTo(0.5, 0.5);
    //    this.physics.enable(this.bullet, Phaser.Physics.ARCADE);
    //    this.bullet.body.velocity.y = -50;

    this.bullets = [];
    this.nextShotAt = 0;
    this.shotDelay = 100;



  },
  update: function() {

    this.sea.tilePosition.y += 0.2;

    if (this.input.activePointer.isDown &&
      this.physics.arcade.distanceToPointer(this.player) > 15) {
      this.physics.arcade.moveToPointer(this.player, this.player.speed);
      this.fire();

    }


    //    this.physics.arcade.overlap(
    //      this.bullet, this.enemy, this.enemyHit, null, this
    //    );
    for (var i = 0; i < this.bullets.length; i++) {
      this.physics.arcade.overlap(
        this.bullets[i], this.enemy, this.enemyHit, null, this
      );
    }


  },

  fire: function() {

    if (this.nextShotAt > this.time.now) {
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;

    var bullet = this.add.sprite(this.player.x, this.player.y - 20, 'bullet');
    bullet.anchor.setTo(0.5, 0.5);
    this.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.body.velocity.y = -500;
    this.bullets.push(bullet);
  },


  enemyHit: function(bullet, enemy) {
    bullet.kill();
    enemy.kill();

    var explosion = this.add.sprite(enemy.x, enemy.y, 'explosion');
    explosion.anchor.setTo(0.5, 0.5);
    explosion.animations.add('boom');
    explosion.play('boom', 15, false, true);


  }

};

module.exports = Play;

},{}],6:[function(require,module,exports){
'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);


    this.load.image('sea', 'assets/sea.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
    this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
    this.load.spritesheet('player', 'assets/player.png', 64, 64);



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