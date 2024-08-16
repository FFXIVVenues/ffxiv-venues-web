import React from "react";
import { ReactComponent as FavoriteIconSvg } from "../../assets/icons/favorite-icon.svg";
import "./icons.css";

const FavoriteIcon = (props) => (
    <FavoriteIconSvg 
        className={ "icons__favourite " + (props.className ? props.className : "") + (props.lit ? " favorite-icon--lit" : "") }
        onClick={props.onClick}/>);

export { FavoriteIcon };