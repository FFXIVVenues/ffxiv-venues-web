import "./notice.css";
import {Modal} from "../modal-stage/Modal";
import {useState} from "react";
import {Button} from "../button/Button";
import {ModalCloseButton} from "../modal-stage/ModalCloseButton";

function Notice() {
  const [modalOpen, setModalOpen] = useState(false);
  return <div className="notice" onClick={() => setModalOpen(true)}>

    What do you think about FFXIV? Give your thoughts in this YouTube project!

    { modalOpen &&
      <Modal onStageClick={() => setModalOpen(false)} style={{textAlign: "center"}}>
        <ModalCloseButton onClick={() => setModalOpen(false)} />
        <div style={{padding: "0 20px", textAlign: "left"}}>
          <p><strong>We're helping a YouTube video project about FFXIV!</strong></p>
          <p>It's taking a look at the game from a casual players perspective and discussing the community in the game. A window into FFXIV for those not focused on high-end content. This community is absolutely a component to that side of the game! </p>
          <p>Please take <strong>30 seconds to answer 4 short questions</strong> to put your 2 cents in and influence the video!</p>
        </div>
        <Button href={"https://forms.gle/pRAzSD1P3KqYwTW79"} style={{margin: "20px auto"}}>Complete the survey</Button>
      </Modal>
    }
  </div>;
}

export { Notice };
