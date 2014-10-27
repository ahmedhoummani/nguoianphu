'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);


    this.load.image('sea', 'assets/sea.png');

    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('enemyBullet', 'assets/enemy-bullet.png');

    this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
    this.load.spritesheet('whiteEnemy', 'assets/shooting-enemy.png', 32, 32);
    this.load.spritesheet('boss', 'assets/boss.png', 93, 75);

    this.load.spritesheet('player', 'assets/player.png', 64, 64);
    this.load.image('powerup1', 'assets/powerup1.png');

    this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);

    this.load.audio('explosion', ['assets/explosion.wav']);
    this.load.audio('playerExplosion', ['assets/player-explosion.wav']);
    this.load.audio('enemyFire', ['assets/enemy-fire.wav']);
    this.load.audio('playerFire', ['assets/player-fire.wav']);
    this.load.audio('powerUp', ['assets/powerup.wav']);

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
