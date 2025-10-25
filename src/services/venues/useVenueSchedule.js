import {useEffect, useState} from "react";
import {venueService} from "./venueService";
import {favouritesService} from "../favouritesService";

export const useVenueSchedule = (initialFilters) => {
    const [ filters, internalSetFilters ] = useState(initialFilters);
    const [ error, setError ] = useState(null);
    const [ venues, setVenues ] = useState(null);
    useEffect(() => { venueService.getVenueSchedule(filters).then(setVenues).catch(setError) }, [ filters ]);
    useEffect(() => { favouritesService.observe(() => { venueService.getVenueSchedule(filters).then(setVenues).catch(setError)}) }, [ ]);

    const setFilters = (filters) =>
        venueService.getVenueSchedule(filters)
            .then(setVenues)
            .catch(setError)
            .then(_ => internalSetFilters(filters));

    return [ venues, error, setFilters ];
}