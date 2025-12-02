import * as fs from 'fs';
let lines = fs.readFileSync("day02.txt", "utf-8").split('\r\n')

let part1 = new Set<number>();
let part2 = new Set<number>();

let allRanges: [number, number][] = [];

// one line
let ranges = lines[0].split(',')

let topTopRange = 0

for (let range in ranges) {
    let split = ranges[range].split('-');
    let thisRange: [number, number] = [parseInt(split[0]), parseInt(split[1])];
    allRanges.push(thisRange);
    topTopRange = Math.max(thisRange[1], topTopRange);
}

// Loop through all the possible keys checking against each range
let counter = 1;
while (true) {
    
    let p1key = parseInt("" + counter + counter);
    if (p1key > topTopRange) {
        break;
    }
    
    let i = 2
    while (i < 100)
    {
        let keyString = "";
        for (let j = 0; j < i; j++) {
            keyString = keyString + counter;
        }

        let key = parseInt(keyString);
        if (key > topTopRange) {
            break;
        }

        for (let r in allRanges) {
            let tr = allRanges[r];
            if (key >= (tr[0]) && key <= (tr[1])) {
                part2.add(key);
                if (i == 2)
                {
                    part1.add(key);
                }
            }
        };
        i++;
    }

    counter++;
}

let part1Total = 0;
part1.forEach((p) => part1Total = part1Total + p);
console.log("Part 1: " + part1Total);

let part2Total = 0;
part2.forEach((p) => part2Total = part2Total + p);
console.log("Part 2: " + part2Total);