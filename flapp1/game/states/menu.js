  'use strict';

  function Menu() {}

  Menu.prototype = {
    preload: function() {},
    create: function() {

      // add the sky sprite
      this.sky_bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height - 259, 'sky_bg');
      //      this.sky_bg.autoScroll(-50, 0);

      // add the background sprite

      // Axis Y : from bottom (this.game.world.height) to top = sea_bottom height + sea_on heith
      this.sea_on = this.game.add.tileSprite(0, this.game.world.height - 259, this.game.world.width, 259, 'sea_on');
      this.sea_on.autoScroll(-50, 0);

      // Axis Y : from bottom to top = sea3 height
      this.sea_bottom = this.game.add.tileSprite(0, this.game.world.height - 166, this.game.world.width, 166, 'sea_bottom');
      //      this.sea.fixedToCamera = true;
      this.sea_bottom.autoScroll(-50, 0);

    },
    update: function() {

      /*
      this.sea.tilePosition.x = - this.game.camera.x;
      this.sea.tilePosition.y = - this.game.camera.y;
*/



    }
  };
  module.exports = Menu;
