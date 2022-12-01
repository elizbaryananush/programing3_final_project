const LivingCreature = require("./LivingCreature");

module.exports = class Lake extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 4;
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
    chooseCell(ch1, ch2, ch3, ch4, ch5) {
        this.getNewCordinates();
        return super.chooseCell(ch1, ch2, ch3, ch4, ch5);
    }
    random(ch1, ch2, ch3, ch4) {
        let found = this.chooseCell(ch1, ch2, ch3, ch4);
        let result = Math.floor(Math.random() * found.length)
        return found[result];
    }
    mull() {
        this.multiply++;
        let emptyCell = this.random(0, 1, 2, 3);
        if (emptyCell && this.multiply >= 7) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 4;
            lakeArr.push(new Lake(x, y));
            this.multiply = 0;
        }
    }
}
