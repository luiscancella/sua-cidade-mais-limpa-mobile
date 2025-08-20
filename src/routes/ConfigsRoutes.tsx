import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConfigsListScreen } from "src/screens/ConfigsListScreen";
import { AddressConfigScreen } from "src/screens/configuration/AddressConfigScreen";
import { NotificationConfigScreen } from "src/screens/configuration/NotificationConfigScreen";
import { ConfigurationScreen } from "src/screens/ConfigurationScreen";

const ConfigStack = createNativeStackNavigator();

export function ConfigsTabs() {
    return (
        <ConfigStack.Navigator initialRouteName="ConfigsList" screenOptions={{ headerShown: false }}>
            <ConfigStack.Screen name="ConfigsList" component={ ConfigsListScreen } />
            <ConfigStack.Screen name="NotificationConfig" component={ NotificationConfigScreen } />
            <ConfigStack.Screen name="AddressConfig" component={ AddressConfigScreen } />
            <ConfigStack.Screen name="Configuration" component={ ConfigurationScreen } />
        </ConfigStack.Navigator>
    )
}