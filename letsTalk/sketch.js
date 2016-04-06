var numberOfRows, numberOfColumns;
var lilP, bgII, card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18, card19;
var timer, startTime, xPos, yPos, x, y, i;
var cards;
var tempArray = [];
var shuffledArray = [];
var positions = []; //for the vectors
var cardsFlipped = [];
var endOfGame = 0; //commented out end of game code bc trying to fix it >.>
//place them based on card integers
var good4u = [];
var carArray = [];
var idx = [];

function preload() {
  music = loadSound('assets/impending-nervousness.wav');
  lilP = createSprite(60, 410);
  lilP.addAnimation("lilPidle", "assets/p-idle_1.png", "assets/p-idle_3.png");
  lilP.scale = 0.90;
  otherP = createSprite(900, 410);
  otherP.addAnimation("teh pees", "assets/other_1.png", "assets/other_3.png");
  otherP.scale = .9;
  bgII = loadImage("assets/speechBubble.png");

}

function setup() {
  music.setVolume(0.5);
  music.play();
  numberOfColumns = 4; //we want 5 columns
  numberOfRows = 5; //we want 4 rows
  startTime = millis();
  canvas = createCanvas(980, 500);
	canvas.position(860/2, 440/2);

  var xStep = width / numberOfColumns; //to make sure they are evenly spaced, we divide the width and height by numberOfColumns
  var yStep = height / numberOfRows; //and numberOfRows respectively

  //taking stuff in and out and always checking if they match

  cardsID = new Group();
  //make a new group to check the cards flipped
  cards = new Group();

  card0 = createSprite(positions.x, positions.y);
  card0.addAnimation("card back", "assets/cardB1.png");
  card0.addAnimation("card front", "assets/gC1.png");
  card0.setCollider("circle", 0, 0, 50);
  card0.ID = 0;

  card1 = createSprite(positions.x, positions.y);
  card1.addAnimation("card back", "assets/cardB1.png");
  card1.addAnimation("card front", "assets/gC2.png");
  card1.setCollider("circle", 0, 0, 50);
  card1.ID = 1;


  card2 = createSprite(positions.x, positions.y);
  card2.addAnimation("card back", "assets/cardB1.png");
  card2.addAnimation("card front", "assets/gC3.png");
  card2.setCollider("circle", 0, 0, 50);
  card2.ID = 2;

  card3 = createSprite(positions.x, positions.y);
  card3.addAnimation("card back", "assets/cardB1.png");
  card3.addAnimation("card front", "assets/gC4.png");
  card3.setCollider("circle", 0, 0, 50);
  card3.ID = 3;

  card4 = createSprite(positions.x, positions.y);
  card4.addAnimation("card back", "assets/cardB1.png");
  card4.addAnimation("card front", "assets/gC5.png");
  card4.setCollider("circle", 0, 0, 50);
  card4.ID = 4;

  card5 = createSprite(positions.x, positions.y);
  card5.addAnimation("card back", "assets/cardB1.png");
  card5.addAnimation("card front", "assets/bC1.png");
  card5.setCollider("circle", 0, 0, 50);
  card5.ID = 5;

  card6 = createSprite(positions.x, positions.y);
  card6.addAnimation("card back", "assets/cardB1.png");
  card6.addAnimation("card front", "assets/bC2.png");
  card6.setCollider("circle", 0, 0, 50);
  card6.ID = 6;

  card7 = createSprite(positions.x, positions.y);
  card7.addAnimation("card back", "assets/cardB1.png");
  card7.addAnimation("card front", "assets/bC3.png");
  card7.setCollider("circle", 0, 0, 50);
  card7.ID = 7;

  card8 = createSprite(positions.x, positions.y);
  card8.addAnimation("card back", "assets/cardB1.png");
  card8.addAnimation("card front", "assets/bC4.png");
  card8.setCollider("circle", 0, 0, 50);
  card8.ID = 8;

  card9 = createSprite(positions.x, positions.y);
  card9.addAnimation("card back", "assets/cardB1.png");
  card9.addAnimation("card front", "assets/bC5.png");
  card9.setCollider("circle", 0, 0, 50);
  card9.ID = 9;

  card10 = createSprite(positions.x, positions.y);
  card10.addAnimation("card back", "assets/cardB1.png");
  card10.addAnimation("card front", "assets/gC1.png");
  card10.setCollider("circle", 0, 0, 50);
  card10.ID = 0;

  card11 = createSprite(positions.x, positions.y);
  card11.addAnimation("card back", "assets/cardB1.png");
  card11.addAnimation("card front", "assets/gC2.png");
  card11.setCollider("circle", 0, 0, 50);
  card11.ID = 1;

  card12 = createSprite(positions.x, positions.y);
  card12.addAnimation("card back", "assets/cardB1.png");
  card12.addAnimation("card front", "assets/gC3.png");
  card12.setCollider("circle", 0, 0, 50);
  card12.ID = 2;

  card13 = createSprite(positions.x, positions.y);
  card13.addAnimation("card back", "assets/cardB1.png");
  card13.addAnimation("card front", "assets/gC4.png");
  card13.setCollider("circle", 0, 0, 50);
  card13.ID = 3;

  card14 = createSprite(positions.x, positions.y);
  card14.addAnimation("card back", "assets/cardB1.png");
  card14.addAnimation("card front", "assets/gC5.png");
  card14.setCollider("circle", 0, 0, 50);
  card14.ID = 4;

  card15 = createSprite(positions.x, positions.y);
  card15.addAnimation("card back", "assets/cardB1.png");
  card15.addAnimation("card front", "assets/bC1.png");
  card15.setCollider("circle", 0, 0, 50);
  card15.ID = 5;

  card16 = createSprite(positions.x, positions.y);
  card16.addAnimation("card back", "assets/cardB1.png");
  card16.addAnimation("card front", "assets/bC2.png");
  card16.setCollider("circle", 0, 0, 50);
  card16.ID = 6;

  card17 = createSprite(positions.x, positions.y);
  card17.addAnimation("card back", "assets/cardB1.png");
  card17.addAnimation("card front", "assets/bC3.png");
  card17.setCollider("circle", 0, 0, 50);
  card17.ID = 7;
  //console.log(card17.ID);

  card18 = createSprite(positions.x, positions.y);
  card18.addAnimation("card back", "assets/cardB1.png");
  card18.addAnimation("card front", "assets/bC4.png");
  card18.setCollider("circle", 0, 0, 50);
  card18.ID = 8;

  card19 = createSprite(positions.x, positions.y);
  card19.addAnimation("card back", "assets/cardB1.png");
  card19.addAnimation("card front", "assets/bC5.png");
  card19.setCollider("circle", 0, 0, 50);
  card19.ID = 9;

  carArray = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18, card19];

  idx == shuffledArray(carArray.length);
  for (var i = 0; i < carArray.length; i++) {
    tempArray[i] = carArray[i];
  }
  for (var i = 0; i < carArray.length; i++) {
    var column = i % 5; //% is mod gives you an int
    var row = floor(i / 5);
    //    console.log(idx[i] + ": column: " + column + " row: " + row);
    tempArray[i] = carArray[idx[i]];
    tempArray[i].position.x = map(column, 0, 4, 250, 750);
    tempArray[i].position.y = map(row, 0, 3, 100, 400);
    tempArray[i].changeAnimation("card back");
  }
  for (var i = 0; i < carArray.length; i++) {
    carArray[i] = tempArray[i];
  }
}


function draw() {

  //console.log(good4u.length);
  // console.log(carArray[19].ID);
  background(bgII);
  drawSprites();
  textAlign(CENTER);
  textSize(20);
  fill(12, 50);

  //console.log(cardsFlipped);
  // console.log(carArray[0]);
   endOfGame += 24; //THIS CODE ENDS IT AFTER time passes :~)
  // console.log(endOfGame);
   if (endOfGame == 18000){
     text("WELL THAT WAS AN OKAY CONVERSATION I GUESS", width/2, height/2);
   window.location.href="http://sites.bxmc.poly.edu/~indiraardolic/cope-with-me/mainLove/";
  // }


  for (var i = 0; i < carArray.length; i++) {
    carArray[i].onMousePressed = function() {
      if (this.getAnimationLabel() == "card back" && cardsFlipped.length < 2) {
        this.changeAnimation("card front");
        timer = 3000;
        cardsFlipped.push(this); //pushing cards into array so the max no of cards flipped is 2
      }

        // console.log("clicked on card with ID: " + this.ID);
        //{{checking CARDSID == CARDSID}}
        //♦☻♣THIS CHECKS FOR MATCH/ matches the ID s TO ONE ANOTHER
      if ((cardsFlipped.length == 2) && ((cardsFlipped[0].ID) == (cardsFlipped[1].ID))) {
        console.log("you fuckin did it!!");
        good4u.push(cardsFlipped[1]);  //we put in the second match into cool array then boop it out the array, then with the first too
        cardsFlipped.pop[1];
        good4u.push(cardsFlipped[0]);
        cardsFlipped.pop[0];
        console.log("good4u"+good4u.length); ///im cleaerly shit at coding.......................wtf               ffff f f f logic?? what dat
          for (var i = 0; i < good4u.length; i++) {  //suppose to make sure everything added to good4u is facing up
            good4u[i].changeAnimation("card front");
            carArray.pop(i);
            console.log("carArray is"+carArray.length);
//              timer = 3000;
            console.log("i'll remember this forever :)");
          }
        }else if ((cardsFlipped.length == 2) && ((cardsFlipped[0].ID) =! (cardsFlipped[1].ID))){
          console.log("dont do shit p5! also keep trying. ");
          cardsFlipped[0].changeAnimation("card back");
          cardsFlipped[1].changeAnimation("card back");
        }
    }
    }
  


  if (millis() - startTime > timer / 2) {
    startTime = millis();
    console.log("good4u:"+good4u.length);
    console.log("carArray:"+carArray.length);
    console.log("cardsFlipped:"+cardsFlipped.length);
    for (var i = 0; i < cardsFlipped.length; i++) {
      cardsFlipped.pop(i);
    }
    for (var i = 0; i < carArray.length; i++) {
      carArray[i].changeAnimation("card back");
      cardsFlipped.pop(i);
    }
  }
}

//this is where we can randomize the cards!!
function shuffledArray(len) {
  var array = new Array(len);
  for (var i = 0; i < array.length; i++) {
    array[i] = i;
  }
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}}