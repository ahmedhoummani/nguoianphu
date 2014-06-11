  'use strict';

  var Sea_on = require('../prefabs/sea_on');
  var Sea_face = require('../prefabs/sea_face');
  var Sea_under = require('../prefabs/sea_under');

  var Pole = require('../prefabs/pole');

  var Ships = require('../prefabs/ships');
  var Ship1 = require('../prefabs/ship1');
  var Ship2 = require('../prefabs/ship2');
  var Drill = require('../prefabs/drill');
  
  var Mermaid = require('../prefabs/mermaid');

  var Bullets = require('../prefabs/bullets');

  var Ducks = require('../prefabs/ducks');


  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

//      this.caribe = this.game.add.audio('caribe', 1, true);
//      this.caribe.play('',0,1,true);

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
      this.pole = new Pole(this.game, this.game.width / 2, this.game.world.height - 45);
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


      // add the drill
      // Create a new drill object
      this.drill = new Drill(this.game, this.game.world.width - 100, this.game.world.height - 100);
      // and add it to the game
      this.game.add.existing(this.drill);


      // add the ducks
      // Create a new ducks object
      this.ducks = new Ducks(this.game, this.game.world.width / 2, 100);
      // and add it to the game
      this.game.add.existing(this.ducks);

      // add the ships
      this.ships = new Ships(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship1 = new Ship1(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship2 = new Ship2(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
	  
	  
	  // add the mermaid
      // Create a new mermaid object
      this.mermaid = new Mermaid(this.game, this.game.world.randomX, this.game.world.randomY);
      // and add it to the game
      this.game.add.existing(this.mermaid);

      // add the HEADING TEXT
      this.headText = this.game.add.bitmapText(this.game.world.width / 2 - 150, 200, 'flappyfont', 'Duck 981', 72);

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5, 0.5);
      this.startButton.inputEnabled = true;
      this.startButton.input.useHandCursor = true;


    },

    update: function() {},

    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');

    }

  };

  module.exports = Menu;
