'use strict';

window.onload = function () {
  var game = new Phaser.Game(640, 832, Phaser.AUTO, 'pokepong');

  // Global variables
  // call them: this.game.global.phonegap
  game.global = {
  		levels_num: 28,
		phonegap: false
		
	};
	
  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('level', require('./states/level'));
  game.state.add('levelsmenu', require('./states/levelsmenu'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};