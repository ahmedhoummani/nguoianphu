(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'duck981');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":14,"./states/gameover":15,"./states/menu":16,"./states/play":17,"./states/preload":18}],2:[function(require,module,exports){
'use strict';

var Bullets = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullets');

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.body.outOfBoundsKill = true;
  this.body.checkWorldBounds = true;

  this.game.add.existing(this);

};

Bullets.prototype = Object.create(Phaser.Sprite.prototype);
Bullets.prototype.constructor = Bullets;

Bullets.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Bullets;

},{}],3:[function(require,module,exports){
'use strict';

var Drill = function(game, x, y, player, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, 'drill', player, enemyBullets);

  // initialize your prefab here
  
	this.game.physics.arcade.enableBody(this);
  
	this.player = player;
	this.enemyBullets = enemyBullets;
	this.game = game;
	this.health = 10;
    this.fireRate = 700;
    this.nextFire = 100;
    this.alive = true;


  this.anchor.set(0.5, 0.5);

  this.animations.add('rigs');
  this.animations.play('rigs', 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 50) + 50, 100, this.body.velocity);
  this.game.add.existing(this);


};

Drill.prototype = Object.create(Phaser.Sprite.prototype);
Drill.prototype.constructor = Drill;

Drill.prototype.update = function() {

  // write your prefab's specific update code here

  this.animations.play('rigs');
  
   // fire the bullets

  if (this.game.physics.arcade.distanceBetween(this, this.player) < 300) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 130);
	  
	  // wanted the duck
		this.game.physics.arcade.moveToObject(this, this.player, 30);

    }
	
	}
	

};

Drill.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Drill;

},{}],4:[function(require,module,exports){
'use strict';

var Ducks = function(game, x, y, bullets) {
  Phaser.Sprite.call(this, game, x, y, 'ducks', bullets);

  // initialize your prefab here
  
  this.bullets = bullets;
  this.fireRate = 400;
  this.nextFire = 0;

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(0.3, 0.3);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.health = 5;
  this.alive = true;


};

Ducks.prototype = Object.create(Phaser.Sprite.prototype);
Ducks.prototype.constructor = Ducks;

Ducks.prototype.update = function() {

  // write your prefab's specific update code here

  // ducks faces to pointer

  if (this.x < this.game.input.worldX) {

    this.animations.play('right');

  } else if (this.x > this.game.input.worldX) {

    this.animations.play('left');

  }

  // ducks face up
  if (this.angle != 0) {
    this.angle = 0;
  }
  
  // ducks move to the pointer
    this.game.physics.arcade.moveToPointer(this, 180, this.game.input.activePointer, 0);



};


Ducks.prototype.fire = function() {

  if (this.alive) {
 
    this.animation = this.game.add.tween(this);

    if (this.x < this.game.input.worldX) {

      this.animation.to({
        angle: 20
      }, 150);

    }
    if (this.x > this.game.input.worldX) {

      this.animation.to({
        angle: -20
      }, 150);

    }

    this.animation.start();
	
	// fire the bullets
	if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
    
		this.nextFire = this.game.time.now + this.fireRate;
		
		var bullet = this.bullets.getFirstDead();

		bullet.reset(this.x, this.y);

		bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 300, this.game.input.activePointer, 700);
	}
    // ducks move to the pointer
    this.game.physics.arcade.moveToPointer(this, 300, this.game.input.activePointer, 0);
    // ducks face down

  }


};


Ducks.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Ducks;

},{}],5:[function(require,module,exports){
'use strict';

var Helicopter = function(game, x, y, player, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, 'helicopter', player, enemyBullets);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.player = player;
  this.enemyBullets = enemyBullets;

  this.game = game;
  this.health = 1;
  this.fireRate = 800;
  this.nextFire = 0;
  this.alive = true;
  
  this.anchor.set(0.5, 0.5);
  // this.scale.setTo(2, 2);

  // this.animations.add('face', [0, 1, 2], 3, true);
  this.animations.add('right', [0, 1, 2, 3], 4, true);
  this.animations.add('left', [7, 6, 5, 4], 4, true);
  // this.animations.add('back', [9, 10, 11], 3, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  // this.body.allowRotation = false;
  // this.bringToTop();
  // this.body.drag.set(0.2);

  this.body.immovable = false;

  // this.body.maxVelocity.y = 50;
  // this.body.maxVelocity.x = 50;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 200, this.body.velocity);
  this.game.add.existing(this);


};

Helicopter.prototype = Object.create(Phaser.Sprite.prototype);
Helicopter.prototype.constructor = Helicopter;

Helicopter.prototype.update = function() {

  // write your prefab's specific update code here

  // Helicopter left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }
  
  // fire the bullets

  if (250 < this.game.physics.arcade.distanceBetween(this, this.player) && this.game.physics.arcade.distanceBetween(this, this.player) < 400) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 100);
//      this.shot.play();
    }
  }

};

Helicopter.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Helicopter;

},{}],6:[function(require,module,exports){
'use strict';

var Island = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'island');

 // initialize your prefab here
  this.game.physics.arcade.enableBody(this);
   this.anchor.set(0.5, 0.5);
  this.game.add.existing(this);
  
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;

  this.body.immovable = true;

};

Island.prototype = Object.create(Phaser.Sprite.prototype);
Island.prototype.constructor = Island;

Island.prototype.update = function() {

  // write your prefab's specific update code here
};

module.exports = Island;

},{}],7:[function(require,module,exports){
'use strict';

var Rockets = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'rockets', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('fire');
  this.animations.play('fire', 3, true);

  this.body.outOfBoundsKill = true;
  this.body.checkWorldBounds = true;

  this.game.add.existing(this);

};

Rockets.prototype = Object.create(Phaser.Sprite.prototype);
Rockets.prototype.constructor = Rockets;

Rockets.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Rockets;

},{}],8:[function(require,module,exports){
'use strict';

var Scoreboard = function(game) {

  Phaser.Group.call(this, game);


  this.fixedToCamera = true;
  this.cameraOffset.x = 200;
  this.cameraOffset.y = 50;

  this.winText = this.game.add.bitmapText(this.x - 120, 80, 'flappyfont', '', 62);
  this.add(this.winText);

  this.lostText = this.game.add.bitmapText(this.x - 120, 80, 'flappyfont', '', 62);
  this.add(this.lostText);


  this.scoreboard = this.create(this.theX, 200, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);

  this.scoreText = this.game.add.bitmapText(this.x + 50, 180, 'flappyfont', '', 22);
  this.add(this.scoreText);

  this.bestText = this.game.add.bitmapText(this.x + 50, 230, 'flappyfont', '', 22);
  this.add(this.bestText);

  // add our start button with a callback
  this.startButton = this.game.add.button(this.x, 300, 'startButton', this.startClick, this);
  this.startButton.anchor.setTo(0.5, 0.5);
  this.startButton.inputEnabled = true;
  this.startButton.input.useHandCursor = true;

  this.add(this.startButton);

  this.y = this.game.height;
  this.x = 0;

};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score, win) {

  if (win) {
    this.winText.setText('You win');
  } else {
    this.lostText.setText('Game Over');
  }

  var coin, bestScore;
  this.scoreText.setText(score.toString());
  if ( !! localStorage) {
    bestScore = localStorage.getItem('bestScore');
    if (!bestScore || bestScore < score) {
      bestScore = score;
      localStorage.setItem('bestScore', bestScore);
    }
  } else {
    bestScore = 'N/A';
  }

  this.bestText.setText(bestScore.toString());

  if (score >= 70) {
    coin = this.game.add.sprite(-65, 7, 'medals', 1);
  } else if (score >= 50) {
    coin = this.game.add.sprite(-65, 7, 'medals', 0);
  }

  this.game.add.tween(this).to({
    y: 0
  }, 1000, Phaser.Easing.Bounce.Out, true);

  if (coin) {

    coin.anchor.setTo(0.5, 0.5);
    this.scoreboard.addChild(coin);

    // Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    var emitter = this.game.add.emitter(coin.x, coin.y, 400);
    this.scoreboard.addChild(emitter);
    emitter.width = coin.width;
    emitter.height = coin.height;


    //  This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
    // emitter.width = 800;

    emitter.makeParticles('particle');

    // emitter.minParticleSpeed.set(0, 300);
    // emitter.maxParticleSpeed.set(0, 600);

    emitter.setRotation(-100, 100);
    emitter.setXSpeed(0, 0);
    emitter.setYSpeed(0, 0);
    emitter.minParticleScale = 0.25;
    emitter.maxParticleScale = 0.5;
    emitter.setAll('body.allowGravity', false);

    emitter.start(false, 1000, 1000);

  }
};

Scoreboard.prototype.startClick = function() {
  this.game.state.start('play');
};





Scoreboard.prototype.update = function() {
  // write your prefab's specific update code here
};

module.exports = Scoreboard;

},{}],9:[function(require,module,exports){
'use strict';

var Sea_top = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_top');

  // initialize your prefab here
  this.autoScroll(-35, 0);
  // this.fixedToCamera = true;

};

Sea_top.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_top.prototype.constructor = Sea_top;

Sea_top.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_top;

},{}],10:[function(require,module,exports){
'use strict';

var Sea_wave = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_wave');

  // initialize your prefab here
  this.autoScroll(30, 0);
  this.fixedToCamera = true;

};

Sea_wave.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_wave.prototype.constructor = Sea_wave;

Sea_wave.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_wave;

},{}],11:[function(require,module,exports){
'use strict';

var Ships = function(game, x, y, player, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, 'ship1', player, enemyBullets);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.player = player;
  this.enemyBullets = enemyBullets;

  this.game = game;
  this.health = 5;
  this.fireRate = 800;
  this.nextFire = 100;
  this.alive = true;

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 300, this.body.velocity);
  this.game.add.existing(this);


};

Ships.prototype = Object.create(Phaser.Sprite.prototype);
Ships.prototype.constructor = Ships;

Ships.prototype.update = function() {

  // write your prefab's specific update code here

  // ships cannot over sea_on

  if (this.y < 70) {

    this.body.velocity.y += Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  // ships left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }


  // fire the bullets

  if (200 < this.game.physics.arcade.distanceBetween(this, this.player) && this.game.physics.arcade.distanceBetween(this, this.player) < 300) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 150);
//      this.shot.play();

		// wanted the duck
		// this.game.physics.arcade.moveToObject(this, this.player, 10);
    }
  }


};

Ships.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Ships;

},{}],12:[function(require,module,exports){
'use strict';

var Ships = function(game, x, y, player, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, 'ship2', player, enemyBullets);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.player = player;
  this.enemyBullets = enemyBullets;

  this.game = game;
  this.health = 5;
  this.fireRate = 900;
  this.nextFire = 100;
  this.alive = true;

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;
  
  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 250, this.body.velocity);
  this.game.add.existing(this);


};

Ships.prototype = Object.create(Phaser.Sprite.prototype);
Ships.prototype.constructor = Ships;

Ships.prototype.update = function() {

  // write your prefab's specific update code here

  // ships cannot over sea_on

  if (this.y < 70) {

    this.body.velocity.y += Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  // ships left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }


  // fire the bullets

  if (200 < this.game.physics.arcade.distanceBetween(this, this.player) && this.game.physics.arcade.distanceBetween(this, this.player) < 300) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 130);
//      this.shot.play();
		// wanted the duck
		// this.game.physics.arcade.moveToObject(this, this.player, 10);
    }
  }


};

Ships.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Ships;

},{}],13:[function(require,module,exports){
'use strict';

var Ships = function(game, x, y, player, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, 'ships', player, enemyBullets);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.player = player;
  this.enemyBullets = enemyBullets;
  
  this.game = game;
  this.health = 5;
  this.fireRate = 1000;
  this.nextFire = 100;
  this.alive = true;

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 50;
  this.body.maxVelocity.x = 50;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 200, this.body.velocity);
  this.game.add.existing(this);


};

Ships.prototype = Object.create(Phaser.Sprite.prototype);
Ships.prototype.constructor = Ships;

Ships.prototype.update = function() {

  // write your prefab's specific update code here

   // ships cannot over sea_on

  if (this.y < 70) {

    this.body.velocity.y += Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  // ships left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }


  // fire the bullets

  if (250 < this.game.physics.arcade.distanceBetween(this, this.player) && this.game.physics.arcade.distanceBetween(this, this.player) < 300) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 100);
//      this.shot.play();
	// wanted the duck
		// this.game.physics.arcade.moveToObject(this, this.player, 10);

    }
  }


};

Ships.prototype.damage = function() {

  this.health -= 1;

  if (this.health <= 0) {
    this.alive = false;
    this.kill();

    return true;
  }

  return false;

};

module.exports = Ships;

},{}],14:[function(require,module,exports){
'use strict';

function Boot() {}

Boot.prototype = {

  preload: function() {

    this.load.image('preloader', 'assets/preloader.gif');

  },

  create: function() {

    this.game.input.maxPointers = 1;
	this.stage.disableVisibilityChange = !0;
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = !0;
	this.scale.hasResized.add(this.gameResized, this);
	this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
	this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
	this.scale.setScreenSize(!0);

    this.game.state.start('preload');

  },

  gameResized: function () {},
        
  enterIncorrectOrientation: function () {
            this.orientated = !1, document.getElementById("orientation").style.display = "block"
  },
  leaveIncorrectOrientation: function () {
            this.orientated = !0, document.getElementById("orientation").style.display = "none"
  }

};

module.exports = Boot;

},{}],15:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],16:[function(require,module,exports){
  'use strict';

  var Sea_top = require('../prefabs/sea_top');
  var Sea_wave = require('../prefabs/sea_wave');
  
  var Island = require('../prefabs/island');

  var Ships = require('../prefabs/ships');
  var Ship1 = require('../prefabs/ship1');
  var Ship2 = require('../prefabs/ship2');
  var Drill = require('../prefabs/drill');

  var Helicopter = require('../prefabs/helicopter');

  var Bullets = require('../prefabs/bullets');
  var Rockets = require('../prefabs/rockets');

  var Ducks = require('../prefabs/ducks');


  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // create and add a new Sea_top object
      this.sea_top = new Sea_top(this.game, 0, 0, this.game.world.width, 80);
      this.game.add.existing(this.sea_top);

      // create and add a new Sea_wave object
      this.sea_wave = new Sea_wave(this.game, 0, 79, this.game.world.width, this.game.world.height);
      this.game.add.existing(this.sea_wave);
	  
	  // add the island
      // Create a new island object
      this.island = new Island(this.game, this.game.width / 2 , this.game.world.height - 60);
      // and add it to the game
      this.game.add.existing(this.island);


      //  The enemies bullet group
      this.enemyBullets = this.game.add.group();
      this.enemyBullets.enableBody = true;
      this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0; i < 100; i++) {
        this.rockets = new Rockets(this.game, -100, -100);
        this.enemyBullets.add(this.rockets);
      }

      this.enemyBullets.setAll('anchor.x', 0.5);
      this.enemyBullets.setAll('anchor.y', 0.5);
      this.enemyBullets.setAll('outOfBoundsKill', true);
      this.enemyBullets.setAll('checkWorldBounds', true);


      // add the ducks
      // Create a new ducks object
      this.ducks = new Ducks(this.game, this.game.world.width / 2, 100, this.enemyBullets);
      // and add it to the game
      this.game.add.existing(this.ducks);
	  
	  // add the drill
      // Create a new drill object
      this.drill = new Drill(this.game, this.game.world.width - 100, this.game.world.height - 100, this.ducks, this.enemyBullets);
      // and add it to the game
      this.game.add.existing(this.drill);

      // add the ships
      this.ships = new Ships(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship1 = new Ship1(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship2 = new Ship2(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);


      // add the helicopter
      // Create a new helicopter object
      this.helicopter = new Helicopter(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      // and add it to the game
      this.game.add.existing(this.helicopter);

      // add the HEADING TEXT
      this.headText = this.game.add.bitmapText(this.game.world.width / 2 - 150, 200, 'flappyfont', 'Duck 981', 72);

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5, 0.5);
      this.startButton.inputEnabled = true;
      this.startButton.input.useHandCursor = true;

      // add the Content
      this.contents = [
        "Nguoi An Phu\n presents",
        " ",
        "Duck981",
        "protects our sea!",
      ];

      this.style = {
        font: "30pt Courier",
        fill: "#fcfcfc",
        stroke: "#d4dbd9",
        strokeThickness: 2,
        align: "center"
      };

      this.content = this.game.add.text(this.game.world.centerX, 400, '', this.style);
      this.content.anchor.setTo(0.5, 0.5);
      this.time = this.game.time.now + 80;
      this.index = 0;
      this.line = '';


    },

    update: function() {

      if (this.game.time.now > this.time && this.index < this.contents.length) {
        //  get the next character in the line
        if (this.line.length < this.contents[this.index].length) {
          this.line = this.contents[this.index].substr(0, this.line.length + 1);
          this.content.setText(this.line);
          this.time = this.game.time.now + 80;
        } else {
          this.time = this.game.time.now + 2000;

          if (this.index < this.contents.length) {
            this.index++;
            if (this.index >= this.contents.length) {
              this.index = 0;
            }
            this.line = '';
          }

        }
      }


    },

    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');

    }

  };

  module.exports = Menu;

},{"../prefabs/bullets":2,"../prefabs/drill":3,"../prefabs/ducks":4,"../prefabs/helicopter":5,"../prefabs/island":6,"../prefabs/rockets":7,"../prefabs/sea_top":9,"../prefabs/sea_wave":10,"../prefabs/ship1":11,"../prefabs/ship2":12,"../prefabs/ships":13}],17:[function(require,module,exports){
'use strict';

var Sea_top = require('../prefabs/sea_top');
var Sea_wave = require('../prefabs/sea_wave');

var Island = require('../prefabs/island');

var Ships = require('../prefabs/ships');
var Ship1 = require('../prefabs/ship1');
var Ship2 = require('../prefabs/ship2');


var Drill = require('../prefabs/drill');

var Bullets = require('../prefabs/bullets');
var Rockets = require('../prefabs/rockets');

var Helicopter = require('../prefabs/helicopter');

var Ducks = require('../prefabs/ducks');

var Scoreboard = require('../prefabs/scoreboard');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.world.setBounds(0, 0, 2000, 2000);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // add the sounds
    this.boom = this.game.add.audio('boom');
    this.shot = this.game.add.audio('shot');

	// create and add a new Sea_wave object
    this.sea_wave = new Sea_wave(this.game, 0, 0, this.game.world.width, this.game.world.height);
    this.game.add.existing(this.sea_wave);
	
    // create and add a new Sea_top object
	// It will overlay the sea_wave becasuse it is created later
    this.sea_top = new Sea_top(this.game, 0, 0, this.game.world.width, 80);
    this.game.add.existing(this.sea_top);
	
	// add the island
	this.islandGroup = this.game.add.group();
    // Create a new island object
    this.island1 = new Island(this.game, this.game.world.width / 2 - 700, this.game.world.height/2);
    this.island2 = new Island(this.game, this.game.world.width / 2 + 700, this.game.world.height/2);
    this.island3 = new Island(this.game, this.game.world.width / 2, this.game.world.height/2 - 700);
    this.island4 = new Island(this.game, this.game.world.width / 2, this.game.world.height/2 + 700);
    // and add it to the game
    this.islandGroup.add(this.island1);
    this.islandGroup.add(this.island2);
    this.islandGroup.add(this.island3);
    this.islandGroup.add(this.island4);


    //  The enemies bullet group
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 50; i++) {
      this.rockets = new Rockets(this.game, -100, -100);
      this.enemyBullets.add(this.rockets);
    }

    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
	
	//  The duck bullet group
    this.bulletsGroup = this.game.add.group();
    this.bulletsGroup.enableBody = true;
    this.bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 50; i++) {
      this.bullets = new Bullets(this.game, -100, -100);
      this.bulletsGroup.add(this.bullets);
    }

    this.bulletsGroup.setAll('anchor.x', 0.5);
    this.bulletsGroup.setAll('anchor.y', 0.5);
    this.bulletsGroup.setAll('outOfBoundsKill', true);
    this.bulletsGroup.setAll('checkWorldBounds', true);


    //  Explosion pool
    this.explosions = this.game.add.group();

    for (var i = 0; i < 10; i++) {
      this.explosionAnimation = this.explosions.create(0, 0, 'kaboom', [0], false);
      this.explosionAnimation.anchor.setTo(0.5, 0.5);
      this.explosionAnimation.animations.add('kaboom');
    }


    // add the ducks
    // Create a new ducks object
    this.ducks = new Ducks(this.game, this.game.world.width / 2, 100, this.bulletsGroup);
    // and add it to the game
    this.game.add.existing(this.ducks);
    this.game.input.onDown.add(this.ducks.fire, this.ducks);
    this.ducksLive = true;

    // Health points, which are the hearts in the top right corner
    this.hpGroup = this.game.add.group();
    this.hp = new Array();
    /*Adding 3 hearts*/
    this.numberLifes = this.ducks.health;

    for (this.live = 0; this.live < this.numberLifes; this.live++) {
      this.hp[this.live] = this.add.sprite(10 + this.live * 40, 10, 'health');
      this.hp[this.live].fixedToCamera = true;
      this.hp[this.live].cameraOffset.x = 10 + this.live * 40;
      this.hp[this.live].cameraOffset.y = 10;
      this.hpGroup.add(this.hp[this.live]);
    }
    //    this.live = 2; //IDs of the hearts: hp[0], hp[1], hp[2]
    this.live = this.numberLifes - 1; //get the largest IDs of the hearts: hp[0], hp[1], hp[2]
	
	
	 // add the drill
    // Create a new drill object
    //    this.drill = new Drill(this.game, this.game.world.randomX, this.game.world.randomY);
    this.drill = new Drill(this.game, this.game.world.width - 10, 10, this.ducks, this.enemyBullets);
    // and add it to the game
    this.game.add.existing(this.drill);
	this.drillLive = true;

    // Health points, which are the hearts in the top right corner
    this.hpDrillGroup = this.game.add.group();
    this.hpDrill = new Array();
    /*Adding hearts*/
    this.numberDrillLifes = this.drill.health;

    for (this.liveDrill = 0; this.liveDrill < this.numberDrillLifes; this.liveDrill++) {
      this.hpDrill[this.liveDrill] = this.add.sprite(this.game.width - 50 - this.liveDrill * 40, 10, 'healthDrill');
      this.hpDrill[this.liveDrill].fixedToCamera = true;
      this.hpDrill[this.liveDrill].cameraOffset.x = this.game.width - 50 - this.liveDrill * 40;
      this.hpDrill[this.liveDrill].cameraOffset.y = 10;
      this.hpDrillGroup.add(this.hpDrill[this.liveDrill]);
    }
    //    this.liveDrill = 2; //IDs of the hearts: hp[0], hp[1], hp[2]
    this.liveDrill = this.numberDrillLifes - 1; //get the largest IDs of the hearts: hp[0], hp[1], hp[2]


    // add the ships
    this.shipsAlive = 4;
    this.shipsGroup = this.game.add.group();

    // add the ship1
    this.ship1Alive = 2;
    this.ship1Group = this.game.add.group();

    // add the ship2
    this.ship2Alive = 2;
    this.ship2Group = this.game.add.group();

    // add the helicopter
      // Create a new helicopter object
      this.helicopter = new Helicopter(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      // and add it to the game
      this.game.add.existing(this.helicopter);

    // add the score
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(300, 10, 'flappyfont', this.score.toString(), 44);
    this.scoreText.fixedToCamera = true;
    this.scoreText.cameraOffset.x = 300;
    this.scoreText.cameraOffset.y = 10;

    this.game.camera.follow(this.ducks);
    this.game.camera.focusOnXY(0, 0);


    // add the logo
    this.styleLogo = {
      font: "10pt Courier",
      fill: "#fcfcfc",
      stroke: "#d4dbd9",
      strokeThickness: 1,
      align: "center"
    };
    this.logo = this.game.add.text(this.game.width - 90, this.game.height - 10, 'play.nguoianphu.com', this.styleLogo);
    this.logo.anchor.setTo(0.5, 0.5);
    this.logo.fixedToCamera = true;
    this.logo.cameraOffset.x = this.game.width - 90;
    this.logo.cameraOffset.y = this.game.height - 10;

    // add the Content
    this.contents = [
      "Attention:",
      "the invader attacks our sea...",
      "defend the Oil Rig and the Ships!",
    ];

    this.style = {
      font: "15pt Courier",
      fill: "#fcfcfc",
      stroke: "#d4dbd9",
      strokeThickness: 1,
      align: "center"
    };

    this.content = this.game.add.text(this.game.width - 300, this.game.height - 30, '', this.style);
    this.content.fixedToCamera = true;
    this.content.cameraOffset.x = this.game.width - 300;
    this.content.cameraOffset.y = this.game.height - 30;
    this.content.anchor.setTo(0.5, 0.5);
    this.time = this.game.time.now + 80;
    this.index = 0;
    this.line = '';



  },

  update: function() {

    // add the ships
    if (this.shipsGroup.countLiving() < this.shipsAlive) {
      this.createShips(this.shipsGroup);
    }
    if (this.ship1Group.countLiving() < this.ship1Alive) {
      this.createShip1(this.ship1Group);
    }
    if (this.ship2Group.countLiving() < this.ship2Alive) {
      this.createShip2(this.ship2Group);
    }

    // make everything collide
    this.game.physics.arcade.collide(this.ducks, this.shipsGroup);
    this.game.physics.arcade.collide(this.ducks, this.ship1Group);
    this.game.physics.arcade.collide(this.ducks, this.ship2Group);
    this.game.physics.arcade.collide(this.ducks, this.drill);
    this.game.physics.arcade.collide(this.ducks, this.islandGroup);

    this.game.physics.arcade.collide(this.shipsGroup, this.drill);
    this.game.physics.arcade.collide(this.ship1Group, this.drill);
    this.game.physics.arcade.collide(this.ship2Group, this.drill);

    this.game.physics.arcade.collide(this.shipsGroup, this.ship1Group);
    this.game.physics.arcade.collide(this.shipsGroup, this.ship2Group);
    this.game.physics.arcade.collide(this.ship1Group, this.ship2Group);
	
	this.game.physics.arcade.collide(this.shipsGroup, this.islandGroup);
    this.game.physics.arcade.collide(this.ship1Group, this.islandGroup);
    this.game.physics.arcade.collide(this.ship2Group, this.islandGroup);
    this.game.physics.arcade.collide(this.drill, this.islandGroup);

    // make everything hit and kill
    
    this.game.physics.arcade.overlap(this.enemyBullets, this.ducks, this.bulletHitDucks, null, this);
    this.game.physics.arcade.overlap(this.enemyBullets, this.islandGroup, this.bulletHitIslandGroup, null, this);
	
	this.game.physics.arcade.overlap(this.bulletsGroup, this.drill, this.bulletHitDrill, null, this);
    this.game.physics.arcade.overlap(this.bulletsGroup, this.islandGroup, this.bulletHitIslandGroup, null, this);
	this.game.physics.arcade.overlap(this.bulletsGroup, this.shipsGroup, this.bulletHitShip, null, this);
	this.game.physics.arcade.overlap(this.bulletsGroup, this.ship1Group, this.bulletHitShip, null, this);
	this.game.physics.arcade.overlap(this.bulletsGroup, this.ship2Group, this.bulletHitShip, null, this);

    // add the message
    if (this.game.time.now > this.time && this.index < this.contents.length) {
      //  get the next character in the line
      if (this.line.length < this.contents[this.index].length) {
        this.line = this.contents[this.index].substr(0, this.line.length + 1);
        this.content.setText(this.line);
        this.time = this.game.time.now + 80;
      } else {
        this.time = this.game.time.now + 2000;

        if (this.index < this.contents.length) {
          this.index++;
          if (this.index >= this.contents.length) {
            this.index = 0;
          }
          this.line = '';
        }

      }
    }


  },

  createShips: function(shipsGroup) {

    this.ships = new Ships(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    shipsGroup.add(this.ships);

  },

  createShip1: function(ship1Group) {

    this.ship1 = new Ship1(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    ship1Group.add(this.ship1);

  },

  createShip2: function(ship2Group) {

    this.ship2 = new Ship2(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    ship2Group.add(this.ship2);

  },


  shotSound: function(bullets, ship) {

    if (this.game.physics.arcade.distanceBetween(bullets, this.ducks) < 200) {

      this.shot.play();
    }

  },


  bulletHitDucks: function(ducks, enemyBullets) {

    this.shot.play();

    enemyBullets.kill();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(ducks.x + 10, ducks.y + 10);
    this.explosionAnimation.play('kaboom', 30, false, true);


    // the ducks is killed
    this.hp[this.live].kill(); // "Killing" the hearth with the largest index
    this.live--; // Decrementing our live variable

    if (this.live === -1) { // If our last heart (index: 0) is "killed" then we restart the game
      this.boom.play();
    }

    this.theX = ducks.x;

    this.destroyed = ducks.damage();
    if (this.destroyed) {

      this.ducksLive = false;

      this.scoreboard = new Scoreboard(this.game, this.theX - 100, 100);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score, false);

    }

  },
  
  bulletHitIslandGroup: function(enemyBullets, island){
		enemyBullets.kill();
  },
  
  bulletHitShip: function(bullets, ship) {

    bullets.kill();
	this.boom.play();
	var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(ship.x + 10, ship.y + 10);
    this.explosionAnimation.play('kaboom', 30, false, true);
	this.destroyed = ship.damage();
    if (this.destroyed) {
	
	this.hasScore(10);

    }

  },

  
  bulletHitDrill: function(drill, bullets) {

    this.shot.play();

    bullets.kill();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(drill.x + 10, drill.y + 10);
    this.explosionAnimation.play('kaboom', 30, false, true);


    // the drill is killed
    this.hpDrill[this.liveDrill].kill(); // "Killing" the hearth with the largest index
    this.liveDrill--; // Decrementing our live variable

    if (this.liveDrill === -1) { // If our last heart (index: 0) is "killed" then we restart the game
      this.boom.play();
    }

    this.destroyed = drill.damage();
    if (this.destroyed) {

      if (this.ducksLive) {
		  this.scoreboard = new Scoreboard(this.game);
		  this.game.add.existing(this.scoreboard);
		  this.scoreboard.show(this.score, true);
		}

		this.boom.play();
		this.hasScore(100);
		this.ducks.destroy();

    }

  },

  hasScore: function(addScore) {
    this.score = this.score + addScore;
    this.scoreText.setText(this.score.toString());

  }


};

module.exports = Play;

},{"../prefabs/bullets":2,"../prefabs/drill":3,"../prefabs/ducks":4,"../prefabs/helicopter":5,"../prefabs/island":6,"../prefabs/rockets":7,"../prefabs/scoreboard":8,"../prefabs/sea_top":9,"../prefabs/sea_wave":10,"../prefabs/ship1":11,"../prefabs/ship2":12,"../prefabs/ships":13}],18:[function(require,module,exports){
'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
      
    this.load.image('sea_top', 'assets/sea/sea_top.png');
    this.load.image('sea_wave', 'assets/sea/sea_wave.png');
	
    this.load.image('island', 'assets/island/island.png');

    this.load.image('scoreboard', 'assets/score/scoreboard.png');
    this.load.spritesheet('medals', 'assets/score/medals.png', 44, 46, 2);
    this.load.image('particle', 'assets/score/particle.png');

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

    this.load.spritesheet('pole', 'assets/pole/poles.png', 96, 70, 2);

    this.load.spritesheet('ships', 'assets/ship/ships.png', 200, 61, 2);
    this.load.spritesheet('ship1', 'assets/ship/warship1.png', 200, 68, 2);
    this.load.spritesheet('ship2', 'assets/ship/warship2.png', 200, 68, 2);

    this.load.spritesheet('drill', 'assets/drill/rigs.png', 125, 198, 2);

    this.load.spritesheet('ducks', 'assets/duck/ducks.png', 125, 96, 2);

    this.load.image('health', 'assets/health/heart.png');
    this.load.image('healthDrill', 'assets/drill/rigicon.png');
      
    this.load.image('startButton', 'assets/menu/start-button.png');

    this.load.image('bullets', 'assets/bullets/egg.png', 43, 32);
    this.load.spritesheet('rockets', 'assets/bullets/rockets.png', 80, 25, 3);

    this.load.spritesheet('kaboom', 'assets/bullets/explosion.png', 64, 64, 23);
	
    this.load.spritesheet('helicopter', 'assets/helicopter/helicopter.png', 150, 38, 8);

    this.load.audio('boom', 'assets/audio/boom.ogg');
    this.load.audio('shot', 'assets/audio/shot.ogg');
//    this.game.load.audio('caribe', 'assets/audio/caribe.ogg');



},
create: function() {
  this.asset.cropEnabled = false;
},
update: function() {
  if ( !! this.ready) {
    this.game.state.start('menu');
  }
},
onLoadComplete: function() {
  this.ready = true;
}
};

module.exports = Preload;

},{}]},{},[1])