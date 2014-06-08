'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image('sky', 'assets/sky/sky_bg.png');

    this.load.image('sea_on', 'assets/sea/sea_on.png');
    this.load.image('sea_face', 'assets/sea/sea_face.png');
    this.load.image('sea_bottom', 'assets/sea/sea_bottom.png');
    this.load.image('sea_under', 'assets/sea/sea_under.png');

    this.load.spritesheet('pole', 'assets/pole/pole.png', 100, 73, 2);

    this.load.image('ship', 'assets/ship/china_200l.png');
    this.load.spritesheet('ships', 'assets/ship/ships.png', 200, 61, 2);
      
    this.load.spritesheet('drill', 'assets/drill/drill.png', 200, 234, 2);

    this.load.image('duck', 'assets/duck/duck.png');
    this.load.spritesheet('ducks', 'assets/duck/ducks.png', 125, 96, 2);

    this.load.image('startButton', 'assets/menu/start-button.png');


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