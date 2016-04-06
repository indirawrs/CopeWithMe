var lilP, bg, whir, ground, music, blocks, bg1, lilPgrn, lilPylw, platXPos, platYpos;
var direction = 90;
var JUMP = 9;
var GRAV = .5;
var canJump = true;
var width = 980;
var timer = 3000;

function preload() {
 
  //what i want to do ? i want to see if the half n half images will
  //be printed and move at the same rate
  music = loadSound('assets/Egloo-Desert.m4a');
  // lilPgrn = createSprite(120,0);
  // lilPgrn.addAnimation("lilPidle", "assets/p-energy_2.png");
  // lilPylw = createSprite(140, 0);
  // lilPylw.addAnimation("lilPwalks", "assets/p-feels_2.png", "assets/p-walking_2.png");
  lilP = createSprite(120, 300);
  lilP.addAnimation("lilPwalks", "assets/p-walking_1.png", "assets/p-walking_2.png");
  lilP.addAnimation("lilPidle", "assets/p-idle_1.png", "assets/p-idle_3.png");
  lilP.scale = .5;
  bg1 = loadAnimation("assets/bg-si_1.png", "assets/bg-si_3.png");
  pit = loadAnimation("assets/the-pit_1.png", "assets/the-pit_3.png");
}

function setup() {
  music.setVolume(0.5);
  music.play();
  bg = loadImage("assets/bg-si.gif");
  background(bg); //was in draw 
  platforms = new Group();
  collectables = new Group();
  canvas = createCanvas(980,610);
	canvas.position(860/2, 440/2);


  //generates platforms in random locations for you to jump on :3
  //make it so you gotta move thru more area to go on more platforms!
  //like `steal from flappy bird code.. cam moves to right.. generate
  //new platforms n shit.. cause music is good, we should enjoy it

  for (var i = 0; i < 5; i++) {
    var val = i - 4/2; //to make funky parabola
    var plat = createSprite(i*200 + 100, abs(val * 140) + 180); //random(360,550)
    plat.addAnimation("normal", "assets/plat-1.png");
    plat.addAnimation("triggered", "assets/plat-2.png", "assets/plat-3.png");
    plat.scale = .6;
    plat.looping = false;
    platforms.add(plat);
    lilP.collide(platforms[i]);
  }
  //generates tokens :)
  for(var i=0; i<6; i++) {
    var val = i - 4/2; //to match other funky parabola
    var token = createSprite(i*200 + 100, abs(val * 140) + 120); //random(360,550)
    // tokenXPos = random(100, 900);
    // tokenYPos = random(100, 300);
    // var token = createSprite(tokenXPos, tokenYPos);
    token.addAnimation("floating", "assets/token_1.png", "assets/token_3.png"); 
    collectables.add(token);

  }

}
/////////////////////////////D/R/A/W////////////////////////////////////
function draw() {
lilP.velocity.y += GRAV;
  background(bg);
  animation(bg1, width / 2, height / 2);
  drawSprites();
  animation(pit, width / 2, height / 2);
  textAlign(CENTER);
  textSize(20);
  fill(timer, 40);

  for(var i = 0; i<6; i++){
  if (collectables[i] != null){
  collectables[i].setSpeed(random(1,5), direction);
  direction += 2;
  }
 
 //re direction to main world
 if ((collectables[i] != null) & (collectables.length == 1)){
     timer -= 24;
     text("AT LEAST IT'S REAL NOW", width/2, height/2);
     if (timer == 0){
      window.location.href="http://sites.bxmc.poly.edu/~indiraardolic/cope-with-me/mainLove/";
    }
   }
  }
  
  if (lilP.position.y > 700){
    canJump = true;
    lilP.position.y = 0;
  }
  
  //JUMP & MOVEMENT code
  if ((lilP.collide(platforms))) {
    canJump = true;
    lilP.velocity.y = -4; //little jitter
    lilP.velocity.x = 0;
  }
  if ((keyIsDown(UP_ARROW)) && (canJump === true)) {
    canJump = false;
    lilP.changeAnimation("lilPidle");
    lilP.animation.rewind();
    lilP.velocity.y = -JUMP;
  }
  if ((keyIsDown(DOWN_ARROW))){
    lilP.scale = .3;
  }else{
    lilP.scale = .6;
  }

  if (lilP.position.x < 10) {
    lilP.position.x = 12;
  } else if (lilP.position.x > 970) {
    lilP.position.x = 968;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    lilP.changeAnimation("lilPwalks");
    lilP.position.x += 10;
    lilP.mirrorX(1);
  } else if (keyIsDown(LEFT_ARROW)) {
    lilP.changeAnimation("lilPwalks"); //lilPcrouches
    lilP.position.x -= 10;
    lilP.mirrorX(-1);
    
  } else {
    lilP.changeAnimation("lilPidle");
  }

  //if the animation is "stretch" and it reached its last frame
  if (lilP.getAnimationLabel() == "lilPidle" && lilP.animation.getFrame() == lilP.animation.getLastFrame()) {
    lilP.changeAnimation("lilPidle");
  }

//we cycle through the platforms to change the animation
  for (var i = 0; i < 5; i++) {
    if(lilP.collide(platforms[i])){
      platforms[i].changeAnimation("triggered");
      canJump = true;
      lilP.velocity.y = -4; //little jitter
      lilP.velocity.x = 0;
    }    
  }
  if (lilP.overlap(collectables, collect)) {
  } else {
  }

function collect(collector, collected)
{
  //collector is another name for asterisk
  //show the animation
  collector.changeAnimation("lilPwalks");
  collector.animation.rewind();
  //collected is the sprite in the group collectibles that triggered 
  //the event
  collected.remove();
  }
  


  //drawSprites();
}