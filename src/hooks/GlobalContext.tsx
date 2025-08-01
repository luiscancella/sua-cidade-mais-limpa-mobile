import * as React from "react";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store"

interface GlobalContextData {
    location: Location.LocationObject | undefined,
    saveLocation(value: Location.LocationObject) : void,
    getLocation(): void,
    isLoading: Boolean
}

interface GlobalContextProps {
    children: React.ReactNode,
}

export const GlobalContext = React.createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalContextProps) => {
    const [isLoading, setLoading] = React.useState(true);
    const [location, setLocation] = React.useState<Location.LocationObject>();

    async function saveLocation(value: Location.LocationObject) {
        await SecureStore.setItemAsync("location", JSON.stringify(value));
        setLocation(value);
    }

    async function getLocation() {
        let result = await SecureStore.getItemAsync("location");
        if (result) {
            alert("🔐 Here's your value 🔐 \n" + result);
            setLocation(JSON.parse(result));
        } else {
            alert('No values stored under that key.');
        }
        setLoading(false);
    }

    React.useEffect(() => {
        getLocation();
    }, []);

    return (
        <GlobalContext.Provider value={{
            location,
            saveLocation,
            getLocation,
            isLoading
        }}>
            { children }
        </GlobalContext.Provider>
    )
}