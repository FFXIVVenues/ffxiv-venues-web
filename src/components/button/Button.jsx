import { useState } from "react";

function Button(props) {
    const [ buttonFocused, setFocused ] = useState(false);

    let style = {
        padding: "8px",
        // minWidth: 80,
        border: "dimgray 1px solid",
        backgroundColor: "transparent",
        boxSizing: "border-box",
        borderRadius: 5,             
        color: "white",
        cursor: "pointer",
        textDecoration: "none",
        fontSize: "1em",
        display: "inline-block",
        ...props.style
    };

    if (buttonFocused) {
        style = { 
            ...style, 
            border: "solid 1px var(--accent-color)",
            backgroundColor: "var(--accent-dark-color)",
            boxShadow: "0 0 10px var(--accent-dark-color)",
            ...props.focusStyle
        }
    }

    return (
        props.href ? 
            <a  className={props.className}
                onMouseEnter={_ => setFocused(true) }
                onFocus={_ => setFocused(true) }
                onMouseLeave={_ => setFocused(false) }
                onBlur  ={_ => setFocused(false) }
                onClick={props.onClick}
                href={props.href}
                style={style}
                target="_blank" 
                rel="noreferrer">
                {props.children}
            </a> 
        :
            <button className={props.className}
                    onMouseEnter={_ => setFocused(true) }
                    onFocus={_ => setFocused(true) }
                    onMouseLeave={_ => setFocused(false) }
                    onBlur  ={_ => setFocused(false) }
                    onClick={props.onClick}
                    style={style}>
                {props.children}
            </button>
    );
}

export {Button };