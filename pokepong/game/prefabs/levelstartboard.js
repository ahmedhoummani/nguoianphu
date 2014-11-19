var Level2pokemon = require('./level2pokemon');

'use strict';

var Levelstartboard = function(game, parent, level) {
	Phaser.Group.call(this, game, parent.world, "Level Start Board");

	this.levels_num = 28;
	this.levelNumber = level;
	this._level2pokemon = new Level2pokemon(this.levelNumber);
	// this._level2pokemon.pokemon
	// this._level2pokemon.pokemon_name
	// this._level2pokemon.pokemon_icon

	this.addBackGround();

	this.board = this.game.add.image(0, 0, "bggroup", "creditbg.png", this);
	this.board.position.set(this.game.width / 2 - this.board.width / 2,
			this.game.height / 2 - this.board.height / 2);

	this.initText(this._level2pokemon.pokemon_name);

	this.exists = !1;
	this.visible = !1;

};

Levelstartboard.prototype = Object.create(Phaser.Group.prototype);
Levelstartboard.prototype.constructor = Levelstartboard;

Levelstartboard.prototype.addBackGround = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Levelstartboard.prototype.initText = function(b) {
	var c = {
		font : "76px font",
		fill : "#FBAF05",
		align : "center",
		stroke : "#FFFFFF",
		strokeThickness : 12
	}, d = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2
					+ 100, b, c);
	d.anchor.set(.5, .5);
	d.setShadow(2, 2, "#FB1A05", 2);
	this.add(d);

};
Levelstartboard.prototype.update = function() {

	if (this.game.input.activePointer.isDown) {

		this.hide();
	}

};

Levelstartboard.prototype.show = function() {
	this.exists = !0;
	this.visible = !0;

	this.alpha = 0;
	this.board.y -= 200;
	this.game.add.tween(this).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0);
	this.game.add.tween(this.board).to({
				y : 200
			}, 500, Phaser.Easing.Back.Out, !0).onComplete.addOnce(
			this.onShowComplete, this);

};
Levelstartboard.prototype.onShowComplete = function() {
};

Levelstartboard.prototype.hide = function() {
	this.game.add.tween(this).to({
				alpha : 0
			}, 100, Phaser.Easing.Linear.None, !0, 400);
	this.game.add.tween(this.board).to({
				y : 500
			}, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(
			this.onHideComplete, this);

};
Levelstartboard.prototype.onHideComplete = function() {
	this.exists = !1;
	this.visible = !1;
};

module.exports = Levelstartboard;
