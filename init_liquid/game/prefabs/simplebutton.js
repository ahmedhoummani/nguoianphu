'use strict';

var Simplebutton = function(b, c, d, e, f) {
	Phaser.Image.call(this, b, c, d, e, f);

	// initialize your prefab here
	var g = this;
	this.callbackDelay = 20;
	this.callbackTimer = 0;
	this.clicked = !1;
	this._callback = new Phaser.Signal();
	this.anchor.set(.5, .5);
	this.inputEnabled = !0;
	this.game.device.desktop && (this.input.useHandCursor = !0);
	
	this.inputEnabled && (this.events.onInputDown.add(function() {
				g.game.device.webAudio && g.game.sound.play("tap"), g.game.add
						.tween(g.scale).to({
									x : .9,
									y : .9
								}, 200, Phaser.Easing.Cubic.Out, !0)
			}), this.events.onInputUp.add(function() {
				g.game.add.tween(g.scale).to({
							x : 1,
							y : 1
						}, 100, Phaser.Easing.Cubic.Out, !0).onComplete
						.addOnce(g._callback.dispatch, g)
			}));

	Object.defineProperty(this, "callback", {
				get : function() {
					return this._callback;
				},
				enumerable : !0,
				configurable : !0
			});

};

Simplebutton.prototype = Object.create(Phaser.Image.prototype);
Simplebutton.prototype.constructor = Simplebutton;

Simplebutton.prototype.setCallbackDelay = function(a) {
	this.callbackDelay = a;
};

module.exports = Simplebutton;
