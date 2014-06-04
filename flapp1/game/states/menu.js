  'use strict';

  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      // create a group to put the title assets in
      // so they can be manipulated as a whole
      //      this.titleGroup = this.game.add.group();

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

      // add the button
      this.btnStart = this.game.add.sprite(this.game.world.width / 2 - 104 / 2, this.game.world.height / 2 - 58, 'btnStart');
      //      this.titleGroup.add(this.btnStart);

    },

    update: function() {

      /*
      this.sea.tilePosition.x = - this.game.camera.x;
      this.sea.tilePosition.y = - this.game.camera.y;
*/



    }

  };

  module.exports = Menu;
