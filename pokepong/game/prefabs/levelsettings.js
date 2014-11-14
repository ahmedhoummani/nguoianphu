'use strict';

var Levelsettings = function(a) {
	
	this._levelNumber = a;
	
	return Object.defineProperty(this, "levelNumber", {
				get : function() {
					return this._levelNumber
				},
				enumerable : !0,
				configurable : !0
			})

};

module.exports = Levelsettings;
