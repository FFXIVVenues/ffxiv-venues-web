import { modalService } from "./ModalService";
import React from "react";
import "./venue.css";

class ModalStage extends React.Component {

    constructor() {
        this.state = {
            modals = modalService.modals
        };
    }

    render() {
        return (
            <div className="modal-stage">
                { this.state.modals.map(m => {
                    <div className= "modal-stage__modal">
                        { m.contents }
                    </div>
                })}
            </div>
        );
    }

}

export { ModalStage }