'use strict';
var Sea_on = require('../prefabs/sea_on');
var Sea_face = require('../prefabs/sea_face');
var Sea_under = require('../prefabs/sea_under');

var Pole = require('../prefabs/pole');

var Ships = require('../prefabs/ships');
var Ship1 = require('../prefabs/ship1');
var Ship2 = require('../prefabs/ship2');


var Drill = require('../prefabs/drill');

var Bullets = require('../prefabs/bullets');

var Ducks = require('../prefabs/ducks');

var Scoreboard = require('../prefabs/scoreboard');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.world.setBounds(0, 0, 2000, 600);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    // create and add a new Sea_on object
    this.sea_on = new Sea_on(this.game, 0, 0, this.game.world.width, 93);
    this.game.add.existing(this.sea_on);


    // create and add a new Sea_face object
    this.sea_face = new Sea_face(this.game, 0, 90, this.game.world.width, this.game.world.height - 73);
    this.game.add.existing(this.sea_face);

    // create and add a new Sea_under object
    this.sea_under = new Sea_under(this.game, 0, this.game.world.height - 73, this.game.world.width, 73);
    this.game.add.existing(this.sea_under);

    // add the pole
    // Create a new pole object
    this.pole = new Pole(this.game, 400, this.game.world.height - 45);
    // and add it to the game
    this.game.add.existing(this.pole);


    //  The enemies bullet group
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 100; i++) {
      this.rockets = new Bullets(this.game, -100, -100);
      this.enemyBullets.add(this.rockets);
    }

    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);


    //  Explosion pool
    this.explosions = this.game.add.group();

    for (var i = 0; i < 10; i++) {
      this.explosionAnimation = this.explosions.create(0, 0, 'kaboom', [0], false);
      this.explosionAnimation.anchor.setTo(0.5, 0.5);
      this.explosionAnimation.animations.add('kaboom');
    }


    // add the drill
    // Create a new drill object
    //    this.drill = new Drill(this.game, this.game.world.randomX, this.game.world.randomY);
    this.drill = new Drill(this.game, this.game.world.width - 100, this.game.world.height - 100);
    // and add it to the game
    this.game.add.existing(this.drill);


    // add the ducks
    // Create a new ducks object
    this.ducks = new Ducks(this.game, 100, 100);
    // and add it to the game
    this.game.add.existing(this.ducks);
    this.game.input.onDown.add(this.ducks.move, this.ducks);

    // add the ships
    this.shipsAlive = 3;
    this.shipGroup = this.game.add.group();

    for (var i = 0; i < this.shipsAlive; i++) {
      this.ships = new Ships(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.shipGroup.add(this.ships);
    }

    // add the ship1
    this.ship1Alive = 1;
    this.ship1Group = this.game.add.group();

    for (var i = 0; i < this.ship1Alive; i++) {
      this.ship1 = new Ship1(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship1Group.add(this.ship1);
    }

    // add the ship2
    this.ship2Alive = 2;
    this.ship2Group = this.game.add.group();

    for (var i = 0; i < this.ship2Alive; i++) {
      this.ship2 = new Ship2(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship2Group.add(this.ship2);
    }

    // add the score
    this.score = 30;
    this.scoreText = this.game.add.bitmapText(100, 10, 'flappyfont', this.score.toString(), 44);
    this.scoreText.fixedToCamera = true;
    this.scoreText.cameraOffset.x = 100;
    this.scoreText.cameraOffset.y = 10;

    this.game.camera.follow(this.ducks);
    this.game.camera.focusOnXY(0, 0);

  },

  update: function() {

    this.game.physics.arcade.collide(this.ducks, this.shipGroup);
    this.game.physics.arcade.collide(this.ducks, this.ship1Group);
    this.game.physics.arcade.collide(this.ducks, this.ship2Group);
    this.game.physics.arcade.collide(this.ducks, this.drill);

    this.game.physics.arcade.collide(this.shipGroup, this.drill);
    this.game.physics.arcade.collide(this.ship1Group, this.drill);
    this.game.physics.arcade.collide(this.ship2Group, this.drill);

    this.game.physics.arcade.collide(this.shipGroup, this.ship1Group);
    this.game.physics.arcade.collide(this.shipGroup, this.ship2Group);

    this.game.physics.arcade.collide(this.ship1Group, this.ship2Group);


    this.game.physics.arcade.overlap(this.enemyBullets, this.ducks, this.bulletHitDucks, null, this);

    this.game.physics.arcade.overlap(this.pole, this.shipGroup, this.poleHitShips, null, this);
    this.game.physics.arcade.overlap(this.pole, this.ship1Group, this.poleHitShips, null, this);
    this.game.physics.arcade.overlap(this.pole, this.ship2Group, this.poleHitShips, null, this);

    this.game.physics.arcade.overlap(this.pole, this.drill, this.poleHitDrill, null, this);
    this.game.physics.arcade.overlap(this.pole, this.ducks, this.poleHitDucks, null, this);


    if (this.score > 90) {

      // you win

    }


  },


  bulletHitDucks: function(ducks, enemyBullets) {

    this.hasScore(-10);

    enemyBullets.kill();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(ducks.x + 5, ducks.y + 5);
    this.explosionAnimation.play('kaboom', 30, false, true);


    // the ducks is killed
    this.theX = ducks.x;

    this.destroyed = ducks.damage();
    if (this.destroyed) {

      this.scoreboard = new Scoreboard(this.game, this.theX - 100, 100);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score, false);

    }

  },

  poleHitShips: function(pole, shipGroup) {

    this.hasScore(10);

    shipGroup.destroy();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(shipGroup.x + 5, shipGroup.y + 5);
    this.explosionAnimation.play('kaboom', 30, false, true);

  },

  poleHitDrill: function(pole, drill) {

    this.hasScore(100);

    drill.destroy();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(drill.x + 5, drill.y + 5);
    this.explosionAnimation.play('kaboom', 30, false, true);

    this.theX = this.ducks.x;
    this.ducks.kill();

    this.scoreboard = new Scoreboard(this.game);
    this.game.add.existing(this.scoreboard);
    this.scoreboard.show(this.score, true);

  },

  poleHitDucks: function(pole, ducks) {

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(ducks.x + 5, ducks.y + 5);
    this.explosionAnimation.play('kaboom', 30, false, true);

    // the ducks is killed
    this.theX = ducks.x;

    ducks.destroy();

    this.scoreboard = new Scoreboard(this.game);
    this.game.add.existing(this.scoreboard);
    this.scoreboard.show(this.score, false);


  },

  hasScore: function(addScore) {
    this.score = this.score + addScore;
    this.scoreText.setText(this.score.toString());
    //    this.scoreSound.play();

  }


};

module.exports = Play;
