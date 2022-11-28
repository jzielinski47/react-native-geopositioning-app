import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity, Switch, FlatList, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MyButton from '../components/MyButton';
import ListItem from '../components/ListItem';

const List = ({ navigation }) => {

    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [switchAllStatus, setSwitchAllStatus] = useState(false)

    const navigate = (screen: string) => navigation.navigate(screen)

    useEffect(() => { Location.requestForegroundPermissionsAsync(); true }, [])
    useEffect(() => { downloadLocations(); setSelectedLocations([]); true }, [])

    const deleteAll = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) { console.log(e) }
        setLocations([])
        setSelectedLocations([])
        await downloadLocations()
    }

    const downloadLocations = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        console.log(keys, stores)
        setLocations([])
        const curLocations = stores.map(location => { if (!location[0].startsWith('select')) return JSON.parse(location[1]) })
        setLocations(curLocations)
    }

    const downloadLocation = async (timestamp) => {
        const val = await AsyncStorage.getItem(timestamp);
        console.log(val);
    };

    const saveLocation = async () => {
        await Location.requestForegroundPermissionsAsync();

        Alert.alert("Save Location?", "Your exact location will be saved",
            [
                { text: "Cancel", onPress: () => console.log('cancelled'), style: "cancel" },
                {
                    text: "Save", onPress: async () => {
                        const location = await Location.getCurrentPositionAsync({})
                        location.id = location.timestamp.toString()
                        console.log(location.id)
                        await AsyncStorage.setItem(location.id, JSON.stringify(location));
                        setLocations([...locations, location])
                    },
                },
            ],
        );

        await downloadLocations()
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10, paddingBottom: 10 }}>
                <MyButton title={"pobierz i zapisz pozycję"} onPress={() => saveLocation()} />
                <MyButton title={"usuń wszystkie dane"} onPress={() => deleteAll()} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10, paddingBottom: 10 }}>
                <MyButton title={"przejdź do mapy"} onPress={() => selectedLocations.length === 0 ? alert('zaznacz przynajmniej jedna pozycje') : navigation.navigate('map', { selected: selectedLocations })} />
                <Switch trackColor={{ false: "#767577", true: '#303f9f' }} thumbColor='#fafafa'
                    onValueChange={() => { setSwitchAllStatus(!switchAllStatus) }} value={switchAllStatus} />
                {/* {setSelectedLocations(!switchAllStatus ? locations : []); setSwitchAllStatus(!switchAllStatus} */}

                {/* {(<ListItem timestamp={item.timestamp} latitude={item.coords.latitude} longitude={item.coords.longitude} selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} switchAllStatus={switchAllStatus} />)} */}
            </View>
            {locations.length > 0 ?
                <FlatList
                    data={locations}
                    renderItem={({ item }) => (<ListItem timestamp={item.timestamp} latitude={item.coords.latitude} longitude={item.coords.longitude} selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} switchAllStatus={switchAllStatus} />)}
                    style={styles.list}
                /> : <ActivityIndicator size="small" color="#ff0000" />
            }

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