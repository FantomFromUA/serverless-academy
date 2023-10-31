const fs = require('fs');
const readline = require('readline');

const namesCount = {}
var uniqueValues = 0;
var existInAllFiles = 0;
var existInAtleastTen = 0;

async function count(){
    for(let i = 0; i<20; i++){
        const fileNames = {};
        const fileStream = fs.createReadStream(`./files/out${i}.txt`);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            if(fileNames[line]){
                continue;
            }

            if(!namesCount[line]){
                namesCount[line] = 1;
                fileNames[line] = 1;
                uniqueValues++;
                continue;
            }

            fileNames[line] = 1;
            namesCount[line]++;
            let val = namesCount[line];
            if(val === 10) {
                existInAtleastTen++;
                continue;
            }
            if(val === 20) existInAllFiles++;
        }
    }
}

function getUniqueValues(){
    return uniqueValues;
}

function getExistInAllFiles(){
    return existInAllFiles;
}

function getExistInAtleastTen(){
    return existInAtleastTen;
}

async function start(){
    await count();
    console.log(`Unique values in all -> ${getUniqueValues()}`);
    console.log(`Values present in every file -> ${getExistInAllFiles()}`);
    console.log(`Values present in at least 10 files -> ${getExistInAtleastTen()}`);
    console.timeEnd("elapsed");
}

console.time("elapsed");
start()