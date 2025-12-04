import React, { ReactNode } from 'react';
import { CurrentLocationProvider, useCurrentLocation } from 'src/hooks/useCurrentLocation';
import { UserSyncProvider } from 'src/hooks/useUserSync';
import { ModalProvider } from 'src/hooks/useModal';
import { GlobalErrorModal } from 'src/components/modal/error/GlobalErrorModal';
import { GlobalConfirmationModal } from 'src/components/modal/confirmation/GlobalConfirmationModal';

interface AppProviderProps {
    children: ReactNode;
}

function AppProviderContent({ children }: AppProviderProps) {
    const { currentLocation, setUserCreatedOnServer } = useCurrentLocation();

    return (
        <UserSyncProvider
            location={currentLocation}
            onUserCreated={() => setUserCreatedOnServer(true)}
        >
            {children}
            <GlobalErrorModal />
            <GlobalConfirmationModal />
        </UserSyncProvider>
    );
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <ModalProvider>
            <CurrentLocationProvider>
                <AppProviderContent>
                    {children}
                </AppProviderContent>
            </CurrentLocationProvider>
        </ModalProvider>
    );
}
