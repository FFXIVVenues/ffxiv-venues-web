import React from "react";
import {nth} from "./Nth";

class DateString extends React.Component {

    render() {
        const daysUntil = (new Date() - this.props.date) / (1000 * 60 * 60 * 24);
        return <React.Fragment>
            {DateString.days[this.props.date.getDay()]} {daysUntil > 28 && DateString.months[this.props.date.getMonth()]} {daysUntil > 6 && this.props.date.getDate()}{daysUntil > 6 && nth(this.props.date.getDate())}
        </React.Fragment>
    }

}

DateString.days = [
    "Sunday",
    "Monday", 
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

DateString.months = [
    "January",
    "February", 
    "March",
    "April", 
    "May", 
    "June", 
    "July",
    "August",
    "September",
    "October",
    "November", 
    "December"
];

export { DateString }