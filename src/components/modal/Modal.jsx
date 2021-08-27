import { modalService } from "../modal-stage/ModalService";
import React from "react";

class Modal extends React.Component {

    constructor() {
        super();
        this._destroyModal = null;
    }

    componentDidMount() {
        this._destroyModal = modalService.push({ 
            className: this.props.className,
            contents: this.props.children,
            onStageClick: this.props.onStageClick
        });
    }

    componentWillUnmount() {
        this._destroyModal && this._destroyModal();
    }

    render() {
        return <React.Fragment />
    };

}

export { Modal };