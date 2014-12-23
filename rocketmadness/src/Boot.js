var Game = {};
Game.Boot = function (game) {}
Game.Boot.prototype = {
    preload: function () {
        this.game.load.image('sprLoadingBar', 'assets/loading.png');
        this.game.load.bitmapFont('font', 'assets/font.png', 'assets/font.fnt');
    },
    create: function () {
        this.scale.maxWidth = 768;
        this.scale.maxHeight = 1152;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.game.scale.setMinMax(320, 480, 640, 960);
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;
        this.game.stage.smoothed = false;
        this.game.fading = this.game.plugins.add(Phaser.Plugin.FadePlugin);
        console.log('Load boot');
        this.game.state.start('Preload');
    }
}
