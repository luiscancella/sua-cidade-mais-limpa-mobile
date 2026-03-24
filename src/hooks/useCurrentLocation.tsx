import React from "react";
import * as SecureStore from "expo-secure-store"
import { Address, UserLocation } from "src/types";
import UserService from "src/service/UserService";
import UserMapper from "src/mapper/UserMapper";

interface CurrentLocationContextData {
    currentLocation?: UserLocation,
    saveCurrentLocation(value: UserLocation): Promise<boolean>,
    updateAddress(newAddress: Address): Promise<UserLocation | null>,
    loadCurrentLocation(): Promise<boolean>,
    isLoading: boolean,
    error: string | null,
    clearData(): Promise<void>,
}

const CurrentLocationContext = React.createContext<CurrentLocationContextData>({} as CurrentLocationContextData);

export const CurrentLocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [ currentLocation, setCurrentLocation ] = React.useState<UserLocation>();
    const [ isLoading, setIsLoading ] = React.useState<boolean>(true);
    const [ error, setError ] = React.useState<string | null>(null);

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

    async function updateAddress(newAddress: Address): Promise<UserLocation> {
        const user = {
            ...currentLocation,
            address: newAddress,
        } as UserLocation;

        const userToBeCreated = UserMapper.toCreateUserLocationRequest(user);

        try {
            const createdUser = await UserService.createUser(userToBeCreated);
            saveCurrentLocation(createdUser);
            return createdUser;
        } catch (error) {
            console.error("Failed to update user location on server:", error);
            throw new Error("Failed to update user location on server");
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

    async function clearData() {
        try {
            await SecureStore.deleteItemAsync("location");
            setCurrentLocation(undefined);
            console.log("Cleared location and user data from secure store");
        } catch (error) {
            console.error("Failed to clear data:", error);
        }
    }

    React.useEffect(() => {
        loadCurrentLocation();
    }, []);

    return (
        <CurrentLocationContext.Provider
            value={{
                currentLocation,
                saveCurrentLocation,
                updateAddress,
                loadCurrentLocation,
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