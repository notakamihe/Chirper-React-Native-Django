import React, { useState, useEffect } from 'react'
import AsyncStorage from '../Storage'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'
import ActionButton from 'react-native-action-button'

const DashboardScreen = ({ navigation }) => {
    const [user, setUser] = useState({
        id: -1,
        first_name: '',
        last_name: '',
        username: ''
    })

    const [chirps, setChirps] = useState([])
    const [numTweets, setNumTweets] = useState(0)

    const setTheUser = async () => {
        await AsyncStorage.getItem('user').then(item => {
            if (item) {
                const parsed = JSON.parse(item)
                setUser(parsed)
            }
        }).then(() => getChirps())
    }

    const getChirps = () => {
        axios.get(axios.defaults.baseURL + 'api/chirps/').then(res => {
            const filtered = res.data.filter(chirp => chirp.by == user.id)
            setNumTweets(filtered.length)
            setChirps(filtered)
        })
    }

    useEffect(() => {
        setTheUser()
    }, [user.id == -1])

    const renderChirp = (chirp) => {
        return (
            <View
                style={{
                    backgroundColor: "#ffffff11",
                    width: "100%",
                    marginBottom: 16,
                    padding: 16,
                    paddingTop: 32
                }}
            >
                <View style={{ minHeight: 100 }}>
                    <Text style={{ color: "white", fontSize: 20, fontStyle: "italic" }}>
                        "{chirp.item.content}"
                    </Text>
                </View>
                <Text
                    style={{
                        marginTop: 16,
                        fontSize: 18,
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "#a0f",
                        textAlign: "right"
                    }}
                >
                    {chirp.item.get_created_at}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ ...styles.textPrimary, fontSize: 30, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 5 }}>{user.first_name} {user.last_name}</Text>
                <Text style={{ ...styles.textPrimary, color: "#fff7", fontSize: 20 }}>{user.username}</Text>
            </View>
            <View style={{ marginTop: 64 }}>
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 25,
                        fontStyle: "italic",
                        fontWeight: "bold",
                        marginBottom: 64,
                        marginLeft: 32
                    }}
                >
                    {numTweets} Chirps
                </Text>
            </View>

            <ActionButton
                zIndex={1000}
                buttonColor="#a0f"
                size={75}
                buttonTextStyle={{ fontSize: 40 }}
                onPress={() => navigation.navigate("Chirp")}
            />

            <FlatList
                data={chirps}
                keyExtractor={chirp => chirp.id.toString()}
                renderItem={(chirp) => renderChirp(chirp)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        color: "#fff",
        padding: 8
    },
    textPrimary: {
        color: "white",
        textAlign: "center",
    }
})

export default DashboardScreen