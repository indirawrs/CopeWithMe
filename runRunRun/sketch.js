var lilP, bg, token, whir, ground, music, blockXPos, blockYPos, tokenYPos, tokenXPos;
var x = 0;
var direction = 90;
var JUMP = 15;
var GRAV = .5;
var canJump = true;
var width = 980;
var timer = 3000;
//var WALL_THICKNESS = 30; 
//draw new bgeez


function preload() {
  music = loadSound('assets/get-TURNT.wav');
  whir = loadSound('assets/whir.mp3');
  boop = loadSound('assets/boop.mp3');
  ground = createSprite(460, 560);
  ground.addAnimation("ground", "assets/ground_3.png", "assets/ground_4.png");
  lilP = createSprite(120, 100);
  lilP.addAnimation("lilPidle", "assets/p-idle_1.png", "assets/p-idle_3.png");
  lilP.addAnimation("lilPwalks", "assets/p-walking_1.png", "assets/p-walking_2.png");
  //  lilP.addAnimation("lilPjumps", "assets/p-jump-1.png", "assets/p-walking_2.png");
  lilP.scale = .7;

}

function setup() {
  bg = loadImage("assets/infrunbg.png");
  background(bg); //was in draw
  direction += 1;
  //  createCanvas(980,500);
  collectables = new Group();
  obstacles = new Group();
  canvas = createCanvas(980, 610);
  canvas.position(860 / 2, 440 / 2);
  music.setVolume(0.5);
  music.play();

  var q = (random(0, 5));
  //GENERATES BLOCKS AND TOKENS | a random function 
  for (var i = 0; i < q; i++) {
    blockXPos = random(300, width + width / 2);
    blockYPos = random(490, 500);
    var block = createSprite(blockXPos, blockYPos);
    block.addAnimation("normal", "assets/bush.png"); //,"assets/block_2.png", "assets/block_3.png" );
    block.scrollSpeed = random(1.0, 3.0);
    obstacles.add(block);

    var dog = createSprite(blockXPos, (random(400, 560)));
    dog.addAnimation("normal", "assets/dog-1.png", "assets/dog-2.png");
    //  dog.addAnimation("lilpip", "assets/pup-1.png","assets/pup-2.png"); 
    dog.scrollSpeed = random(1.0, 3.0);
    obstacles.add(dog);

  }
  //faster and more stressful, subtletes in movement color or time, as intensity increases
  //change imagery then because itd be cool

  for (var i = 0; i < 7; i++) {
    tokenXPos = random(0, width);
    tokenYPos = random(0, 400);
    var token = createSprite(tokenXPos, tokenYPos);
    token.addAnimation("floating", "assets/token_1.png", "assets/token_3.png");
    token.scrollSpeed = random(2.0, 4.0);
    collectables.add(token);
  }

  whir.setVolume(0.1);
}

function draw() {
  lilP.velocity.y += GRAV;
  background(bg);
  drawSprites();
  textAlign(CENTER);
  textSize(20);
  fill(timer, 40);

  //BLOCK Movement Code

  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].position.x -= obstacles[i].scrollSpeed; //so we set scroll speed
    if (obstacles[i].position.x < -20) // off the screen
    {
      obstacles[i].position.x = random(199, 500) + width;
      obstacles[i].position.y = random(430, 530);
      obstacles[i].scrollSpeed = random(3, 7);
    }
  }

  /*/what im trying to do is add tokens to collectables if the player gets them all
  for (var i = collectables.length; i >= 2; i++) {
    	collectables[i];
    }  
  }*/

  for (var i = 0; i < collectables.length; i++) {
    collectables[i].position.x -= collectables[i].scrollSpeed; //so we set scroll speed
    if (collectables[i].position.x < -20) // off the screen
    {
      collectables[i].position.x = random(0, width) + width;
      collectables[i].position.y = random(200, height);
      collectables[i].scrollSpeed = random(1, 5);
    }


    for (var i = 0; i < collectables.length; i++) {
      if (tokenXPos < width) {
        collectables[i].position.x--; //storing x position here
        collectables[i].position.x -= collectables[i].scrollSpeed;
      } else {}
    }

    console.log(collectables.length);
    //re direction to main world
    if (collectables.length == 1) {
      text("YAS QUEEN", width / 2, 200);
      console.log(lilP.position.y);
      window.location.href = "http://sites.bxmc.poly.edu/~indiraardolic/cope-with-me/mainLove/";
    }

    //AUDIO CODEeeEeEeEEe
    if (keyIsPressed) {
      whir.setVolume(0.1);
      whir.play();
    } else {
      whir.setVolume(0.0);
    }

    //JUMP & MOVEMENT code
    if (lilP.collide(ground)) {
      canJump = true;
      lilP.velocity.y = -2; //little jitter
      lilP.changeAnimation("lilPwalks");
    }

    if ((keyIsDown(UP_ARROW)) && (canJump === true)) {
      canJump = false;
      lilP.changeAnimation("lilPidle");
      lilP.animation.rewind();
      lilP.velocity.y = -JUMP;
    }

    if ((keyIsDown(DOWN_ARROW))) {
      canJump = false;
      lilP.changeAnimation("lilPidle");
      lilP.animation.rewind();
      lilP.scale = .5;
    } else {
      lilP.scale = .7;
    }

    if (lilP.position.x < 10) {
      lilP.velocity.y = -JUMP;
      lilP.position.x = 12;
    }

    //}else 
    if (keyIsDown(RIGHT_ARROW)) {
      lilP.changeAnimation("lilPwalks");
      lilP.position.x++;
      if (lilP.position.x > 600) {
        lilP.position.x = 598;
      }
    } else if (key == 's') {
      lilP.changeAnimation("lilPwalks"); //lilPcrouches
    } else {
      lilP.changeAnimation("lilPwalks");
    }

    //collection n obstacle code
    lilP.collide(obstacles);
    if (lilP.overlap(collectables, collect)) {} else {}

    //if the animation is "stretch" and it reached its last frame
    if (lilP.getAnimationLabel() == "lilPidle" && lilP.animation.getFrame() == lilP.animation.getLastFrame()) {
      lilP.changeAnimation("lilPidle");
    }
  }

  function collect(collector, collected) {
    //collector is another name for asterisk
    //show the animation
    collector.changeAnimation("lilPwalks");
    collector.animation.rewind();
    //collected is the sprite in the group collectibles that triggered 
    //the event
    collected.remove();
  }
}