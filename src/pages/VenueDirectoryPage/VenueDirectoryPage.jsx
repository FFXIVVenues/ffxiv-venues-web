import "./VenueDirectoryPage.css";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DefaultPageLayout } from "../../layouts/DefaultPageLayout/DefaultPageLayout";
import { VenueProfile } from "../../components/VenueProfile/VenueProfile";
import { venueService } from "../../services/venues/venueService";
import { DirectoryTypeToggle } from "../../components/DirectoryTypeToggle/DirectoryTypeToggle";
import { Modal } from "../../components/ModalStage/Modal";
import { ModalCloseButton } from "../../components/ModalStage/ModalCloseButton";
import {VenueFiltersPanel} from "../../components/VenueFilterPanel/VenueFiltersPanel";
import {LoadingIcon} from "../../components/Icons/LoadingIcon";
import {WeeklyVenueList} from "../../components/WeeklyVenueList/WeeklyVenueList";
import {WeeklyCardScroller} from "../../components/WeeklyCardScroller/WeeklyCardScroller";
import {useSetting} from "../../services/settings/useSetting";
import {useVenueSchedule} from "../../services/venues/useVenueSchedule";

export function VenueDirectoryPage() {
  const navigate = useNavigate();

  useVenueHashRedirect();
  const [venue] = useVenueFromRoute();
  const listView = useSetting("directory-view-type") === "list-view";
  const [ venues, error, setFilters ] = useVenueSchedule();


  function openVenue(venueId) {
    navigate(`/venue/${venueId}`);
  }

  function closeVenue() {
    navigate(`/`);
  }

  return <DefaultPageLayout header={<DirectoryTypeToggle/>}>
    <div className="venue-directory">
      <VenueFiltersPanel onFilter={setFilters} />
      {
        error ?
            <div className="venue-directory__error">
              😱 We couldn't load the venues! {error.message}
            </div> :

            venues == null ?
                <div className="venue-directory__loading">
                  <LoadingIcon/> Getting venues...
                </div> :

                venues.length === 0 ?
                    <div className="venue-directory__none-found">
                      No venues yet!
                    </div> :

                    listView ? <WeeklyVenueList venues={venues} onVenueClick={openVenue} /> :
                        <WeeklyCardScroller venues={venues} onVenueClick={openVenue} />
      }
    </div>

    {venue &&
        <Modal className="venue-modal" onStageClick={closeVenue} onEscape={closeVenue}>
          <ModalCloseButton onClick={closeVenue} />
          <VenueProfile venue={venue} />
        </Modal>
    }
  </DefaultPageLayout>
}


function useVenueHashRedirect() {
  const { currentVenueId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const requestedVenueId = location.hash.substring(1);
    if (requestedVenueId && requestedVenueId !== currentVenueId)
      navigate(`/venue/${requestedVenueId}`);
  }, []);
}


function useVenueFromRoute() {
  const { venueId } = useParams();
  const [ venue, setVenue ] = useState(null);

  useEffect(() => {
    if (venueId == null && venue != null) {
      setVenue(null);
      return;
    }
    venueService.getVenueById(venueId).then(setVenue);
  }, [ venueId ]);

  return [ venue]
}