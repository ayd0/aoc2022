const fs = require('fs');
let data;

try {
    data = fs.readFileSync(process.argv[2], 'utf8');
} catch (err) {
    console.error('Error reading input file: ', err);
}

let dataParsed = [];
data = data.split('\n');

data.forEach(item => {
    if (item === '') {
        dataParsed.push(0);
    } else {
        dataParsed[dataParsed.length - 1] += parseInt(item);
    }
});

const topThree = [];
for (let i = 0; i < 3; ++i) {
    let idx = dataParsed.indexOf(Math.max(...dataParsed));
    topThree.push(dataParsed[idx]);
    dataParsed.splice(idx, 1);
}

console.log(topThree.reduce((acc, cur) => acc + cur, 0));
