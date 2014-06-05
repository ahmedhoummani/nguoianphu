'use strict';

function Boot() {}

Boot.prototype = {

  preload: function() {

    this.load.image('preloader', 'assets/preloader.gif');

  },

  create: function() {

    this.game.input.maxPointers = 1;

    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 480;
      this.scale.minHeight = 260;
      this.scale.maxWidth = 800;
      this.scale.maxHeight = 600;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.setScreenSize(true);
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 480;
      this.scale.minHeight = 260;
      this.scale.maxWidth = 800;
      this.scale.maxHeight = 600;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.forceOrientation(true, false);
      //      this.scale.hasResized.add(this.gameResized, this);
      //      this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
      //      this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
      this.scale.setScreenSize(true);
    }

    this.game.state.start('preload');

  },

  gameResized: function(width, height) {

    //  This could be handy if you need to do any extra processing if the game resizes.
    //  A resize could happen if for example swapping orientation on a device.

  }

};

module.exports = Boot;
