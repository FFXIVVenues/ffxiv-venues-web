import React from "react";
import CloseIconSvg from "../../assets/icons/close-icon.svg";
import "./icons.css";

const CloseIcon = (props) => (
    <CloseIconSvg
        className={ "icons_close " + (props.className ? props.className : "") }
        onClick={props.onClick} />);

export { CloseIcon };