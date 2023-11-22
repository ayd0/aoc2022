const fs = require("fs");

const data = fs.readFileSync(process.argv[2], "utf-8").split('\n');
data.pop();

const h = data[0].length;
const v = data.length;

console.log(data);

// UDLR -> 0124
const cardMap = [[],[],[],[]];

// Horizontal Map
for (let i = 0; i < h; ++i) {

}

// Vertical Map
for (let i = 0; i < v; ++i) {

}

/*
    * TODO:
    * For each row and column,
    * for each cardinal direction (UDLR),
    * find the first iteration of the largest number in the set
    * record this number, when all have been recorded confirm number of visible trees by subtracting invisible trees
    * */

const firstLargest = Math.max(...data[0].split('').map(e => +e));
const firstLargestIdx = data[0].indexOf(firstLargest);

if (firstLargestIdx < data[0].length / 2 ) {
    let d = data[0].slice(firstLargestIdx + 1, data[0].length - 1);
    d = d.split('').reverse();
    const secondLargest = Math.max(...d);
    const secondLargestIdx = d.map(e => +e).indexOf(secondLargest);
} else if (firstLargestIdx > data[0].length / 2) {

} else {
    // all are visible
}
