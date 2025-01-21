import "./NewVenueCardScroller.css";

import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll"
import React, { Profiler } from "react";
import { NewVenueCard } from "../NewVenueCard/NewVenueCard";

export const NewVenueCardScroller = ({venues, title, open})  =>
  <Profiler id="new-venue-card-scroller" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
    <details className="new-venue-card-scroller" open={open}>
      <summary><h2>{title}</h2></summary>
      <HorizontalScroll className="new-venue-card-scroller__scroller" reverseScroll>
        <div className="new-venue-card-scroller__venues">
          { venues.map(v =>
            <NewVenueCard venue={v.venue} opening={v.opening} key={v.venue.id + v.opening?.resolution?.start} />)
          }
        </div>
      </HorizontalScroll>
    </details>
  </Profiler>
