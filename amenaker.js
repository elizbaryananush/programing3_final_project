var LivingCreature = require('./LivingCreature');

module.exports = class Amenaker extends LivingCreature{
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
        return super.chooseCell(grass,grassEater)
    }

    random(ch1,ch2){
        let found = this.chooseCell(ch1,ch2);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }

    eat() {

        // let found = this.chooseCell(1, 2);
        let emptyCell = this.random(1,2);
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
            for (let i in grassEaterArr) {
                if (x === grassEaterArr[i].x && y === grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            // console.log(this.energy);
            if (this.energy > 12) {
                this.mull()
            }
        } else {
            this.move();
        }
    }
    move() {
        // let found = this.chooseCell(0);
        let emptyCell = this.random(0);
        this.energy--;
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.energy < 0) {
                // console.log("asljdlakjdlkasjdlkajs");
                this.die()
            }
        }
    }

    die() {
        for (let i in amenakerArr) {
            if (this.x === amenakerArr[i].x && this.y === amenakerArr[i].y) {
                amenakerArr.splice(i, 1);
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
            matrix[y][x] = 3;
            amenakerArr.push(new Amenaker(x, y));
            this.energy = 8;
        }
    }
}
