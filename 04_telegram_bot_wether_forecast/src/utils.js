import { getCityLocation, getCityForecast } from "./http.js";


export async function getForcast(city, everySixHours = false){
    const location = await getCityLocation(city);

    const forecast = await getCityForecast(location[0].lat, location[0].lon);
    let list = forecast.list;

    if(everySixHours){
        list = list.filter((item, index) => index % 2 === 0);
    }

    return list.slice(0, 5);
}

export function createForcastMessage(forecast){
    let message = "";
    var options = { hour: '2-digit', minute: '2-digit', hour12: true };
    for(let i in forecast){
        let time = new Date(forecast[i].dt_txt);
        message += 
`
Date -> ${time.toLocaleDateString(undefined, options)},
Temperature -> ${forecast[i].main.temp}°С,
Temperature feels like -> ${forecast[i].main.feels_like}°С,
Weather -> ${forecast[i].weather[0].main},
Wind -> ${forecast[i].wind.speed} km/h.

`
    }

    return message;
}