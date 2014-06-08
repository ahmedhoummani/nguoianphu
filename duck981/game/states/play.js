'use strict';
var Sea_on = require('../prefabs/sea_on');
var Sea_face = require('../prefabs/sea_face');
var Sea_under = require('../prefabs/sea_under');

var Pole = require('../prefabs/pole');

var Ships = require('../prefabs/ships');
var Drill = require('../prefabs/drill');

var Bullets = require('../prefabs/bullets');

var Ducks = require('../prefabs/ducks');

//var enemyBullets;

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
    this.drill = new Drill(this.game, this.game.world.randomX, this.game.world.randomY);
    // and add it to the game
    this.game.add.existing(this.drill);


    // add the ducks
    // Create a new ducks object
    this.ducks = new Ducks(this.game, 100, 100);
    // and add it to the game
    this.game.add.existing(this.ducks);
    this.game.input.onDown.add(this.ducks.move, this.ducks);


    // add the ships
    this.shipsAlive = 5;
    this.shipGroup = this.game.add.group();

    for (var i = 0; i < this.shipsAlive; i++) {
      this.ships = new Ships(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.shipGroup.add(this.ships);
    }

    this.game.camera.follow(this.ducks);
    this.game.camera.focusOnXY(0, 0);

  },

  update: function() {

    this.game.physics.arcade.collide(this.ducks, this.shipGroup);
    this.game.physics.arcade.collide(this.ducks, this.drill);
    this.game.physics.arcade.collide(this.shipGroup, this.drill);


    this.game.physics.arcade.overlap(this.enemyBullets, this.ducks, this.bulletHitDucks, null, this);


  },


  bulletHitDucks: function(ducks, enemyBullets) {

    enemyBullets.kill();

    this.destroyed = ducks.damage();

    //    if (this.destroyed) {
    if (true) {
      var explosionAnimation = this.explosions.getFirstExists(false);
      this.explosionAnimation.reset(ducks.x, ducks.y);
      this.explosionAnimation.play('kaboom', 30, false, true);
    }

  }



};

module.exports = Play;
