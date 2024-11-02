import { VenueListItem } from "../VenueListItem/VenueListItem";

export const VenueList = ({venues}) =>
  <div className="venue-list">
    { venues.map((v) =>
      <VenueListItem venue={v.venue} opening={v.opening} key={v.venue.id + (v.opening ? v.opening.start.hour : "")} />
    ) }
  </div>
