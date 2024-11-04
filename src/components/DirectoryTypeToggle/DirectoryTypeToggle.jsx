import {settingsService} from "../../services/settingsService";
import ListViewIcon from "../../assets/icons/list-view-icon.svg";
import CardViewIcon from "../../assets/icons/card-view-icon.svg";
import React, {useEffect, useState} from "react";

import "./DirectoryTypeToggle.css";

export const DirectoryTypeToggle = () => {

  const listViewSetting = settingsService.getSetting("directory-view-type");
  const [ listView, setListView ] = useState(listViewSetting === 'list-view');

  useEffect(() => settingsService.observe(() => {
    const listViewSetting = settingsService.getSetting("directory-view-type");
    setListView(listViewSetting === 'list-view');
  }), []);

  return <div className="aether-venues__view-toggle">
    <button onClick={() => settingsService.setSetting("directory-view-type", "list-view")} className={listView ? `active` : undefined}>
      <ListViewIcon/> List view
    </button>
    <button onClick={() => settingsService.setSetting("directory-view-type", "card-view")} className={listView ? undefined : `active`}>
      <CardViewIcon/> Card view
    </button>
  </div>

}