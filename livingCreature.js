module.exports = class LivingCreature { 
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
    chooseCell(ch1,ch2,ch3,ch4,ch5) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch4 || matrix[y][x] == ch3 || matrix[y][x] == ch2 || matrix[y][x] == ch1 || matrix[y][x] == ch5) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    } 
} 