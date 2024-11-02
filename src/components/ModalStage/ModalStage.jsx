import { modalService } from "./ModalService";
import React from "react";

import "./ModalStage.css";

class ModalStage extends React.Component {

    constructor() {
        super();
        this.destroyObserver = null;
        this.state = {
            modals: modalService.modals
        };
    }

    componentDidMount() {
        this.destroyObserver = modalService.observe(this._onModalsUpdate.bind(this));
    }

    componentWillUnmount() {
        this.destroyObserver && this.destroyObserver();
    }

    _onModalsUpdate() {
        this.setState({ modals: modalService.modals });
    }

    _onStageClick(event) {
        if (event.target !== event.currentTarget) return;
        for (let modal of this.state.modals) {
            modal.onStageClick();
        }
    }

    render() {
        document.querySelector("body").className = this.state.modals.length ? "modal-open" : "";

        return (
            <div className="modal-stage" onClick={this._onStageClick.bind(this)}>
                { this.state.modals.map((m, i) => 
                    <div key={i} 
                         className={"modal-stage__modal " + (m.className ? m.className : "") }
                         style={m.style}>
                        { m.contents }
                    </div>
                )}
            </div>
        );
    }

}

export { ModalStage };