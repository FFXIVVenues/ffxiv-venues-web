import React from "react";
import "./venue-opening-card.css";
import { Modal } from "../modal/Modal";
import { Time } from "../time/Time";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { VenueOpening } from "../venue-opening/VenueOpening";

class VenueOpeningCard extends VenueOpening {

    render() {
        return <div className={"venue-opening-card " + (this.props.venue.id) + (this.state.isOpen ? " venue-opening-card--open" : "") + (this.props.time ? "" : " venue-opening-card--no-time")}>

            <div className="venue-opening-card__block" 
                 role="row" 
                 onClick={ this._onVenueClick.bind(this) }
                 style={ this.props.venue.banner ? { backgroundImage: `url("${this.props.venue.banner}")` } : null }>

                { this.isNew() ? 
                    <div className="venue-opening-card__new">new!</div> :
                    null
                }

                <div className="venue-opening-card__name">
                    { this.props.venue.name }
                    
                </div>

                { this.props.time && 
                    <div className="venue-opening-card__time">
                        <div className="venue-opening-card__start"><Time time={this.props.time.start} day={this.props.time.day} format24={false} /></div>
                        <div className="venue-opening-card__time-split">{this.props.time.end && <React.Fragment>-</React.Fragment>}</div>
                        <div className="venue-opening-card__end">{this.props.time.end && <Time time={this.props.time.end} day={this.props.time.day} format24={false} /> }</div>
                    </div>
                }

                <div className="venue-opening-card__location">{this.props.venue.location}</div>
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

export { VenueOpeningCard };