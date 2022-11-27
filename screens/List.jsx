import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity, Switch, FlatList, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MyButton from '../components/MyButton';
import ListItem from '../components/ListItem';

const List = ({ navigation }) => {

    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [switchStatus, setSwitchStatus] = useState(false)

    const navigate = (screen: string) => navigation.navigate(screen)

    useEffect(() => { Location.requestForegroundPermissionsAsync(); }, [])

    useEffect(() => console.log(locations), [locations])

    const downloadLocations = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        const curLocations = stores.map(location => JSON.parse(location[1]))
        setLocations(curLocations)
    }

    const deleteAll = async () => {
        setLocations([]), setSelectedLocations([])
        await AsyncStorage.clear();
    }

    const selectAll = async () => { setSelectedLocations(locations) }

    const saveLocation = async () => {
        await Location.requestForegroundPermissionsAsync();

        Alert.alert("Save Location?", "Your exact location will be saved",
            [
                { text: "Cancel", onPress: () => console.log('cancelled'), style: "cancel" },
                {
                    text: "Save", onPress: async () => {
                        const location = await Location.getCurrentPositionAsync({})
                        location.id = new Date().valueOf().toString();
                        console.log(location.id)
                        await AsyncStorage.setItem(location.id, JSON.stringify(location));
                        setLocations([...locations, location])
                    },
                },
            ],
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10, paddingBottom: 10 }}>
                <MyButton title={"pobierz i zapisz pozycję"} onPress={() => saveLocation()} />
                <MyButton title={"usuń wszystkie dane"} onPress={() => deleteAll()} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10, paddingBottom: 10 }}>
                <MyButton title={"przejdź do mapy"} onPress={() => console.log('mapa')} />
                <Switch trackColor={{ false: "#767577", true: '#303f9f' }} thumbColor='#fafafa'
                    onValueChange={() => { setSelectedLocations(!switchStatus ? locations : []); setSwitchStatus(!switchStatus); }} value={switchStatus} />
            </View>

            <FlatList
                data={locations}
                renderItem={({ item }) => (<ListItem id={item.id} title={item.timestamp} latitude={item.coords.latitude} longitude={item.coords.longitude} selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} />)}
                style={styles.list}
            />
        </View>
    );
}

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


export default List;