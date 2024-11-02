export function Location(props) {
    const { location, shorten } = props;

    if (location.override) {
        if (shorten && location.override.length > 50)
            return <>{ `${location.override.substring(0, 50)}...` }</>
        else
            return <>{location.override}</>
    }

    if (location.apartment)
        return <>{location.dataCenter}, {location.world}, {location.district}, Ward {location.ward}{location.subdivision ? " Sub" : null}, Apt {location.apartment}</>

    return <>{location.dataCenter}, {location.world}, {location.district}, Ward {location.ward}, Plot {location.plot}{location.room ? `, Room ${location.room}` : null}</>
}