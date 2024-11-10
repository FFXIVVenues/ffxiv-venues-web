import "./DefaultPageLayout.css";

import React, { useState, useEffect } from 'react';
import { Modal } from "../../components/ModalStage/Modal";
import { VenueProfile } from "../../components/VenueProfile/VenueProfile";
import { PersonList } from '../../components/PersonList/PersonList';
import { staff } from "../../components/PersonList/PeopleLists";
import DiscordIcon from "../../assets/icons/discord-icon.svg";
import NewVenue from "../../assets/icons/new-venue-icon.svg";
import { Notice } from "../../components/Notice/Notice";
import { NewVenueGuidance } from '../../components/NewVenueGuidance/NewVenueGuidance';
import { ModalCloseButton } from "../../components/ModalStage/ModalCloseButton";
import { venueService } from "../../services/venueService";
import { CtaPanel } from "../../components/CtaPanel/CtaPanel";

const DefaultPageLayout = ({ header, children }) => {
  const [requestedVenue, setRequestedVenue] = useState(null);
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
        <Modal className="venue-modal" onStageClick={() => setRequestedVenue(null)}>
          <ModalCloseButton onClick={() => setRequestedVenue(null)} />
          <VenueProfile venue={requestedVenue} />
        </Modal>
      }

      {showNewVenueModal &&
        <Modal className="new-venue-modal" onStageClick={() => setShowNewVenueModal(false)}>
          <ModalCloseButton onClick={() => setShowNewVenueModal(false)} />
          <NewVenueGuidance />
        </Modal>
      }
    </div>
  );
};

export { DefaultPageLayout };