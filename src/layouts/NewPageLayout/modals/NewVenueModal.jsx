import "./NewVenueModal.css";

import {ModalCloseButton} from "../../../components/ModalStage/ModalCloseButton";
import {Modal} from "../../../components/ModalStage/Modal";
import React from "react";
import {NewVenueGuidance} from "../../../components/NewVenueGuidance/NewVenueGuidance";

export const NewVenueModal = ({ onClose }) =>
  <Modal className="new-venue-modal" onStageClick={onClose}>
    <ModalCloseButton onClick={onClose} />
    <NewVenueGuidance />
  </Modal>;