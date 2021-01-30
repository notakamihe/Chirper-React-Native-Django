import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '../Storage'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignUp = () => {
        axios.post(axios.defaults.baseURL + 'api/users/', {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password
        }).then(async (res) => {
            await AsyncStorage.setItem('user', JSON.stringify(res.data))
            setError('')
            navigation.navigate("Dashboard")
        }).catch(() => setError("Invalid registration"))
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
                }}
            >
                Register
            </Text>

            {renderError()}

            <View style={{ width: "100%", marginBottom: 96 }}>
                <View>
                    <TextInput
                        placeholder="First name"
                        placeholderTextColor="#fff7"
                        style={{
                            ...styles.textPrimary,
                            fontSize: 25,
                            borderBottomColor: "#a0f",
                            borderBottomWidth: 3,
                            marginVertical: 16
                        }}
                        onChangeText={text => setFirstName(text)}
                        value={firstName}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder="Last name"
                        placeholderTextColor="#fff7"
                        style={{
                            ...styles.textPrimary,
                            fontSize: 25,
                            borderBottomColor: "#a0f",
                            borderBottomWidth: 3,
                            marginVertical: 16
                        }}
                        onChangeText={text => setLastName(text)}
                        value={lastName}
                    />
                </View>
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
                        value={username}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#fff7"
                        style={{
                            ...styles.textPrimary,
                            fontSize: 25,
                            borderBottomColor: "#a0f",
                            borderBottomWidth: 3,
                            marginVertical: 16
                        }}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{ borderWidth: 3, borderColor: "#a0f", padding: 15, borderRadius: 15 }}
                onPress={handleSignUp}
            >
                <Text style={{ color: "#fff", fontSize: 25, color: "#a0f" }}>Sign up</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 25 }}>
                <Text style={{ ...styles.textPrimary, fontSize: 25 }}>Already a user?{'  '}
                    <Text style={{ ...styles.textPrimary, fontWeight: "bold" }} onPress={() => navigation.navigate("Login")}>Log in</Text>
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
    }
})


export default RegisterScreen