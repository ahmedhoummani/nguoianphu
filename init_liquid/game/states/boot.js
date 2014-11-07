'use strict';

function Boot() {
}

Boot.prototype = {
	preload : function() {
		this.load.image('preloader', 'assets/LoadingBar_Inner.png');
	},
	create : function() {

		this.setupStage();
		this.detectWeakDevice();
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');
	},
	setupStage : function() {
		var b = this.game.scale;
		b.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		b.minWidth = .25 * this.game.world.width;
		b.minHeight = .25 * this.game.world.height;
		b.aspectRatio = this.game.world.width / this.game.world.width;
		b.pageAlignHorizontally = !0;
		b.pageAlignVertically = !0;
		this.game.device.desktop || b.forceOrientation(!1, !0);
		b.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this);
		b.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this);
		b.setScreenSize(!0);
		this.stage.disableVisibilityChange = !0;
		this.stage.backgroundColor = 11193204;
	},
	detectWeakDevice : function() {
		var b = !1;
		if (this.game.device.desktop === !1) {
			var c = detect.parse(window.navigator.userAgent);
			this.game.device.iOS
					&& (c.os.major < 7 && (b = !0), c.browser.family
							.indexOf("Chrome") > -1
							&& (b = !0)), this.game.device.android
					&& (c.browser.family.indexOf("Android") > -1 && (b = !0), c.browser.family
							.indexOf("Chrome Mobile") > -1
							&& c.browser.major <= 18 && (b = !0)), this.game.device.windowsPhone
					&& c.browser.family.indexOf("IE") > -1
					&& (b = c.browser.major < 10);
		}
	},
	onEnterIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px";
	},
	onLeaveIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px", this.game.device.android
				&& !this.game.device.chrome
				&& this.game.scale.setScreenSize(!0), this.game.time.events
				.repeat(500, 3, this.game.scale.setScreenSize, this);
	}

};

module.exports = Boot;
