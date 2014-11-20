'use strict';

var Level2pokemon = function(a) {

	this._levelNumber = a;

	var pokemon, pokemon_name, pokemon_icon, frame_left = [], frame_ghostleft = [], frame_right = [], frame_ghostright = [];

	switch (this._levelNumber) {
		case 1 :
			pokemon = 'weedle', pokemon_name = 'Weedle', pokemon_icon = 'weedle_icon.png', frame_left = [
					'01.png', '02.png', '03.png'], frame_ghostleft = ['07.png',
					'08.png', '09.png'], frame_right = ['04.png', '05.png',
					'06.png'], frame_ghostright = ['10.png', '11.png', '12.png'];
			break;
		case 2 :
			pokemon = 'charizard', pokemon_name = 'Charizard', pokemon_icon = 'charizard_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png', '06.png',
					'07.png', '08.png'], frame_ghostleft = ['17.png', '18.png',
					'19.png'], frame_right = ['09.png', '010.png', '11.png',
					'12.png', '13.png', '14.png', '15.png', '16.png'], frame_ghostright = [
					'17.png', '18.png', '19.png'];
			break;
		default :
			pokemon = 'weedle', pokemon_name = 'Weedle', pokemon_icon = 'weedle_icon.png', frame_left = [
					'01.png', '02.png', '03.png'], frame_ghostleft = ['07.png',
					'08.png', '09.png'], frame_right = ['04.png', '05.png',
					'06.png'], frame_ghostright = ['10.png', '11.png', '12.png'];
	}

	Object.defineProperty(this, "levelNumber", {
				get : function() {
					return this._levelNumber
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "pokemon", {
				get : function() {
					return pokemon
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "pokemon_name", {
				get : function() {
					return pokemon_name
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "pokemon_icon", {
				get : function() {
					return pokemon_icon
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "frame_left", {
				get : function() {
					return frame_left
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "frame_ghostleft", {
				get : function() {
					return frame_ghostleft
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "frame_right", {
				get : function() {
					return frame_right
				},
				enumerable : !0,
				configurable : !0
			}),

	Object.defineProperty(this, "frame_ghostright", {
				get : function() {
					return frame_ghostright
				},
				enumerable : !0,
				configurable : !0
			})

};

module.exports = Level2pokemon;
