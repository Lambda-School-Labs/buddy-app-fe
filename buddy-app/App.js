import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
// components 
import SignUp from './components/SignUp.js'; 
import SignIn from './components/SignIn';
import Landing from './components/Landing'
//global state
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BuddyReducer from './reducers/BuddyReducer';
const store = createStore(BuddyReducer)

export default function App() {
  const [isAppReady, setAppReady] = useState(false)

  return (
    isAppReady === false ? (
    
      <AppLoading startAsync={_cacheResourcesAsync}
        onFinish={() => setAppReady(true)}
        onError={console.warn} 
        />
        
    ) : (
      <Provider store={ store }>
      <View style={styles.container}>
        <Image source={require('./assets/goose-test.png')} />
        <SignUp />
        <SignIn />
      </View>
      </Provider>
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