import React from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";

import { WorkSans_700Bold } from '@expo-google-fonts/work-sans'

const Main = ({ navigation }) => {

    const [fontLoaded] = useFonts({ 'Worksans': WorkSans_700Bold })

    const navigate = (screen: string) => navigation.navigate(screen)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigate('list')}>
                {fontLoaded ? <Text style={[styles.header, { fontFamily: 'Worksans' }]}>Geo App</Text> : <ActivityIndicator size="large" color="#ffffff87" />}
            </TouchableOpacity>
            <Text style={styles.regular}>find and save your position</Text>
            <Text style={styles.regular}>use google maps 🌍</Text>
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
    header: { fontSize: 54, color: '#fff', margin: 12.5, fontFamily: 'Worksans', },
    regular: { fontSize: 24, fontWeight: 'regular', color: '#ffffff' }
});

export default Main;