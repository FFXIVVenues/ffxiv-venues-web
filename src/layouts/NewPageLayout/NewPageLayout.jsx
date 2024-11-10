import "./NewPageLayout.css";

import React, {useState} from 'react';
import { Notice } from "../../components/Notice/Notice";
import Logo from "../../assets/logos/logo.svg";
import tempAvatar from "../../pages/NewDirectory/PanelFilters/assets/avatar.jpg";
import SettingsIcon from "../../assets/icons/settings-icon.svg";
import AddIcon from "../../assets/icons/add-icon.svg";
import backdropImage from "./backdrop.webp";
import {Modal} from "../../components/ModalStage/Modal";
import {ModalCloseButton} from "../../components/ModalStage/ModalCloseButton";
import {NewVenueGuidance} from "../../components/NewVenueGuidance/NewVenueGuidance";

const NewPageLayout = ({ panel, children }) => {
  const [ showNewVenueModal, setShowNewVenueModal ] = useState(false);

  return <>
    <div className="new-page-layout" style={{ backgroundImage: `url(${backdropImage})` }}>
      <div className="new-page-layout__panel">
        <div className="new-page-layout__logo-container">
          <h1><Logo alt="FFXIV Venues"/></h1>
        </div>

        <div className="new-page-layout__user-container">
          <div className="new-page-layout__user-detail">
            <img src={tempAvatar} className="new-page-layout__avatar" alt=""/>
            <span className="new-page-layout__username">Kana Ki</span>
          </div>
          <SettingsIcon alt="Settings" className="index-menu__settings-icon"/>
        </div>

        <div className="new-page-layout__add-venue"
             onClick={() => setShowNewVenueModal(true) }>
          <AddIcon alt=""/>
          <span>Add your venue</span>
        </div>

        <div className="new-page-layout__panel-content">
          {panel}
        </div>
      </div>
      <div className="new-page-layout__content">
        {children}
      </div>
    </div>


    { showNewVenueModal &&
      <Modal className="new-venue-modal" onStageClick={_ => setShowNewVenueModal(false) }>
        <ModalCloseButton onClick={_ => setShowNewVenueModal(false) } />
        <NewVenueGuidance />
      </Modal>
    }
  </>
}

export {NewPageLayout};
