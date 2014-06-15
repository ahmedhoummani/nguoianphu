'use strict';

var Scoreboard = function(game) {

  Phaser.Group.call(this, game);


  this.fixedToCamera = true;
  this.cameraOffset.x = 200;
  this.cameraOffset.y = 50;

  this.winText = this.game.add.bitmapText(this.x - 120, 80, 'flappyfont', '', 62);
  this.add(this.winText);

  this.lostText = this.game.add.bitmapText(this.x - 120, 80, 'flappyfont', '', 62);
  this.add(this.lostText);


  this.scoreboard = this.create(this.theX, 200, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);

  this.scoreText = this.game.add.bitmapText(this.x + 50, 180, 'flappyfont', '', 22);
  this.add(this.scoreText);

  this.bestText = this.game.add.bitmapText(this.x + 50, 230, 'flappyfont', '', 22);
  this.add(this.bestText);

  // add our start button with a callback
  this.startButton = this.game.add.button(this.x, 300, 'startButton', this.startClick, this);
  this.startButton.anchor.setTo(0.5, 0.5);
  this.startButton.inputEnabled = true;
  this.startButton.input.useHandCursor = true;

  this.add(this.startButton);

  this.y = this.game.height;
  this.x = 0;

};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score, win) {

  if (win) {
    this.winText.setText('You win');
  } else {
    this.lostText.setText('Game Over');
  }

  var coin, bestScore;
  this.scoreText.setText(score.toString());
  if ( !! localStorage) {
    bestScore = localStorage.getItem('bestScore');
    if (!bestScore || bestScore < score) {
      bestScore = score;
      localStorage.setItem('bestScore', bestScore);
    }
  } else {
    bestScore = 'N/A';
  }

  this.bestText.setText(bestScore.toString());

  if (score >= 70) {
    coin = this.game.add.sprite(-65, 7, 'medals', 1);
  } else if (score >= 50) {
    coin = this.game.add.sprite(-65, 7, 'medals', 0);
  }

  this.game.add.tween(this).to({
    y: 0
  }, 1000, Phaser.Easing.Bounce.Out, true);

  if (coin) {

    coin.anchor.setTo(0.5, 0.5);
    this.scoreboard.addChild(coin);

    // Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    var emitter = this.game.add.emitter(coin.x, coin.y, 400);
    this.scoreboard.addChild(emitter);
    emitter.width = coin.width;
    emitter.height = coin.height;


    //  This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
    // emitter.width = 800;

    emitter.makeParticles('particle');

    // emitter.minParticleSpeed.set(0, 300);
    // emitter.maxParticleSpeed.set(0, 600);

    emitter.setRotation(-100, 100);
    emitter.setXSpeed(0, 0);
    emitter.setYSpeed(0, 0);
    emitter.minParticleScale = 0.25;
    emitter.maxParticleScale = 0.5;
    emitter.setAll('body.allowGravity', false);

    emitter.start(false, 1000, 1000);

  }
};

Scoreboard.prototype.startClick = function() {
  this.game.state.start('play');
};





Scoreboard.prototype.update = function() {
  // write your prefab's specific update code here
};

module.exports = Scoreboard;
