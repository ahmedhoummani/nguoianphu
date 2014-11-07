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
	this.inputEnabled && this.events.onInputDown.add(function() {
				g.game.device.webAudio && g.game.sound.play("tap"), g.game.add
						.tween(g.scale).to({
									x : 1.2,
									y : .8
								}, 200, Phaser.Easing.Back.Out, !0).onComplete
						.addOnce(function() {
							g.clicked = !0, g.callbackTimer = 0, g.game.add
									.tween(g.scale).to({
												x : 1,
												y : 1
											}, 200, Phaser.Easing.Back.Out, !0);
						}, g);
			});

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

Simplebutton.prototype.update = function() {

	// write your prefab's specific update code here
	this.clicked
			&& (this.callbackTimer += this.game.time.elapsed, this.callbackTimer >= this.callbackDelay
					&& (this._callback.dispatch(), this.clicked = !1, this.callbackTimer = 0));
};

Simplebutton.prototype.setCallbackDelay = function(a) {
	this.callbackDelay = a;
};

Simplebutton.prototype.destroy = function() {
	this.prototype.destroy.call(this);
	this._callback.dispose();
	this._callback = null;
};

module.exports = Simplebutton;
