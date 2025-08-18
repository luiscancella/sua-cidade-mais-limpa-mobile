import * as React from "react";
import * as SecureStore from "expo-secure-store"
import { LocationDTO } from "src/types/LocationDTO";

interface GlobalContextData {
    location?: LocationDTO,
    saveLocation(value: LocationDTO): void,
    getLocation(): void,
    isLoading: Boolean
}

interface GlobalContextProps {
    children: React.ReactNode,
}

export const GlobalContext = React.createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalContextProps) => {
    const [isLoading, setLoading] = React.useState(true);
    const [location, setLocation] = React.useState<LocationDTO>();

    async function saveLocation(value: LocationDTO) {
        if (JSON.stringify(value).length > 2048) {
            console.error("Location too long to be saved");
            return;
        }
        await SecureStore.setItemAsync("location", JSON.stringify(value));
        console.log("Location saved");
        setLocation(value);
    }

    async function getLocation() : Promise<LocationDTO> {
        let result = await SecureStore.getItemAsync("location");
        if (result) {
            // alert("🔐 Here's your value 🔐 \n" + result);
            return JSON.parse(result) as LocationDTO;
        } else {
            // alert('No values stored under that key.');
            return Promise.reject("No location found");
        }
    }

    React.useEffect(() => {
        function clearLocation() {
            SecureStore.deleteItemAsync("location");
            setLocation(undefined);
        }
        // getLocation();
        // clearLocation();
        getLocation().then((loc) => { setLocation(loc) });
        setLoading(false);
    }, []);

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