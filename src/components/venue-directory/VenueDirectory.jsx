import React from "react";
import { useEffect, useState } from "react";
import { VenueFiltersPanel } from "./VenueFiltersPanel";
import { venueService } from "../../services/venues/venueService";
import { favouritesService } from "../../services/favouritesService";
import { timeService } from "../../services/timeService";
import { VenueStrip } from "../venue-strip/VenueStrip";
import { VenueList } from "../venue-list/VenueList";
import days from "../../consts/days.json";
import "./venue-directory.css"

const isLoadedButNoResult = (venues) => 
  venues !== undefined && venues !== null && venues.length === 0;

const isLoadingOrLoadedWithResults = (venues) => !isLoadedButNoResult(venues);

export function VenueDirectory(props) {
  
  let { listView } = props;

  // filter states
  const [ search, setSearch ] = useState(null);
  const [ regionFilter, setRegionFilter ] = useState(null);
  const [ dataCenterFilter, setDataCenterFilter ] = useState(null);
  const [ worldFilter, setWorldFilter ] = useState(null);
  const [ typeFilters, setTypeFilters ] = useState([]);
  const [ featureFilters, setFeatureFilters ] = useState([]);

  // venue states
  const [ favorites, setFavorites ] = useState(null);
  const [ open, setOpen ] = useState(null);
  const [ newest, setNewest ] = useState(null);
  const [ scheduled, setScheduled ] = useState(null);

  useEffect(_ => {
    (async () => {
      const venues = await venueService.getVenues();
      setFavorites(venues.filter(v => v.isFavorite()));
      setNewest(venues.filter(v => v.isNew()));
      const openVenues = await venueService.getOpenVenues();
      setOpen(openVenues);
      const scheduledVenues = await venueService.getVenueSchedule();
      setScheduled(scheduledVenues);
    })();
  }, [ ]);

  useEffect(_ => {
    (async () => {
      const destroyFavoritesObserver = favouritesService.observe(async _ =>
          setFavorites((await venueService.getVenues()).filter(v => v.isFavorite())));
      return destroyFavoritesObserver;
    })()
  }, []);

  const filter = (venues) => {
    if (venues === null) return null;
    let currentVenues = venues;
    if (search)
      currentVenues = currentVenues.filter(v => (v.name || v.venue.name).toLowerCase().indexOf(search.toLowerCase()) !== -1);
    if (regionFilter !== null)
      currentVenues = regionFilter.filter(currentVenues);
    if (dataCenterFilter !== null)
      currentVenues = dataCenterFilter.filter(currentVenues);
    if (worldFilter !== null)
      currentVenues = worldFilter.filter(currentVenues);
    for (let filter of typeFilters)
      currentVenues = filter.filter(currentVenues);
    for (let filter of featureFilters) 
      currentVenues = filter.filter(currentVenues);
    return currentVenues;
  }

  let filteredFavorites, 
      filteredOpen,
      filteredNewest,
      filteredUnscheduled,
      scheduledVenuesRender;

  if (favorites !== null) {
    filteredFavorites = filter(favorites);
  }

  if (open !== null) {
    filteredOpen = filter(open);
  }

  if (newest !== null) {
    filteredNewest = filter(newest).sort((a, b) => ((b.added && new Date(b.added)) || 0) - ((a.added && new Date(a.added)) || 0))
  }

  if (scheduled !== null) {
    filteredUnscheduled = filter(scheduled.unscheduled);
  }

  scheduledVenuesRender = [];
  const currentDay = timeService.getLocalDay();
  for (let i = currentDay, looped = false; !looped || i !== currentDay; (looped = true) && (i = ++i % 7)) {
    let filteredScheduled;
    if (scheduled !== null)
      filteredScheduled = filter(scheduled.scheduled[i]);
    if (isLoadedButNoResult(filteredScheduled))
      continue;
    scheduledVenuesRender.push(
      <div className="aether-venues__day" key={i}>
        <details open>
          <summary><h2>{currentDay === i ? "Today" : currentDay === i - 1 ? "Tomorrow" : days[i]}</h2></summary>
          { listView 
            ? <VenueList venues={filteredScheduled} />
            : <VenueStrip venues={filteredScheduled} /> }
        </details>
      </div>
    )
  }


  return <>
    <VenueFiltersPanel onSearch={s => setSearch(s)}
                       onRegionFilterUpdated={setRegionFilter}
                       onDataCenterFilterUpdated={setDataCenterFilter}
                       onWorldFilterUpdated={setWorldFilter}
                       onTypeFilterUpdated={setTypeFilters}
                       onFeatureFilterUpdated={setFeatureFilters} />


    { isLoadedButNoResult(filteredUnscheduled) && scheduledVenuesRender.length === 0 &&
        <div className="venue-directory__none-found">
          We're sowwy. 😞 <strong>We didn't find any venues for that search or combination of tags.</strong> <br/>We're indexing hundreds of venues per month! So, check back later or ask the community in <a href="https://discord.gg/gTP65VYcMj">our discord</a>!
        </div>
    }
    
    { /* Favorites */ }
    { isLoadingOrLoadedWithResults(filteredFavorites) && 
    <div className="aether-venues__venues aether-venues__favourite-venues">
      <details open>
        <summary><h2>Favorites</h2></summary>
        { listView 
          ? <VenueList venues={filteredFavorites} />
          : <VenueStrip venues={filteredFavorites} /> }
      </details>
    </div> }

    { /* Open */ }
    { isLoadingOrLoadedWithResults(filteredOpen) && 
    <div className="aether-venues__venues aether-venues__opennow">
      <details open>
        <summary><h2>Open now</h2></summary>
        { listView 
          ? <VenueList venues={filteredOpen} />
          : <VenueStrip venues={filteredOpen} />
        }
      </details>
    </div> }

    { /* Newest */ }
    { isLoadingOrLoadedWithResults(filteredNewest) && 
    <div className="aether-venues__venues aether-venues__new-venues">
      <details open={!listView}>
        <summary><h2>Newest</h2></summary>
        { listView 
          ? <VenueList venues={filteredNewest} />
          : <VenueStrip venues={filteredNewest} />
        }
      </details>
    </div> }

    { /* Scheduled */ }
    <div className="aether-venues__venues aether-venues__scheduled-venues">
      { scheduledVenuesRender }
    </div>

    { /* Unscheduled */ }
    { isLoadingOrLoadedWithResults(filteredUnscheduled) && 
    <div className="aether-venues__venues aether-venues__unscheduled-venues">
      <details open>
        <summary><h2>Unscheduled</h2></summary>
        { listView 
          ? <VenueList venues={filteredUnscheduled} />
          : <VenueStrip venues={filteredUnscheduled} />
        }
      </details>
    </div> }
  </>
}