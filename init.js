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
    alive = true;

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
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: ", 490, 30);
    ctx.fillText(score, 550, 30);

    ctx.fillText("Lives: ", 10, 30);
    ctx.fillText(lives, 68, 30);
    
    if(!alive){
        ctx.fillText("Game Over!", 245, height/2);
    }
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

    //fire gameLoop every 25milliseconds
    setInterval(gameLoop, 25);
    //game = setTimeout(gameLoop, 1000/30);
    
    //add listeners for user input
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
}

function gameLoop(){
    clearCanvas();
    if(alive){
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
