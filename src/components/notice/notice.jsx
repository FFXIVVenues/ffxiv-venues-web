import { useState } from "react";
import { Modal } from "../modal/Modal";
import { Button } from "../button/Button";
import banner from "./banner.jpg";
import "./notice.css";

function Notice() {
    const [modalActive, setModalActive] = useState(false);

    return (<div className='notice' onClick={_ => setModalActive(!modalActive)}>
        <strong>Welcome Europe!</strong> FFXIV Venues is now in Europe, and we're hard at work discovering all the venues Europe has to offer. 💖
        { modalActive &&
            <Modal onStageClick={_ => setModalActive(false)}
                   style={{
                        textAlign: "center",
                   }}>
                <img alt="FFXIV Venues is now in Europe" src={banner} style={{
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    width: "100%",
                }}/>
                <p style={{ padding: "15px 30px" }}><strong>All your venue are belong to us!</strong></p>
                <p style={{ padding: "0 30px 0 30px", textAlign: "justify" }}><strong>FFXIV Venues</strong> has been growing it's venue discovery platform for over a year and the community support has been amazing, we couldn't have gotten this far without them. Now, after much coverage - *blushies* - and community demand, we've skipped over the pond and we're ready to dive in to everything Europe has to offer and share it with everyone. 💖</p>
                <p style={{ padding: "0 30px 15px 30px", textAlign: "justify" }}>If you haven't met us yet, please come and introduce yourselves in our community's discord. We can't wait to meet you all. 🥰</p>
                <Button style={{ marginBottom: 30 }} onClick={_ => setModalActive(false)}>Okay!</Button>
            </Modal>
        }
    </div>)
}

export { Notice };