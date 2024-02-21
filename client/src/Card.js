import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import Chart from './Chart';
import MaxMinWidget from './MaxMinWidget';
import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';

function Card(props)
{
    const [tempList, setTempList] = useState([" 0"," 0", " 0"]); // Temperature array state
    const [dateList, setDateList] = useState([" 0"," 0", " 0"]); // Date array state
    const [maxMin, setMaxMin] = useState([0,0]); // State to manage max and min values
    const [showChart, setShowChart] = useState(true); // State to manage chart visibility
    const [alert, setAlert] = useState(false); // State to manage alert visibility

    // Hook to fetch temperature when loading and automatically fetch when data expires
    useEffect(() => {
        fetchTemperature(); // Fetch when component mounts

        const intervalId = setInterval(() => {
            fetchTemperature();
            console.log("Temperature fetched");
        }, 30 * 60 * 1000); // Fetch new data each 30 minutes

        // Cleanup when the component unmounts
        return () => clearInterval(intervalId);
    },[]);

    // Hook to trigger alert to disappear after 5 seconds
    useEffect(() => {
        const timeout = setTimeout( () => {
            setAlert(false);
        }, 5000); // 5 seconds
    },[alert]);

    // Fetch all available weather forecasts from API
    function fetchTemperature()
    {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3001');

        // Call Backend Api to retrieve temperature and date
        fetch(`http://localhost:3001/temperature/${props.city}`, 
            {   mode: 'cors',
                method: 'GET',
                headers: headers
            })
            .then(res => res.json())
            .then(json => {
                setTempList(Object.values(json.data.temperatureData));
                setDateList(Object.values(json.data.dateData));
                setShowChart(true);
            })
            .catch(error => console.error(error.message));
    }

    // Get today's temperature values or tomorrow's if after 21:00
    function getCurrentDay()
    {
        // Get today's date
        let currentDay = new Date();
        let currentHour = currentDay.toISOString().split('T')[1].split('.')[0];
        
        // There are no more forecasts after 21:00, so it should display tomorrow's values
        if(currentHour > "21:00:00")
        {
            console.log("Current hour is greater than 21:00:00");
            currentDay.setDate(currentDay.getDate() + 1);
            setAlert(true); // Send alert to warn the user
        }
        currentDay = currentDay.toISOString().split('T')[0];
        
        // Create arrays containing only todays' values
        const currentDayList = [];
        const currentTempList = [];

        // Verify if values in array dateList are from today
        if(dateList[0].split(' ')[1])
        {
            for (let i=0; i < dateList.length; i++)
            {
                if (currentDay === dateList[i].split(' ')[0]){
                    currentDayList.push(dateList[i].split(' ')[1]);
                    currentTempList.push(tempList[i]);
                }               
            }
            
            setTempList(currentTempList);
            setDateList(currentDayList);
        }
        setShowChart(true);
    }

    // Find Maximum and Minimum values of temperature for the next few days
    function getMaxMin()
    {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3001');

        // Call Backend Api to retrieve temperature and date
        fetch(`http://localhost:3001/temperature/${props.city}/maxmin`, 
            {   mode: 'cors',
                method: 'GET',
                headers: headers
            })
            .then(res => res.json())
            .then(json => {
                setMaxMin(json.data);
                setShowChart(false);
            })
            .catch(error => console.error(error.message));
    }

    // Return card with title, buttons and chart or widget
    return(
        <div className="card">
            <h2 className="card-title">{props.city}'s temperature forecast</h2>
            <div className="card-row">
                <button onClick={fetchTemperature} className="card-button">Full Forecast</button>
                <button onClick={getCurrentDay} className="card-button">Today</button>
                <button onClick={getMaxMin} className="card-button">MaxMin</button>
            </div>
            {showChart ? <Chart temperature={tempList} date={dateList}/> : <MaxMinWidget values={maxMin}/>}
            {alert ? <Alert className='alert' icon={<InfoIcon fontSize="inherit" />} severity="info">
                        Current hour is greater than 21:00:00. Showing results for tomorrow.
                    </Alert> : null}
        </div>
    );
}

// Verify input from GET Request
Card.propTypes = {
    city: propTypes.string
}

// Default value for city
Card.defaultProps = {
    city: ""
}

export default Card;