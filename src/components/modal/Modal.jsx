import { modalService } from "../modal-stage/ModalService";
import React from "react";

class Modal extends React.Component {

    constructor() {
        super();
        this.destroy = null;
    }

    componentDidMount() {
        modalService.push({ 
            contents: this.props.children
        });
    }

    componentWillUnmount() {
        this.destroy && this.destroy();
    }

    render() {
        return <React.Fragment />
    };

}

export { Modal };