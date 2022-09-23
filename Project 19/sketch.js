var path,schoolStudent;
var obstacle1,obstacle2,obstacle3;
var pathImg,mainStudentImg1,mainStudentImg2;

var shBook,book1Img;
var shRuler,ruler3Img;
var shPencil,pencil2mg;
var gameOverImg;

var bookG,pencilG,rulerG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var grade=0;
var gameOver, restart;


function preload(){

    pathImg = loadImage("Road.png");
  mainStudentImg1 = loadAnimation("student.png");
  mainStudentImg2= loadAnimation("student2.jpg");
  
  book1Img = loadImage("book.png");
  pencil2Img = loadImage("pencil.png");
  
  ruler3Img = loadImage("ruler.png");
  
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
 
    createCanvas(1200,300);

path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

schoolStudent = createSprite(70,150);
schoolStudent.addAnimation("SahilRunning",mainStudentImg1);
schoolStudent.scale=0.07;
  

schoolStudent.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
bookG = new Group();
pencilG = new Group();
rulerG = new Group();
}

function draw() {
 
    background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Grade: "+ grade,900,30);
  
  if(gameState===PLAY){
    
   grade = grade + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*grade/150);
  
   schoolStudent.y = World.mouseY;
  
   edges= createEdgeSprites();
   schoolStudent .collide(edges);
  
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  var select_Obstacles = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_Obstacles == 1) {
      shBook();
    } else if (select_Obstacles == 2) {
      shPencil();
    } else if (select_Obstacles ==3) {
      shRuler();
    }
  }
  
   if(bookG.isTouching(schoolStudent)){
     gameState = END;
     obstacle1.velocityY = 0;
    }
    
    if(pencilG.isTouching(schoolStudent)){
      gameState = END;
      obstacle2.velocityY = 0;
    }
    
    if(rulerG.isTouching(schoolStudent)){
      gameState = END;
      obstacle3.velocityY = 0;
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to restart game", 500,200);
  
    path.velocityX = 0;
    schoolStudent.velocityY = 0;
    schoolStudent.addAnimation("SahilRunning",mainStudentImg2);
  
    bookG.setVelocityXEach(0);
    bookG.setLifetimeEach(-1);
  
    pencilG.setVelocityXEach(0);
    pencilG.setLifetimeEach(-1);
  
    rulerG.setVelocityXEach(0);
    rulerG.setLifetimeEach(-1);
    

     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function shBook(){
        obstacle1 =createSprite(1100,Math.round(random(50, 250)));
        obstacle1.scale =0.5;
        obstacle1.velocityX = -(6 + 2*grade/150);
        obstacle1.setLifetime=170;
        bookG.add(obstacle1);
}

function shPencil(){
        obstacle2 =createSprite(1100,Math.round(random(50, 250)));
        obstacle2.scale =0.5;
        obstacle2.velocityX = -(6 + 2*grade/150);
        obstacle2.setLifetime=170;
        pencilG.add(obstacle2);
}

function shRuler(){
        obstacle3 =createSprite(1100,Math.round(random(50, 250)));
        obstacle3.scale =0.5;
        obstacle3.velocityX = -(6 + 2*grade/150);
        obstacle3.setLifetime=170;
        rulerG.add(obstacle3);
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  schoolStudent.addAnimation("SahilRunning",mainStudentImg1);
  
  bookG.destroyEach();
  pencilG.destroyEach();
  rulerG.destroyEach();
  
  grade = 0;
 }

