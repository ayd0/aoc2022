const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8').split('\n');

const vCons = ['CX', 'AY', 'BZ'];
const dCons = ['AX', 'BY', 'CZ'];
const lCons = ['BX', 'CY', 'AZ'];

let points = 0;

const rps1 = () => {
    data.forEach(round => {
        points += round[2] === 'X' ? 1 : round[2] == 'Y' ? 2 : 3;

        let play = `${round[0]}${round[2]}`;

        if (vCons.includes(play)) {
            points += 6;    
        } else if (dCons.includes(play)) {
            points += 3;
        }
    })
}

const rps2 = () => {
    data.forEach(round => {
        if (round !== undefined && round !== '') {
            points += round[2] == 'X' ? 0 : round[2] == 'Y' ? 3 : 6;
            
            const cons = round[2] === 'X' ? lCons : round[2] === 'Y' ? dCons : vCons;
            const hand = cons[cons.indexOf(cons.find(con => con[0] === round[0]))];
            console.log(`${round} -> ${hand}`);

            points += hand[1] === 'X' ? 1 : hand[1] === 'Y' ? 2 : 3;
        }
    })
}

process.argv[3] === 1 ? rps1() : rps2();

console.log(points);
