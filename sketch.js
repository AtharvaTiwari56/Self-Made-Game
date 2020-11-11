const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;
var engine, world;


var player, playerimg, monster, monsterimg, sword, swordimg, swordimg1, backgroundimg, door, doorimg, pillar1, pillar2, pillar3;
var ground, woosh, hit, hit1, life, gameState, monster1, restart, restartimg, playerimg1, achievementsound;
var pillar4, pillar5, pillar6, pillarimg, maxArrows, arrows, arrow, boss, monlife, lifeimg,  x, y, epicSound, bad;


function preload() {
  // preloading everything
  playerimg = loadImage("Images/download(1)(1).png");
  playerimg1 = loadImage("Images/download (17).png");
  monsterimg = loadAnimation("Images/download (2).png", "Images/download (3).png");
  doorimg = loadImage("Images/Door.png");
  pillarimg = loadImage("Images/Untitled (1) (1).png");
 // swordimg1 = loadImage("Images/images(1).png");
  backgroundimg = loadImage("Images/back.png");
  backgroundimg1 = loadImage("Images/download.jpg");
  woosh = loadSound("Images/WooshSound.mp3");
  restartimg = loadImage("Images/restart.png");
  achievementsound = loadSound("Images/checkPoint.mp3");
  lifeimg = loadImage("Images/MC_Heart.png");
  epicSound = loadSound("Images/Sound!!.wav");
}

function setup() {
  
  createCanvas(1700,700);
  

  engine = Engine.create();
  world = engine.world;

  //initializing gameState and hitcount
  hit = 0;
  hit1 = 0;
  gameState = "Instructions";

  
  door = createSprite(1250, 535, 50, 50);
  door.addImage(doorimg);
  door.visible = false;
  door.scale = 0.5

  // player
  player = createSprite(150, 560, 50, 50);
  player.addImage(playerimg1);
  player.visible = false;
  //player.debug = true;
  
  
  // initializing sword variable
  sword = null;

  //ground
  ground = createSprite(850, 675, 1700, 50);
  ground.visible = false;
  ground.shapeColor = "#526677"

  //monsters
  monster = createSprite(400, 560, 50, 50);
  monster.addAnimation("label", monsterimg);
  monster.velocityX= -3;
  monster.scale = 2;
  monster.visible = false;

  monster1 = createSprite(800, 560, 50, 50);
  monster1.addAnimation("label", monsterimg);
  monster1.velocityX = -3;
  monster1.visible= false;
  monster1.scale = 2;
  
  boss = createSprite(1500, 450);
  boss.visible = false;
 //boss.velocityX = -0.1;
  
  //player life creation
  life = new Life();
  

  //pillars
  pillar1 = createSprite(350, 675, 50, 50);
  pillar1.addImage(pillarimg);
  pillar1.scale = 0.40;
  pillar1.visible = false;

  pillar2 = createSprite(700, 575, 50, 50);
  pillar2.addImage(pillarimg);
  pillar2.scale = 0.40;
  pillar2.visible = false;

  pillar3 = createSprite(1050, 700, 50, 50);
  pillar3.addImage(pillarimg);
  pillar3.scale = 0.40;
  pillar3.visible = false;

  pillar4 = createSprite(1500, 550, 50, 50);
  pillar4.addImage(pillarimg);
  pillar4.scale = 0.40;
  pillar4.visible = false;

  arrows = new Group();
  arrow = new Arrow();

  bad = 3;
}

function draw() {
  background(backgroundimg);  
  Engine.update(engine);
  
  if(gameState == "Instructions"){
    textSize(60);
    fill(155, 196, 60);
    text("Welcome to 'Castle Quest'!", 500, 100);
    textSize(30);
    fill(255);
    text("This is a game in which your prime objective is to defeat 'Knao' the leader of the monsters,", 250, 200);
    text("and also the one who has spread darkness across the land with his massive army of evil monsters.", 250, 240);
    text("Now, as the great warrior Kane, you must defeat Knao's evil forces and retrieve the 'Megablade',", 250, 280);
    text("a sword that gives the holder immense power, and Knao is using it to carry out his evil plans.", 250, 320);
    text("Press Space to Begin.", 650, 600);
    if (keyDown("space")) {
      gameState = "Level1";
      console.log(gameState);
    }
  }
  else if(gameState === "Level1") {
    //displaying lives
    background(backgroundimg1);
    life.display();
    player.visible = true;
    monster.visible = true;
    monster1.visible = true;
    door.visible = true;
    ground.visible = true;
    monster1.velocityX = 3;
    monster.velocityX = 3;
 
  //show text for sword
  if (sword == null) {
    textSize(20);
    fill("black");
    noStroke();
    text("Press 'space' to get a weapon and become a warrior!", player.x - 90, player.y - 100);
  }

  //becoming sword
  if (keyWentDown("space")) {
    player.scale = 0.75;
    player.addImage(playerimg);
    sword = 1;
    player.setCollider("rectangle", 0, 0, 125, 225);
  }

  // monster functionality
  if(monster.x >= 600){
    monster.mirrorX(-1);
    monster.velocityX = -3;
  } else if(monster.x <= 400){
    monster.mirrorX(1);
    monster.velocityX = 3;
  }

  if(monster1.x >= 1000){
    monster1.mirrorX(-1);
    monster1.velocityX = -3;
  } else if(monster1.x <= 800){
    monster1.mirrorX(1);
    monster1.velocityX = 3;
  }

  //life deduction
  if( player.isTouching(monster) || player.isTouching(monster1)){
    life.life = life.life - 0.1;
  }

  // hitting monsters
  if (monster.x - player.x <= 200 && mousePressedOver(monster)) {
    if (sword === 1) {
      woosh.play();
      hit+= 0.5;
    }
  }
  if (monster1.x - player.x <= 200 && mousePressedOver(monster1)) {
    if (sword === 1) {
      woosh.play();
      hit1+= 0.5;
    }
  }
  //game over
  

  if (player.x >= 1100) {
    textSize(25);
    fill("black");
    stroke("black");
    text("Press 'Space' to enter the door!", door.x - 250, door.y - 250);
    if (keyDown("space")) {
      gameState = "Level2";
      player.x = 100;
      player.y = 250;
      door.visible = false;
      ground.width = 200;
      ground.x = 100;
      ground.height = 350;
      ground.y = 525;
    }
  }
  
  //destroying monsters
  if(hit === 5){
    monster.destroy();
   }
   if(hit1 === 5){
    monster1.destroy();
    achievementsound.play();
   }

  } else if(gameState === "Level2"){
    background("#05ABF1");
    pillar1.visible = true;
    life.display();
    player.collide(pillar1);
    pillar1.setCollider("rectangle", 0, 0, 500, 900);

    monster.destroy();
    monster1.destroy();

    if (keyDown(UP_ARROW) && player.y >= 359){
      player.velocityY = - 15;
    }
    player.velocityY = player.velocityY +0.8;

    pillar2.visible = true;
    player.collide(pillar2);
    pillar2.setCollider("rectangle", 0, 0, 500, 900);

    pillar3.visible = true;
    player.collide(pillar3);
    pillar3.setCollider("rectangle", 0, 0, 500, 900);

    pillar4.visible = true;
    player.collide(pillar4);
    pillar4.setCollider("rectangle", 0, 0, 500, 900);

    if(player.y >= 660) {
      gameState = "GameOver";
      pillar1.destroy();
      pillar2.destroy();
      pillar3.destroy();
      pillar4.destroy();
    }
    if (player.x >= pillar4.x) {
      textSize(25);
      fill("black");
      stroke("black");
      text("Press 'Space' to advance further!", door.x - 250, door.y - 250);
      if (keyDown("space")) {
        gameState = "Level3";
        player.x = 100;
        player.y = 250;
        door.visible = false;
        ground.width = 200;
        ground.x = 100;
        ground.height = 350;
        ground.y = 525;
      }
    }
    
  } else if(gameState === "Level3"){
    pillar1.destroy();
    pillar2.destroy();
    pillar3.destroy();
    pillar4.destroy();
    player.y = 560;
    life.display();
    ground.width = 1700;
    ground.height = 50;
    ground.x = 850;
    ground.y = 675;
    arrow.display();
    if (player.x >=1600) {
      textSize(25);
      fill("black");
      stroke("black");
      text("Press 'Space' to advance further!", player.x - 250, player.y - 250);
      if (keyDown("space")) {
        gameState = "Level4";
        player.x = 150;
        player.y = 560;
        life.life = 10;
      }
    }
    
  }
  else if(gameState === "GameOver") {

    restart = createSprite(630, 385);
    restart.addImage(restartimg);

    background("Red");
    textSize(35);
    fill("black");
    text("You Died!", 565, 350);

    monster.destroy();
    monster1.destroy();

    player.visible = false;
    ground.visible = false;
    door.visible = false;

    
  
  } else if(gameState == "Level4") {
    //player.x = 150;
    arrows.destroyEach();
    life.display();
    player.debug = true;

    boss.visible = true;

    monLife = new MonLife();
  
    x = boss.x - 50;
    y = boss.y - 105;
        
        if (bad!== 0) {
            for (let index = 0; index < bad; index++ ) {
                if(index % 3 == 0) {
                     x= boss.x - 50;
                }
                image(lifeimg, x, y, 50, 50);
                x = x+ 90;
            }
        }

    if (boss.isTouching(player)) {
      life.life -= 0.15;
    }
    if (mousePressedOver(boss) && boss.x - player.x <= 200) {
      bad = bad - 0.05;
      console.log(boss.x - player.x);
      woosh.play();
    }
    if(bad <= 0){
      boss.destroy();
      //achievementsound.play();
    }
    //boss.x = 1400;
    
    
        

    
    //boss.velocityY = 5;
    
    if(boss.x >= 1500){
      //boss.mirrorX(-1);
      boss.velocityX = -5;
    } else if(boss.x < 500){
      //boss.mirrorX(1);
      boss.velocityX = 5;
    }   
  }
  
  if(life.life <= 0){
    gameState = "GameOver";
  }
  
  // movement
  if (keyDown(RIGHT_ARROW)) {
    player.x= player.x + 6;
  }
  if (keyDown(LEFT_ARROW)) {
    player.x= player.x - 6;
  }
  player.collide(ground);
  drawSprites();
}