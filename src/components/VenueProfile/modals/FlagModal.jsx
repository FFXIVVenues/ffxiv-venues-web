import "./FlagModal.css"
import { flagService, FlagCategory } from "../../../services/flagging/flagService";

import {Modal} from "../../ModalStage/Modal";
import {Button} from "../../Button/Button";
import React, {useCallback, useState} from "react";
import WarningIcon from "../../../assets/icons/warning-icon.svg";

export const FlagModal = ({ venue, onClose }) => {

  const [category, setCategory] = useState(FlagCategory.VenueEmpty);
  const [description, setDescription] = useState();
  const [flagSending, setFlagSending] = useState(false);
  const [flagSent, setFlagSent] = useState(false);
  const [error, setError] = useState(null);

  const callback = useCallback(async () => {
    try {
      setFlagSending(true);
      const res = await flagService.flagVenue(venue.id, category, description);
      setFlagSending(false);
      if (!res.ok) {
        setError("Please wait and try your flag again.");
        return;
      }
      setFlagSent(true);
    } catch (e) {
      setFlagSending(false);
      if (e instanceof Response && e.status === 429) {
        setError("Please wait and try your flag again (Rate limit exceeded).");
      } else {
        setError("Please wait and try your flag again.");
      }
    }
  }, [ flagService, venue.id, category, description ])

  if (flagSent)
    return <Modal className="flag-venue-modal" onStageClick={onClose} onEscape={onClose}>
      <small>{venue.name}</small>
      <h3>
        <WarningIcon />
        Flag Venue
      </h3>

      <p>Thank you for flagging. We'll review shortly.</p>

      <Button className="flag-venue-modal__ok-button" onClick={onClose} tabIndex={4}>Ok</Button>
    </Modal>

  return <Modal className="flag-venue-modal" onStageClick={onClose} onEscape={onClose}>
    {error &&
      <div className={"flag-venue-modal__error"}>
        {error}
      </div>
    }
    {flagSending && !error &&
      <div className={"flag-venue-modal__sending"}>
        Sending...
      </div>
    }

    <small>{venue.name}</small>
    <h3>
      <WarningIcon />
      <span>Flag Venue</span>
    </h3>
    <select aria-label="Flag category" tabIndex={1} onChange={e => setCategory(e.target.value)}
            className="flag-venue-modal__category-select" autoFocus>
      <option value={FlagCategory.VenueEmpty}>Venue empty</option>
      <option value={FlagCategory.InappropriateContent}>Inappropriate Content</option>
      <option value={FlagCategory.IncorrectInformation}>Incorrect Information</option>
    </select>
    <textarea aria-label="Further description" tabIndex={2} onChange={e => setDescription(e.target.value)}
              className="flag-venue-modal__description" placeholder={"Further description"}/>
    <Button className="flag-venue-modal__flag-button" onClick={callback} tabIndex={3}>Flag</Button>
    <Button className="flag-venue-modal__cancel-button" onClick={onClose} tabIndex={4}>Cancel</Button>
 </Modal>;
}
