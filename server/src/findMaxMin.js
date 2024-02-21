function findMaxMin(data)
{
    let tmp = Object.values(data.temperatureData);
    let max = Math.max(...tmp);
    let min = Math.min(...tmp);
    return {max, min};
}

export {findMaxMin};