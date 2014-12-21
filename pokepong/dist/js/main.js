'use strict';

window.onload = function () {
  var game = new Phaser.Game(640, 832, Phaser.AUTO, 'pokepong');

		// Is the game running under Apache Cordova Phonegap and Android OS
		// older
		// than 4.3?
			function getAndroidVersion(ua) {
				ua = (ua || navigator.userAgent).toLowerCase();
				var match = ua.match(/android\s([0-9\.]*)/);
				return match ? match[1] : false;
			};
			// getAndroidVersion(); // "4.2.1"
			// parseInt(getAndroidVersion()); // 4
			var andoidVersion = parseFloat(getAndroidVersion()); // 4.2
			if (andoidVersion < 4.3){
				var oldAndroid = true;
				var sound_on = false
			} else {
				var oldAndroid = false;
				var sound_on = true
			}
  // Global variables
  // call them: this.game.global.phonegap
  game.global = {
  		levels_num: 28,
		phonegap: false,
		old_android: oldAndroid,
		enable_sound: sound_on
		
	};
	
  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('level', require('./states/level'));
  game.state.add('levelsmenu', require('./states/levelsmenu'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};