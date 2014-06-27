var canvas,
    ctx,
    width = 600,
    height = 600,
    ship_x = (width / 2) - 25,
    ship_y = height - 75,
    ship_w = 50,
    ship_h = 50,
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    ship,
    enemy,
    score = 0,
    lives = 3,
    alive = true,
    starfield,
    starX = 0,
    starY = 0,
    starY2 = -600,
    gameStarted = false;

function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
}

function keyDown(e){
    
    //determine left/right button press
    if(e.keyCode == 39) rightKey = true;
    else if(e.keyCode == 37) leftKey = true;

    //determine up/down button press
    if(e.keyCode == 38) upKey = true;
    else if(e.keyCode == 40) downKey = true;

    //if 'x' is pressed and they dont have too many lasers fired, add one to []
    if(e.keyCode == 88 && lasers.length <= laserTotal){
        lasers.push( [ship_x + 25, ship_y - 20, 4, 20] );
    }
}

function keyUp(e){
    if(e.keyCode == 39) rightKey = false;
    else if(e.keyCode == 37) leftKey = false;

    if(e.keyCode == 38) upKey = false;
    else if(e.keyCode == 40) downKey = false;
}

//move player and enemies back to original positions
function reset(){
    //define local scoped vars
    var enemy_reset_x = 50;

    ship_x = (width/2) - 25,
    ship_y = height - 75,
    ship_w = 50,
    ship_h = 57;

    //loop through enemies and reposition in a nice, neat line
    for(var i=0; i < enemies.length; i++){
        enemies[i][0] = enemy_reset_x;
        enemies[i][1] = -45;
        enemy_reset_x = enemy_reset_x + enemy_w + 60;
    }
}

//display score on the canvas
function scoreTotal(){
    ctx.font = 'bold 18px VT323';
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: ", 10, 55);
    ctx.fillText(score, 70, 55);

    ctx.fillText("Lives: ", 10, 30);
    ctx.fillText(lives, 68, 30);
    
    if(!alive){
        ctx.fillText("Game Over!", 245, height / 2);
        ctx.fillRect( (width / 2) - 70, (height / 2) + 10, 120, 40);
        ctx.fillStyle = '#000';
        ctx.fillText('Play Again?', 245, (height / 2) + 35);
        canvas.addEventListener('click', continueButton, false);
    }

    if(!gameStarted){
        ctx.font = "bold 50px VT323";
        ctx.fillText("Spacebar Invaders", width / 2 - 150, height / 2);
        ctx.font = "bold 20px VT323";
        ctx.fillText("Click to Play", width / 2 - 56, height / 2 + 30);
        ctx.fillText("Use arrow keys to move", width / 2 - 100, height / 2 + 60);
        ctx.fillText("Use the X key to shoot", width / 2 - 100, height / 2 + 90);

    }

}

//when the game is over or just starting, does the user want to start?
function continueButton(e){
    var cursorPosition = getCursorPosition(e);
    if(cursorPosition.x > (width / 2) - 53 && cursorPosition.x < (width / 2) + 47 && cursorPosition.y > (height / 2) + 10 && cursorPosition.y < (height / 2) + 50){
        alive = true;
        lives = 3;
        score = 0;
        reset();
        canvas.removeEventListener('click', continueButton, false);
    }
}

//get the coordinates of the mouse cursor when clicking
function getCursorPosition(e){
    var x, y;
    if(e.pageX || e.pageY){
        x = e.pageX;
        y = e.pageY;
    }else{
        x = e.clientX + document.body.schoolLeft + document.documentElement.scrollLeft; 
        y = e.clientY + document.body.schoolTop + document.documentElement.scrollTop; 
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    //why have a new function when I could create the object on the fly?
    //var cursorPosition = new cursorPosition(x, y);
    var cursorPosition = {};
    cursorPosition.x = x;
    cursorPosition.y = y;
    return cursorPosition;

}

function drawStarfield() {
    ctx.drawImage(starfield, starX, starY);
    ctx.drawImage(starfield, starX, starY2);
    
    if(starY > 600){
        starY = -599;
    }

    if(starY2 > 600){
        starY2 = -599;
    }

    starY += 1;
    starY2 += 1;
}

//when use first loads game, show start screen and use this function to start
function gameStart(){
    gameStarted = true;
    canvas.removeEventListener('click', gameStart, false);
}

//when ship is hit, is that the end of the game?
function checkLives(){
    lives -= 1;
    if(lives > 0){
        reset();
    }else if(lives == 0){
        alive = false;
    }
}

function init(){
    //fetch canvas element from html page
    canvas = document.getElementById('canvas');
    
    //get the context of the canvas (need to read up on...)
    ctx = canvas.getContext('2d');

    //create new image for enemy
    enemy = new Image();
    enemy.src = "img/enemy.png";

    //create new image for ship
    ship = new Image();
    ship.src = "img/ship.png";

    //load starfield background image
    starfield = new Image();
    starfield.src = 'img/starfield.jpg';

    //fire gameLoop every 25milliseconds
    setInterval(gameLoop, 25);
    //game = setTimeout(gameLoop, 1000/30);
    
    //add listeners for user input
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('click', gameStart, false);
}

function gameLoop(){
    clearCanvas();
    drawStarfield();
    if(alive && lives > 0 && gameStarted){
        hitTest();
        shipCollision();
        moveLaser();
        moveEnemies();
        drawEnemies();
        drawShip();
        drawLaser();
    }
    scoreTotal();
}

window.onload = init;
