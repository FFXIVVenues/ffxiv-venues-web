import React, { Profiler } from "react";
import { useEffect, useState } from "react";
import { VenueFiltersPanel } from "./VenueFiltersPanel";
import { venueService } from "../../services/venueService";
import { favouritesService } from "../../services/favouritesService";
import { timeService } from "../../services/timeService";
import { VenueStrip } from "../venue-strip/VenueStrip";
import { VenueList } from "../venue-list/VenueList";
import days from "../../consts/days.json";
import "./venue-directory.css"
import { LoadingIcon } from "../icons/LoadingIcon";

export function VenueDirectory({ listView }) {
  const currentDay = timeService.getLocalDay();
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

  return <Profiler id="VenueDirectory" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
    <VenueFiltersPanel onFilter={onFilter} />

    { /* Favorites */ }
    { venues.favourites?.length > 0 &&
      <Profiler id="venue-directory__favourites" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__favourite-venues">
          <details open>
            <summary><h2>Favorites</h2></summary>
            { listView
              ? <VenueList venues={venues.favourites} />
              : <VenueStrip venues={venues.favourites} /> }
          </details>
        </div>
      </Profiler>}

    { /* Open */ }
    { venues.open?.length > 0 &&
      <Profiler id="venue-directory__open" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__opennow">
          <details open>
            <summary><h2>Open now</h2></summary>
            { listView
              ? <VenueList venues={venues.open} />
              : <VenueStrip venues={venues.open} />
            }
          </details>
        </div>
      </Profiler>}

    { /* Newest */ }
    { venues.newest?.length > 0 &&
      <Profiler id="venue-directory__new" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__new-venues">
          <details open={!listView}>
            <summary><h2>Newest</h2></summary>
            { listView
              ? <VenueList venues={venues.newest} />
              : <VenueStrip venues={venues.newest} />
            }
          </details>
        </div>
      </Profiler>}

    { /* Scheduled */ }
    <Profiler id="venue-directory__scheduled" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
      <div className="aether-venues__venues aether-venues__scheduled-venues">
        { venues.scheduled.map((dayVenues, i) => {
          const day = days[(currentDay+i)%7];
          if (dayVenues.length === 0) {
            return null;
          }
          return <Profiler id={`venue-directory__scheduled-day-${i}`} onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)} key={i}>
            <div className="aether-venues__day" key={i}>
              <details open>
                <summary><h2>{i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day}</h2></summary>
                { listView
                  ? <VenueList venues={dayVenues} />
                  : <VenueStrip venues={dayVenues} /> }
              </details>
            </div>
          </Profiler>
        })}
      </div>
    </Profiler>

    { /* Future venues */ }
    { venues.future?.length > 0 &&
      <Profiler id="venue-directory__future" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__future-venues">
          <details open>
            <summary><h2>Future openings</h2></summary>
            { listView
              ? <VenueList venues={venues.future} />
              : <VenueStrip venues={venues.future} />
            }
          </details>
        </div>
      </Profiler>}

    { /* Unscheduled */ }
    { venues.unscheduled?.length > 0 &&
      <Profiler id="venue-directory__unscheduled" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__unscheduled-venues">
          <details open>
            <summary><h2>Unscheduled</h2></summary>
            { listView
              ? <VenueList venues={venues.unscheduled} />
              : <VenueStrip venues={venues.unscheduled} />
            }
          </details>
        </div>
      </Profiler>}

  </Profiler>
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
