'use strict';

function Preload() {}

Preload.prototype = {
  preload: function() {

    // Add the sprite
    this.addSprite();

  },

  create: function() {},

  update: function() {

    this.game.state.start('play');

  },

  addSprite: function() {

    this.load.image('ball', 'assets/ball.png');
    this.load.image('bubble', 'assets/bubble.png');
  }

};

module.exports = Preload;
