import React from 'react'
import { createDrawerNavigator, DrawerItemList, } from '@react-navigation/drawer'
import { ChirpScreen, DashboardScreen } from './'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '../Storage'
import FeedScreen from './FeedScreen'

const Drawer = createDrawerNavigator()
var nav;

const logOut = () => {
    AsyncStorage.removeItem('user')
    nav.navigate("Login")
}

const DrawerView = (props, navigation) => {
    return (
        <View style={{ padding: 16, backgroundColor: "#222", flex: 1 }}>
            <View style={{ padding: 16, marginBottom: 32 }}>
                <Text>
                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: "#a0f", borderRadius: 15 }}
                        onPress={logOut}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Log out</Text>
                    </TouchableOpacity>
                </Text>
            </View>
            <DrawerItemList {...props}
                activeTintColor="#a0f"
                labelStyle={{
                    fontSize: 25
                }}
            />
        </View>
    )
}

const Sidebar = ({ navigation }) => {
    nav = navigation;

    var focusedStyles = {
        color: "#a0f",
        fontWeight: "bold",
        fontSize: 25
    }

    var unfocusedStyles = {
        color: "#fff",
        fontSize: 25
    }

    return (
        <Drawer.Navigator
            drawerContent={props => {
                return (
                    <DrawerView {...props} />
                )
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={focused ? focusedStyles : unfocusedStyles}>Dashboard</Text>
                    )
                }}
            />
            <Drawer.Screen
                name="Chirp"
                component={ChirpScreen}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={focused ? focusedStyles : unfocusedStyles}>Chirp</Text>
                    )
                }}
            />
            <Drawer.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={focused ? focusedStyles : unfocusedStyles}>Feed</Text>
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default Sidebar