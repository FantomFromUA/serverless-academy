import inquirer from "inquirer";
import fs from 'fs';
import readline from 'readline'
import { userDataQuestion, userNameQuestion, showDataQuestion, findUserByNameQuestion } from "./questions.js";

async function saveUser(user){
    fs.appendFile('users.txt', JSON.stringify(user) + '\n', (err) => {
        if(err){
            console.log("Something went wrong");
        }
    });
}

async function createNewUser(){
    while(true){
        let answers = await inquirer.prompt(userNameQuestion);
        let name = answers.name;

        if(name === '') return;

        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        answers = await inquirer.prompt(userDataQuestion);

        let gender = answers.gender;
        let age = answers.age;

        let user = {
            name,
            gender,
            age
        };

        if(String(age) === 'NaN'){
            delete user.age
        }

        await saveUser(user);
    }
}

async function showData(){
    try {
        const data = fs.readFileSync('users.txt', 'utf8');
        let users = [];
      
        data.split('\n').forEach(user => {
            if (user === '') return;
            users.push(JSON.parse(user));
        });
      
        console.log(users);
    } catch (err) {
        console.error(err);
    }
}

async function findUser(userName){
    let users;
    const fileStream = fs.createReadStream('users.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (let line of rl){
        if(line.includes(`"name":"${userName}"`)){
            console.log(`User ${userName} was found.`);
            console.log(JSON.parse(line));
            return
        }
    }
    console.log(`User ${userName} wasn't found.`);
}

async function start(){
    await createNewUser();
    let answer = await inquirer.prompt(showDataQuestion);
    
    if(!answer) return;

    await showData();

    answer = await inquirer.prompt(findUserByNameQuestion);

    findUser(answer.userName);
}



start();