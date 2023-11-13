const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf-8').split('\n');
const rawStack = data.slice(0, data.indexOf(''));
const moveRequests = data.slice(data.indexOf('') + 1, data.length - 1);
const numCrates = (rawStack[0].length + 1) / 4;
const vertStack = [];


/*  GENERATE INITIAL STACK  */

for (let i = 0; i < numCrates; ++i) vertStack.push([]);

rawStack.forEach((row, i) => row.split('').every((el, j) => {
    if (i === rawStack.length - 1) return false;

    if ((j + 1) % 2 === 0 && el !== ' ') {
        vertStack[(j - 1) / 4].push(el);
    }
    return true;
}))

vertStack.map(el => el.reverse());


/*  PROCESS MOVE REQUESTS   */

const arrangeByStep = (vertStack, reqMap) => {
    for (let i = 0; i < reqMap[0]; ++i) {
        vertStack[reqMap[2] - 1].push(vertStack[reqMap[1] - 1].pop());        
    }
}

const arrangeByShift = (vertStack, reqMap) => {
    const arr = vertStack[reqMap[1] - 1].splice(vertStack[reqMap[1] - 1].length - reqMap[0], reqMap[0]);
    vertStack[reqMap[2] - 1] = [...vertStack[reqMap[2] - 1], ...arr];
}

let ctrlFlow = process.argv[3] == 1 ? arrangeByStep : arrangeByShift;

moveRequests.forEach(req => {
    const reqMap = req.match(/\d+/g).map(Number);
    ctrlFlow(vertStack, reqMap);
})

let results = '';
vertStack.forEach((el, idx) => results += el[vertStack[idx].length - 1]);
console.log(results);
