var SimpleButton = require('./simplebutton');
var Level2pokemon = require('./level2pokemon');
var Ballopening = require('./ballopening');

'use strict';

var Levelcompleteboard = function(b, c, d) {
	Phaser.Group.call(this, b, c, "Level Complete Board");

	this.levels_num = 28;
	this.levelNumber = d;

	this._level2pokemon = new Level2pokemon(this.levelNumber);

	this.addBackGround();
	this.completeboard = this.game.add.image(-10, 250, "bggroup",
			"creditbg.png", this);
	this.completeboard.position.set(this.game.width / 2
					- this.completeboard.width / 2, this.game.height / 2
					- this.completeboard.height / 2);

	this.addBallopening();

	this.initPokemon(this._level2pokemon.pokemon,
			this._level2pokemon.pokemon_name, this._level2pokemon.pokemon_icon);

	this.addButtons();

};

Levelcompleteboard.prototype = Object.create(Phaser.Group.prototype);
Levelcompleteboard.prototype.constructor = Levelcompleteboard;

Levelcompleteboard.prototype.addBackGround = function() {
	var a = this.game.add.graphics(0, 0, this);
	a.beginFill(0, .5);
	a.drawRect(0, 0, this.game.width, this.game.height);
	a.endFill()
};
Levelcompleteboard.prototype.addBallopening = function() {
	this.ballopening = new Ballopening(this.game, this.game.width / 2 + 200,
			this.game.height / 2 - 100);

	this.ballopening.anchor.set(.5, .5)
	this.add(this.ballopening);

};
Levelcompleteboard.prototype.initPokemon = function(key, name, _icon) {
	this.icon = new Phaser.Image(this.game, this.game.width / 2 - 100,
			this.game.height / 2 - 100, key, _icon);

	this.icon.anchor.set(.5, .5)
	this.add(this.icon);

};
Levelcompleteboard.prototype.addButtons = function() {
	var a = this, b = 550, c = 120, d = new SimpleButton(this.game,
			this.game.width / 2, b, "buttonsgroup", "restart.png");
	d.callback.addOnce(function() {
				a.game.state.start("level", !0, !1, a.levelNumber)
			}, this);

	var e = new SimpleButton(this.game, d.x - c, b, "buttonsgroup", "menu.png");
	e.callback.addOnce(function() {
				a.game.state.start("levelsmenu")
			}, this);

	var f = new SimpleButton(this.game, d.x + c + .25, b, "buttonsgroup",
			"play2.png");
	f.callback.addOnce(function() {
				a.levelNumber === this.levels_num ? a.game.state
						.start("levelsmenu") : a.game.state.start("level", !0,
						!1, a.levelNumber + 1)
			}, this);

	this.buttons = [e, d, f];
	this.buttons.forEach(function(b) {
				a.add(b)
			})
};
Levelcompleteboard.prototype.show = function() {
	var a = this;
	this.visible = !0;
	this.completeboard.y -= 200;
	this.completeboard.alpha = 0;
	var b = 500;
	this.game.add.tween(this.completeboard).to({
				alpha : 1
			}, 200, Phaser.Easing.Linear.None, !0), this.game.add
			.tween(this.completeboard).to({
						y : this.completeboard.y + 200
					}, b, Phaser.Easing.Back.Out, !0);
	var c = b;
	this.buttons.forEach(function(d) {
				d.y -= 200, d.visible = !1, a.game.add.tween(d).to({
							y : d.y + 200
						}, b, Phaser.Easing.Back.Out, !0, c).onStart.addOnce(
						function() {
							d.visible = !0
						}, a), c += 100
			});

	// move the pokemon icon to the openning ball
	var d = Phaser.Math.distance(this.icon.x, this.icon.y, this.ballopening.x,
			this.ballopening.y);
	this.game.add.tween(this.icon).to({
				x : this.ballopening.x,
				y : this.ballopening.y - 56
			}, 1000, Phaser.Easing.Back.In, !0), this.game.add
			.tween(this.icon.scale).to({
						x : .33,
						y : .33
					}, 1000, Phaser.Easing.Back.In, !0, 1000).onComplete
			.addOnce(function() {
						this.icon.kill();
						this.ballopening.animations.play('close');
						this.ballopening.position.set(this.game.width / 2,
								this.game.height / 2 - this.ballopening.height
										/ 2);
					}, this);

};

module.exports = Levelcompleteboard;
