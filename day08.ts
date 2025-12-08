import * as fs from 'fs';

class QueueEntry {
    public Distance: number;
    public P1: number;
    public P2: number;
}

var lines = fs.readFileSync("day08.txt", "utf-8").split('\r\n')

let part1 = 0;
let part2 = 0;

let coordinates: Array<[number, number, number, number]> = [];

let map = new Map<number, Array<number>>();

for (let l = 0; l < lines.length; l++) {
    let line = lines[l];
    let splitting = line.split(',');

    let s: [number, number, number, number] = [parseInt(splitting[0]), parseInt(splitting[1]), parseInt(splitting[2]), l];
    coordinates.push(s);
    map.set(l, [l]);
};

let q = new Array<QueueEntry>();

for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
        let first = coordinates[i];
        let second = coordinates[j];

        let entry = new QueueEntry();
        entry.Distance = Math.sqrt(Math.pow(first[0] - second[0], 2) + Math.pow(first[1] - second[1], 2) + Math.pow(first[2] - second[2], 2));
        entry.P1 = i;
        entry.P2 = j;
        q.push(entry)
    }
}

q.sort((a, b) => a.Distance - b.Distance);

/* 1000 connections */
let counter = 1000;
let currentSet = 1;
let i = 0;
while (true) {
    let entry = q[i];
    let e1 = coordinates[entry.P1];
    let e2 = coordinates[entry.P2];

    let s1 = e1[3];
    let s2 = e2[3];
    //console.log("Joining " + e1 + " to " + e2);

    // Nothing to do if they are both already in the same circuit
    if (s1 != s2) {
        // Add all the entries from s2 to s1, clear s2
        let set1 = map.get(s1);
        let set2 = map.get(s2);
        if (set2 && set1) {
            set2.forEach((e) => {
                set1.push(e);
                coordinates[e][3] = s1;
            });
            map.delete(s2);
        }
        else {
            console.log("ERROR!");
        }
    }

    i++;
    if (i == counter) {
        // Now get the 3 largest circuits
        let circuits = Array<number>();
        map.forEach((e) => {
            circuits.push(e.length);
        })
        circuits.sort((a, b) => b - a);

        part1 = circuits[0] * circuits[1] * circuits[2];

        console.log("Part 1 done");
    }

    if (map.size == 1) {
        part2 = e1[0] * e2[0];
        break;
    }
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
