import "./MenuButton.css";

import React from "react";

export const MenuButton = ({ className, Icon, children, href, onClick, active}) =>
  href ?
    <a className={`menu-button ${active ? "menu-button--active" : ""} ${className || ""}`}
        href={href}
        target="_blank"
        rel="noreferrer">
      <Icon alt=""/>
      <span>{children}</span>
    </a>
    :
    <button className={`menu-button ${active ? "menu-button--active" : ""} ${className || ""}`}
            onClick={onClick}>
      <Icon alt=""/>
      <span>{children}</span>
    </button>