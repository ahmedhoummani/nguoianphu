Game.MainMenu = function (game) {};
Game.MainMenu.prototype = {
    create: function () {
        click = this.game.add.audio('click');
        back = this.game.add.tileSprite(0, 0, 320, 480, 'background');
        title = this.game.add.sprite(-200, 250, 'title');
        titleTween = this.game.add.tween(title);
        titleTween.to({
            x: 20,
            y: 30
        }, 1000, Phaser.Easing.Cubic.Out, true);
        titleTween.start();
        playButton = this.game.add.button(-160, 220, 'playButton', function () {
            this.game.fading.fadeAndPlay("rgb(0,0,0)", 0.5, "Instruction");
        }, this, 0, 0, 1);
        playButton.setDownSound(click);
        playTween = this.game.add.tween(playButton);
        playTween.to({
            x: 96
        }, 1000, Phaser.Easing.Cubic.Out, true);
        playTween.start();
        soundButton = this.game.add.button(500, 310, 'soundButton', this.musicONOFF, this);
        soundTween = this.game.add.tween(soundButton);
        soundTween.to({
            x: 96
        }, 1000, Phaser.Easing.Cubic.Out, true);
        soundTween.start();
        this.game.add.bitmapText(2, 2, 'font', 'BY ABDELLAH SABIRI', 24);
        this.game.add.bitmapText(2, 432, 'font', 'MUSIC BY ERIC MATTYAS ', 24);
        this.game.add.bitmapText(2, 452, 'font', ' WWW SOUNDIMAGE ORG', 24);
        if (JSON.parse(localStorage.getItem('distanceMax'))) {
            h = this.game.add.bitmapText(0, 380, 'font', 'HIGH DISTANCE ' + Math.floor(JSON.parse(localStorage.getItem('distanceMax'))), 32);
            h.x = this.game.width / 2 - h.textWidth / 2
        } else {
            localStorage.setItem('distanceMax', JSON.stringify(0));
            console.log('SAVED!!');
        }
    },
    update: function () {
        back.tilePosition.x -= 1;
    },
    musicONOFF: function () {
        if (musicON) {
            click.play();
            musicON = false;
            soundButton.frame = 1;
        } else {
            click.play();
            musicON = true;
            soundButton.frame = 0;
        }
    }
}
