import React, { useState, Profiler, useCallback, memo } from "react";
import { Modal } from "../ModalStage/Modal";
import { VenueProfile } from "../VenueProfile/VenueProfile";
import defaultImage from "./default-banner.jpg";
import { Location } from "../Location/Location";
import { DateString } from "../DateString/DateString";
import { TimeString } from "../TimeString/TimeString";
import { ModalCloseButton } from "../ModalStage/ModalCloseButton";

import "./VenueCard.css";

const VenueCard = memo(({ venue, opening }) => {
    const [openModal, setOpenModal] = useState(false);
    const onVenueClick = useCallback(() => {
        setOpenModal(true);
    }, []);
    const onCloseClick = useCallback(() => {
        setOpenModal(false);
    }, []);

    const openingResolution = opening || venue.resolution;

    return (
      <Profiler id="venue-card" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
          <div id={`venue-${venue.id}`} className={`venue-card ${venue.id} ${venue.resolution?.isNow ? "venue-card--open" : ""} ${venue.resolution ? "" : "venue-card--no-time"}`}>
              <div className="venue-card__block" role="row" onClick={onVenueClick}>
                  <img className="venue-card__photo" src={venue.bannerUri || defaultImage} alt="" loading="lazy" />
                  <div className="venue-card__stickers">
                      {venue.resolution?.isNow && <div className="venue-card__open">Open now!</div>}
                      {venue.isNew() && <div className="venue-card__new">New!</div>}
                  </div>
                  <div className="venue-card__summary">
                      <div className="venue-card__name">{venue.name}</div>
                      {openingResolution && (
                        <div className="venue-card__time">
                            <div className="venue-card__date"><DateString date={openingResolution.start} /></div>
                            <div className="venue-card__start"><TimeString date={openingResolution.start} format24={false} /></div>
                            <div className="venue-card__time-split">-</div>
                            <div className="venue-card__end"><TimeString date={openingResolution.end} format24={false} /></div>
                        </div>
                      )}
                      <div className="venue-card__location">
                          <Location location={venue.location} shorten />
                      </div>
                  </div>
              </div>
              {openModal && (
                <Modal className="venue-modal" onStageClick={onCloseClick} onEscape={onCloseClick}>
                    <ModalCloseButton onClick={onCloseClick} />
                    <VenueProfile venue={venue} />
                </Modal>
              )}
          </div>
      </Profiler>
    );
});

export { VenueCard };