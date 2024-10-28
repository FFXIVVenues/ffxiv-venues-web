import "./venue-strip.css";
import { VenueCard } from "../venue-card/VenueCard";
import { HorizontalScroll } from "../horizontal-scroll/HorizontalScroll"
import { Loading } from "../loading/Loading";
import {Profiler} from "react";

export function VenueStrip({venues}) {
    return <Profiler id="venue-strip" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="venue-strip">
            <HorizontalScroll reverseScroll>
                { venues === null || venues === undefined
                ? [ ...Array(Math.floor(Math.random() * 3) + 1)].map((_, i) => <Loading key={i} />)
                : venues.map((v, i) => <VenueCard venue={v.venue} opening={v.opening} key={v.venue.id + v.opening?.resolution?.start} /> )}
            </HorizontalScroll>
        </div>
    </Profiler>;
}