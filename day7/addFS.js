const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

const dir = [];
let currDir = [0];

const parseTree = () => {
    let pseudo = dir;
    currDir.forEach(el => {
        if (el !== 0) {
            pseudo = pseudo[el - 1];
        }
    })
    return pseudo;
}

data.some(cmd => {
    try {
        if (cmd[0] === '$') {
            if (cmd[2] === 'c') {
                if (cmd[5] === '/') {
                    currDir = [0];
                } else if (cmd[5] === '.') {
                    currDir.pop();
                } else {
                    currDir.push(0);
                }
            }
        } else if (cmd[0] === 'd') {
            // parse currDir
            parseTree().unshift([]);
            currDir[currDir.length - 1]++; // unshifted
            currDir.push(0);
        } else {
            parseTree().push(Number(cmd.match(/\d+/)));
        }
    } catch (err) {
        console.error(err);
        console.log("LAST", cmd, currDir);
        console.log("DIR", dir);
        return true;
    } 
    return false;
})

const recursiveDirDown = (el, idx) => {
    ++idx;
    console.log(el);
    if (Array.isArray(el)) {
        recursiveDirDown(el[0], idx);
    } else {
        console.log("Last iteration: ", idx);
    }    
}

dir.forEach(el => {
    recursiveDirDown(el, 0);
});
