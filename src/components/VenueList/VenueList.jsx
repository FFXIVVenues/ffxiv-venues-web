import { VenueListItem } from "../VenueListItem/VenueListItem";

export const VenueList = ({venues, onVenueClick}) =>
  <div className="venue-list">
    { venues.map((v) =>
      <VenueListItem venue={v.venue} opening={v.opening} key={v.venue.id + v.opening?.start.toISOString()} onClick={_ => onVenueClick(v.venue.id)} />
    ) }
  </div>
