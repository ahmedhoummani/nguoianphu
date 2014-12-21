
var Candy = {};
Candy.Boot = function (game) {};
Candy.Boot.prototype = {
    preload: function () {
        this.load.image('preloaderBar', 'img/loading-bar.png');
        this.load.image('preloaderBackground', 'img/screen-loading.png');
        this.load.image('screenRotate', 'img/screen-rotate.png')
    },
    create: function () {
        this.input.maxPointers = 2;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (!this.game.device.desktop && !this.isFFOS) {
            this.scale.forceOrientation(true, false, 'screenRotate')
        }
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Preloader')
    },
    isFFOS: function () {
        return (!!"mozApps" in navigator && navigator.userAgent.search("Mobile")) != -1
    }
};
Candy.Preloader = function (game) {
    this.background = null;
    this.preloadBar = null;
    Candy.GAME_WIDTH = 640;
    Candy.GAME_HEIGHT = 960
};
Candy.Preloader.prototype = {
    preload: function () {
        this.stage.backgroundColor = '#B4D9E7';
        this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite((Candy.GAME_WIDTH - 289) / 2, (Candy.GAME_HEIGHT - 45 + 230) / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        this.load.image('background', 'img/background.png');
        this.load.image('floor', 'img/floor.png');
        this.load.image('monster-cover', 'img/monster-cover.png');
        this.load.image('title', 'img/title.png');
        this.load.image('explosion', 'img/explosion.png');
        this.load.image('score-bg', 'img/score-bg.png');
        this.load.image('button-blackmoon', 'img/button-blackmoon.png');
        this.load.image('button-enclave', 'img/button-enclave.png');
        this.load.image('monster-sleeps', 'img/monster-sleeps.png');
        this.load.image('screen-story', 'img/screen-story.png');
        this.load.image('screen-overlay', 'img/screen-overlay.png');
        this.load.image('screen-achievements', 'img/screen-achievements.png');
        this.load.image('screen-completed', 'img/screen-completed.png');
        this.load.image('text-paused', 'img/text-paused.png');
        this.load.image('text-gameover', 'img/text-gameover.png');
        this.load.image('text-highscore', 'img/text-highscore.png');
        this.load.image('text-overall', 'img/text-overall.png');
        this.load.image('text-newbestscore', 'img/text-newbestscore.png');
        this.load.image('howto-bomb', 'img/howto-bomb.png');
        this.load.image('howto-monster', 'img/howto-monster.png');
        this.load.image('howto-path', 'img/howto-path.png');
        this.load.image('howto-super', 'img/howto-super.png');
        this.load.image('message-newcandy', 'img/message-newcandy.png');
        this.load.image('candy-red', 'img/candy-red.png');
        this.load.image('candy-marshmallow', 'img/candy-marshmallow.png');
        this.load.image('candy-jelly', 'img/candy-jelly.png');
        this.load.image('candy-donut', 'img/candy-donut.png');
        this.load.image('candy-cupcake', 'img/candy-cupcake.png');
        this.load.image('candy-pink', 'img/candy-pink.png');
        this.load.image('candy-lollipop', 'img/candy-lollipop.png');
        this.load.image('candy-icecream', 'img/candy-icecream.png');
        this.load.image('candy-teddy', 'img/candy-teddy.png');
        this.load.image('candy-cake', 'img/candy-cake.png');
        this.load.image('candy-chocolate', 'img/candy-chocolate.png');
        this.load.image('candy-super', 'img/candy-super.png');
        this.load.image('candy-bomb', 'img/candy-bomb.png');
        this.load.image('achievement-marshmallow', 'img/achievement-marshmallow.png');
        this.load.image('achievement-jelly', 'img/achievement-jelly.png');
        this.load.image('achievement-donut', 'img/achievement-donut.png');
        this.load.image('achievement-cupcake', 'img/achievement-cupcake.png');
        this.load.image('achievement-pink', 'img/achievement-pink.png');
        this.load.image('achievement-lollipop', 'img/achievement-lollipop.png');
        this.load.image('achievement-icecream', 'img/achievement-icecream.png');
        this.load.image('achievement-teddy', 'img/achievement-teddy.png');
        this.load.image('achievement-cake', 'img/achievement-cake.png');
        this.load.image('achievement-chocolate', 'img/achievement-chocolate.png');
        this.load.image('achievement-super', 'img/achievement-super.png');
        this.load.image('achievement-cape', 'img/achievement-cape.png');
        this.load.image('achievement-crown', 'img/achievement-crown.png');
        this.load.image('achievement-win', 'img/achievement-win.png');
        this.load.image('life-full', 'img/life-full.png');
        this.load.image('life-empty', 'img/life-empty.png');
        this.load.text('font-ttf', 'fonts/comicbook.ttf');
        this.load.text('font-svg', 'fonts/comicbook.svg');
        this.load.text('font-ttf', 'fonts/comicbook.ttf');
        this.load.text('font-woff', 'fonts/comicbook.woff');
        this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
        this.load.spritesheet('button-moregames', 'img/button-moregames.png', 358, 133);
        this.load.spritesheet('button-continue', 'img/button-continue.png', 358, 133);
        this.load.spritesheet('button-back', 'img/button-back.png', 358, 133);
        this.load.spritesheet('button-restart', 'img/button-restart.png', 363, 131);
        this.load.spritesheet('button-achievements', 'img/button-achievements.png', 363, 131);
        this.load.spritesheet('button-audio', 'img/button-audio.png', 111, 96);
        this.load.spritesheet('button-pause', 'img/button-pause.png', 96, 98);
        this.load.spritesheet('killmarker', 'img/killmarker.png', 83, 83);
        this.load.spritesheet('monster-basic-idle', 'img/monster-basic-idle.png', 103, 131);
        this.load.spritesheet('monster-basic-eats', 'img/monster-basic-eats.png', 111, 136);
        this.load.spritesheet('monster-crown-idle', 'img/monster-crown-idle.png', 103, 144);
        this.load.spritesheet('monster-crown-eats', 'img/monster-crown-eats.png', 127, 136);
        this.load.spritesheet('monster-cape-idle', 'img/monster-cape-idle.png', 148, 127);
        this.load.spritesheet('monster-cape-eats', 'img/monster-cape-eats.png', 148, 136);
        this.load.spritesheet('monster-king-idle', 'img/monster-king-idle.png', 148, 144);
        this.load.spritesheet('monster-king-eats', 'img/monster-king-eats.png', 148, 136);
        this.load.audio('audio-click', ['audio/click.ogg', 'audio/click.mp3']);
        this.load.audio('audio-eating', ['audio/eating.ogg', 'audio/eating.mp3']);
        this.load.audio('audio-music', ['audio/music.ogg', 'audio/music.mp3']);
        this.load.audio('audio-newlevel', ['audio/newlevel.ogg', 'audio/newlevel.mp3'])
    },
    create: function () {
        this.state.start('MainMenu')
    }
};
Candy.MainMenu = function (game) {
    blackmoonButton = null;
    enclaveButton = null;
    audioStatus = false;
    audioOffset = 0;
    soundClick = null;
    soundMusic = null
};
Candy.MainMenu.prototype = {
    create: function () {
        this.add.sprite(0, 0, 'background');
        this.add.sprite(-170, Candy.GAME_HEIGHT - 514 + 20, 'monster-cover');
        highscoreTxt = this.add.sprite(10, 140, 'text-highscore');
        highscoreBg = this.add.sprite(5, 210, 'score-bg');
        highscoreText = this.add.text(150, 252, "0", {
            font: "36px ComicBook",
            fill: "#FFCC00"
        });
        highscoreText.anchor.setTo(0.5, 0.5);
        highscoreText.x = (213 + 75 - highscoreText.width) * 0.5;
        overallTxt = this.add.sprite(10, 310, 'text-overall');
        overallBg = this.add.sprite(5, 360, 'score-bg');
        totalscoreText = this.add.text(150, 402, "0", {
            font: "36px ComicBook",
            fill: "#FFCC00"
        });
        totalscoreText.anchor.setTo(0.5, 0.5);
        totalscoreText.x = (213 + 75 - totalscoreText.width) * 0.5;
        var title = this.add.sprite(Candy.GAME_WIDTH - 395 - 5, 140, 'title');
        this.buttonStart = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 143 - 10, 'button-start', this.clickStart, this, 1, 0, 2);
        this.buttonMoreGames = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 143 - 130 - 130 - 3, 'button-moregames', this.clickMoreGames, this, 1, 0, 2);
        this.buttonMoreGames.scale = {
            x: 0.75,
            y: 0.75
        };
        this.buttonAchievements = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 143 - 130 - 20, 'button-achievements', this.clickAchievements, this, 1, 0, 2);
        this.buttonBlackmoon = this.add.button(10, -87, 'button-blackmoon', this.clickBlackmoon, this);
        this.buttonEnclave = this.add.button(157 + 15, -87, 'button-enclave', this.clickEnclave, this);
        this.buttonAudio = this.add.button(Candy.GAME_WIDTH - 111 - 10, -96, 'button-audio', this.manageAudio, this, 1, 0, 2);
        this.buttonStart.input.useHandCursor = true;
        this.buttonMoreGames.input.useHandCursor = true;
        this.buttonAchievements.input.useHandCursor = true;
        this.buttonBlackmoon.input.useHandCursor = true;
        this.buttonEnclave.input.useHandCursor = true;
        this.buttonAudio.input.useHandCursor = true;
        storageAPI.initUnset('highscore', 0);
        var highscore = storageAPI.get('highscore');
        highscoreText.setText(highscore);
        storageAPI.initUnset('totalscore', 0);
        var totalscore = storageAPI.get('totalscore');
        totalscoreText.setText('' + totalscore);
        this.initAudio();
        this.add.tween(this.buttonStart)
            .to({
                x: Candy.GAME_WIDTH - 401 - 10
            }, 1000, Phaser.Easing.Exponential.Out, true, 0, false);
        this.add.tween(this.buttonAchievements)
            .to({
                x: Candy.GAME_WIDTH - 363 - 10
            }, 1000, Phaser.Easing.Exponential.Out, true, 100, false);
        this.add.tween(this.buttonMoreGames)
            .to({
                x: Candy.GAME_WIDTH - 268 - 15
            }, 1000, Phaser.Easing.Exponential.Out, true, 200, false);
        this.add.tween(this.buttonBlackmoon)
            .to({
                y: 10
            }, 1000, Phaser.Easing.Bounce.Out, true, 0, false);
        this.add.tween(this.buttonEnclave)
            .to({
                y: 10
            }, 1000, Phaser.Easing.Bounce.Out, true, 50, false);
        this.add.tween(this.buttonAudio)
            .to({
                y: 10
            }, 1000, Phaser.Easing.Bounce.Out, true, 100, false);
        highscoreText.alpha = 0;
        highscoreTxt.alpha = 0;
        highscoreBg.alpha = 0;
        totalscoreText.alpha = 0;
        overallTxt.alpha = 0;
        overallBg.alpha = 0;
        this.add.tween(highscoreText)
            .to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.add.tween(highscoreTxt)
            .to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.add.tween(highscoreBg)
            .to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.add.tween(totalscoreText)
            .to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.add.tween(overallTxt)
            .to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.add.tween(overallBg)
            .to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)
    },
    initAudio: function () {
        storageAPI.initUnset('audio', false);
        this.audioStatus = storageAPI.get('audio');
        this.soundClick = this.add.audio('audio-click');
        this.soundMusic = this.add.audio('audio-music', 1, true);
        this.soundMusic.volume = 0.5;
        if (this.audioStatus) {
            this.audioOffset = 0;
            this.soundMusic.play('', 0, 1, true)
        } else {
            this.audioOffset = 3
        }
        this.buttonAudio.setFrames(this.audioOffset + 1, this.audioOffset + 0, this.audioOffset + 2)
    },
    manageAudio: function () {
        this.audioStatus = !this.audioStatus;
        storageAPI.set('audio', this.audioStatus);
        if (this.audioStatus) {
            this.audioOffset = 0;
            this.soundMusic.play('', 0, 1, true);
            this.soundClick.play()
        } else {
            this.audioOffset = 3;
            this.soundMusic.stop()
        }
        this.buttonAudio.setFrames(this.audioOffset + 1, this.audioOffset + 0, this.audioOffset + 2)
    },
    clickStart: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        this.audioStatus = false;
        this.audioOffset = 0;
        this.soundMusic.stop();
        this.state.start('StoryHowto')
    },
    clickAchievements: function () {
        if (this.audioStatus) {
            this.soundClick.play();
            this.soundMusic.stop()
        }
        this.state.start('Achievements')
    },
    clickBlackmoon: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        window.top.open('http://blackmoondev.com/')
    },
    clickEnclave: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        window.top.open('http://enclavegames.com/')
    },
    clickMoreGames: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        window.top.open('http://enclavegames.com/games.html')
    }
};
Candy.Achievements = function (game) {};
Candy.Achievements.prototype = {
    create: function () {
        this.backButton = this.add.button(0, 0, 'screen-achievements', function () {
            this.state.start('MainMenu')
        }, this);
        var totalscore = storageAPI.get('totalscore');
        candyUnlockLevels = [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000];
        candyActualLevel = 0;
        for (var i = 0, len = candyUnlockLevels.length; i < len; i++) {
            if (totalscore >= candyUnlockLevels[i]) {
                candyActualLevel = i
            }
        }
        var text = {
            t40px: {
                font: "40px ComicBook",
                fill: "#FFF",
                stroke: "#000",
                strokeThickness: 6
            },
            t32px: {
                font: "32px ComicBook",
                fill: "#FFF",
                stroke: "#000",
                strokeThickness: 6
            },
            t24px: {
                font: "24px ComicBook",
                fill: "#FFF",
                stroke: "#000",
                strokeThickness: 6
            }
        };
        var opacityTable = [];
        for (var o = 0; o < candyUnlockLevels.length; o++) {
            opacityTable[o] = 0.6
        }
        for (var i = 0; i < candyActualLevel; i++) {
            opacityTable[i] = 1
        }
        this.add.sprite(134, 128, 'text-overall');
        this.add.sprite(290, 116, 'score-bg');
        var scoreText = this.add.text(400, 130, "" + totalscore, text.t40px);
        scoreText.x = 290 + (213 + 75 - scoreText.width) * 0.5;
        this.add.text(20, 206, "Collect points to unlock new candy!", text.t32px);
        this.add.text(40, 246, "New candy is worth more points!", text.t32px);
        this.add.sprite(1, 300, 'achievement-marshmallow')
            .alpha = opacityTable[0];
        this.add.text(20, 316, '10', text.t40px)
            .alpha = opacityTable[0];
        this.add.sprite((Candy.GAME_WIDTH - 321 + 2), 300, 'achievement-jelly')
            .alpha = opacityTable[1];
        this.add.text(340, 158 * 2, '25', text.t40px)
            .alpha = opacityTable[1];
        this.add.sprite(1, 195 * 2, 'achievement-donut')
            .alpha = opacityTable[2];
        this.add.text(10 * 2, 203 * 2, '50', text.t40px)
            .alpha = opacityTable[2];
        this.add.sprite((Candy.GAME_WIDTH - 321 + 2), 195 * 2, 'achievement-cupcake')
            .alpha = opacityTable[3];
        this.add.text(170 * 2, 203 * 2, '100', text.t32px)
            .alpha = opacityTable[3];
        this.add.sprite(1, 240 * 2, 'achievement-pink')
            .alpha = opacityTable[4];
        this.add.text(5 * 2, 249 * 2, '250', text.t32px)
            .alpha = opacityTable[4];
        this.add.sprite((Candy.GAME_WIDTH - 321 + 2), 480, 'achievement-lollipop')
            .alpha = opacityTable[5];
        this.add.text(165 * 2, 249 * 2, '500', text.t32px)
            .alpha = opacityTable[5];
        this.add.sprite(1, 285 * 2, 'achievement-icecream')
            .alpha = opacityTable[6];
        this.add.text(10 * 2, 295 * 2, '1K', text.t32px)
            .alpha = opacityTable[6];
        this.add.sprite((Candy.GAME_WIDTH - 321 + 2), 285 * 2, 'achievement-teddy')
            .alpha = opacityTable[7];
        this.add.text(170 * 2, 295 * 2, '2K', text.t32px)
            .alpha = opacityTable[7];
        this.add.sprite(1, 330 * 2, 'achievement-cake')
            .alpha = opacityTable[8];
        this.add.text(5 * 2, 340 * 2, '5K', text.t32px)
            .alpha = opacityTable[8];
        this.add.sprite((Candy.GAME_WIDTH - 321 + 2), 660, 'achievement-chocolate')
            .alpha = opacityTable[9];
        this.add.text(165 * 2, 340 * 2, '10K', text.t32px)
            .alpha = opacityTable[9];
        this.add.sprite(1, 375 * 2, 'achievement-crown')
            .alpha = opacityTable[10];
        this.add.text(5 * 2, 385 * 2, '25K', text.t32px)
            .alpha = opacityTable[10];
        this.add.sprite((Candy.GAME_WIDTH - 321 + 2), 375 * 2, 'achievement-cape')
            .alpha = opacityTable[11];
        this.add.text(165 * 2, 385 * 2, '50K', text.t32px)
            .alpha = opacityTable[11];
        this.add.sprite(((Candy.GAME_WIDTH - 243 * 2) / 2), 418 * 2, 'achievement-win');
        this.add.text(50 * 2, 428 * 2, '100 000', text.t32px)
    }
};
Candy.StoryHowto = function (game) {};
Candy.StoryHowto.prototype = {
    create: function () {
        this.fontText = {
            font: "48px ComicBook",
            fill: "#FFCC00",
            stroke: "#642D07",
            strokeThickness: 12
        };
        this.showStory()
    },
    showStory: function () {
        this.audioStatus = storageAPI.get('audio') || false;
        this.soundClick = this.add.audio('audio-click');
        this.add.sprite(0, 0, 'background');
        this.add.sprite(0, 0, 'screen-story');
        this.add.text(10, 10, "Evil King kidnapped", this.fontText);
        this.add.text(320, 60, "your love!", this.fontText);
        this.add.text(10, 360, "Collect", this.fontText);
        this.add.text(10, 410, "enough candy", this.fontText);
        this.add.text(10, 460, "to get her back!", this.fontText);
        this.buttonContinue = this.add.button(-358, Candy.GAME_HEIGHT - 133 - 10, 'button-continue', this.showHowto, this, 1, 0, 2);
        this.buttonContinue.input.useHandCursor = true;
        this.add.tween(this.buttonContinue)
            .to({
                x: Candy.GAME_WIDTH - 358 - 10
            }, 300, Phaser.Easing.Exponential.Out, true, 0, false)
    },
    showHowto: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        this.add.sprite(0, 0, 'background');
        this.add.sprite(420, 320, 'howto-bomb');
        var monster = this.add.sprite(-20, Candy.GAME_HEIGHT - 262 - 5, 'howto-monster');
        monster.scale = {
            x: 2,
            y: 2
        };
        this.add.sprite(20, 80, 'howto-path');
        this.add.sprite(320, 586, 'life-full');
        this.add.sprite(410, 586, 'life-full');
        this.add.sprite(500, 586, 'life-empty');
        this.add.text(120, 10, "HOW TO PLAY", {
            font: "52px ComicBook",
            fill: "#FFCC00",
            stroke: "#642D07",
            strokeThickness: 12
        });
        this.add.text(160, 190, "Tap the candy", this.fontText);
        this.add.text(240, 240, "to collect it!", this.fontText);
        this.add.text(60, 350, "Watch out", this.fontText);
        this.add.text(60, 400, "for the bomb!", this.fontText);
        this.add.text(20, 510, "If the candy fell off", this.fontText);
        this.add.text(20, 560, "the screen", this.fontText);
        this.add.text(260, 670, "you will lose", this.fontText);
        this.add.text(380, 720, "one life!", this.fontText);
        this.buttonContinue = this.add.button(-358, Candy.GAME_HEIGHT - 133 - 10, 'button-continue', this.startGame, this, 1, 0, 2);
        this.buttonContinue.input.useHandCursor = true;
        this.add.tween(this.buttonContinue)
            .to({
                x: Candy.GAME_WIDTH - 358 - 10
            }, 300, Phaser.Easing.Exponential.Out, true, 0, false)
    },
    startGame: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        this.state.start('Game')
    }
};
Candy.Game = function (game) {
    player = null;
    playerStatus = null;
    playerStatusTable = null;
    candy = null;
    scoreText = null;
    explosion = null;
    newCandyMessage = null;
    gamePaused = false;
    gameNewCandy = false;
    gameOver = false;
    runOnce = false;
    runOnce2 = false;
    runOnce3 = false;
    pauseButtonDisabled = false;
    audioStatus = false;
    audioOffset = 0;
    soundClick = null;
    soundMusic = null;
    candyUnlockLevels = [];
    candyActualLevel = 0;
    score = 0;
    scoreGameCompleted = 0;
    globalTimer = 0;
    spawnCandyTimer = 0;
    totalScore = 0;
    candyEnum = {
        'red': 0,
        'marshmallow': 1,
        'jelly': 2,
        'donut': 3,
        'cupcake': 4,
        'pink': 5,
        'lollipop': 6,
        'icecream': 7,
        'teddy': 8,
        'cake': 9,
        'chocolate': 10,
        'super': 11,
        'bomb': 12
    };
    candyList = ['red', 'marshmallow', 'jelly', 'donut', 'cupcake', 'pink', 'lollipop', 'icecream', 'teddy', 'cake', 'chocolate', 'super', 'bomb'];
    livesCount = 0;
    lives = null
};
Candy.Game.prototype = {
    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        gamePaused = false;
        gameOver = false;
        pauseButtonDisabled = false;
        globalTimer = 0;
        spawnCandyTimer = 0;
        score = 0;
        scoreGameCompleted = 100000;
        livesCount = 3;
        runOnce = false;
        runOnce2 = false;
        runOnce3 = false;
        this.add.sprite(0, 0, 'background');
        this.add.sprite(-460, Candy.GAME_HEIGHT - 160, 'floor');
        this.add.sprite(10, 10, 'score-bg');
        pausedScreen = this.add.sprite(0, 0, 'screen-overlay');
        pausedScreenText = this.add.sprite((Candy.GAME_WIDTH - 430) * 0.5, 210, 'text-paused');
        gameOverText = this.add.sprite((Candy.GAME_WIDTH - 594) * 0.5, 210, 'text-gameover');
        newHighscoreText = this.add.sprite(30, 74, 'text-newbestscore');
        newCandyMessage = this.add.sprite(Candy.GAME_WIDTH * 0.5, 320, 'message-newcandy');
        newCandyMessage.anchor.setTo(0.5, 0.5);
        newCandyMessage.scale = {
            x: 0.01,
            y: 0.01
        };
        newCandyMessage.visible = false;
        pausedScreen.visible = false;
        pausedScreenText.alpha = 0;
        gameOverText.alpha = 0;
        newHighscoreText.visible = false;
        buttonBack = this.add.button(-358, Candy.GAME_HEIGHT - 133 - 110, 'button-back', this.backToMain, this, 1, 0, 2);
        buttonContinue = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 131 - 270, 'button-continue', function () {
            pauseButtonDisabled = false;
            this.managePause()
        }, this, 1, 0, 2);
        buttonRestart = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 131 - 270, 'button-restart', this.restartGame, this, 1, 0, 2);
        buttonPause = this.add.button(Candy.GAME_WIDTH - 96 - 10, 10, 'button-pause', this.managePause, this, 1, 0, 2);
        buttonBack.input.useHandCursor = true;
        buttonContinue.input.useHandCursor = true;
        buttonRestart.input.useHandCursor = true;
        buttonPause.input.useHandCursor = true;
        this.totalScore = storageAPI.get('totalscore');
        candyUnlockLevels = [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
        candyActualLevel = 0;
        for (var i = 0, len = candyUnlockLevels.length; i < len; i++) {
            if (this.totalScore >= candyUnlockLevels[i]) {
                candyActualLevel = i + 1
            }
        }
        playerBasicIdle = this.add.sprite(55 * 2, 385 * 2, 'monster-basic-idle');
        playerBasicIdle.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
        playerBasicIdle.animations.play('anim');
        playerBasicIdle.visible = false;
        playerBasicIdle.anchor.setTo(0.5, 0.5);
        playerBasicIdle.scale = {
            x: 2,
            y: 2
        };
        playerBasicEating = this.add.sprite(65 * 2, 380 * 2, 'monster-basic-eats');
        playerBasicEating.animations.add('anim', [0, 1, 2, 3], 10, true);
        playerBasicEating.animations.play('anim');
        playerBasicEating.visible = false;
        playerBasicEating.anchor.setTo(0.5, 0.5);
        playerBasicEating.scale = {
            x: 2,
            y: 2
        };
        playerCrownIdle = this.add.sprite(55 * 2, 374 * 2, 'monster-crown-idle');
        playerCrownIdle.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
        playerCrownIdle.animations.play('anim');
        playerCrownIdle.visible = false;
        playerCrownIdle.anchor.setTo(0.5, 0.5);
        playerCrownIdle.scale = {
            x: 2,
            y: 2
        };
        playerCrownEating = this.add.sprite(57 * 2, 380 * 2, 'monster-crown-eats');
        playerCrownEating.animations.add('anim', [0, 1, 2, 3], 10, true);
        playerCrownEating.animations.play('anim');
        playerCrownEating.visible = false;
        playerCrownEating.anchor.setTo(0.5, 0.5);
        playerCrownEating.scale = {
            x: 2,
            y: 2
        };
        playerKingIdle = this.add.sprite(66 * 2, 375 * 2, 'monster-king-idle');
        playerKingIdle.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 10, true);
        playerKingIdle.animations.play('anim');
        playerKingIdle.visible = false;
        playerKingIdle.anchor.setTo(0.5, 0.5);
        playerKingIdle.scale = {
            x: 2,
            y: 2
        };
        playerKingEating = this.add.sprite(60 * 2, 380 * 2, 'monster-king-eats');
        playerKingEating.animations.add('anim', [0, 1, 2, 3], 10, true);
        playerKingEating.animations.play('anim');
        playerKingEating.visible = false;
        playerKingEating.anchor.setTo(0.5, 0.5);
        playerKingEating.scale = {
            x: 2,
            y: 2
        };
        playerStatusTable = {
            'basic': {
                'idle': playerBasicIdle,
                'eating': playerBasicEating
            },
            'crown': {
                'idle': playerCrownIdle,
                'eating': playerCrownEating
            },
            'king': {
                'idle': playerKingIdle,
                'eating': playerKingEating
            }
        };
        if (this.totalScore >= 50000) {
            playerStatus = 'king'
        } else if (this.totalScore >= 25000) {
            playerStatus = 'crown'
        } else {
            playerStatus = 'basic'
        }
        player = playerStatusTable[playerStatus]['idle'];
        player.visible = true;
        buttonAudio = this.add.button(Candy.GAME_WIDTH - 111 - 10, -96, 'button-audio', this.manageAudio, this);
        buttonAudio.visible = false;
        this.initAudio();
        scoreText = this.add.text(120, 28, "0", {
            font: "40px ComicBook",
            fill: "#FFCC00",
            align: "center"
        });
        scoreText.x = (213 + 75 - scoreText.width) * 0.5;
        for (var e = 0; e < 3; e++) {
            var empty = this.add.sprite(560 - (90 * (e + 1)), 50, 'life-empty');
            empty.anchor.setTo(0.5, 0.5)
        }
        lives = this.add.group();
        for (var i = 0; i < 3; i++) {
            life = lives.create(560 - (90 * (i + 1)), 50, 'life-full', i);
            life.anchor.setTo(0.5, 0.5);
            life.scale = {
                x: 0.01,
                y: 0.01
            };
            this.add.tween(life.scale)
                .to({
                    x: 1,
                    y: 1
                }, 2500, Phaser.Easing.Elastic.Out, true, 600 - 300 * i)
        }
        candyGroup = this.add.group();
        candyGroup.enableBody = true;
        candyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.spawnCandy();
        this._canvasID = document.getElementsByTagName("canvas")[0];
        this._canvas = this._canvasID.getContext("2d")
    },
    managePause: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        if (!pauseButtonDisabled) {
            gamePaused = !gamePaused;
            if (!gamePaused) {
                runOnce = false;
                runOnce2 = false;
                runOnce3 = false;
                if (newCandyMessage.visible) {
                    var newCandyTween = this.add.tween(newCandyMessage.scale);
                    newCandyTween.to({
                        x: 0.01,
                        y: 0.01
                    }, 500, Phaser.Easing.Elastic.Out);
                    newCandyTween.onComplete.addOnce(function () {
                        newCandyMessage.visible = false;
                        gameNewCandy = false
                    }, this);
                    newCandyTween.start()
                }
                this.add.tween(pausedScreenText)
                    .to({
                        alpha: 0
                    }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.add.tween(buttonAudio)
                    .to({
                        y: -96
                    }, 300, Phaser.Easing.Exponential.Out, true, 0, 0, false);
                this.add.tween(buttonBack)
                    .to({
                        x: -358
                    }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
                this.manageAnimations('on');
                var continueTween = this.add.tween(buttonContinue);
                continueTween.to({
                    x: Candy.GAME_WIDTH
                }, 300, Phaser.Easing.Exponential.Out);
                continueTween.onComplete.addOnce(function () {
                    pausedScreen.visible = false
                }, this);
                continueTween.start()
            }
        }
    },
    playerAnimation: function (animation) {
        player.visible = false;
        player = playerStatusTable[playerStatus][animation];
        player.visible = true
    },
    clickCandy: function (candy) {
        if (this.input.activePointer.isDown) {
            this.playerAnimation('eating');
            if (this.audioStatus) {
                this.soundEating.play()
            }
            candy.inputEnabled = false;
            if (!gamePaused) {
                if (candy.type == candyEnum.bomb) {
                    explosion = this.add.sprite(candy.x, candy.y, 'explosion');
                    explosion.anchor.setTo(0.5, 0.5);
                    explosion.scale = {
                        x: 0.01,
                        y: 0.01
                    };
                    candy.kill();
                    this.playerAnimation('idle');
                    var gameoverTween = this.add.tween(explosion.scale);
                    gameoverTween.to({
                        x: 1,
                        y: 1
                    }, 500, Phaser.Easing.Elastic.Out);
                    gameoverTween.onComplete.addOnce(function () {
                        gameOver = true
                    }, this);
                    gameoverTween.start()
                } else {
                    if (candy.type == candyEnum.super) {
                        score += 30
                    } else {
                        score += (candy.type + 1)
                    }
                    var destination = candy.y - 100;
                    var pointsAdded = this.add.text(candy.x, candy.y, '+' + (candy.type + 1), {
                        font: "48px ComicBook",
                        fill: "#FFCC00",
                        stroke: "#663399",
                        strokeThickness: 10
                    });
                    pointsAdded.anchor.setTo(0.5, 0.5);
                    this.add.tween(pointsAdded)
                        .to({
                            alpha: 0,
                            y: destination
                        }, 1000, Phaser.Easing.Linear.None)
                        .start();
                    scoreText.setText(score);
                    scoreText.x = (213 + 75 - scoreText.width) * 0.5;
                    candy.body = null;
                    var eatTween = this.add.tween(candy);
                    eatTween.to({
                        x: 140,
                        y: 800
                    }, 250, Phaser.Easing.Linear.None);
                    eatTween.onComplete.addOnce(function () {
                        candy.kill();
                        this.playerAnimation('idle')
                    }, this);
                    eatTween.start();
                    if (score + this.totalScore >= candyUnlockLevels[candyActualLevel]) {
                        candyActualLevel += 1;
                        gameNewCandy = true;
                        gamePaused = true;
                        if (this.audioStatus) {
                            this.soundNewlevel.play()
                        }
                    }
                    if (score >= scoreGameCompleted) {
                        this.add.sprite(0, 0, 'screen-completed')
                    }
                }
            }
        }
    },
    spawnCandy: function () {
        var candyType = null;
        candyType = Math.floor(Math.random() * candyActualLevel);
        var randomizeCandyType = Math.floor(Math.random() * 100);
        if (randomizeCandyType == 13) {
            candyType = candyEnum.super
        } else if (randomizeCandyType > 90) {
            candyType = candyEnum.bomb
        }
        var launchPosition = Math.floor(Math.random() * 2) * (Candy.GAME_WIDTH);
        candy = candyGroup.create(launchPosition, Candy.GAME_HEIGHT, 'candy-' + candyList[candyType]);
        candy.type = candyType;
        candy.inputEnabled = true;
        candy.events.onInputDown.add(this.clickCandy, this);
        candy.events.onInputOver.add(this.clickCandy, this);
        var horizontalDirection = (launchPosition) ? -1 : 1;
        var horizontalMovement = horizontalDirection * (Math.floor(Math.random() * 200));
        candy.body.velocity.x = horizontalMovement * 2;
        candy.body.velocity.y = -(Math.floor(Math.random() * 150) + 400) * 2;
        candy.body.gravity.y = 300 * 2;
        candy.anchor.setTo(0.5, 0.5);
        candy.scale = {
            x: 2,
            y: 2
        };
        candy.rotateMe = (Math.random() * 8) - 4;
        candy.cachedVelocity = {};
        candy.active = true;
        candy.checkWorldBounds = true;
        candy.events.onOutOfBounds.add(this.resetCandy, this)
    },
    update: function () {
        if (window.navigator && window.navigator.userAgent.indexOf('534.30') > 0) {
            if (this._canvas.style.opacity !== undefined) {
                this._canvas.style.opacity = 0.99;
                setTimeout(function () {
                    this._canvas.style.opacity = 1
                }, 0)
            }
        }
        if (gameOver) {
            if (!runOnce) {
                var oldScore = storageAPI.get('highscore');
                var newTotalscore = this.totalScore + score;
                storageAPI.setHighscore('highscore', score);
                storageAPI.set('totalscore', newTotalscore);
                runOnce = true;
                this.manageAnimations('off');
                pausedScreen.visible = true;
                pausedScreen.bringToTop();
                if (score > oldScore) {
                    newHighscoreText.visible = true;
                    newHighscoreText.bringToTop()
                }
                buttonAudio.visible = true;
                buttonAudio.bringToTop();
                gameOverText.bringToTop();
                this.add.tween(gameOverText)
                    .to({
                        alpha: 1
                    }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                buttonBack.bringToTop();
                buttonRestart.visible = true;
                buttonRestart.bringToTop();
                this.add.tween(buttonBack)
                    .to({
                        x: (Candy.GAME_WIDTH - 358) * 0.5
                    }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
                this.add.tween(buttonRestart)
                    .to({
                        x: (Candy.GAME_WIDTH - 363) * 0.5
                    }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
                pauseButtonDisabled = true;
                this.add.sprite(10, 10, 'score-bg');
                scoreText = this.add.text(120, 28, score, {
                    font: "40px ComicBook",
                    fill: "#FFCC00",
                    align: "center"
                });
                scoreText.x = (213 + 75 - scoreText.width) * 0.5
            }
        } else if (!gamePaused) {
            spawnCandyTimer += this.time.elapsed;
            globalTimer += this.time.elapsed;
            var numberOfCandy = Math.ceil(globalTimer / 20000);
            var numberOfSeconds = (2000 - score) / Math.ceil(globalTimer / 60000);
            if (spawnCandyTimer > numberOfSeconds) {
                spawnCandyTimer = 0;
                for (var i = 0; i < numberOfCandy; i++) {
                    this.spawnCandy()
                }
            }
            var that = this;
            candyGroup.forEach(function (candy) {
                candy.angle += candy.rotateMe
            })
        } else {
            if (gameNewCandy) {
                if (!runOnce2) {
                    runOnce2 = true;
                    pausedScreen.visible = true;
                    pausedScreen.bringToTop();
                    newCandyMessage.visible = true;
                    newCandyMessage.bringToTop();
                    this.add.tween(newCandyMessage.scale)
                        .to({
                            x: 1,
                            y: 1
                        }, 1500, Phaser.Easing.Elastic.Out)
                        .start();
                    buttonContinue.visible = true;
                    buttonContinue.bringToTop();
                    this.add.tween(buttonContinue)
                        .to({
                            x: (Candy.GAME_WIDTH - 358) * 0.5
                        }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
                    this.manageAnimations('off')
                }
            } else {
                if (!runOnce3) {
                    runOnce3 = true;
                    pausedScreen.visible = true;
                    pausedScreen.bringToTop();
                    buttonAudio.visible = true;
                    buttonAudio.bringToTop();
                    pausedScreenText.bringToTop();
                    buttonBack.bringToTop();
                    buttonContinue.visible = true;
                    buttonContinue.bringToTop();
                    this.add.tween(pausedScreenText)
                        .to({
                            alpha: 1
                        }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                    this.add.tween(buttonAudio)
                        .to({
                            y: 10
                        }, 300, Phaser.Easing.Exponential.Out, true, 0, 0, false);
                    this.add.tween(buttonBack)
                        .to({
                            x: (Candy.GAME_WIDTH - 358) * 0.5
                        }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
                    this.add.tween(buttonContinue)
                        .to({
                            x: (Candy.GAME_WIDTH - 358) * 0.5
                        }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
                    this.manageAnimations('off');
                    pauseButtonDisabled = true
                }
            }
        }
    },
    resetCandy: function (candy) {
        candy.active = false;
        var killmarker = this.add.sprite(-83, -83, 'killmarker');
        var half = 42,
            full = 83;
        killmarker.anchor.setTo(0.5, 0.5);
        killmarker.alpha = 0;
        if (candy.type != candyEnum.super && candy.type != candyEnum.bomb) {
            if (candy.y < 0) {
                killmarker.animations.add('kill', [0], 10, true);
                killmarker.x = Math.floor(candy.x);
                killmarker.y = half;
                if (candy.x < half) {
                    killmarker.x = half
                } else if (candy.x > Candy.GAME_WIDTH - half) {
                    killmarker.x = Candy.GAME_WIDTH - half
                }
            } else if (candy.y > Candy.GAME_HEIGHT) {
                killmarker.animations.add('kill', [3], 10, true);
                killmarker.x = Math.floor(candy.x);
                killmarker.y = Candy.GAME_HEIGHT - half;
                if (candy.x < half) {
                    killmarker.x = half
                } else if (candy.x > Candy.GAME_WIDTH - half) {
                    killmarker.x = Candy.GAME_WIDTH - half
                }
            } else if (candy.x < 0) {
                killmarker.animations.add('kill', [2], 10, true);
                killmarker.x = half;
                killmarker.y = Math.floor(candy.y);
                if (candy.y < full) {
                    killmarker.y = full
                } else if (candy.y > Candy.GAME_HEIGHT - full) {
                    killmarker.y = Candy.GAME_HEIGHT - full
                }
            } else if (candy.x > Candy.GAME_WIDTH) {
                killmarker.animations.add('kill', [1], 10, true);
                killmarker.x = Candy.GAME_WIDTH - half;
                killmarker.y = Math.floor(candy.y);
                if (candy.y < full) {
                    killmarker.y = full
                }
                if (candy.y > Candy.GAME_HEIGHT - full) {
                    killmarker.y = Candy.GAME_HEIGHT - full
                }
            }
            killmarker.animations.play('kill');
            var showTween = this.add.tween(killmarker);
            showTween.to({
                alpha: 1
            }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
            showTween.onComplete.addOnce(function () {
                killmarker.alpha = 0
            }, this);
            showTween.start();
            var life = lives.getFirstAlive();
            if (life) {
                this.add.tween(life.scale)
                    .to({
                        x: 0.01,
                        y: 0.01
                    }, 500, Phaser.Easing.Back.Out, true, 0)
                    .onComplete.addOnce(function () {
                        life.kill()
                    }, this);
                livesCount -= 1
            }
            if (!livesCount) {
                gameOver = true
            }
        }
        candy.kill()
    },
    initAudio: function () {
        storageAPI.initUnset('audio', false);
        this.audioStatus = storageAPI.get('audio');
        this.soundClick = this.add.audio('audio-click');
        this.soundEating = this.add.audio('audio-eating');
        this.soundNewlevel = this.add.audio('audio-newlevel');
        this.soundMusic = this.add.audio('audio-music', 1, true);
        this.soundMusic.volume = 0.5;
        if (this.audioStatus) {
            this.audioOffset = 0;
            this.soundMusic.play('', 0, 1, true)
        } else {
            this.audioOffset = 3
        }
        buttonAudio.setFrames(this.audioOffset + 1, this.audioOffset + 0, this.audioOffset + 2)
    },
    manageAudio: function () {
        this.audioStatus = !this.audioStatus;
        storageAPI.set('audio', this.audioStatus);
        if (this.audioStatus) {
            this.audioOffset = 0;
            this.soundMusic.play('', 0, 1, true);
            this.soundClick.play()
        } else {
            this.audioOffset = 3;
            this.soundMusic.stop()
        }
        buttonAudio.setFrames(this.audioOffset + 1, this.audioOffset + 0, this.audioOffset + 2)
    },
    manageAnimations: function (status) {
        if (status == 'on') {
            candyGroup.forEach(function (candy) {
                if (candy.body) {
                    candy.body.velocity.x = candy.cachedVelocity.x;
                    candy.body.velocity.y = candy.cachedVelocity.y;
                    candy.body.gravity.y = 300
                }
            });
            player.animations.play('anim')
        } else if (status == 'off') {
            candyGroup.forEach(function (candy) {
                if (candy.body) {
                    candy.cachedVelocity.x = candy.body.velocity.x;
                    candy.cachedVelocity.y = candy.body.velocity.y;
                    candy.body.velocity.x = 0;
                    candy.body.velocity.y = 0;
                    candy.body.gravity.y = 0
                }
            });
            player.animations.stop('anim')
        }
    },
    restartGame: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        this.add.tween(gameOverText)
            .to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        this.add.tween(buttonBack)
            .to({
                x: -358
            }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
        var restartTween = this.add.tween(buttonRestart);
        restartTween.to({
            x: Candy.GAME_WIDTH
        }, 300, Phaser.Easing.Exponential.Out);
        restartTween.onComplete.addOnce(function () {
            this.soundMusic.stop();
            this.state.start('Game')
        }, this);
        restartTween.start()
    },
    backToMain: function () {
        if (this.audioStatus) {
            this.soundClick.play()
        }
        this.soundMusic.stop();
        this.state.start('MainMenu')
    },
    render: function () {}
};