import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConfigurationScreen } from "src/screens/ConfigurationScreen";
import { TermsOfService } from "src/screens/TermsOfService";

const Stack = createNativeStackNavigator();

export default function ConfigurationRoute() {
    return (
        <Stack.Navigator initialRouteName={"Configuration"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Configuration" component={ ConfigurationScreen } />
            <Stack.Screen name="TermsOfService" component={ TermsOfService } />
        </Stack.Navigator>
    )
}