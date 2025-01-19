import React, { useEffect } from "react";
import { modalService } from "./ModalService";

const Modal = ({ className, style, children, onStageClick, onEscape }) => {
    useEffect(() => {
        const destroyModal = modalService.push({
            className,
            style,
            contents: children,
            onStageClick,
            onEscape
        });

        return () => {
            destroyModal && destroyModal();
        };
    }, [className, style, children, onStageClick, onEscape]);

    return <React.Fragment />;
};

export { Modal };