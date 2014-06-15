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

    this.load.image('sea_on', 'assets/sea/sea_onm.png');
    this.load.image('sea_under', 'assets/sea/sea_underm.png');

    this.load.image('scoreboard', 'assets/score/scoreboard.png');
    this.load.spritesheet('medals', 'assets/score/medals.png', 44, 46, 2);
    this.load.image('particle', 'assets/score/particle.png');

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

    this.load.spritesheet('pole', 'assets/pole/polem.png', 48, 35, 2);

    this.load.spritesheet('ships', 'assets/ship/shipsm.png', 50, 15, 2);
    this.load.spritesheet('ship1', 'assets/ship/warship1m.png', 50, 17, 2);
    this.load.spritesheet('ship2', 'assets/ship/warship2m.png', 50, 17, 2);

    this.load.spritesheet('drill', 'assets/drill/rigsm.png', 50, 79, 2);

    this.load.spritesheet('ducks', 'assets/duck/ducksm.png', 40, 31, 2);

    this.load.image('health', 'assets/health/heartm.png');

    this.load.image('startButton', 'assets/menu/start-buttonm.png');

    this.load.spritesheet('rockets', 'assets/bullets/rocketsm.png', 30, 10, 3);

    this.load.spritesheet('kaboom', 'assets/bullets/explosionm.png', 20, 20, 23);

    this.load.spritesheet('mermaid', 'assets/mermaid/mermaidm.png', 30, 21, 6);

     this.load.audio('boom', 'assets/audio/boom.ogg');
     this.load.audio('shot', 'assets/audio/shot.ogg');

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
