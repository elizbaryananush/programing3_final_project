var socket = io();
let side = 10;
let drop = [];


function setup() {
    // frameRate(1);
    createCanvas(600, 600);
    background("#acacas");
    for(var i = 0; i < 200; i++) {
        drop[i] = new Drop();
    }
}

let springArgument = false;
let spring = document.getElementById('spring');
spring.addEventListener('click', function () {
    rainArgument = false;
    springArgument = true;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = false;
})

let summerArgument = true;
let summer = document.getElementById('summer');
summer.addEventListener('click', function () {
    rainArgument = false;
    springArgument = false;
    summerArgument = true;
    autumnArgument = false;
    winterArgument = false;
})

let autumnArgument = false;
let autumn = document.getElementById('autumn');
autumn.addEventListener('click', function () {
    rainArgument = false;
    springArgument = false;
    summerArgument = false;
    autumnArgument = true;
    winterArgument = false;
});

let winterArgument = false;
let winter = document.getElementById('winter');
winter.addEventListener('click', function () {
    rainArgument = false;
    springArgument = false;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = true;
});

let rainArgument = false;
let rain = document.getElementById('rain');
rain.addEventListener('click',function(){
    rainArgument = true;
    springArgument = false;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = true;
})

function Drop() {
    this.x = random(0, width);
    this.y = random(0, -height);

    this.show = function () {
        noStroke();
        fill("lightblue");
        ellipse(this.x, this.y, random(1, 5), random(1, 5));
    }
    this.update = function () {
        this.speed = random(5, 10);
        this.gravity = 1.05;
        this.y = this.y + this.speed * this.gravity;

        if (this.y > height) {
            this.y = random(0, -height);
            this.gravity = 0;
        }
    }
}

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
                }
                else if (summerArgument === true) {
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
    if (rainArgument === true) {
        
        for(var i = 0; i < 200; i++) {
            drop[i].show();
            drop[i].update();
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

socket.on("send", function(Statistic){
    let p5 = document.getElementById("p5");
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");
    let p3 = document.getElementById("p3");
    // let p4 = document.getElementById("p4");
    let data = JSON.parse(Statistic);
    p5.innerHTML = data.grass;
    p1.innerHTML = data.grassEater;
    p2.innerHTML = data.amenaker;
    p3.innerHTML = data.lake;
    // p4.innerHTML = data.fire;
});
