Game.Instructions = function (game) {}
Game.Instructions.prototype = {
    create: function () {
        back = this.game.add.tileSprite(0, 0, 320, 480, 'background');
        this.game.add.sprite(0, 0, 'instruction');
        this.game.input.onDown.add(function () {
            this.game.fading.fadeAndPlay("rgb(0,0,0)", 0.5, 'InGame');
        }, this);
    }
}
