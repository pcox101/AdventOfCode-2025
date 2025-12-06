import * as fs from 'fs';

var lines = fs.readFileSync("day06.txt", "utf-8").split('\r\n')

let part1 = part1function();

// Part 2 involves parsing completely differently...
let part2 = part2function();

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);


function part1function() {
    let allNumbers: number[][] = [];

    let part1 = 0;
    let re1 = /(\d+)/g;
    let re2 = /([*|+])/g;
    lines.forEach((line) => {
        let c = 0;
        let r: RegExpExecArray | null;

        let numbers: number[] = [];
        do {
            r = re1.exec(line);
            if (r) {
                numbers.push(parseInt(r[0]));
                c++;
            }
        } while (r);

        if (c > 0) {
            allNumbers.push(numbers);
        }
        else {
            let c = 0;
            do {
                r = re2.exec(line);
                let v = 0;
                if (r) {
                    if (r[0] == '*') {
                        v = 1;
                    }
                    else {
                        v = 0;
                    }
                    allNumbers.forEach((n) => {
                        if (r[0] == '*') {
                            v = v * n[c];
                        }
                        else {
                            v = v + n[c];
                        }
                    });
                    c++;
                }
                part1 += v;
            } while (r);
        }
    });
    return part1;
}

function part2function() {
    let gameboard: string[][] = [];
    
    let part2 = 0;
    for (let row in lines) {
        let line = lines[row];
        gameboard[row] = [];
        for (let col = 0; col < line.length; col++) {
            gameboard[row][col] = line.charAt(col);
        }
    }

    // Now, start at the right hand edge...
    let currentVals:string[] = [];
    for (let col = gameboard[0].length - 1; col >= 0; col--) {
        let res = '';
        for (let row = 0; row < gameboard.length - 1; row++) {
            let c = gameboard[row][col];
            if (c != ' ') {
                res += c;
            }
        }
        if (res != '') {
            currentVals.push(res); 
        }

        // Does this column contain an operator?
        let op = gameboard[gameboard.length - 1][col];
        if (op == "*") {
            let v = 1;
            currentVals.forEach((x) => {
                v = v * parseInt(x);
            });
            currentVals = [];
            part2 += v;
        }
        else if (op == "+") {
            let v = 0;
            currentVals.forEach((x) => {
                v = v + parseInt(x);
            });
            currentVals = [];
            part2 += v;
        }
    }

    return part2;
}

function createEmptyNumbers(gameboard): string[]
{
    let a = new Array(gameboard.length - 1);
    for (let x = 0; x < gameboard.length - 1; x++){
        a[x] = '';
    }
    return a;
}