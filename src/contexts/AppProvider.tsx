import React, { ReactNode } from 'react';
import { UserRegistrationProvider } from 'src/contexts/registration.context';
import { ModalProvider } from 'src/hooks/useModal';
import { GlobalErrorModal } from 'src/components/modal/error/GlobalErrorModal';
import { GlobalConfirmationModal } from 'src/components/modal/confirmation/GlobalConfirmationModal';
import Toast from 'react-native-toast-message';

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <ModalProvider>
            <UserRegistrationProvider>
                {children}
                <GlobalErrorModal />
                <GlobalConfirmationModal />
                <Toast />
            </UserRegistrationProvider>
        </ModalProvider>
    );
}
