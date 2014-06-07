'use strict';
var Sea_on = require('../prefabs/sea_on');
var Sea_face = require('../prefabs/sea_face');
var Sea_under = require('../prefabs/sea_under');

var Pole = require('../prefabs/pole');

var Duck = require('../prefabs/duck');
var Ducks = require('../prefabs/ducks');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //    this.game.physics.arcade.gravity.y = 500;


    // create and add a new Sea_on object
    this.sea_on = new Sea_on(this.game, 0, 0, this.game.world.width, 93);
    this.game.add.existing(this.sea_on);


    // create and add a new Sea_face object
    this.sea_face = new Sea_face(this.game, 0, 93, this.game.width, this.game.height - 73);
    this.game.add.existing(this.sea_face);


    // add the duck
    // Create a new duck object
    this.duck = new Duck(this.game, 50, 41);
    // and add it to the game
    this.game.add.existing(this.duck);


    // add the ducks
    // Create a new ducks object
    this.ducks = new Ducks(this.game, 100, 100);
    // and add it to the game
    this.game.add.existing(this.ducks);

    // create and add a new Sea_under object
    this.sea_under = new Sea_under(this.game, 0, this.game.world.height - 73, this.game.world.width, 73);
    this.game.add.existing(this.sea_under);

    // add the pole
    // Create a new pole object
    this.pole = new Pole(this.game, this.game.world.width / 2, this.game.world.height - 73);
    // and add it to the game
    this.game.add.existing(this.pole);

  },

  update: function() {


    this.game.physics.arcade.collide(this.duck, this.sea_under);


  }

};

module.exports = Play;
