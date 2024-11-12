import "./NewPageLayout.css";

import React, {useState} from 'react';
import Logo from "../../assets/logos/logo.svg";
import tempAvatar from "../../pages/NewDirectory/PanelFilters/assets/avatar.jpg";
import SettingsIcon from "../../assets/icons/settings-icon.svg";
import AddIcon from "../../assets/icons/add-icon.svg";
import DiscordIcon from "../../assets/icons/discord-icon.svg";
import RightArrowIcon from "../../assets/icons/right-arrow.svg";
import backdropImage from "./backdrop.webp";
import {Modal} from "../../components/ModalStage/Modal";
import {ModalCloseButton} from "../../components/ModalStage/ModalCloseButton";
import {NewVenueGuidance} from "../../components/NewVenueGuidance/NewVenueGuidance";
import {MenuButton} from "../../components/MenuButton/MenuButton";
import {DirectoryTypeToggle} from "../../components/DirectoryTypeToggle/DirectoryTypeToggle";

const NewPageLayout = ({ panel, children }) => {
  const [ showNewVenueModal, setShowNewVenueModal ] = useState(false);
  const [ showSettingsModal, setShowSettingsModal ] = useState(false);

  return <>
    <div className="new-page-layout" style={{ backgroundImage: `url(${backdropImage})` }}>
      <div className="new-page-layout__panel">
        <div className="new-page-layout__logo-container">
          <h1><Logo alt="FFXIV Venues"/></h1>
        </div>

        {/*<div className="new-page-layout__user-container">*/}
        {/*  <div className="new-page-layout__user-detail">*/}
        {/*    <img src={tempAvatar} className="new-page-layout__avatar" alt=""/>*/}
        {/*    <span className="new-page-layout__username">Kana Ki</span>*/}
        {/*  </div>*/}
        {/*  <SettingsIcon alt="Settings" className="index-menu__settings-icon"/>*/}
        {/*</div>*/}

        <div className="new-page-layout__top-cta-buttons">
          <MenuButton
            className="new-page-layout__add-venue"
            Icon={AddIcon}
            onClick={_ => setShowNewVenueModal(true)}
            active={showNewVenueModal}
            AsideIcon={RightArrowIcon}>
            Add your venue
          </MenuButton>
        </div>

        <div className="new-page-layout__panel-content">
          {panel}
        </div>

        <div className="new-page-layout__bottom-cta-buttons">
          <MenuButton
            Icon={DiscordIcon}
            href="https://discord.gg/gTP65VYcMj">
            Join the discord!
          </MenuButton>
          <MenuButton
            Icon={SettingsIcon}
            onClick={_ => setShowSettingsModal(true)}>
            Settings
          </MenuButton>
        </div>

      </div>
      <div className="new-page-layout__content">
        {children}
      </div>
    </div>


    {/* Modals */}
    {/* Convert these to easily re-usable predefined modals */}
    {showNewVenueModal &&
      <Modal className="new-venue-modal" onStageClick={_ => setShowNewVenueModal(false)}>
        <ModalCloseButton onClick={_ => setShowNewVenueModal(false) } />
        <NewVenueGuidance />
      </Modal>
    }

    {showSettingsModal &&
      <Modal className="settings-modal" onStageClick={_ => setShowSettingsModal(false)}>
        <ModalCloseButton onClick={_ => setShowSettingsModal(false) } />
        <DirectoryTypeToggle />
      </Modal>
    }
  </>
}

export {NewPageLayout};
