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
