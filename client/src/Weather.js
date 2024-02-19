function Weather()
{
    const weather1 = "Temperature";
    const weather2 = "Wind";

    return(
        <ul>
            <li>Apple</li>
            <li>{weather1}</li>
            <li>{weather2.toUpperCase()}</li>
        </ul>
    );
}

export default Weather;