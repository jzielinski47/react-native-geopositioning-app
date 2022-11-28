import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity, Switch, FlatList, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MyButton from '../components/MyButton';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

const Map = ({ route }) => {

    const [markers, setMarkers] = useState([])

    let estimatedLatitude = 0
    let estimatedLongitude = 0

    useEffect(() => {
        downloadLocations()
        if (markers[0]) {
            estimatedLatitude = markers[0].latitude;
            estimatedLongitude = markers[0].longitude;
        }
        return true;
    }, [markers])


    const downloadLocations = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        console.log(keys, stores)
        const curLocations = stores.map(location => { if (location[0].startsWith('select')) return JSON.parse(location[1]) })
        setMarkers(curLocations)
        console.log('markers', markers)
    }

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                longitude: estimatedLongitude,
                latitude: estimatedLatitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }}
        >
            {markers.map(mark => {
                console.log(mark)

                // return 


                // (<Marker coordinate={{
                //     latitude: mark.latitude,
                //     longitude: mark.longitude,
                // }}
                //     title={"tytul"}
                //     description={"opis"}
                // />)
            })}
        </MapView>
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