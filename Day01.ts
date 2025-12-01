import * as fs from 'fs';
let lines = fs.readFileSync("day01.txt", "utf-8").split('\r\n')

let position = 50;

let part1 = 0;
let part2 = 0;
let wasZero = false;
let wrappedInFromRight = false;

for (let line in lines) {
    let lOrR = lines[line][0];
    let rots = parseInt(lines[line].slice(1));

    if (lOrR == 'R') {
        position = position + rots;
    }
    else {
        position = position - rots;
    }

    while (position < 0) {
        position = position + 100;
        if (!wasZero) {
            part2 = part2 + 1;
        }
        wasZero = false;
    }
    while (position > 99) {
        position = position - 100;
        part2 = part2 + 1;
        wrappedInFromRight = true;
    }

    if (position == 0) {
        part1 = part1 + 1
        if (!wrappedInFromRight) {
            part2 = part2 + 1
        }
        wasZero = true;
    }
    else
    {
        wasZero = false;
    }
    wrappedInFromRight = false;
    //console.log(rots + ":" + position);
    //console.log(part2);
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);