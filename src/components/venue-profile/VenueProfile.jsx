import React from "react";
import { Time } from "../time/Time";
// import { NsfwIcon } from "../icons/NsfwIcon";
// import { SfwIcon } from "../icons/SfwIcon";
import { favouritesService } from "../../services/favouritesService";
import { visitedService } from "../../services/visitedService";
import { Notice } from "../notice/notice";
import days from "../../consts/days.json";
import discordIcon from "../../assets/discord-icon.svg";
import favouriteIcon from "../../assets/favourite-icon.svg";
import notVisitedIcon from "../../assets/not-visited-icon.svg";
import visitedIcon from "../../assets/visited-icon.svg";
import webIcon from "../../assets/web-icon.svg";
import "./venue-profile.css";

class VenueProfile extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isVisited: visitedService.isVisited(props.venue.id),
            isFavourite: favouritesService.isFavourite(props.venue.id)
        }
        this._onVisitedClick = this._onVisitedClick.bind(this);
        this._onFavoriteClick = this._onFavoriteClick.bind(this);
    }

    _onVisitedClick() {
        if (this.state.isVisited) visitedService.removeVisited(this.props.venue.id)
        else visitedService.setVisited(this.props.venue.id);

        this.setState({
            isVisited: !this.state.isVisited
        });
    }

    _onFavoriteClick() {
        if (this.state.isFavourite) favouritesService.removeFavourite(this.props.venue.id)
        else favouritesService.setFavourite(this.props.venue.id);
        
        this.setState({
            isFavourite: !this.state.isFavourite
        });
    }

    render() {
        

        return (
            <div className="venue-profile">

                <div className="venue-profile__banner" 
                     style={ this.props.venue.banner ? { backgroundImage: `url("${this.props.venue.banner}")` } : null }>

                    <div className="venue-profile__user-settings">
                        <button 
                            className={"venue-profile__favourite-button" + (this.state.isFavourite ? " venue-profile__favourite-button--visited" : " venue-profile__favourite-button--not-visited")}
                            onClick={this._onFavoriteClick}>
                            <img className="venue-profile__favourite-icon" src={favouriteIcon} alt="" />
                            Favorite venue
                        </button>

                        <button 
                            className={"venue-profile__visited-button" + (this.state.isVisited ? " venue-profile__visited-button--visited" : " venue-profile__visited-button--not-visited")}
                            onClick={this._onVisitedClick}>
                            { this.state.isVisited ? 
                                <img className="venue-profile__visited-icon" src={visitedIcon} alt="" /> :
                                <img className="venue-profile__visited-icon" src={notVisitedIcon} alt="" />
                            }
                            Visited
                        </button>
                    </div>
                    
                </div>

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

                    { this.props.venue.notices?.map(n => 
                        <Notice summary={n} />
                    )}

                    <p className="venue-profile__description">
                        { this.props.venue.description && <React.Fragment>{this.props.venue.description}</React.Fragment> }
                    </p>
                    
                    <table className="venue-profile__opening-times">
                        <tbody>
                        { this.props.venue.times.map((t, i) => 
                            <tr key={i}>
                                <td className="venue-profile__day"><strong>{days[t.day]}</strong></td> 
                                <td className="venue-profile__start"><Time time={t.start} day={t.day} format24={false} /></td>
                                <td className="venue-profile__split">{ t.end && <React.Fragment>-</React.Fragment> }</td>
                                <td className="venue-profile__end">{ t.end && <Time time={t.end} day={t.day} format24={false} /> }</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <small className="venue-profile__timezone-notice">All times are in <em>your</em> timezone.</small>
{/* 
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
                    </div> */}

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