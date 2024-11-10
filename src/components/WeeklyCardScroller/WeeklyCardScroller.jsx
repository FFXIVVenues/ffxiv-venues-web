import "./WeeklyCardScroller.css";

import React, {Profiler} from "react";
import {VenueCardScroller} from "../VenueCardScroller/VenueCardScroller";
import {timeService} from "../../services/timeService";
import days from "../../consts/days.json";

const currentDay = timeService.getLocalDay();

export const WeeklyCardScroller = ({ venues }) =>
  <Profiler id="WeeklyCardScroller" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>

    { /* Favourites */ }
    { venues.favourites?.length > 0 &&
      <Profiler id="weekly-card-scroller__favourites" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-card-scroller__list weekly-card-scroller__favourites">
          <details open>
            <summary><h2>Favorites</h2></summary>
            <VenueCardScroller venues={venues.favourites} />
          </details>
        </div>
      </Profiler> }

    { /* Open */ }
    { venues.open?.length > 0 &&
      <Profiler id="weekly-card-scroller__open" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-card-scroller__list weekly-card-scroller__opennow">
          <details open>
            <summary><h2>Open now</h2></summary>
            <VenueCardScroller venues={venues.open} />
          </details>
        </div>
      </Profiler>}

    { /* Newest */ }
    { venues.newest?.length > 0 &&
      <Profiler id="weekly-card-scroller__new" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-card-scroller__list weekly-card-scroller__new">
          <details open>
            <summary><h2>Newest</h2></summary>
            <VenueCardScroller venues={venues.newest} />
          </details>
        </div>
      </Profiler>}

    { /* Scheduled */ }
    <div className="weekly-card-scroller__days">
      { venues.scheduled.map((dayVenues, i) => {
        const day = days[(currentDay+i)%7];
        if (dayVenues.length === 0) {
          return null;
        }
        return <Profiler id={`weekly-card-scroller__day-${day}`} onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)} key={i}>
          <div className="weekly-card-scroller__list weekly-card-scroller__day" key={i}>
            <details open>
              <summary><h2>{i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day}</h2></summary>
              <VenueCardScroller venues={dayVenues} />
            </details>
          </div>
        </Profiler>
      })}
    </div>

    { /* Future venues */ }
    { venues.future?.length > 0 &&
      <Profiler id="weekly-card-scroller__future" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-card-scroller__list weekly-card-scroller__future">
          <details open>
            <summary><h2>Future openings</h2></summary>
            <VenueCardScroller venues={venues.future} />
          </details>
        </div>
      </Profiler> }

    { /* Unscheduled */ }
    { venues.unscheduled?.length > 0 &&
      <Profiler id="weekly-card-scroller__unscheduled" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="weekly-card-scroller__list weekly-card-scroller__unscheduled">
          <details open>
            <summary><h2>Unscheduled</h2></summary>
            <VenueCardScroller venues={venues.unscheduled} />
          </details>
        </div>
      </Profiler> }

  </Profiler>