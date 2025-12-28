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

    const onStageClick = useCallback((event, modal) => {
        if (event.target !== event.currentTarget) return;
         modal.onStageClick && modal.onStageClick();
    }, [ modals ]);

    const onEscPressed = useCallback((e) => {
        if (e.key !== "Escape") return;
        const modal = modals.at(-1);
        return modal.onEscape && modal.onEscape()
    });

    useEffect(() => {
        document.addEventListener("keyup", onEscPressed);
        return () => {
            document.removeEventListener("keyup", onEscPressed);
        };
    }, [modals]);

    return (
        <>
            {modals.map((m, i) => (
              <div key={i}
                   className="modal-stage"
                   onClick={e => onStageClick(e, m)}>
                <div
                     className={`modal-stage__modal ${m.className || ""}`}
                     style={m.style}>
                    {m.contents}
                </div>
              </div>
          ))}
        </>
    );
};

export { ModalStage };