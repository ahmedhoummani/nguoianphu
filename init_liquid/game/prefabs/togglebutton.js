'use strict';

var Simplebutton = require('./simplebutton');

var Togglebutton = function(b, c, d, e, f) {
	Simplebutton.call(this, b, c, d, e, f);

	// initialize your prefab here
	this.spriteSheet = e;
	this.textureKey1 = f;
	this.textureKey2 = g;
	this.activeTextureKey = this.textureKey1;
	this._state = 1;
	this.events.onInputUp.add(this.switchTextures, this, 2);
	
	Object.defineProperty(this, "state", {
				get : function() {
					return this._state;
				},
				enumerable : !0,
				configurable : !0
			});

};

Togglebutton.prototype = Object.create(Phaser.Sprite.prototype);
Togglebutton.prototype.constructor = Togglebutton;

Togglebutton.prototype.update = function() {

	// write your prefab's specific update code here

};

Togglebutton.prototype.switchTextures = function() {
	this.activeTextureKey = this.activeTextureKey === this.textureKey1
			? this.textureKey2
			: this.textureKey1;
	this.loadTexture(this.spriteSheet, this.activeTextureKey);
	this._state = this.activeTextureKey === this.textureKey1 ? 1 : 2;
};

module.exports = Togglebutton;
