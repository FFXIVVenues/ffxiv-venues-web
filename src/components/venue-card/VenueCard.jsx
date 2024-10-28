import React, {Profiler} from "react";
import "./venue-card.css";
import { Modal } from "../modal-stage/Modal";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { VenueListing } from "../venue-listing/VenueListing";
import defaultImage from "./default-banner.jpg";
import { Location } from "../location/Location";
import {DateString} from "../date-string/DateString";
import {TimeString} from "../time-string/TimeString";
import {ModalCloseButton} from "../modal-stage/ModalCloseButton";

class VenueCard extends VenueListing {

    render() {
        const openingResolution = this.props.opening?.resolution || this.props.venue.resolution;
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

                    { this.props.venue.isNew() &&
                        <div className="venue-card__new">New!</div> }

                    { this.props.venue.resolution?.isNow &&
                        <div className="venue-card__open">Open now!</div> }

                    <div className="venue-card__summary">
                        <div className="venue-card__name">
                            { this.props.venue.name }
                        </div>

                        { openingResolution &&
                            <div className="venue-card__time">
                              <div className="venue-card__date"><DateString date={openingResolution.start} /></div>
                              <div className="venue-card__start"><TimeString date={openingResolution.start} format24={false} /></div>
                              <div className="venue-card__time-split">-</div>
                              <div className="venue-card__end"><TimeString date={openingResolution.end} format24={false} /></div>
                            </div>
                        }

                        <div className="venue-card__location">
                            <Location location={this.props.venue.location} shorten />
                        </div>
                    </div>
                </div>
                { this.state.openModal &&
                    <Modal className="venue-modal" onStageClick={this._onCloseClick.bind(this)}>
                        <ModalCloseButton onClick={this._onCloseClick.bind(this)} />
                        <VenueProfile venue={this.props.venue} />
                    </Modal>
                }
            </div>
        </Profiler>
    }

}

export { VenueCard };