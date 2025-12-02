import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextData {
    showError: (title: string, messages: string[]) => void;
    clearError: () => void;
    getState: () => ErrorState;
}

interface ErrorState {
    visible: boolean;
    title: string;
    messages: string[];
}

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);

interface ErrorProviderProps {
    children: ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
    const [error, setError] = useState<ErrorState>({
        visible: false,
        title: '',
        messages: [],
    });

    const getState = () => error;

    const showError = (title: string, messages: string[]) => {
        console.log("🔴 showError chamado:", title, messages);
        if (messages.length === 0) {
            console.log("Nenhuma mensagem de erro fornecida para exibir.");
            return;
        }
        
        setError({
            visible: true,
            title,
            messages,
        });
        console.log("🔴 Estado do erro atualizado para visible: true");
    };

    const clearError = () => {
        setError({
            visible: false,
            title: '',
            messages: [],
        });
    };

    return (
        <ErrorContext.Provider value={{ showError, clearError, getState }}>
            {children}
        </ErrorContext.Provider>
    );
}

export function useError() {
    const context = useContext(ErrorContext);
    
    if (!context) {
        throw new Error('useError deve ser usado dentro de um ErrorProvider');
    }
    
    return context;
}

export { ErrorContext };
