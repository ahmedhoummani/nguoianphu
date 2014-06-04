'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image('sky_bg', 'assets/sky/sky_bg.png');
      
    this.load.image('sea_bottom', 'assets/sea/sea_bottom.png');
    this.load.image('sea_on', 'assets/sea/sea_on.png');

    this.load.image('ship', 'assets/ship/china_200l.png');

    this.load.image('duck', 'assets/duck/duck.png');


  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if ( !! this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
