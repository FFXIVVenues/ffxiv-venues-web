import React from "react";
import "./notice.css";

class Notice extends React.Component {

    render() {
        if (this.props.notice === undefined) {
            return (<div className="notice">
                {this.props.summary}
            </div>)
        }
        return (<div className="notice">
            <details className="notice__details">
                <summary className="notice__summary">
                   {this.props.summary}
                </summary>
                <p>{this.props.notice}</p> 
            </details>
        </div>);
    }

}

export { Notice };