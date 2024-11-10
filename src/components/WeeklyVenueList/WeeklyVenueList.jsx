import "./WeeklyVenueList.css";

import React, { Profiler } from "react";
import { VenueList } from "../VenueList/VenueList";
import { timeService } from "../../services/timeService";
import days from "../../consts/days.json";

const currentDay = timeService.getLocalDay();

export const WeeklyVenueList = ({ venues }) =>
  <Profiler id="WeeklyVenueList" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>

    { /* Favorites */ }
    { venues.favourites?.length > 0 &&
      <Profiler id="weekly-venue-list__favourites" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-venue-list__list weekly-venue-list__favourites">
          <details open>
            <summary><h2>Favorites</h2></summary>
            <VenueList venues={venues.favourites} />
          </details>
        </div>
      </Profiler> }

    { /* Open */ }
    { venues.open?.length > 0 &&
      <Profiler id="weekly-venue-list__opennow" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-venue-list__list weekly-venue-list__opennow">
          <details open>
            <summary><h2>Open now</h2></summary>
            <VenueList venues={venues.open} />
          </details>
        </div>
      </Profiler> }

    { /* Newest */ }
    { venues.newest?.length > 0 &&
      <Profiler id="weekly-venue-list__new" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-venue-list__list weekly-venue-list__new">
          <details>
            <summary><h2>Newest</h2></summary>
            <VenueList venues={venues.newest} />
          </details>
        </div>
      </Profiler> }

    { /* Scheduled */ }
    <div className="weekly-venue-list__days">
      { venues.scheduled.map((dayVenues, i) => {
        const day = days[(currentDay+i)%7];
        if (dayVenues.length === 0) {
          return null;
        }
        return <Profiler id={`weekly-venue-list__day-${i}`} onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)} key={i}>
          <div className="weekly-venue-list__list weekly-venue-list__day" key={i}>
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
      <Profiler id="weekly-venue-list__future" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-venue-list__list weekly-venue-list__future">
          <details open>
            <summary><h2>Future openings</h2></summary>
            <VenueList venues={venues.future} />
          </details>
        </div>
      </Profiler> }

    { /* Unscheduled */ }
    { venues.unscheduled?.length > 0 &&
      <Profiler id="weekly-venue-list__unscheduled" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-venue-list__list weekly-venue-list__unscheduled">
          <details open>
            <summary><h2>Unscheduled</h2></summary>
            <VenueList venues={venues.unscheduled} />
          </details>
        </div>
      </Profiler> }

  </Profiler>