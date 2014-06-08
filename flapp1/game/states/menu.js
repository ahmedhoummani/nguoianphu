  'use strict';

  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      // add the sky sprite
      this.sky = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height - 259, 'sky');

      // add the background sprite

      // Axis Y : from bottom (this.game.world.height) to top = sea_bottom height + sea_on heith
      this.sea_on = this.game.add.tileSprite(0, this.game.world.height - 166 - 93, this.game.world.width, 259, 'sea_on');
      this.sea_on.autoScroll(-20, 0);

      // Axis Y : from bottom to top = sea3 height
      this.sea_bottom = this.game.add.tileSprite(0, this.game.world.height - 166, this.game.world.width, 166, 'sea_bottom');
      this.sea_bottom.autoScroll(20, 0)


      // add the duck
      this.duck = this.game.add.sprite(this.game.world.width / 2 - 200, this.game.world.height - 166 - 88, 'duck');

      // add the drill
      this.drill = this.game.add.sprite(this.game.width / 2 + 150, this.game.height - 235, 'drill');

      // add the ship
      this.ship = this.game.add.sprite(this.game.width / 2 , this.game.height - 166 - 70, 'ship');

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5, 0.5);
      this.startButton.inputEnabled = true;
      this.startButton.input.useHandCursor = true;


      this.pole = this.game.add.sprite(this.game.world.width / 2 - 50, this.game.world.height - 73, 'pole');
      this.pole.animations.add('tide');
      this.pole.animations.play('tide', 2, true);


    },

    update: function() {},

    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');

    }

  };

  module.exports = Menu;
