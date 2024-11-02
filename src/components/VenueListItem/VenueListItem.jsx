import React from "react";
import { Modal } from "../ModalStage/Modal";
import { VenueProfile } from "../VenueProfile/VenueProfile";
import { Location } from "../Location/Location";
import {DateString} from "../DateString/DateString";
import {TimeString} from "../TimeString/TimeString";
import {ModalCloseButton} from "../ModalStage/ModalCloseButton";

import "./VenueListItem.css";

class VenueListItem extends React.Component {

    constructor(props) {
        super();
        this.state = {
            openModal: false
        };
        this.props = props;
        this._onEscPressed = this._onEscPressed.bind(this);
    }

    _onVenueClick() {
        this.setState({ openModal: true });
        document.onkeyup = this._onEscPressed;
    }

    _onEscPressed(e) {
        if (e.key === "Escape") this._onCloseClick();
    }

    _onCloseClick() {
        this.setState({ openModal: false });
    }

    render() {
        const openingResolution = this.props.opening?.resolution || this.props.venue.resolution;

        return <div className={"venue-opening " + 
                                (this.props.venue.id) + 
                                (this.props.venue.open ? " venue-opening--open" : "") +
                                (this.props.time ? "" : " venue-opening--no-time")}>
            <div className="venue-opening__summary-row" role="row" onClick={this._onVenueClick.bind(this)}>
                {openingResolution &&
                    <React.Fragment>
                        { openingResolution.isWithinWeek === false &&
                            <div className="venue_opening__cell venue-opening__date"><DateString date={openingResolution.start} /></div> }
                        <div className="venue-opening__cell venue-opening__start"><TimeString date={openingResolution.start} format24={false} /></div>
                        <div className="venue-opening__cell venue-opening__time-split">-</div>
                        <div className="venue-opening__cell venue-opening__end"><TimeString date={openingResolution.end} format24={false} /></div>
                    </React.Fragment>
                }

                <div className="venue-opening__cell venue-opening__name">
                    { this.props.venue.name }
                    { this.props.venue.isNew() ?
                        <span className="venue-opening__new">new!</span> :
                        null
                    }
                </div>
                <div className="venue-opening__cell venue-opening__location" ><Location location={this.props.venue.location} shorten /></div>
            </div>
            { this.state.openModal && 
                <Modal className="venue-modal" onStageClick={this._onCloseClick.bind(this)}>
                    <ModalCloseButton onClick={this._onCloseClick.bind(this)} />
                    <VenueProfile venue={this.props.venue} />
                </Modal>
            }
        </div>
    }

}

export { VenueListItem };