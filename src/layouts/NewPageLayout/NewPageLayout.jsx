import "./NewPageLayout.css";

import React, {useState} from 'react';
import Logo from "../../assets/logos/logo.svg";
import SettingsIcon from "../../assets/icons/settings-icon.svg";
import AddIcon from "../../assets/icons/add-icon.svg";
import DiscordIcon from "../../assets/icons/discord-icon.svg";
import RightArrowIcon from "../../assets/icons/right-arrow.svg";
import UpArrowIcon from "../../assets/icons/up-arrow.svg";
import DownArrowIcon from "../../assets/icons/down-arrow.svg";
import { MenuButton } from "../../components/MenuButton/MenuButton";
import { SettingsModal } from "./modals/SettingsModal";
import { NewVenueModal } from "./modals/NewVenueModal";

const NewPageLayout = ({ children, className }) => {
  const [ showNewVenueModal, setShowNewVenueModal ] = useState(false);
  const [ showSettingsModal, setShowSettingsModal ] = useState(false);
  const [ expanded, setExpanded ] = useState(false);

  const PanelContent = children.find(child => child.type === NewPageLayout.Panel);
  const PageContent = children.find(child => child.type === NewPageLayout.Page);

  return <>
    <div className={`new-page-layout ${className ? className : ""}`}>

      <div className={`new-page-layout__panel ${expanded ? "new-page-layout__panel--expanded" : ""}`}>
        <div className="new-page-layout__logo-container">
          <h1><Logo alt="FFXIV Venues"/></h1>
        </div>

        <div className="new-page-layout__panel-expander">
          <button onClick={_ => setExpanded(!expanded)}>
            { expanded ? <UpArrowIcon /> : <DownArrowIcon />}
          </button>
        </div>

        {/*<div className="new-page-layout__user-container">*/}
        {/*  <div className="new-page-layout__user-detail">*/}
        {/*    <img src={tempAvatar} className="new-page-layout__avatar" alt=""/>*/}
        {/*    <span className="new-page-layout__username">Kana Ki</span>*/}
        {/*  </div>*/}
        {/*  <SettingsIcon alt="Settings" className="index-menu__settings-icon"/>*/}
        {/*</div>*/}

        <div className="new-page-layout__top-cta-buttons new-page-layout__expandable">
          <MenuButton
            className="new-page-layout__add-venue"
            Icon={AddIcon}
            onClick={_ => setShowNewVenueModal(true)}
            active={showNewVenueModal}
            AsideIcon={RightArrowIcon}>
            Add your venue
          </MenuButton>
        </div>

        <div className="new-page-layout__panel-content new-page-layout__expandable">
          {PanelContent}
        </div>

        <div className="new-page-layout__bottom-cta-buttons new-page-layout__expandable">
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
        {PageContent}
      </div>
    </div>

    {showNewVenueModal && <NewVenueModal onClose={_ => setShowNewVenueModal(false)} />}
    {showSettingsModal && <SettingsModal onClose={_ => setShowSettingsModal(false)} /> }
  </>
}

NewPageLayout.Panel = ({ children }) => <>{children}</>;
NewPageLayout.Page = ({ children }) => <>{children}</>;

export { NewPageLayout };
