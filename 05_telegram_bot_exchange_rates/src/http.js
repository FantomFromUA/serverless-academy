import axios from 'axios';

export async function getExchangeRate(){
    const response = await axios.get('https://api.monobank.ua/bank/currency');
    
    return response.data.slice(0, 2);
}