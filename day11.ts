import * as fs from 'fs';

var lines = fs.readFileSync("day11.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

var map = new Map<string, Array<string>>();
var memo = new Map<string,number>();

lines.forEach((line) => {
    let split = line.split(':');

    let t = split[1].split(' ');
    let outputs = new Array<string>();
    t.forEach((x) => {
        if (x != '') {
            outputs.push(x);
        }
    })
    map.set(split[0], outputs);
});

part1 = doPart1();
part2 = doPart2();

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);


// BFS
function doPart1(): number {

    let result = 0;

    let q = new Array<string>();
    q.push('you');

    while (true) {
        let entry = q.pop();

        if (!entry) {
            break;
        }

        if (entry == 'out') {
            result++;
        }

        let n = map.get(entry);
        if (n) {
            n.forEach((x) => q.push(x));
        }
    }

    return result;
}

// Recursion with memo
function doPart2(): number {

    let result = countRoutes('svr',false,false);

    return result;
}

function countRoutes(name, hasDac, hasFft) : number
{
    let cache = memo.get(name + hasDac + hasFft);
    if (cache != undefined) {
        return cache;
    }

    // 0 case
    if (name == 'out')
    {
        return (hasDac && hasFft)?1 : 0;
    }

    // Otherwise recurse
    let v = 0;
    let entry = map.get(name);
    if (entry) {
        entry.forEach((x) => {
            let newHasDac = hasDac?hasDac:(x=='dac');
            let newHasFft = hasFft?hasFft:(x=='fft');
            v += countRoutes(x,newHasDac,newHasFft);
        });
    }
    else {
        console.log("PANIC! " + name);
    }

    //console.log("Adding " + v + " to " + name);
    memo.set(name + hasDac + hasFft, v);
    return v;
}
