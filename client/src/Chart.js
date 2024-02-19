import {CChartLine} from '@coreui/react-chartjs'
import propTypes from 'prop-types';

function Chart(props)
{
    const temperatureList = props.temperature;
    const dateList = props.date;
    const chart = <CChartLine className="chart-weather"
            data = 
            {
                {
                    labels: dateList,
                    datasets: [{
                        label: '',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(0,0,0,.55)',
                        pointBackgroundColor: '#321fdb',
                        data: temperatureList
                    }],
                }
            }
            options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      display: true,
                      maxTicksLimit: 10,
                      maxRotation: 25,
                      font: {
                        size: 12
                      }
                    },
                  },
                  y: {
                    ticks: {
                        font: {
                            size: 12
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
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },}}
        />
    return(chart);
}

Chart.propTypes = {
    temperature: propTypes.array,
    date: propTypes.array
}

export default Chart;