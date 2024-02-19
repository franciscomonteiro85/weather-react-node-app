import { apiToken } from "./api-token.js"
import fetch from 'node-fetch';

function fetchData(cityId) 
{
    const URL = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiToken}&units=metric`;
    return fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not request data');
            }
            return response.json();
        })
        .then(json => {
            const temperatureData = {};
            const dateData = {};

            var weatherList = json["list"];
            for(let i = 0; i < 10; i++)
            {
                temperatureData[`temp${i+1}`] = weatherList[i]["main"]["temp"];
                dateData[`temp${i+1}`] = weatherList[i]["dt_txt"];
            }
            return {temperatureData, dateData};
        })
        .catch(error => {
            console.error({ error: 'Fetch was not successful', details: error });
            throw error;
        });
}

export {fetchData};