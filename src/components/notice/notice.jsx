import { useState } from "react";
import { Modal } from "../modal/Modal";
import { Button } from "../button/Button";
import logo from "./banner.jpg";
import "./notice.css";

function Notice() {
    const [modalActive, setModalActive] = useState(false);

    if (new Date() > new Date("2022-05-14T19:00:00Z")) {
        return <></>;
    }

    return (<button className='aether-venues__notice-button' onClick={_ => setModalActive(!modalActive)}>
        ♥️ Notice
        { modalActive &&
            <Modal onStageClick={_ => setModalActive(false)}
                   style={{
                        textAlign: "center",
                   }}>
                <img alt="Crystaline Conflict Event" src={logo} style={{
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    width: "100%",
                }}/>
                <p style={{ padding: "15px 30px" }}><strong>Saturday May 14th, 12pm PST/3pm EST</strong></p>
                <p style={{ padding: "0 30px 0 30px", textAlign: "justify" }}><strong>Crowning Crystal Conflict</strong> is a casual venue-focused tournament for the new Crystalline Conflict PVP mode for venues to partake! It’s a relatively fun-focused and chill event, where the goal is to test our skills and compete while generally still keeping things fun and inclusive, any type of venue is welcome to join and compete! Sign-ups are welcome to any and all venues interested, with up to two teams per venue!</p>
                <p style={{ padding: "0 30px 15px 30px", textAlign: "justify" }}>For more information take a look at <a target="_blank" rel="noreferrer" href="https://crystalconflict.carrd.co/#" style={{ color: "var(--accent-color)" }}>https://crystalconflict.carrd.co/#</a>. ❤️</p>
                <Button style={{ marginBottom: 30 }} onClick={_ => setModalActive(false)}>Okay!</Button>
            </Modal>
        }
    </button>)
}

export { Notice };