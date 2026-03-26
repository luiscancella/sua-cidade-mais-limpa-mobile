import React from "react";
import * as SecureStore from "expo-secure-store";
import { Address, HeadersRequired, UserLocation } from "src/types";
import { th } from "zod/locales";
import UserService from "src/service/UserService";
import UserMapper from "src/mapper/UserMapper";

interface CurrentLocationContextData {
    currentLocation?: UserLocation,
    saveCurrentLocation(value: UserLocation): Promise<boolean>,
    updateAddress(newAddress: Address): Promise<UserLocation | null>,
    loadCurrentLocation(): Promise<boolean>,
    isLoading: boolean,
    clearData(): Promise<void>,
    getHeaders() : HeadersRequired,
}

type CurrentLocationRequiredContextData = Omit<CurrentLocationContextData, "currentLocation"> & {
    currentLocation: UserLocation;
};

const CurrentLocationContext = React.createContext<CurrentLocationContextData>({} as CurrentLocationContextData);

export const CurrentLocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [ currentLocation, setCurrentLocation ] = React.useState<UserLocation>();
    const [ isLoading, setIsLoading ] = React.useState<boolean>(true);

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
            await SecureStore.setItemAsync("device_secret", value.device_secret);
            await SecureStore.setItemAsync("address", JSON.stringify(value.address));
            console.log("Location saved");
            setCurrentLocation(value);
            return true;
        } catch (error) {
            console.error("Failed to save location:", error);
            return false;
        }
    }

    async function loadCurrentLocation() : Promise<boolean> {
        setIsLoading(true);
        try {
            const phone_id = await SecureStore.getItemAsync("phone_id");
            const device_secret = await SecureStore.getItemAsync("device_secret");
            const address = await SecureStore.getItemAsync("address");
            if (!phone_id || !device_secret || !address) {
                console.log("No location found in secure store");
                setIsLoading(false);
                clearData();
                return false;
            }

            const userInfo = {
                phone_id: phone_id,
                device_secret: device_secret,
                address: JSON.parse(address),
            } as UserLocation;
            
            setCurrentLocation(userInfo);
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error("Failed to load location:", error);
            setIsLoading(false);
            return false;
        }
    }

    async function updateAddress(newAddress: Address) : Promise<UserLocation> {
        try {
            const newUserRequest = UserMapper.toCreateUserLocationRequest(newAddress);
            newUserRequest.phoneId = currentLocation?.phone_id;

            const userCreated = await UserService.createUser(newUserRequest);
            const user = UserMapper.fromCreateResponse(userCreated, newAddress);
            await saveCurrentLocation(user);
              
            return user;
        } catch (error) {
            console.error("Failed to update address:", error);
            throw error;
        }
    }

    function getHeaders() : HeadersRequired {
        if (!currentLocation) {
            throw new Error("Current location is required to get headers");
        }
        return {
            "x-phone-id": currentLocation.phone_id,
            "x-device-secret": currentLocation.device_secret,
            "x-timestamp": Date.now().toString(),
        };
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
                clearData,
                getHeaders
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