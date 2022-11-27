import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity, Switch, FlatList, Alert, Image } from 'react-native';

const ListItem = props => {


    return (
        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.tinyLogo} source={{ uri: "https://i.imgur.com/6Cjcf4X.png" }} />
            <View style={{ flexDirection: 'column', margin: 10 }}>
                <Text style={[styles.title]}>timestamp: {props.title}</Text>
                <Text style={styles.regular}>latitude: {props.latitude}</Text>
                <Text style={styles.regular}>longitude: {props.longitude}</Text>
            </View>
            <Switch trackColor={{ false: "#767577", true: '#303f9f' }} thumbColor='#fafafa' onValueChange={() => {
            }} value={false} />
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