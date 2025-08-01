import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "src/screens/WelcomeScreen";
import { AddressAndTerms } from "src/screens/AddressAndTermsScreen";
import { HomeScreen } from "src/screens/HomeScreen";
import { SplashScreen } from "src/screens/SplashScreen";
import { GlobalContext } from "src/hooks/GlobalContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ConfigsScreen } from "src/screens/ConfigsScreen";
import { Ionicons } from "@expo/vector-icons";

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
                <Stack.Navigator initialRouteName={"Welcome"} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Address and Terms" component={AddressAndTerms} />
                </Stack.Navigator>
            ) : (
                <Tab.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ((props) => setTabIcon(props, "map", "map-outline")),
                            tabBarActiveTintColor: 'tomato',
                            tabBarInactiveTintColor: 'gray',
                        }}
                    />
                    <Tab.Screen
                        name="Configs"
                        component={ConfigsScreen}
                        options={{
                            tabBarIcon: ((props) => setTabIcon(props, "layers", "layers-outline"))
                        }}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    )
}