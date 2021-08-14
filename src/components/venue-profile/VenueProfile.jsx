import React from "react";
import { Time } from "../time/Time";
import { NsfwIcon } from "../icons/NsfwIcon";
import { SfwIcon } from "../icons/SfwIcon";

class VenueProfile extends React.Component {

    render() {
        return (<div className="venue-profile">
                { this.props.venue.description && <p className="venue-opening__description">{this.props.venue.description}</p> }
            <p className="venue-opening__time-detail">
                Opens at: <Time time={this.props.venue.time.start} day={this.props.venue.time.day} format24={false} />
                { this.props.venue.time.end && <span><br />Closes at: <Time time={this.props.venue.time.end} day={this.props.venue.time.day} format24={false} /></span> }
            </p>
            <p>
                { this.props.venue.location }
            </p>
            <p>
                { this.props.venue.sfw 
                    ? <React.Fragment>
                        <SfwIcon />
                        <span>This venue is a SFW venue.</span>
                      </React.Fragment>
                    : <span>This venue is NOT a SFW venue.</span> 
                }
                <br />
                {this.props.venue.nsfw ? 
                    <React.Fragment>
                        <NsfwIcon />
                        <span>This venue offers NSFW services.</span>
                    </React.Fragment> :
                    <span>This venue does NOT offer NSFW services.</span>
                }
            </p>
            { this.props.venue.website && 
                <a className="venue-opening__website" target="_blank" rel="noreferrer" href={this.props.venue.website}>Website</a>
            }
            { this.props.venue.discord && 
                <a className="venue-opening__descord" target="_blank" rel="noreferrer" href={this.props.venue.discord}>Discord</a>
            }
            { this.props.venue.photos &&
                <div className="venue-opening_photos">
                    {this.props.venue.images.map(i => 
                        <img className="venue-opening__photo" src={i} alt={`Photograph of venue ${this.props.venue.name}.`} />
                        )}
                </div>
            }
        </div>)
    }

}

export { VenueProfile };