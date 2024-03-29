import {CChartLine} from '@coreui/react-chartjs'
import propTypes from 'prop-types';

function Chart(props)
{
    const temperatureList = props.temperature;
    const dateArray = Object.values(props.date);
    var dayList = [];

    // Split into two lines if there is the date and time
    if (dateArray[0].split(' ')[1])
    {
      for(let i = 0; i < dateArray.length; i++)
      {
        dayList[i] = [dateArray[i].split(' ')[0], dateArray[i].split(' ')[1]];
      }
    } 
    else 
    { 
      dayList = dateArray; 
    }

    // Weather chart with date and temperature of the forecasts
    const chart = <CChartLine className="chart-weather"
            data = 
            {
                {
                    labels: dayList,
                    datasets: [{
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(0,0,0,.55)',
                        pointBackgroundColor: '#321fdb',
                        data: temperatureList
                    }],
                }
            }
            options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                  }
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: {
                      display: true,
                      maxTicksLimit: 5,
                      maxRotation: 25,
                      font: {
                        size: 8
                      }
                    }
                  },
                  y: {
                    min: 0,
                    ticks: {
                        font: {
                            size: 8
                        },
                    }
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    hoverRadius: 8,
                    hitRadius: 1,
                  }
                }
              }
            }
          />
    return(chart);
}

Chart.propTypes = {
    temperature: propTypes.array,
    date: propTypes.array
}

export default Chart;