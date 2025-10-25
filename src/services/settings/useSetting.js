import { settingsService } from "./settingsService";
import {useEffect, useState} from "react";


export const useSetting = (settingName) => {
    const listViewSetting = settingsService.getSetting(settingName);
    const [ settingValue, setSettingValue ] = useState(listViewSetting);
    useEffect(() => settingsService.observe(() =>
            setSettingValue(settingsService.getSetting(settingName))), []);
    return settingValue;
};