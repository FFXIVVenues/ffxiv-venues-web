import React from "react";
import "./notice.css";

class Notice extends React.Component {



    render() {
        return (<div className="notice">
            <details className="notice__details">
                <summary className="notice__summary">
                    Important notice
                </summary>
                <p>Hey friends!</p>
                <p>This announcement is not one that is easy to write, the RP/venue community is tight and so a noticable part of the community has been rocked by recent news that a well loved, active member of community Vrixia Odana from Jenova sadly passed away from cancer on August 15th. She was an astute member of the D20 FC in Jenova and a server at The Scratch Post. For this reason some venues are closed for the time being, planning for a social event in her honor on August 22nd. </p>
                <p>The event is one Vrixia wanted to run herself -  a social picnic/chocobo walk happening on August 22nd touring through the black shroud and stopping at several places to picnic and listen to bards and eat... it was her idea that she never got to do.</p>
                <p>However, the scratch post can only do so much alone. They're in need of chocobo carriage drivers, bards, and artists. If there's anything you can offer to help - even if it's just relaying this message, it would mean alot to everyone. </p>
                <p><em>If you can offer help to help make this event happen, please contact <a target="_blank" rel="noreferrer" href="https://discordapp.com/users/786407181804896257">Zahm#5573</a> on Discord.</em></p>
                <p><em>The event will meet August 22nd, at 6:30 EST at the New Gridanian aetheryte in Jenova, before starting at 7PM.</em></p>
                <p>♥ Kana</p> 
            </details>
        </div>);
    }

}

export { Notice };