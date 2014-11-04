var Ball = require('../prefabs/ball');
var Bubble = require('../prefabs/bubble');

'use strict';

function Play() {}
Play.prototype = {
  create: function() {

    // setup the game
    this.game.world.setBounds(0, 0, 320, 480);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Init the object
    this.initBall();
    this.initBubble();

  },
  update: function() {

    // make everything collide
    this.collideObject();

  },
  initBall: function() {

    this.ballGroup = this.game.add.group();

    for (var i = 0; i < 1; i++) {
      this.ball = new Ball(this.game, this.game.width / 2, 40);
      this.ballGroup.add(this.ball);

    }

  },
  initBubble: function() {

    this.bubbleGroup = this.game.add.group();

    // 5 colors
    for (var i = 1; i <= 10; i++) {
      this.color = this.rnd.between(1, 5);
      this.bubble = new Bubble(this.game, this.game.width / 2, this.game.height - 40, this.color);
      this.bubbleGroup.add(this.bubble);

    }

  },

  collideObject: function() {

    this.game.physics.arcade.collide(this.ballGroup, this.bubbleGroup);

  }

};

module.exports = Play;
