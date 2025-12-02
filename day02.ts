import * as fs from 'fs';
let lines = fs.readFileSync("day02.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

let allRanges: string[] = [];

// one line
let ranges = lines[0].split(',')

for (let range in ranges) {
    let split = ranges[range].split('-');

    for (let i = parseInt(split[0]); i <= parseInt(split[1]); i++) {
        allRanges.push(i.toString());
    }
}

// Loop through all the possible keys seeing which pattern it matches
let p1 = /^([(\d)]+)\1$/
let p2 = /^([(\d)]+)\1+$/

for (let k in allRanges) {
    let key = allRanges[k];
    if (p1.test(key)) {
        part1 += parseInt(key);
    }
    if (p2.test(key)) {
        part2 += parseInt(key);
    }
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);