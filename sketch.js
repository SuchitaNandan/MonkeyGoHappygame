var PLAY = 1;
var END = 2;
var gameState = PLAY;
var monkey, monkey_running,monkey_collided;
var banana, bananaImage,bananaGroup;
var ground;
var obstacle, obstacleImage,obstacleGroup;
var score=0;
var bananaScore = 0;
var jumpSound, gameOverSound,bananaSound;

function preload() {

  monkey_running =
    loadAnimation("sprite_0.png", "sprite_1.png",
  "sprite_2.png", "sprite_3.png", "sprite_4.png",
  "sprite_5.png", "sprite_6.png", "sprite_7.png",
  "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_0.png");
 
jumpSound=
loadSound("386611__jalastram__sfx-jump-04 (1).mp3");
gameOverSound = 
loadSound("173859__jivatma07__j1game-over-mono.mp3")
bananaSound= 
loadSound("95557__robinhood76__01662-cartoon-jump.mp3");
  
}

function setup() {

  createCanvas(550,500);
  ground = createSprite(225,450,1100,100);
  ground.velocityX=-3;
  ground.x=ground.width/2;
  ground.shapeColor ="green";
  
  monkey = createSprite(50,390,10,30);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.17;
  monkey.debug=false;
  monkey.setCollider("rectangle",0,0,400,500);
  
  //creating groups
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
}

function draw() {
  background("lightblue");
   
  
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/50);
  
 // console.log(monkey.y)

  
  if(ground.x <0){
    ground.x=ground.width/2;
  }

  if(keyDown("space")&& monkey.y >= 340 ){     
    monkey.velocityY=-50;
    jumpSound.play();
  }
// adding gravity
  monkey.velocityY= monkey.velocityY +4.5;

  spawnObstacles();
  spawnBanana()
 if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    bananaScore++;
    bananaSound.play();
  }

  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    gameOverSound.play();
    
  }
  }else if(gameState===END){
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.destroyEach(0);
    ground.velocityX=0;
    monkey.changeAnimation("collided",monkey_collided);
    textSize(15);
    fill("black");
    text("PRESS 'R' TO RESET ",195,220);
     textSize(30);
    fill("red");
    text("GAMEOVER",180,200);
    monkey.velocityY=0;
    
    if(keyDown("R")){
      reset();
    }
    
  }
    
 monkey.collide(ground);
  
  drawSprites();
  fill("black");
  textSize(15);
  text("SURVIVAL TIME = "+score,50,30);
  fill("maroon");
  textSize(15);
  text("BANANAS : "+ bananaScore, 290,30); 
}


function spawnObstacles(){
if(frameCount % 200=== 0){
  var obstacle = createSprite(600,360,70,70);
  obstacle.velocityX=-(10+(score/100));
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.25;
  obstacle.debug=false;
  obstacle.setCollider("rectangle",0,0,250,300);
  obstacle.lifetime=65;
  obstacleGroup.add(obstacle);
  return obstacle;
} 
}


function spawnBanana(){
if(frameCount % 150 === 0){
  var banana = createSprite(600,Math.round(random(120,200)),40,10);
  banana.velocityX=-(4+ (score/100));
  banana.addImage(bananaImage);
  banana.scale=0.12;
  banana.debug=false;
  banana.setCollider("rectangle",0,0,500,200);
  banana.lifetime=160;
  bananaGroup.add(banana)
  return banana;
}  
}

function reset(){
 gameState=PLAY;
obstacleGroup.destroyEach();
monkey.changeAnimation("running",monkey_running);
  score=0; 
  bananaScore = 0;
}