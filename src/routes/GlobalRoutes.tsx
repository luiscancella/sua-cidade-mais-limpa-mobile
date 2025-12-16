import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import { HomeScreen } from "src/screens/HomeScreen";
import { SplashScreen } from "src/screens/SplashScreen";
import { SetupScreen } from "src/screens/SetupScreen";
import { TermsOfService } from "src/screens/TermsOfService";
import ConfigurationRoute from "./ConfigurationRoute";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function AppRoutes() {
    const { currentLocation, isLoading, createdOnServer } = useCurrentLocation();

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
            {currentLocation == null || !createdOnServer ? (
                <Stack.Navigator initialRouteName={"Setup"} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Setup" component={SetupScreen} />
                    <Stack.Screen name="TermsOfService" component={TermsOfService} />
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
                        component={ConfigurationRoute}
                        options={{
                            tabBarIcon: ((props) => setTabIcon(props, "settings", "settings-outline"))
                        }}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    )
}