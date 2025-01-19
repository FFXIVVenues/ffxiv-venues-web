import "./NewVenueCardScroller.css";

import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll"
import {Profiler} from "react";
import {NewVenueCard} from "../NewVenueCard/NewVenueCard";

export const NewVenueCardScroller = ({venues})  =>
  <Profiler id="venue-strip" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
    <HorizontalScroll reverseScroll>
      <div className="venue-strip">
        { venues.map(v =>
          <NewVenueCard venue={v.venue} opening={v.opening} key={v.venue.id + v.opening?.resolution?.start} />
      ) }
    </div>
    </HorizontalScroll>
  </Profiler>