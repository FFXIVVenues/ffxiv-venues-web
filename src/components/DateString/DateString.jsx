import React from "react";
import {nth} from "./Nth";

const today = new Date();
const todaysDay = today.getDay();

class DateString extends React.Component {

    render() {
        const day = this.props.date.getDay();
        const date = this.props.date.getDate();
        const month = this.props.date.getMonth();
        const daysUntil = (this.props.date - today) / (1000 * 60 * 60 * 24);
        return <React.Fragment>
            {todaysDay === day && daysUntil < 1 ? "Today" : DateString.days[day]} {daysUntil > 21 && DateString.months[month]} {daysUntil > 7 && date}{daysUntil > 7 && nth(date)}
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