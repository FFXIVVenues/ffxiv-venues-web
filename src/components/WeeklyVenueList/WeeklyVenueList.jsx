import React, { Profiler } from "react";
import {VenueFiltersPanel} from "../VenueFilterPanel/VenueFiltersPanel";
import {VenueList} from "../VenueList/VenueList";
import {timeService} from "../../services/timeService";
import days from "../../consts/days.json";

const currentDay = timeService.getLocalDay();

export const WeeklyVenueList = ({ venues, onFilter }) =>
  <Profiler id="WeeklyVenueList" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
    <VenueFiltersPanel onFilter={onFilter} />

    { /* Favorites */ }
    { venues.favourites?.length > 0 &&
      <Profiler id="venue-directory__favourites" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__favourite-venues">
          <details open>
            <summary><h2>Favorites</h2></summary>
            <VenueList venues={venues.favourites} />
          </details>
        </div>
      </Profiler> }

    { /* Open */ }
    { venues.open?.length > 0 &&
      <Profiler id="venue-directory__open" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__opennow">
          <details open>
            <summary><h2>Open now</h2></summary>
            <VenueList venues={venues.open} />
          </details>
        </div>
      </Profiler> }

    { /* Newest */ }
    { venues.newest?.length > 0 &&
      <Profiler id="venue-directory__new" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__new-venues">
          <details>
            <summary><h2>Newest</h2></summary>
            <VenueList venues={venues.newest} />
          </details>
        </div>
      </Profiler> }

    { /* Scheduled */ }
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
              <VenueList venues={dayVenues} />
            </details>
          </div>
        </Profiler>
      })}
    </div>

    { /* Future venues */ }
    { venues.future?.length > 0 &&
      <Profiler id="venue-directory__future" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__future-venues">
          <details open>
            <summary><h2>Future openings</h2></summary>
            <VenueList venues={venues.future} />
          </details>
        </div>
      </Profiler> }

    { /* Unscheduled */ }
    { venues.unscheduled?.length > 0 &&
      <Profiler id="venue-directory__unscheduled" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__unscheduled-venues">
          <details open>
            <summary><h2>Unscheduled</h2></summary>
            <VenueList venues={venues.unscheduled} />
          </details>
        </div>
      </Profiler> }

  </Profiler>