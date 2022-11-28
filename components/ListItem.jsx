import AsyncStorage from '@react-native-async-storage/async-storage';
import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity, Switch, FlatList, Alert, Image } from 'react-native';

const ListItem = ({ timestamp, latitude, longitude, selectedLocations, setSelectedLocations, switchAllStatus }) => {

    const [locationSelected, setLocationSelected] = useState(false)

    useEffect(() => { selectAll(); }, [switchAllStatus])

    const saveData = async () => {
        const json = { timestamp, latitude, longitude }
        const string = JSON.stringify(json)
        await AsyncStorage.setItem(`select${timestamp}`, string)
    }

    const deleteData = async () => {
        try {
            await AsyncStorage.removeItem(`select${timestamp}`);
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    const selectAll = async () => {
        if (switchAllStatus) {
            const json = { timestamp, latitude, longitude }
            setSelectedLocations(prevState => [...prevState, json])
            setLocationSelected(true)
            // saveData()
        } else {
            setSelectedLocations(prevState => [...prevState.filter(location => location.timestamp != timestamp)])
            setLocationSelected(false)
            // deleteData()
        }
    }

    const select = async () => {
        if (!locationSelected) {
            const json = { timestamp, latitude, longitude }
            setSelectedLocations(prevState => [...prevState, json])
            setLocationSelected(true)
            // saveData()
        } else {
            setSelectedLocations(prevState => [...prevState.filter(location => location.timestamp != timestamp)])
            setLocationSelected(false)
            // deleteData()
        }
    }

    const getValue = async () => {
        const value = await AsyncStorage.getItem(`select${timestamp}`);
        console.log("data", value);
    };

    return (
        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.tinyLogo} source={{ uri: "https://i.imgur.com/6Cjcf4X.png" }} />
            <View style={{ flexDirection: 'column', margin: 10 }}>
                <Text style={[styles.title]}>timestamp: {timestamp}</Text>
                <Text style={styles.regular}>latitude: {latitude}</Text>
                <Text style={styles.regular}>longitude: {longitude}</Text>
            </View>
            <Switch trackColor={{ false: "#767577", true: '#303f9f' }} thumbColor='#fafafa'
                onValueChange={() => { setLocationSelected(!locationSelected); select(); }} value={locationSelected} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303f9f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 16, fontWeight: 'bold', color: '#000' },
    regular: { fontSize: 12, fontWeight: 'regular', color: '#000' },
    tinyLogo: { width: 55, height: 55 }
});


export default ListItem;