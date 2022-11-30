var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
var fs = require('fs');
const Grass = require('./grass');
const GrassEater = require('./grassEater');
const Lake = require('./lake');
const Amenaker = require('./amenaker')
server.listen(3001);

function generateMatrix(matLen) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix.push([]);
        for (let j = 0; j < matLen; j++) {
            matrix[i].push(0)
        }
    }
    return matrix;
}
matLen = 40;
matrix = generateMatrix(matLen);
grassArr = [];
grassEaterArr = [];
amenakerArr = [];
lakeArr = [];

function addGrass() {
    for (let j = 0; j < 1; j++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0) {
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y))
        }
    }
}

function addothercharacters() {
    for (let j = 0; j < 1; j++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0 || matrix[y][x] === 1) {
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y))
        }
    }
    for (let j = 0; j < 1; j++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0 || matrix[y][x] === 1) {
            matrix[y][x] = 3;
            amenakerArr.push(new Amenaker(x, y))
        }
    }
    for (let j = 0; j < 1; j++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0 || matrix[y][x] === 1 || matrix[y][x] === 2 || matrix[y][x] === 3) {
            matrix[y][x] = 4;
            lakeArr.push(new Lake(x, y))
        }
    }
}

// _____________

function clearf() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 0;
            grassArr.length = 0;
            grassEaterArr.length = 0;
            amenakerArr.length = 0;
            lakeArr.length = 0;
        }
    }

}


function createObj() {
    io.sockets.emit("send matrix", matrix);
}
function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mull();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < amenakerArr.length; i++) {
        amenakerArr[i].eat();
    }
    for (let i = 0; i < lakeArr.length; i++) {
        lakeArr[i].mull();
        if (i > 150) {
            break;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 100);

io.on('connection', function (socket) {
    createObj();
    socket.on('addgrass', addGrass);
    socket.on('addothercharacters', addothercharacters);
    socket.on('clearf', clearf)
});