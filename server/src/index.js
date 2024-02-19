import express from 'express';
import NodeCache from 'node-cache';
import cors from 'cors';
import { fetchData } from "./fetchWeatherData.js"
import { convertCity } from "./convertCity.js"

const cache = new NodeCache();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
//const cityCodes = [2267056, 2267094, 2740636, 2735941, 2268337]

app.get("/temperature/:id", (req,res) => 
{
    //Assure the id parameter is a known city
    const cityId = req.params.id.toLowerCase();
    
    var city = convertCity(cityId);

    if(city != 0)
    {
        const cachedData = cache.get(city);
    
        if(cachedData)
        {
            res.json({ data: cachedData });
        } 
        else
        {
            fetchData(city).then((weatherData) => {
                cache.set(city, weatherData, 1800);
                console.log(cache.get(city));
                res.json({ data: weatherData });
            })
            .catch((error) => {
                res.status(500).json({error: 'Could not fetch data' });
            });
        }
    }
    else
    {
        res.status(404).json({error: 'City name not found'});
    }
}, );

app.listen(PORT, () => 
{
    console.log(`Server listening on ${PORT}`);
});