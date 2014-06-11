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

    this.load.image('sea_on', 'assets/sea/sea_on.png');
    this.load.image('sea_face', 'assets/sea/sea_face.png');
    this.load.image('sea_under', 'assets/sea/sea_under.png');

    this.load.image('scoreboard', 'assets/score/scoreboard.png');
    this.load.spritesheet('medals', 'assets/score/medals.png', 44, 46, 2);
    this.load.image('particle', 'assets/score/particle.png');

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

    this.load.spritesheet('pole', 'assets/pole/pole.png', 100, 73, 2);

    this.load.spritesheet('ships', 'assets/ship/ships.png', 200, 61, 2);
    this.load.spritesheet('ship1', 'assets/ship/warship1.png', 200, 68, 2);
    this.load.spritesheet('ship2', 'assets/ship/warship2.png', 200, 68, 2);

    this.load.spritesheet('drill', 'assets/drill/rigs.png', 125, 198, 2);

    this.load.spritesheet('ducks', 'assets/duck/ducks.png', 125, 96, 2);

    this.load.image('startButton', 'assets/menu/start-button.png');

    this.load.spritesheet('rockets', 'assets/bullets/rockets.png', 80, 25, 3);

    this.load.spritesheet('kaboom', 'assets/bullets/explosion.png', 64, 64, 23);
	
    this.load.spritesheet('mermaid', 'assets/mermaid/mermaid.png', 56, 48);
	
    // this.load.spritesheet('mermaid_01', 'assets/mermaid/images/mermaid_01.png', 56, 48);
    // this.load.spritesheet('mermaid_03', 'assets/mermaid/images/mermaid_03.png', 56, 48);
    // this.load.spritesheet('mermaid_04', 'assets/mermaid/images/mermaid_04.png', 56, 48);
    // this.load.spritesheet('mermaid_04', 'assets/mermaid/images/mermaid_04.png', 56, 48);

    this.load.audio('boom', 'assets/audio/boom.ogg');
    this.load.audio('shot', 'assets/audio/shot.ogg');
//    this.game.load.audio('caribe', 'assets/audio/caribe.ogg');



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
