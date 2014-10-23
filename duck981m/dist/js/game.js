(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {

//By default we set
	this.screen.value = "small";
	this.srx = Math.max(window.innerWidth,window.innerHeight);
	this.sry = Math.min(window.innerWidth,window.innerHeight);

	this.logicWidth = 480;
    // 480
	this.logicHeight = 320;
    //320
	var r = this.logicWidth/this.logicHeight;

	if(this.srx >= 360){
		this.screen.value = "small";
		this.gameWidth = 360;
	}
	if(this.srx >= 480){
		this.screen.value = "normal";
		this.gameWidth = 480;
	}
	if(this.srx >= 720){
		this.screen.value = "large";
		this.gameWidth = 720;
	}
	if(this.srx >= 960){
		this.screen.value = "xlarge";
		this.gameWidth = 960;
	}
	if(this.srx >= 1024){
		this.screen.value = "xxlarge";
		this.gameWidth = 1024;
	}

	//If on deskop, we may need to fix the maximum resolution instead of scaling the game to the full monitor resolution
	var device = new Phaser.Device();
	if(device.desktop){
		//this.screen.value = "xxlarge";
		this.gameWidth = 480;
	}
	device = null;


	this.gameHeight = this.gameWidth/r;
	//We need these methods later to convert the logical game position to display position, So convertWidth(logicWidth) will be right edge for all screens
	this.convertWidth = function(value){
		return value/this.logicWidth * this.gameWidth;
	};
	this.convertHeight = function(value){
		return value/this.logicHeight * this.gameHeight;
	};

	var game = new Phaser.Game(this.gameWidth,this.gameHeight, Phaser.AUTO, 'game');

	//	Add the States your game has.
	//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
	  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

	//	Now start the Boot state.
  game.state.start('boot');
};


},{"./states/boot":14,"./states/menu":15,"./states/play":16,"./states/preload":17}],2:[function(require,module,exports){
'use strict';

var Bullets = function(game, x, y, frame) {
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

Bullets.prototype = Object.create(Phaser.Sprite.prototype);
Bullets.prototype.constructor = Bullets;

Bullets.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Bullets;

},{}],3:[function(require,module,exports){
'use strict';

var Drill = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'drill', frame);

  // initialize your prefab here


  this.game.physics.arcade.enableBody(this);

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

  this.alive = false;


};

Drill.prototype = Object.create(Phaser.Sprite.prototype);
Drill.prototype.constructor = Drill;

Drill.prototype.update = function() {

  // write your prefab's specific update code here

  // Drill don't want to be kill

  if (this.y > (this.game.world.height - 100)) {

    this.body.velocity.y -= Math.floor(Math.random() * 20);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  this.animations.play('left');


};

module.exports = Drill;

},{}],4:[function(require,module,exports){
'use strict';

var Ducks = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ducks', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0], 2, true);
  this.animations.add('right', [1], 2, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(0.2, 0.2);

  this.body.allowRotation = false;
  this.bringToTop();
  this.body.drag.set(0.2);

  this.health = 3;
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


};


Ducks.prototype.move = function() {

  if (this.alive) {

    // ducks move to the pointer
    this.game.physics.arcade.moveToPointer(this, 100, this.game.input.activePointer, 0);

    // ducks face down

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

var Mermaid = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'mermaid');

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);
  // this.scale.setTo(2, 2);
  
  // this.animations.add('swim');
  // this.animations.play('swim', 12, true);

  this.animations.add('left', [0, 1, 2], 3, true);
  this.animations.add('right', [3, 4, 5], 3, true);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  // this.body.allowRotation = false;
  // this.bringToTop();
  // this.body.drag.set(0.2);

  this.body.immovable = false;

  this.body.maxVelocity.y = 40;
  this.body.maxVelocity.x = 40;

  //  this.game.physics.arcade.velocityFromRotation(Math.random(), 100, this.body.velocity);
  this.game.physics.arcade.velocityFromRotation(Math.floor(Math.random() * 100) + 50, 200, this.body.velocity);
  this.game.add.existing(this);


};

Mermaid.prototype = Object.create(Phaser.Sprite.prototype);
Mermaid.prototype.constructor = Mermaid;

Mermaid.prototype.update = function() {

  // write your prefab's specific update code here

  // Mermaid cannot over sea_on

  if (this.y < 100) {

    this.body.velocity.y += Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  // Mermaid don't want to be kill

  // if (this.y > (this.game.world.height - 120)) {

    // this.body.velocity.y -= 20;

    // if (this.body.velocity.x > 0) {
      // this.body.velocity.x -= Math.floor(Math.random() * 50);
    // } else {
      // this.body.velocity.x -= Math.floor(Math.random() * 50);
    // }

  // }

  // Mermaid left right

  if (this.body.velocity.x < 0) {

    this.animations.play('left');

  } else if (this.body.velocity.x > 0) {

    this.animations.play('right');
  }
  
  // else 
  
  // if (this.body.velocity.y > 0) {

    // this.animations.play('face');
  // }
  // else if (this.body.velocity.y < 0) {

    // this.animations.play('back');
  // }
  


};

module.exports = Mermaid;

},{}],6:[function(require,module,exports){
'use strict';

var Pole = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pole', frame);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.anchor.set(0.5, 0.5);

  this.animations.add('tide');
  this.animations.play('tide', 2, true);


};

Pole.prototype = Object.create(Phaser.Sprite.prototype);
Pole.prototype.constructor = Pole;

Pole.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Pole;

},{}],7:[function(require,module,exports){
'use strict';

var Scoreboard = function(game) {

  Phaser.Group.call(this, game);


  this.fixedToCamera = true;
  this.cameraOffset.x = 200;
  this.cameraOffset.y = 0;

  this.winText = this.game.add.bitmapText(this.x - 60, 50, 'flappyfont', '', 52);
  this.add(this.winText);

  this.lostText = this.game.add.bitmapText(this.x - 60, 50, 'flappyfont', '', 52);
  this.add(this.lostText);


  this.scoreboard = this.create(50, 160, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);

  this.scoreText = this.game.add.bitmapText(100, 140, 'flappyfont', '', 22);
  this.add(this.scoreText);

  this.bestText = this.game.add.bitmapText(100, 190, 'flappyfont', '', 22);
  this.add(this.bestText);

  // add our start button with a callback
  this.startButton = this.game.add.button(this.x + 10 , 250, 'startButton', this.startClick, this);
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

},{}],8:[function(require,module,exports){
'use strict';

var Sea_face = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_face');

  // initialize your prefab here
  this.autoScroll(-20, 20);
  this.fixedToCamera = true;

};

Sea_face.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_face.prototype.constructor = Sea_face;

Sea_face.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_face;

},{}],9:[function(require,module,exports){
'use strict';

var Sea_on = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_on');

  // initialize your prefab here
  this.autoScroll(-35, 0);
  this.fixedToCamera = true;

};

Sea_on.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_on.prototype.constructor = Sea_on;

Sea_on.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_on;

},{}],10:[function(require,module,exports){
'use strict';

var Sea_under = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'sea_under');

  // initialize your prefab here
  this.autoScroll(30, 0);
  this.fixedToCamera = true;

};

Sea_under.prototype = Object.create(Phaser.TileSprite.prototype);
Sea_under.prototype.constructor = Sea_under;

Sea_under.prototype.update = function() {

  // write your prefab's specific update code here
//    this.tilePosition.x = -this.game.camera.x;
//    this.tilePosition.y = -this.game.camera.y;

};

module.exports = Sea_under;

},{}],11:[function(require,module,exports){
'use strict';

var Ships = function(game, x, y, player, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, 'ship1', player, enemyBullets);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  this.player = player;
  this.enemyBullets = enemyBullets;

//  this.shot = this.game.add.audio('shot');

  this.game = game;
  this.health = 1;
  this.fireRate = 15000;
  this.nextFire = 0;
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

  if (this.y < 35) {

    this.body.velocity.y += Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  // ships don't want to be kill

  if (this.y > (this.game.world.height - 100)) {

    this.body.velocity.y -= Math.floor(Math.random() * 10);

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

  if (350 < this.game.physics.arcade.distanceBetween(this, this.player) && this.game.physics.arcade.distanceBetween(this, this.player) < 400) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 150);
//      this.shot.play();
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

//  this.shot = this.game.add.audio('shot');

  this.game = game;
  this.health = 1;
  this.fireRate = 20000;
  this.nextFire = 0;
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

  if (this.y < 35) {

    this.body.velocity.y += Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  // ships don't want to be kill

  if (this.y > (this.game.world.height - 100)) {

    this.body.velocity.y -=  Math.floor(Math.random() * 10);

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

  if (350 < this.game.physics.arcade.distanceBetween(this, this.player) && this.game.physics.arcade.distanceBetween(this, this.player) < 400) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 100);
//      this.shot.play();
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

//  this.shot = this.game.add.audio('shot');

  this.game = game;
  this.health = 1;
  this.fireRate = 30000;
  this.nextFire = 0;
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

  if (this.y < 35) {

    this.body.velocity.y += Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x += Math.floor(Math.random() * 50);
    } else {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
    }

  }

  // ships don't want to be kill

  if (this.y > (this.game.world.height - 80)) {

    this.body.velocity.y -=  Math.floor(Math.random() * 10);

    if (this.body.velocity.x > 0) {
      this.body.velocity.x -= Math.floor(Math.random() * 50);
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

  if (350 < this.game.physics.arcade.distanceBetween(this, this.player) && this.game.physics.arcade.distanceBetween(this, this.player) < 400) {
    if (this.game.time.now > this.nextFire && this.enemyBullets.countDead() > 0 && this.alive) {
      this.nextFire = this.game.time.now + this.fireRate;

      var bullet = this.enemyBullets.getFirstDead();

      bullet.reset(this.x, this.y);

      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 70);
//      thí.shot.play();
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

},{}],15:[function(require,module,exports){
  'use strict';

  var Sea_on = require('../prefabs/sea_on');
  //  var Sea_face = require('../prefabs/sea_face');
  var Sea_under = require('../prefabs/sea_under');

  var Pole = require('../prefabs/pole');

  var Ships = require('../prefabs/ships');
  var Ship1 = require('../prefabs/ship1');
  var Ship2 = require('../prefabs/ship2');
  var Drill = require('../prefabs/drill');

  var Mermaid = require('../prefabs/mermaid');

  var Bullets = require('../prefabs/bullets');

  var Ducks = require('../prefabs/ducks');


  function Menu() {}

  Menu.prototype = {

    preload: function() {},

    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //      this.caribe = this.game.add.audio('caribe', 1, true);
      //      this.caribe.play('',0,1,true);

      // create and add a new Sea_on object
      this.sea_on = new Sea_on(this.game, 0, 0, this.game.world.width, 35);
      this.game.add.existing(this.sea_on);


      //      // create and add a new Sea_face object
      //      this.sea_face = new Sea_face(this.game, 0, 90, this.game.world.width, this.game.world.height - 73);
      //      this.game.add.existing(this.sea_face);

      // create and add a new Sea_under object
      this.sea_under = new Sea_under(this.game, 0, 33, this.game.world.width, this.game.world.height);
      this.game.add.existing(this.sea_under);

      // add the pole
      // Create a new pole object
      this.pole = new Pole(this.game, this.game.width / 2, this.game.world.height - 35);
      // and add it to the game
      this.game.add.existing(this.pole);


      //  The enemies bullet group
      this.enemyBullets = this.game.add.group();
      this.enemyBullets.enableBody = true;
      this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0; i < 100; i++) {
        this.rockets = new Bullets(this.game, -100, -100);
        this.enemyBullets.add(this.rockets);
      }

      this.enemyBullets.setAll('anchor.x', 0.5);
      this.enemyBullets.setAll('anchor.y', 0.5);
      this.enemyBullets.setAll('outOfBoundsKill', true);
      this.enemyBullets.setAll('checkWorldBounds', true);


      // add the drill
      // Create a new drill object
      this.drill = new Drill(this.game, this.game.world.width - 100, this.game.world.height - 100);
      // and add it to the game
      this.game.add.existing(this.drill);


      // add the ducks
      // Create a new ducks object
      this.ducks = new Ducks(this.game, this.game.world.width / 2, 100);
      // and add it to the game
      this.game.add.existing(this.ducks);

      // add the ships
      this.ships = new Ships(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship1 = new Ship1(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);
      this.ship2 = new Ship2(this.game, this.game.world.randomX, this.game.world.randomY, this.ducks, this.enemyBullets);


      // add the mermaid
      // Create a new mermaid object
      this.mermaid = new Mermaid(this.game, this.game.world.randomX, this.game.world.randomY);
      // and add it to the game
      this.game.add.existing(this.mermaid);

      // add the HEADING TEXT
      this.headText = this.game.add.bitmapText(this.game.world.width / 2 - 150, 130, 'flappyfont', 'Duck 981', 72);

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width / 2, 220, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5, 0.5);
      this.startButton.inputEnabled = true;
      this.startButton.input.useHandCursor = true;


    },

    update: function() {},

    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');

    }

  };

  module.exports = Menu;

},{"../prefabs/bullets":2,"../prefabs/drill":3,"../prefabs/ducks":4,"../prefabs/mermaid":5,"../prefabs/pole":6,"../prefabs/sea_on":9,"../prefabs/sea_under":10,"../prefabs/ship1":11,"../prefabs/ship2":12,"../prefabs/ships":13}],16:[function(require,module,exports){
'use strict';
var Sea_on = require('../prefabs/sea_on');
var Sea_face = require('../prefabs/sea_face');
var Sea_under = require('../prefabs/sea_under');

var Pole = require('../prefabs/pole');

var Ships = require('../prefabs/ships');
var Ship1 = require('../prefabs/ship1');
var Ship2 = require('../prefabs/ship2');


var Drill = require('../prefabs/drill');

var Bullets = require('../prefabs/bullets');

var Mermaid = require('../prefabs/mermaid');

var Ducks = require('../prefabs/ducks');

var Scoreboard = require('../prefabs/scoreboard');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.world.setBounds(0, 0, 960, 320);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // add the sounds
    this.boom = this.game.add.audio('boom');
    this.shot = this.game.add.audio('shot');

    //    this.caribe = this.game.add.audio('caribe', 1, true);
    //    this.caribe.play('', 0, 1, true);

    // create and add a new Sea_on object
    this.sea_on = new Sea_on(this.game, 0, 0, this.game.world.width, 35);
    this.game.add.existing(this.sea_on);


    //      // create and add a new Sea_face object
    //      this.sea_face = new Sea_face(this.game, 0, 90, this.game.world.width, this.game.world.height - 73);
    //      this.game.add.existing(this.sea_face);

    // create and add a new Sea_under object
    this.sea_under = new Sea_under(this.game, 0, 33, this.game.world.width, this.game.world.height);
    this.game.add.existing(this.sea_under);

    // add the pole
    // Create a new pole object
    this.pole = new Pole(this.game, 400, this.game.world.height - 45);
    // and add it to the game
    this.game.add.existing(this.pole);


    //  The enemies bullet group
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 100; i++) {
      this.rockets = new Bullets(this.game, -100, -100);
      this.enemyBullets.add(this.rockets);
    }

    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);


    //  Explosion pool
    this.explosions = this.game.add.group();

    for (var i = 0; i < 10; i++) {
      this.explosionAnimation = this.explosions.create(0, 0, 'kaboom', [0], false);
      this.explosionAnimation.anchor.setTo(0.5, 0.5);
      this.explosionAnimation.animations.add('kaboom');
    }


    // add the drill
    // Create a new drill object
    //    this.drill = new Drill(this.game, this.game.world.randomX, this.game.world.randomY);
    this.drill = new Drill(this.game, this.game.world.width - 100, this.game.world.height - 100);
    // and add it to the game
    this.game.add.existing(this.drill);


    // add the ducks
    // Create a new ducks object
    this.ducks = new Ducks(this.game, 100, 100);
    // and add it to the game
    this.game.add.existing(this.ducks);
    this.game.input.onDown.add(this.ducks.move, this.ducks);

    // Health points, which are the hearts in the top right corner
    this.hp = new Array();
    /*Adding 3 hearts*/

    for (this.live = 0; this.live < this.ducks.health; this.live++) {
      this.hp[this.live] = this.add.sprite(10 + this.live * 20, 10, 'health');
      this.hp[this.live].fixedToCamera = true;
      this.hp[this.live].cameraOffset.x = 10 + this.live * 20;
      this.hp[this.live].cameraOffset.y = 10;
    }

    //    this.live = 2; //IDs of the hearts: hp[0], hp[1], hp[2]
    this.live = this.ducks.health - 1; //IDs of the hearts: hp[0], hp[1], hp[2]


    // add the ships
    this.shipsAlive = 5;
    this.shipsGroup = this.game.add.group();

    //    for (var i = 0; i < this.shipsAlive; i++) {
    //      this.ships = new Ships(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    //      this.shipsGroup.add(this.ships);
    //    }

    // add the ship1
    this.ship1Alive = 2;
    this.ship1Group = this.game.add.group();

    //    for (var i = 0; i < this.ship1Alive; i++) {
    //      this.ship1 = new Ship1(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    //      this.ship1Group.add(this.ship1);
    //    }

    // add the ship2
    this.ship2Alive = 3;
    this.ship2Group = this.game.add.group();

    //    for (var i = 0; i < this.ship2Alive; i++) {
    //      this.ship2 = new Ship2(this.game, this.game.world.randomX + 100, this.game.world.randomY + 100, this.ducks, this.enemyBullets);
    //      this.ship2Group.add(this.ship2);
    //    }

    // add the mermaid
    // Create a new mermaid object
    this.mermaid = new Mermaid(this.game, this.game.world.randomX, this.game.world.randomY);
    // and add it to the game
    this.game.add.existing(this.mermaid);

    // add the score
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(100, 10, 'flappyfont', this.score.toString(), 36);
    this.scoreText.fixedToCamera = true;
    this.scoreText.cameraOffset.x = 100;
    this.scoreText.cameraOffset.y = 10;

    this.game.camera.follow(this.ducks);
    this.game.camera.focusOnXY(0, 0);

  },

  update: function() {


    if (this.shipsGroup.countLiving() < 2) {
      this.createShips(this.shipsGroup);
    }
    if (this.ship1Group.countLiving() < 1) {
      this.createShip1(this.ship1Group);
    }
    if (this.ship2Group.countLiving() < 1) {
      this.createShip2(this.ship2Group);
    }

    this.game.physics.arcade.collide(this.ducks, this.shipsGroup);
    this.game.physics.arcade.collide(this.ducks, this.ship1Group);
    this.game.physics.arcade.collide(this.ducks, this.ship2Group);
    this.game.physics.arcade.collide(this.ducks, this.drill);
    this.game.physics.arcade.collide(this.ducks, this.mermaid);

    this.game.physics.arcade.collide(this.shipsGroup, this.drill);
    this.game.physics.arcade.collide(this.ship1Group, this.drill);
    this.game.physics.arcade.collide(this.ship2Group, this.drill);

    this.game.physics.arcade.collide(this.shipsGroup, this.ship1Group);
    this.game.physics.arcade.collide(this.shipsGroup, this.ship2Group);

    this.game.physics.arcade.collide(this.ship1Group, this.ship2Group);


    //    this.game.physics.arcade.overlap(this.enemyBullets, this.shipsGroup, this.shotSound, null, this);
    //    this.game.physics.arcade.overlap(this.enemyBullets, this.ship1Group, this.shotSound, null, this);
    //    this.game.physics.arcade.overlap(this.enemyBullets, this.ship2Group, this.shotSound, null, this);



    this.game.physics.arcade.overlap(this.enemyBullets, this.ducks, this.bulletHitDucks, null, this);

    this.game.physics.arcade.overlap(this.pole, this.shipsGroup, this.poleHitShips, null, this);
    this.game.physics.arcade.overlap(this.pole, this.ship1Group, this.poleHitShips, null, this);
    this.game.physics.arcade.overlap(this.pole, this.ship2Group, this.poleHitShips, null, this);

    this.game.physics.arcade.overlap(this.pole, this.drill, this.poleHitDrill, null, this);
    this.game.physics.arcade.overlap(this.pole, this.ducks, this.poleHitDucks, null, this);



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

      this.scoreboard = new Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score, false);

    }

  },

  poleHitShips: function(pole, shipsGroup) {

    this.hasScore(10);

    shipsGroup.destroy();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(shipsGroup.x + 5, shipsGroup.y + 5);
    this.explosionAnimation.play('kaboom', 30, false, true);

    this.boom.play();

  },

  poleHitDrill: function(pole, drill) {

    this.hasScore(100);

    drill.destroy();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(drill.x + 5, drill.y + 5);
    this.explosionAnimation.play('kaboom', 30, false, true);

    this.theX = this.ducks.x;
    this.ducks.kill();

    this.scoreboard = new Scoreboard(this.game);
    this.game.add.existing(this.scoreboard);
    this.scoreboard.show(this.score, true);

    this.boom.play();

  },

  poleHitDucks: function(pole, ducks) {

    this.shot.play();

    var explosionAnimation = this.explosions.getFirstExists(false);
    this.explosionAnimation.reset(ducks.x + 10, ducks.y + 10);
    this.explosionAnimation.play('kaboom', 30, false, true);

    // the pole cannot be kill, instead o re-create it
    // if the pole lives, the ducks will overlap it foever
    // so that it will be killed
    // not depend on the remain healths

    // the ducks is killed
    this.hp[this.live].kill(); // "Killing" the hearth with the largest index
    this.live--; // Decrementing our live variable

    if (this.live === -1) { // If our last heart (index: 0) is "killed" then we restart the game
      this.boom.play();
    }

    this.theX = ducks.x;

    this.destroyed = ducks.damage();
    if (this.destroyed) {

      this.scoreboard = new Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score, false);

    }


  },

  hasScore: function(addScore) {
    this.score = this.score + addScore;
    this.scoreText.setText(this.score.toString());
    //    this.scoreSound.play();

  }


};

module.exports = Play;

},{"../prefabs/bullets":2,"../prefabs/drill":3,"../prefabs/ducks":4,"../prefabs/mermaid":5,"../prefabs/pole":6,"../prefabs/scoreboard":7,"../prefabs/sea_face":8,"../prefabs/sea_on":9,"../prefabs/sea_under":10,"../prefabs/ship1":11,"../prefabs/ship2":12,"../prefabs/ships":13}],17:[function(require,module,exports){
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

    this.load.image('sea_on', 'assets/sea/sea_onm.png');
    this.load.image('sea_under', 'assets/sea/sea_underm.png');

    this.load.image('scoreboard', 'assets/score/scoreboard.png');
    this.load.spritesheet('medals', 'assets/score/medals.png', 44, 46, 2);
    this.load.image('particle', 'assets/score/particle.png');

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

    this.load.spritesheet('pole', 'assets/pole/polem.png', 48, 35, 2);

    this.load.spritesheet('ships', 'assets/ship/shipsm.png', 50, 15, 2);
    this.load.spritesheet('ship1', 'assets/ship/warship1m.png', 50, 17, 2);
    this.load.spritesheet('ship2', 'assets/ship/warship2m.png', 50, 17, 2);

    this.load.spritesheet('drill', 'assets/drill/rigsm.png', 50, 79, 2);

    this.load.spritesheet('ducks', 'assets/duck/ducksm.png', 40, 31, 2);

    this.load.image('health', 'assets/health/heartm.png');

    this.load.image('startButton', 'assets/menu/start-buttonm.png');

    this.load.spritesheet('rockets', 'assets/bullets/rocketsm.png', 30, 10, 3);

    this.load.spritesheet('kaboom', 'assets/bullets/explosionm.png', 20, 20, 23);

    this.load.spritesheet('mermaid', 'assets/mermaid/mermaidm.png', 30, 21, 6);

     this.load.audio('boom', ['assets/audio/explosion.wav']);
     this.load.audio('shot', ['assets/audio/hit.wav']);

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