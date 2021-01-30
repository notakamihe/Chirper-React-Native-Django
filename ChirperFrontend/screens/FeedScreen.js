import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


const FeedScreen = ({ navigation }) => {
    const [chirps, setChirps] = useState([])

    const getChirps = () => {
        axios.get(axios.defaults.baseURL + 'api/chirps/').then(res => {
            setChirps(res.data.reverse())
        })
    }

    useEffect(() => {
        getChirps()
    }, [])

    const renderChirp = (chirp) => {
        return (
            <View
                style={{
                    backgroundColor: "#ffffff11",
                    width: "100%",
                    marginBottom: 16,
                    padding: 16
                }}
            >
                <Text
                    style={{
                        color: "#a0f",
                        fontSize: 25,
                        fontWeight: "bold",
                        marginBottom: 16
                    }}
                >
                    {chirp.item.get_username}
                </Text>
                <View>
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
            <View style={{ marginBottom: 64 }}>
                <Text
                    style={{
                        ...styles.textPrimary,
                        fontWeight: "bold",
                        fontSize: 45,
                        letterSpacing: 5,
                        textTransform: "uppercase",
                        paddingBottom: 16
                    }}
                >
                    Feed
                </Text>
                <Text style={{ fontSize: 25, color: "#ffffff55" }}>All the best chirps</Text>
            </View>

            <FlatList
                data={chirps}
                keyExtractor={chirp => chirp.id.toString()}
                renderItem={chirp => renderChirp(chirp)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        color: "#fff",
        alignItems: "center",
        padding: 8,
        paddingTop: 32
    },
    textPrimary: {
        color: "white",
        textAlign: "center"
    }
})

export default FeedScreen