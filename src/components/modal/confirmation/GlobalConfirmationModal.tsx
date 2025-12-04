import React from "react";
import { useModal } from "src/hooks/useModal";
import ConfirmationModal from "./ConfirmationModal";

export function GlobalConfirmationModal() {
    const { clearConfirmation, getConfirmationState } = useModal();
    const confirmationState = getConfirmationState();

    return (
        <ConfirmationModal
            visible={confirmationState.visible}
            title={confirmationState.title}
            message={confirmationState.message}
            target={confirmationState.target}
            onConfirm={() => {
                confirmationState.onConfirm();
                clearConfirmation();
            }}
            onCancel={() => {
                if (confirmationState.onCancel) {
                    confirmationState.onCancel();
                }
                clearConfirmation();
            }}
        />
    );
}