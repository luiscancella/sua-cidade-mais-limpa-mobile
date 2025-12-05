import React, { ReactNode } from 'react';
import { CurrentLocationProvider } from 'src/hooks/useCurrentLocation';
import { ModalProvider } from 'src/hooks/useModal';
import { GlobalErrorModal } from 'src/components/modal/error/GlobalErrorModal';
import { GlobalConfirmationModal } from 'src/components/modal/confirmation/GlobalConfirmationModal';

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <ModalProvider>
            <CurrentLocationProvider>
                {children}
                <GlobalErrorModal />
                <GlobalConfirmationModal />
            </CurrentLocationProvider>
        </ModalProvider>
    );
}
