var START = 0;
var RULES = 1;
var PLAY = 2;
var END = 3;
var START2 = 6;
var PLAY2 = 7;
var END2 = 8;
var START3 = 9;
var PLAY3 = 10;
var CALC = 11;
var PASS = 12;
var END3 = 13;
var WIN3 = 14;

var gameState = START;

var rand, randPos;
var fuelTime;
var crashes;
var enemyFrame, fuelFrame;
var obstacleVelocityP, obstacleVelocityN;

var ship, obstacle, enemy, space, fuel;
var obstacleGroup, fuelGroup, enemyGroup;
var shipImage, enemyImage, asteroidImage, spaceImage, fuelImage, destroyImage;
var destroySound, fuelSound;
var alarm, defeat, victory, keyboard;
var fuelCollected;

var wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9;
var player;
var paddle, spike;
var sword1, sword2, sword3;
var invisibleWall1, invisibleWall2, invisibleWall3;
var laser1, laser2, laser3;
var exit;
var computer, computerRange;
var rightEdge, leftEdge, topEdge, bottomEdge;

var wallGroup, invisibleGroup, edges, obstacleGroup2;
                           
var playerRight, playerLeft, playerFront, playerBack, computerON, computerOFF, swordImage, spikeImage, laserImage, exitImage;

var password, typed, char;
var enter, clear; 
var button_1, button_2, button_3, button_4, button_5, button_6, button_7, button_8, button_9, button_0;

var compState = "off";

var lives = 5;

var wall10, wall11, wall12, wall13, wall14, wall15, wall16, wall17, wall18, wall19, wall20, wall21, wall22;
var invisibleWall4;
var laser4, laser5, laser6, laser7, laser8, laser9;
var player;
var calc_icon, password_icon, calc_area;
var camera1, camera2;

var pass_image, calc_image, camera_image;

var wallGroup2, obstacleGroup3; 

function preload() {
  shipImage = loadAnimation("spaceship.png");
  destroyImage = loadAnimation("ship destroy.png");

  enemyImage = loadImage("enemy spaceship.png");
  asteroidImage = loadImage("Asteroid.png");

  spaceImage = loadImage("space.jpg");

  fuelImage = loadImage("fuel.png");

  destroySound = loadSound("destroy.wav");
  fuelSound = loadSound("refuel.wav");

  playerRight = loadImage("player_right.png");
  playerLeft = loadImage("player_left.png");
  playerFront = loadImage("player_front.png");
  playerBack = loadImage("player_back.png");

  computerON = loadImage("on_computer.png");
  computerOFF = loadImage("off_computer.png");

  swordImage = loadImage("obstacle1_sword.png");
  spikeImage = loadImage("obstacle2_spike.png");
  laserImage = loadImage("obstacle3_beams.png");

  exitImage = loadImage("exit.png");

  alarm = loadSound("alarm.wav");
  defeat = loadSound("defeaT.ogg");
  victory = loadSound("victory.wav");

  keyboard = loadSound("keyboard.wav");

  calcImage = loadImage("calc_icon.png");
  pass_image = loadImage("pass_icon.png");

  camera_image = loadImage("camera.png");
}

function setup() {
  // canvas to fit all screensize
  createCanvas(windowWidth, windowHeight);

  //formula to scale the normal size(500,500) to fit any screensize
  space = createSprite(0, 0, windowWidth, windowHeight);
  space.addImage("space", spaceImage);
  space.scale = 5.2 * ((windowWidth + windowHeight)/1000);

  ship = createSprite(50, 430, 20, 20);
  ship.addAnimation("spaceship", shipImage);
  ship.addAnimation("destroy", destroyImage);

  //groups
  obstacleGroup = new Group();
  fuelGroup = new Group();
  enemyGroup = new Group();

  //edge sprites
  rightEdge = createSprite((windowWidth - (3 * ((windowHeight + windowWidth)/800))),0,3 *((windowHeight + windowWidth)/800),windowHeight * 2);
    leftEdge = createSprite(0,0,3 *((windowHeight + windowWidth)/800),windowHeight*2);
    topEdge = createSprite(0,0,windowWidth * 2,3 *((windowHeight + windowWidth)/800));
    bottomEdge = createSprite(0,windowHeight - (3 *((windowHeight + windowWidth)/800)),windowWidth * 2,3 *((windowHeight + windowWidth)/800));

    computerRange = createSprite(314 *(windowWidth/400),30 *(windowHeight/400),166 *(windowWidth/400),55 *(windowHeight/400));
    computerRange.shapeColor = "yellow";

    rightEdge.shapeColor = "red";
    leftEdge.shapeColor = "red";
    topEdge.shapeColor = "red";
    bottomEdge.shapeColor = "red";

    //creating walls
    wall1 = createSprite(50*(windowWidth/400), 40 *(windowHeight/400),100*(windowWidth/400),10*(windowHeight/400));
    wall2 = createSprite(130*(windowWidth/400),85*(windowHeight/400),10*(windowWidth/400),160*(windowHeight/400));
    wall3 = createSprite(50*(windowWidth/400), 160*(windowHeight/400),100*(windowWidth/400),10*(windowHeight/400));
    wall4 = createSprite(150*(windowWidth/400),160*(windowHeight/400),30*(windowWidth/400),10*(windowHeight/400));
    wall5 = createSprite(225*(windowWidth/400),180*(windowHeight/400),10*(windowWidth/400),270*(windowHeight/400));
    wall6 = createSprite(75*(windowWidth/400),310*(windowHeight/400),300*(windowWidth/400),10*(windowHeight/400));
    wall7 = createSprite(205*(windowWidth/400),160*(windowHeight/400),30*(windowWidth/400),10*(windowHeight/400));
    wall8 = createSprite(330*(windowWidth/400),65*(windowHeight/400),135*(windowWidth/400),10*(windowHeight/400));
    wall9 = createSprite(225*(windowWidth/400),375*(windowHeight/400),10*(windowWidth/400),50*(windowHeight/400));
    
    wall1.shapeColor = "white";
    wall2.shapeColor = "white";
    wall3.shapeColor = "white";
    wall4.shapeColor = "white";
    wall5.shapeColor = "white";
    wall6.shapeColor = "white";
    wall7.shapeColor = "white";
    wall8.shapeColor = "white";
    wall9.shapeColor = "white";

    paddle = createSprite(10*(windowWidth/400),250*(windowHeight/400),5*(windowWidth/400),40*(windowHeight/400));
    paddle.shapeColor = "yellow";

    spike = createSprite(50,250*(windowHeight/400),2,2);
    spike.addImage("spike_image",spikeImage);
    spike.scale = 0.3*((windowHeight + windowWidth)/800);

    camera1 = createSprite(0,0,10,10);
    camera1.addImage("camera1",camera_image);
    camera1.scale = 4 * ((windowHeight + windowWidth)/1834);

    camera2 = createSprite(225 * (windowWidth/500), 250 * (windowHeight/500), 10, 10);
    camera2.addImage("camera2", camera_image);
    camera2.scale = 4 * ((windowHeight + windowWidth)/1834);

    sword1 = createSprite(15*(windowWidth/400), 85*(windowHeight/400),10,15);
    sword1.addImage("sword1",swordImage);
    sword1.scale = 0.2*((windowHeight + windowWidth)/800);
    sword2 = createSprite(15*(windowWidth/400), 150*(windowHeight/400),10,10);
    sword2.addImage("sword2",swordImage);
    sword2.scale = 0.2*((windowHeight + windowWidth)/800);
    sword3 = createSprite(105*(windowWidth/400), 90*(windowHeight/400),10,10);
    sword3.addImage("sword3",swordImage);
    sword3.scale = 0.2*((windowHeight + windowWidth)/800);

    invisibleWall1 = createSprite(112*(windowWidth/400),160*(windowHeight/400),25*(windowWidth/400),10*(windowHeight/400));
    invisibleWall1.visible = false;
    invisibleWall2 = createSprite(175*(windowWidth/400),160*(windowHeight/400),28*(windowWidth/400),10*(windowHeight/400));
    invisibleWall2.visible = false;
    invisibleWall3 = createSprite(225*(windowWidth/400),332*(windowHeight/400),10*(windowWidth/400),33*(windowHeight/400));
    invisibleWall3.visible = false;

    laser1 = createSprite(178*(windowWidth/400),150*(windowHeight/400),80*(windowWidth/400),5*(windowHeight/400));
    laser2 = createSprite(270*(windowWidth/400),68*(windowHeight/400),80*(windowWidth/400),5*(windowHeight/400));
    laser3 = createSprite(365*(windowWidth/400),375*(windowHeight/400),80*(windowWidth/400),5*(windowHeight/400));

    laser1.addImage("laser1",laserImage);
    laser1.scale = 0.95*((windowHeight + windowWidth)/800);
    laser2.addImage("laser2",laserImage);
    laser2.scale = 0.87*((windowHeight + windowWidth)/800);
    laser3.addImage("laser3",laserImage);
    laser3.scale = 0.87*((windowHeight + windowWidth)/800);

    exit = createSprite(140*(windowWidth/400),375*(windowHeight/400),20*(windowWidth/400),20*(windowHeight/400));
    exit.addImage("exit_image",exitImage);

    computer = createSprite(350*(windowWidth/400),30*(windowHeight/400),20*(windowWidth/400),20*(windowHeight/400));
    computer.addImage("off_computer",computerOFF);
    computer.addImage("on_computer",computerON);
    computer.scale = 0.75*((windowHeight + windowWidth)/800);

    player = createSprite(25*(windowWidth/400), 15*(windowHeight/400),20*(windowWidth/400),20*(windowHeight/400));
    player.addImage("player_right",playerRight);
    player.addImage("player_left",playerLeft);
    player.addImage("player_front",playerFront);
    player.addImage("player_back",playerBack);
    player.scale = 0.15*((windowHeight + windowWidth)/800);

    wall10 = createSprite(35 * (windowWidth/500), 27 * (windowHeight/500), 10 * (windowWidth/500), 50 * (windowHeight/500));
    wall10.shapeColor = "white";
    wall11 = createSprite(120 * (windowWidth/500), 57 * (windowHeight/500), 180 * (windowWidth/500), 10 * (windowHeight/500));
    wall11.shapeColor = "white";
    wall12 = createSprite(205 * (windowWidth/500), 252 * (windowHeight/500), 10 * (windowWidth/500), 380 * (windowHeight/500));
    wall12.shapeColor = "white";
    wall13 = createSprite(52 * (windowWidth/500), 447 * (windowHeight/500), 100 * (windowWidth/500), 10 * (windowHeight/500));
    wall13.shapeColor = "white";
    wall14 = createSprite(325 * (windowWidth/500), 447 * (windowHeight/500), 250 * (windowWidth/500), 10 * (windowHeight/500));
    wall14.shapeColor = "white";
    wall15 = createSprite(445 * (windowWidth/500), 252 * (windowHeight/500), 10 * (windowWidth/500), 380 * (windowHeight/500));
    wall15.shapeColor = "white";
    wall16 = createSprite(325 * (windowWidth/500), 50 * (windowHeight/500), 180 * (windowWidth/500), 80 * (windowHeight/500));
    wall16.shapeColor = "white";
    wall17 = createSprite(460 * (windowWidth/500), 437 * (windowHeight/500), 25 * (windowWidth/500), 10 * (windowHeight/500));
    wall17.shapeColor = "white";
    wall18 = createSprite(482 * (windowWidth/500), 377 * (windowHeight/500), 30 * (windowWidth/500), 10 * (windowHeight/500));
    wall18.shapeColor = "white";
    wall19 = createSprite(460 * (windowWidth/500), 317 * (windowHeight/500), 25 * (windowWidth/500), 10 * (windowHeight/500));
    wall19.shapeColor = "white";
    wall20 = createSprite(482 * (windowWidth/500), 257 * (windowHeight/500), 30 * (windowWidth/500), 10 * (windowHeight/500));
    wall20.shapeColor = "white";
    wall21 = createSprite(460 * (windowWidth/500), 197 * (windowHeight/500), 25 * (windowWidth/500), 10 * (windowHeight/500));
    wall21.shapeColor = "white";
    wall22 = createSprite(482 * (windowWidth/500), 137 * (windowHeight/500), 30 * (windowWidth/500), 10 * (windowHeight/500));
    wall22.shapeColor = "white";

    invisibleWall4 = createSprite(80 * (windowWidth/500), 27 * (windowHeight/500), 8 * (windowWidth/500), 50 * (windowHeight/500));
    invisibleWall4.visible = false;

    calc_icon = createSprite(60 * (windowWidth/500), 27 * (windowHeight/500), 10, 10);
    calc_icon.addImage("calc",calcImage);
    calc_icon.scale = 0.5 * ((windowHeight+windowWidth)/1834);
    
    pass_icon = createSprite(100 * (windowWidth/500), 252 * (windowHeight/500), 10,10);
    pass_icon.addImage("password", pass_image);
    pass_icon.scale = 0.35 * ((windowHeight+windowWidth)/1834);

    calc_area = createSprite(100 * (windowWidth/500), 252 * (windowHeight/500), 30 * (windowWidth/500), 65 * (windowHeight/500));
    calc_area.shapeColor = "yellow";

    laser4 = createSprite(10 * (windowWidth/500), 235 * (windowHeight/500), 10 , 10);
    laser4.addImage("laser4", laserImage);
    laser4.rotation = 90;
    laser4.scale = 2.5 * ((windowHeight + windowWidth)/1834);

    laser5 = createSprite(190 * (windowWidth/500), 235 * (windowHeight/500), 10 , 10);
    laser5.addImage("laser5", laserImage);
    laser5.rotation = 90;
    laser5.scale = 2.5 * ((windowHeight + windowWidth)/1834);

    laser6 = createSprite(100 * (windowWidth/500), 190 * (windowHeight/500), 10, 10);
    laser6.addImage("laser6", laserImage);
    laser6.scale = 2.5 * ((windowHeight + windowWidth)/1834);

    laser7 = createSprite(100 * (windowWidth/500), 280 * (windowHeight/500), 10, 10);
    laser7.addImage("laser7", laserImage);
    laser7.scale = 2.5 * ((windowHeight + windowWidth)/1834);

    laser8 = createSprite(5 * (windowWidth/500), 470 * (windowHeight/500), 10, 10);
    laser8.addImage("laser8", laserImage);
    laser8.rotation = 90;
    laser8.scale = 0.4 * ((windowHeight + windowWidth)/1834);

    laser9 = createSprite(100 * (windowWidth/500), 27 * (windowHeight/500), 10, 10);
    laser9.addImage("laser9",laserImage);
    laser9.rotation = 90;
    laser9.scale = 0.6 * ((windowWidth + windowHeight)/1834);

    wallGroup = new Group();
    invisibleGroup = new Group();
    edges = new Group();
    obstacleGroup2 = new Group();

    obstacleGroup3 = new Group();
    wallGroup2 = new Group();

    //adding sprites to various groups
    wallGroup2.add(wall10);
    wallGroup2.add(wall11);
    wallGroup2.add(wall12);
    wallGroup2.add(wall13);
    wallGroup2.add(wall14);
    wallGroup2.add(wall15);
    wallGroup2.add(wall16);
    wallGroup2.add(wall17);
    wallGroup2.add(wall18);
    wallGroup2.add(wall19);
    wallGroup2.add(wall20);
    wallGroup2.add(wall21);
    wallGroup2.add(wall22);    

    wallGroup.add(wall1);
    wallGroup.add(wall2);
    wallGroup.add(wall3);
    wallGroup.add(wall4);
    wallGroup.add(wall5);
    wallGroup.add(wall6);
    wallGroup.add(wall7);
    wallGroup.add(wall8);
    wallGroup.add(wall9);

    invisibleGroup.add(invisibleWall1);
    invisibleGroup.add(invisibleWall2);
    invisibleGroup.add(invisibleWall3);

    edges.add(rightEdge);
    edges.add(leftEdge);
    edges.add(topEdge);
    edges.add(bottomEdge);

    obstacleGroup2.add(sword1);
    obstacleGroup2.add(sword2);
    obstacleGroup2.add(sword3);

    obstacleGroup2.add(laser1);
    obstacleGroup2.add(laser2);
    obstacleGroup2.add(laser3);

    obstacleGroup2.add(paddle);
    obstacleGroup2.add(spike);

    obstacleGroup3.add(laser4);
    obstacleGroup3.add(laser5);
    obstacleGroup3.add(laser6);
    obstacleGroup3.add(laser7);
    obstacleGroup3.add(laser8);
    obstacleGroup3.add(laser9);
    obstacleGroup3.add(camera1);
    obstacleGroup3.add(camera2);

    output = createSprite(250 * (windowWidth/500), 90 * (windowHeight/500), 218 * (windowWidth/500), 50 * (windowHeight/500));
    output.shapeColor = rgb(192, 192, 192);

    button_1 = createSprite(165 * (windowWidth/500), 150 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    button_2 = createSprite(221 * (windowWidth/500), 150 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    button_3 = createSprite(277 * (windowWidth/500), 150 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    enter = createSprite(333 * (windowWidth/500), 180 * (windowHeight/500), 50 * (windowWidth/500), 110 * (windowHeight/500));
    
    button_4 = createSprite(165 * (windowWidth/500), 210 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    button_5 = createSprite(221 * (windowWidth/500), 210 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    button_6 = createSprite(277 * (windowWidth/500), 210 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    button_7 = createSprite(165 * (windowWidth/500), 270 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    button_8 = createSprite(221 * (windowWidth/500), 270 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    button_9 = createSprite(277 * (windowWidth/500), 270 * (windowHeight/500), 50 * (windowWidth/500), 50 * (windowHeight/500));

    button_0 = createSprite(221 * (windowWidth/500), 330 * (windowHeight/500), 164 * (windowWidth/500), 50 * (windowHeight/500));

    clear = createSprite(333 * (windowWidth/500), 300 * (windowHeight/500), 50 * (windowWidth/500), 110 * (windowHeight/500));

    //vvariables for the calculator
    password = 11111;

    typed = "";
    char = 0;
}

function draw() {
    if (gameState === START) {
      //setting the space sprite as background
      drawSprite(space);

      space.velocityY = 0;

      noFill();
      stroke("aqua");
      strokeWeight(5);
      rect(120 * (windowWidth/500), 325 * (windowHeight/500), 75 * (windowWidth/500), 35 * (windowHeight/500));
      rect(320 * (windowWidth/500), 325 * (windowHeight/500), 75 * (windowWidth/500), 35 * (windowHeight/500));

      if (mouseX > (320 * (windowWidth/500)) && mouseX < (395 * (windowWidth/500)) &&
      mouseY > (325 * (windowHeight/500)) && mouseY < (360 * (windowHeight/500))) {
        fill(196,196,196);
        stroke("aqua");
        strokeWeight(5);
        rect(320 * (windowWidth/500), 325 * (windowHeight/500), 75 * (windowWidth/500), 35 * (windowHeight/500));
      }

      // makes the rectangle work like a button
      if (mouseIsPressed && mouseX > (320 * (windowWidth/500)) && mouseX < (395 * (windowWidth/500)) &&
        mouseY > (325 * (windowHeight/500)) && mouseY < (360 * (windowHeight/500))) {
        gameState = RULES;
      }

      if (mouseX > (120 * (windowWidth/500)) && mouseX < (195 * (windowWidth/500)) &&
      mouseY > (325 * (windowHeight/500)) && mouseY < (350 * (windowHeight/500))) {
        fill(196,196,196);
        stroke("aqua");
        strokeWeight(5);
        rect(120 * (windowWidth/500), 325 * (windowHeight/500), 75 * (windowWidth/500), 35 * (windowHeight/500));

        ship.scale = 0.15 * ((windowWidth + windowHeight)/1000);
      }

      if (mouseIsPressed && mouseX > (120 * (windowWidth/500)) && mouseX < (195 * (windowWidth/500)) &&
        mouseY > (325 * (windowHeight/500)) && mouseY < (350 * (windowHeight/500))) {
        gameState = PLAY;

        ship.changeAnimation("spaceship", shipImage);

        frameCount = 0;
        crashes = 3;
        fuelTime = 0;

        // rounding and scaling the frame to screensize
        enemyFrame = Math.round(100 * ((windowWidth + windowHeight)/1000));
        fuelFrame = Math.round(130 * ((windowWidth + windowHeight)/1000));

        fuelCollected = 0;
      }

      // scaling textSize from original(500,500) to screensize
      noStroke();
      fill("white");
      textSize(40 * ((windowWidth + windowHeight)/1000));
      text("Save the StarShip", 100 * (windowWidth/500), 250 * (windowHeight/500));

      textSize(20 * ((windowWidth + windowHeight)/1000));
      text("PLAY", 135 * (windowWidth/500), 350 * (windowHeight/500));
      text("RULES", 325 * (windowWidth/500), 350 * (windowHeight/500));

    } 
    else if (gameState === RULES) {
      drawSprite(space);

      noFill();
      stroke("lime");
      strokeWeight(3);
      //scale the rectangle to fit all screensize
      rect(140 * (windowWidth/500), 395 * (windowHeight/500), 210 * (windowWidth/500), 45 * (windowHeight/500));

      if (mouseIsPressed && mouseX > (140 * (windowWidth/500)) && mouseX < (350 * (windowWidth/500)) && mouseY > (395 * (windowHeight/500)) 
      && mouseY < (440 * (windowHeight/500))) {
        gameState = START;
      }

      if (mouseX > (140 * (windowWidth/500)) && mouseX < (350 * (windowWidth/500)) && mouseY > (395 * (windowHeight/500)) 
      && mouseY < (440 * (windowHeight/500))) {
         fill(196,196,196);
         stroke("lime");
          strokeWeight(3);
          //scale the rectangle to fit all screensize
          rect(140 * (windowWidth/500), 395 * (windowHeight/500), 210 * (windowWidth/500), 45 * (windowHeight/500)); 
      }

      noStroke();
      fill("aqua");
      textSize(40 * ((windowWidth + windowHeight)/1000));
      text("RULES", 170 * (windowWidth/500), 130 * (windowHeight/500));

      textSize(25 * ((windowWidth + windowHeight)/1000));
      text("Go Back to Start.", 150 * (windowWidth/500), 425 * (windowHeight/500));

      fill("lime");
      textSize(15 * ((windowWidth + windowHeight)/1000));

      text("-Control the position of your ship with the mouse.", 50 * (windowWidth/500), 170 * (windowHeight/500));
      text("-You have to dodge the enemy ships and asteriods in your way.", 50 * (windowWidth/500), 200 * (windowHeight/500));
      text("-If your all lives are over, you lose and the ship gets destroyed.", 50 * (windowWidth/500), 230 * (windowHeight/500));
      text("-Also, collect fuel tanks to refill your tank and set the time to 0.", 50 * (windowWidth/500), 260 * (windowHeight/500));
      text("-If you don't collect fuel within 20 seconds, the ship gets destroyed.", 50 * (windowWidth/500), 290 * (windowHeight/500));
      text("-You need to collect the fuel 10 times to pass this level.",50 * (windowWidth/500), 320 * (windowHeight/500));

      space.velocityY = 0;
    } else if (gameState === PLAY) {
      
      // movement for infinite scrolling ground
      space.velocityY = 4;

      if (space.y > windowHeight) {
        space.y = space.height/2;
      }

      //position of ship
      ship.x = World.mouseX;
      ship.y = World.mouseY;

      //timing for the fuel time
      fuelTime = Math.round(frameCount / frameRate());

      if (fuelTime > 19) {
        gameState = END;
        destroySound.play();
      }

      ship.setCollider("circle", 0, 0, 450);
      ship.debug = false;

      // functions for spawning the objects
      spawnEnemy();
      spawnFuel();

      if (obstacleGroup.isTouching(ship)) {
        crashes -= 1;

        destroySound.play();

        obstacle.destroy();
      }
      if (enemyGroup.isTouching(ship)) {
        crashes -= 1;

        destroySound.play();

        enemy.destroy();
      }
      if (fuelGroup.isTouching(ship)) {
        fuelSound.play();

        fuelCollected++;

        fuel.destroy();

        frameCount = 0;
      }

      // if the ship crashes 3 times
      if (crashes === 0) {
        gameState = END;
        
      }

      drawSprite(space);
      drawSprite(ship);
      drawSprite(enemy);
      drawSprite(fuel);
      drawSprite(obstacle);     

      //displaying the score
      fill("lime");
      textSize(20 * ((windowHeight + windowWidth)/1000));
      text("Lives:" + crashes, 400 * (windowWidth/500), 50 * (windowHeight/500));

      // conditions to change color of the text
      if (fuelTime > -1) {
        fill("lime");
        textSize(20 * ((windowHeight + windowWidth)/1000));
        text("Time without fuel:" + fuelTime, 50 * (windowWidth/500), 50 * (windowHeight/500));
      }
      if (fuelTime > 7) {
        fill("yellow");
        textSize(20 * ((windowHeight + windowWidth)/1000));
        text("Time without fuel:" + fuelTime, 50 * (windowWidth/500), 50 * (windowHeight/500));
      }
      if (fuelTime > 14) {
        fill("red");
        textSize(20 * ((windowHeight + windowWidth)/1000));
        text("Time without fuel:" + fuelTime, 50 * (windowWidth/500), 50 * (windowHeight/500));
      }
      
      if (fuelCollected === 10) {
        gameState = END;
      }

      fill("lime");
      textSize(20 * ((windowHeight + windowWidth)/1000));
      text("Fuel collected:"+fuelCollected, 250 * (windowWidth/500), 50 * (windowHeight/500));

    } else if (gameState === END) {
      if (crashes === 0 || fuelTime > 19) {
        //destroying everything
        obstacleGroup.destroyEach();
        enemyGroup.destroyEach();
        fuelGroup.destroyEach();

        //drawing space and the ship
        drawSprite(space);
        drawSprite(ship);

        space.velocityY = 0;

        noFill();
        stroke("white");
        strokeWeight(3);
        rect(190 * (windowWidth/500), 275 * (windowHeight/500), 85 * (windowWidth/500), 30 * (windowHeight/500));

        //image for destroyed ship
        ship.changeAnimation("destroy", destroyImage);      

        if (mouseIsPressed && mouseX > (190 * (windowWidth/500)) && mouseX < (275 * (windowWidth/500)) 
        && mouseY > (275 * (windowHeight/500)) && mouseY < (305 * (windowHeight/500))) {
          gameState = START;
        }

        if (mouseX > (190 * (windowWidth/500)) && mouseX < (275 * (windowWidth/500)) 
        && mouseY > (275 * (windowHeight/500)) && mouseY < (305 * (windowHeight/500))) {
          fill(192,192,192);
          stroke("white");
          strokeWeight(3);
          rect(190 * (windowWidth/500), 275 * (windowHeight/500), 85 * (windowWidth/500), 30 * (windowHeight/500));
        }

        noStroke();
        fill("lime");
        textSize(40 * ((windowHeight + windowWidth)/1000));
        text("DESTROYED!!", 125 * (windowWidth/500), 250 * (windowHeight/500));

        textSize(20 * ((windowHeight + windowWidth)/1000));
        text("Restart", 200 * (windowWidth/500), 300 * (windowHeight/500));
      }
      else if (fuelCollected === 10) {
        drawSprite(space);
        drawSprite(ship);
        
        space.velocityY = 0;

        ship.scale = 0.75;
        
        ship.x = windowWidth/2;
        ship.y = windowHeight/2;

        noFill();
        stroke("aqua");
        strokeWeight(3);
        rect(165 * (windowWidth/400), 245 * (windowHeight/400), 80 * (windowWidth/400), 40 * (windowHeight/400));

        if (mouseX > 165 * (windowWidth/400) && mouseX < 245 * (windowWidth/400) && 
            mouseY > 245 * (windowHeight/400) && mouseY < 285 * (windowHeight/400)) {
              fill(192,192,192);
              stroke("aqua");
              strokeWeight(3);
              rect(165 * (windowWidth/400), 245 * (windowHeight/400), 80 * (windowWidth/400), 40 * (windowHeight/400));
        }

        if (mouseIsPressed && mouseX > 165 * (windowWidth/400) && mouseX < 245 * (windowWidth/400) && 
            mouseY > 245 * (windowHeight/400) && mouseY < 285 * (windowHeight/400)) {
              gameState = START2;
            }

        noStroke();
        fill("lime");
        textSize(30 * ((windowHeight + windowWidth)/800));
        text("Level 1: Complete", 125 * (windowWidth/400), windowHeight/2);

        textSize(20 * ((windowWidth + windowHeight)/800));
        text("Level 2", 175 * (windowWidth/400), 275 * (windowHeight/400));
      }  
    }

   else if (gameState === START2) {
     //default image for sprite at rest
      player.changeImage("player_right",playerRight);
      
      background('white');
      
      //resets the images
      resetObjects();
  
      compState = "on";
      lives = 5;
      
      noFill();
      rect(50*(windowWidth/400),170*(windowHeight/400),300*(windowWidth/400),125*(windowHeight/400));
      rect(150*(windowWidth/400),315*(windowHeight/400),95*(windowWidth/400),45*(windowHeight/400));
      
      textFont("berlin sans fb");
      textSize(12*((windowHeight + windowWidth)/800));
      fill("green");
      text("-You have 5 lives in total.",53*(windowWidth/400),185*(windowHeight/400));
      text("-Your Goal is to reach the Weapons computer",53*(windowWidth/400),200*(windowHeight/400));
      text("and switch it OFF (you must be inside the yellow area!).",53*(windowWidth/400),215*(windowHeight/400));
      text("-Once it is OFF, reach the Exit.",53*(windowWidth/400),230*(windowHeight/400));
      text("-If you touch any obstacle, you lose a life,",53*(windowWidth/400),245*(windowHeight/400));
      text("you go to start again and if the computer is OFF,",53*(windowWidth/400),260*(windowHeight/400));
      text("then it will turn ON again.",53*(windowWidth/400),275*(windowHeight/400));
      text("-Click on the computer to switch it OFF.",53*(windowWidth/400),290*(windowHeight/400));
      
      //creating hovering effect
      if (mouseX > 150*(windowWidth/400) && mouseX < 245*(windowWidth/400) && 
          mouseY > 315*(windowHeight/400) && mouseY < 360*(windowHeight/400)) {
            fill(196,196,196);
            rect(150*(windowWidth/400),315*(windowHeight/400),95*(windowWidth/400),45*(windowHeight/400));
      }
      
      textFont("algerian");
      textSize(25*((windowHeight + windowWidth)/800));
      fill("red");
      text("Level 2",175*(windowWidth/400),150*(windowHeight/400));
      text("START",160*(windowWidth/400),345*(windowHeight/400));
      
      //if mouse is clicked on rectangle
      if (mouseIsPressed && mouseX > 150*(windowWidth/400) && mouseX < 245*(windowWidth/400) && 
          mouseY > 315*(windowHeight/400) && mouseY < 360*(windowHeight/400)) {
        gameState = PLAY2;
        
        sword1.velocityX = 2;
        sword2.velocityX = 2;
        sword3.velocityX = -2;
        
        spike.setVelocity(3,3);
        
        laser1.velocityY = -1;
        
        laser2.setVelocity(0.76*(windowHeight/400),3);
        laser3.setVelocity(-0.76*(windowHeight/400),-3);
        
        player.setVelocity(0,0);
      }
    }
    
    if (gameState === PLAY2) {
      background("black");
    
      bouncingObjects();
      
      // the paddle's y position will follow the spike's y position
      paddle.y = spike.y;
      
      //ading controls to the player
      if (keyDown("up") || keyDown("w")) {
        player.changeImage("player_back",playerBack);
        player.setVelocity(0, -3);
      }
      if (keyDown("left") || keyDown("a")) {
        player.changeImage("player_left",playerLeft);
        player.setVelocity(-3, 0);
      }
      if (keyDown("right") || keyDown("d")) {
        player.changeImage("player_right",playerRight);
        player.setVelocity(3, 0);  
      }
      if (keyDown("down") || keyDown("s")) {
        player.changeImage("player_front",playerFront);
        player.setVelocity(0, 3);
      }
      if (keyWentUp("up") || keyWentUp("down") || keyWentUp("right") || keyWentUp("left")
      || keyWentUp("w") ||  keyWentUp("a") || keyWentUp("s") || keyWentUp("d")) {
        player.changeImage("player_right",playerRight);
        player.setVelocity(0, 0);
      }
  
      if (mousePressedOver(computer) && player.x > (computerRange.x - (computerRange.width/2)) && player.x < windowWidth &&
      player.y > 0 && player.y < (computerRange.y + (computerRange.height/2))) {
            compState = "off"; 
            keyboard.play();  
      }
      
      //adding controls to the computer
      if (compState === "off") {
        computer.changeImage("off_computer",computerOFF);
      }
    
      if (compState === "on") {
        computer.changeImage("on_computer",computerON);
      }
      
      //if the player touches the exit in different computer states
      if (player.collide(exit) && compState === "off") {
        gameState = END2;
      }

      if (player.collide(exit) && compState === "on") {
        gameState = END2;
        defeat.play();
      }
      
      // if the lives become 0
      if (lives == 0) {
        gameState = END2;
        defeat.play();
      }
      
      //player loses lives if it touches any obstacles
      if (obstacleGroup2.isTouching(player) || edges.isTouching(player) || wallGroup.isTouching(player)) {
            lives -= 1;
            
            player.x = 25*(windowWidth/400);
            player.y = 18*(windowHeight/400);
            
            compState = "on";

            alarm.play();
      }
      
      //drawing the required sprites
      drawSprite(wall1);
      drawSprite(wall2);
      drawSprite(wall3);
      drawSprite(wall4);
      drawSprite(wall5);
      drawSprite(wall6);
      drawSprite(wall7);
      drawSprite(wall8);
      drawSprite(wall9);

      drawSprite(sword1);
      drawSprite(sword2);
      drawSprite(sword3);

      drawSprite(paddle);
      drawSprite(spike);

      drawSprite(laser1);
      drawSprite(laser2);
      drawSprite(laser3);

      drawSprite(computerRange);
      drawSprite(computer);

      drawSprite(player);
      drawSprite(exit);

      drawSprite(invisibleWall1);
      drawSprite(invisibleWall2);
      drawSprite(invisibleWall3);

      drawSprite(leftEdge);
      drawSprite(rightEdge);
      drawSprite(topEdge);
      drawSprite(bottomEdge);
      
      textSize(12 * ((windowHeight + windowWidth)/800));
      fill('cyan');
      text("Lives Left: "+lives,20 * (windowWidth/400),380*(windowHeight/400));
   }
   
   if (gameState === END2) {
     
     // if the lives are zero are the computer remains ON when touched exit
     if (lives == 0 || compState === "on") {
       
       background("red");
       
       textFont("verdana");
  
       noFill();
       rect(140 * (windowWidth/400), 215 * (windowHeight/400), 135 * (windowWidth/400), 50 * (windowHeight/400));
       
       //hovering effects
       if (mouseX > 140 * (windowWidth/400) && mouseX < 275 * (windowWidth/400)
           && mouseY > 215 * (windowHeight/400) && mouseY < 265 * (windowHeight/400)) {
              resetObjects();
              fill("maroon");
              rect(140 * (windowWidth/400), 215 * (windowHeight/400), 135 * (windowWidth/400), 50 * (windowHeight/400));
      }
  
      fill("yellow");
      textSize(30 * ((windowHeight + windowWidth)/800));
      text("You Lose!!",125 * (windowWidth/400),110 * (windowHeight/400));
  
      textSize(25 * ((windowWidth + windowHeight)/800));
      text("RESTART", 150 * (windowWidth/400),250 * (windowHeight/400));

      //if the mouse touches the button
      if (mouseIsPressed && mouseX > 140 * (windowWidth/400) && mouseX < 275 * (windowWidth/400)
           && mouseY > 215 * (windowHeight/400) && mouseY < 265 * (windowHeight/400)) {
              resetObjects();
              gameState = START;
      }
     }

     //if the computer state is OFF
     if (compState === "off") {
       gameState = START3;
     }
   }
   if (gameState === START3) {
    background("black");

    noFill();
    stroke("white");

    rect(150 * (windowWidth/500), 350 * (windowHeight/500), 150 * (windowWidth/500), 60 * (windowHeight/500));

    //hovering effects
    if (mouseX > (150 * (windowWidth/500)) && mouseX < (300 * (windowWidth/500)) && mouseY > 350 * (windowHeight/500)
        && mouseY < 410 * (windowHeight/500)) {
        fill(192,192,192);
        rect(150 * (windowWidth/500), 350 * (windowHeight/500), 150 * (windowWidth/500), 60 * (windowHeight/500));
    }

    //game state to PLAY3 if button is pressed
    if (mouseIsPressed && mouseX > (150 * (windowWidth/500)) && mouseX < (300 * (windowWidth/500)) && mouseY > 350 * (windowHeight/500)
        && mouseY < 410 * (windowHeight/500)) {
          gameState = PLAY3;
          
          //settings positions and velocities of sprites
          player.x = 10 * (windowWidth/500);
          player.y = 20 * (windowHeight/500);

          lives = 5;

          laser4.x = 10 * (windowWidth/500);
          laser4.y = 235 * (windowHeight/500);

          laser5.x = 190 * (windowWidth/500);
          laser5.y = 235 * (windowHeight/500);

          laser6.x = 100 * (windowWidth/500);
          laser6.y = 207 * (windowHeight/500);

          laser7.x = 100 * (windowWidth/500);
          laser7.y = 280 * (windowHeight/500);

          laser8.x = 5 * (windowWidth/500);
          laser8.y = 470 * (windowHeight/500);

          laser9.x = 100 * (windowWidth/500);
          laser9.y = 27 * (windowHeight/500);

          laser4.velocityX = 1;
          laser5.velocityX = -1;

          laser6.velocityY = 1;
          laser7.velocityY = -1;

          camera1.x = 300 * (windowWidth/500);
          camera1.y = 250 * (windowHeight/500);
          camera1.scale = 4 * ((windowHeight + windowWidth)/1834);

          camera2.x = 295 * (windowWidth/500);
          camera2.y = 240 * (windowHeight/500);
          camera2.scale = 5 * ((windowHeight + windowWidth)/1834);

          laser8.velocityX = 2.5;

          laser9.velocityX = 2;

          //rotation speeds for cameras
          camera1.rotation = 180;
          camera1.rotationSpeed = -2;

          camera2.rotationSpeed = -2;
      
    }

    noStroke();
    fill("aqua");
    textSize(40 * ((windowHeight + windowWidth)/1000));
    text("PLOT TWIST", 125 * (windowWidth/500),100 * (windowHeight/500));
    text("Level 3", 165 * (windowWidth/500), 400 * (windowHeight/500));

    fill("white");
    textSize(20 * ((windowHeight + windowWidth)/1000));
    text("-You need a password to unlock the door.", 50 * (windowWidth/500), 200 * (windowHeight/500));
    text("-In this level, you have to get the password and ",50 * (windowWidth/500), 240 * (windowHeight/500));
    text("enter it to unlock the door and win.", 50 * (windowWidth/500),280 * (windowHeight/500));
    text("-Click on the calculator and password icons to use them.", 50 * (windowWidth/500), 320 * (windowHeight/500));
   }
   else if(gameState === PLAY3) {
      background("black");

      fill("yellow");
      rect(40 * (windowWidth/500),3 * (windowHeight/500), 40 * (windowWidth/500), 50 * (windowHeight/500));

      //drawing the required sprites
      drawSprite(calc_area);

      drawSprite(camera1);
      drawSprite(camera2);

      drawSprite(player);
      drawSprite(leftEdge);
      drawSprite(rightEdge);
      drawSprite(topEdge);
      drawSprite(bottomEdge);

      drawSprite(wall10);
      drawSprite(wall11);
      drawSprite(wall12);
      drawSprite(wall13);
      drawSprite(wall14);
      drawSprite(wall15);
      drawSprite(wall16);
      drawSprite(wall17);
      drawSprite(wall18);
      drawSprite(wall19);
      drawSprite(wall20);
      drawSprite(wall21);
      drawSprite(wall22);
      
      //controls to the animations
      if (camera1.rotation > 225){
        camera1.rotationSpeed = -2;
      }
      if(camera1.rotation < 135) {
        camera1.rotationSpeed = 2;
      }

      if (camera2.rotation > 45) {
        camera2.rotationSpeed = -2;
      }
      if (camera2.rotation < -45){
        camera2.rotationSpeed = 2;
      }

      drawSprite(calc_icon);
      drawSprite(pass_icon);

      drawSprite(invisibleWall4);

      drawSprite(laser4);
      drawSprite(laser5);
      drawSprite(laser6);
      drawSprite(laser7);
      drawSprite(laser8);
      drawSprite(laser9);

      //bounce off funtions
      camera1.bounceOff(wallGroup);

      laser4.bounceOff(calc_area);
      laser4.bounceOff(edges);
      laser4.bounceOff(wallGroup2);

      laser5.bounceOff(calc_area);
      laser5.bounceOff(wallGroup2);

      laser6.bounceOff(wallGroup2);
      laser6.bounceOff(calc_area);

      laser7.bounceOff(calc_area);
      laser7.bounceOff(wallGroup2);

      laser8.bounceOff(edges);

      laser9.bounceOff(invisibleWall4);
      laser9.bounceOff(wallGroup2);

      //controls for sprites
      if (keyDown("up") || keyDown("w")) {
        player.changeImage("player_back",playerBack);
        player.setVelocity(0, -3);
      }
      if (keyDown("left") || keyDown("a")) {
        player.changeImage("player_left",playerLeft);
        player.setVelocity(-3, 0);
      }
      if (keyDown("right") || keyDown("d")) {
        player.changeImage("player_right",playerRight);
        player.setVelocity(3, 0);  
      }
      if (keyDown("down") || keyDown("s")) {
        player.changeImage("player_front",playerFront);
        player.setVelocity(0, 3);
      }
      if (keyWentUp("up") || keyWentUp("down") || keyWentUp("right") || keyWentUp("left")
      || keyWentUp("w") ||  keyWentUp("a") || keyWentUp("s") || keyWentUp("d")) {
        player.changeImage("player_right",playerRight);
        player.setVelocity(0, 0);
      }

      //if players touch the obstacles
      if (player.isTouching(edges) || player.isTouching(wallGroup2) || player.isTouching(obstacleGroup3)) {
        lives -= 1;

        player.x = 10 * (windowWidth/500);
        player.y = 20 * (windowHeight/500);

        alarm.play();
      }

      //if the mouse touches the icons
      if (mousePressedOver(calc_icon) && player.x > (40 * (windowWidth/500)) && player.x < (80 * (windowWidth/500))
          && player.y > (3 * (windowHeight/500)) && player.y < (53 * (windowHeight/500))) {
        gameState = CALC;
      }

      if (mousePressedOver(pass_icon) && player.x > (85 * (windowWidth/500)) && player.x < (115 * (windowWidth/500))
          && player.y > (205 * (windowHeight/500)) && player.y < (270 * (windowHeight/500))) {
        gameState = PASS;
      }

      fill("aqua");
      textSize(10 * ((windowHeight + windowWidth)/500));
      text("Lives: " + lives, 430 * (windowWidth/500), 35 * (windowHeight/500));

      if (lives === 0) {
        gameState = END3;

        defeat.play();
      }
   }
   if (gameState === PASS) {

      camera1.bounceOff(wallGroup);

      laser4.bounceOff(calc_area);
      laser4.bounceOff(edges);
      laser4.bounceOff(wallGroup2);

      laser5.bounceOff(calc_area);
      laser5.bounceOff(wallGroup2);

      laser6.bounceOff(wallGroup2);
      laser6.bounceOff(calc_area);

      laser7.bounceOff(calc_area);
      laser7.bounceOff(wallGroup2);

      laser8.bounceOff(edges);

      laser9.bounceOff(invisibleWall4);
      laser9.bounceOff(wallGroup2);

     background("black");

     drawSprite(pass_icon);

     //changing the scale and position of the same sprite     
     pass_icon.scale = 5 * ((windowHeight+windowWidth)/1834);;

     pass_icon.x = windowWidth/2;
     pass_icon.y = windowHeight/2;

     stroke("grey");
     noFill();
     rect(200 * (windowWidth/500), 420 * (windowHeight/500), 90 * (windowWidth/500), 50 * (windowHeight/500));
     
     if (mouseX > (200 * (windowWidth/500)) && mouseX < (290 * (windowWidth/500)) && mouseY > (420 * (windowHeight/500))
         && mouseY < (470 * (windowHeight/500))) {
          stroke("grey");
          fill(192,192,192);
          rect(200 * (windowWidth/500), 420 * (windowHeight/500), 90 * (windowWidth/500), 50 * (windowHeight/500));
    } 

    if (mouseIsPressed && mouseX > (200 * (windowWidth/500)) && mouseX < (290 * (windowWidth/500)) && mouseY > (420 * (windowHeight/500))
         && mouseY < (470 * (windowHeight/500))) {
          gameState = PLAY3;

          pass_icon.x = 100 * (windowWidth/500);
          pass_icon.y = 253 * (windowHeight/500);
          pass_icon.scale = 0.35 * ((windowHeight+windowWidth)/1834);
          
    } 

     fill("black");
     textSize(30 * ((windowHeight + windowWidth)/1000));
     text(password, 220 * (windowWidth/500), 275 * (windowHeight/500));

     fill("cyan");
     text("Return", 210 * (windowWidth/500), 460 * (windowHeight/500));
   }
   if (gameState === CALC) {
    background("black");


    //drawing the calculator
    drawSprite(output);

    drawSprite(button_1);
    drawSprite(button_2);
    drawSprite(button_3);
    drawSprite(button_4);
    drawSprite(button_5);
    drawSprite(button_6);
    drawSprite(button_7);
    drawSprite(button_8);
    drawSprite(button_9);
    drawSprite(button_0);

    drawSprite(enter);
    drawSprite(clear);

    button_1.shapeColor = "grey";
    button_2.shapeColor = "grey";
    button_3.shapeColor = "grey";
    button_4.shapeColor = "grey";
    button_5.shapeColor = "grey";
    button_6.shapeColor = "grey";
    button_7.shapeColor = "grey";
    button_8.shapeColor = "grey";
    button_9.shapeColor = "grey";
    button_0.shapeColor = "grey";

    enter.shapeColor = "grey";
    clear.shapeColor = "grey";

    if (mouseIsOver(button_1)) {
        button_1.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(button_2)) {
        button_2.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(button_3)) {
        button_3.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(button_4)) {
        button_4.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(button_5)) {
        button_5.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(button_6)) {
        button_6.shapeColor = rgb(192, 192, 192);
    } 

    if (mouseIsOver(button_7)) {
        button_7.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(button_8)) {
        button_8.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(button_9)) {
        button_9.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(button_0)) {
        button_0.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(clear)) {
        clear.shapeColor = rgb(192, 192, 192);
    }

    if (mouseIsOver(enter)) {
        enter.shapeColor = rgb(192, 192, 192);
    }

    textSize(30 * ((windowHeight + windowWidth)/1000));
    fill("white");

    text("1", 155 * (windowWidth/500), 160 * (windowHeight/500));
    text("2", 213 * (windowWidth/500), 160 * (windowHeight/500));
    text("3", 270 * (windowWidth/500), 160 * (windowHeight/500));
    text("4", 157 * (windowWidth/500), 220 * (windowHeight/500));
    text("5", 213 * (windowWidth/500), 220 * (windowHeight/500));
    text("6", 267 * (windowWidth/500), 220 * (windowHeight/500));
    text("7", 158 * (windowWidth/500), 280 * (windowHeight/500));
    text("8", 213 * (windowWidth/500), 280 * (windowHeight/500));
    text("9", 268 * (windowWidth/500), 280 * (windowHeight/500));
    text("0", 213 * (windowWidth/500), 340 * (windowHeight/500));

    text(typed, 210 * (windowWidth/500), 100 * (windowHeight/500))

    textSize(14 * ((windowHeight + windowWidth)/1000));
    text("ENTER", 315 * (windowWidth/500), 185 * (windowHeight/500));
    text("CLEAR", 315 * (windowWidth/500), 305 * (windowHeight/500));


    //when clear is pressed
    if (mousePressedOver(clear)) {
        typed = "";
        char = 0;
    }

    //entering the numbers when button is clicked 
    if (char < 5) {
        if (mousePressedOver(button_0)) {
            typed += "0";
            char++;
        }

        if (mousePressedOver(button_1)) {
            typed += "1";
            char++;
        }

        if (mousePressedOver(button_2)) {
            typed += "2";
            char++;
        }

        if (mousePressedOver(button_3)) {
            typed += "3";
            char++;
        }

        if (mousePressedOver(button_4)) {
            typed += "4";
            char++;
        }

        if (mousePressedOver(button_5)) {
            typed += "5";
            char++;
        }
        
        if (mousePressedOver(button_6)) {
            typed += "6";
            char++;
        }

        if (mousePressedOver(button_7)) {
            typed += "7";
            char++;
        }

        if (mousePressedOver(button_8)) {
            typed += "8";
            char++;
        }

        if (mousePressedOver(button_9)) {
            typed += "9";
            char++;
        }
    }
    
    if (mousePressedOver(enter) && char === 5) {
        textSize(30 * ((windowHeight + windowWidth)/1000));
        parseInt(typed);//converting the string to number when enter is pressed
        if (typed != password) {
            //if the password is not the same as the typed number
            typed = "";
            char = 0;
        }
        else {
            gameState = WIN3;
            victory.play();
        }
    }
   }
   else if(gameState === END3) {
     if (lives === 0) {
      background("red");
       
      textFont("verdana");
 
      noFill();
      rect(140 * (windowWidth/400), 215 * (windowHeight/400), 135 * (windowWidth/400), 50 * (windowHeight/400));
 
      if (mouseX > 140 * (windowWidth/400) && mouseX < 275 * (windowWidth/400)
          && mouseY > 215 * (windowHeight/400) && mouseY < 265 * (windowHeight/400)) {
             resetObjects();
             fill("maroon");
             rect(140 * (windowWidth/400), 215 * (windowHeight/400), 135 * (windowWidth/400), 50 * (windowHeight/400));
     }
 
     fill("yellow");
     textSize(30 * ((windowHeight + windowWidth)/800));
     text("You Lose!!",125 * (windowWidth/400),110 * (windowHeight/400));
 
     textSize(25 * ((windowWidth + windowHeight)/800));
     text("RESTART", 150 * (windowWidth/400),250 * (windowHeight/400));

     if (mouseIsPressed && mouseX > 140 * (windowWidth/400) && mouseX < 275 * (windowWidth/400)
          && mouseY > 215 * (windowHeight/400) && mouseY < 265 * (windowHeight/400)) {
             resetObjects();
             gameState = START;
     }
    }
     
   }
   if (gameState === WIN3) {
    background("green");

    noFill();
    rect(190 * (windowWidth/500), 260 * (windowHeight/500), 100 * (windowWidth/500), 50 * (windowHeight/500));

    if (mouseX > (190 * (windowWidth/500)) && mouseX < (290 * (windowWidth/500)) && mouseY > (260 * (windowHeight/500)) 
        && mouseY < (310 * (windowHeight/500))) {
          fill("lime");
          rect(190 * (windowWidth/500), 260 * (windowHeight/500), 100 * (windowWidth/500), 50 * (windowHeight/500));
    }

    if (mouseIsPressed && mouseX > (190 * (windowWidth/500)) && mouseX < (290 * (windowWidth/500)) && mouseY > (260 * (windowHeight/500)) 
        && mouseY < (310 * (windowHeight/500))) {
          gameState = START;
    }

    fill("yellow");
    textSize(40 * ((windowHeight + windowWidth)/1000));

    text("YOU WON !!!", 160 * (windowWidth/500), 200 * (windowHeight/500));

    textSize(30 * ((windowHeight + windowWidth)/1000));
    text("Restart", 200 * (windowWidth/500), 300 * (windowHeight/500));
   }
} 
   

function spawnEnemy() {
  if (frameCount % enemyFrame === 0) {
    // random variables to randomly selectimage and spawing position
    randPos = Math.round(random(1, 4));
    rand = Math.round(random(1, 2));

    obstacleVelocityP = random(3,6);
    obstacleVelocityN = random(-3,-6);

    if (randPos === 1) {
      switch (rand) {
        case 1:
          // random place to spawn between start to end i.e. windowWidth
          enemy = createSprite(random(0, windowWidth), 0, 20, 20)
          enemy.addImage("ship", enemyImage);
          enemy.velocityY = 4;
          enemy.scale = 0.2 * ((windowWidth + windowHeight)/1000);
          ship.depth = enemy.depth;
          ship.depth++;
          enemy.setCollider("circle", 0, 0, 250);
          enemy.lifetime = windowHeight/4;
          enemy.debug = false;
          enemyGroup.add(enemy);
          break;
        case 2:
          obstacle = createSprite(random(0, windowWidth), 0, 20, 20);
          obstacle.addImage("asteroid", asteroidImage);
          obstacle.velocityY = obstacleVelocityP;
          obstacle.scale = 0.1 * ((windowWidth + windowHeight)/1000);
          //ship overlaps all objects
          ship.depth = obstacle.depth;
          ship.depth++;
          obstacle.debug = false;
          // lifetime based on window size divided by object's velocity 
          obstacle.lifetime = windowHeight/obstacleVelocityP;
          //adding sprites to group
          obstacleGroup.add(obstacle);
          break;
        default:
          break;
      }
    } else if (randPos === 2) {
      switch (rand) {
        case 1:
          enemy = createSprite(random(0, windowWidth), 0, 20, 20)
          enemy.addImage("ship", enemyImage);
          enemy.velocityY = 4;
          // scale object from original screen size to fit all screen sizes
          enemy.scale = 0.2 * ((windowWidth + windowHeight)/1000);
          ship.depth = enemy.depth;
          ship.depth++;
          enemy.setCollider("circle", 0, 0, 250);
          enemy.lifetime = windowHeight/4;
          enemy.debug = false;
          enemyGroup.add(enemy);
          break;
        case 2:
          obstacle = createSprite(random(0, windowWidth), windowHeight, 20, 20);
          obstacle.addImage("asteroid", asteroidImage);
          obstacle.velocityY = obstacleVelocityN;
          obstacle.scale = 0.1 * ((windowWidth + windowHeight)/1000);
          ship.depth = obstacle.depth;
          ship.depth++;
          obstacle.debug = false;
          obstacle.lifetime = windowHeight/obstacleVelocityP;
          obstacleGroup.add(obstacle);
          break;
        default:
          break;
      }
    } else if (randPos === 3) {
      switch (rand) {
        case 1:
          enemy = createSprite(random(0, windowWidth), 0, 20, 20)
          enemy.addImage("ship", enemyImage);
          enemy.velocityY = 4;
          enemy.scale = 0.2 * ((windowWidth + windowHeight)/1000);
          ship.depth = enemy.depth;
          ship.depth++;
          enemy.setCollider("circle", 0, 0, 250);
          enemy.debug = false;
          enemy.lifetime = windowHeight/4;
          enemyGroup.add(enemy);
          break;
        case 2:
          obstacle = createSprite(0, random(0, windowHeight), 20, 20);
          obstacle.addImage("asteroid", asteroidImage);
          obstacle.velocityX = obstacleVelocityP;
          obstacle.scale = 0.1 * ((windowWidth + windowHeight)/1000);
          ship.depth = obstacle.depth;
          obstacle.debug = false;
          ship.depth++;
          obstacle.lifetime = windowWidth/obstacleVelocityP;
          obstacleGroup.add(obstacle);
          break;
        default:
          break;
      }
    } else if (randPos === 4) {
      switch (rand) {
        case 1:
          enemy = createSprite(random(0, windowWidth), 0, 20, 20)
          enemy.addImage("ship", enemyImage);
          enemy.velocityY = 4;
          enemy.scale = 0.2 * ((windowWidth + windowHeight)/1000);
          ship.depth = enemy.depth;
          ship.depth++;
          enemy.debug = false;
          enemy.setCollider("circle", 0, 0, 250);
          enemy.lifetime = windowHeight/4;
          enemyGroup.add(enemy);
          break;
        case 2:
          obstacle = createSprite(windowWidth, random(0, windowHeight), 20, 20);
          obstacle.addImage("asteroid", asteroidImage);
          obstacle.velocityX = obstacleVelocityN;
          obstacle.scale = 0.1 * ((windowWidth + windowHeight)/1000);
          ship.depth = obstacle.depth;
          ship.depth++;
          obstacle.debug = false;
          obstacle.lifetime = windowWidth/obstacleVelocityP;
          obstacleGroup.add(obstacle);
          break;
        default:
          break;
      }
    }
  }
}

function spawnFuel() {
  if (frameCount % fuelFrame === 0) {
    randPos = Math.round(random(1, 4));
    switch (randPos) {
      case 1:
        fuel = createSprite(random(0, windowWidth), 0, 20, 20);
        fuel.addImage("fuelTank", fuelImage);
        fuel.velocityY = 5;
        fuel.scale = 0.03 * ((windowWidth + windowHeight)/1000);
        fuel.debug = false;
        fuel.lifetime = windowHeight/5;
        break;
      case 2:
        fuel = createSprite(random(0, windowWidth), windowHeight, 20, 20);
        fuel.addImage("fuelTank", fuelImage);
        fuel.lifetime = windowHeight/5;
        fuel.velocityY = -5;
        fuel.debug = false;
        fuel.scale = 0.03 * ((windowWidth + windowHeight)/1000);
        break;
      case 3:
        fuel = createSprite(windowWidth, (random(0, windowHeight)), 20, 20);
        fuel.addImage("fuelTank", fuelImage);
        fuel.lifetime = windowWidth/5;
        fuel.velocityX = -5;
        fuel.debug = false;
        fuel.scale = 0.03 * ((windowWidth + windowHeight)/1000);
        break;
      case 4:
        fuel = createSprite(0, (random(0, windowHeight)), 20, 20);
        fuel.addImage("fuelTank", fuelImage);
        fuel.lifetime = windowWidth/5;
        fuel.velocityX = 5;
        fuel.debug = false;
        fuel.scale = 0.03 * ((windowWidth + windowHeight)/1000);
        break;
      default:
        break;
    }
    fuelGroup.add(fuel);
  }
}

function resetObjects() {
  //resetting the objects in PLAY2 game state
  player.x = 25*(windowWidth/400);
  player.y = 18*(windowHeight/400)

  spike.x = 50*(windowWidth/400);
  spike.y = 250*(windowHeight/400);
  
  paddle.x = 10*(windowWidth/400);
  paddle.y = 250*(windowHeight/400);
  
  sword1.x = 15*(windowWidth/400);
  sword1.y = 60*(windowHeight/400);
  
  sword2.x = 15*(windowWidth/400);
  sword2.y = 140*(windowHeight/400);
  
  sword3.x = 105*(windowWidth/400);
  sword3.y = 100*(windowHeight/400);
  
  laser1.x = 178*(windowWidth/400);
  laser1.y = 150*(windowHeight/400);
  
  laser2.x = 270*(windowWidth/400);
  laser2.y = 68*(windowHeight/400);
  
  laser3.x = 365*(windowWidth/400);
  laser3.y = 375*(windowHeight/400);
}

function bouncingObjects () {
  //bounce off functions
  sword1.bounceOff(edges);
  sword2.bounceOff(edges);
  sword3.bounceOff(edges);
  
  sword1.bounceOff(wallGroup);
  sword2.bounceOff(wallGroup);
  sword3.bounceOff(wallGroup);
  
  spike.bounceOff(paddle);
  spike.bounceOff(wallGroup);
  spike.bounceOff(invisibleGroup);
  
  laser1.bounceOff(edges);
  laser1.bounceOff(wall4);
  laser1.bounceOff(wall5);
  
  laser2.bounceOff(edges);
  laser2.bounceOff(wallGroup);
  laser2.bounceOff(invisibleGroup);

  laser3.bounceOff(edges);
  laser3.bounceOff(wallGroup);
  laser3.bounceOff(invisibleGroup);
}
