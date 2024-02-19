function convertCity(city)
{
    switch(city)
    {
        case "lisboa":
            return 2267056;
        case "leiria":
            return 2267094;
        case "coimbra":
            return 2740636;
        case "porto":
            return 2735941;
        case "faro":
            return 2268337;
        default:
            console.warn(`City ${city} does not exist`);
    }
    return 0;
}

export {convertCity};