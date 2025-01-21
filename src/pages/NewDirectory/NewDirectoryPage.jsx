import "./NewDirectoryPage.css"

import {Profiler, useEffect, useState} from "react";
import {LoadingIcon} from "../../components/Icons/LoadingIcon";
import {WeeklyVenueList} from "../../components/WeeklyVenueList/WeeklyVenueList";
import {NewPageLayout} from "../../layouts/NewPageLayout/NewPageLayout";
import {venueService} from "../../services/venueService";
import {favouritesService} from "../../services/favouritesService";
import {settingsService} from "../../services/settingsService";
import {DirectoryMenu} from "./DirectoryMenu/DirectoryMenu";
import {NewWeeklyCardScroller} from "../../components/NewWeeklyCardScroller/NewWeeklyCardScroller";
import splashVideo from "./splash.webm";


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
    <NewPageLayout>

      <NewPageLayout.Panel>
        <DirectoryMenu onFilter={onFilter}/>
      </NewPageLayout.Panel>

      <NewPageLayout.Page>
        <div className="new-venue-directory-page">

          <div className="new-venue-directory__splash-video-container">
            <video className="new-venue-directory__splash-video" autoPlay loop muted inert>
              <source src={splashVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="new-venue-directory__splash-video-gradient"></div>
          </div>

          <div className="new-venue-directory-page__schedule">
          {
            error ?
              <div className="new-venue-directory__error">
                😱 We couldn't load the venues! <br/>
                {error.message}
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
        </div>
      </NewPageLayout.Page>
    </NewPageLayout>
  </Profiler>
}
