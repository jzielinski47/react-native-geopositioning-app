import React from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';

const MyButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.btn}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        elevation: 8,
        backgroundColor: '#303f9f',
        margin: 10,
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 15,
        minWidth: 30,
        maxWidth: 200,
        // margin: 1
    },
    text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        textAlign: 'center',
    }
});


export default MyButton;