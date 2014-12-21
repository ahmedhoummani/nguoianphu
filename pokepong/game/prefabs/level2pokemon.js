'use strict';

var Level2pokemon = function(a) {

	this._levelNumber = a;

	var pokemon, pokemon_name, pokemon_type, pokemon_icon, frame_left = [], frame_ghostleft = [], frame_right = [], frame_ghostright = [];

	switch (this._levelNumber) {
		case 1:
		case 8:
		case 15:
		case 22 :
			pokemon = 'weedle', pokemon_name = 'Weedle', pokemon_type = 'grass', pokemon_icon = 'weedle_icon.png', frame_left = [
					'01.png', '02.png', '03.png'], frame_ghostleft = ['07.png',
					'08.png', '09.png'], frame_right = ['04.png', '05.png',
					'06.png'], frame_ghostright = ['10.png', '11.png', '12.png'];
			break;
		case 2:
			pokemon = 'goldfish', pokemon_name = 'Goldfish', pokemon_type = 'water', pokemon_icon = 'goldfish_icon.png', frame_left = [
					'01.png', '02.png', '02.png', '03.png', '04.png', '04.png', '05.png', '05.png', '06.png',
					'07.png', '08.png'], frame_ghostleft = ['17.png', '18.png'], frame_right = ['09.png', '10.png', '11.png', '11.png', '12.png', '12.png', '13.png', '14.png', '14.png', '15.png', '16.png'], frame_ghostright = ['19.png', '20.png'];
			break;
		case 9:
		case 16:
		case 23 :
			pokemon = 'muk', pokemon_name = 'Grimer', pokemon_type = 'sand', pokemon_icon = 'muk_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '04.png'], frame_ghostleft = [
					'09.png', '09.png', '10.png', '10.png'], frame_right = [
					'05.png', '06.png',
					'07.png', '08.png', '08.png'], frame_ghostright = [
					'11.png', '11.png', '12.png', '12.png'];
			break;
		case 3
		:case 10:
		case 17:
		case 24 :
			pokemon = 'beedrill', pokemon_name = 'Beedrill', pokemon_type = 'grass', pokemon_icon = 'beedrill_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png'], frame_ghostleft = [
					'11.png','11.png','12.png','12.png'], frame_right = [
					'06.png','07.png', '08.png', '09.png', '10.png'], frame_ghostright = [
					'11.png','11.png','12.png','12.png'];
			break;
		case 4:
		case 11:
		case 18:
		case 25 :
			pokemon = 'arcanine', pokemon_name = 'Arcanine', pokemon_type = 'sand', pokemon_icon = 'arcanine_icon.png', frame_left = [
					'01.png', '01.png', '02.png', '02.png'], frame_ghostleft = [
					'05.png', '05.png', '06.png', '06.png'], frame_right = [
					'03.png', '03.png', '04.png', '04.png'], frame_ghostright = [
					'07.png', '07.png', '08.png', '08.png'];
			break;
		case 5:
		case 12:
		case 19:
		case 26 :
			pokemon = 'steelix', pokemon_name = 'Steelix', pokemon_type = 'sand', pokemon_icon = 'steelix_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png', '06.png',
					'07.png', '08.png', '09.png'], frame_ghostleft = ['19.png', '20.png', '21.png'], frame_right = ['10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png'], frame_ghostright = ['22.png', '23.png', '24.png'];			
			break;
		case 6:
		case 13:
		case 20:
		case 27:
			pokemon = 'gyarados', pokemon_name = 'Gyarados', pokemon_type = 'water', pokemon_icon = 'gyarados_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png', '06.png',
					'07.png', '08.png', '09.png', '10.png', '11.png', '12.png'], frame_ghostleft = ['25.png', '25.png', '26.png', '26.png'], frame_right = ['13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png', '24.png'], frame_ghostright = [
					'27.png', '27.png', '28.png', '28.png'];			
			break;
		case 7:
		case 14:
		case 21:
		case 28 :
			pokemon = 'charizard', pokemon_name = 'Charizard', pokemon_type = 'sand', pokemon_icon = 'charizard_icon.png', frame_left = [
					'01.png', '02.png', '03.png', '04.png', '05.png', '06.png',
					'07.png', '08.png'], frame_ghostleft = ['17.png', '18.png',
					'19.png'], frame_right = ['09.png', '010.png', '11.png',
					'12.png', '13.png', '14.png', '15.png', '16.png'], frame_ghostright = [
					'17.png', '18.png', '19.png'];			
			break;
		default :
			pokemon = 'weedle', pokemon_name = 'Weedle', pokemon_type = 'grass', pokemon_icon = 'weedle_icon.png', frame_left = [
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
			
	Object.defineProperty(this, "pokemon_type", {
				get : function() {
					return pokemon_type
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
