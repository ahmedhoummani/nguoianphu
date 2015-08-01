'use strict';

window.onload = function () {
  var game = new Phaser.Game(640, 832, Phaser.AUTO, '');

		// Is the game running under Apache Cordova Phonegap?
		// Is the it Android Native Browser?
		function isAndroidBrowser() {
			var objAgent = navigator.userAgent;
			var objfullVersion  = ''+parseFloat(navigator.appVersion);
			var objOffsetVersion=objAgent.indexOf("Chrome");
			if (objOffsetVersion != -1) {
				objfullVersion = objAgent.substring(objOffsetVersion+7, objOffsetVersion+9);
				if (objfullVersion < 19) {
					return true;
				}
			}
			return false;
		}
		var inAppBrowser = isAndroidBrowser();
		// Is Android OS older than 4.3?
		function getAndroidVersion(ua) {
			ua = (ua || navigator.userAgent).toLowerCase();
			var match = ua.match(/android\s([0-9\.]*)/);
			return match ? match[1] : false;
		};
		// getAndroidVersion(); // "4.2.1"
		// parseInt(getAndroidVersion()); // 4
		var andoidVersion = parseFloat(getAndroidVersion()); // 4.2
		if (andoidVersion < 4.3){
			var oldAndroid = true	
		} else {
			var oldAndroid = false
			}
  // Global variables
  // call them: this.game.global.phonegap
  game.global = {
  		levels_num: 28,
		phonegap: inAppBrowser,
		old_android: oldAndroid,
		enable_sound: !inAppBrowser
		
	};
	
  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('level', require('./states/level'));
  game.state.add('levelsmenu', require('./states/levelsmenu'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};