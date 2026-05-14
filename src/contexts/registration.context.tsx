import React from "react";
import * as SecureStore from "expo-secure-store";
import { Address, CollectionDays, CollectionShift, HeadersRequired, UserRegistration, UserRegistrationSchema } from "src/types";
import UserService from "src/service/UserService";
import UserMapper from "src/mapper/UserMapper";

interface UserRegistrationContextData {
    registration?: UserRegistration,
    registerUser: (address: Address, collectionDays: CollectionDays, collectionShift: CollectionShift) => Promise<UserRegistration | null>,
    updateRegistration(data: UserRegistration): Promise<UserRegistration | null>,
    loadRegistration(): Promise<boolean>,
    isLoading: boolean,
    clearRegistration(): Promise<void>,
    getAuthHeaders(): HeadersRequired,
}

type RequiredUserRegistrationContextData = Omit<UserRegistrationContextData, "registration"> & {
    registration: UserRegistration;
};

const UserRegistrationContext = React.createContext<UserRegistrationContextData>({} as UserRegistrationContextData);

export const UserRegistrationProvider = ({ children }: { children: React.ReactNode }) => {
    const [registration, setRegistration] = React.useState<UserRegistration>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    async function persistRegistration(value: UserRegistration): Promise<boolean> {
        console.log("Saving registration:", value);
        if (JSON.stringify(value.phoneId).length > 2048) {
            console.error("Phone Id too long to be saved");
            return false;
        }
        if (JSON.stringify(value.address).length > 2048) {
            console.error("Address too long to be saved");
            return false;
        }

        try {
            await SecureStore.setItemAsync("phoneId", value.phoneId);
            await SecureStore.setItemAsync("deviceSecret", value.deviceSecret);
            await SecureStore.setItemAsync("address", JSON.stringify(value.address));
            await SecureStore.setItemAsync("collectionDays", JSON.stringify(value.collectionDays));
            await SecureStore.setItemAsync("collectionShift", value.collectionShift);
            console.log("Registration saved");
            setRegistration(value);
            return true;
        } catch (error) {
            console.error("Failed to save registration:", error);
            return false;
        }
    }

    async function loadRegistration(): Promise<boolean> {
        setIsLoading(true);
        try {
            const phoneId = await SecureStore.getItemAsync("phoneId");
            const deviceSecret = await SecureStore.getItemAsync("deviceSecret");
            const address = await SecureStore.getItemAsync("address");
            const collectionDays = await SecureStore.getItemAsync("collectionDays");
            const collectionShift = await SecureStore.getItemAsync("collectionShift");
            if (!phoneId || !deviceSecret || !address || !collectionDays || !collectionShift) {
                console.log("No registration found in secure store");
                setIsLoading(false);
                clearRegistration();
                return false;
            }

            const saved = UserRegistrationSchema.parse({
                phoneId,
                deviceSecret,
                address: JSON.parse(address),
                collectionDays: JSON.parse(collectionDays),
                collectionShift,
            });

            setRegistration(saved);
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error("Failed to load registration:", error);
            setIsLoading(false);
            return false;
        }
    }

    async function registerUser(address: Address, collectionDays: CollectionDays, collectionShift: CollectionShift): Promise<UserRegistration | null> {
        try {
            const request = UserMapper.toRegistrationRequest(address, collectionDays, collectionShift);
            const response = await UserService.createUser(request);
            console.log("User registered on server successfully.");
            const user = UserMapper.fromRegistrationResponse(response, address);
            const result = await persistRegistration(user);
            if (!result) {
                console.error("Failed to save registration locally after registering on server. Probably exceeded the maximum allowed size for local storage.");
                return null;
            }
            return user;
        } catch (error) {
            console.error("Failed to register user:", error);
            return null;
        }
    }

    async function updateRegistration(data: UserRegistration): Promise<UserRegistration | null> {
        try {
            const request = UserMapper.fromRegistrationToRequest(data);
            const response = await UserService.createUser(request);
            const updated = UserMapper.fromRegistrationResponse(response, data.address);
            await persistRegistration(updated);
            console.log("Registration updated successfully");
            return updated;
        } catch (error) {
            console.error("Failed to update registration:", error);
            return null;
        }
    }

    function getAuthHeaders(): HeadersRequired {
        if (!registration) {
            throw new Error("Registration is required to get auth headers");
        }
        return {
            "x-phone-id": registration.phoneId,
            "x-device-secret": registration.deviceSecret,
            "x-timestamp": Date.now().toString(),
        };
    }

    async function clearRegistration() {
        try {
            await SecureStore.deleteItemAsync("phoneId");
            await SecureStore.deleteItemAsync("deviceSecret");
            await SecureStore.deleteItemAsync("address");
            await SecureStore.deleteItemAsync("collectionDays");
            await SecureStore.deleteItemAsync("collectionShift");
            setRegistration(undefined);
            console.log("Cleared registration from secure store");
        } catch (error) {
            console.error("Failed to clear registration:", error);
        }
    }

    React.useEffect(() => {
        loadRegistration();
    }, []);

    return (
        <UserRegistrationContext.Provider
            value={{
                registration,
                registerUser,
                updateRegistration,
                loadRegistration,
                isLoading,
                clearRegistration,
                getAuthHeaders,
            }}
        >
            {children}
        </UserRegistrationContext.Provider>
    );
};

export const useUserRegistration = () => {
    return React.useContext(UserRegistrationContext);
}

export const useRequiredUserRegistration = (): RequiredUserRegistrationContextData => {
    const context = React.useContext(UserRegistrationContext);

    if (!context.registration) {
        throw new Error("useRequiredUserRegistration must be used when registration exists.");
    }

    return {
        ...context,
        registration: context.registration,
    };
}
