import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextData {
    showError: (title: string, messages: string[] | string) => void;
    clearError: () => void;
    getErrorState: () => ErrorState;
    showConfirmation: (title: string, message: string, target: string, onConfirm: () => void, onCancel?: () => void) => void;
    clearConfirmation: () => void;
    getConfirmationState: () => ConfirmationState;
}

interface ErrorState {
    visible: boolean;
    title: string;
    messages: string[] | string;
}

interface ConfirmationState {
    visible: boolean;
    title: string;
    message: string;
    target: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

interface ModalProviderProps {
    children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
    const [error, setError] = useState<ErrorState>({
        visible: false,
        title: '',
        messages: [],
    });
    const [ confirmation, setConfirmation ] = useState<ConfirmationState>({
        visible: false,
        title: '',
        message: '',
        target: '',
        onConfirm: () => {},
        onCancel: undefined,
    });

    const getErrorState = () => error;

    const showError = (title: string, messages: string[] | string) => {
        if ((Array.isArray(messages) && messages.length === 0) || (typeof messages === 'string' && messages.trim() === '')) {
            console.error("Nenhuma mensagem de erro fornecida para exibir.");
            return;
        }
        
        setError({
            visible: true,
            title,
            messages,
        });
    };

    const clearError = () => {
        setError({
            visible: false,
            title: '',
            messages: [],
        });
    };

    const getConfirmationState = () => confirmation;

    const showConfirmation = (title: string, message: string, target: string, onConfirm: () => void, onCancel?: () => void) => {
        setConfirmation({
            visible: true,
            title,
            message,
            target,
            onConfirm,
            onCancel,
        });
    };

    const clearConfirmation = () => {
        setConfirmation({
            visible: false,
            title: '',
            message: '',
            target: '',
            onConfirm: () => {},
            onCancel: undefined,
        });
    };

    return (
        <ModalContext.Provider value={{ showError, clearError, getErrorState, showConfirmation, clearConfirmation, getConfirmationState }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useError() {
    const context = useContext(ModalContext);
    
    if (!context) {
        throw new Error('useError deve ser usado dentro de um ErrorProvider');
    }
    
    return context;
}

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error('useModal deve ser usado dentro de um ModalProvider');
    }
    
    return context;
};