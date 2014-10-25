'use strict';

function Boot() {}

Boot.prototype = {

  preload: function() {

    this.load.image('preloader', 'assets/preloader.gif');

  },

  create: function() {

    this.game.input.maxPointers = 1;
	this.stage.disableVisibilityChange = !0;
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = !0;
	this.scale.hasResized.add(this.gameResized, this);
	this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
	this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
	this.scale.setScreenSize(!0);

    this.game.state.start('preload');

  },

  gameResized: function () {},
        
  enterIncorrectOrientation: function () {
            this.orientated = !1, document.getElementById("orientation").style.display = "block"
  },
  leaveIncorrectOrientation: function () {
            this.orientated = !0, document.getElementById("orientation").style.display = "none"
  }

};

module.exports = Boot;
