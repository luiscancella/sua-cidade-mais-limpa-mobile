import React from "react";
import * as SecureStore from "expo-secure-store"
import { UserLocation } from "src/types";

interface CurrentLocationContextData {
    currentLocation?: UserLocation,
    saveCurrentLocation(value: UserLocation): Promise<boolean>,
    loadCurrentLocation(): Promise<boolean>,
    isUserSavedOnServer(): Promise<boolean>,
    userCreatedOnServer: boolean,
    setUserCreatedOnServer: (value: boolean) => void,
    isCurrentLocationSaved?: boolean,
    isLoading: boolean,
    error: string | null,
    clearData(): Promise<void>,
}

const CurrentLocationContext = React.createContext<CurrentLocationContextData>({} as CurrentLocationContextData);

export const CurrentLocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentLocation, setCurrentLocation] = React.useState<UserLocation>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [userCreatedOnServer, setUserCreatedOnServer] = React.useState<boolean>(false);

    async function saveCurrentLocation(value: UserLocation): Promise<boolean> {
        if (JSON.stringify(value).length > 2048) {
            console.error("Location too long to be saved");
            return false;
        }

        try {
            await SecureStore.setItemAsync("location", JSON.stringify(value));
            console.log("Location saved");
            setCurrentLocation(value);
            return true;
        } catch (error) {
            console.error("Failed to save location:", error);
            setError("Failed to save location");
            return false;
        }
    }

    async function loadCurrentLocation(): Promise<boolean> {
        setIsLoading(true);
        try {
            let result = await SecureStore.getItemAsync("location");
            if (!result) {
                setError("Nenhuma localização encontrada");
                setIsLoading(false);
                return false;
            }
            
            const location = JSON.parse(result) as UserLocation;
            
            setCurrentLocation(location);
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error("Failed to load location:", error);
            setError("Falha ao carregar a localização");
            setIsLoading(false);
            return false;
        }
    }

    async function isUserSavedOnServer(): Promise<boolean> {
        try {
            const userCreated = await SecureStore.getItemAsync("userCreatedOnServer");
            return userCreated === "true";
        } catch (error) {
            console.error("Failed to check if user is saved on server:", error);
            return false;
        }
    }

    async function clearData() {
        try {
            await SecureStore.deleteItemAsync("location");
            await SecureStore.deleteItemAsync("userCreatedOnServer");
            setCurrentLocation(undefined);
            console.log("Cleared location and user data from secure store");
        } catch (error) {
            console.error("Failed to clear data:", error);
        }
    }

    React.useEffect(() => {
        loadCurrentLocation();
        
        // Carregar estado do servidor
        isUserSavedOnServer().then(setUserCreatedOnServer);
    }, []);

    return (
        <CurrentLocationContext.Provider
            value={{
                currentLocation,
                saveCurrentLocation,
                loadCurrentLocation,
                isUserSavedOnServer,
                userCreatedOnServer,
                setUserCreatedOnServer,
                isLoading,
                error,
                clearData,
            }}
        >
            {children}
        </CurrentLocationContext.Provider>
    );
};

export const useCurrentLocation = () => {
    return React.useContext(CurrentLocationContext);
}