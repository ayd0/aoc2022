const fs = require('fs');

let total = 0;
let data = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

const convertAlphaVal = (el) => {
    if (el === el.toLowerCase()) {
        return el.charCodeAt(0) - 96
    } else {
        return el.charCodeAt(0) - 38;
    }
}

// sorts split rucksacks
const splitSort = () => {
    // map data as sets of halves: [a, b]
    data = data.map(set => [set.slice(0, set.length / 2).split(''), set.slice(set.length / 2, set.length).split('')]);

    data.forEach((set, idx) => {
        if (set[0].length === 0 || set[1].length === 0) return;
        let doop;

        // get duplicate value
        set[0].every(el => {
            if (set[1].includes(el)) {
                doop = el;
                return false;
            }
            return true;
        })

        total += convertAlphaVal(doop);
    })
}

// sorts triples of rucksacks
const tripSort = () => {
    const dataSplit = [[]];

    data.forEach((set, idx) => {
        const splitIdx = Math.floor(idx / 3);
        if (idx !== 0 && idx % 3 === 0) {
            dataSplit.push([set]);
        } else {
            dataSplit[splitIdx].push(set);
        }
    }) 

    dataSplit.forEach((set, idx) => {
        if (set.length > 2) {
            set.sort((a, b) => b.length - a.length);
            dataSplit[idx] = set.map(el => el.split(''));
            dataSplit[idx][0].every(el => {
                if (dataSplit[idx][1].includes(el)) {
                    if (dataSplit[idx][2].includes(el)) {
                        console.log(idx);
                        total += convertAlphaVal(el);
                        return false;
                    }
                }
                return true;
            })
        } 
    })
}

process.argv[3] == 1 ? splitSort() : tripSort();

console.log(total);
