import { VenueOpening } from "../venue-opening/VenueOpening";
import { Loading } from "../loading/Loading";

export function VenueList(props) {
    return <div className="venue-list">
        { props.venues === null || props.venues === undefined
        ? [ ...Array(Math.floor(Math.random() * 12) + 1)].map((_, i) => <Loading key={i} style={{ width: 700, height: 30, maxWidth: "100%" }}/>)
        : props.venues.map((v) => <VenueOpening venue={v.venue || v} opening={v.opening} key={(v.venue || v).id} /> ) }
    </div>
}