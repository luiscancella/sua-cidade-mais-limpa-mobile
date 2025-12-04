import React from 'react';
import { useModal } from 'src/hooks/useModal';
import ErrorModal from './ErrorModal';

export function GlobalErrorModal() {
    const { clearError, getErrorState } = useModal();
    const errorState = getErrorState();

    return (
        <ErrorModal
            visible={errorState.visible}
            title={errorState.title}
            message={errorState.messages}
            onClose={clearError}
        />
    );
}
