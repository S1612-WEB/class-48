var teacher, teacherImg

var gamestate = 0

function preload() {
    backgroundImage = loadImage("classroom.jpg");
    playerImg = loadAnimation("player1.png", "player2.png");
    teacherImg = loadImage("teacher.png");
    momImg = loadImage("mom.png");
    dadImg = loadImage("dad.png");

    aplusImg = loadImage("aplus.jpeg");
    ps4Img = loadImage("ps4.png");
    smartPhoneImg = loadImage("smartphone.png");
    footballImg = loadImage("FOOTBALL.png");

    endImg = loadImage("scolding.gif");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = createSprite(130, height - 160)
    player.addAnimation("run", playerImg)
    player.scale = 0.6
    player.frameDelay = 10
    player.loop = false

    ground = createSprite(width / 2, height + 25, width, 20)
    ground.visible = false

    treatsGroup = createGroup()
    aplusGroup = createGroup()
    foeGroup = createGroup()

   // endGif = createSprite(width/2 , height/2)
    //endGif.addAnimation("end" , endImg)
    //endGif.visible = false
}

function draw() {
    background(backgroundImage);

//---------------------------------------------------------------

    createFoes()

    createTreats()

//---------------------------------------------------------------

    if (keyDown("up")) {
        player.velocityY = -10
    }

    player.velocityY += 1

    player.collide(ground)

//---------------------------------------------------------------

    if (treatsGroup.isTouching(player)) {
        for (var i = 0; i < treatsGroup.length; i++) {

            if (treatsGroup[i].isTouching(player)) {
                treatsGroup[i].destroy()
                //player.destroyEach()

            }

        }
    }

//---------------------------------------------------------------

    if (aplusGroup.isTouching(foeGroup)) {
        for (var i = 0; i < foeGroup.length; i++) {

            if (aplusGroup[i].isTouching(foeGroup)) {
                aplusGroup[i].destroy()
                foeGroup[i].destroy()
            }

        }
    }

//------------------------------------------------------------------------
    
    if (foeGroup.isTouching(player)) {
        for (var i = 0; i < foeGroup.length; i++) {
            if (foeGroup[i].isTouching(player)) {
                gamestate=1
            }

        }
    }

//---------------------------------------------------------------

    if(gamestate == 1){
        aplusGroup.destroyEach()
        foeGroup.destroyEach()
        player.destroy()
        treatsGroup.destroyEach()

        //endGif.visible = true
        //endGif.scale = 2

        background(endImg);

    }

//---------------------------------------------------------------
    
    

    drawSprites()
}

//---------------------------------------------------------------

function keyReleased() {
    if (keyCode == 32) {
        aplus = createSprite(player.x + 120, player.y)
        aplus.addImage(aplusImg)
        aplus.velocityX = 7
        aplus.scale = 0.2
        aplusGroup.add(aplus)
    }
}

//---------------------------------------------------------------

function createFoes() {
    if (frameCount % 120 == 0) {
        foe = createSprite(width + 50, height - 220)
        n = round(random(1, 3))
        if (n == 1) {
            foe.addImage(teacherImg)
        }
        else if (n == 2) {
            foe.addImage(momImg)
            foe.scale = 1.4
        }
        else {
            foe.addImage(dadImg)
            foe.scale = 1.6
        }

        foe.velocityX = -5
        foeGroup.add(foe)

    }
}

//---------------------------------------------------------------

function createTreats() {
    if (frameCount % 100 == 0) {
        //treats = createSprite( round(random(50 , width-50)) , 20)
        treats = createSprite(round(random(50, 200)), 20)

        n = round(random(1, 3))

        if (n == 1) {
            treats.addImage(ps4Img)

        }
        else if (n == 2) {
            treats.addImage(smartPhoneImg)

        }
        else {
            treats.addImage(footballImg)
        }

        treats.velocityY = 5
        treats.scale = 0.24
        treatsGroup.add(treats)
    }
}