import { useEffect, useState } from "react";
import { VenueFiltersPanel } from "../../components/VenueFilterPanel/VenueFiltersPanel";
import { venueService } from "../../services/venueService";
import { favouritesService } from "../../services/favouritesService";
import { LoadingIcon } from "../../components/Icons/LoadingIcon";
import {WeeklyVenueList} from "../../components/WeeklyVenueList/WeeklyVenueList";

import "./VenueDirectoryPage.css"
import {WeeklyCardScroller} from "../../components/WeeklyCardScroller/WeeklyCardScroller";


export function VenueDirectoryPage({ listView }) {

  const [ venues, setVenues ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => { venueService.getVenueSchedule().then(setVenues).catch(setError) }, [ ]);
  useEffect(() => { favouritesService.observe(async _ => setVenues(await venueService.getVenueSchedule())) }, [ ]);
  const onFilter = (filters) => { venueService.getVenueSchedule(filters).then(setVenues).catch(setError) };

  if (error)
    return errorRender(onFilter);

  if (venues == null)
    return loadingRender(onFilter);

  if (venues.length === 0)
    return noVenuesRender(onFilter);

  return listView ?
    <WeeklyVenueList venues={venues} onFilter={onFilter} /> :
    <WeeklyCardScroller venues={venues} onFilter={onFilter} />;
}


const errorRender = (error, onFilter) => <>
  <VenueFiltersPanel onFilter={onFilter} />
  <div className="venue-directory__error">
    😱 We couldn't load the venues! {error.message}
  </div>
</>

const loadingRender = (onFilter) => <>
  <VenueFiltersPanel onFilter={onFilter} />
  <div className="venue-directory__loading">
    <LoadingIcon /> Getting venues...
  </div>
</>

const noVenuesRender = (onFilter) => <>
  <VenueFiltersPanel onFilter={onFilter} />
  <div className="venue-directory__none-found">
    No venues yet!
  </div>
</>
