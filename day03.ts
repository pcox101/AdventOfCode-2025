import * as fs from 'fs';
let lines = fs.readFileSync("day03.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

// Let's brute force part 1...
for (let line in lines) {
    let maxVal = 0;
    for (let c1 = 0; c1 < lines[line].length - 1; c1++) {
        for (let c2 = c1 + 1; c2 < lines[line].length; c2++) {
            let val = parseInt(lines[line].charAt(c1) + lines[line].charAt(c2));
            maxVal = Math.max(val, maxVal);
        }
    }
    //console.log(maxVal);
    part1 += maxVal;
}

console.log("Part 1: " + part1);

for (let x in lines) {
    let number = "";
    let line = lines[x];

    let posOfPreviousNumber = -1;

    // How many numbers to find?
    let n = 12;
    for (let i = 0; i < n; i++) {
        let maxFound = 0;
        // Start at the end - number we're finding
        // finish at the pos of the previous number
        let start = line.length - (n - i);
        let end = posOfPreviousNumber;
        //console.log("Start " + start + " end " + end);
        for (let c = start; c > end; c--) {
            let v = parseInt(line.charAt(c));
            if (v >= maxFound) {
                maxFound = v;
                posOfPreviousNumber = c;
                //console.log("Found new high: " + maxFound);
            }
        }
        number = number + maxFound;
    }
    //console.log(number);
    part2 = part2 + parseInt(number);
}

console.log("Part 2: " + part2);