  'use strict';

  var Sea_top = require('../prefabs/sea_top');
  var Sea_wave = require('../prefabs/sea_wave');
  
  var Island = require('../prefabs/island');

  var Ships = require('../prefabs/ships');
  var Ship1 = require('../prefabs/ship1');
  var Ship2 = require('../prefabs/ship2');
  var Drill = require('../prefabs/drill');

  var Helicopter = require('../prefabs/helicopter');

  var Bullets = require('../prefabs/bullets');
  var Rockets = require('../prefabs/rockets');

  var Ducks = require('../prefabs/ducks');


  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // create and add a new Sea_top object
      this.sea_top = new Sea_top(this.game, 0, 0, this.game.world.width, 80);
      this.game.add.existing(this.sea_top);

      // create and add a new Sea_wave object
      this.sea_wave = new Sea_wave(this.game, 0, 79, this.game.world.width, this.game.world.height);
      this.game.add.existing(this.sea_wave);
	  
	  // add the island
      // Create a new island object
      this.island = new Island(this.game, this.game.width / 2 + 100, this.game.world.height - 60);
      // and add it to the game
      this.game.add.existing(this.island);


      //  The enemies bullet group
      this.enemyBullets = this.game.add.group();
      this.enemyBullets.enableBody = true;
      this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0; i < 100; i++) {
        this.rockets = new Rockets(this.game, -100, -100);
        this.enemyBullets.add(this.rockets);
      }

      this.enemyBullets.setAll('anchor.x', 0.5);
      this.enemyBullets.setAll('anchor.y', 0.5);
      this.enemyBullets.setAll('outOfBoundsKill', true);
      this.enemyBullets.setAll('checkWorldBounds', true);


      // add the ducks
      // Create a new ducks object
      this.ducks = new Ducks(this.game, this.game.world.width / 2, 100, this.enemyBullets);
      // and add it to the game
      this.game.add.existing(this.ducks);
	  
	  // add the drill
      // Create a new drill object
      this.drill = new Drill(this.game, this.game.world.width - 100, this.game.world.height - 100, this.ducks, this.enemyBullets);
      // and add it to the game
      this.game.add.existing(this.drill);

      // add the ships
      this.ships = new Ships(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship1 = new Ship1(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship2 = new Ship2(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);


      // add the helicopter
      // Create a new helicopter object
      this.helicopter = new Helicopter(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      // and add it to the game
      this.game.add.existing(this.helicopter);

      // add the HEADING TEXT
      this.headText = this.game.add.bitmapText(this.game.world.width / 2 - 150, 200, 'flappyfont', 'Duck 981', 72);

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5, 0.5);
      this.startButton.inputEnabled = true;
      this.startButton.input.useHandCursor = true;

      // add the Content
      this.contents = [
        "Nguoi An Phu\n presents",
        " ",
        "Click or Tap to move the Duck",
        "push the Oil Rig to the Poles",
      ];

      this.style = {
        font: "30pt Courier",
        fill: "#fcfcfc",
        stroke: "#d4dbd9",
        strokeThickness: 2,
        align: "center"
      };

      this.content = this.game.add.text(this.game.world.centerX, 400, '', this.style);
      this.content.anchor.setTo(0.5, 0.5);
      this.time = this.game.time.now + 80;
      this.index = 0;
      this.line = '';


    },

    update: function() {

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

    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');

    }

  };

  module.exports = Menu;
