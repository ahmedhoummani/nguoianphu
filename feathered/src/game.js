function IncorrectOrientation() {
    if (IncorrectOverlay === null) {
        var e = new Phaser.Graphics(game, 0, 0);
        e.beginFill(0, 1);
        e.drawRect(0, 0, game.width, game.height);
        e.endFill();
        IncorrectOverlay = game.add.image(0, 0, e.generateTexture());
        IncorrectImg = game.add.image(game.world.centerX, game.world.centerY, "turnScreen");
        IncorrectImg.anchor.setTo(.5, 0);
        IncorrectText = this.game.add.text(game.world.centerX, game.world.centerY - 100, "Please rotate your device", {
            font: "48px boogalooregular",
            fill: "#ffffff"
        });
        IncorrectText.anchor.setTo(.5, .5)
    }
}

function correctOrientation() {
    if (IncorrectOverlay !== null) {
        IncorrectOverlay.destroy();
        IncorrectText.destroy();
        IncorrectImg.destroy();
        IncorrectOverlay = null;
        IncorrectText = null;
        IncorrectImg = null
    }
}
recycleController = {
    recycledObjects: new Array,
    getObject: function (e) {
        if (this.recycledObjects[e] == undefined) {
            this.recycledObjects[e] = game.add.group()
        }
        return this.recycledObjects[e].getFirstExists(false)
    },
    addObject: function (e, t) {
        if (this.recycledObjects[t] == undefined) {
            this.recycledObjects[t] = game.add.group()
        }
        this.recycledObjects[t].add(e)
    }
};
var IncorrectOverlay = null;
var IncorrectText = null;
var IncorrectImg = null;
Preload = function (e) {};
Preload.prototype.preload = function () {
    game.load.image("RoundedButton", "assets/sprites/RoundedButtonEmpty.png");
    game.load.image("RoundedDisabledButton", "assets/sprites/RoundedButtonEmptyDisabled.png");
    game.load.image("EmptyButton", "assets/sprites/ButtonEmpty.png");
    game.load.image("Logo", "assets/sprites/GameLogofont.png");
    game.load.image("gameBG", "assets/sprites/game-logo-final.png");
    game.load.atlas("bunny", "assets/spritesheets/Bunny.png", "assets/spritesheets/Bunny.json");
    game.load.atlas("Trees", "assets/spritesheets/Trees.png", "assets/spritesheets/Trees.json");
    game.load.image("bullet", "assets/sprites/acorn.png");
    game.load.image("foliage1", "assets/sprites/Foliage1.png");
    game.load.image("foliage2", "assets/sprites/Foliage2.png");
    game.load.image("grass", "assets/sprites/GrassFill.png");
    game.load.image("TNT", "assets/sprites/TNT.png");
    game.load.image("smoke", "assets/sprites/Smoke.png");
    game.load.image("heart", "assets/sprites/Heart.png");
    game.load.image("corn", "assets/sprites/cornUI.png");
    game.load.image("restartSymbol", "assets/sprites/RestartSymbol.png");
    game.load.image("nextSymbol", "assets/sprites/NextSymbol.png");
    game.load.image("nextArrow", "assets/sprites/nextArrow.png");
    game.load.image("menuSymbol", "assets/sprites/MenuSymbol.png");
    game.load.image("birdSplash", "assets/sprites/birdSplash.png");
    game.load.image("turnScreen", "assets/sprites/turn-screen.png");
    game.load.atlas("sparrow", "assets/spritesheets/Sparrow.png", "assets/spritesheets/Sparrow.json");
    game.load.atlas("pigeon", "assets/spritesheets/Pigeon.png", "assets/spritesheets/Pigeon.json");
    game.load.atlas("cardinal", "assets/spritesheets/Cardinal.png", "assets/spritesheets/Cardinal.json");
    game.load.atlas("hoopoe", "assets/spritesheets/Hoopoe.png", "assets/spritesheets/Hoopoe.json")
};
Preload.prototype.create = function () {
    var e = localStorage.getItem("CurrentLevel");
    if (!e) {
        e = 1;
        localStorage.setItem("CurrentLevel", 1)
    }
    game.scale.forceLandscape = true;
    game.scale.enterIncorrectOrientation.add(IncorrectOrientation);
    game.scale.leaveIncorrectOrientation.add(correctOrientation);
    game.scale.pageAlignHorizontally = true;
    game.scale.refresh();
    game.state.start("MainMenu")
};
Preload.prototype.update = function () {};
var BirdData = new Array;
BirdData["Sparrow"] = {
    spriteSheet: "sparrow",
    defaultFrame: "Sparrow0001.png"
};
BirdData["Pigeon"] = {
    spriteSheet: "pigeon",
    defaultFrame: "Pigeon0001.png"
};
BirdData["Cardinal"] = {
    spriteSheet: "cardinal",
    defaultFrame: "Cardinal0001.png"
};
BirdData["Hoopoe"] = {
    spriteSheet: "hoopoe",
    defaultFrame: "Hoopoe0001.png"
};
var levelData = new Array;
levelData[1] = {
    waveCount: 4,
    minBirdsPerWave: 3,
    maxBirdsPerWave: 5,
    minSpeed: 12,
    maxSpeed: 12
};
levelData[2] = {
    waveCount: 5,
    minBirdsPerWave: 3,
    maxBirdsPerWave: 5,
    minSpeed: 12,
    maxSpeed: 13
};
levelData[3] = {
    waveCount: 5,
    minBirdsPerWave: 4,
    maxBirdsPerWave: 10,
    minSpeed: 12,
    maxSpeed: 13
};
levelData[4] = {
    waveCount: 6,
    minBirdsPerWave: 4,
    maxBirdsPerWave: 10,
    minSpeed: 12,
    maxSpeed: 16
};
levelData[5] = {
    waveCount: 6,
    minBirdsPerWave: 5,
    maxBirdsPerWave: 11,
    minSpeed: 12,
    maxSpeed: 16
};
levelData[6] = {
    waveCount: 7,
    minBirdsPerWave: 5,
    maxBirdsPerWave: 11,
    minSpeed: 13,
    maxSpeed: 17
};
levelData[7] = {
    waveCount: 7,
    minBirdsPerWave: 6,
    maxBirdsPerWave: 12,
    minSpeed: 13,
    maxSpeed: 17
};
levelData[8] = {
    waveCount: 8,
    minBirdsPerWave: 6,
    maxBirdsPerWave: 12,
    minSpeed: 13,
    maxSpeed: 18
};
levelData[9] = {
    waveCount: 8,
    minBirdsPerWave: 7,
    maxBirdsPerWave: 13,
    minSpeed: 13,
    maxSpeed: 18
};
levelData[10] = {
    waveCount: 9,
    minBirdsPerWave: 7,
    maxBirdsPerWave: 13,
    minSpeed: 13,
    maxSpeed: 19
};
levelData[11] = {
    waveCount: 9,
    minBirdsPerWave: 8,
    maxBirdsPerWave: 14,
    minSpeed: 14,
    maxSpeed: 19
};
levelData[12] = {
    waveCount: 9,
    minBirdsPerWave: 8,
    maxBirdsPerWave: 14,
    minSpeed: 14,
    maxSpeed: 20
};
levelData[13] = {
    waveCount: 9,
    minBirdsPerWave: 9,
    maxBirdsPerWave: 15,
    minSpeed: 14,
    maxSpeed: 20
};
levelData[14] = {
    waveCount: 9,
    minBirdsPerWave: 9,
    maxBirdsPerWave: 15,
    minSpeed: 14,
    maxSpeed: 21
};
levelData[15] = {
    waveCount: 9,
    minBirdsPerWave: 10,
    maxBirdsPerWave: 16,
    minSpeed: 14,
    maxSpeed: 21
};
levelData[16] = {
    waveCount: 9,
    minBirdsPerWave: 10,
    maxBirdsPerWave: 16,
    minSpeed: 15,
    maxSpeed: 22
};
levelData[17] = {
    waveCount: 9,
    minBirdsPerWave: 11,
    maxBirdsPerWave: 17,
    minSpeed: 15,
    maxSpeed: 22
};
levelData[18] = {
    waveCount: 9,
    minBirdsPerWave: 11,
    maxBirdsPerWave: 17,
    minSpeed: 15,
    maxSpeed: 23
};
levelData[19] = {
    waveCount: 9,
    minBirdsPerWave: 12,
    maxBirdsPerWave: 18,
    minSpeed: 15,
    maxSpeed: 23
};
levelData[20] = {
    waveCount: 9,
    minBirdsPerWave: 12,
    maxBirdsPerWave: 18,
    minSpeed: 15,
    maxSpeed: 24
};
levelData[21] = {
    waveCount: 10,
    minBirdsPerWave: 13,
    maxBirdsPerWave: 19,
    minSpeed: 16,
    maxSpeed: 24
};
levelData[22] = {
    waveCount: 10,
    minBirdsPerWave: 13,
    maxBirdsPerWave: 19,
    minSpeed: 16,
    maxSpeed: 25
};
levelData[23] = {
    waveCount: 10,
    minBirdsPerWave: 14,
    maxBirdsPerWave: 20,
    minSpeed: 16,
    maxSpeed: 25
};
levelData[24] = {
    waveCount: 10,
    minBirdsPerWave: 14,
    maxBirdsPerWave: 20,
    minSpeed: 16,
    maxSpeed: 26
};
levelData[25] = {
    waveCount: 10,
    minBirdsPerWave: 15,
    maxBirdsPerWave: 21,
    minSpeed: 16,
    maxSpeed: 26
};
levelData[26] = {
    waveCount: 10,
    minBirdsPerWave: 15,
    maxBirdsPerWave: 21,
    minSpeed: 17,
    maxSpeed: 27
};
levelData[27] = {
    waveCount: 10,
    minBirdsPerWave: 16,
    maxBirdsPerWave: 22,
    minSpeed: 17,
    maxSpeed: 27
};
levelData[28] = {
    waveCount: 10,
    minBirdsPerWave: 16,
    maxBirdsPerWave: 22,
    minSpeed: 17,
    maxSpeed: 28
};
levelData[29] = {
    waveCount: 10,
    minBirdsPerWave: 17,
    maxBirdsPerWave: 23,
    minSpeed: 17,
    maxSpeed: 28
};
levelData[30] = {
    waveCount: 10,
    minBirdsPerWave: 17,
    maxBirdsPerWave: 23,
    minSpeed: 17,
    maxSpeed: 29
};
levelData[31] = {
    waveCount: 11,
    minBirdsPerWave: 18,
    maxBirdsPerWave: 24,
    minSpeed: 18,
    maxSpeed: 29
};
levelData[32] = {
    waveCount: 11,
    minBirdsPerWave: 18,
    maxBirdsPerWave: 24,
    minSpeed: 18,
    maxSpeed: 30
};
levelData[33] = {
    waveCount: 11,
    minBirdsPerWave: 19,
    maxBirdsPerWave: 25,
    minSpeed: 18,
    maxSpeed: 30
};
levelData[34] = {
    waveCount: 11,
    minBirdsPerWave: 19,
    maxBirdsPerWave: 25,
    minSpeed: 18,
    maxSpeed: 31
};
levelData[35] = {
    waveCount: 11,
    minBirdsPerWave: 20,
    maxBirdsPerWave: 26,
    minSpeed: 18,
    maxSpeed: 31
};
levelData[36] = {
    waveCount: 11,
    minBirdsPerWave: 20,
    maxBirdsPerWave: 26,
    minSpeed: 19,
    maxSpeed: 32
};
levelData[37] = {
    waveCount: 11,
    minBirdsPerWave: 21,
    maxBirdsPerWave: 27,
    minSpeed: 19,
    maxSpeed: 32
};
levelData[38] = {
    waveCount: 11,
    minBirdsPerWave: 21,
    maxBirdsPerWave: 27,
    minSpeed: 19,
    maxSpeed: 33
};
levelData[39] = {
    waveCount: 11,
    minBirdsPerWave: 22,
    maxBirdsPerWave: 28,
    minSpeed: 19,
    maxSpeed: 33
};
levelData[40] = {
    waveCount: 11,
    minBirdsPerWave: 22,
    maxBirdsPerWave: 28,
    minSpeed: 19,
    maxSpeed: 34
};
MainMenu = function (e) {};
MainMenu.prototype.preload = function () {};
MainMenu.prototype.create = function () {
    this.bg = game.add.sprite(0, 0, "gameBG");
    this.bg.height = game.height;
    this.bg.width = game.width;
    this.logo = game.add.sprite(game.width / 2, game.height / 3, "Logo");
    this.logo.scale.x = .5;
    this.logo.scale.y = .5;
    this.logo.anchor.setTo(.5, .5);
    this.playButton = game.add.button(game.width / 2, game.height / 2 + 50, "EmptyButton", this.playButtonClick, this);
    this.playButton.scale.x = .5;
    this.playButton.scale.y = .5;
    this.playButton.anchor.setTo(.5, .5);
    this.playText = game.add.text(this.playButton.x, this.playButton.y, "Play", {
        font: "18px boogalooregular",
        fill: "#ffffff",
        align: "center"
    });
    this.playText.anchor.setTo(.5, .5);
    this.playText.smoothed = false;
    this.playButton.onInputOver.add(function (e) {
        e.scale.x = .45;
        e.scale.y = .45;
        this.playText.scale.x = .9;
        this.playText.scale.y = .9
    }, this);
    this.playButton.onInputOut.add(function (e) {
        e.scale.x = .5;
        e.scale.y = .5;
        this.playText.scale.x = 1;
        this.playText.scale.y = .9
    }, this)
};
MainMenu.prototype.playButtonClick = function () {
    game.state.start("LevelSelect")
};
MainMenu.prototype.update = function () {};
LevelSelect = function (e) {};
LevelSelect.prototype.preload = function () {};
LevelSelect.prototype.create = function () {
    this.bg = game.add.sprite(0, 0, "gameBG");
    this.bg.height = game.height;
    this.bg.width = game.width;
    this.currentPage = 1;
    this.buttonGroupPosX = game.width / 3 - 30;
    this.buttonGroupPosY = game.height / 3 - 60;
    this.maxLevel = localStorage.getItem("CurrentLevel");
    this.levelButtons = new Array;
    this.levelButtons[1] = this.createButtons(1, 20);
    this.levelButtons[2] = this.createButtons(21, 40);
    this.levelButtons[1].x = this.buttonGroupPosX;
    this.levelButtons[1].y = this.buttonGroupPosY;
    this.levelButtons[2].x = game.width + this.buttonGroupPosX;
    this.levelButtons[2].y = this.buttonGroupPosY;
    this.canSlide = true;
    var e = game.add.button(0 + 60, game.height / 2, "nextArrow", this.slideRight, this);
    e.scale.setTo(-.5, .5);
    e.anchor.setTo(.5, .5);
    var t = game.add.button(game.width - 60, game.height / 2, "nextArrow", this.slideLeft, this);
    t.scale.setTo(.5, .5);
    t.anchor.setTo(.5, .5)
};
LevelSelect.prototype.slideLeft = function () {
    if (this.currentPage == 1 && this.canSlide == true) {
        var e = new Array;
        e[1] = game.add.tween(this.levelButtons[1]);
        e[2] = game.add.tween(this.levelButtons[2]);
        e[1].to({
            x: -game.width + this.buttonGroupPosX
        }, 500, Phaser.Easing.Linear.None, true);
        e[2].to({
            x: this.buttonGroupPosX
        }, 500, Phaser.Easing.Linear.None, true);
        this.currentPage = 2
    }
};
LevelSelect.prototype.slideRight = function () {
    if (this.currentPage == 2 && this.canSlide == true) {
        var e = new Array;
        e[1] = game.add.tween(this.levelButtons[1]);
        e[2] = game.add.tween(this.levelButtons[2]);
        e[1].to({
            x: this.buttonGroupPosX
        }, 500, Phaser.Easing.Linear.None, true);
        e[2].to({
            x: game.width + this.buttonGroupPosX
        }, 500, Phaser.Easing.Linear.None, true);
        this.currentPage = 1
    }
};
LevelSelect.prototype.createButtons = function (e, t, n) {
    n = n || 5;
    var r = 0;
    var i = 0;
    var s = 80;
    var o = 80;
    var u = 0;
    var a = 0;
    var f = game.add.group();
    for (var l = e; l <= t; l++) {
        var c = game.add.group();
        var h;
        if (l <= this.maxLevel) {
            h = game.add.button(0, 0, "RoundedButton", this.levelLoadClick, {
                level: l,
                maxLevel: this.maxLevel
            })
        } else {
            h = game.add.button(0, 0, "RoundedDisabledButton")
        }
        h.anchor.setTo(.5, .5);
        h.scale.x = .5;
        h.scale.y = .5;
        h.onInputOver.add(this.hoverButton, {
            buttongroup: c
        });
        h.onInputOut.add(this.hoverButtonOut, {
            buttongroup: c
        });
        var p = game.add.text(h.x, h.y, l, {
            font: "18px dualityregular",
            fill: "#ffffff",
            align: "center"
        });
        p.anchor.setTo(.5, .5);
        c.add(h);
        c.add(p);
        c.x = r + u * s;
        c.y = i + a * o;
        f.add(c);
        u++;
        if (l % n == 0) {
            u = 0;
            a++
        }
    }
    return f
};
LevelSelect.prototype.levelLoadClick = function () {
    if (this.level <= this.maxLevel) {
        game.state.start("GameLevel", true, false, this.level)
    }
};
LevelSelect.prototype.hoverButton = function () {
    this.buttongroup.scale.x = .9;
    this.buttongroup.scale.y = .9
};
LevelSelect.prototype.hoverButtonOut = function () {
    this.buttongroup.scale.x = 1;
    this.buttongroup.scale.y = 1
};
LevelSelect.prototype.update = function () {};
var objGroups = new Array;
var birdsGroup;
var currentLevel;
var birdDroppings;
GameLevel = function (e) {};
GameLevel.prototype.init = function (e) {
    currentLevel = this;
    this.Level = e;
    this.levelOver = false;
    BULLET_SPEED = 1e3
};
GameLevel.prototype.preload = function () {
    this.Birds = new Array;
    this.Birds.push("Sparrow");
    if (this.Level >= 2) {
        this.Birds.push("Pigeon")
    }
    if (this.Level >= 10) {
        this.Birds.push("Cardinal")
    }
    if (this.Level >= 15) {
        this.Birds.push("Hoopoe")
    }
    this.lanes = [350, 300, 250, 200];
    this.waves = new Array;
    this.currentWave = 0;
    this.currentSpawnCol = 0;
    this.totalBirds = 0;
    this.totalKilledBirds = 0;
    for (var e = 0; e < levelData[this.Level].waveCount; e++) {
        this.waves.push(this.generateWave(4, 12, game.rnd.integerInRange(levelData[this.Level].minBirdsPerWave, levelData[this.Level].maxBirdsPerWave)))
    }
};
GameLevel.prototype.create = function () {
    game.stage.backgroundColor = 8249325;
    var e = new Array;
    e[0] = game.add.sprite(50, game.height - 50, "Trees", "Trunk.png");
    e[1] = game.add.sprite(195, game.height - 50, "Trees", "Trunk2.png");
    e[2] = game.add.sprite(359, game.height - 50, "Trees", "Trunk3.png");
    e[3] = game.add.sprite(504, game.height - 50, "Trees", "Trunk4.png");
    e[4] = game.add.sprite(658, game.height - 50, "Trees", "Trunk.png");
    var t = new Array;
    t[0] = game.add.sprite(165, game.height - 250, "foliage1");
    t[1] = game.add.sprite(260, game.height - 230, "foliage1");
    t[2] = game.add.sprite(359, game.height - 250, "foliage1");
    t[3] = game.add.sprite(504, game.height - 250, "foliage1");
    t[4] = game.add.sprite(650, game.height - 250, "foliage1");
    var n = new Array;
    n[0] = game.add.sprite(-20, game.height - 270, "foliage2");
    n[1] = game.add.sprite(200, game.height - 270, "foliage2");
    n[2] = game.add.sprite(320, game.height - 270, "foliage2");
    n[3] = game.add.sprite(504, game.height - 270, "foliage2");
    n[4] = game.add.sprite(650, game.height - 270, "foliage2");
    var r = game.add.sprite(0, game.height - 65, "grass");
    r.anchor.setTo(0, 0);
    r.scale.x = 10;
    r.scale.y = .3;
    for (var i = 0; i < 5; i++) {
        e[i].anchor.setTo(0, 1);
        e[i].scale.x = .4;
        e[i].scale.y = .4;
        t[i].anchor.setTo(0, 1);
        t[i].scale.x = .4;
        t[i].scale.y = .4;
        t[i].tint = 12765264;
        n[i].anchor.setTo(0, 1);
        n[i].scale.x = .5;
        n[i].scale.y = .6;
        n[i].tint = 12765264
    }
    player = new Bunny(30, game.height - 50);
    birdsGroup = new Array;
    recycleController.recycledObjects = new Array;
    bullets = game.add.group();
    bullets.createMultiple(10, "bullet");
    bullets.setAll("scale.x", .5);
    bullets.setAll("scale.y", .5);
    bullets.setAll("anchor.x", .5);
    bullets.setAll("anchor.y", 1);
    bullets.setAll("checkWorldBounds", true);
    bullets.forEach(function (e) {
        e.events.onOutOfBounds.add(this.bulletOut, this)
    }, this);
    var s = game.add.sprite(100, 15, "corn");
    s.anchor.setTo(.5, .5);
    s.scale.x = .5;
    s.scale.y = .5;
    this.bulletsLeft = this.game.add.text(115, 10, "x" + player.bullets, {
        font: "16px boogalooregular",
        fill: "#ffffff"
    });
    var o = game.add.sprite(20, 15, "heart");
    o.anchor.setTo(.5, .5);
    o.scale.x = .5;
    o.scale.y = .5;
    this.heartsLeft = this.game.add.text(35, 10, "x" + player.HP, {
        font: "16px boogalooregular",
        fill: "#ffffff"
    });
    this.waveText = this.game.add.text(game.world.centerX, 20, "Wave: 1/" + levelData[this.Level].waveCount, {
        font: "16px boogalooregular",
        fill: "#ffffff"
    });
    birdDroppings = game.add.group();
    birdDroppings.createMultiple(10, "birdSplash");
    birdDroppings.setAll("scale.x", .3);
    birdDroppings.setAll("scale.y", .3);
    birdDroppings.setAll("anchor.x", .5);
    birdDroppings.setAll("anchor.y", .5);
    this.explosionEmitter = game.add.emitter(0, 0, 20);
    this.explosionEmitter.makeParticles("smoke");
    this.explosionEmitter.forEach(function (e) {
        e.tint = 0
    });
    this.waveText.anchor.setTo(.5, .5);
    this.waveText.smoothed = false;
    this.spawn();
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(game.width - 70, 20, "", {
        font: "16px boogalooregular",
        fill: "#ffffff"
    })
};
GameLevel.prototype.bulletOut = function (e) {
    e.kill();
    player.combo = 0
};
GameLevel.prototype.generateWave = function (e, t, n, r) {
    r = r || 2;
    if (r * t < n) {
        n = r * t
    }
    var i = 0;
    var s = new Array;
    var o = new Array;
    for (var u = 0; u < t; u++) {
        o[u] = new Array;
        for (var a = 0; a < e; a++) {
            o[u][a] = a
        }
    }
    var f = 0;
    while (i < n) {
        var l = game.rnd.integerInRange(0, o.length - 1);
        var c = game.rnd.integerInRange(0, o[l].length - 1);
        if (s[l] == undefined) s[l] = new Array;
        var h = 0;
        for (spawnObj in s[l]) {
            h++
        }
        if (h < r) {
            i++;
            s[l][c] = true;
            o.splice(f, 1)
        } else {
            o.splice(f, 1)
        }
        f++;
        if (f > 300) {
            break
        }
    }
    return s
};
GameLevel.prototype.update = function () {
    if (this.currentWave >= this.waves.length) {}
};
GameLevel.prototype.spawn = function () {
    if (this.levelOver == false) {
        if (this.currentWave < this.waves.length) {
            var e = this.waves[this.currentWave];
            if (this.currentSpawnCol < e.length) {
                var t = e[this.currentSpawnCol];
                if (t != undefined) {
                    for (var n = 0; n < t.length; n++) {
                        if (t[n] == true) {
                            this.totalBirds++;
                            var r = game.rnd.weightedPick(this.Birds);
                            var i = recycleController.getObject(r);
                            if (i == null) {
                                i = new MovingObject(BirdData[r], game.width + 70, game.height - this.lanes[n], game.rnd.realInRange(levelData[this.Level].minSpeed, levelData[this.Level].maxSpeed));
                                recycleController.addObject(i, r)
                            } else {
                                i.reset(game.width + 70, game.height - this.lanes[n]);
                                var s = game.rnd.realInRange(levelData[this.Level].minSpeed, levelData[this.Level].maxSpeed);
                                i.resetData(s)
                            }
                        }
                    }
                }
                this.currentSpawnCol++;
                game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(.5, 1), this.spawn, this)
            } else {
                this.currentWave++;
                this.currentSpawnCol = 0;
                this.waveText.text = "Wave: " + Math.min(this.currentWave + 1, this.waves.length) + "/" + this.waves.length;
                game.time.events.add(Phaser.Timer.SECOND * 1, this.spawn, this)
            }
        } else {
            this.checkingEvent = game.time.events.repeat(Phaser.Timer.SECOND * 3, 3, this.checkBirdsKilled, this)
        }
    }
};
GameLevel.prototype.checkBirdsKilled = function () {
    if (this.totalKilledBirds >= this.totalBirds) {
        game.time.events.add(Phaser.Timer.SECOND * 2, this.levelWon, this);
        game.time.events.remove(this.checkingEvent)
    }
};
GameLevel.prototype.levelFailed = function () {
    if (this.levelOver == false) {
        this.createUI();
        player.canShoot = false;
        this.levelOver = true;
        game.add.existing(this.overlay);
        var e = this.game.add.text(game.world.centerX, game.world.centerY - 100, "Level Failed!", {
            font: "36px boogalooregular",
            fill: "#ffffff"
        });
        e.anchor.setTo(.5, .5);
        game.add.existing(this.MainMenuGroup);
        game.add.existing(this.ReplayGroup)
    }
};
GameLevel.prototype.levelWon = function () {
    if (this.levelOver == false) {
        this.createUI();
        player.canShoot = false;
        this.levelOver = true;
        game.add.existing(this.overlay);
        var e = this.game.add.text(game.world.centerX, game.world.centerY - 100, "Level Completed!", {
            font: "36px boogalooregular",
            fill: "#ffffff"
        });
        e.anchor.setTo(.5, .5);
        game.add.existing(this.MainMenuGroup);
        game.add.existing(this.ReplayGroup);
        if (this.Level < 40) {
            this.Level += 1;
            this.ReplayGroup.x = game.world.centerX;
            game.add.existing(this.NextLevelGroup)
        }
        var t = localStorage.getItem("CurrentLevel");
        if (t < this.Level) {
            localStorage.setItem("CurrentLevel", this.Level)
        }
    }
};
GameLevel.prototype.createUI = function () {
    this.graphicOverlay = new Phaser.Graphics(this.game, -10, -10);
    this.graphicOverlay.beginFill(0, .7);
    this.graphicOverlay.drawRect(0, 0, game.width + 10, game.height + 10);
    this.graphicOverlay.endFill();
    this.overlay = game.make.image(-10, -10, this.graphicOverlay.generateTexture());
    this.MainMenuGroup = game.make.group();
    this.MainMenuGroup.x = game.world.centerX - 100;
    this.MainMenuGroup.y = game.world.centerY;
    var e = game.add.button(0, 0, "RoundedButton", function () {
        game.state.start("MainMenu")
    });
    e.anchor.setTo(.5, .5);
    e.scale.x = .5;
    e.scale.y = .5;
    var t = game.add.button(0, 0, "menuSymbol", function () {
        game.state.start("MainMenu")
    });
    t.anchor.setTo(.5, .5);
    t.scale.x = .4;
    t.scale.y = .4;
    this.MainMenuGroup.add(e);
    this.MainMenuGroup.add(t);
    this.ReplayGroup = game.make.group();
    this.ReplayGroup.x = game.world.centerX + 100;
    this.ReplayGroup.y = game.world.centerY;
    var n = game.add.button(0, 0, "RoundedButton", function () {
        game.state.start("GameLevel", true, false, this.Level)
    }, this);
    n.anchor.setTo(.5, .5);
    n.scale.x = .5;
    n.scale.y = .5;
    var r = game.add.button(0, 0, "restartSymbol", function () {
        game.state.start("GameLevel", true, false, this.Level)
    }, this);
    r.anchor.setTo(.5, .5);
    r.scale.x = .4;
    r.scale.y = .4;
    this.ReplayGroup.add(n);
    this.ReplayGroup.add(r);
    this.NextLevelGroup = game.make.group();
    this.NextLevelGroup.x = game.world.centerX + 100;
    this.NextLevelGroup.y = game.world.centerY;
    var i = game.add.button(0, 0, "RoundedButton", function () {
        game.state.start("GameLevel", true, false, this.Level)
    }, this);
    i.anchor.setTo(.5, .5);
    i.scale.x = .5;
    i.scale.y = .5;
    var s = game.add.button(0, 0, "nextSymbol", function () {
        game.state.start("GameLevel", true, false, this.Level)
    }, this);
    s.anchor.setTo(.5, .5);
    s.scale.x = .4;
    s.scale.y = .4;
    this.NextLevelGroup.add(i);
    this.NextLevelGroup.add(s);
    e.onInputOver.add(this.hoverButton, {
        buttongroup: this.MainMenuGroup
    });
    e.onInputOut.add(this.hoverButtonOut, {
        buttongroup: this.MainMenuGroup
    });
    t.onInputOver.add(this.hoverButton, {
        buttongroup: this.MainMenuGroup
    });
    t.onInputOut.add(this.hoverButtonOut, {
        buttongroup: this.MainMenuGroup
    });
    n.onInputOver.add(this.hoverButton, {
        buttongroup: this.ReplayGroup
    });
    n.onInputOut.add(this.hoverButtonOut, {
        buttongroup: this.ReplayGroup
    });
    r.onInputOver.add(this.hoverButton, {
        buttongroup: this.ReplayGroup
    });
    r.onInputOut.add(this.hoverButtonOut, {
        buttongroup: this.ReplayGroup
    });
    i.onInputOver.add(this.hoverButton, {
        buttongroup: this.NextLevelGroup
    });
    i.onInputOut.add(this.hoverButtonOut, {
        buttongroup: this.NextLevelGroup
    });
    s.onInputOver.add(this.hoverButton, {
        buttongroup: this.NextLevelGroup
    });
    s.onInputOut.add(this.hoverButtonOut, {
        buttongroup: this.NextLevelGroup
    })
};
GameLevel.prototype.hoverButton = function () {
    this.buttongroup.scale.x = .9;
    this.buttongroup.scale.y = .9
};
GameLevel.prototype.hoverButtonOut = function () {
    this.buttongroup.scale.x = 1;
    this.buttongroup.scale.y = 1
};
Bunny = function (e, t) {
    this.bulletCD = 100;
    this.bullets = 3;
    this.HP = 3;
    this.combo = 0;
    this.canShoot = true;
    Phaser.Sprite.call(this, game, e, t, "bunny", "Rabbit 1.png");
    this.anchor.setTo(0, 1);
    game.add.existing(this);
    var n = [0];
    this.shotAnim = this.animations.add("shot", n, 60, true, true);
    var r = new Array;
    for (var i = 1; i <= 20; i++) {
        r[i - 1] = i
    }
    var s = this.animations.add("shoot", r, 60, false, true);
    s.onComplete.add(function () {
        this.play("idle", 15, true, false)
    }, this);
    var o = new Array;
    var u = 0;
    for (var i = 16; i <= 53; i++) {
        o[u] = i;
        u++
    }
    this.animations.add("idle", o, 15, false, true);
    this.play("idle", 15, true, false);
    game.input.onDown.add(this.shoot, this)
};
Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;
Bunny.prototype.update = function () {};
Bunny.prototype.shoot = function () {
    if (this.game.time.now > this.bulletCD && this.canShoot == true && this.bullets > 0) {
        this.play("shoot", 120, false, false);
        var e = bullets.getFirstExists(false);
        game.physics.enable(e, Phaser.Physics.ARCADE);
        if (e) {
            e.reset(player.x + 70, player.y - 30);
            e.rotation = this.game.physics.arcade.angleToPointer(e);
            e.body.velocity.x = Math.cos(e.rotation) * BULLET_SPEED;
            e.body.velocity.y = Math.sin(e.rotation) * BULLET_SPEED;
            this.bulletCD = this.game.time.now + 100;
            this.updateBullets(-1)
        }
    }
};
Bunny.prototype.updateBullets = function (e) {
    this.bullets = Math.max(this.bullets + e, 0);
    currentLevel.bulletsLeft.text = "x" + this.bullets;
    if (this.bullets <= 0) {
        game.time.events.add(Phaser.Timer.SECOND * 3, this.outOfBullets, this)
    }
};
Bunny.prototype.updateHealth = function (e) {
    this.HP = Math.max(this.HP + e, 0);
    currentLevel.heartsLeft.text = "x" + this.HP;
    if (this.HP <= 0) {
        this.canShoot = false;
        game.time.events.add(Phaser.Timer.SECOND * 3, this.outOfHealth, this)
    }
};
Bunny.prototype.outOfBullets = function () {
    if (this.bullets <= 0) {
        currentLevel.levelFailed()
    }
};
Bunny.prototype.outOfHealth = function () {
    if (this.HP <= 0) {
        currentLevel.levelFailed()
    }
};
Bunny.prototype.onShot = function () {
    this.play("shot");
    this.updateHealth(-1)
};
var game = new Phaser.Game(800, 480, Phaser.AUTO, "game", null, false, true);
game.state.add("Preload", Preload, false);
game.state.add("MainMenu", MainMenu, false);
game.state.add("LevelSelect", LevelSelect, false);
game.state.add("GameLevel", GameLevel, false);
game.state.start("Preload");
MovingObject = function (e, t, n, r) {
    this.objectData = e;
    this.Speed = r;
    Phaser.Sprite.call(this, game, t, n, e.spriteSheet, e.defaultFrame);
    this.events.onKilled.add(this.onBirdKilled, this);
    this.animations.add("fly");
    this.animations.play("fly", 15, true);
    this.game.add.existing(this);
    this.hasTNT = true;
    this.canMove = true;
    if (this.objectData.spriteSheet == "pigeon") {
        this.droppingPos = game.rnd.realInRange(50, game.width - 10);
        this.dropped = false
    } else if (this.objectData.spriteSheet == "cardinal") {
        this.switchPos = game.rnd.realInRange(game.world.centerX, game.width - 20);
        this.switched = false
    }
    game.physics.enable(this, Phaser.Physics.ARCADE);
    birdsGroup.push(this)
};
MovingObject.prototype = Object.create(Phaser.Sprite.prototype);
MovingObject.prototype.constructor = MovingObject;
MovingObject.prototype.update = function () {
    if (this.canMove == true) {
        this.body.velocity.x = -this.Speed * 10
    }
    if (this.x <= player.x && this.hasTNT == true && currentLevel.levelOver != true && player.HP > 0) {
        this.resetTNT()
    }
    game.physics.arcade.overlap(this, bullets, this.onObjectShot, null, this);
    if (this.objectData.spriteSheet == "pigeon") {
        if (this.dropped == false && this.x <= this.droppingPos && currentLevel.levelOver != true && player.HP > 0) {
            var e = birdDroppings.getFirstDead(false);
            if (e) {
                e.reset(this.x, this.y);
                e.alpha = 1;
                game.world.bringToTop(birdDroppings);
                this.dropped = true;
                var t = game.add.tween(e);
                t.onComplete.add(function (e) {
                    e.kill()
                }, this);
                t.to({
                    alpha: 0
                }, 500, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND * 3)
            }
        }
    } else if (this.objectData.spriteSheet == "cardinal") {
        if (this.switched == false && this.x <= this.switchPos) {
            this.visible = false;
            this.canMove = false;
            this.body.enable = false;
            this.body.velocity.x = 0;
            this.switched = true;
            this.y = game.height - game.rnd.pick(currentLevel.lanes);
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                this.visible = true;
                this.canMove = true;
                this.body.enable = true
            }, this)
        }
    }
    if (this.x < 0) {
        this.kill()
    }
};
MovingObject.prototype.onObjectShot = function (e, t) {
    if (this.body.enable == true) {
        e.kill();
        t.kill();
        var n = 0;
        player.combo++;
        if (player.combo >= 2) {
            n = 1
        }
        player.updateBullets(1 + n)
    }
};
MovingObject.prototype.onBirdKilled = function () {
    currentLevel.totalKilledBirds++
};
MovingObject.prototype.resetData = function (e, t, n) {
    this.Speed = n;
    this.x = e;
    this.y = t
};
MovingObject.prototype.resetTNT = function () {
    this.TNT = game.add.sprite(this.x, this.y + 30, "TNT");
    this.TNT.smoothed = false;
    this.TNT.anchor.setTo(.5, .5);
    this.TNT.scale.x = .5;
    this.TNT.scale.y = .5;
    this.hasTNT = false;
    var e = game.add.tween(this.TNT);
    e.onComplete.add(this.TNTExplode, this);
    e.to({
        y: player.y - 30
    }, 500, Phaser.Easing.Linear.None, true)
};
MovingObject.prototype.TNTExplode = function () {
    currentLevel.explosionEmitter.x = player.x + 30;
    currentLevel.explosionEmitter.y = player.y - 40;
    currentLevel.explosionEmitter.minParticleSpeed.setTo(-200, -200);
    currentLevel.explosionEmitter.maxParticleSpeed.setTo(200, 200);
    currentLevel.explosionEmitter.start(true, 500, null, 20);
    player.onShot();
    this.TNT.kill()
};
MovingObject.prototype.resetData = function (e) {
    this.Speed = e;
    this.hasTNT = true;
    if (this.objectData.spriteSheet == "pigeon") {
        this.droppingPos = game.rnd.realInRange(50, game.width - 10);
        this.dropped = false
    } else if (this.objectData.spriteSheet == "cardinal") {
        this.switchPos = game.rnd.realInRange(game.world.centerX, game.width - 20);
        this.switched = false
    }
}
