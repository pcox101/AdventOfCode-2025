import * as fs from 'fs';

let numberRemoved = function countRemovable(actuallyRemove = false) {

    let numberRemoved = 0;
    for (let row in gameboard) {
        for (let col in gameboard[row]) {
            //console.log(row + "," + col + " = " + gameboard[row][col]);
            if (gameboard[row][col] == '@') {

                let tot = 0;
                for (let o in offsets) {
                    let nr = parseInt(row) + offsets[o][0];
                    let nc = parseInt(col) + offsets[o][1];

                    try {
                        if (gameboard[nr][nc] == '@') {
                            tot += 1;
                        }
                    }
                    catch {

                    }
                }

                if (tot < 4) {
                    numberRemoved += 1;
                    if (actuallyRemove) {
                        gameboard[row][col] = '.';
                    }
                }
            }
        }
    }
    return numberRemoved;
}


let lines = fs.readFileSync("day04.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

var offsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

var gameboard: string[][] = [];

for (let row in lines) {
    let line = lines[row];
    gameboard[row] = [];
    for (let col = 0; col < line.length; col++) {
        gameboard[row][col] = line.charAt(col);
    }
}

part1 = numberRemoved(false);

while (true) {
    let n = numberRemoved(true);

    part2 += n;
    if (n == 0) {
        break;
    }
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
