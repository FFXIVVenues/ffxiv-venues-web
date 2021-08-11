import React from "react";
import "./venue.css";
import days from "../../consts/days.json";

class VenueOpening extends React.Component {

    render() {
        const currentTimezoneOffset = new Date().getTimezoneOffset() / -60;
        const localStartFragment = this.getLocalStartTime(currentTimezoneOffset);
        const localEndFragment = this.getLocalEndTime(currentTimezoneOffset);

        return <div className="venue">
            <details>
                <summary>
                    <div className="venue__summary-row" role="row">
                        <div className="venue__cell venue__start">{localStartFragment}</div>
                        <div className="venue__cell venue__time-split">{localEndFragment && <React.Fragment>-</React.Fragment>}</div>
                        <div className="venue__cell venue__end">{localEndFragment}</div>
                        <div className="venue__cell venue__name" >{this.props.name}</div>
                        <div className="venue__cell venue__location" >{this.props.location}</div>
                        <div className="venue__cell venue__icons">
                            { this.props.sfw && 
                                <img className="venue__sfw-icon"
                                    src="assets/sfw.png"
                                    title="This is a SFW venue"
                                    alt="This is a SFW venue" /> 
                            }
                            { this.props.nsfw && 
                                <img className="venue__nsfw-icon"
                                    src="assets/nsfw.png"
                                    title="This venue offers NSFW services"
                                    alt="This venue offers NSFW services" />                        
                            }
                        </div>
                    </div>
                </summary>
                <div className="venue__detail-row">
                    { this.props.description && <p className="venue__description">{this.props.description}</p> }
                    <p className="venue__time-detail">
                        Opens at: {localStartFragment}
                        { localEndFragment && <span><br />Closes at: {localEndFragment}</span> }
                    </p>
                    <p>
                        { this.props.location }
                    </p>
                    <p>
                        {this.props.sfw ?
                            <React.Fragment>
                                <img className="venue__sfw-detail"
                                    src="assets/sfw.png"
                                    title="This is a SFW venue"
                                    alt="This is a SFW venue" />  
                                <span>This venue is a SFW venue.</span>
                            </React.Fragment> :
                            <span>This venue is NOT a SFW venue.</span> 
                        }
                        <br />
                        {this.props.nsfw ? 
                            <React.Fragment>
                                <img className="venue__nsfw-detail"
                                    src="assets/nsfw.png"
                                    title="This venue offers NSFW services"
                                    alt="This venue offers NSFW services" />
                                <span>This venue offers NSFW services.</span>
                            </React.Fragment> :
                            <span>This venue does NOT offer NSFW services.</span>
                        }
                    </p>
                    { this.props.website && 
                        <a className="venue__website" target="_blank" rel="noreferrer" href={this.props.website}>Website</a>
                    }
                    { this.props.discord && 
                        <a className="venue__descord" target="_blank" rel="noreferrer" href={this.props.discord}>Discord</a>
                    }
                    { this.props.photos &&
                        <div className="venue_photos">
                            {this.props.images.map(i => 
                                <img className="venue__photo" src={i} alt={`Photograph of venue ${this.props.name}.`} />
                                )}
                        </div>
                    }
                </div>
            </details>
        </div>
    }


    getLocalEndTime(currentTimezoneOffset) {
        if (this.props.time.end) {
            const utcEndHour = parseInt(this.props.time.end.substr(0, 2));
            const localEndMinute = parseInt(this.props.time.end.substr(2, 2));
            let nextDay = this.props.time.end.length === 6 && this.props.time.end.substr(4, 2) === "ND";
            let localEndHour = utcEndHour + currentTimezoneOffset;
            if (localEndHour < 0) {
                localEndHour = 24 + localEndHour;
                nextDay = false;
            }
            if (localEndHour >= 24) {
                localEndHour = localEndHour - 24;
                nextDay = true;
            }
            return <React.Fragment>
                {localEndHour < 10 && "0"}{localEndHour}:{localEndMinute < 10 && "0"}{localEndMinute}
                {nextDay && 
                    <img className="venue__next-day"
                        src="assets/next-day.png"
                        title={`Past midnight; ${days[this.props.time.day + 1 > 6 ? 0 : this.props.time.day + 1]} morning.`}
                        alt={`Past midnight; ${days[this.props.time.day + 1 > 6 ? 0 : this.props.time.day + 1]} morning.`} />
                    }
                </React.Fragment>; 
        }
        return undefined;
    }

    getLocalStartTime(currentTimezoneOffset) {
        const utcStartHour = parseInt(this.props.time.start.substr(0, 2));
        const localStartMinute = parseInt(this.props.time.start.substr(2, 2));
        let nextDay = this.props.time.start.length === 6 && this.props.time.start.substr(4, 2) === "ND";
        let localStartHour = utcStartHour + currentTimezoneOffset;
        if (localStartHour < 0) {
            localStartHour = 24 + localStartHour;
            nextDay = false;
        }
        if (localStartHour >= 24) {
            localStartHour = localStartHour - 24;
            nextDay = true;
        }
        return <React.Fragment>
            {localStartHour < 10 ? "0" : ""}{localStartHour}:{localStartMinute < 10 ? "0" : ""}{localStartMinute}
            {nextDay && 
                <img className="venue__next-day"
                    src="assets/next-day.png"
                    title={`Past midnight; ${days[this.props.time.day + 1 > 6 ? 0 : this.props.time.day + 1]} morning.`}
                    alt={`Past midnight; ${days[this.props.time.day + 1 > 6 ? 0 : this.props.time.day + 1]} morning.`} />
            }
        </React.Fragment>;
    }
}

export { VenueOpening as Venue };