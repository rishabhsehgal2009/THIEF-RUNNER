var groundimage, ground;
var thief, thiefimage;
var invisibleground1, invisibleground2;
var note, noteimg, notegrp;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, gameoverimg, gameoversound;
var resets, resetimg;
var score = 0;
var youwinsound;
function preload(){
  groundimage = loadImage("road.jpg");
  thiefimage=loadImage("thief1.png");
  noteimg=loadImage("note.png");
  policeimg=loadImage("police.png");
  gameoverimg=loadImage("gameover.png");
  gameoversound = loadSound("gameover.mpeg");
  resetimg=loadImage("reset.png");
  youwinsound=loadSound("youwin.mpeg");
}

function setup() {
  createCanvas(500,500);
  
  ground = createSprite(300,240);
  ground.addImage(groundimage);
  ground.velocityX = -4;
  
  thief = createSprite(50,400,50,50);
  thief.addImage(thiefimage);
  thief.scale=0.2;
  
  invisibleground1 = createSprite(250,475,500,5);
  invisibleground1.visible = false;
  
  invisibleground2 = createSprite(250,320,500,5);
  invisibleground2.visible = false;
  
  gameover = createSprite(250,250,50,50);
  gameover.addImage(gameoverimg);
  gameover.visible= false;
  
  thief.setCollider("rectangle",0,0,200,200);
  thief.debug = false;
  
  resets = createSprite(250,350,50,50);
  resets.addImage(resetimg);
  resets.scale = 0.2;
  resets.visible = false;
  
  notegrp = createGroup();
  policegrp = createGroup();
}

function draw() {
  
  background(220);
  
  
  if(gameState===PLAY){
       
  if (ground.x < 60){
      ground.x = ground.width/2;
   }
  
  if(keyDown("up_arrow")){
    thief.y = thief.y-10; 
 } 
  
  if(keyDown("down_arrow")){
    thief.y = thief.y+10;
 } 
  
  notes();
  plice();
    
  thief.collide(invisibleground1);
  thief.collide(invisibleground2);
    
  if(thief.isTouching(notegrp)){
    score = score+2;
    notegrp.destroyEach();
  }
    
    if(thief.isTouching(policegrp)){
      gameState = END;
      gameoversound.play();
    }
    
    if(score===30){
      gameState = END;
      youwinsound.play();
    }
  }
  
  else if(gameState===END){
       ground.velocityX = 0; 
       thief.visible = false;
       notegrp.destroyEach();
       policegrp.destroyEach();
       gameover.visible = true;
       resets.visible = true;
    }
  
  if(mousePressedOver(resets)){
    reset();
    ground.velocityX = -4;
    gameoversound.stop();
    resets.visible = false;
  }
  
  drawSprites();
  
  fill("black");
  textSize(20)
  text("Score: "+score,400,200);
}

function notes(){
  if(frameCount%120===0){
    note = createSprite(400,430,30,30);
    note.y = Math.round(random(350,485));
    note.velocityX = -4;
    note.addImage(noteimg);
    note.scale = 0.3;
    note.velocityX = -(5+score/2); 
    notegrp.add(note);
  }
}

function plice(){
  if(frameCount%210===0){
police = createSprite(400,Math.round(random(400,450)),30,30);
    //police.y = Math.round(random(400,485));
    police.velocityX = -4;
    police.addImage(policeimg);
    police.scale = 0.1;
    police.depth = thief.depth;
    thief.depth = thief.depth+1;
    police.velocityX = -(3+score/2);
    policegrp.add(police);
}
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  score = 0;
  thief.visible = true;
  resets.visible = false;
}
