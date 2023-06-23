import React from "react";
import days from "../../consts/days.json";
import { timeService } from "../../services/timeService";
import { NextDayIcon } from "../icons/NextDayIcon";
import "./time.css";

class Time extends React.Component {

    render() {
        const iso = timeService.convertToIsoTime(this.props.time);
        const twelveHour = timeService.convertTo12HourTime(this.props.time);
        
        return (<time className="time-component" dateTime={iso}>
            { this.props.format24 
                ? <React.Fragment>{this.props.time.hour.toString().padStart(2, "0")}:{this.props.time.minute.toString().padStart(2, "0")}</React.Fragment>
                : <React.Fragment>
                    { twelveHour.hour}:{twelveHour.minute.toString().padStart(2, "0") }
                    { twelveHour.pm ? "pm": "am" }
                </React.Fragment>
            }
            <span>
                {this.props.time.nextDay &&
                    <NextDayIcon alt={`Past midnight; ${days[this.props.day + 1 > 6 ? 0 : this.props.day + 1]} morning.`} /> }
            </span>
        </time>);
    }

}

export { Time }