const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

if (process.argv[3] == 1) {
    let numFiles = 0;
    let numDirs = 0;

    data.forEach(el => {
        if (+el[0] > 0 || +el[0] < 0) {
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

    const getCurDir = (ovPath) => {
        // override path
        if (ovPath === undefined) ovPath = path;
        console.log(Array.isArray(ovPath), ovPath);
        let pseudo = dir;

        ovPath.forEach(seq => {
            // should only be selecting index 0 when home is empty
            if (seq > 0) {
                pseudo = pseudo[2][seq - 1];
            } else {
                return pseudo;
            }
        }) 

        return pseudo;
    }

    const getLastDirName = () => {
        if (getCurDir[0] !== '/') {
            // Path ERROR is HERE
            let ovPath = path.slice().pop();

            return getCurDir(ovPath)[0];
        } else {
            return '/';
        }
    }

    const mkdir = (name) => {
        getCurDir()[2].push([getLastDirName() + name, 0, []]);
    }

    data.some(cmd => {
        try {
            if (cmd[0] === '$') {
                if (cmd[2] === 'c') {
                    if (cmd[5] === '/') {
                        // rooot
                        path = [0];
                    } else if (cmd[5] === '.') {
                        // up
                        path.pop();                    
                    } else {
                        // down: name
                        const dirName = cmd.slice(5);
                        console.log('GRABBIN DIR NAME', dirName);
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
                // ONLY WRITE TO getCurDir[1] IF IT'S EQUAL TO 0
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
    console.log("DIR", dir);
    console.log("PATH", path);
}
