//variables for sprites
var playerS, back1_1, back1_2, back2, edges, bottom;

//varibles for groups
var gBullet, gEnemy;

//variables for resources
var shipP, backImg1, backImg2, bullImg, ship1, ship2, ship3, ship4;

//variables for extras
var gameState = 0;
var lives = 3;
var Enx;

function preload(){
  shipP = loadImage("Resource/Invade.gif");
  backImg1 = loadImage("Resource/Back1.png");
  backImg2 = loadImage("Resource/Back2.png");
  bullImg = loadImage("Resource/Bullet.png");
  ship1 = loadImage("Resource/Ship1.png");
  ship2 = loadImage("Resource/Ship2.png");
  ship3 = loadImage("Resource/Ship3.png");
  ship4 = loadImage("Resource/Ship4.png");
  
}

function setup() {
  createCanvas(700,500);

  textSize(19);
  fill("red");

  back1_1 = createSprite(350, 250);
  back1_1.addImage(backImg1);

  playerS = createSprite(350, 450);
  playerS.addImage(shipP);

  bottom = createSprite(250, 496, 700, 3);
  bottom.visible = 0;
  edges = createEdgeSprites();

  gBullet = new Group();
  gEnemy = new Group();
}

function draw() {
  background(230);
  showMouse(75, 25, "p", true);

  if(gameState === 0){
    if(keyWentDown("space")){
      gameState = 1;
    }

    back1_1.visible = 0;
  } else if(gameState === 1){
    back1_1.visible = 1;

    //player ship movement
    playerS.x = mouseX;

    if(keyWentDown("space")){
      shoot();
    }

    if(frameCount % 80 === 0){
      spawnEnemy();
    }
    gEnemy.bounceOff(edges);

    if(gEnemy.isTouching(bottom)){
      gEnemy.destroyEach();
    }

    if(gEnemy.isTouching(gBullet)){
      gEnemy.destroyEach();
    }
  }

  drawSprites();
  if(gameState === 0){
    text("Press space to start", 270, 240);
    textSize(16);
    text("Lives: " + lives, 320, 270);
  } else if(gameState === 1){
    textSize(16);
    text("Press space to shoot. Use the mouse to move the space ship", 140, 20);
  }
}

function shoot(){
  var bullet = createSprite(playerS.x, playerS.y);
  bullet.addImage(bullImg);
  bullet.velocityY = -40;
  bullet.lifetime = 13;
  bullet.depth = playerS.depth;
  playerS.depth = playerS.depth + 1;

  gBullet.add(bullet);
}

function spawnEnemy(){
  var img = loadImage("Resource/Ship" + Math.round(random(1, 4)) + ".png");
  nop();
  var x = random(3, 7) * Enx;
  var enemy = createSprite(random(10, 690), -1);
  enemy.addImage(img);
  enemy.velocityY = 6;
  enemy.velocityX = x;

  gEnemy.add(enemy);
}

function nop(){
  var ret = Math.round(random(0, 1));
  if(ret === 0){
    Enx = 1;
  } else if(ret === 1){
    Enx = -1;
  }
}