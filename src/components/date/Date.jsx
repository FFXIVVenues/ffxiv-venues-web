import React from "react";

class DateString extends React.Component {

    render() {
        
        return <React.Fragment>
            {DateString.days[this.props.date.getDay()]}, {DateString.months[this.props.date.getMonth()]} {this.props.date.getDate()} &nbsp;
            { this.props.format24 
                ? <React.Fragment>{this.props.date.getHours().toString().padStart(2, "0")}:{this.props.date.getMinutes().toString().padStart(2, "0")}</React.Fragment> 
                : <React.Fragment>
                    { (this.props.date.getHours() > 12 ? this.props.date.getHours() - 12 : this.props.date.getHours())}:{this.props.date.getMinutes().toString().padStart(2, "0") }
                    { this.props.date.getHours() >= 12 ? "pm": "am" }
                </React.Fragment>
            }
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