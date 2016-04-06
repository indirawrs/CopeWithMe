//flappy lilP-like
//bffmouse click or x to flap

var GRAVITY = .3;
var FLAP = -7;
var GROUND_Y = 500;
var MIN_OPENING = 300;
var lilP, ground, cloud1, cloudX, cloudX2, sky; //clouds is group, cloud1+2 r sprites
var smokes, clouda, cloudb; //these are images to test the fucking scroll 4everlogic
var gameOver, collectables, token;
var lilPimg, cloud2, smokeImg, groundImg, bgImg, music;
var timer = 0;
var cloudX = 0;
var cloudX2 = 980;
//smokes will be smoke, add highness + u suppose to grab a lil drink token
//colors  r warped

function preload() {
  music = loadSound('assets/ode-to-dreams.m4a');
  // cloud1 = createSprite(0, 300);
  // cloud1.addAnimation("cloud1", "assets/cloud-1.png", "assets/cloud-2.png");
  // cloud2 = createSprite(cloud1.width + 20, 300);
  // cloud2.addAnimation("cloud1", "assets/cloud-1.png", "assets/cloud-2.png");

}

function setup() {
  canvas = createCanvas(980, 610);
  canvas.position(860 / 2, 440 / 2);
  music.setVolume(0.5);
  music.play();
  collectables = new Group();
  sky = loadImage("assets/sky.png");
  smokeImg = loadImage("assets/smoke_1.png");
  groundImg = loadImage("assets/ground_3.png");
  clouda = loadImage("assets/cloud-1.png");
  cloudb = loadImage("assets/cloud-1.png");

  lilP = createSprite(width / 2, height / 2, 40, 40);
  lilP.rotateToDirection = true;
  lilP.velocity.x = 4;
  lilP.setCollider("circle", 0, 0, 40);
  lilP.addAnimation("lilPimg", "assets/p-idle_1.png", "assets/p-idle_3.png");
  lilP.scale = .6;

  ground = createSprite(800, GROUND_Y + 100); //image 800x200
  ground.addImage(groundImg);

  smokes = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height / 2;
}

function draw() {
  background(sky);
  //makinnn animated clouds move, big jumpppp
  // if (camera.position.x > cloud1.position.x - cloud1.width / 2) {
  //   cloud1.position.x += cloud1.width;
  // }
  // if (camera.position.x > cloud2.position.x - cloud2.width + width) {
  //   cloud2.position.x += cloud2.width;
  // }
  // console.log("camera.position.x = " + camera.position.x);
  // console.log("cloud1.position.x = " + cloud1.position.x);

//fuckign tokens have to move with everything else or whatever
// for(var i=0; i<6; i++) {
//     var val = i - 4/2; //to match other funky parabola
//     var token = createSprite(i*200 + 100, abs(val * 140) + 120); //random(360,550)
//     token.addAnimation("floating", "assets/token_1.png", "assets/token_3.png"); 
//     collectables.add(token);

timer += 1;
 //re direction to main world.. gonna b based on collectables(drinks)
 //right now text shows up for a second? wtf
 if (timer == 100){//(collectables[i] != null) & (collectables.length == 1)){
     textAlign(CENTER);
     textSize(3000);
     fill(100);
     text("hot dog hot dog where the fuck am i", width/2, height/2);
     if (timer == 4000){
      window.location.href="http://sites.bxmc.poly.edu/~indiraardolic/cope-with-me/mainLove/";
    }
   }
 console.log("timer = " + timer);

image(clouda, cloudX, 0);
  if (cloudX == -980){
    cloudX = 0;
  }else{
    cloudX-=2;
  }
image(cloudb, cloudX2, 0);
  if (cloudX2 == 0){
    cloudX2 = 980;
  }else{
    cloudX2-=2;
  }
  console.log(cloudX2);

  if (gameOver && keyWentDown("x"))
    newGame();

  if (!gameOver) {

    if (keyWentDown("x"))
      lilP.velocity.y = FLAP;

    lilP.velocity.y += GRAVITY;

    if (lilP.position.y < 0)
      lilP.position.y = 0;

    if (lilP.position.y + lilP.height / 2 > GROUND_Y)
      die();

    if (lilP.overlap(smokes))
      die();

    //spawn smokes
    if (frameCount % 60 == 0) {
      var smokeH = random(50, 300);
      var smoke = createSprite(lilP.position.x + width, GROUND_Y - smokeH / 2 + 1 + 100, 80, smokeH);
      smoke.addImage(smokeImg);
      smokes.add(smoke);

      //top smoke
      if (smokeH < 200) {
        smokeH = height - (height - GROUND_Y) - (smokeH + MIN_OPENING);
        smoke = createSprite(lilP.position.x + width, smokeH / 2 - 100, 80, smokeH);
        smoke.mirrorY(-1);
        smoke.addImage(smokeImg);
        smokes.add(smoke);
      }
    }

    //get rid of passed smokes
    for (var i = 0; i < smokes.length; i++)
      if (smokes[i].position.x < lilP.position.x - width / 2)
        smokes[i].remove();
  }

  camera.position.x = lilP.position.x + width / 4;

  //wrap ground
  if (camera.position.x > ground.position.x - ground.width + width / 2)
    ground.position.x += ground.width;

  camera.off();
  camera.on();


  // drawSprite(cloud1);
  // drawSprite(cloud2);
  drawSprites(collectables);
  drawSprites(smokes);
  drawSprite(ground);
  drawSprite(lilP);

}

function die() {
  updateSprites(false);
  gameOver = true;
}

function newGame() {
  smokes.removeSprites();
  gameOver = false;
  updateSprites(true);
  lilP.position.x = width / 2;
  lilP.position.y = height / 2;
  lilP.velocity.y = 0;
  ground.position.x = 800 / 2;
  ground.position.y = GROUND_Y + 100;
}

function mousePressed() {
  if (gameOver)
    newGame();
  lilP.velocity.y = FLAP;
}