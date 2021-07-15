var path,boy,bat,ball,sword;
var pathImg,boyImg,batImg,ballImg,swordImg;
var Collection = 0;
var batG,ballG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("boy1.png","boy2.png","boy3.png");
  batImg = loadImage("bat.png");
  ballImg = loadImage("ball.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;



//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
//boy.debug = true
boy.setCollider("circle", 0, 10,80)
  
  
batG=new Group();
ballG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }

  
    createBat();
    createBall();
    
    createSword();

    if (batG.isTouching(boy)) {
      batG.destroyEach();
      Collection=Collection+50;
    }
    else if (ballG.isTouching(boy)) {
      ballG.destroyEach();
      Collection=Collection+100;
      
    }
      
    else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        batG.destroyEach();
        ballG.destroyEach();
        swordGroup.destroyEach();
        
        batG.setVelocityYEach(0);
        ballG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Toy Score: "+ Collection,150,30);
  }

}

function createBat() {
  if (World.frameCount % 200 == 0) {
  var bat = createSprite(Math.round(random(50, 350),40, 10, 10));
  bat.addImage(batImg);
  bat.scale=0.12;
  //bat.debug = true
  bat.velocityY = 3;
  bat.lifetime = 150;
  batG.add(bat);
  }
}

function createBall() {
  if (World.frameCount % 320 == 0) {
  var ball = createSprite(Math.round(random(50, 350),40, 10, 10));
  ball.addImage(ballImg);
  ball.scale=0.09;
 // ball.debug = true
  ball.velocityY = 3;
  ball.lifetime = 150;
  ballG.add(ball);
}
}


function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  //sword.debug = true
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}