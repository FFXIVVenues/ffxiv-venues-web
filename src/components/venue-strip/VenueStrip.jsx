import React from "react";
import "./venue-strip.css";
import { VenueCard } from "../venue-card/VenueCard";
import { HorizontalScroll } from "../horizontal-scroll/HorizontalScroll"

class VenueStrip extends React.Component {

    render() {
        return <div className="venue-strip__block">
          <HorizontalScroll reverseScroll>
              { this.props.venues.map((v) => <VenueCard venue={v.venue || v} opening={v.opening} key={(v.venue || v).id} /> )}
          </HorizontalScroll>
        </div>
    }

}

export { VenueStrip };