import * as fs from 'fs';
import { Model, Constraint, Coefficients, solve } from 'yalps';

var lines = fs.readFileSync("day10.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

let re = /^\[([.#]+)\] ((\([\d,]+\) ?)+){([\d,]+)}/

lines.forEach((line) => {
    let r = re.exec(line);

    if (r) {
        let lightDiagram = r[1];
        let buttons = r[2];
        let joltageDiagram = r[4];
        let presses = buttons.split(' ');
        let buttonPresses: number[][] = [];
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
    
    console.log(buttons);
    let constraints: Map<string, Constraint> = new Map();
    
    let joltages = joltageDiagram.split(',');
    for (let i = 0; i < joltages.length; i++) {
        let thisJoltage = parseInt(joltages[i]);
        let constraint: Constraint = {
            equal: thisJoltage
        }
        constraints.set("j"+i.toString(), constraint);
    }

    let variables: Map<string,Coefficients<string>> = new Map();
    for (let i = 0; i < buttons.length; i++) {
        let b = new Map<string, number>();
        for (let j = 0; j < buttons[i].length; j++)
        {
            b.set("j" + buttons[i][j].toString(), 1);

        }
        variables.set("b"+i.toString(), b);
    }
    
    const model:Model = {
        direction:"maximize",
        constraints,
        variables,
        integers=true
    }

    console.log(constraints);
    console.log(variables);

    let returnValue = solve(model)
    console.log(returnValue);
    
    let part2 = 0;
    returnValue.variables.forEach((s,n) => {part2 += s[1]});

    console.log(part2);
    return part2;
}


function solvePart2Gaussian(joltageDiagram: string, buttons: number[][]): number {

    // This feels like a series of simultaneous equations
    // In order to get the first joltage correct, there are a series of buttons which increase that joltage, so we have to press one of those buttons that many times
    // Then to get the second joltage correct, the same applies, there are a series of buttons that we have to press, which may overlap with the first set of buttons
    // So eventually we'll arrive at:
    // (b1 + b3 + b4) = j1
    // (b3 + b4 + b7 + b9) = j2
    // etc.

    // Which we should be able to solve using a matrix and Gaussian elimination as long as we have enough

    // But we may not have enough answers to remove all the variables
    // So we need to do some sort of search

    let solvingArray: number[][] = [];
    let targetJoltage: number[] = [];

    let joltages = joltageDiagram.split(',');
    for (let i = 0; i < joltages.length; i++) {
        let thisJoltage = parseInt(joltages[i]);
        targetJoltage.push(thisJoltage);

        let buttonPresses: number[] = [];
        // Now see which buttons we need to press that increases this joltage
        buttons.forEach((button) => {
            if (button.includes(i)) {
                buttonPresses.push(1);
            }
            else {
                buttonPresses.push(0);
            }
        });

        solvingArray.push(buttonPresses);
    };

    //console.log(solvingArray);
    //console.log(targetJoltage);

    // Simplify our array as much as we can
    let simplifiedArray = simplifyArray(solvingArray, targetJoltage)

    return 0;
}

function simplifyArray(solvingArray: number[][], targetJoltage: number[]) {

    // Make the array square and then put the target joltage on the right
    while (solvingArray.length > solvingArray[0].length) {
        for (let n = 0; n < solvingArray.length; n++) {
            solvingArray[n].push(0);
        }
    }

    while (solvingArray.length < solvingArray[0].length) {
        let newRow: number[] = new Array(solvingArray[0].length).fill(0);
        solvingArray.push(newRow);
    }

    for (let n = 0; n < solvingArray.length; n++) {
        if (n < targetJoltage.length) {
            solvingArray[n].push(targetJoltage[n]);
        }
        else {
            solvingArray[n].push(0);
        }
    }

    outputArray(solvingArray);


    for (let workingRowColumn = 0; workingRowColumn < solvingArray.length; workingRowColumn++) {
        // Put a 1 on the "top" row of this column
        // Find the first non-zero row
        let newTopRow = -1;
        for (let row = workingRowColumn; row < solvingArray.length; row++) {
            if (solvingArray[row][workingRowColumn] != 0) {
                newTopRow = row;
                break;
            }
        }
        // Swap these two rows
        if (newTopRow == -1) {
            continue;
        }
        else if (newTopRow != workingRowColumn) {
            let oldRow = solvingArray[workingRowColumn];
            solvingArray[workingRowColumn] = solvingArray[newTopRow];
            solvingArray[newTopRow] = oldRow;
        }

        // Subtract the "top" row from all other rows
        for (let row = workingRowColumn + 1; row < solvingArray.length; row++) {
            if (solvingArray[row][workingRowColumn] != 0) {
                for (let tc = 0; tc < solvingArray[row].length; tc++) {
                    solvingArray[row][tc] = solvingArray[row][tc] - solvingArray[workingRowColumn][tc];
                }
            }
        }
        outputArray(solvingArray);
    }

    outputArray(solvingArray);

    return solvingArray;
}

function outputArray(arr: number[][]) {

    let str = '';
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            str += arr[i][j] + " ";
        }
        str += '\r\n';
    }
    console.log(str);
}