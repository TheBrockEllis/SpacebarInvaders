var enemyTotal = 5,
    enemies = [],
    enemy_x = 50,
    enemy_y = -45,
    enemy_w = 50,
    enemy_h = 50,
    speed = 3;

for(var i=0; i < enemyTotal; i++){
    //add enemies to enemy [] array
    enemies.push( [enemy_x, enemy_y, enemy_w, enemy_h, speed] );
    
    //the new x coordinate is the width of the enemy + 60px
    enemy_x += enemy_w + 60;
}

function drawEnemies(){
    //loop through each of the enemies
    for(var i=0; i < enemies.length; i++){
        //draw image of enemy ship on canvas
        ctx.drawImage(enemy, enemies[i][0], enemies[i][1]);

    }
}

function moveEnemies(){
    //loop through each of the enemies
    for(var i=0; i < enemies.length; i++){
        
        //if enemy height is less than bottom of canvas, move down body length
        if(enemies[i][1] < height) {
            enemies[i][1] += enemies[i][4];
        //if enemy position is below bottom of canvas, reposition @ top
        }else if(enemies[i][1] > height - 1){
            enemies[i][1] = -45;
        }
    }
}
