import "./CtaPanel.css";

import {Button} from "../Button/Button";
import React from "react";

export const CtaPanel = ({title, buttonLabel, href, onClick}) =>
  <div className="cta-panel">
    <div className="cta-panel__label">
      {title}
    </div>
    <Button className="cta-panel__button"
            onClick={onClick}
            href={href}
            style={{width: "100%"}}>
      {buttonLabel}
    </Button>
  </div>