import { Button } from "../Button/Button";
import "./NewVenueGuidance.css";

export function NewVenueGuidance()  {
    return <>
        <div className="new-venue-guidance">
            <div className="new-venue-guidance__guidance new-venue-guidance__veni-guidance">
                <h2><span className="new-venue-guidance__veni-img"></span> Join via  Veni!</h2>
                <p>For the quickest indexing you can talk to Kana's daughter, <strong>Veni Ki</strong>, our cute indexing AI. 🥰</p>
                <ol>
                    <li>
                        <div className="new-venue-guidance__join-discord-step">
                            Join Veni's home; the FFXIV Venues discord!
                            <br/>
                            <Button className="new-venue-guidance__button" href="https://discord.gg/gTP65VYcMj">Join the discord!</Button>
                        </div>
                    </li>
                    <li>
                        <div className="new-venue-guidance__join-discord-step">
                            Then simply direct message Veni asking to <strong>Create a venue</strong> or type <strong>/create</strong>!
                            <br/>
                            <Button className="new-venue-guidance__button" href="https://discordapp.com/users/906248123951775774">Meet Veni Ki!</Button>
                        </div>
                    </li>
                </ol>
            </div>
            <div className="new-venue-guidance__spine"></div>
            <div className="new-venue-guidance__guidance new-venue-guidance__discord-guidance">
                <p>It's important to stay in the FFXIV Venues discord server so Veni can reach you and maintain your venue on the site. Feel free to mute the server if you prefer. 🥰</p>
                <p>If you have any questions or need help, just make a Venue ticket in the discord or send a direct message to <a href="https://discordapp.com/users/236852510688542720">Kana Ki</a>.</p>
            </div>
        </div>
    </>
}