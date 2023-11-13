const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf-8');

let substr = '';
let signalIdx = 0;

for (let i = 0; i < data.length; ++i) {
    if (substr.includes(data[i])) {
        i -= (substr.length - substr.indexOf(data[i]));
        substr = '';
    } else {
        substr += data[i];
    }
    if (substr.length === 14) {
        signalIdx = i;
        break;
    }
}

console.log(signalIdx + 1)
