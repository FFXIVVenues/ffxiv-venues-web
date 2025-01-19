import React, { useState, useCallback, useEffect, memo } from "react";
import { Modal } from "../ModalStage/Modal";
import { VenueProfile } from "../VenueProfile/VenueProfile";
import { Location } from "../Location/Location";
import { DateString } from "../DateString/DateString";
import { TimeString } from "../TimeString/TimeString";
import { ModalCloseButton } from "../ModalStage/ModalCloseButton";

import "./VenueListItem.css";

const VenueListItem = ({ venue, opening }) => {
    const [openModal, setOpenModal] = useState(false);

    const onVenueClick = useCallback(() => {
        setOpenModal(true);
    }, []);

    const onCloseClick = useCallback(() => {
        setOpenModal(false);
    }, []);

    const openingResolution = opening || venue.resolution;

    return (
      <div className={`venue-opening ${venue.id} ${venue.open ? "venue-opening--open" : ""} ${openingResolution ? "" : "venue-opening--no-time"}`}>
          <div className="venue-opening__summary-row" role="row" onClick={onVenueClick}>
              {openingResolution && (
                <>
                    {openingResolution.isWithinWeek === false && (
                      <div className="venue_opening__cell venue-opening__date"><DateString date={openingResolution.start} /></div>
                    )}
                    <div className="venue-opening__cell venue-opening__start"><TimeString date={openingResolution.start} format24={false} /></div>
                    <div className="venue-opening__cell venue-opening__time-split">-</div>
                    <div className="venue-opening__cell venue-opening__end"><TimeString date={openingResolution.end} format24={false} /></div>
                </>
              )}
              <div className="venue-opening__cell venue-opening__name">
                  {venue.name}
                  {venue.isNew() && <span className="venue-opening__new">new!</span>}
              </div>
              <div className="venue-opening__cell venue-opening__location"><Location location={venue.location} shorten /></div>
          </div>
          {openModal && (
            <Modal className="venue-modal" key={venue.name} onStageClick={onCloseClick} onEscape={onCloseClick}>
                <ModalCloseButton onClick={onCloseClick} />
                <VenueProfile venue={venue} />
            </Modal>
          )}
      </div>
    );
};

export { VenueListItem };