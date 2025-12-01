import React from "react";
import * as SecureStore from "expo-secure-store";
import { UserLocation } from "src/types";
import UserMapper from "src/mapper/UserMapper";
import UserService from "src/service/UserService";

interface UserSyncProviderProps {
    children: React.ReactNode;
    location?: UserLocation;
    onUserCreated?: () => void;
}

/**
 * Provider responsável por sincronizar o usuário com o servidor.
 * Tenta criar o usuário no servidor quando a localização está disponível.
 */
export const UserSyncProvider = ({ children, location, onUserCreated }: UserSyncProviderProps) => {
    React.useEffect(() => {
        let retryTimeout: NodeJS.Timeout;

        async function checkUserCreatedOnServer() {
            if (!location) return;

            const userCreated = await SecureStore.getItemAsync("userCreatedOnServer");
            if (userCreated) {
                console.log("User already created on server");
                return;
            }

            try {
                console.log("Attempting to create user on server...");
                const userToCreate = UserMapper.toCreateUserLocationRequest(location);
                await UserService.createUser(location.phone_id, userToCreate);
                await SecureStore.setItemAsync("userCreatedOnServer", "true");
                console.log("✓ User successfully created on server");
                
                // Notifica que o usuário foi criado
                onUserCreated?.();
            } catch (error) {
                console.error("✗ Failed to create user on server:", error);
                console.log("Retrying in 30 seconds...");

                retryTimeout = setTimeout(() => {
                    checkUserCreatedOnServer();
                }, 30000);
            }
        }

        checkUserCreatedOnServer();

        return () => {
            if (retryTimeout) {
                clearTimeout(retryTimeout);
            }
        };
    }, [location, onUserCreated]);

    return <>{children}</>;
};
