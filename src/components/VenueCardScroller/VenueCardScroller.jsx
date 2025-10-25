import "./VenueCardScroller.css";
import { VenueCard } from "../VenueCard/VenueCard";
import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll"
import {Profiler} from "react";

export const VenueCardScroller = ({venues, onVenueClick })  =>
  <Profiler id="venue-strip" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
    <div className="venue-strip">
      <HorizontalScroll reverseScroll>
        { venues.map((v, i) =>
          <VenueCard venue={v.venue} opening={v.opening} key={v.venue.id + v.opening?.start.toISOString()} onClick={_ => onVenueClick(v.venue.id)} />
        ) }
      </HorizontalScroll>
    </div>
  </Profiler>