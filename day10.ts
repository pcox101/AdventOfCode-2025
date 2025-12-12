import * as fs from 'fs';
import initHighs from 'highs'

var lines = fs.readFileSync("day10.txt", "utf-8").split('\r\n')

const highs = await initHighs();

let part1 = 0;
let part2 = 0;

const re = /^\[([.#]+)\] ((\([\d,]+\) ?)+){([\d,]+)}/

lines.forEach((line) => {
    const r = re.exec(line);

    if (r) {
        const lightDiagram = r[1];
        const buttons = r[2];
        const joltageDiagram = r[4];
        const presses = buttons.split(' ');
        const buttonPresses: number[][] = [];
        presses.forEach((press) => {
            if (press != '') {
                let lit: number[] = [];
                press.slice(1, press.length - 1).split(',').forEach((n) => lit.push(parseInt(n)));
                buttonPresses.push(lit);
            }
        });

        part1 += solvePart1(lightDiagram, buttonPresses);
        part2 += solvePart2(joltageDiagram, buttonPresses);
    }

});

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);

function solvePart1(lightDiagram: string, buttons: number[][]): number {

    // Convert the lightboard from # notation to binary
    let lightBoard: number = 0;
    for (let i = 0; i < lightDiagram.length; i++) {
        if (lightDiagram.charAt(i) == '#') {
            lightBoard += Math.pow(2, lightDiagram.length - i - 1);
        }
    }

    // bfs through the possible button presses...
    let visited = new Set<number>();
    let q: number[][] = [];

    let result = 0;

    q.push([0, 0]);
    while (true) {
        let entry = q.shift();
        if (entry) {
            if (entry[0] == lightBoard) {
                result = entry[1];
                break;
            }

            let newCount = entry[1] + 1;
            buttons.forEach((button) => {
                let newBoard = entry[0];
                button.forEach((flipper) => {
                    newBoard ^= Math.pow(2, lightDiagram.length - flipper - 1);
                });
                if (!visited.has(newBoard)) {
                    //console.log("Button " + button + " to " + entry[0] + " gives " + newBoard);
                    q.push([newBoard, newCount]);
                    visited.add(newBoard);
                }
            });
        }
        else {
            break;
        }
    }

    return result;
}

function solvePart2(joltageDiagram: string, buttons: number[][]): number {

    let objective = '';
    let bounds = '';
    let integers = '';

    let b = new Map<string, string[]>();

    for (let i = 0; i < buttons.length; i++) {
        objective=objective+'b'+i + '+';
        bounds = bounds.concat('b'+i + ' >= 0\r\n');
        integers = integers.concat('b'+i + ' ');

        for (let j = 0; j < buttons[i].length; j++)
        {
            let k = "j" + buttons[i][j].toString();
            let v = b.get(k);
            if (!v)
            {
                v = new Array<string>('b'+i);
                b.set(k, v);
            }
            else
            {
                v.push('b'+i);
            }
        }
    }
    objective = objective.slice(0, objective.length - 1);
    bounds = bounds.slice(0,bounds.length-2);
    integers = integers.slice(0, integers.length - 1);

    let constraints = '';
    let joltages = joltageDiagram.split(',');
    for (let i = 0; i < joltages.length; i++) {
        let thisJoltage = parseInt(joltages[i]);
        
        constraints += 'j'+i+': ';

        let v = b.get('j'+i);
        if (v) {
            v.forEach((x) => { constraints += x + '+'})
        }
        constraints = constraints.slice(0,constraints.length-1);
        constraints += ' = ' + thisJoltage;
        constraints += '\r\n';
    }
    constraints = constraints.slice(0,constraints.length-2);
    
    const PROBLEM = `Minimize
obj: ` + objective + `
Subject To
` + constraints + `
Bounds 
` + bounds + `
Integer
` + integers + `
End`;

    const sol = highs.solve(PROBLEM);
    //console.log(sol);

    let part2 = sol.ObjectiveValue;

    //console.log(part2);
    return part2;
}
