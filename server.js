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
const Fire = require('./fire')
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
matLen = 60;
matrix = generateMatrix(matLen);
grassArr = [];
grassEaterArr = [];
amenakerArr = [];
lakeArr = [];
fireArr = [];
lakeArgument = 0;



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
}

function lake() {
    lakeArgument = lakeArgument + 1;
    for (let j = 0; j < 4; j++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0 || matrix[y][x] === 1 || matrix[y][x] === 2 || matrix[y][x] === 3) {
            if (lakeArgument > 1) {
                break;
            } else {
                matrix[y][x] = 4;
                lakeArr.push(new Lake(x, y))
            }
        }
    }
}

function fire() {
    for (let j = 0; j < 1; j++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0 || matrix[y][x] === 1) {
            matrix[y][x] = 5;
            fireArr.push(new Fire(x, y))
        }
    }
}

// snowArgument = false;
function rain(){
    fireArr.length = 0;
    // snowArgument = true;
}

// _____________

function clearf() {
    lakeArgument = 0;
    snowArgument = false;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 0;
            grassArr.length = 0;
            grassEaterArr.length = 0;
            amenakerArr.length = 0;
            lakeArr.length = 0;
            fireArr.length = 0;
        }
    }

}

pauseArgument = false;
function pause() {
    pauseArgument = true;
}

playArgument = false;
function play() {
    pauseArgument = false;
    playArgument = true;
}

function createObj() {
    io.sockets.emit("send matrix", matrix);
}

function game() {
    for (let i = 0; i < grassArr.length; i++) {
        if (pauseArgument === true) {
            break;
        } else {
            grassArr[i].mull();
        }
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        if (pauseArgument === true) {
            break;
        } else {
            grassEaterArr[i].eat();
        }
    }
    for (let i = 0; i < amenakerArr.length; i++) {
        if (pauseArgument === true) {
            break;
        } else {
            amenakerArr[i].eat();
        }
    }
    for (let i = 0; i < lakeArr.length; i++) {
        if (pauseArgument === true) {
            break;
        } else {
            if (i > 400) {
                break;
            } else {
                lakeArr[i].mull();
            }
        }
    }
    for (let i = 0; i < fireArr.length; i++) {
        if (pauseArgument === true) {
            break;
        } else {
            fireArr[i].mull();
        }
    }

    // STATISTIC PART

    let Statistic = {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        amenaker: amenakerArr.length,
        lake: lakeArr.length,
        fire: fireArr.length,
    };
    let data = JSON.stringify(Statistic, null, 2)
    fs.writeFileSync('hello.json', data)
    io.sockets.emit("send", data);

    // ________________

    io.sockets.emit("send matrix", matrix);
}



setInterval(game, 100);

io.on('connection', function (socket) {
    createObj();
    socket.on('addgrass', addGrass);
    socket.on('addothercharacters', addothercharacters);
    socket.on('clearf', clearf);
    socket.on('pause', pause);
    socket.on('play', play);
    socket.on('lake', lake);
    socket.on('fire', fire);
    // socket.on('rain', rain);
});