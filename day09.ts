import * as fs from 'fs';

var lines = fs.readFileSync("day09.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

part1 = doPart1();

part2 = doPart2();

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);

function doPart1() {
    let points = Array<[number, number]>();
    let part1 = 0;
    lines.forEach((line) => {
        let l = line.split(',');
        points.push([parseInt(l[0]), parseInt(l[1])]);
    });

    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let p1 = points[i];
            let p2 = points[j];

            let area = Math.abs(p1[0] - p2[0] + 1) * Math.abs(p1[1] - p2[1] + 1);
            //console.log("Comparing " + p1 + " with " + p2 + " gives area " + area);
            part1 = Math.max(area, part1);
        }
    }
    return part1;
}

function doPart2() {
    let points = Array<[number, number]>();
    let edgeLines = Array<[number, number, number, number]>();

    let part2 = 0;
    let prevPos: [number, number] | undefined = undefined;
    let firstPos: [number, number] | undefined = undefined;
    lines.forEach((line) => {
        let l = line.split(',');
        let pos: [number, number] = [parseInt(l[0]), parseInt(l[1])];
        if (firstPos == null) { firstPos = pos; }
        points.push(pos);
        if (prevPos) {
            edgeLines.push([prevPos[0], prevPos[1], pos[0], pos[1]]);
        }
        prevPos = pos;
    });
    // Add the wrapping line
    if (prevPos && firstPos) { edgeLines.push([prevPos[0], prevPos[1], firstPos[0], firstPos[1]]) };

    //console.log(edgeLines);

    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let p1 = points[i];
            let p2 = points[j];

            let l1 = Math.min(p1[0], p2[0]);
            let r1 = Math.max(p1[0], p2[0]);
            let t1 = Math.min(p1[1], p2[1]);
            let b1 = Math.max(p1[1], p2[1]);

            let area = (r1 - l1 + 1) * (b1 - t1 + 1);

            let intersects = false;

            // Does this area cross any line?
            for (let i in edgeLines) {
                let edgeLine = edgeLines[i];
                let l2 = Math.min(edgeLine[0], edgeLine[2]);
                let r2 = Math.max(edgeLine[0], edgeLine[2]);
                let t2 = Math.min(edgeLine[1], edgeLine[3]);
                let b2 = Math.max(edgeLine[1], edgeLine[3]);

                if ((l1 < r2) && (r1 > l2) && (t1 < b2) && (b1 > t2)) {
                    //console.log("Intersects");
                    intersects = true;
                    break;
                }
            }

            if (!intersects) {
                part2 = Math.max(area, part2);
            }
        }
    }
    return part2;
}

