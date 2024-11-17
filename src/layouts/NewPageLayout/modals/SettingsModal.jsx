import "./SettingsModal.css"

import {ModalCloseButton} from "../../../components/ModalStage/ModalCloseButton";
import {DirectoryTypeToggle} from "../../../components/DirectoryTypeToggle/DirectoryTypeToggle";
import {Modal} from "../../../components/ModalStage/Modal";
import React from "react";

export const SettingsModal = ({ onClose }) =>
  <Modal className="settings-modal" onStageClick={onClose}>
    <ModalCloseButton onClick={onClose} />
    <h2>Directory View</h2>
    <DirectoryTypeToggle />
  </Modal>;