'use strict';

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');

    var style = {
      font: '65px Arial',
      fill: '#ffffff',
      align: 'center'
    };
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', {
      font: '16px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({
      angle: 20
    }, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.bullet = this.add.sprite(400, 300, 'bullet');

  },
  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
