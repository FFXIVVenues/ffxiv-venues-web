import React from "react";
import "./venue-strip.css";
import { VenueCard } from "../venue-card/VenueCard";
import { HorizontalScroll } from "../horizontal-scroll/HorizontalScroll"

class VenueStrip extends React.Component {

    render() {
        return <div className="venue-strip__block" offsetLeft={0}>
          <HorizontalScroll reverseScroll>
            { this.props.venues.map((v, i) => <VenueCard venue={v} {...v} key={i} /> )}
          </HorizontalScroll>
        </div>
    }

}

export { VenueStrip };