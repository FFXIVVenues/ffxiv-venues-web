import React from "react";
import "./venue-strip.css";
import { VenueCard } from "../venue-card/VenueCard";
import { HorizontalScroll } from "../horizontal-scroll/HorizontalScroll"

class VenueStrip extends React.Component {

    render() {
        return <div className="venue-strip__block" offsetLeft={0}>
          <HorizontalScroll reverseScroll>
              { this.props.venues.map((v) => <VenueCard venue={v.venue || v} time={v.time} key={(v.venue || v).id} /> )}
          </HorizontalScroll>
        </div>
    }

}

export { VenueStrip };