import React, {useEffect, useState} from "react";
import banner from "./giving-back-banner.jpg";
import "./notice.css";
import {Button} from "../button/Button";
import {Modal} from "../modal/Modal";

function Notice() {
    const [modalActive, setModalActive] = useState(false);
    useEffect(() => {
        if (window.location.hash.indexOf("notice") !== -1)
            setModalActive(true);
    }, []);

    return <div className='notice' onClick={_ => setModalActive(true)}>

        ♥ We're asking for your support. Event starts in 2 hours.

        { modalActive &&
        <Modal onStageClick={_ => setModalActive(false)} style={{ width: 550 }}>
            <Button className="venue-modal__close-button"
                    style={{ backgroundColor: "#181818", border: "none"}}
                    onClick={_=> setModalActive(false)}>
                <img src="assets/cross.svg" alt="" />
            </Button>

            <img style={{ width: "100%"}}
                 className="notice__banner"
                 src={banner}
                 alt={"Giving Back. An event in support of a volunteer in need."}/>

            <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 25 }}>


                <p>Very rarely do we come outside of our little bubble but this night we're asking you for your support as one of your own are danger of losing their home.</p>
                <p>The staff here put a lot of work into helping us all discover venues and build relationships, and our new event team has some exciting things for you they're working on so it's the right thing to do to redirect our efforts help them when they're in need!</p>
                <p>You're invited to an incredible night of music organised by the D3N and Eternal Eclipse venue location and support for a member of our FFXIV team and community in need. Let's come together to prevent homelessness and have a blast while doing it!</p>

                <h2>Echopalooza</h2>

                <p>
                    📅 Date: October 19th <br/>
                    🕒 Time: 4 PM - 2 AM EST <br/>
                    📌 NA, Ultros, Empyrium, Ward 2, Plot 3
                </p>

                <p>
                    🔊 4 PM - 6 PM: DJay YAMS <br />
                    🔊 6 PM - 8 PM: Roguewitxh <br />
                    🔊 8 PM - 10 PM: King Qizzli <br />
                    🔊 10 PM - 12 AM: DJ Ryaru <br />
                    🔊 12 AM - 2 AM: King Dumb
                </p>
            </div>


            <div style={{ textAlign: "center", marginBottom: 25}}>
                <Button href="https://discord.gg/rBKdtUSpUm">
                    Join the event discord
                </Button>
            </div>
        </Modal>
        }
    </div>;
}

export { Notice };