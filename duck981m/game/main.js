'use strict';

//global variables
window.onload = function () {

//By default we set
	this.screen.value = "small";
	this.srx = Math.max(window.innerWidth,window.innerHeight);
	this.sry = Math.min(window.innerWidth,window.innerHeight);

	this.logicWidth = 480;
    // 480
	this.logicHeight = 320;
    //320
	var r = this.logicWidth/this.logicHeight;

	if(this.srx >= 360){
		this.screen.value = "small";
		this.gameWidth = 360;
	}
	if(this.srx >= 480){
		this.screen.value = "normal";
		this.gameWidth = 480;
	}
	if(this.srx >= 720){
		this.screen.value = "large";
		this.gameWidth = 720;
	}
	if(this.srx >= 960){
		this.screen.value = "xlarge";
		this.gameWidth = 960;
	}
	if(this.srx >= 1024){
		this.screen.value = "xxlarge";
		this.gameWidth = 1024;
	}

	//If on deskop, we may need to fix the maximum resolution instead of scaling the game to the full monitor resolution
	var device = new Phaser.Device();
	if(device.desktop){
		//this.screen.value = "xxlarge";
		this.gameWidth = 480;
	}
	device = null;


	this.gameHeight = this.gameWidth/r;
	//We need these methods later to convert the logical game position to display position, So convertWidth(logicWidth) will be right edge for all screens
	this.convertWidth = function(value){
		return value/this.logicWidth * this.gameWidth;
	};
	this.convertHeight = function(value){
		return value/this.logicHeight * this.gameHeight;
	};

	var game = new Phaser.Game(this.gameWidth,this.gameHeight, Phaser.AUTO, 'game');

	//	Add the States your game has.
	//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
	  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

	//	Now start the Boot state.
  game.state.start('boot');
};

