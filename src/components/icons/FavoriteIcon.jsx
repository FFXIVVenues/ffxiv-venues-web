import React from "react";
import { ReactComponent as FavoriteIconSvg } from "../../assets/icons/favorite-icon.svg";
import "./icons.css";

const FavoriteIcon = (props) => (
    <FavoriteIconSvg className={ "favorite-icon " + (props.className ? props.className : "") + (props.lit ? " favorite-icon--lit" : "") } />);

export { FavoriteIcon };