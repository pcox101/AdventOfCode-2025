import * as fs from 'fs';
let lines = fs.readFileSync("Day01.txt","utf-8").split('\r\n')

let l1:number[] = [], l2:number [] = [];

for (let line in lines) {
   let l = lines[line].split('   ');
   l1.push(parseInt(l[0]));
   l2.push(parseInt(l[1]));
}

l1.sort();
l2.sort();

let total = 0;

for (let n in l1) {
    total = total + (Math.abs(l1[n] - l2[n]));
}

console.log(total);
