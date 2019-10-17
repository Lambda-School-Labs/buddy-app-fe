import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

import Landing from './components/Landing'

// components 
import SignUp from './components/SignUp.js'; 
import SignIn from './components/SignIn';
import Root from "./Root";
export default function App() {
  const [isAppReady, setAppReady] = useState(false)

  return (
    isAppReady === false ? (
      <AppLoading startAsync={_cacheResourcesAsync}
        onFinish={() => setAppReady(true)}
        onError={console.warn} 
        />
    ) : (

      <View style={styles.container}>
        <Image source={require('./assets/goose-test.png')} />
        <SignUp />
        <SignIn />
        <Root />
      </View>
      
    )
    
  );
}

const  _cacheResourcesAsync = async () => {
  const images = [
    require('./assets/goose-test.png')
  ];
  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  }); 
  return Promise.all(cacheImages);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});