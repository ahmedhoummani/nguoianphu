Game.InGame = function (game) {}
Game.InGame.prototype = {
    create: function () {
        executedGameOver = false;
        cursors = this.game.input.keyboard.createCursorKeys();
        speed = 1;
        lastspeed = 1;
        speedJauge = 0;
        distance = 0;
        counter = 350;
        lives = 3;
        ultimate = false;
        created = false;
        antiHurt = false;
        highDistance = 0;
        fly = false;
        executedPop = false;
        level2up = false;
        level3up = false;
        distanceMax = JSON.parse(localStorage.getItem('distanceMax'));
        music = this.game.add.audio('music', 1, true);
        if (musicON) {
            music.play();
        }
        coinAudio = this.game.add.audio('coin');
        collisionAudio = this.game.add.audio('collision');
        livenAudio = this.game.add.audio('live');
        speedAudio = this.game.add.audio('speed', 5);
        explosionAudio = this.game.add.audio('explosion');
        back = this.game.add.tileSprite(0, 0, 320, 480, 'background');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        coins = this.game.add.group();
        coins.enableBody = true;
        bombs = this.game.add.group();
        bombs.enableBody = true;
        trails = this.game.add.group();
        trails.enableBody = true;
        liveG = this.game.add.group();
        liveG.enableBody = true;
        player = this.game.add.sprite(100, 230, 'player');
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.setSize(24, 24, 0, 0);
        this.time.events.loop(1, this.createTrail, this);
        bombEvent = this.time.events.loop(1000, this.createBomb, this);
        this.time.events.loop(1000, this.createCoin, this);
        this.time.events.loop(10000, this.createLive, this);
        bomb = bombs.create(320, this.game.rnd.integerInRange(64, 420), 'bomb');
        clouddown = this.game.add.tileSprite(0, 480 - 48, 320, 480, 'clouddown');
        clouddown.enableBody = true;
        cloudtop = this.game.add.tileSprite(0, -36, 320, 86, 'cloudtop');
        cloudtop.enableBody = true;
        distanceText = this.game.add.bitmapText(2, 2, 'font', 'DISTANCE : ' + distance + 'M', 32);
        speedText = this.game.add.bitmapText(2, 460, 'font', 'SPEED : ' + speed * 200 + ' KM/H', 32);
        livesText = this.game.add.bitmapText(2, 32, 'font', 'LIVES : ' + lives, 32);
        speedJaugeText = this.game.add.bitmapText(2, 428, 'font', 'SPEED JAUGE ' + speedJauge + '/40', 32);
        button = this.game.add.button(270, 2, 'pause', 0, this, 0, 0, 1);
        button.inputEnabled = true;
        button.events.onInputUp.add(function () {
            tapText = this.game.add.bitmapText(80, 200, 'font', 'TAP TO RESUME', 32);
            this.game.paused = true;
        }, this);
        this.game.input.onDown.add(function () {
            if (this.game.paused) {
                this.game.paused = false;
                tapText.destroy();
            }
        }, this);
    },
    update: function () {
        this.textUpdate();
        player.body.velocity.x = 0;
        this.game.physics.arcade.overlap(player, bombs, this.bombed, null, this);
        this.game.physics.arcade.overlap(player, coins, this.getCoin, null, this);
        this.game.physics.arcade.overlap(player, liveG, this.livePlus, null, this);
        back.tilePosition.x -= speed * 2;
        clouddown.tilePosition.x -= speed * 6;
        cloudtop.tilePosition.x -= speed * 6;
        player.body.rotation = player.body.velocity.y / 10;
        if (typeof trail !== 'undefined' && player.exists) {
            trail.body.rotation = player.body.rotation;
        }
        if (typeof power !== 'undefined') {
            power.body.rotation = player.body.rotation;
        }
        this.ultimateSpeed();
        if (distance >= 7000) {
            if (!level2up) {
                level2up = true;
                distancePop = this.game.add.bitmapText(player.x, player.y, 'font', 'MORE MORE', 32);
                distancePopTween = this.game.add.tween(distancePop);
                distancePopTween.to({
                    y: distancePop.y - 64,
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.None, true);
                distancePopTween.onComplete.add(function () {
                    distancePop.destroy();
                }, this);
                distancePopTween.start();
                bombEvent.delay = 500;
            }
        }
        if (distance >= 10000) {
            if (!level3up) {
                level3up = true;
                distancePop = this.game.add.bitmapText(player.x, player.y, 'font', 'SPEED UP', 32);
                distancePopTween = this.game.add.tween(distancePop);
                distancePopTween.to({
                    y: distancePop.y - 64,
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.None, true);
                distancePopTween.onComplete.add(function () {
                    distancePop.destroy();
                }, this);
                distancePopTween.start();
                speed = 2;
                trail.frame = 1;
                lastspeed = 2;
            }
        }
        this.outOfScreen(player);
        if (lives <= 0) {
            this.gameOver();
            speed = 0;
        } else {
            distance += speed;
        }
        this.game.input.onDown.add(function () {
            fly = true;
        });
        this.game.input.onUp.add(function () {
            fly = false;
        });
        if (fly) {
            if (player.body.velocity.y > -500) {
                player.body.velocity.y -= 25;
            }
        }
    },
    doSomething: function (pointer) {
        this.jump();
    },
    createCoin: function () {
        posY = this.game.rnd.integerInRange(64, 420);
        while (posY >= bomb.y - 50 && posY <= bomb.y + 50) {
            posY = this.game.rnd.integerInRange(64, 420)
        }
        coin = coins.create(320, posY, 'coin');
        coin.body.velocity.x = -speed * 200;
        coin.checkWorldBounds = true;
        coin.outOfBoundsKill = true;
    },
    getCoin: function (_player, _coin) {
        if (speedJauge < 40) {
            if (speedJauge < 39) {
                string = this.game.rnd.pick(['NICE', 'GOOD', 'COOL']);
                getCoinText = this.game.add.bitmapText(player.x, player.y, 'font', string, 32);
                getCoinTextTween = this.game.add.tween(getCoinText);
                getCoinTextTween.to({
                    y: getCoinText.y - 64,
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.None, true);
                getCoinTextTween.onComplete.add(function () {
                    getCoinText.destroy();
                }, this);
                getCoinTextTween.start();
            }
            speedJauge++;
            if (musicON) {
                coinAudio.play();
            }
        }
        _coin.kill();
    },
    createBomb: function () {
        posY = this.game.rnd.integerInRange(64, 420);
        while (posY >= bomb.y - 50 && posY <= bomb.y + 50) {
            posY = this.game.rnd.integerInRange(64, 420)
        }
        bomb = bombs.create(320, posY, 'bomb');
        bomb.body.velocity.x = -speed * 200;
        bomb.anchor.setTo(0.5, 0.5);
        bomb.checkWorldBounds = true;
        bomb.outOfBoundsKill = true;
        bomb.body.setSize(24, 24, 0, 0);
    },
    createTrail: function () {
        trail = trails.create(player.x, player.y, 'trail');
        trail.body.velocity.x = -600;
        trail.anchor.setTo(0.5, 0.5);
        trail.outOfBoundsKill = true;
        trail.frame = speed - 1;
        trail.checkWorldBounds = true;
        trail.outOfBoundsKill = true;
    },
    textUpdate: function () {
        distanceText.setText('DISTANCE : ' + Math.floor(distance) + ' M');
        speedText.setText('SPEED : ' + Math.floor(speed * 200) + 'KM/H');
        livesText.setText('LIVES ' + lives);
        speedJaugeText.setText('SPEED JAUGE ' + speedJauge + '/40');
    },
    ultimateSpeed: function () {
        if (speedJauge >= 40) {
            if (created == false) {
                created = true;
                if (musicON) {
                    speedAudio.play();
                }
                speedUpText = this.game.add.bitmapText(player.x, player.y, 'font', 'GO GO GO', 32);
                speedUpTextTween = this.game.add.tween(speedUpText);
                speedUpTextTween.to({
                    y: speedUpText.y - 64,
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.None, true);
                speedUpTextTween.onComplete.add(function () {
                    speedUpText.destroy();
                }, this);
                speedUpTextTween.start();
                power = this.game.add.sprite(player.x, player.y, 'power');
                this.game.physics.arcade.enable(power);
                power.anchor.setTo(0.5, 0.5);
            }
            power.x = player.x;
            power.y = player.y;
            if (speed < 10) {
                speed += 0.1;
                speedText.setText('SPEED : ' + Math.floor(speed * 200) + 'KM/H');
            }
            counter--;
            ultimate = true;
            trail.frame = 1;
        }
        if (counter <= 0) {
            created = false;
            power.kill();
            counter = 350;
            speedJauge = 0;
            speed = lastspeed;
            speedText.setText('SPEED : ' + Math.floor(speed * 200) + 'KM/H');
            ultimate = false;
            trail.frame = speed;
        }
    },
    outOfScreen: function (_self) {
        if ((_self.y > 490) || (_self.y < -10) || (_self.x > 320) || (_self.x < 0)) {
            if (_self == player) {
                lives = 0;
            } else {
                _self.kill();
                console.log('Destoryed')
            }
        }
    },
    gameOver: function () {
        if (!executedGameOver) {
            executedGameOver = true;
            playing = false;
            button.inputEnabled = false;
            if (distanceMax <= distance) {
                distanceMax = distance;
                localStorage.setItem('distanceMax', JSON.stringify(distanceMax));
            }
            gameOverLogo = this.game.add.bitmapText(60, -100, 'font', 'GAME OVER', 64);
            gameOverLogo.x = this.game.width / 2 - gameOverLogo.textWidth / 2;
            gameOverLogoTween = this.game.add.tween(gameOverLogo).to({
                y: 100
            }, 1500, Phaser.Easing.Bounce.Out, true).start();
            gameOverDistance = this.game.add.bitmapText(10, -100, 'font', 'DISTANCE : ' + Math.floor(distance) + ' M', 48);
            gameOverDistance.align = 'center';
            gameOverDistance.x = this.game.width / 2 - gameOverDistance.textWidth / 2;
            gameOverDistanceTween = this.game.add.tween(gameOverDistance).to({
                y: 200
            }, 1500, Phaser.Easing.Bounce.Out, true).start();
            hDistance = this.game.add.bitmapText(10, -100, 'font', 'HIGH : ' + Math.floor(distanceMax) + ' M', 48);
            hDistance.align = 'center';
            hDistance.x = this.game.width / 2 - gameOverDistance.textWidth / 2;
            hDistanceTween = this.game.add.tween(hDistance).to({
                y: 200 + 32
            }, 2000, Phaser.Easing.Bounce.Out, true).start();
            backButton = this.game.add.button(96, -100, 'backButton', function () {
                this.game.fading.fadeAndPlay("rgb(0,0,0)", 0.5, "MainMenu");
            }, this, 0, 0, 1);
            backButton.anchor.setTo(0.5, 0.5);
            backButton.setDownSound(click);
            backButtonTween = this.game.add.tween(backButton).to({
                y: 340
            }, 1000, Phaser.Easing.Bounce.Out, true).start();
            replayButton = this.game.add.button(232, -100, 'replayButton', function () {
                this.game.fading.fadeAndPlay("rgb(0,0,0)", 0.5, "InGame");
            }, this, 0, 0, 1);
            replayButton.anchor.setTo(0.5, 0.5);
            replayButton.setDownSound(click);
            replayButtonTween = this.game.add.tween(replayButton).to({
                y: 340
            }, 1500, Phaser.Easing.Bounce.Out, true).start();
        }
        player.kill();
        trail.kill();
        bomb.kill();
        coin.kill();
        if (typeof live !== 'undefined') {
            live.kill();
        }
    },
    shutdown: function () {
        this.game.world.removeAll();
        this.game.sound.stopAll();
    },
    createLive: function () {
        posY = this.game.rnd.integerInRange(64, 420);
        while (posY >= (bomb.y - 50 || coin.y - 50) && posY <= (bomb.y + 50 || coin.y + 50)) {
            posY = this.game.rnd.integerInRange(64, 420)
        }
        live = liveG.create(320, posY, 'live');
        live.body.velocity.x = -speed * 200;
        live.anchor.setTo(0.5, 0.5);
        live.checkWorldBounds = true;
        live.outOfBoundsKill = true;
    },
    livePlus: function (_player, _other) {
        _other.kill();
        liveUpText = this.game.add.bitmapText(player.x, player.y, 'font', 'LIVE UP', 32);
        liveUpTextTween = this.game.add.tween(liveUpText);
        liveUpTextTween.to({
            y: liveUpText.y - 64,
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.None, true);
        liveUpTextTween.onComplete.add(function () {
            liveUpText.destroy();
        }, this);
        liveUpTextTween.start();
        lives++;
        if (musicON) {
            livenAudio.play();
        }
    },
    bombed: function (_player, _other) {
        if (ultimate == false) {
            if (_player.y > _other.y) {
                _player.body.velocity.y = 200;
            } else {
                _player.body.velocity.y = -200;
            }
            lives--;
        }
        _other.kill();
        explo = this.game.add.sprite(player.x, player.y, 'explosion');
        explo.anchor.setTo(0.5, 0.5);
        anim = explo.animations.add('explosion');
        anim.killOnComplete = true;
        anim.play();
        if (lives > 0) {
            if (musicON) {
                collisionAudio.play();
            }
        } else {
            if (musicON) {
                explosionAudio.play();
            }
        }
    },
}
