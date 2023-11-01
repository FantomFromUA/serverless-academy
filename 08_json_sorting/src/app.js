import axios from 'axios';

const endpoints = [
    "https://jsonbase.com/sls-team/json-793",
    "https://jsonbase.com/sls-team/json-955",
    "https://jsonbase.com/sls-team/json-231",
    "https://jsonbase.com/sls-team/json-931",
    "https://jsonbase.com/sls-team/json-93",
    "https://jsonbase.com/sls-team/json-342",
    "https://jsonbase.com/sls-team/json-770",
    "https://jsonbase.com/sls-team/json-491",
    "https://jsonbase.com/sls-team/json-281",
    "https://jsonbase.com/sls-team/json-718",
    "https://jsonbase.com/sls-team/json-310",
    "https://jsonbase.com/sls-team/json-806",
    "https://jsonbase.com/sls-team/json-469",
    "https://jsonbase.com/sls-team/json-258",
    "https://jsonbase.com/sls-team/json-516",
    "https://jsonbase.com/sls-team/json-79",
    "https://jsonbase.com/sls-team/json-706",
    "https://jsonbase.com/sls-team/json-521",
    "https://jsonbase.com/sls-team/json-350",
    "https://jsonbase.com/sls-team/json-64"
  ]

function findIsDone(data){
    if(data.hasOwnProperty('isDone')) 
        return data['isDone'];
    for(let key in data){
        if(typeof data[key] === "object"){
            const res = findIsDone(data[key]);
            if(res !== undefined){
                return res;
            }
        }
    }
}

async function start(){
    for(let key in endpoints){

        for(let i = 0; i < 3; i++){
            const response = await axios.get(endpoints[key]);
            if (response.data) {
                let res = findIsDone(response.data);
                console.log(`[${res? 'Success' : 'Fail'}] ${endpoints[key]}: isDone - ${res}`);
                break;
            }
        }
    }
}

start();