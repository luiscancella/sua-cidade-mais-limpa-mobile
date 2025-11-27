import * as React from "react";
import * as SecureStore from "expo-secure-store"
import { UserLocation } from "src/types";
import UserMapper from "src/mapper/UserMapper";
import UserService from "src/service/UserService";

interface GlobalContextData {
    location?: UserLocation,
    saveLocation(value: UserLocation): void,
    getLocation(): void,
    isLoading: Boolean
}

interface GlobalContextProps {
    children: React.ReactNode,
}

export const GlobalContext = React.createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalContextProps) => {
    const [isLoading, setLoading] = React.useState(true);
    const [location, setLocation] = React.useState<UserLocation>();

    async function saveLocation(value: UserLocation) {
        if (JSON.stringify(value).length > 2048) {
            console.error("Location too long to be saved");
            return;
        }
        await SecureStore.setItemAsync("location", JSON.stringify(value));
        console.log("Location saved");
        setLocation(value);
    }

    async function getLocation(): Promise<UserLocation> {
        let result = await SecureStore.getItemAsync("location");
        if (result) {
            return JSON.parse(result) as UserLocation;
        } else {
            return Promise.reject("No location found");
        }
    }

    React.useEffect(() => {
        // Dev purposes: clear stored location
        function clearLocation() {
            SecureStore.deleteItemAsync("location");
            setLocation(undefined);
        }
        // clearLocation();

        // Load location from storage on app start
        getLocation().then((loc) => { setLocation(loc) });
        setLoading(false);
    }, []);

    React.useEffect(() => {
        let retryTimeout : NodeJS.Timeout;

        async function checkUserCreatedOnServer() {
            if (!location) return;

            const userCreated = await SecureStore.getItemAsync("userCreatedOnServer");
            if (userCreated) return;

            try {
                const userToCreate = UserMapper.toCreateUserLocationRequest(location);
                await UserService.createUser(location.phone_id, userToCreate);
                await SecureStore.setItemAsync("userCreatedOnServer", "true");
                console.log("User successfully created on server");
            } catch (error) {
                console.error("Erro ao criar usuário no servidor:", error);

                retryTimeout = setTimeout(() => {
                    checkUserCreatedOnServer();
                }, 10000);
            }
        }

        checkUserCreatedOnServer();

        return () => {
            if (retryTimeout) {
                clearTimeout(retryTimeout);
            }
        };
    }, [location]);

    return (
        <GlobalContext.Provider value={{
            location,
            saveLocation,
            getLocation,
            isLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}