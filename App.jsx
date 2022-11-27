import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';

import Main from './screens/Main';
import List from './screens/List';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="list" component={List} options={{ title: 'Zapis pozycji', headerStyle: { backgroundColor: '#303f9f' }, headerTintColor: '#fff', }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303f9f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { fontSize: 54, fontWeight: 'bold', color: 'white', margin: 12.5, fontFamily: 'Worksans', },
  regular: { fontSize: 24, fontWeight: 'regular', color: 'white' }
});

export default App;

