import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
//import Button from './Button';
import Chart from './Chart';

function Card(props)
{
    //Temperature and date arrays initial state
    const [tempList, setTemp] = useState([" 0"," 0", " 0"]);
    const [dateList, setDate] = useState([" 0"," 0", " 0"]);

    useEffect(() => {
        fetchTemperature(); // Fetch when component mounts

        const intervalId = setInterval(() => {
            fetchTemperature();
            console.log("Temperature fetched");
        }, 60 * 1000); // Fetch new data each 30 minutes

        // Cleanup when the component unmounts
        return () => clearInterval(intervalId);
    },[]);

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
                setTemp(Object.values(json.data.temperatureData));
                setDate(Object.values(json.data.dateData));
            })
            .catch(error => console.error(error.message));
    }

    function getCurrentDay()
    {
        let currentDay = dateList[0].split(' ')[0];
        const currentDayList = [];
        for (let i=0; i < dateList.length; i++)
        {
            if (currentDay === dateList[i].split(' ')[0]){
                currentDayList.push(dateList[0].split(' ')[0]);
            }               
        }
        console.log(currentDayList);
        return currentDayList;
    }

    return(
        <div className="card">
            <h2 className="card-title">{props.city}'s temperature forecast</h2>
            <div className="card-row">
                <button onClick={getCurrentDay} className="button-day">Today</button>
                <button onClick={getCurrentDay} className="button-day">Tomorrow</button>
            </div>
            <Chart temperature={tempList} date={dateList}/>
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