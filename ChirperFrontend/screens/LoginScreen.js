import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '../Storage'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const logIn = () => {
        axios.post(axios.defaults.baseURL + 'token-auth', {
            username: username,
            password: password,
        }).then(async (res) => {
            if (res.status === 200) {
                await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                setError('')
                navigation.navigate("Dashboard")
            }
        }).catch(() => setError("Invalid login credentials"))
    }

    const renderError = () => {
        if (error) {
            return (
                <Text
                    style={{
                        fontSize: 25,
                        marginBottom: 32,
                        color: "red",
                        backgroundColor: "#ff000033",
                        padding: 16,
                        borderRadius: 50
                    }}
                >
                    {error}
                </Text>
            )
        } else {
            return null
        }
    }

    return (
        <View style={styles.container}>
            <Text
                style={{
                    ...styles.textPrimary,
                    fontWeight: "bold",
                    fontSize: 45,
                    letterSpacing: 5,
                    textTransform: "uppercase",
                    paddingBottom: 64
                }}>Login</Text>

            {renderError()}

            <View style={{ width: "100%", marginBottom: 96 }}>
                <View>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#fff7"
                        style={{
                            ...styles.textPrimary,
                            fontSize: 25,
                            borderBottomColor: "#a0f",
                            borderBottomWidth: 3,
                            marginVertical: 16
                        }}
                        onChangeText={text => setUsername(text)}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#fff7"
                        style={{ ...styles.textPrimary, fontSize: 25, borderBottomColor: "#a0f", borderBottomWidth: 3, marginVertical: 16 }}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{ borderWidth: 3, borderColor: "#a0f", padding: 15, borderRadius: 15 }}
                onPress={logIn}
            >
                <Text style={{ color: "#fff", fontSize: 25, color: "#a0f" }}>Log in</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 25 }}>
                <Text style={{ ...styles.textPrimary, fontSize: 25 }}>New here?{'  '}
                    <Text style={{ ...styles.textPrimary, fontWeight: "bold" }} onPress={() => navigation.navigate("Register")}>Register</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 32
    },
    textPrimary: {
        color: "white"
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        color: "#fff"
    },
    error: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    }
})

export default LoginScreen