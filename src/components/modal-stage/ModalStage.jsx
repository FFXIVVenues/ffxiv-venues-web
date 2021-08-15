import { modalService } from "./ModalService";
import React from "react";
import "./modal-stage.css";

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

    render() {
        document.querySelector("body").className = this.state.modals.length ? "modal-open" : "";

        return (
            <div className="modal-stage">
                { this.state.modals.map(m => 
                    <div className={"modal-stage__modal " + (m.className ? m.className : "") }>
                        { m.contents }
                    </div>
                )}
            </div>
        );
    }

}

export { ModalStage };