import React from "react";

class TimeString extends React.Component {

    render() {
        return <React.Fragment>
            { this.props.format24
              ? <React.Fragment>{this.props.date.getHours().toString().padStart(2, "0")}:{this.props.date.getMinutes().toString().padStart(2, "0")}</React.Fragment>
              : <React.Fragment>
                  { (this.props.date.getHours() > 12 ? this.props.date.getHours() - 12 : this.props.date.getHours())}:{this.props.date.getMinutes().toString().padStart(2, "0") }
                  { this.props.date.getHours() >= 12 ? "pm": "am" }
              </React.Fragment>
            }
        </React.Fragment>
    }

}

export { TimeString }