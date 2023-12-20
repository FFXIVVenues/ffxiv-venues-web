import React, {Profiler} from "react";
import "./venue-card.css";
import { Modal } from "../modal/Modal";
import { favouritesService } from "../../services/favouritesService";
import { visitedService } from "../../services/visitedService";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { VenueOpening } from "../venue-opening/VenueOpening";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { ReactComponent as VisitedIcon } from "../../assets/icons/visited-icon.svg";
import { ReactComponent as UnvisitedIcon } from "../../assets/icons/not-visited-icon.svg";
import defaultImage from "./default-banner.jpg";
import { Location } from "../location/Location";
import {DateString} from "../date-string/DateString";
import {TimeString} from "../time-string/TimeString";

class VenueCard extends VenueOpening {

    toggleFavorite(e) {
        if (this.props.venue.isFavorite()) favouritesService.removeFavourite(this.props.venue.id);
        else favouritesService.setFavourite(this.props.venue.id);        
        e.stopPropagation();
        this.forceUpdate();
    }

    removeVisited(e) {
        visitedService.removeVisited(this.props.venue.id);
        e.stopPropagation();
        this.forceUpdate();
    }

    setVisited(e) {
        visitedService.setVisited(this.props.venue.id);
        e.stopPropagation();
        this.forceUpdate(); 
    }

    render() {
        return <Profiler id="venue-card" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
            <div id={"venue-" + (this.props.venue.id)} className={"venue-card " +
                                                                    (this.props.venue.id) + 
                                                                    (this.props.venue.resolution?.isNow ? " venue-card--open" : "") +
                                                                    (this.props.venue.resolution ? "" : " venue-card--no-time")}>

                <div className="venue-card__block"
                     role="row"
                     onClick={ this._onVenueClick.bind(this) }>

                    { this.props.venue.bannerUri
                        ? <img className="venue-card__photo" src={this.props.venue.bannerUri} alt="" loading="lazy" />
                        : <img className="venue-card__photo" src={defaultImage} alt="" loading="lazy" />
                    }

                    <div className="venue-card__options">
                        <FavoriteIcon lit={this.props.venue.isFavourite()} onClick={e => this.toggleFavorite(e) } />
                        { this.props.venue.isVisited() ?
                            <VisitedIcon onClick={e => this.removeVisited(e)} /> :
                            <UnvisitedIcon onClick={e => this.setVisited(e)} /> }
                    </div>

                    { this.props.venue.isNew() &&
                        <div className="venue-card__new">new!</div> }

                    { this.props.venue.resolution?.isNow &&
                        <div className="venue-card__open">Open now!</div> }

                    <div className="venue-card__summary">
                        <div className="venue-card__name">
                            { this.props.venue.name }
                        </div>

                        { this.props.opening &&
                            <div className="venue-card__time">
                              { this.props.opening.isWithinWeek === false && <div className="venue-card__date"><DateString date={this.props.opening.resolution.start} /></div> }
                              <div className="venue-card__start"><TimeString date={this.props.opening.resolution.start} format24={false} /></div>
                              <div className="venue-card__time-split">-</div>
                              <div className="venue-card__end"><TimeString date={this.props.opening.resolution.end} format24={false} /></div>
                            </div>
                        }

                        { !this.props.opening && this.props.venue.resolution &&
                          <div className="venue-card__time">
                            { this.props.venue.resolution.isWithinWeek === false && <div className="venue-card__date"><DateString date={this.props.venue.resolution.start} /></div> }
                            <div className="venue-card__start"><DateString date={this.props.venue.resolution.start} /><TimeString date={this.props.venue.resolution.start} format24={false} /></div>
                            <div className="venue-card__time-split">-</div>
                            <div className="venue-card__end"><TimeString date={this.props.venue.resolution.end} format24={false} /></div>
                          </div>
                        }

                        <div className="venue-card__location">
                            <Location location={this.props.venue.location} shorten />
                        </div>
                    </div>
                </div>
                { this.state.openModal &&
                    <Modal className="venue-modal" onStageClick={this._onCloseClick.bind(this)}>
                        <button className="venue-modal__close-button" onClick={this._onCloseClick.bind(this)}><img src="assets/cross.svg" alt="" /></button>
                        <VenueProfile venue={this.props.venue} />
                    </Modal>
                }
            </div>
        </Profiler>
    }

}

export { VenueCard };