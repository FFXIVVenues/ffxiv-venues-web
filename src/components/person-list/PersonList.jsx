import { Person } from "./Person";
import "./person-list.css";
import React from "react";

// todo Can be abstracted more to a generic accordion
export function PersonList(props) {
    const list = props.people.map((p, i) =>
        <Person key={i} name={p.name} world={p.world} role={p.role} photoId={p.photoId} discordId={p.discordId} link={p.link} />);
    return <div className={`staff-list ${props.className || ''}`}>
        {
            props.collapsible
            ? 
                <details className="staff-list__details">
                    <summary className="staff-list__summary">{props.heading}</summary>
                    <div className="staff-list__content">
                        {list}
                        {props.footer && <div className="staff-list__footer">
                            {props.footer}
                        </div>}
                    </div>
                </details> 
            : 
            <>
                <h3>{props.heading}</h3>
                {list}
            </>
        }
    </div>
}