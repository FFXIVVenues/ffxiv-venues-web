import React from "react";
import { timeService } from "../../services/timeService";
import "./schedule-string.css";

class ScheduleString extends React.Component {

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
        </time>);
    }

}

export { ScheduleString }