import { getExchangeRate } from "./http.js";


export function createExchangeMessage(curency, rate){
    const message = 
`
${curency}
Купівля - ${rate.rateBuy}
Продаж  - ${rate.rateSell}
`;
    return message;
}