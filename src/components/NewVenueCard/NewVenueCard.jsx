import "./NewVenueCard.css";

import {Location} from "../Location/Location";
import React, {useCallback, useState} from "react";
import {DateString} from "../DateString/DateString";
import {TimeString} from "../TimeString/TimeString";
import defaultImage from "../VenueCard/default-banner.jpg";
import {Modal} from "../ModalStage/Modal";
import {ModalCloseButton} from "../ModalStage/ModalCloseButton";
import {VenueProfile} from "../VenueProfile/VenueProfile";

export function NewVenueCard({venue, opening}) {
  const [openModal, setOpenModal] = useState(false);
  const onVenueClick = useCallback(() => {
    setOpenModal(true);
  }, []);
  const onCloseClick = useCallback(() => {
    setOpenModal(false);
  }, []);

  const openingResolution = opening || venue.resolution;
  const isOpen = venue.resolution?.isNow;
  const isNew = venue.isNew();

  return <div className="new-venue-card" onClick={onVenueClick}>
        <div className="new-venue-card__stickers">
          <div className="new-venue-card__stickers-left">
            {isOpen &&
              <div className="new-venue-card__sticker new-venue-card__open">Open now</div>}
          </div>
          <div className="new-venue-card__stickers-right">
            {isNew &&
              <div className="new-venue-card__sticker new-venue-card__new">New</div>}
          </div>

        </div>
      <div className={"new-venue-card__container "+
        (isOpen ? " new-venue-card--open" : "") +
        (isNew ? " new-venue-card--new" : "")}>

        <div className="new-venue-card__banner">
          <img className="new-venue-card__photo" src={venue.bannerUri || defaultImage} alt="" loading="lazy" />
        </div>



        <div className="new-venue-card__summary">
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

        </div>
      </div>

      {openModal && (
        <Modal className="venue-modal" onStageClick={onCloseClick} onEscape={onCloseClick}>
          <ModalCloseButton onClick={onCloseClick} />
          <VenueProfile venue={venue} />
        </Modal>
      )}
    </div>
}
