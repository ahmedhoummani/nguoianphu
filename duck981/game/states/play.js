'use strict';

var Sea_top = require('../prefabs/sea_top');
var Sea_wave = require('../prefabs/sea_wave');

var Island = require('../prefabs/island');

var Ships = require('../prefabs/ships');
var Ship1 = require('../prefabs/ship1');
var Ship2 = require('../prefabs/ship2');


var Drill = require('../prefabs/drill');

var Bullets = require('../prefabs/bullets');
var Rockets = require('../prefabs/rockets');

var Helicopter = require('../prefabs/helicopter');

var Ducks = require('../prefabs/ducks');

var Scoreboard = require('../prefabs/scoreboard');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.world.setBounds(0, 0, 2000, 2000);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // add the sounds
    this.boom = this.game.add.audio('boom');
    this.shot = this.game.add.audio('shot');

	// create and add a new Sea_wave object
    this.sea_wave = new Sea_wave(this.game, 0, 0, this.game.world.width, this.game.world.height);
    this.game.add.existing(this.sea_wave);
	
    // create and add a new Sea_top object
	// It will overlay the sea_wave becasuse it is created later
    this.sea_top = new Sea_top(this.game, 0, 0, this.game.world.width, 80);
    this.game.add.existing(this.sea_top);
	
	// add the island
	this.islandGroup = this.game.add.group();
    // Create a new island object
    this.island1 = new Island(this.game, this.game.world.width / 2 - 700, this.game.world.height/2);
    this.island2 = new Island(this.game, this.game.world.width / 2 + 700, this.game.world.height/2);
    this.island3 = new Island(this.game, this.game.world.width / 2, this.game.world.height/2 - 700);
    this.island4 = new Island(this.game, this.game.world.width / 2, this.game.world.height/2 + 700);
    // and add it to the game
    this.islandGroup.add(this.island1);
    this.islandGroup.add(this.island2);
    this.islandGroup.add(this.island3);
    this.islandGroup.add(this.island4);


    //  The enemies bullet group
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 3; i++) {
      this.rockets = new Rockets(this.game, -100, -100);
      this.enemyBullets.add(this.rockets);
    }

    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
	
	//  The duck bullet group
    this.bulletsGroup = this.game.add.group();
    this.bulletsGroup.enableBody = true;
    this.bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 3; i++) {
      this.bullets = new Bullets(this.game, -100, -100);
      this.bulletsGroup.add(this.bullets);
    }

    this.bulletsGroup.setAll('anchor.x', 0.5);
    this.bulletsGroup.setAll('anchor.y', 0.5);
    this.bulletsGroup.setAll('outOfBoundsKill', true);
    this.bulletsGroup.setAll('checkWorldBounds', true);

    // add the ducks
    // Create a new ducks object
    this.ducks = new Ducks(this.game, this.game.world.width / 2, 100, this.bulletsGroup);
    // and add it to the game
    this.game.add.existing(this.ducks);
    this.game.input.onDown.add(this.ducks.fire, this.ducks);
    this.ducksLive = true;

    // Health points, which are the hearts in the top right corner
    this.hpGroup = this.game.add.group();
    this.hp = new Array();
    /*Adding 3 hearts*/
    this.numberLifes = this.ducks.health;

    for (this.live = 0; this.live < this.numberLifes; this.live++) {
      this.hp[this.live] = this.add.sprite(10 + this.live * 40, 10, 'health');
      this.hp[this.live].fixedToCamera = true;
      this.hp[this.live].cameraOffset.x = 10 + this.live * 40;
      this.hp[this.live].cameraOffset.y = 10;
      this.hpGroup.add(this.hp[this.live]);
    }
    //    this.live = 2; //IDs of the hearts: hp[0], hp[1], hp[2]
    this.live = this.numberLifes - 1; //get the largest IDs of the hearts: hp[0], hp[1], hp[2]
	
	
	 // add the drill
    // Create a new drill object
    this.drill = new Drill(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
    // and add it to the game
    this.game.add.existing(this.drill);
	this.drillLive = true;

    // Health points, which are the hearts in the top right corner
    this.hpDrillGroup = this.game.add.group();
    this.hpDrill = new Array();
    /*Adding hearts*/
    this.numberDrillLifes = this.drill.health;

    for (this.liveDrill = 0; this.liveDrill < this.numberDrillLifes; this.liveDrill++) {
      this.hpDrill[this.liveDrill] = this.add.sprite(this.game.width - 50 - this.liveDrill * 40, 10, 'healthDrill');
      this.hpDrill[this.liveDrill].fixedToCamera = true;
      this.hpDrill[this.liveDrill].cameraOffset.x = this.game.width - 50 - this.liveDrill * 40;
      this.hpDrill[this.liveDrill].cameraOffset.y = 10;
      this.hpDrillGroup.add(this.hpDrill[this.liveDrill]);
    }
    //    this.liveDrill = 2; //IDs of the hearts: hp[0], hp[1], hp[2]
    this.liveDrill = this.numberDrillLifes - 1; //get the largest IDs of the hearts: hp[0], hp[1], hp[2]


    // add the ships
    this.shipsAlive = 2;
    this.shipsGroup = this.game.add.group();

    // add the ship1
    this.ship1Alive = 2;
    this.ship1Group = this.game.add.group();

    // add the ship2
    this.ship2Alive = 2;
    this.ship2Group = this.game.add.group();

    // add the helicopter
      // Create a new helicopter object
      this.helicopter = new Helicopter(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      // and add it to the game
      this.game.add.existing(this.helicopter);

    // add the score
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(300, 10, 'flappyfont', this.score.toString(), 44);
    this.scoreText.fixedToCamera = true;
    this.scoreText.cameraOffset.x = 300;
    this.scoreText.cameraOffset.y = 10;

    this.game.camera.follow(this.ducks);
    this.game.camera.focusOnXY(0, 0);


    // add the logo
    this.styleLogo = {
      font: "10pt Courier",
      fill: "#fcfcfc",
      stroke: "#d4dbd9",
      strokeThickness: 1,
      align: "center"
    };
    this.logo = this.game.add.text(this.game.width - 90, this.game.height - 10, 'play.nguoianphu.com', this.styleLogo);
    this.logo.anchor.setTo(0.5, 0.5);
    this.logo.fixedToCamera = true;
    this.logo.cameraOffset.x = this.game.width - 90;
    this.logo.cameraOffset.y = this.game.height - 10;

    // add the Content
    this.contents = [
      "Attention:",
      "the Oil Rig invades our sea!",
      "defend the Oil Rig and the ships!",
    ];

    this.style = {
      font: "15pt Courier",
      fill: "#fcfcfc",
      stroke: "#d4dbd9",
      strokeThickness: 1,
      align: "center"
    };

    this.content = this.game.add.text(this.game.width - 300, this.game.height - 30, '', this.style);
    this.content.fixedToCamera = true;
    this.content.cameraOffset.x = this.game.width - 300;
    this.content.cameraOffset.y = this.game.height - 30;
    this.content.anchor.setTo(0.5, 0.5);
    this.time = this.game.time.now + 80;
    this.index = 0;
    this.line = '';

	//  Explosion pool
    this.explosions = this.game.add.group();

    for (var i = 0; i < 10; i++) {
      this.explosionAnimation = this.explosions.create(0, 0, 'kaboom', [0], false);
      this.explosionAnimation.anchor.setTo(0.5, 0.5);
      this.explosionAnimation.animations.add('kaboom');
    }
	
	this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);

  },

  update: function() {

    // add the ships
    if (this.shipsGroup.countLiving() < this.shipsAlive) {
      this.createShips(this.shipsGroup);
    }
    if (this.ship1Group.countLiving() < this.ship1Alive) {
      this.createShip1(this.ship1Group);
    }
    if (this.ship2Group.countLiving() < this.ship2Alive) {
      this.createShip2(this.ship2Group);
    }

    // make everything collide
    this.game.physics.arcade.collide(this.ducks, this.shipsGroup);
    this.game.physics.arcade.collide(this.ducks, this.ship1Group);
    this.game.physics.arcade.collide(this.ducks, this.ship2Group);
    this.game.physics.arcade.collide(this.ducks, this.drill);
    this.game.physics.arcade.collide(this.ducks, this.islandGroup);

    this.game.physics.arcade.collide(this.shipsGroup, this.drill);
    this.game.physics.arcade.collide(this.ship1Group, this.drill);
    this.game.physics.arcade.collide(this.ship2Group, this.drill);

    this.game.physics.arcade.collide(this.shipsGroup, this.ship1Group);
    this.game.physics.arcade.collide(this.shipsGroup, this.ship2Group);
    this.game.physics.arcade.collide(this.ship1Group, this.ship2Group);
	
	this.game.physics.arcade.collide(this.shipsGroup, this.islandGroup);
    this.game.physics.arcade.collide(this.ship1Group, this.islandGroup);
    this.game.physics.arcade.collide(this.ship2Group, this.islandGroup);
    this.game.physics.arcade.collide(this.drill, this.islandGroup);

    // make everything hit and kill
	
	this.game.physics.arcade.overlap(this.enemyBullets, this.bulletsGroup, this.bulletOverlap, null, this);
    
    this.game.physics.arcade.overlap(this.enemyBullets, this.ducks, this.bulletHitDucks, null, this);
    this.game.physics.arcade.overlap(this.enemyBullets, this.islandGroup, this.bulletHitIslandGroup, null, this);
	
	this.game.physics.arcade.overlap(this.bulletsGroup, this.drill, this.bulletHitDrill, null, this);
    this.game.physics.arcade.overlap(this.bulletsGroup, this.islandGroup, this.bulletHitIslandGroup, null, this);
	this.game.physics.arcade.overlap(this.bulletsGroup, this.shipsGroup, this.bulletHitShip, null, this);
	this.game.physics.arcade.overlap(this.bulletsGroup, this.ship1Group, this.bulletHitShip, null, this);
	this.game.physics.arcade.overlap(this.bulletsGroup, this.ship2Group, this.bulletHitShip, null, this);

    // add the message
    if (this.game.time.now > this.time && this.index < this.contents.length) {
      //  get the next character in the line
      if (this.line.length < this.contents[this.index].length) {
        this.line = this.contents[this.index].substr(0, this.line.length + 1);
        this.content.setText(this.line);
        this.time = this.game.time.now + 80;
      } else {
        this.time = this.game.time.now + 2000;

        if (this.index < this.contents.length) {
          this.index++;
          if (this.index >= this.contents.length) {
            this.index = 0;
          }
          this.line = '';
        }

      }
    }


  },

  createShips: function(shipsGroup) {

    this.ships = new Ships(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    shipsGroup.add(this.ships);

  },

  createShip1: function(ship1Group) {

    this.ship1 = new Ship1(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    ship1Group.add(this.ship1);

  },

  createShip2: function(ship2Group) {

    this.ship2 = new Ship2(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    ship2Group.add(this.ship2);

  },


  bulletOverlap: function(bullet1, bullet2) {
  
	bullet1.kill();
	bullet2.kill();
	
	this.shot.play();
	
	var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(bullet1.x, bullet1.y);
    this.explosionAnimation.play('kaboom', 30, false, true);

  },


  bulletHitDucks: function(ducks, enemyBullets) {

    this.shot.play();

    enemyBullets.kill();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(ducks.x, ducks.y);
    this.explosionAnimation.play('kaboom', 30, false, true);


    // the ducks is killed
    this.hp[this.live].kill(); // "Killing" the hearth with the largest index
    this.live--; // Decrementing our live variable

    if (this.live === -1) { // If our last heart (index: 0) is "killed" then we restart the game
      this.boom.play();
    }

    this.theX = ducks.x;

    this.destroyed = ducks.damage();
    if (this.destroyed) {

      this.ducksLive = false;

      this.scoreboard = new Scoreboard(this.game, this.theX - 100, 100);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score, false);

    }

  },
  
  bulletHitIslandGroup: function(enemyBullets, island){
		enemyBullets.kill();
  },
  
  bulletHitShip: function(bullets, ship) {

    bullets.kill();
	this.boom.play();
	var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(ship.x, ship.y);
    this.explosionAnimation.play('kaboom', 30, false, true);
	this.destroyed = ship.damage();
    if (this.destroyed) {
	
	this.hasScore(10);

    }

  },

  
  bulletHitDrill: function(drill, bullets) {

    this.shot.play();
	this.hasScore(10);

    bullets.kill();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(drill.x, drill.y);
    this.explosionAnimation.play('kaboom', 30, false, true);


    // the drill is killed
    this.hpDrill[this.liveDrill].kill(); // "Killing" the hearth with the largest index
    this.liveDrill--; // Decrementing our live variable

    if (this.liveDrill === -1) { // If our last heart (index: 0) is "killed" then we restart the game
      this.boom.play();
    }

    this.destroyed = drill.damage();
    if (this.destroyed) {
	
		this.hasScore(100);

      if (this.ducksLive) {
		  this.scoreboard = new Scoreboard(this.game);
		  this.game.add.existing(this.scoreboard);
		  this.scoreboard.show(this.score, true);
		}

		this.boom.play();
		
		// this.ducks.destroy();
		
		this.enemyBullets.destroy();
		this.helicopter.destroy();
		this.shipsGroup.destroy();
        this.ship1Group.destroy();
    }   this.ship2Group.destroy();

  },

  hasScore: function(addScore) {
    this.score = this.score + addScore;
    this.scoreText.setText(this.score.toString());

  }


};

module.exports = Play;
