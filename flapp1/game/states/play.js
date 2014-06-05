'use strict';
var Sea_on = require('../prefabs/sea_on');
var Sea_face = require('../prefabs/sea_face');
var Sea_under = require('../prefabs/sea_under');

var Duck = require('../prefabs/duck');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //    this.game.physics.arcade.gravity.y = 500;


    // create and add a new Sea_on object
    this.sea_on = new Sea_on(this.game, 0, 0, this.game.world.width, 93);
    this.game.add.existing(this.sea_on);
      
      
      // create and add a new Sea_face object
    this.sea_face = new Sea_face(this.game, 0, 93, this.game.world.width, this.game.world.height - 73);
    this.game.add.existing(this.sea_face);


    // add the duck
    // Create a new duck object
    this.duck = new Duck(this.game, 50, 41);
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
