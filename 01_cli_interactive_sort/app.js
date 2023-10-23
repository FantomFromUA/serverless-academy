#!/usr/bin/env node

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var text = []

function question(question) {
    return new Promise((answer) => {
        rl.question(question, answer);
    });
}

function getWordsFromText(){
    let digits = [];

    text.forEach(item => {
        if(!/^[0-9]*$/.test(item)){
            digits.push(item);
        }
    });

    return digits;
}


function getDigitsFromText(){
    let words = [];

    text.forEach(item => {
        if(/^[0-9]*$/.test(item)){
            words.push(Number(item));
        }
    });

    return words;
}

async function sortWordAlphabetically(){
    let words = getWordsFromText();

    words.sort();
    console.log(words);
}

async function sortDigits(desc=false){
    let digits = getDigitsFromText();

    digits.sort();
    console.log(desc? digits.reverse(): digits);
}

async function sordByLetterQuantity(){
    let words = getWordsFromText();

    words.sort((word1, word2) => word1.length - word2.length);
    console.log(words);
}

async function uniqueWords(){
    let words = getWordsFromText();

    let unique = new Set(words);
    console.log(unique);
}

async function uniqueValues(){
    let unique = new Set(text);
    console.log(unique);
}

async function chooseSortType(){
    while(true){
        answer = await question(    'How would you like to sort values:'
                                +'\n1. Sort words alphabetically.'
                                +'\n2. Show numbers from lesser to greater.'
                                +'\n3. Show numbers from bigger to smaller.'
                                +'\n4. Display words in ascending order by number of letters in the word.'
                                +'\n5. Show only unique words.'
                                +'\n6. Display only unique values'
                                +'\n Press ECS to EXIT'
                                +'\n\nSelect (1-5) and press ENTER: ');

        switch(answer){
            case '1':
                await sortWordAlphabetically();
                return;
            case '2':
                await sortDigits();
                return;
            case '3':
                await sortDigits(desc=true);
                return;
            case '4':
                await sordByLetterQuantity();
                return;
            case '5':
                await uniqueWords();
                return;
            case '6':
                await uniqueValues();
                return;
            default:
                console.log("Enter pleace digits 1-5!!!");
        }
    }
}

async function start(){
    while(true){
        let answer = await question("Hello. Enter 10 words or digits deviding them in spaces: ");

        text = answer.split(' ');

        await chooseSortType();
    }
}

function handleExit() {
    console.log("Exiting the program.");
    rl.close();
    process.exit(); // Terminate the process
}

process.stdin.on('keypress', (ch, key) => {
    if (key && key.name === 'escape') {
        handleExit();
    }
});

start();