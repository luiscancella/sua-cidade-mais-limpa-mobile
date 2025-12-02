import React from 'react';
import { ErrorContext } from 'src/hooks/useError';
import ErrorModal from './ErrorModal';

export function GlobalErrorModal() {
    const { clearError, getState } = React.useContext(ErrorContext);
    const errorState = getState();

    console.log("🟢 GlobalErrorModal renderizado, estado:", errorState);

    return (
        <ErrorModal
            visible={errorState.visible}
            title={errorState.title}
            message={errorState.messages}
            onClose={clearError}
        />
    );
}
