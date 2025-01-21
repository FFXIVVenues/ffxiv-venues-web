import "./NewDirectoryPage.css"

import {Profiler, useEffect, useState} from "react";
import {LoadingIcon} from "../../components/Icons/LoadingIcon";
import {WeeklyVenueList} from "../../components/WeeklyVenueList/WeeklyVenueList";
import {WeeklyCardScroller} from "../../components/WeeklyCardScroller/WeeklyCardScroller";
import {NewPageLayout} from "../../layouts/NewPageLayout/NewPageLayout";
import {venueService} from "../../services/venueService";
import {favouritesService} from "../../services/favouritesService";
import {settingsService} from "../../services/settingsService";
import {DirectoryMenu} from "./DirectoryMenu/DirectoryMenu";
import backdropImage from "./backdrop.webp";
import {NewWeeklyCardScroller} from "../../components/NewWeeklyCardScroller/NewWeeklyCardScroller";

export function NewDirectoryPage() {
  console.time("NewDirectoryPage.render");

  const [ venues, setVenues ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ listView, setListView ] = useState(settingsService.getSetting("directory-view-type") === 'list-view');

  useEffect(() => { venueService.getVenueSchedule().then(setVenues).catch(setError) }, [ ]);
  useEffect(() => { favouritesService.observe(async _ => setVenues(await venueService.getVenueSchedule())) }, [ ]);
  useEffect(() => settingsService.observe(() => {
    const listViewSetting = settingsService.getSetting("directory-view-type");
    setListView(listViewSetting === 'list-view');
  }), []);

  const onFilter = (filters) => {
    console.time("NewDirectoryPage.onFilter");

    setVenues(null);
    venueService.getVenueSchedule(filters).then(setVenues).then(_ => setError(null)).catch(setError)
    console.timeEnd("NewDirectoryPage.onFilter");
  };

  return <Profiler id="NewDirectoryPage" onRender={(id, phase, duration) => console.log(`NewDirectoryPage.render: ${duration}ms.`)}>
    <NewPageLayout
      panel={<DirectoryMenu onFilter={onFilter}/>}
      backgroundImage={backdropImage}>
      <div className="new-venue-directory-page">

        {
          error ?
            <div className="new-venue-directory__error">
              😱 We couldn't load the venues! {error.message}
            </div> :

          venues == null ?
            <div className="new-venue-directory__loading">
              <LoadingIcon/> Getting venues...
            </div> :

          venues.length === 0 ?
            <div className="new-venue-directory__none-found">
              No venues yet!
            </div> :

          listView ? <WeeklyVenueList venues={venues} onFilter={onFilter}/> :
                     <NewWeeklyCardScroller venues={venues} onFilter={onFilter}/>
        }
      </div>
    </NewPageLayout>
  </Profiler>
}
