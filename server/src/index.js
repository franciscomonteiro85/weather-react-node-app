import express from 'express';
import NodeCache from 'node-cache';
import cors from 'cors';
import { fetchData } from "./fetchWeatherData.js"
import { convertCity } from "./convertCity.js"
import { findMaxMin } from './findMaxMin.js';

const cache = new NodeCache();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// Endpoint that fetches weather forecast temperature and date from OpenWeatherMapAPI
app.get("/temperature/:id", (req,res) => 
{
    // Receive string with city name
    const cityId = req.params.id.toLowerCase();
    
    // Assure the id parameter is a known city
    var city = convertCity(cityId);

    // convertCity will return 0 if city name is not found
    if(city != 0)
    {
        const cachedData = cache.get(city);

        // Retrieve cached data if present
        if(cachedData)
        {
            res.json({ data: cachedData });
        } 
        else // Fetch new data if first call or cached data expired
        {
            fetchData(city).then((weatherData) => {
                cache.set(city, weatherData, 1800); // Set data to expire after 1800 seconds = 30 minutes
                console.log(cache.get(city));
                res.json({ data: weatherData });
            })
            .catch((error) => {
                res.status(500).json({error: 'Could not fetch data' }); // Send error if data could not get retrieved
            });
        }
    }
    else
    {
        res.status(404).json({error: 'City name not found'}); // Send error if city is not on the list
    }
}, );

// Endpoint that returns Maximum and Minimum values for next days
app.get("/temperature/:id/maxmin", (req,res) => 
{
    // Receive string with city name
    const cityId = req.params.id.toLowerCase();
    
    // Assure the id parameter is a known city
    var city = convertCity(cityId);

    // convertCity will return 0 if city name is not found
    if(city != 0)
    {
        const cachedData = cache.get(city);
        
        if(cachedData) // Retrieve from cache if data is present
        {
            var maxMin = findMaxMin(cachedData);
            res.json({ data: maxMin });
        } 
        else // Fetch new data if first time calling the function or cached data expired
        {
            fetchData(city).then((weatherData) => {
                cache.set(city, weatherData, 1800); // Keep values for 1800 seconds = 30 minutes, expires after
                
                var maxMin = findMaxMin(weatherData);
                console.log(maxMin)
                res.json({ data: maxMin });
            })
            .catch((error) => {
                res.status(500).json({error: 'Could not fetch data' });
            });
        }
    }
    else
    {
        // Send error message if parameter id does not have a match
        res.status(404).json({error: 'City name not found'});
    }
}, );

app.listen(PORT, () => 
{
    console.log(`Server listening on ${PORT}`);
});