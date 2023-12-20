import "./venue-strip.css";
import { VenueCard } from "../venue-card/VenueCard";
import { HorizontalScroll } from "../horizontal-scroll/HorizontalScroll"
import { Loading } from "../loading/Loading";
import {Profiler} from "react";

export function VenueStrip(props) {
    return <Profiler id="venue-strip" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="venue-strip">
            <HorizontalScroll reverseScroll>
                { props.venues === null || props.venues === undefined
                ? [ ...Array(Math.floor(Math.random() * 3) + 1)].map((_, i) => <Loading key={i} />)
                : props.venues.map((v) => <VenueCard venue={v.venue || v} opening={v.opening} key={(v.venue || v).id + (v.opening ? v.opening.start.hour : "")} /> )}
            </HorizontalScroll>
        </div>
    </Profiler>;
}