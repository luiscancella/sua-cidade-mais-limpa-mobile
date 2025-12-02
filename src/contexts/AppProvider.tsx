import React, { ReactNode } from 'react';
import { CurrentLocationProvider, useCurrentLocation } from 'src/hooks/useCurrentLocation';
import { UserSyncProvider } from 'src/hooks/useUserSync';
import { ErrorProvider } from 'src/hooks/useError';
import { GlobalErrorModal } from 'src/components/GlobalErrorModal';

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
        </UserSyncProvider>
    );
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <ErrorProvider>
            <CurrentLocationProvider>
                <AppProviderContent>
                    {children}
                </AppProviderContent>
            </CurrentLocationProvider>
        </ErrorProvider>
    );
}
