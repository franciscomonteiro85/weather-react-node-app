function MaxMinWidget(props)
{
    return(
        <div className="maxmin-div">
            <h2>Max: {props.values.max}ºC</h2>
            <h2>Min: {props.values.min}ºC</h2>
        </div>
    );
}

export default MaxMinWidget;