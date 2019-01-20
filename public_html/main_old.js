/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const canvas_my = document.getElementById("my_map");
const canvas_his = document.getElementById("his_map");
//console.log(canvas);
//const context_my = canvas_my.getContext("2d");
//context_my.scale(20, 20);

//const context_his = canvas_his.getContext("2d");
//context_his.scale(20, 20);

const c_col = 10;

//draw();


    var tab_my = document.getElementById("my_tab");
    const tab_his = document.getElementById("his_tab");

draw_tabs();

tab_my.onmouseup = function (event) {
    var target = event.target;
    var m_out = document.getElementById("m_out");
    var m_color = target.style.background.split(' ');
    //var arr = names.split(', ');
    m_out.innerHTML = target.id + m_color[0];
//    m_out.innerHTML = target.id + target.style.background;
    if (m_color[0] == 'pink') {
        target.style.background = '';
    } else {
        target.style.background = 'pink';
    }
}


//set_ship();

//exit;

function f_thead() {
    var m_thead = document.createElement("thead");
    var m_tr = document.createElement("tr");
    var m_th;

    const a = '_АБВГДЕЖЗИК';
    
    for (var i = 0; i < c_col+1; i++) {
        m_th = document.createElement("th");
        m_tr.appendChild(m_th);
        m_th.id = "th" + i;
        m_th.innerHTML = a[i];
    }

    m_thead.appendChild(m_tr);
    return m_thead;
}

function f_tbody() {
/////////////////////////////////////

    var m_tbody = document.createElement("tbody");
    var m_tr;
    var m_td;
    
    for (var y = 1; y < c_col+1; y++) {
        m_tr = document.createElement("tr");
        for (var x = 0; x < c_col+1; x++) {
            m_td = document.createElement("td");
            m_tr.appendChild(m_td);
            m_td.id = "td" + x + "_" + y;
            if (x == 0) {
                m_td.innerHTML = y;
            }
        }
        m_tbody.appendChild(m_tr);
        m_tr.id = "tr" + y;
    }
    return m_tbody;
}

function draw_tabs() {
//    var tab_my = document.getElementById("my_tab");
//    const tab_his = document.getElementById("his_tab");
    
//    var zzz = f_tbody();
//    console.log(zzz);
    tab_my.appendChild(f_thead());
    tab_my.appendChild(f_tbody());
//    zzz = f_tbody();
//    console.log(zzz);
    tab_his.appendChild(f_thead());
    tab_his.appendChild(f_tbody());

}

exit;


function set_ship() {
//        context.fillStyle = colors[value];
//        context.fillRect(x + offset.x,
//            y + offset.y, 1, 1);
        context_my.fillStyle = "#00FF00";
        context_my.fillRect(1,1,1,1);
        context_his.fillStyle = "#0000FF";
        context_his.fillRect(1,1,1,1);

}


function draw() {
    context_my.fillStyle = '#000';
    context_my.fillRect(0, 0, canvas_my.width, canvas_my.height);

    context_his.fillStyle = '#FF0000';
    context_his.fillRect(0, 0, canvas_his.width, canvas_his.height);



//    drawMatrix(player.matrix,player.pos);
}



//return true;
















const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}



function drawMatrix(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x,
                                 y + offset.y, 1, 1);
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
      dropCounter = 0;// обнуляем счетчик падения
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

const arena = createMatrix(12,20);
console.log(arena);console.table(arena);

const player = {
    pos: {x: 5, y: 5},
    matrix: matrix
};


//document.addEventListener('keydown', event => {
//    console.log(event); 
//});

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


update();
 