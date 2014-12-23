Game.Preload = function (game) {}
Game.Preload.prototype = {
    preload: function () {
        load = this.game.add.bitmapText(81, 200, 'font', 'LOADING', 64)
        var loadingBar = this.add.sprite(160, 300, 'sprLoadingBar');
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.image('player', 'assets/player.png');
        this.game.load.spritesheet('trail', 'assets/trail.png', 16, 16);
        this.game.load.spritesheet('explosion', 'assets/explo.png', 58.5, 48);
        this.game.load.image('power', 'assets/power.png');
        this.game.load.image('coin', 'assets/coin.png');
        this.game.load.image('bomb', 'assets/bomb.png');
        this.game.load.image('background', 'assets/background.png');
        this.game.load.spritesheet('backButton', 'assets/backButton.png', 128, 64);
        this.game.load.spritesheet('replayButton', 'assets/replayButton.png', 128, 64);
        this.game.load.spritesheet('playButton', 'assets/playButton.png', 128, 64);
        this.game.load.image('clouddown', 'assets/clouddown.png');
        this.game.load.image('cloudtop', 'assets/cloudtop.png');
        this.game.load.image('live', 'assets/live.png');
        this.game.load.image('instruction', 'assets/instruction.png');
        this.game.load.image('title', 'assets/title.png');
        this.game.load.spritesheet('pause', 'assets/pause.png', 48, 48);
        this.game.load.spritesheet('soundButton', 'assets/soundButton.png', 128, 48);
        this.game.load.audio('collision', 'assets/collision.ogg');
        this.game.load.audio('coin', 'assets/coin.ogg');
        this.game.load.audio('music', 'assets/music.ogg');
        this.game.load.audio('live', 'assets/live.ogg');
        this.game.load.audio('speed', 'assets/speed.ogg');
        this.game.load.audio('explosion', 'assets/explosion.ogg');
        this.game.load.audio('click', 'assets/click.ogg');
    },
    create: function () {
        this.game.state.start('MainMenu');
    },
    startMainMenu: function () {}
}
