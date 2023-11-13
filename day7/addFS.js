const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

// eg [2342, 23434, 234334, [234234, 234234 ,234234, [234234, 2342342]],]
// NOTE: Should only shift directories into other directories, and push files, so that indices are sensible
// in JS, array assignments create references
const dir = [];

// eg '1 5 2' --> selected /d1/d5/d2
// if selected currDir is 0, it only has files, no directories
let currDir = '0';


data.forEach(cmd => {
    if (cmd[0] === '$') {
        if (cmd[2] === 'c') {
            // cd (ignore ls)
            // handle cd requests, e.g., set currDir to 0 (/)
            // push dirs if dir is named
            if (cmd[5] === '/') {
                currDir = `0`;
            } else if (cmd[5] === '..') {
                currDir[currDir.length - 1] = parseInt(currDir[currDir.length - 1] - 1);
                // --> '1 5 2' --> '1 5 1'
            } else {
                // ADD [] to selected dir
                let pseudo = dir;
                console.log(pseudo);
                currDir.split(' ').map(Number).forEach(el => pseudo = pseudo[el]);
                pseudo.push([]);

                currDir[currDir.length - 1] = parseInt(currDir[currDir.length - 1] + 1);
                currDir += " 0";
                // --> '1 5 2' --> '1 5 3 0'
            }
        }
    } else if (cmd[0] === 'd') {
        // dir
        // ignore, nothing to see here.
    } else {
        // file
        // add filesize to current dir
    }
})

console.log(dir);
