import * as fs from 'fs';

let lines = fs.readFileSync("day07.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

var gameboard: string[][] = [];

for (let row in lines) {
    let line = lines[row];
    gameboard[row] = [];
    for (let col = 0; col < line.length; col++) {
        gameboard[row][col] = line.charAt(col);
    }
}

for (let row = 0; row < gameboard.length - 1; row++)
{
    for (let col = 0; col < gameboard[row].length; col++) {
        if ((gameboard[row][col] != '.') && (gameboard[row][col] != '^'))
        {
            let cVal = parseInt(gameboard[row][col]);
            if (!cVal) cVal = 1;
            let d1 = gameboard[row+1][col];
            if (d1 == '^') {
                part1++;
                let l = gameboard[row+1][col-1];
                let lVal = cVal;
                if (l != '.') {
                    lVal = lVal + parseInt(l);
                }
                gameboard[row+1][col-1] = lVal.toString();
                let r = gameboard[row+1][col+1];
                let rVal = cVal;
                if (r != '.') {
                    rVal = rVal + parseInt(r);
                }
                gameboard[row+1][col+1] = rVal.toString();

            }
            else {
                let s = gameboard[row+1][col];
                let sVal = cVal;
                if (s != '.') {
                    sVal = sVal + parseInt(s);
                }
                gameboard[row+1][col] = sVal.toString();
            }
        }
    }
}

// Sum up the last row
for (let c = 0; c < gameboard[gameboard.length - 1].length; c++) {
    let v = gameboard[gameboard.length - 1][c];
    if ((v != '.') && (v != '^')) {
        part2 += parseInt(v);
    }
}

//outputGameBoard();

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);

function outputGameBoard() {
    for (let r = 0; r < gameboard.length; r++) {
        let s = "";
        for (let c = 0; c < gameboard[r].length; c++)
        {
            s += gameboard[r][c];
        }
        console.log(s);
    }
}