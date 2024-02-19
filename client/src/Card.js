import React, {useState} from 'react';
import propTypes from 'prop-types';
//import Button from './Button';
import Chart from './Chart';

function Card(props)
{
    const [temperature, setTemperature] = useState([15, 12, 0]);
    const [date, setDate] = useState([0,0,0]);

    function fetchTemperature()
    {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3001');

        fetch(`http://localhost:3001/temperature/${props.city}`, 
            {   mode: 'cors',
                method: 'GET',
                headers: headers
            })
            .then(res => res.json())
            .then(json => {
                setTemperature(Object.values(json.data.temperatureData));
                setDate(Object.values(json.data.dateData));
            })
            .catch(error => console.error(error.message));
    }

    return(
        <div className="card">
            <h2 className="card-value">{props.city}'s temperature forecast</h2>
            <p className="card-text"></p>
            <button onClick={fetchTemperature} className="button">Fetch weather data</button>
            <Chart temperature={temperature} date={date}/>
        </div>
    );
}

Card.propTypes = {
    city: propTypes.string
}

Card.defaultProps = {
    city: "Lisboa"
}

export default Card;