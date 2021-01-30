import React from 'react'
import axios from 'axios'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import { ChirpScreen, RegisterScreen, LoginScreen, HomeScreen, DashboardScreen, Sidebar, FeedScreen } from './screens'

const Stack = createStackNavigator()

const App = () => {
    axios.defaults.baseURL = 'http://127.0.0.1:8000/'

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="Dashboard" component={Sidebar}></Stack.Screen>
                <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
                <Stack.Screen name="Chirp" component={ChirpScreen}></Stack.Screen>
                <Stack.Screen name="Feed" component={FeedScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App