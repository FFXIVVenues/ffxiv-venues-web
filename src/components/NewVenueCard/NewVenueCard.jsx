import "./NewVenueCard.css";

import {Location} from "../Location/Location";
import React from "react";
import {DateString} from "../DateString/DateString";
import {TimeString} from "../TimeString/TimeString";
import defaultImage from "../VenueCard/default-banner.jpg";

export function NewVenueCard({venue, opening}) {
  const openingResolution = opening?.resolution || venue.resolution;
  const isOpen = venue.resolution?.isNow;
  return <div className="new-venue-card">
      <div className="new-venue-card__stickers">
        {isOpen &&
            <div className="new-venue-card__sticker new-venue-card__open">Open now!</div>}

        {venue.isNew() &&
            <div className="new-venue-card__sticker new-venue-card__new">New!</div>}
      </div>
      <div className={"new-venue-card__container "+ (isOpen ? " new-venue-card--open" : "")}>
        <div className="new-venue-card__banner">
          <img className="new-venue-card__photo" src={venue.bannerUri || defaultImage} alt="" loading="lazy" />
        </div>

        <div className="new-venue-card__name">
          {venue.name}
        </div>

        { openingResolution &&
            <div className="new-venue-card__time">
              <div className="new-venue-card__date"><DateString date={openingResolution.start} /></div>
              <div className="new-venue-card__start"><TimeString date={openingResolution.start} format24={false} /></div>
              <div className="new-venue-card__time-split">-</div>
              <div className="new-venue-card__end"><TimeString date={openingResolution.end} format24={false} /></div>
            </div>
        }

        {/*<div className="new-venue-card__location">*/}
        {/*  <Location location={venue.location} shorten/>*/}
        {/*</div>*/}

      </div>
    </div>
}
