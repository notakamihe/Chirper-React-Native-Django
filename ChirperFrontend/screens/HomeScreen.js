import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '../Storage'

const HomeScreen = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const checkLoggedIn = async () => {
        await AsyncStorage.getItem('user').then(item => {
            if (item)
                setIsLoggedIn(true)
            else
                setIsLoggedIn(false)
        })
    }

    checkLoggedIn()

    return (
        <View style={styles.container}>
            <View style={{ marginTop: "75%" }}>
                <Text style={{ ...styles.textPrimary, fontSize: 25, color: "#ffffff77", textAlign: "center" }}>Welcome to...</Text>
                <Text style={{ ...styles.textPrimary, fontWeight: "bold", fontSize: 45, letterSpacing: 10, textTransform: "uppercase" }}>Chirper</Text>
            </View>
            <TouchableOpacity
                style={{ marginTop: 192, backgroundColor: "#aa00ff", padding: 15, borderRadius: 10 }}
                onPress={() => navigation.navigate(isLoggedIn ? "Dashboard" : "Login")}
            >
                <Text style={{ ...styles.textPrimary, fontSize: 30 }}>Proceed</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        color: "#fff",
        alignItems: "center"
    },
    textPrimary: {
        color: "white"
    }
})

export default HomeScreen