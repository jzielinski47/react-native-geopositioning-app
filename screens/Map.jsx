import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity, Switch, FlatList, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MyButton from '../components/MyButton';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

const Map = ({ route }) => {

    let estimatedLatitude = 50.001
    let estimatedLongitude = 20

    const [markers, setMarkers] = useState([])
    useEffect(() => downloadLocations(), [])


    const downloadLocations = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        console.log(keys, stores)
        const curLocations = stores.map(location => location[0].startsWith('select') ? JSON.parse(location[1]) : null)
        setMarkers(curLocations.filter(el => el !== null))
        console.log('markers', markers)

        if (markers[0]) {
            estimatedLatitude = markers[0].latitude;
            estimatedLongitude = markers[0].longitude;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    longitude: estimatedLongitude,
                    latitude: estimatedLatitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >



            </MapView>
        </View>
    );
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: { fontSize: 54, color: '#fff', margin: 12.5, fontFamily: 'Worksans', },
    regular: { fontSize: 24, fontWeight: 'regular', color: '#00000087' },
    list: {}

});