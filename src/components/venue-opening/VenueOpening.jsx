import React from "react";
import "./venue-opening.css";
import { Modal } from "../modal/Modal";
import { Time } from "../time/Time";
import { NsfwIcon } from "../icons/NsfwIcon";
import { SfwIcon } from "../icons/SfwIcon";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { timeService } from "../../services/timeService";

class VenueOpening extends React.Component {

    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isOpen: this.isOpen()
        };
        this._checkInterval = null;
        this._onEscPressed = this._onEscPressed.bind(this);
    }

    isOpen() {
        return this.props.time ? timeService.isOpen(this.props.time) : (this.props.venue.times.filter(timeService.isOpen).length > 0)
    }
    
    componentDidMount() {
        this._checkInterval = setInterval(() => this.setState({ isOpen: this.isOpen() }), 6000);
    }

    componentWillUnmount() {
        this._checkInterval !== null && clearInterval(this._checkInterval);
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
        document.onkeyup = null;
    }

    render() {
        return <div className={"venue-opening " + (this.props.venue.id) + (this.state.isOpen ? " venue-opening--open" : "") + (this.props.time ? "" : " venue-opening--no-time")}>
            <div className="venue-opening__summary-row" role="row" onClick={this._onVenueClick.bind(this)}>
                {this.props.time && 
                    <React.Fragment>
                        <div className="venue-opening__cell venue-opening__start"><Time time={this.props.time.start} day={this.props.time.day} format24={false} /></div>
                        <div className="venue-opening__cell venue-opening__time-split">{this.props.time.end && <React.Fragment>-</React.Fragment>}</div>
                        <div className="venue-opening__cell venue-opening__end">{this.props.time.end && <Time time={this.props.time.end} day={this.props.time.day} format24={false} /> }</div>
                    </React.Fragment>
                }
                <div className="venue-opening__cell venue-opening__name" >{this.props.venue.name}</div>
                <div className="venue-opening__cell venue-opening__location" >{this.props.venue.location}</div>
                <div className="venue-opening__cell venue-opening__icons">
                    { this.props.venue.sfw && <SfwIcon /> }
                    { this.props.venue.nsfw && <NsfwIcon /> }
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

export { VenueOpening };