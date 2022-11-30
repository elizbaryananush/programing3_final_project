var socket = io();
let side = 12;


function setup() {
    // frameRate(1);
    createCanvas(1000, 1000)
    background("#acacas");
}

let springArgument = false;
let spring = document.getElementById('spring');
spring.addEventListener('click', function () {
    springArgument = true;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = false;
})

let summerArgument = true;
let summer = document.getElementById('summer');
summer.addEventListener('click', function () {
    springArgument = false;
    summerArgument = true;
    autumnArgument = false;
    winterArgument = false;
})

let autumnArgument = false;
let autumn = document.getElementById('autumn');
autumn.addEventListener('click', function () {
    springArgument = false;
    summerArgument = false;
    autumnArgument = true;
    winterArgument = false;
});

let winterArgument = false;
let winter = document.getElementById('winter');
winter.addEventListener('click', function () {
    springArgument = false;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = true;
});

function draww(matrix) {
    noStroke();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                fill("gray");
            }
            // GRASS
            else if (matrix[i][j] === 1) {
                if (springArgument === true) {
                    fill('pink')
                } else if (summerArgument === true) {
                    fill('green');
                } else if (autumnArgument === true) {
                    fill('#808000');
                } else if (winterArgument === true) {
                    fill('white');
                }
            }
            //

            else if (matrix[i][j] === 2) {
                fill("yellow");
            }
            else if (matrix[i][j] === 3) {
                fill("red");
            }
            // LAKES
            else if (matrix[i][j] === 4) {
                if (springArgument === true) {
                    fill('#7DF9FF')
                
                } else if (summerArgument === true) {
                    fill('blue');
                } 
                else if (winterArgument === true) {
                    fill('#7DF9FF'); // ligth blue
                } 
                else if (autumnArgument === true) {
                    fill('#6495ED'); // cornflower blue
                }
            }
            // 

            else if (matrix[i][j] === 5) {
                fill("orange");
            }
            rect(i * side, j * side, side, side);
        }
    }
}


socket.on('send matrix', draww);

let addGrass = document.getElementById('addgrass');
addGrass.addEventListener('click', function () {
    socket.emit('addgrass');
})

let addothercharacters = document.getElementById('addothercharacters');
addothercharacters.addEventListener('click', function () {
    socket.emit('addothercharacters');
})

let clearf = document.getElementById('clearf');
clearf.addEventListener('click', function () {
    socket.emit('clearf');
})

let pause = document.getElementById('pause');
pause.addEventListener('click', function () {
    socket.emit('pause');
})

let play = document.getElementById('play');
play.addEventListener('click', function () {
    socket.emit('play');
})

let lake = document.getElementById('lake');
lake.addEventListener('click', function () {
    socket.emit('lake');
})