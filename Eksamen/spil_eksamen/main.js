let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let arr = [ //multidimensionelt array
    [0,4,0,0,0,0,0,0,0,0,0],
    [0,1,3,1,0,1,1,1,1,1,0],
    [0,1,0,1,2,1,0,1,0,1,0],
    [0,1,1,1,0,0,0,3,1,1,0],
    [0,1,0,3,0,0,1,1,1,0,0],
    [0,1,1,1,0,0,1,0,1,0,0],
    [0,3,0,1,1,0,1,2,8,1,0],
    [0,1,0,0,1,0,3,0,0,1,0],
    [0,2,1,1,6,1,1,1,1,3,0],
    [0,1,0,1,1,0,0,0,0,1,0,0],
    [0,1,0,1,2,9,1,1,0,1,1,0],
    [0,1,1,1,0,1,0,3,1,1,2,0],
    [0,1,0,1,1,1,0,1,0,0,1,0],
    [0,31,2,1,0,1,0,1,1,0,1,0],
    [0,0,3,1,1,1,1,1,1,0,1,0],
    [0,1,1,1,0,0,0,0,1,1,1,0],
    [0,1,0,1,1,0,3,1,1,0,1,0],
    [0,2,0,0,7,0,1,0,0,0,1,0],
    [0,1,1,1,1,1,1,2,1,1,1,0],
    [0,0,0,1,0,0,1,0,0,1,0,0],
    [0,1,1,1,3,1,1,1,11,1,0],
    [0,1,0,0,1,0,1,0,1,0,0],
    [0,1,1,2,1,0,1,1,1,2,0],
    [0,0,0,0,0,0,0,0,0,0,0]
];

//variables
let wall = 0;
let way = 1;
let skat = 2;
let fire = 3;
let player = 4;
let enemy = 6;
let enemy2 = 7;
let enemy3 = 8;
let enemy4 = 9;
let enemy5 = 11;
let enemy6 = 31;
let playerPosition = {x:0, y:0};
let enemyPosition = {x:8, y:4};
let enemy2Position = {x:17, y:4};
let enemy3Position = {x:6, y:8};
let enemy4Position = {x:10, y:5};
let enemy5Position = {x:20, y:8};
let enemy6Position = {x:13, y:1}
let point = 0;
let pointResultat = document.getElementById("point");
let flag = false;

//Hvor hurtigt vores enemy skal flytte sig
setInterval(()=>{
    enemyWalk();
},1000)

setInterval(()=>{
    enemyWalk2();
},1000)

setInterval(()=>{
    enemyWalk3();
},1000)

setInterval(()=>{
    enemyWalk4();
},1000)

setInterval(()=>{
    enemyWalk5();
},1000)

setInterval(()=>{
    enemyWalk6();
},1000)


//variable til billeder
let play = new Image();
play.src = 'image/play.png';

let ild = new Image();
ild.src = 'image/ild.png';

let gold = new Image();
gold.src = 'image/gold.png';

let snake = new Image();
snake.src = 'image/snake.png';

let veg = new Image();
veg.src = 'image/baggrund.png';

let fjende = new Image();
fjende.src = 'image/snake.png';

//funktion til at få vist point
function pointVis(){
    pointResultat.innerText = "Du har " + point + " point"
}


//styling
function drawMaxe(){

// looper igennem array (x)
for(let x = 0; x < arr.length; x++){
    //loop igen inden i array for at få skrevet talene ud (y)
    for(let y = 0; y < arr[x].length; y++){

        if(arr[x][y] == wall){
            ctx.fillStyle = "rgb(78, 60, 36)";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(veg,x*50,y*50,50,50);   
        }
        else if(arr[x][y] == way){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);   
        }
        else if(arr[x][y] == skat){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(gold,x*50,y*50,50,50);
        }
        else if(arr[x][y] == fire){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(ild,x*50,y*50,50,50);
        }
        else if(arr[x][y] == enemy){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(snake,x*50,y*50,50,50);
        }
        else if(arr[x][y] == enemy2){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(snake,x*50,y*50,50,50);
        }
        else if(arr[x][y] == enemy3){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(snake,x*50,y*50,50,50);
        }
        else if(arr[x][y] == enemy4){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(snake,x*50,y*50,50,50);
        }
        else if(arr[x][y] == enemy5){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(snake,x*50,y*50,50,50);
        }
        else if(arr[x][y] == enemy6){
            ctx.fillStyle = "#264b29";
            ctx.fillRect(x*50,y*50,50,50);
            ctx.drawImage(snake,x*50,y*50,50,50);
        }
        else if(arr[x][y] == player){
            playerPosition.x = x;
            playerPosition.y = y;
            ctx.drawImage(play,x*50,y*50,50,50);
        }
    }
}
}
//5 gående enemy
function enemyWalk(){
    
    let rand = Math.floor(Math.random() * 2) + 1;

    if(rand == 1){ //op
        if(enemyPosition.y > 3){
            if(arr[enemyPosition.x] [enemyPosition.y -1] === way){
                arr[enemyPosition.x] [enemyPosition.y -1] = enemy //enemy nye position
                arr[enemyPosition.x][enemyPosition.y] = way
                enemyPosition.y--
            } else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("Y too low");
        }
    }else if(rand == 2){ //ned
        if(enemyPosition.y < 5){
            if(arr[enemyPosition.x][enemyPosition.y +1] === way){
                arr[enemyPosition.x][enemyPosition.y +1] = enemy //enemy nye position
                arr[enemyPosition.x][enemyPosition.y] = way
                enemyPosition.y++
            }else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("Y too high");
        }
    }
    drawMaxe();
    console.log(enemyPosition);
}

function enemyWalk2(){
    
    let rand2 = Math.floor(Math.random() * 2) + 1;

    if(rand2 == 1){ //venstre
        if(enemy2Position.x > 15){
            if(arr[enemy2Position.x +1] [enemy2Position.y] === way){
                arr[enemy2Position.x +1] [enemy2Position.y] = enemy2 //enemy nye position
                arr[enemy2Position.x][enemy2Position.y] = way
                enemy2Position.x++
            } else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("x too low");
        }
    }else if(rand2 == 2){ //højre
        if(enemy2Position.x < 19){
            if(arr[enemy2Position.x -1][enemy2Position.y] === way){
                arr[enemy2Position.x -1][enemy2Position.y] = enemy2 //enemy nye position
                arr[enemy2Position.x][enemy2Position.y] = way
                enemy2Position.x--
            }else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("x too high");
        }
    }
    drawMaxe();
    console.log(enemy2Position);
}

function enemyWalk3(){
    
    let rand3 = Math.floor(Math.random() * 2) + 1;

    if(rand3 == 1){ //venstre
        if(enemy3Position.x > 2){
            if(arr[enemy3Position.x +1] [enemy3Position.y] === way){
                arr[enemy3Position.x +1] [enemy3Position.y] = enemy3 //enemy nye position
                arr[enemy3Position.x][enemy3Position.y] = way
                enemy3Position.x++
            } else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("x too low");
        }
    }else if(rand3 == 2){ //højre
        if(enemy3Position.x < 7){
            if(arr[enemy3Position.x -1][enemy3Position.y] === way){
                arr[enemy3Position.x -1][enemy3Position.y] = enemy3 //enemy nye position
                arr[enemy3Position.x][enemy3Position.y] = way
                enemy3Position.x--
            }else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("x too high");
        }
    }
    drawMaxe();
    console.log(enemy3Position);
}

function enemyWalk4(){
    
    let rand4 = Math.floor(Math.random() * 2) + 1;

    if(rand4 == 1){ //venstre
        if(enemy4Position.x > 9){
            if(arr[enemy4Position.x +1] [enemy4Position.y] === way){
                arr[enemy4Position.x +1] [enemy4Position.y] = enemy4 //enemy nye position
                arr[enemy4Position.x][enemy4Position.y] = way
                enemy4Position.x++
            } else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("x too low");
        }
    }else if(rand4 == 2){ //højre
        if(enemy4Position.x < 15){
            if(arr[enemy4Position.x -1][enemy4Position.y] === way){
                arr[enemy4Position.x -1][enemy4Position.y] = enemy4 //enemy nye position
                arr[enemy4Position.x][enemy4Position.y] = way
                enemy4Position.x--
            }else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("x too high");
        }
    }
    drawMaxe();
    console.log(enemy4Position);
}

function enemyWalk5(){
    
    let rand5 = Math.floor(Math.random() * 2) + 1;

    if(rand5 == 1){ //op
        if(enemy5Position.y > 5){
            if(arr[enemy5Position.x] [enemy5Position.y -1] === way){
                arr[enemy5Position.x] [enemy5Position.y -1] = enemy5 //enemy nye position
                arr[enemy5Position.x][enemy5Position.y] = way
                enemy5Position.y--
            } else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("Y too low");
        }
    }else if(rand5 == 2){ //ned
        if(enemy5Position.y < 9){
            if(arr[enemy5Position.x][enemy5Position.y +1] === way){
                arr[enemy5Position.x][enemy5Position.y +1] = enemy5 //enemy nye position
                arr[enemy5Position.x][enemy5Position.y] = way
                enemy5Position.y++
            }else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("Y too high");
        }
    }
    drawMaxe();
    console.log(enemy5Position);
}

function enemyWalk6(){
    
    let rand6 = Math.floor(Math.random() * 2) + 1;

    if(rand6 == 1){ //venstre
        if(enemy6Position.x > 8){
            if(arr[enemy6Position.x +1] [enemy6Position.y] === way){
                arr[enemy6Position.x +1] [enemy6Position.y] = enemy6 //enemy nye position
                arr[enemy6Position.x][enemy6Position.y] = way
                enemy6Position.x++
            } else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("x too low");
        }
    }else if(rand6 == 2){ //højre
        if(enemy6Position.x < 14){
            if(arr[enemy6Position.x -1][enemy6Position.y] === way){
                arr[enemy6Position.x -1][enemy6Position.y] = enemy6 //enemy nye position
                arr[enemy6Position.x][enemy6Position.y] = way
                enemy6Position.x--
            }else{
                console.warn("Snake ran into wall");
            }
        } else{
            console.warn("x too high");
        }
    }
    drawMaxe();
    console.log(enemy6Position);
}

//piltasterne og styringen
document.addEventListener("keyup", function(event){

    switch (event.keyCode) {
    case 37: // left
        if (arr[playerPosition.x -1][playerPosition.y] == way) {
            arr[playerPosition.x -1][playerPosition.y] = player
            arr[playerPosition.x][playerPosition.y] = way
            waySound();
            
        }
        else if (arr[playerPosition.x -1][playerPosition.y] == fire){
            deadSound();
            alert("GAME OVER! Du nåede ikke at samle alle skatte");
            setInterval(function(){
                location.reload();  
             },1500)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x -1][playerPosition.y] == enemy){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x -1][playerPosition.y] == enemy2){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x -1][playerPosition.y] == enemy3){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x -1][playerPosition.y] == skat){
            skatSound();
            arr[playerPosition.x -1][playerPosition.y] = player
            arr[playerPosition.x][playerPosition.y] = way
            point++
            pointVis()
        }
        drawMaxe();

        
        break;
    case 38:
        if (arr[playerPosition.x][playerPosition.y -1] == way) {
            arr[playerPosition.x][playerPosition.y -1] = player
            arr[playerPosition.x][playerPosition.y] = way
            waySound();
            
        }
        else if (arr[playerPosition.x][playerPosition.y -1] == fire) {
            deadSound();
            alert("GAME OVER! Du nåede ikke at samle alle skatte");
            setInterval(function(){
                location.reload();  
             },1500)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x][playerPosition.y -1] == enemy){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x][playerPosition.y -1] == enemy2){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x][playerPosition.y -1] == enemy3){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
    
        else if (arr[playerPosition.x][playerPosition.y -1] == skat) {
            skatSound();
            arr[playerPosition.x][playerPosition.y -1] = player
            arr[playerPosition.x][playerPosition.y] = way
            point++
            pointVis()
        }
        drawMaxe();
       
        break;
    case 39:
        if (arr[playerPosition.x +1][playerPosition.y] == way) {
            arr[playerPosition.x +1][playerPosition.y] = player
            arr[playerPosition.x][playerPosition.y] = way
            waySound();
            
        }
        else if (arr[playerPosition.x +1][playerPosition.y] == fire){
            deadSound();
            alert("GAME OVER! Du nåede ikke at samle alle skatte");
            setInterval(function(){
                location.reload();  
             },1500)

            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x +1][playerPosition.y] == enemy){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x +1][playerPosition.y] == enemy2){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x +1][playerPosition.y] == enemy3){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
     
        else if (arr[playerPosition.x +1][playerPosition.y] == skat){
            skatSound();
            arr[playerPosition.x +1][playerPosition.y] = player
            arr[playerPosition.x][playerPosition.y] = way
            point++
            pointVis()
        }
        drawMaxe();
        
        break;
    case 40:
        if (arr[playerPosition.x][playerPosition.y +1] == way) {
            arr[playerPosition.x][playerPosition.y +1] = player
            arr[playerPosition.x][playerPosition.y] = way
            waySound();
            
        }
        else if (arr[playerPosition.x][playerPosition.y +1] == fire) {
            deadSound();
            alert("GAME OVER! Du nåede ikke at samle alle skatte");
            setInterval(function(){
               location.reload();  
            },1500)
           
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x][playerPosition.y +1] == enemy){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x][playerPosition.y +1] == enemy2){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
        else if (arr[playerPosition.x][playerPosition.y +1] == enemy3){
            snakeDead();
            alert("GAME OVER! Du fik dødsbiddet af en slange");
            setInterval(function(){
                location.reload();  
             },2000)
            arr[playerPosition.x][playerPosition.y] = way
            arr[0][1] = player;
            drawMaxe();
        }
      
        else if (arr[playerPosition.x][playerPosition.y +1] == skat) {
            skatSound();
            arr[playerPosition.x][playerPosition.y +1] = player
            arr[playerPosition.x][playerPosition.y] = way
            point++
            pointVis()
        }
        drawMaxe();
        
        break;

    default:
        break;
    
    console.log(playerPosition)

}
    /*
    left: 37 
    up: 38
    right: 39
    down: 40
    */
})

drawMaxe(); 

// funktion til vores lydeffekter
function waySound(){
    let gameSound = new Audio('sound/retro-game.wav')
    gameSound.volume = (0.1);
    gameSound.play();
}
function deadSound(){
    let gameDead = new Audio('sound/Gameover.wav')
    gameDead.volume = (0.1);
    gameDead.play();
}
function skatSound(){
    let gameSkat = new Audio('sound/gold.wav')
    gameSkat.volume = (0.1);
    gameSkat.play();
}
function goalSound(){
    let gamegoal = new Audio('indijones.mp3')
    gamegoal.volume = (0.1);
    gamegoal.play();
}
function snakeSound(){
    let gamesnake = new Audio('snakeSound.mp3')
    gamesnake.volume = (0.1);
    gamesnake.play();
}
function snakeDead(){
    let gamesnakedead = new Audio('sound/snakes_indi.mp3')
    gamesnakedead.volume =(0.1);
    gamesnakedead.play();
}

//timer til at tælle ned
let timer = 45;
let timerElementDiv = document.querySelector("#timer");
// tæller op
let startSpil = addEventListener.event
if (startSpil == 37) {
  alert ("spillet starter");}
function startSpilNu(){
setInterval(function(){
timer--; //tæller ned
timerElementDiv.innerText = "Tid tilbage: " + timer;


//hvis tiden går i 0 og alle skatte ikke er fanget
if(timer == 0){
    deadSound();
    window.addEventListener("load", drawMaxe);
    alert("GAME OVER! Du nåede ikke at samle alle skatte");
    location.reload();
    arr[playerPosition.x][playerPosition.y] = way
    arr[0][1] = player;
    timer = 45;
    drawMaxe();
}// hvis man indsamler alle ti skatte
if (point == 10) {
    skatSound();
    window.addEventListener("load", drawMaxe);
    alert("TILLYKKE! Du fandt alle guldbarene");
    point = 0
    location.reload();  
     arr[playerPosition.x][playerPosition.y] = way
     arr[0][1] = player;
    drawMaxe();
}   
}, 1000);
}

//aktivere timer idet der bliver trykket en tast ned
document.addEventListener("keydown", function(event){
    if(!flag){
          startTimer(event);
          
    }
});
//spil starter
function startTimer(event) {
    if(event.keyCode == 39){
        startSpilNu();
        flag = true;
    }
}

pointVis();
window.addEventListener("load", drawMaxe);
