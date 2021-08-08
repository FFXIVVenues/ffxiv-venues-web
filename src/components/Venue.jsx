import React from "react";
import "./venue.css";

const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
  }

class Venue extends React.Component {

    render() {
        const currentTimezoneOffset = new Date().getTimezoneOffset() / -60;
        const localStartStr = this.getLocalStartTime(currentTimezoneOffset);
        const localEndStr = this.getLocalEndTime(currentTimezoneOffset);

        return <div className="venue">
            <details>
                <summary>
                    <div className="venue__summary-row" role="row">
                        <div className="venue__cell venue__day" >{days[this.props.day]}</div>
                        <div className="venue__cell venue__start">{localStartStr}</div>
                        <div className="venue__cell venue__time-split">{localEndStr && <React.Fragment>-</React.Fragment>}</div>
                        <div className="venue__cell venue__end">{localEndStr}</div>
                        <div className="venue__cell venue__name" >{this.props.name}</div>
                        <div className="venue__cell venue__location" >{this.props.location}</div>
                        <div className="venue__cell venue__icons">
                            { this.props.sfw && <span title="This is a SFW venue">💚</span> }
                            { this.props.nsfw && <span title="This venue offers NSFW services">🔞</span> }
                        </div>
                    </div>
                </summary>
                <div className="venue__detail-row">
                    <p className="venue__description">{this.props.description}</p>
                    <p className="venue__time-detail">
                        Opens at: {localStartStr}
                        { localEndStr && <span><br />Closes at: {localEndStr}</span> }
                    </p>
                    <p>
                        { this.props.location }
                    </p>
                    <p>
                        {this.props.sfw ?
                            <span>💚 This venue is a SFW venue.</span> :
                            <span>This venue is NOT a SFW venue.</span> 
                        }
                        <br />
                        {this.props.nsfw ? 
                            <span>🔞 This venue offers NSFW services.</span> :
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
        let localEndStr = "";
        if (this.props.end) {
            const utcEndHour = parseInt(this.props.end.substr(0, 2));
            const localEndMinute = parseInt(this.props.end.substr(2, 2));
            let nextDay = this.props.start.length === 6 && this.props.start.substr(4, 2) === "ND";
            let localEndHour = utcEndHour + currentTimezoneOffset;
            if (localEndHour < 0) {
                localEndHour = 24 + localEndHour;
                nextDay = false;
            }
            if (localEndHour >= 24) {
                localEndHour = localEndHour - 24;
                nextDay = true;
            }
            localEndStr = `${localEndHour < 10 ? "0" : ""}${localEndHour}:${localEndMinute < 10 ? "0" : ""}${localEndMinute} ${nextDay && "(next day)"}`;
        }
        return localEndStr;
    }

    getLocalStartTime(currentTimezoneOffset) {
        const utcStartHour = parseInt(this.props.start.substr(0, 2));
        const localStartMinute = parseInt(this.props.start.substr(2, 2));
        let nextDay = this.props.start.length === 6 && this.props.start.substr(4, 2) === "ND";
        let localStartHour = utcStartHour + currentTimezoneOffset;
        if (localStartHour < 0) {
            localStartHour = 24 + localStartHour;
            nextDay = false;
        }
        if (localStartHour >= 24) {
            localStartHour = localStartHour - 24;
            nextDay = true;
        }
        return `${localStartHour < 10 ? "0" : ""}${localStartHour}:${localStartMinute < 10 ? "0" : ""}${localStartMinute} ${nextDay && "(next day)"}`;
    }
}

export { Venue };