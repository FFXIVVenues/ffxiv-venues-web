// import React from "react";

export function Location(props) {
    const { location } = props;

    if (location.apartment)
        return <>{location.dataCenter}, {location.world}, {location.district}, Ward {location.ward}{location.subdivision ? " Sub" : null}, Apt {location.apartment}</>

    return <>{location.dataCenter}, {location.world}, {location.district}, Ward {location.ward}, Plot {location.plot}{location.room ? `, Room ${location.room}` : null}</>
}