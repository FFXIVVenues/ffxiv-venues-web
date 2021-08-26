import React from "react";
import "./notice.css";

class Notice extends React.Component {



    render() {
        return (<div className="notice">
            <details className="notice__details">
                <summary className="notice__summary">
                    Vrixia's Last Lap - Final procession
                </summary>
                <p>Hey friends!</p>
                <p>
                    <strong>First, a thank you!</strong><br/>
                    You may have heard about the event that passed this Sunday, the Grand Vrix Prix, an event of Vrixia Odana's own design ran in her honor after her passing from cancer on August 15th.
                    We sincerely thank you for the incredible turn out we received at the event, it became one of the biggest and most unique player-run events in recent FFXIV history - Vrix' would have been proud that her creation captured so many hearts accross Eorzea.
                </p>
                <p>
                    <strong>Vrixia's Last Lap</strong><br/>
                    Come join us as we remember Vrixia Odana through one last lap of Eorzea, to cherish and remember the friendships and relationships we have all formed and forged along the way. 
                    We'll start in New Gridania before walking through Mor Dhona, Central Thanalan, East Shroud, and Central Shroud before finally ending at The Giving Tree for final words. 
                </p>
                <p><em>The procession will meet August 29th, at 6:00 EST at the New Gridanian aetheryte in Jenova.</em></p>
                <p>♥ Kana</p> 
            </details>
        </div>);
    }

}

export { Notice };