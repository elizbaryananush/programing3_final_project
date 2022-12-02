var LivingCreature = require('./livingCreature');

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(grass, grassEater) {
        this.getNewCordinates();
        return super.chooseCell(grass, grassEater)
    }
    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }

    eat() {


        //let found = this.chooseCell(1);
        let emptyCell = this.random(1);
        // console.log(emptyCell)
        if (emptyCell) {
            this.energy += 2;
            let x = emptyCell[0];
            let y = emptyCell[1];
            for (let i in grassArr) {
                if (x === grassArr[i].x && y === grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

            if (this.energy > 10) {
                this.mull()
            }
        } else {
            this.move()

        }
    }
    move() {

        // let found = this.chooseCell(0);
        let emptyCell = this.random(0);

        if (emptyCell) {
            this.energy--;
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

            if (this.energy < 0) {
                this.die()
            }
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {

        for (let i in grassEaterArr) {

            if (this.x === grassEaterArr[i].x && this.y === grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);

                break;

            }
        }
        matrix[this.y][this.x] = 0;
    }
    mull() {
        // let found = this.chooseCell(0);
        let emptyCell = this.random(0);
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y));
            this.energy = 8;
        }
    }
} 