
'use strict';

function Boot() {}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
  
    this.game.input.maxPointers = 1;

    this.stage.disableVisibilityChange = true;
	
	this.scaleStage();

    this.game.state.start('preload');

  },

  scaleStage:function(){
    	if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.NO_BORDER;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }
        
        this.scale.minWidth = this.gameWidth/2;
        this.scale.minHeight = this.gameHeight/2;
        this.scale.maxWidth = this.gameWidth;
        this.scale.maxHeight = this.gameHeight;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
		if(this.scale.scaleMode==Phaser.ScaleManager.NO_BORDER){
			this.viewX = (this.scale.width/2 - window.innerWidth/2)*this.scale.scaleFactor.x;
			this.viewY = (this.scale.height/2 - window.innerHeight/2 - 1)*this.scale.scaleFactor.y;
			this.viewWidth = this.gameWidth-this.viewX;
			this.viewHeight = this.gameHeight-this.viewY;
		}else{
			this.viewX = 0;
			this.viewY = 0;
			this.viewWidth = this.gameWidth;
			this.viewHeight = this.gameHeight;
		}
	
		document.getElementById("game").style.width = window.innerWidth+"px";
		document.getElementById("game").style.height = window.innerHeight-1+"px";//The css for body includes 1px top margin, I believe this is the cause for this -1
		document.getElementById("game").style.overflow = "hidden";
    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        this.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        this.orientated = true;

        document.getElementById('orientation').style.display = 'none';
		this.scaleStage();
    }
};

module.exports = Boot;
