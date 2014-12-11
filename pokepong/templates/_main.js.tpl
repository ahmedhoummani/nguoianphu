'use strict';

window.onload = function () {
  var game = new Phaser.Game(<%= gameWidth %>, <%= gameHeight %>, Phaser.AUTO, '<%= _.slugify(projectName) %>');

  // Global variables
  // call them: this.game.global.phonegap
  game.global = {
  		levels_num: 28,
		phonegap: false
		
	};
	
  // Game States
  <% _.forEach(gameStates, function(gameState) {  %>game.state.add('<%= gameState.shortName %>', require('./states/<%= gameState.shortName %>'));
  <% }); %>

  game.state.start('boot');
};