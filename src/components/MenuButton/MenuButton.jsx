import "./MenuButton.css";

import React from "react";

export const MenuButton = ({ className, Icon, children, href, onClick, active }) =>
  href ?
    <a className={`menu-button ${active ? "menu-button--active" : ""} ${className || ""}`}
        href={href}
        target="_blank"
        rel="noreferrer">
      <span className="menu-button__icon" >{Icon && <Icon alt=""/> }</span>
      <span className="menu-button__label">{children}</span>
    </a>
  :
    <button className={`menu-button ${active ? "menu-button--active" : ""} ${className || ""}`}
            onClick={onClick}>
      <span className="menu-button__icon">{ Icon && <Icon alt=""/> }</span>
      <span className="menu-button__label">{children}</span>
    </button>