import "./VenueDirectoryPage.css"

import { useEffect, useState } from "react";
import { VenueFiltersPanel } from "../../components/VenueFilterPanel/VenueFiltersPanel";
import { LoadingIcon } from "../../components/Icons/LoadingIcon";
import { WeeklyVenueList } from "../../components/WeeklyVenueList/WeeklyVenueList";
import { WeeklyCardScroller } from "../../components/WeeklyCardScroller/WeeklyCardScroller";
import { DefaultPageLayout } from "../../layouts/DefaultPageLayout/DefaultPageLayout";
import { venueService } from "../../services/venueService";
import { favouritesService } from "../../services/favouritesService";
import { DirectoryTypeToggle } from "../../components/DirectoryTypeToggle/DirectoryTypeToggle";
import { settingsService } from "../../services/settingsService";

export function VenueDirectoryPage() {
  const listViewSetting = settingsService.getSetting("directory-view-type");

  const [ venues, setVenues ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ listView, setListView ] = useState(listViewSetting === 'list-view');

  useEffect(() => { venueService.getVenueSchedule().then(setVenues).catch(setError) }, [ ]);
  useEffect(() => { favouritesService.observe(async _ => setVenues(await venueService.getVenueSchedule())) }, [ ]);
  useEffect(() => settingsService.observe(() => {
    const listViewSetting = settingsService.getSetting("directory-view-type");
    setListView(listViewSetting === 'list-view');
  }), []);

  const onFilter = (filters) => { venueService.getVenueSchedule(filters).then(setVenues).catch(setError) };

  return <DefaultPageLayout header={<DirectoryTypeToggle/>}>
    <div className="venue-directory-page">
      <VenueFiltersPanel onFilter={onFilter} />
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

        listView ? <WeeklyVenueList venues={venues} onFilter={onFilter}/> :
                   <WeeklyCardScroller venues={venues} onFilter={onFilter}/>
      }
    </div>
  </DefaultPageLayout>
}
