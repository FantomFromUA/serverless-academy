import axios from 'axios';

const token = process.env.API_TOKEN;

export async function getCityLocation(city, limit = 1){
    const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct',{
        params: {
            q: city,
            limit,
            appid: token
        }
    }).catch(err => {
        console.log(err.message);
    });

    return response.data;
}

export async function getCityForecast(lat, lon, units='metric'){
    const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
            lat,
            lon,
            units,
            appid: token
        }
    });

    return response.data;
}