import React from "react";
import * as SecureStore from "expo-secure-store"
import { Address, UserLocation } from "src/types";
import UserService from "src/service/UserService";
import UserMapper from "src/mapper/UserMapper";
import NotificationService from "src/service/NotificationService";

interface CurrentLocationContextData {
    currentLocation?: UserLocation,
    saveCurrentLocation(value: UserLocation): Promise<boolean>,
    updateAddress(newAddress: Address): Promise<UserLocation | null>,
    loadCurrentLocation(): Promise<boolean>,
    isLoading: boolean,
    error: string | null,
    clearData(): Promise<void>,
}

type CurrentLocationRequiredContextData = Omit<CurrentLocationContextData, "currentLocation"> & {
    currentLocation: UserLocation;
};

const CurrentLocationContext = React.createContext<CurrentLocationContextData>({} as CurrentLocationContextData);

export const CurrentLocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [ currentLocation, setCurrentLocation ] = React.useState<UserLocation>();
    const [ isLoading, setIsLoading ] = React.useState<boolean>(true);
    const [ error, setError ] = React.useState<string | null>(null);

    async function saveCurrentLocation(value: UserLocation) : Promise<boolean> {
        console.log("Saving location:", value);
        if (JSON.stringify(value.phone_id).length > 2048) {
            console.error("Phone Id too long to be saved");
            return false;
        }
        if (JSON.stringify(value.address).length > 2048) {
            console.error("Address too long to be saved");
            return false;
        }

        try {
            await SecureStore.setItemAsync("phone_id", value.phone_id);
            await SecureStore.setItemAsync("address", JSON.stringify(value.address));
            console.log("Location saved");
            setCurrentLocation(value);
            return true;
        } catch (error) {
            console.error("Failed to save location:", error);
            setError("Failed to save location");
            return false;
        }
    }

    async function updateAddress(newAddress: Address) : Promise<UserLocation> {
        // TODO: Mudar no server
        const userInfo = {
            ...currentLocation,
            address: newAddress,
        } as UserLocation;

        return userInfo;
    }

    async function loadCurrentLocation() : Promise<boolean> {
        setIsLoading(true);
        try {
            const phone_id = await SecureStore.getItemAsync("phone_id");
            const address = await SecureStore.getItemAsync("address");
            if (!phone_id || !address) {
                setError("Nenhuma localização encontrada");
                setIsLoading(false);
                return false;
            }

            const userInfo = {
                phone_id: phone_id,
                address: JSON.parse(address),
            } as UserLocation;
            
            setCurrentLocation(userInfo);
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

export const useRequiredCurrentLocation = () : CurrentLocationRequiredContextData => {
    const context = React.useContext(CurrentLocationContext);

    if (!context.currentLocation) {
        throw new Error("useRequiredCurrentLocation must be used when currentLocation exists.");
    }

    return {
        ...context,
        currentLocation: context.currentLocation,
    };
}