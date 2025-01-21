import "./NewWeeklyCardScroller.css";

import React, {Profiler} from "react";
import {NewVenueCardScroller} from "../NewVenueCardScroller/NewVenueCardScroller";
import {timeService} from "../../services/timeService";
import days from "../../consts/days.json";

const currentDay = timeService.getLocalDay();

export const NewWeeklyCardScroller = ({ venues }) =>
  <Profiler id="NewWeeklyCardScroller" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>

    { /* Favourites */ }
    { venues.favourites?.length > 0 &&
      <Profiler id="new-weekly-card-scroller__favourites" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="new-weekly-card-scroller__list new-weekly-card-scroller__favourites">
          <NewVenueCardScroller title="Favourites" venues={venues.favourites} open />
        </div>
      </Profiler> }

    { /* Open */ }
    { venues.open?.length > 0 &&
      <Profiler id="new-weekly-card-scroller__open" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="new-weekly-card-scroller__list new-weekly-card-scroller__opennow">
          <NewVenueCardScroller title="Open" venues={venues.open} open />
        </div>
      </Profiler>}

    { /* Newest */ }
    { venues.newest?.length > 0 &&
      <Profiler id="new-weekly-card-scroller__new" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="new-weekly-card-scroller__list new-weekly-card-scroller__new">
          <NewVenueCardScroller title="Newest" venues={venues.newest} open />
        </div>
      </Profiler>}

    { /* Scheduled */ }
    { venues.scheduled.map((dayVenues, i) => {
      const day = days[(currentDay+i)%7];
      if (dayVenues.length === 0) {
        return null;
      }
      return <Profiler id={`new-weekly-card-scroller__day-${day}`} onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)} key={i}>
        <div className="new-weekly-card-scroller__list new-weekly-card-scroller__day" key={i}>
          <NewVenueCardScroller title={i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day} venues={dayVenues} open />
        </div>
      </Profiler>
    })}

    { /* Future venues */ }
    { venues.future?.length > 0 &&
      <Profiler id="new-weekly-card-scroller__future" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="new-weekly-card-scroller__list new-weekly-card-scroller__future">
          <NewVenueCardScroller title="Future openings" venues={venues.future} open />
        </div>
      </Profiler> }

    { /* Unscheduled */ }
    { venues.unscheduled?.length > 0 &&
      <Profiler id="new-weekly-card-scroller__unscheduled" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
        <div className="new-weekly-card-scroller__list new-weekly-card-scroller__unscheduled">
          <NewVenueCardScroller title="Unscheduled" venues={venues.unscheduled} open />
        </div>
      </Profiler> }

  </Profiler>
