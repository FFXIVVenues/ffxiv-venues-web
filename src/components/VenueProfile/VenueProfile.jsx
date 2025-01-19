import "./VenueProfile.css";
import React, { useState, useEffect, useCallback, Profiler } from "react";
import { favouritesService } from "../../services/favouritesService";
import { visitedService } from "../../services/visitedService";
import { FavoriteIcon } from "../Icons/FavoriteIcon";
import NotVisitedIcon from "../../assets/icons/not-visited-icon.svg";
import VisitedIcon from "../../assets/icons/visited-icon.svg";
import WebIcon from "../../assets/icons/web-icon.svg";
import DiscordIcon from "../../assets/icons/discord-icon.svg";
import { DateString } from "../DateString/DateString";
import { TimeString } from "../TimeString/TimeString";
import { Location } from "../Location/Location";
import Markdown from 'react-markdown';

const VenueProfile = ({ venue }) => {
    const [isVisited, setIsVisited] = useState(visitedService.isVisited(venue.id));
    const [isFavourite, setIsFavourite] = useState(favouritesService.isFavourite(venue.id));

    const onVisitedClick = useCallback(() => {
        if (isVisited) visitedService.removeVisited(venue.id);
        else visitedService.setVisited(venue.id);
        setIsVisited(!isVisited);
    }, [isVisited, venue.id]);

    const onFavoriteClick = useCallback(() => {
        if (isFavourite) favouritesService.removeFavourite(venue.id);
        else favouritesService.setFavourite(venue.id);
        setIsFavourite(!isFavourite);
    }, [isFavourite, venue.id]);

    useEffect(() => {
        window.history.pushState(null, null, '#' + venue.id);
        return () => {
            window.history.pushState(null, null, "#");
        };
    }, [venue.id]);

    const overrides = venue.scheduleOverrides && venue.scheduleOverrides.filter(o => new Date() < o.end);
    const currentOverride = overrides && overrides.find(s => s.isNow);
    const futureOverrides = overrides && overrides.find(s => !s.isNow);
    const openlyNsfw = venue.sfw === false;
    const hasCourts = venue.tags.indexOf("Courtesans") > -1;

    return (
      <Profiler id="venue-profile" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
          <div className={"venue-profile" + (venue.resolution?.isNow ? " venue-profile--active" : "")}>
              <div className="venue-profile__user-settings">
                  <button
                    className={"venue-profile__favourite-button" + (isFavourite ? " venue-profile__favourite-button--favourited" : " venue-profile__favourite-button--not-favourited")}
                    onClick={onFavoriteClick}>
                      <FavoriteIcon lit={isFavourite} />
                      Favorite venue
                  </button>

                  <button
                    className={"venue-profile__visited-button" + (isVisited ? " venue-profile__visited-button--visited" : " venue-profile__visited-button--not-visited")}
                    onClick={onVisitedClick}>
                      {isVisited ? <VisitedIcon /> : <NotVisitedIcon />}
                      Visited
                  </button>
              </div>

              {venue.bannerUri &&
                <img className="venue-profile__banner" src={venue.bannerUri} alt="" />
              }

              <div className="venue-profile__details">


                  {venue.notices?.filter(n => n.isNow).map((n, i) =>
                    <div className="venue-profile__notice" key={i}>
                        {n.message}
                    </div>
                  )}

                  <div className="venue-profile__heading">
                      <h2>{venue.name}</h2>
                  </div>

                  <p className="venue-profile__location">
                      <Location location={venue.location} />
                  </p>

                  {venue.website &&
                    <a className="venue-profile__social" target="_blank" rel="noreferrer" href={venue.website}>
                        <WebIcon />
                        <div>
                            <div className="venue-profile__social-cta">Visit website</div>
                            <div className="venue-profile__social-url">{venue.website}</div>
                        </div>
                    </a>
                  }
                  {venue.discord &&
                    <a className="venue-profile__social" target="_blank" rel="noreferrer" href={venue.discord}>
                        <DiscordIcon />
                        <div>
                            <div className="venue-profile__social-cta">Join Discord</div>
                            <div className="venue-profile__social-url">{venue.discord}</div>
                        </div>
                    </a>
                  }

                  { hasCourts && openlyNsfw &&
                    <div className="venue-profile__nsfw-warning">
                        <strong>Warning:</strong> This venue has indicated they are openly NSFW and offer adult services. You must not visit this venue if you are under 18 years of age or the legal age of consent in your country, and by visiting you declare you are not. Be prepared to verify your age.
                    </div>
                  }

                  { hasCourts && !openlyNsfw &&
                    <div className="venue-profile__nsfw-warning">
                        <strong>Warning:</strong> This venue has indicated they offer adult services. You must not partake in these services if you are under 18 years of age or the legal age of consent in your country, and by partaking in these services you declare you are not. Be prepared to verify your age.
                    </div>
                  }

                  { !hasCourts && openlyNsfw &&
                    <div className="venue-profile__nsfw-warning">
                        <strong>Warning:</strong> This venue has indicated they are openly NSFW. You must not visit this venue if you are under 18 years of age or the legal age of consent in your country, and by visiting you declare you are not. Be prepared to verify your age.
                    </div>
                  }

                  {venue.description && venue.description.length > 0 &&
                    <article className="venue-profile__description">
                        <Markdown>{venue.description.join("\n\n")}</Markdown>
                    </article>
                  }

                  {venue.mareCode &&
                    <div className="venue-profile_syncshell">
                        <div className="venue-profile_syncshell-id">
                            <span className="venue-profile_syncshell-label">SyncShell ID</span>
                            <span className="venue-profile_syncshell-value">{venue.mareCode}</span>
                        </div>
                        <div className="venue-profile_syncshell-password">
                            <span className="venue-profile_syncshell-label">SyncShell Password</span>
                            <span className="venue-profile_syncshell-value">{venue.marePassword}</span>
                        </div>
                    </div>
                  }

                  <Profiler id="venue-profile__schedule" onRender={(id, phase, duration) => console.debug(`Rendered: ${id} (${phase}), ${duration}ms.`)}>
                      <div className="venue-profile__schedule">
                          {venue.resolution?.isNow &&
                            <div className="venue-profile__schedule-block venue-profile__schedule-summary venue-profile__schedule-summary--active">
                                Open now until <TimeString date={venue.resolution.end} />!
                            </div>
                          }

                          {venue.resolution && !venue.resolution.isNow &&
                            <div className="venue-profile__schedule-block venue-profile__schedule-summary">
                                Next open <DateString date={venue.resolution.start} /> at <TimeString date={venue.resolution.start} />
                            </div>
                          }

                          {currentOverride && !currentOverride.open &&
                            <div className="venue-profile__schedule-block venue-profile__override">
                                Venue is closed until <DateString date={currentOverride.end} />!
                            </div>
                          }

                          {venue.schedule && venue.schedule.length > 0 &&
                            <div className="venue-profile__schedule-block venue-profile__schedule-wrapper">
                                <table className="venue-profile__schedule-map">
                                    <tbody>
                                    {venue.schedule.map((t, i) => (
                                      <tr key={i} className={`venue-profile__opening-time ${t.resolution.isNow ? "venue-profile__opening-time--active" : ""}`}>
                                          <td className="venue-profile__day"><strong>{t.toString()}</strong></td>
                                          <td className="venue-profile__start"><TimeString date={t.resolution.start} format24={false} /></td>
                                          <td className="venue-profile__split">-</td>
                                          <td className="venue-profile__end"><TimeString date={t.resolution.end} format24={false} /></td>
                                      </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                          }

                          {futureOverrides && futureOverrides.length > 0 &&
                            <article className="venue-profile__schedule-block venue-profile__schedule-exceptions">
                                Venue will be closed for the following periods:
                                <table>
                                    {futureOverrides.map((o, i) =>
                                      <tr key={i}>
                                          <td><DateString date={o.start} /> <TimeString date={o.start} /></td>
                                          <td className="venue-profile__split">-</td>
                                          <td><DateString date={o.end} /> <TimeString date={o.end} /></td>
                                      </tr>
                                    )}
                                </table>
                            </article>
                          }
                      </div>
                  </Profiler>
                  {!!(currentOverride || (venue.schedule && venue.schedule.length)) &&
                    <small className="venue-profile__timezone-notice">All times are in <em>your</em> timezone.</small>
                  }


                  {venue.tags && venue.tags.length &&
                    <div className="venue-profile_tags">
                        {venue.tags.map((tag, i) =>
                          <div className="venue-profile__tag" key={i}>{tag}</div>
                        )}
                    </div>
                  }

              </div>
          </div>
      </Profiler>
    );
};

export { VenueProfile };