import React from "react";
import "./venue-opening.css";
import { Modal } from "../modal/Modal";
import { Time } from "../time/Time";
import { NsfwIcon } from "../icons/NsfwIcon";
import { SfwIcon } from "../icons/SfwIcon";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { timeService } from "../../services/timeService";

class VenueOpening extends React.Component {

    constructor(props) {
        super();
        this.props = props;
        this._isOpen = this.isOpen();
    }

    isOpen() {
        const currentUtcDay = new Date().getUTCDay() - 1;
        if (currentUtcDay === -1) currentUtcDay = 6;
        const currentUtcHour = new Date().getUTCHours();
        const currentUtcMinute = new Date().getUTCMinutes();

        // Assume venue is open for 2 hours
        const endTime = this.props.time.end || timeService.addHours(this.props.time.start, 2)

        let startTimeDay = this.props.time.start.nextDay ? this.props.time.day + 1 : this.props.time.day;
        startTimeDay = startTimeDay === 7 ? 0 : startTimeDay;
        const dayAfterVenueStart = (startTimeDay + 1 === 7 ? 0 : startTimeDay + 1);

        const pastOpeningTime = (currentUtcHour == this.props.time.start.hour && 
                                currentUtcMinute >= this.props.time.start.minute) ||
                                currentUtcHour > this.props.time.start.hour;
        const pastOpening = currentUtcDay === dayAfterVenueStart ||
                            (currentUtcDay === startTimeDay && pastOpeningTime);
                            
        let endTimeDay = endTime.nextDay ? this.props.time.day + 1 : this.props.time.day;
        endTimeDay = endTimeDay === -1 ? 6 : endTimeDay;
        const dayBeforeVenueEnd = (endTimeDay - 1 === -1 ? 6 : endTimeDay - 1);

        const beforeClosingTime = (currentUtcHour == endTime.hour && 
                                    currentUtcMinute < endTime.minute) ||
                                    currentUtcHour < endTime.hour;
        const beforeClosing = currentUtcDay === dayBeforeVenueEnd ||
                              (currentUtcDay === endTimeDay && beforeClosingTime);

        return pastOpening && beforeClosing;
    }

    render() {
        return <div className={"venue-opening" + (this._isOpen ? " venue-opening--open" : "")}>
            <div className="venue-opening__summary-row" role="row">
                <div className="venue-opening__cell venue-opening__start">
                    <Time time={this.props.time.start} day={this.props.time.day} format24={false} /> 
                </div>
                <div className="venue-opening__cell venue-opening__time-split">{this.props.time.end && <React.Fragment>-</React.Fragment>}</div>
                <div className="venue-opening__cell venue-opening__end">{this.props.time.end && <Time time={this.props.time.end} day={this.props.time.day} format24={false} /> }</div>
                <div className="venue-opening__cell venue-opening__name" >{this.props.venue.name}</div>
                <div className="venue-opening__cell venue-opening__location" >{this.props.venue.location}</div>
                <div className="venue-opening__cell venue-opening__icons">
                    { this.props.venue.sfw && <SfwIcon /> }
                    { this.props.venue.nsfw && <NsfwIcon /> }
                </div>
            </div>
            <Modal className="venue-modal__detail-row">
                <VenueProfile vanue={this.props.venue} />
            </Modal>
        </div>
    }

}

export { VenueOpening };