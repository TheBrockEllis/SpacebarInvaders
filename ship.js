function drawShip() {

    //move ship left or right 5px if pressed
    if(rightKey) ship_x += 5;
    else if(leftKey) ship_x -= 5;

    //move ship up or down 5px if pressed
    if(upKey) ship_y -= 5;
    else if(downKey) ship_y += 5;

    //if ship's position is over left/right border, set it to min/max
    if(ship_x <= 0) ship_x = 0;
    if( (ship_x + ship_w) >= width ) ship_x = width - ship_w;

    //if ship's position is over top/bottom border, set it to min/max
    if(ship_y <= 0) ship_y = 0;
    if( (ship_y + ship_h) >= height ) ship_y = height - ship_h;

    //draw image of the ship
    ctx.drawImage(ship, ship_x, ship_y);

    /*
    *ctx.fillStyle = "#0f0";
    *ctx.fillRect(ship_x, ship_y, ship_w, ship_h);
    */
}

function shipCollision(){
    //create local scoped vars
    var ship_xw = ship_x + ship_w,
        ship_yh = ship_y + ship_h;

    for(var i=0; i < enemies.length; i++){
    
        /*if the ship’s x position is greater than the enemy’s x position but less than it’s x position plus it’s width and it’s y position is greater than the enemy’s y position but less than the enemy’s y position plus it’s height, then it’s a hit*/

        if (ship_x > enemies[i][0] && ship_x < enemies[i][0] + enemy_w && ship_y > enemies[i][1] && ship_y < enemies[i][1] + enemy_h) {
            checkLives();
        }
    
        if (ship_xw < enemies[i][0] + enemy_w && ship_xw > enemies[i][0] && ship_y > enemies[i][1] && ship_y < enemies[i][1] + enemy_h) {
            checkLives();
        }
    
        if (ship_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h && ship_x > enemies[i][0] && ship_x < enemies[i][0] + enemy_w) {
            checkLives();
        }
    
        if (ship_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h && ship_xw < enemies[i][0] + enemy_w && ship_xw > enemies[i][0]) {
            checkLives();
        }
    } 
}
