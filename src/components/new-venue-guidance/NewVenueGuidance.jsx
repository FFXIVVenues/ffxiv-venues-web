import { Button } from "../button/Button";
import "./new-venues-guidance.css";

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
            <div className="new-venue-guidance__spine">
                <div className="new-venue-guidance__spine-line" />
                <div className="new-venue-guidance__spine-text">OR</div>
                <div className="new-venue-guidance__spine-line" />
            </div>
            <div className="new-venue-guidance__guidance new-venue-guidance__form-guidance">
                <h2>Join via an Indexer</h2>
                <p>Need that <s>human</s> Miqo'te touch? Complete the form below and within a few days we'll add you to the index personally.</p>
                <ol>
                    <li>
                        <div className="new-venue-guidance__join-discord-step">
                            Tell us about your venue via a short form!
                            <br/>
                            <Button className="new-venue-guidance__button" href="https://form.jotform.com/220493425516050">Complete the form!</Button>
                        </div>
                    </li>
                    <li>
                        <div className="new-venue-guidance__join-discord-step">
                            Join the home of FFXIV Venues!
                            <br/>
                            <Button className="new-venue-guidance__button" href="https://discord.gg/gTP65VYcMj">Join the discord!</Button>
                        </div>
                    </li>
                    <li>
                        <div className="new-venue-guidance__join-discord-step">
                            Wait to hear back from an Indexer ♥
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </>
}