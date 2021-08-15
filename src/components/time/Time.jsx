import React from "react";
import days from "../../consts/days.json";
import { timeService } from "../../services/timeService";
import { NextDayIcon } from "../icons/NextDayIcon";
import "./time.css";

class Time extends React.Component {

    render() {
        const localTime = timeService.getLocalTime(this.props.time);
        
        return (<time dateTime={`${localTime.utcHour.toString().padStart(2, "0")}:${localTime.minute.toString().padStart(2, "0")}Z`}>
            { this.props.format24 
                ? <React.Fragment>{localTime.hour.toString().padStart(2, "0")}:{localTime.minute.toString().padStart(2, "0")}</React.Fragment> 
                : <React.Fragment>
                    { (localTime.hour > 12 ? localTime.hour - 12 : localTime.hour)}:{localTime.minute.toString().padStart(2, "0") }
                    { localTime.hour > 12 ? "pm": "am" }
                </React.Fragment>
            }
            <span>
                {localTime.nextDay && 
                    <NextDayIcon alt={`Past midnight; ${days[this.props.day + 1 > 6 ? 0 : this.props.day + 1]} morning.`} /> }
            </span>
        </time>);
    }

}

export { Time }