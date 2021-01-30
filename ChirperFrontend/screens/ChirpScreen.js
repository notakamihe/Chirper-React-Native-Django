import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '../Storage'
import axios from 'axios'


const ChirpScreen = ({ navigation }) => {
    const [user, setUser] = useState({
        id: -1,
        first_name: '',
        last_name: '',
        username: ''
    })

    const [content, setContent] = useState('')

    const setTheUser = async () => {
        await AsyncStorage.getItem('user').then(item => {
            if (item) {
                const parsed = JSON.parse(item)
                setUser(parsed)
            }
        })
    }

    useEffect(() => {
        setTheUser()
    }, [user.id == -1])

    const postChirp = () => {
        axios.post(axios.defaults.baseURL + 'api/chirps/', {
            by: user.id,
            content: content
        }).then(res => {
            navigation.navigate("Dashboard")
            navigation.push("Dashboard")
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ ...styles.textPrimary, fontSize: 45, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 10 }}>Chirp</Text>
                <Text style={{ ...styles.textPrimary, fontSize: 20, color: "#fff7" }}>Chirp your messge to the world</Text>
            </View>
            <View style={{ width: "100%", marginTop: 64 }}>
                <TextInput
                    numberOfLines={10}
                    multiline={true}
                    style={{ ...styles.textPrimary, borderColor: "#a0f", borderWidth: 2, borderRadius: 10, fontSize: 25, flexWrap: "wrap" }}
                    onChangeText={text => setContent(text)}
                />
            </View>
            <Text style={{ marginTop: 64 }}>
                <TouchableOpacity
                    style={{ padding: 15, borderWidth: 3, borderRadius: 15, borderColor: "#a0f" }}
                    onPress={postChirp}
                >
                    <Text style={{ fontSize: 25, color: "#a0f" }}>Post</Text>
                </TouchableOpacity>
                {'      '}
                <TouchableOpacity style={{ padding: 15, borderWidth: 3, borderRadius: 15, borderColor: "#fff" }}>
                    <Text style={{ fontSize: 25, ...styles.textPrimary }} onPress={() => navigation.goBack()}>Cancel</Text>
                </TouchableOpacity>
            </Text>
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
        color: "white",
        textAlign: "center"
    }
})

export default ChirpScreen