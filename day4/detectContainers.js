const fs = require('fs');

// parse data to sets of strings
let data = fs.readFileSync(process.argv[2], 'utf-8')
    .split('\n')
    .map(el => el.split(','))

// convert data to pairs of integers
data = data.map(el => el.map(set => set.split('-').map(Number)));

// tracks sets where one pair contains the other
let overlaps = 0;

const checkFullyContains = () => {
    data.forEach(set => {
        if (set.length > 1) {
            if (set[0][0] <= set[1][0] &&
                set[0][1] >= set[1][1] ||
                set[1][0] <= set[0][0] &&
                set[1][1] >= set[0][1]) {
                overlaps++;
            }
        }
    })
}

const checkAnyOverlap = () => {
    data.forEach(set => {
        if (set.length > 1) {
            if (set[0][0] <= set[1][0] &&
                set[0][1] >= set[1][0] ||
                set[1][0] <= set[0][0] &&
                set[1][1] >= set[0][0]) {
                console.log(set);
                overlaps++;
            }
        }
    })
}

process.argv[3] == 1 ? checkFullyContains() : checkAnyOverlap();

console.log(overlaps);
