var lilP, music, worldI, canvas, venting, analytical, livid, hudBg, bgI, startTime, timer;
var space = 10;
var MARGIN = 40;

function preload() {
  music = loadSound('assets/hud-grooves.wav');
	lilP = createSprite(490, 305);
	lilP.addAnimation("lilPidle", "assets/p-idle_1.png", "assets/p-idle_3.png");
	lilP.addAnimation("lilPwalks", "assets/p-walking_1.png", "assets/p-walking_2.png");
	trying = createSprite(130, 90);
	trying.addAnimation("inf-runner", "assets/mini-infRunner-1.png", "assets/mini-infRunner-3.png");
	venting = createSprite(130, 530);
	venting.addAnimation("normal", "assets/venting-1.png", "assets/venting-4.png");
	analytical = createSprite(850, 90);
	analytical.addAnimation("normal", "assets/analytical-1.png", "assets/analytical-4.png");
	livid = createSprite(850, 530);
	livid.addAnimation("normal", "assets/livid-1.png", "assets/livid-9.png");
}

function setup() {
  startTime = millis();
	hudBg = loadImage("assets/hudBg.png");
	bgI = loadImage("assets/infrunbg.png");
	bgII = loadImage("assets/cardmatchbg.png");
	bgIII = loadImage("assets/blockmatchbg.png");
	bgIV = loadImage ("assets/sibg.png");
	background(hudBg);
	var x= 980;
	var y = 610; 
	canvas = createCanvas(980,610);
	canvas.position(860/2, 440/2);
	music.setVolume(0.5);
  music.play();

}

function draw(){
	background(hudBg);
	//image(livid, 850, 530);
	drawSprites();
  textAlign(CENTER);
  textSize(30);
  fill(0);
//this MAKES the SCREEN WRAP :3
	for(var i=0; i<allSprites.length; i++) {
	var s = allSprites[i];
	if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
	if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
	if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
	if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
	}

if (keyIsDown(UP_ARROW)){ //change the picture so he looks in a direction to make it clear that hes changing direction
  lilP.changeAnimation("lilPwalks");
  lilP.position.y -= space;
}else if (keyIsDown(LEFT_ARROW)) { 
  lilP.changeAnimation("lilPwalks"); //lilPcrouches
  lilP.position.x -= space;
}else if (keyIsDown(RIGHT_ARROW)){
  lilP.changeAnimation("lilPwalks"); 
  lilP.position.x += space;
}else if (keyIsDown(DOWN_ARROW)) { 
  lilP.changeAnimation("lilPwalks"); //lilPcrouches
  lilP.position.y += space;
}else{
  lilP.changeAnimation("lilPidle");
}

if(lilP.overlap(trying)) {
	background(bgI);
	blendMode(SOFT_LIGHT);
	console.log("trying"); //trying is running
	timer -= 24;
	text("ALRIGHT I GUESS I WANNA DO THIS ONE " + timer/1000, width/2, height/2);
	   if (timer == 0){
      window.location.href="http://sites.bxmc.poly.edu/~indiraardolic/cope-with-me/runRunRun/";
    }
}else if (lilP.overlap(venting)) {
	background(bgII);	
	blendMode(SOFT_LIGHT);
	console.log("venting"); //venting is conversation
	timer -= 24;
	text("ALRIGHT I GUESS I WANNA DO THIS ONE " + timer/1000, width/2, height/2);
	   if (timer == 0){
      window.location.href="http://sites.bxmc.poly.edu/~indiraardolic/cope-with-me/letsTalk/";
    }
}else if (lilP.overlap(analytical)) {
	background(bgIII);	
	blendMode(SOFT_LIGHT);
	console.log("analytical"); //analytical is getting in your head, drunk
	timer -= 24;
	text("ALRIGHT I GUESS I WANNA DO THIS ONE " + timer/1000, width/2, height/2);
	   if (timer == 0){
      window.location.href="http://sites.bxmc.poly.edu/~indiraardolic/cope-with-me/floatingAlong/";
    }
}else if (lilP.overlap(livid)) {
	background(bgIV);
	blendMode(SOFT_LIGHT);
	console.log("livid");
	timer -= 24;
	text("ALRIGHT I GUESS I WANNA DO THIS ONE " + timer/1000, width/2, height/2);
	   if (timer == 0){
      window.location.href="http://sites.bxmc.poly.edu/~indiraardolic/cope-with-me/walkAimlessly/";
      }
}	else{
  timer = 3000;
  }

drawSprites();
}
