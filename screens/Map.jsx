import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity, Switch, FlatList, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MyButton from '../components/MyButton';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ route }) => {

    let estimatedLatitude = 50.001
    let estimatedLongitude = 20

    const mapSettings = {
        longitude: route.params.selected[0].longitude,
        latitude: route.params.selected[0].latitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    }

    return (
        <MapView style={{ flex: 1 }} initialRegion={mapSettings} >
            {route.params.selected.map(location => (
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}
                    key={location.timestamp}
                />
            ))}
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