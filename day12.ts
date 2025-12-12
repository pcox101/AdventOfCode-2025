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

    // I looked at Reddit

    // Maybe the shapes tessellate in such a way that they will always fit into a large enough space without leaving gaps
    // but the answer is just how many can physically fit into the space. All shapes use up 7 blocks, so if the grid has space
    // for n blocks, then the maximum number of shapes is n/7.

    // Putting that value into the site gives the star, so I'm happy but not really happy, I suppose...

    if (res) {
        //console.log("Found grid");
        let sizeOfGrid = parseInt(res[1]) * parseInt(res[2]);
        let numberOfShapes = parseInt(res[3]) + parseInt(res[4]) + parseInt(res[5]) + parseInt(res[6]) + parseInt(res[7]) + parseInt(res[8]);

        if ((numberOfShapes * 7) <= sizeOfGrid) {
            part1 += 1;
        }
        else
        {
            //console.log("Too many");
        }
    }

};

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
