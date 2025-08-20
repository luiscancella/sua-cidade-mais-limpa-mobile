import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchAddress } from "src/components/SearchAddress";

export function ConfigurationScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <SearchAddress
                onPress={() => console.log("Search Address Pressed")}
                icon={<Ionicons name="location-outline" size={24} color="black"/>}
            />
            <Text>=-=</Text>
            <SearchAddress
                onPress={() => console.log("Search Address Pressed")}
            />
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
    }
}