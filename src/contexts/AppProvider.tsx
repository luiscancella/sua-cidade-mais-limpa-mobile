import React, { ReactNode } from 'react';
import { CurrentLocationProvider, useCurrentLocation } from 'src/hooks/useCurrentLocation';
import { UserSyncProvider } from 'src/hooks/useUserSync';
import { ErrorProvider } from 'src/hooks/useError';
import { GlobalErrorModal } from 'src/components/GlobalErrorModal';

interface AppProviderProps {
    children: ReactNode;
}

/**
 * Componente interno que consome o contexto de localização
 * e fornece os dados para o UserSyncProvider
 */
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

/**
 * Provider composto que agrupa todos os contexts da aplicação.
 * Ordem de providers (externo para interno):
 * 1. ErrorProvider - Gerenciamento global de erros
 * 2. CurrentLocationProvider - Gerenciamento de localização do usuário
 * 3. UserSyncProvider - Sincronização do usuário com o servidor
 */
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
