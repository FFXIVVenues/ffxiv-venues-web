import React from "react";
import "./venue-opening.css";
import { Modal } from "../modal/Modal";
import { Time } from "../time/Time";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { Location } from "../location/Location";

class VenueOpening extends React.Component {

    constructor(props) {
        super();
        this.state = {
            openModal: false
        };
        this.props = props;
        this._onEscPressed = this._onEscPressed.bind(this);
    }

    isNew() {
        const newIfAfter = new Date();
        newIfAfter.setDate(newIfAfter.getDate() - 14);
        return this.props.venue.added && new Date(this.props.venue.added) > newIfAfter;
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
        // document.onkeyup = null;
    }

    render() {
        const newIfAfter = new Date();
        newIfAfter.setDate(newIfAfter.getDate() - 14);

        return <div className={"venue-opening " + 
                                (this.props.venue.id) + 
                                (this.props.venue.open ? " venue-opening--open" : "") +
                                (this.props.time ? "" : " venue-opening--no-time")}>
            <div className="venue-opening__summary-row" role="row" onClick={this._onVenueClick.bind(this)}>
                {this.props.opening && 
                    <React.Fragment>
                        <div className="venue-opening__cell venue-opening__start"><Time time={this.props.opening.start} day={this.props.opening.day} format24={false} /></div>
                        <div className="venue-opening__cell venue-opening__time-split">{this.props.opening.end && <React.Fragment>-</React.Fragment>}</div>
                        <div className="venue-opening__cell venue-opening__end">{this.props.opening.end && <Time time={this.props.opening.end} day={this.props.opening.day} format24={false} /> }</div>
                    </React.Fragment>
                }
                <div className="venue-opening__cell venue-opening__name">
                    {this.props.venue.name}
                    { this.isNew() ? 
                        <span className="venue-opening__new">new!</span> :
                        null
                    }
                </div>
                <div className="venue-opening__cell venue-opening__location" ><Location location={this.props.venue.location} shorten /></div>
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

export { VenueOpening };