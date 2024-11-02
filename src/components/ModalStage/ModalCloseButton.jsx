import React from "react";
import {CloseIcon} from "../Icons/CloseIcon";

const ModalCloseButton = (props) =>
  <button className="modal-stage__modal-close-button" onClick={props.onClick}>
    <CloseIcon />
  </button>


export { ModalCloseButton }