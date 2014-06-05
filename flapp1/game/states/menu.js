  'use strict';

  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      // create a group to put the title assets in
      // so they can be manipulated as a whole
      this.titleGroup = this.game.add.group();

      // add the sky sprite
      this.sky_bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height - 259, 'sky_bg');
      //      this.titleGroup.add(this.sky_bg);

      // add the background sprite

      // Axis Y : from bottom (this.game.world.height) to top = sea_bottom height + sea_on heith
      this.sea_on = this.game.add.tileSprite(0, this.game.world.height - 166 - 93, this.game.world.width, 259, 'sea_on');
      this.sea_on.autoScroll(-30, 0);
      //      this.titleGroup.add(this.sea_on);

      // Axis Y : from bottom to top = sea3 height
      this.sea_bottom = this.game.add.tileSprite(0, this.game.world.height - 166, this.game.world.width, 166, 'sea_bottom');
      //      this.titleGroup.add(this.sea_bottom);


      // add the duck
      this.duck = this.game.add.sprite(100, this.game.world.height - 166 - 88, 'duck');
      //      this.titleGroup.add(this.duck);

      // add the ship
      this.ship = this.game.add.sprite(this.game.world.height - 100, this.game.world.height - 166 - 70, 'ship');
      //      this.titleGroup.add(this.ship);

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5, 0.5);
//      this.titleGroup.add(this.startButton);


      this.titleGroup.x = this.game.world.width / 2;
      this.titleGroup.y = this.game.world.height / 2;

      this.game.add.tween(this.titleGroup).to({
        y: 115
      }, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    },

    update: function() {

      /*
      this.sea.tilePosition.x = - this.game.camera.x;
      this.sea.tilePosition.y = - this.game.camera.y;
*/



    },

    startClick: function() {

      // start button click handler
      // start the 'play' state
      this.game.state.start('play');

    }

  };

  module.exports = Menu;
