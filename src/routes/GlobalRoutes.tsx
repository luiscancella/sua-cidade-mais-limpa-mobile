import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { GlobalContext } from "src/hooks/GlobalContext";

import { WelcomeScreen } from "src/screens/WelcomeScreen";
import { AddressAndTerms } from "src/screens/AddressAndTermsScreen";
import { HomeScreen } from "src/screens/HomeScreen";
import { SplashScreen } from "src/screens/SplashScreen";
import { SetupScreen } from "src/screens/SetupScreen";
import { ConfigurationScreen } from "src/screens/ConfigurationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function AppRoutes() {
    const { location, getLocation, saveLocation, isLoading } = React.useContext(GlobalContext);

    if (isLoading) {
        return (<SplashScreen />)
    }

    function setTabIcon(
        props: {
            focused: Boolean,
            size: number,
            color: string,
        },
        focusedIconName: keyof typeof Ionicons.glyphMap,
        nonFocusedIconName: keyof typeof Ionicons.glyphMap): React.ReactNode {
        return <Ionicons name={props.focused ? focusedIconName : nonFocusedIconName} size={props.size} color={props.color} />;
    }

    return (
        <NavigationContainer>
            {location == null ? (
                <Stack.Navigator initialRouteName={"Setup"} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Address and Terms" component={AddressAndTerms} />
                    <Stack.Screen name="Setup" component={SetupScreen} />
                </Stack.Navigator>
            ) : (
                <Tab.Navigator
                    initialRouteName={"Home"}
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: "#0FAD83"
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ((props) => setTabIcon(props, "map", "map-outline")),
                        }}
                    />
                    <Tab.Screen
                        name="Configs"
                        component={ConfigurationScreen}
                        options={{
                            tabBarIcon: ((props) => setTabIcon(props, "settings", "settings-outline"))
                        }}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    )
}