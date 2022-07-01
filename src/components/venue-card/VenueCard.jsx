import React from "react";
import "./venue-card.css";
import { Modal } from "../modal/Modal";
import { Time } from "../time/Time";
import { favouritesService } from "../../services/favouritesService";
import { visitedService } from "../../services/visitedService";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { VenueOpening } from "../venue-opening/VenueOpening";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { ReactComponent as VisitedIcon } from "../../assets/icons/visited-icon.svg";
import { ReactComponent as UnvisitedIcon } from "../../assets/icons/not-visited-icon.svg";
import { Location } from "../location/Location";

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
        return <div id={"venue-" + (this.props.venue.id)} className={"venue-card " + (this.props.venue.id) + (this.props.venue.open ? " venue-card--open" : "") + (this.props.time ? "" : " venue-card--no-time")}>

            <div className="venue-card__block" 
                 role="row" 
                 onClick={ this._onVenueClick.bind(this) }>

                <img className="venue-card__photo" src={ `${process.env.REACT_APP_FFXIV_VENUES_API_ROOT}/venue/${this.props.venue.id}/media` } alt="" loading="lazy" />

                <div className="venue-card__options">
                    <FavoriteIcon lit={this.props.venue.isFavorite()} onClick={e => this.toggleFavorite(e) } />
                    { this.props.venue.isVisited() ? 
                        <VisitedIcon onClick={e => this.removeVisited(e)} /> : 
                        <UnvisitedIcon onClick={e => this.setVisited(e)} /> }
                </div>

                { this.props.venue.isNew() ? 
                    <div className="venue-card__new">new!</div> :
                    null
                }

                { this.props.venue.open ? 
                    <div className="venue-card__open">Open now!</div> :
                    null
                }

                <div className="venue-card__summary">
                    <div className="venue-card__name">
                        { this.props.venue.name }
                    </div>

                    { this.props.opening && 
                        <div className="venue-card__time">
                            <div className="venue-card__start"><Time time={this.props.opening.start} day={this.props.opening.day} format24={false} /></div>
                            <div className="venue-card__time-split">{this.props.opening.end && <React.Fragment>-</React.Fragment>}</div>
                            <div className="venue-card__end">{this.props.opening.end && <Time time={this.props.opening.end} day={this.props.opening.day} format24={false} /> }</div>
                        </div>
                    }

                    <div className="venue-card__location">
                        <Location location={this.props.venue.location} />
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
    }

}

export { VenueCard };