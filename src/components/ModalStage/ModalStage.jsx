import { modalService } from "./ModalService";
import React, { useState, useEffect, useCallback } from "react";
import "./ModalStage.css";

const ModalStage = () => {
    const [modals, setModals] = useState([ ...modalService.modals ]);

    useEffect(() => {
        const destroyObserver = modalService.observe(() => {
            setModals([ ...modalService.modals ]);
        });

        return () => {
            destroyObserver && destroyObserver();
        };
    }, [ modals ]);

    useEffect(() => {
        document.querySelector("body").className = modals.length ? "modal-open" : "";
    }, [ modals ]);

    const onStageClick = useCallback((event) => {
        if (event.target !== event.currentTarget) return;
        modals.forEach(modal => modal.onStageClick && modal.onStageClick());
    }, [ modals ]);

    const onEscPressed = useCallback((e) => {
        if (e.key !== "Escape") return;
        modals.forEach(modal => modal.onEscape && modal.onEscape());
    });

    useEffect(() => {
        document.addEventListener("keyup", onEscPressed);
        return () => {
            document.removeEventListener("keyup", onEscPressed);
        };
    }, [modals]);

    return (
      <div className="modal-stage" onClick={onStageClick}>
          {modals.map((m, i) => (
            <div key={i}
                 className={`modal-stage__modal ${m.className || ""}`}
                 style={m.style}>
                {m.contents}
            </div>
          ))}
      </div>
    );
};

export { ModalStage };