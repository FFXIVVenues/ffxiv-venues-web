import "./DefaultPageLayout.css";

import React, { useState, useEffect } from 'react';
import { Modal } from "../../components/ModalStage/Modal";
import { VenueProfile } from "../../components/VenueProfile/VenueProfile";
import { PersonList } from '../../components/PersonList/PersonList';
import { staff } from "../../components/PersonList/PeopleLists";
import DiscordIcon from "../../assets/icons/discord-icon.svg";
import NewVenue from "../../assets/icons/new-venue-icon.svg";
import { NewVenueGuidance } from '../../components/NewVenueGuidance/NewVenueGuidance';
import { ModalCloseButton } from "../../components/ModalStage/ModalCloseButton";
import { venueService } from "../../services/venueService";
import { CtaPanel } from "../../components/CtaPanel/CtaPanel";
import {Notice} from "../../components/Notice/Notice";

const DefaultPageLayout = ({ header, children }) => {
  const [requestedVenue, setRequestedVenue] = useState(null);
  const [showNoticeModel, setShowNoticeModel] = useState(false);
  const [showNewVenueModal, setShowNewVenueModal] = useState(false);

  useEffect(() => {
    const requestedVenueId = window.location.hash.substring(1);
    venueService.getVenueById(requestedVenueId).then(v => setRequestedVenue(v));
  }, []);

  return (
    <div className="default-page-layout">
      <div className="default-page-layout__heading">
        <h1><img src="/full-logo.png" alt="FFXIV Venues" /></h1>
        {header}
      </div>

      {/*Promotional Notice*/}
      <div className="default-page-layout__promotional_notice" onClick={() => setShowNoticeModel(true)}>
          <Notice>Refuge Coffee: A large venue collaboration event for charity. Today from 10pm EST. </Notice>
        { showNoticeModel &&
          // remember to remove the CSS that pulls the page down too
          <Modal className="default-page-layout__promotional_modal">
            <ModalCloseButton onClick={() => setShowNoticeModel(false)}/>
            <a href={"https://www.refugecoffeeak.com/"} target="_blank" rel="noopener">
              <img alt="Refuge Coffee Collaboration Charity Event" src="/promotions/refugecoffecolab.png"  />
            </a>
          </Modal>
        }
      </div>

      <div className="default-page-layout__content">
        {children}
      </div>

      <div className="default-page-layout__meta-panel">
        <div className="default-page-layout__cta-panels">
          <CtaPanel
            title={<><NewVenue /> Looking to add your venue to the index?</>}
            buttonLabel="Add your venue! 🥰"
            onClick={() => setShowNewVenueModal(true)}
          />
          <CtaPanel
            title={<><DiscordIcon /> Looking for the home of FFXIV Venues?</>}
            buttonLabel="Join the discord!"
            href="https://discord.gg/gTP65VYcMj"
          />
        </div>
        <div className="default-page-layout__people-lists">
          <PersonList
            className="default-page-layout__staff-list default-page-layout__staff-list--collapsible"
            heading="Meet the staff"
            people={staff}
            collapsible={true}
          />
          <PersonList
            className="default-page-layout__staff-list default-page-layout__staff-list--not-collapsible"
            heading="Meet the staff"
            people={staff}
            collapsible={false}
          />
        </div>
      </div>

      {requestedVenue &&
        <Modal className="venue-modal" onStageClick={() => setRequestedVenue(null)} onEscape={() => setRequestedVenue(null)}>
          <ModalCloseButton onClick={() => setRequestedVenue(null)} />
          <VenueProfile venue={requestedVenue} />
        </Modal>
      }

      {showNewVenueModal &&
        <Modal className="new-venue-modal" onStageClick={() => setShowNewVenueModal(false)} onEscape={() => setRequestedVenue(null)}>
          <ModalCloseButton onClick={() => setShowNewVenueModal(false)} />
          <NewVenueGuidance />
        </Modal>
      }
    </div>
  );
};

export { DefaultPageLayout };