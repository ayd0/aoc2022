const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

if (process.argv[3] == 1) {
    let numFiles = 0;
    let numDirs = 0;

    data.forEach(el => {
        if (+el[0] > 0) {
            // only strings which typecast to real numbers can be > 0 || < 0
            numFiles++;
        } else if (el[0] === 'd') {
            numDirs++;
        }
    })

    console.log("Number of files: ", numFiles);
    console.log("Number of dirs: ", numDirs);
} else {
    /*
        * dir structure by idx:
        * 0 - dirName
        * 1 - cumulative file size
        * 2 - subDirs
        *   *- if subDirs is empty, path should be 0!
        */

    const dir = ['/', 0, []];
    let path = [0];

    const getCurDir = (ovPath, total) => {
        // override path
        if (ovPath === undefined) ovPath = path;
        let pseudo = dir;

        ovPath.forEach((seq, idx) => {
            // arg for incrementFileSizes(), adds total up stack to fs
            if (total !== undefined && idx !== path.length) pseudo[1] += total;

            if (seq > 0) {
                // should only be selecting index 0 when home is empty
                pseudo = pseudo[2][seq - 1];
            } else {
                return pseudo;
            }
        }) 

        return pseudo;
    }

    const getLastDirName = () => {
        if (getCurDir()[0] !== '/') {
            let ovPath = path.slice().pop();
            return getCurDir(ovPath)[0];
        } else {
            return '/';
        }
    }

    const mkdir = (name) => {
        getCurDir()[2].push([getLastDirName() + name, 0, []]);
    }

    const incrementFileSizes = () => {
        // in FIRST pass, only write to getCurDir[1] if it's EQUAL to 0 
        // similarly, only write up stack when getCurDir[1] is EQUAL to 0
        
        let total = 0;
        if (getCurDir()[1] === 0) { 
            if (getCurDir().length > 3) { 
                getCurDir().slice(3).forEach(num => total += num);
                getCurDir()[1] = total;
            }
            // TODO: increment total up stack
            getCurDir(undefined, total)
        }
    }

    data.some(cmd => {
        try {
            if (cmd[0] === '$') {
                if (cmd[2] === 'c') {
                    // handle file sizes on directory change
                    incrementFileSizes();

                    // process cd command
                    if (cmd[5] === '/') {
                        // rooot
                        path = [0];
                    } else if (cmd[5] === '.') {
                        // up
                        path.pop();                    
                    } else {
                        // down: name
                        const dirName = cmd.slice(5);
                        let idx;
                        // [].indexOf not working in this case, hacky implementation
                        getCurDir()[2].some((el, i) => {
                            if (el[0].slice(el[0].length - dirName.length) === dirName) {
                                idx = i;
                                return true;
                            }
                            return false;
                        });
                        path[path.length - 1] += idx + 1;
                        path.push(0);
                    }
                }
            } else if (cmd[0] === 'd') {
                // check if dir(name) exists and if not, create dir
                const dirName = cmd.slice(4);

                const idx = getCurDir()[2].indexOf(el => el[0] === dirName);
                if (idx === -1) {
                    // create dir
                    mkdir(dirName);
                }
            } else if (+cmd[0] >= 0) {
                // cmd[0] is real num
                getCurDir().push(Number(cmd.match(/\d+/)));
            }
        } catch (err) {
            console.error(err);
            console.log("ERROR: DIR  >", typeof dir, dir);
            console.log("ERROR: PATH >", typeof path, path);
            console.log("ERROR: CMD  >", typeof cmd, cmd);
            return true;
        }
        return false;
    })
    // last pass w/o cd
    incrementFileSizes();

    console.log("DIR", dir);
    console.log("PATH", path);
}
