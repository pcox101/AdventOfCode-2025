import * as fs from 'fs';
import {Interval, IntervalTree} from 'node-interval-tree';

let lines = fs.readFileSync("day05.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

let tree = new IntervalTree();

let inRange = true;
for (let row in lines) {
    let line = lines[row];

    if (line == '') {
        inRange = false;
        continue;
    }

    if (inRange) {
        let thisRange = line.split('-');
        let s1 = parseInt(thisRange[0]);
        let s2 = parseInt(thisRange[1]);
        
        let e = tree.search(s1,s2);
        if (e.length > 0)
        {
            let min = s1;
            let max = s2;
            e.forEach((s) => {
                min = Math.min(s.low,min);
                max = Math.max(s.high,max);
                tree.remove(s);
            });
            tree.insert({low: min,high: max});
        }
        else
        {
            tree.insert({low: s1,high: s2});
        }
    }
    else {
        let i = parseInt(line);
        let s = tree.search(i,i);
        if (s.length > 0) {
            part1 += 1;
        }
    }
}

let items = tree.inOrder();

let s = items.next();
while (s.value != undefined) {
    part2 = part2 + (s.value.high - s.value.low) + 1;
    s = items.next();
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
