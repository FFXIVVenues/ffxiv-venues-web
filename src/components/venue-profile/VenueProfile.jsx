import React, {Profiler} from "react";
import { favouritesService } from "../../services/favouritesService";
import { visitedService } from "../../services/visitedService";
import days from "../../consts/days.json";
import { FavoriteIcon } from "../../components/icons/FavoriteIcon";
import { ReactComponent as NotVisitedIcon }  from "../../assets/icons/not-visited-icon.svg";
import { ReactComponent as VisitedIcon } from "../../assets/icons/visited-icon.svg";
import { ReactComponent as WebIcon } from "../../assets/icons/web-icon.svg";
import { ReactComponent as DiscordIcon } from "../../assets/icons/discord-icon.svg";
import { DateString } from "../date-string/DateString";
import { TimeString } from "../time-string/TimeString";
import { Location } from "../location/Location";
import { nth } from "../date-string/Nth";
import "./venue-profile.css";

class VenueProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisited: visitedService.isVisited(props.venue.id),
            isFavourite: favouritesService.isFavourite(props.venue.id)
        };
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
        window.history.pushState(null,null,'#' + this.props.venue.id);
    }

    componentWillUnmount() {
        window.history.pushState(null,null,"#");
    }

    render() {
        const overrides = this.props.venue.scheduleOverrides && this.props.venue.scheduleOverrides.filter(o => new Date() < o.end);
        const currentOverride = overrides && overrides.find(s => s.isNow);
        const futureOverrides = overrides && overrides.find(s => !s.isNow);

        return (
          <Profiler id="venue-profile" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
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

                { this.props.venue.bannerUri &&
                    <img className="venue-profile__banner" src={this.props.venue.bannerUri} alt="" />
                }

                <div className="venue-profile__details">

                    { this.props.venue.notices?.filter(n => n.isNow).map((n, i) =>
                        <div className="venue-profile__notice" key={i}>
                            {n.message}
                        </div>
                    )}

                    <div className="venue-profile__heading">
                        <h2>
                            { this.props.venue.name }
                        </h2>
                    </div>

                    <p className="venue-profile__location">
                        <Location location={this.props.venue.location} />
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
                            { this.props.venue.description.map((para, i) => <p key={i}>{para}</p>)}
                        </article>
                    }

                    { this.props.venue.mareCode &&
                      <div className="venue-profile_syncshell">
                          <div className="venue-profile_syncshell-id">
                              <span className="venue-profile_syncshell-label">SyncShell ID</span>
                              <span className="venue-profile_syncshell-value">{this.props.venue.mareCode}</span>
                          </div>
                          <div className="venue-profile_syncshell-password">
                              <span className="venue-profile_syncshell-label">SyncShell Password</span>
                              <span className="venue-profile_syncshell-value">{this.props.venue.marePassword}</span>
                          </div>
                      </div>
                    }

                    { this.props.venue.tags && this.props.venue.tags.length &&
                      <div className="venue-profile_tags">
                          {this.props.venue.tags.map((tag, i) =>
                            <div className="venue-profile__tag" key={i}>{tag}</div>
                          )}
                      </div>
                    }

                    <Profiler id="venue-profile__schedule" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
                        <div className="venue-profile__schedule">

                            { this.props.venue.resolution?.isNow &&
                              <div className="venue-profile__schedule-block venue-profile__schedule-summary venue-profile__schedule-summary--active">
                                  Open now until <TimeString date={this.props.venue.resolution.end}/>!
                              </div>
                            }

                            { this.props.venue.resolution && !this.props.venue.resolution.isNow &&
                              <div className="venue-profile__schedule-block venue-profile__schedule-summary">
                                  Next open on <DateString date={this.props.venue.resolution.start} /> at <TimeString date={this.props.venue.resolution.start} />
                              </div>
                            }

                            { currentOverride &&
                              <div className="venue-profile__schedule-block venue-profile__override">
                                  Venue is closed until <DateString date={currentOverride.end} />!
                              </div>
                            }

                            { (this.props.venue.schedule && this.props.venue.schedule.length > 0) &&
                                <div className="venue-profile__schedule-block venue-profile__schedule-wrapper">
                                    <table className="venue-profile__schedule-map">
                                        <tbody>
                                            { this.props.venue.schedule.map((t, i) => {
                                                return <>
                                                    <tr key={i} className={`venue-profile__opening-time ${t.resolution.isNow ? "venue-profile__opening-time--active" : ""}`}>
                                                        <td className="venue-profile__day"><strong>Every {t.interval.intervalArgument !== 1 && t.interval.intervalArgument+ nth(t.interval.intervalArgument)} {days[(t.resolution.start.getDay()+6)%7]}</strong></td>
                                                        <td className="venue-profile__start"><TimeString date={t.resolution.start} format24={false} /></td>
                                                        <td className="venue-profile__split">-</td>
                                                        <td className="venue-profile__end"><TimeString date={t.resolution.end} format24={false} /></td>
                                                    </tr>
                                                    {t.interval.intervalArgument !== 1 &&
                                                      <tr>
                                                          <td colSpan={4} className="venue-profile__next">Next {days[(t.resolution.start.getDay()+6)%7]} opening on {DateString.months[t.resolution.start.getMonth()]} {t.resolution.start.getDate()}{nth(t.resolution.start.getDay())}</td>
                                                      </tr>}
                                                </>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            }

                            { (futureOverrides && futureOverrides.length > 0) &&
                                <article className="venue-profile__schedule-block venue-profile__schedule-exceptions">
                                    Venue will be closed for the following periods:
                                    <table>
                                        { futureOverrides.map((o, i) =>
                                            <tr key={i}>
                                                <td><DateString date={o.start} /> <TimeString date={o.start} /></td>
                                                <td className="venue-profile__split">-</td>
                                                <td><DateString date={o.end} />  <TimeString date={o.end} /></td>
                                            </tr>
                                        )}
                                    </table>
                                </article>
                            }
                        </div>
                    </Profiler>
                    { !!(currentOverride || (this.props.venue.schedule && this.props.venue.schedule.length)) &&
                      <small className="venue-profile__timezone-notice">All times are in <em>your</em> timezone.</small> }
                </div>

            </div>
          </Profiler>);
    }

}

export { VenueProfile };