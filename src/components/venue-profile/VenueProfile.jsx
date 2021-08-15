import React from "react";
import { Time } from "../time/Time";
import { NsfwIcon } from "../icons/NsfwIcon";
import { SfwIcon } from "../icons/SfwIcon";
import days from "../../consts/days.json";
import discordIcon from "../../assets/discord-icon.svg"
import webIcon from "../../assets/web-icon.svg"
import "./venue-profile.css";

class VenueProfile extends React.Component {

    render() {
        return (
            <div className="venue-profile">

                <div className="venue-profile__banner" />

                <div className="venue-profile__details">

                    <div className="venue-profile__heading">
                        <h2>
                            { this.props.venue.name }
                        </h2>                
                        { this.props.venue.website && 
                            <a className="venue-profile__website" target="_blank" rel="noreferrer" href={this.props.venue.website}>
                                <img src={webIcon} alt="" />
                            </a>
                        }
                        { this.props.venue.discord && 
                            <a className="venue-profile__discord" target="_blank" rel="noreferrer" href={this.props.venue.discord}>
                                <img src={discordIcon} alt="" />
                            </a>
                        }
                    </div>


                    
                    <p className="venue-profile__location">
                        { this.props.venue.location }
                    </p>

                    <p className="venue-profile__description">
                        { this.props.venue.description && <p className="venue-opening__description">{this.props.venue.description}</p> }
                    </p>
                    
                    <table className="venue-profile__opening-times">
                        { this.props.venue.times.map((t, i) => 
                            <tr key={i}>
                                <td className="venue-profile__day"><strong>{days[t.day]}</strong></td> 
                                <td className="venue-profile__start"><Time time={t.start} day={t.day} format24={false} /></td>
                                <td className="venue-profile__split">{ t.end && <React.Fragment>-</React.Fragment> }</td>
                                <td className="venue-profile__end">{ t.end && <Time time={t.end} day={t.day} format24={false} /> }</td>
                            </tr>
                        )}
                    </table>
                    <small className="venue-profile__timezone-notice">All times are in <em>your</em> timezone.</small>

                    <div className="venue-profile__badge-container">
                        <div className={"venue-profile__sfw" + (this.props.venue.sfw ? " sfw" : " not-sfw")}>
                            { this.props.venue.sfw 
                                ? <React.Fragment>
                                    <SfwIcon />
                                    <span>This venue is a SFW venue.</span>
                                </React.Fragment>
                                : <span>This venue is NOT a SFW venue.</span> 
                            }
                        </div>
                        <div className={"venue-profile__nsfw" + (this.props.venue.nsfw ? " nsfw" : " not-nsfw")}>
                            { this.props.venue.nsfw ? 
                                <React.Fragment>
                                    <NsfwIcon />
                                    <span>This venue offers NSFW services.</span>
                                </React.Fragment> :
                                <span>This venue does NOT offer NSFW services.</span>
                            }
                        </div>
                    </div>

                    { this.props.venue.photos &&
                        <div className="venue-profile_photos">
                            {this.props.venue.images.map(i => 
                                <img className="venue-profile__photo" src={i} alt={`Photograph of venue ${this.props.venue.name}.`} />
                                )}
                        </div>
                    }

                </div>
                
            </div>)
    }

}

export { VenueProfile };