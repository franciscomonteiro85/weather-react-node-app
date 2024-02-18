import express from 'express';
import NodeCache from 'node-cache';
import { fetchData } from "./fetch-data.js"

const cache = new NodeCache();

const PORT = process.env.PORT || 3001;

const app = express();

//const cityCodes = [2267056, 2267094, 2740636, 2735941, 2268337]

app.get("/api/:id", (req,res) => 
{
    const cityId = req.params.id;

    const cachedData = cache.get(cityId);

    if(cachedData)
    {
        res.json({ data: cachedData });
    } else
    {
        fetchData(cityId).then((weatherData) => {
            cache.set(cityId, weatherData, 1800);
            res.json({ data: weatherData });
          })
          .catch((error) => {
            res.status(500).json({error: 'Could not fetch data' });
          });
    }
});

app.listen(PORT, () => 
{
    console.log(`Server listening on ${PORT}`);
});