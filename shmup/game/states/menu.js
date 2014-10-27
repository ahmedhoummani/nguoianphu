'use strict';

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.sea = this.add.tileSprite(0, 0, 240, 480, 'sea');


    this.enemy = this.game.add.sprite(this.game.world.centerX, 50, 'boss');
    this.enemy.animations.add('fly', [0, 1, 2], 20, true);
    this.enemy.play('fly');
    this.enemy.anchor.setTo(0.5, 0.5);
    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);


    this.player = this.add.sprite(this.game.world.centerX, 400, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);


    this.enemy.angle = -20;
    this.game.add.tween(this.enemy).to({
      angle: 20
    }, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.player.angle = -20;
    this.game.add.tween(this.player).to({
      angle: 20
    }, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);


    var style = {
      font: '45px Arial',
      fill: '#ffffff',
      align: 'center'
    };
    this.titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 15, 'Air War', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 15, 'Click anywhere to play', {
      font: '12px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    this.instructionsText.anchor.setTo(0.5, 0.5);



  },
  update: function() {

    this.sea.tilePosition.y += 0.6;

    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }

  }
};

module.exports = Menu;
