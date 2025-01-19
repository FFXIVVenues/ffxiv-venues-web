import React, { useEffect } from "react";
import { modalService } from "./ModalService";

const Modal = ({ key, className, style, children, onStageClick, onEscape }) => {
    useEffect(() => {
        const destroyModal = modalService.push({
            key,
            className,
            style,
            contents: children,
            onStageClick,
            onEscape
        });

        return () => {
            destroyModal && destroyModal();
        };
    }, [className, style, children, onStageClick]);

    return <React.Fragment />;
};

export { Modal };