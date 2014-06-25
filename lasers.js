var laserTotal = 2,
    lasers = [];

function drawLaser(){
    if(lasers.length){
        for(var i=0; i < lasers.length; i++){
            ctx.fillStyle = "#f00";
            ctx.fillRect( lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3] );
        }
    }
}

function moveLaser(){
    for(var i=0; i < lasers.length; i++){
        //if laser is visible in canvas, move it upwards 10px
        if(lasers[i][1] > -11){
            lasers[i][1] -= 10;
        //if laser is off canvas, remove it from array
        }else if(lasers[i][1] < -10){
            lasers.splice(i, 1);
        }
    }
}

function hitTest(){
    //define variable in local scope for later use
    var remove = false;

    //loop through lasers
    for(var i=0; i < lasers.length; i++){
        
        //loop through each enemy
        for(var h=0; h < enemies.length; h++){
        
            //if laser's X position is between enemy's X start and end AND
            //the lasers y position is less than the enemy's Y position... HIT
            if( lasers[i][1] <= (enemies[h][1] + enemies[h][3]) && lasers[i][0] >= enemies[h][0] && lasers[i][0] <= (enemies[h][0] + enemies[h][2]) ){
                
                //mark laser to be removed after loop
                remove = true;
                
                //immediately remove the enemy from the array
                enemies.splice(h, 1);

                //you gots points!
                score += 100;

                //add NEW enemy to account for the one we just removed
                enemies.push( [(Math.random() * 500) + 50, -45, enemy_w, enemy_h, speed] );
            }
        }
    
        //if laser needs to be removed, remove it and reset remove var
        if(remove == true){
            lasers.splice(i, 1);
            remove = false;
        }
    }
}
