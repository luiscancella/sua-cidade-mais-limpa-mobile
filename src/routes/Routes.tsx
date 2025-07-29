import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "src/screens/WelcomeScreen";
import { AddressAndTerms } from "src/screens/AddressAndTermsScreen";
import { Home } from "src/screens/Home";

const Stack = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Welcome" component={ WelcomeScreen }/>
                <Stack.Screen name="Address and Terms" component={ AddressAndTerms }/>
                <Stack.Screen name="Home" component={ Home }/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}