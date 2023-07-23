import React, { useState, useEffect } from "react";
import "./notice.css";
import {Modal} from "../modal/Modal";
import {Button} from "../button/Button";
import banner from "./banner.jpg";


function Notice() {
    const [modalActive, setModalActive] = useState(false);
    useEffect(() => {
        if (window.location.hash.indexOf("notice") !== -1)
            setModalActive(true);
    }, []);
    return (<div className='notice' onClick={_ => setModalActive(true)}>
        Going to Las Vegas? You could go to a real FFXIV venue; Club Burzum is hosting the FFXIV FanFest After Party!
        { modalActive &&
            <Modal onStageClick={_ => setModalActive(false)}>
                <Button className="venue-modal__close-button"
                        style={{ backgroundColor: "#181818", border: "none"}}
                        onClick={_=> setModalActive(false)}>
                    <img src="assets/cross.svg" alt="" />
                </Button>
                <a href="https://discord.gg/clubburzum">
                    <img alt="Club Burzum Live. Real Venue. Real DJ. Real Dancers." src={banner} style={{
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        width: "100%",
                        margin: 0
                    }}/>
                </a>
                <div style={{ display: "flex", padding: "1% 4% 2% 4%", justifyContent: "space-between", alignItems: "center" }}>

                    <Button href="https://discord.gg/clubburzum">
                        Join the discord
                    </Button>
                    <div style={{ textAlign: "center" }}>
                        <strong>PROMO CODE</strong>
                        <div style={{ width: "50%", maxWidth: 350, backgroundColor: "#111", borderRadius: 5, padding: "5px 30px", textAlign: "center" }}>
                            CHIMERA
                        </div>
                    </div>
                    <Button href="https://form.jotform.com/230730978489067">
                        Get your tickets!
                    </Button>
                </div>
            </Modal>
        }
    </div>)
}

export { Notice };