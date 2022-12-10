import React, { useState } from "react";
import { Modal } from "../modal/Modal";
import { Button } from "../button/Button";
import banner from "./banner.png";
import "./notice.css";

function Notice() {
    const [modalActive, setModalActive] = useState(false);

    return (<div className='notice' onClick={_ => setModalActive(!modalActive)}>
        <strong>Burgundy Gives Back</strong> is currently live! A 12-hour charity event for Trans Lifeline.
        { modalActive &&
            <Modal onStageClick={_ => setModalActive(false)}
                   style={{
                        textAlign: "center",
                       width: 800,
                       fontSize: 0
                   }}>
                <Button className="venue-modal__close-button"
                        style={{ backgroundColor: "#181818", border: "none"}}
                        onClick={_=> setModalActive(false)}>
                    <img src="assets/cross.svg" alt="" />
                </Button>
                <a href="https://burgundygivesback.com/">
                    <img alt="FFXIV Venues is now in Europe" src={banner} style={{
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        width: "100%",
                        margin: 0
                    }}/>
                </a>
            </Modal>
        }
    </div>)
}

export { Notice };