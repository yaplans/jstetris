/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const canvas = document.getElementById("tetris");
//console.log(canvas);
const context = canvas.getContext("2d");
context.scale(20, 20);

/*
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];
*/

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0;  --y) {
        for (var x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}


function collide(arina,player) { //??
    const [m, o] = [player.matrix, player.pos];
    for(let y = 0; y < m.length; ++y){
        for(let x = 0; x < m[y].length; ++x){
            if (m[y][x] !== 0 && 
                    (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}



function createMatrix(w, h) {
    const matrix = [];
    while (h--) {//обнуляем матрицу
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    if (type === "T") {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    } else if(type === "O"){
        return [
            [2, 2],
            [2, 2]
        ];
    } else if(type === "L"){
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ];
    } else if(type === "J"){
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ];
    } else if(type === "I"){
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ];
    } else if(type === "S"){
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ];
    } else if(type === "Z"){
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ];
    }
}

function draw() {
    // очистили канву
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    drawMatrix(arena, {x: 0, y: 0});
    // нарисовали матрицу в позицию
    drawMatrix(player.matrix,player.pos);
}


function drawMatrix(matrix, offset){// не очень понятно...
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y, 1, 1);
            }
        });
    });
}        

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x)=>{
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}


let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

/**
 * 
 * @returns {undefined}
 * осуществляет падение на шаг
 */
function playerDrop() {
    player.pos.y++;// двигаемся вниз
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        //debugger;
        arenaSweep();
        updateScore();
        //player.pos.y = 8;
    }
      dropCounter = 0;// обнуляем счетчик падения
}

function playerMove(dir){
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerReset(){
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
           (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}



//32 мин ??? = моя в стенку поворачивается!???

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix,dir);
    while (collide(arena, player)) {
        player.pos.x == offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return ;            
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    }else {
        matrix.reverse();
    }
}
    



function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    //console.log(deltaTime);
    dropCounter += deltaTime;
    if (dropCounter > dropInterval){
        playerDrop();
//        player.pos.y++;
//        dropCounter = 0;
    }
    
    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = player.score;
}

const colors = [
    null,
    'red',
    'blue',
    'violet',
    'green',
    'purple',
    'orange',
    'pink'
];


const arena = createMatrix(12,20);
 //console.log(arena);console.table(arena);

const player = {
    //pos: {x: 5, y: 5},
//    pos: {x: 5, y: 0},
    pos: {x: 0, y: 0},
    //matrix: matrix
//    matrix: createPiece('T')
    matrix: null,
    score: 0
};


//document.addEventListener('keydown', event => {
//    console.log(event); 
//});

/*
document.addEventListener('keydown', event => {
    //console.log(event); 
  if(event.keyCode === 37){ //"AltLeft"
      player.pos.x--;
  }
  if(event.keyCode === 39){//"ArrowRight"
      player.pos.x++;
  }
  if(event.keyCode === 38){ //"ArrowUp"
      player.pos.y--;
  }
  if(event.keyCode === 40){//"ArrowDown"
      player.pos.y++;
      //dropCounter = 0;
      playerDrop();
  }
});
*/

document.addEventListener('keydown', event => {
    console.log(event); 
  if(event.keyCode === 37){ //"AltLeft"
  //    player.pos.x--;
        playerMove(-1);
  }
  if(event.keyCode === 39){//"ArrowRight"
        playerMove(1);
      //player.pos.x++;
  }
  if(event.keyCode === 81){ // ??? 38"ArrowUp"
      //player.pos.y--;
        playerRotate(-1);
  }

  if(event.keyCode === 87){ // ???"ArrowUp"
      //player.pos.y--;
        playerRotate(1);
  }
    
  if(event.keyCode === 40){//"ArrowDown"
    //  player.pos.y++;
      //dropCounter = 0;
        playerDrop();
  }
});

playerReset();
updateScore();// 
update();
 