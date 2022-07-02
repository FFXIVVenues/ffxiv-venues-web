import "./venue-strip.css";
import { VenueCard } from "../venue-card/VenueCard";
import { HorizontalScroll } from "../horizontal-scroll/HorizontalScroll"
import { Loading } from "../loading/Loading";

export function VenueStrip(props) {
    return <div className="venue-strip">
        <HorizontalScroll reverseScroll>
        { props.venues === null || props.venues === undefined
        ? [ ...Array(Math.floor(Math.random() * 3) + 1)].map((_, i) => <Loading key={i} />)
        : props.venues.map((v) => <VenueCard venue={v.venue || v} opening={v.opening} key={(v.venue || v).id} /> )}
        </HorizontalScroll>
    </div>
}