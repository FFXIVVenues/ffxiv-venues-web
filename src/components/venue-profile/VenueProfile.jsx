import React from "react";
import { Time } from "../time/Time";
import { favouritesService } from "../../services/favouritesService";
import { visitedService } from "../../services/visitedService";
import days from "../../consts/days.json";
import { FavoriteIcon } from "../../components/icons/FavoriteIcon";
import { ReactComponent as NotVisitedIcon }  from "../../assets/icons/not-visited-icon.svg";
import { ReactComponent as VisitedIcon } from "../../assets/icons/visited-icon.svg";
import { ReactComponent as WebIcon } from "../../assets/icons/web-icon.svg";
import { ReactComponent as DiscordIcon } from "../../assets/icons/discord-icon.svg";
import { DateString } from "../date/Date";
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

    componentDidMount() {
        window.location.hash = this.props.venue.id;
    }

    componentWillUnmount() {
        window.location.hash = "";
    }

    render() {
        const exceptions = this.props.venue.exceptions && this.props.venue.exceptions.filter(e => {
            const now = new Date();
            const exceptionEnd = new Date(e.end);
            return now < exceptionEnd;
        });

        return (
            <div className="venue-profile">
                <div className="venue-profile__user-settings">
                    <button 
                        className={"venue-profile__favourite-button" + (this.state.isFavourite ? " venue-profile__favourite-button--favourited" : " venue-profile__favourite-button--not-favourited")}
                        onClick={this._onFavoriteClick}>
                        <FavoriteIcon lit={this.state.isFavourite} />
                        Favorite venue
                    </button>

                    <button 
                        className={"venue-profile__visited-button" + (this.state.isVisited ? " venue-profile__visited-button--visited" : " venue-profile__visited-button--not-visited")}
                        onClick={this._onVisitedClick}>
                        { this.state.isVisited ? <VisitedIcon /> : <NotVisitedIcon /> }
                        Visited
                    </button>
                </div>

                <div className="venue-profile__banner" 
                     style={ this.props.venue.banner ? { backgroundImage: `url("${this.props.venue.banner}")` } : null }>
                </div>

                <div className="venue-profile__details">

                    { this.props.venue.notices?.map((n, i) => 
                        <div className="venue-profile__notice" key={i}>
                            {n}
                        </div>
                    )}

                    <div className="venue-profile__heading">
                        <h2>
                            { this.props.venue.name }
                        </h2>                
                    </div>

                    <p className="venue-profile__location">
                        { this.props.venue.location }
                    </p>
                    
                    { this.props.venue.website && 
                        <a className="venue-profile__social" target="_blank" rel="noreferrer" href={this.props.venue.website}>
                            <WebIcon /> 
                            <div>
                                <div className="venue-profile__social-cta">Visit website</div>
                                <div className="venue-profile__social-url">{this.props.venue.website}</div>
                            </div>
                        </a>
                    }
                    { this.props.venue.discord && 
                        <a className="venue-profile__social" target="_blank" rel="noreferrer" href={this.props.venue.discord}>
                            <DiscordIcon /> 
                            <div>
                                <div className="venue-profile__social-cta">Join Discord</div>
                                <div className="venue-profile__social-url">{this.props.venue.discord}</div>
                            </div>
                            
                        </a>
                    }

                    { this.props.venue.description && this.props.venue.description.length > 0 && 
                        <article className="venue-profile__description">
                            { this.props.venue.description.map((para, i) => <p key={i}>{para}</p>) }
                        </article>
                    }

                    { (this.props.venue.times && this.props.venue.times.length > 0) &&
                        <div className="venue-profile__opening-times-wrapper">
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
                        </div>
                    }

                    { (exceptions && exceptions.length > 0) && 
                        <article className="venue-profile__exceptions">
                            <p>This venue will be closed at the following times:</p>
                            <table>
                                { this.props.venue.exceptions.map((e, i) => {
                                    const exceptionStart = new Date(e.start);
                                    const exceptionEnd = new Date(e.end);
                                    return (<tr key={i}>
                                        <td><DateString date={exceptionStart} /></td>
                                        <td className="venue-profile__split">{ <React.Fragment>-</React.Fragment> }</td>
                                        <td><DateString date={exceptionEnd} /></td>
                                    </tr>);
                                })}
                            </table>
                        </article>
                    }

                    { this.props.venue.photos &&
                        <div className="venue-profile_photos">
                            {this.props.venue.images.map((src, i) => 
                                <img className="venue-profile__photo" key={i} src={src} alt={`Photograph of venue ${this.props.venue.name}.`} />
                            )}
                        </div>
                    }

                    { this.props.venue.tags &&
                        <div className="venue-profile_tags">
                            {this.props.venue.tags.map((tag, i) => 
                                <div className="venue-profile__tag" key={i}>{tag}</div>
                            )}
                        </div>
                    }

                </div>
                
            </div>)
    }

}

export { VenueProfile };