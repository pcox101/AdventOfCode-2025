import * as fs from 'fs';

var lines = fs.readFileSync("day12.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

// Shape start
let ss = /^(\d+):$/
// Grid
let g = /^(\d+)x(\d+): (\d+) (\d+) (\d+) (\d+) (\d+) (\d+)$/

let shapes:number[][][] = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    let res = g.exec(line);
    
    // When I first saw this puzzle my heart dropped. I thought I would have to write very complicated flipping/rotating code
    // and then build some sort of BFS to recursively test each possible combination.
    
    // I didn't even start.

    // I looked at Reddit.

    // I've been trolled.

    // I don't like these puzzles, but there are basically 3 cases:
    // . Ones where the pieces can't fit because there physically isn't enough space for them
    // .. All the shapes use 7 blocks, so if the whole area is smaller than n*7 (where n is the number of shapes we need to fit) then
    // .. it will never fit
    // . Ones where the pieces will always fit without any overlap
    // .. The shapes are all 3x3 so if the whole area is greater than n*9 (where n is the number of shapes we need to fit) then
    // .. it will always fit
    // . The cases in the middle where some overlap is required

    // We will work these two numbers out...
    
    if (res) {
        //console.log("Found grid");
        let sizeOfGrid = parseInt(res[1]) * parseInt(res[2]);
        let numberOfShapes = parseInt(res[3]) + parseInt(res[4]) + parseInt(res[5]) + parseInt(res[6]) + parseInt(res[7]) + parseInt(res[8]);

        if ((numberOfShapes * 7) <= sizeOfGrid) {
            // Will never fit, no need to even check
            part1 += 1;
        }
        else if ((numberOfShapes * 9) >= sizeOfGrid) {
            // Will always fit, no need to move the shapes around
        }
        else
        {
            console.log("PANIC!");
            // TODO: Write very complicated flipping and rotating code here
        }
    }

};

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
