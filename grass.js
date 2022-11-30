var LivingCreature = require('./livingCreature');

module.exports = class Grass extends LivingCreature{

    random(){
        let found = this.chooseCell(0);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }


    mull() {
        this.multiply++;
        // let found = this.chooseCell(0);
        let emptyCell = this.random();
        if (emptyCell && this.multiply >= 3) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y));
            this.multiply = 0;
        }
    }
}