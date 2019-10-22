import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';

export default function Landing(props) {
  return (
    <ImageBackground style={landing.background} source={require('../assets/landing-background.png')}>
    <View style={landing.container}>
      <View style={landing.logoContainer}>
        <Text style={landing.logo}>BUDDY</Text>
      </View>
      <View>
        <Text style={landing.subtitle}>A friendly network to help you discover the world around.</Text>
      </View>
      <View style={landing.buttonContainer}>
          <TouchableOpacity
          onPress={() => props.navigation.navigate('SignIn')}
          style={landing.signInButton}
          >
          <Text style={landing.buttonText}>Sign In</Text>
          </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignUp')}
          style={landing.signUpButton}>
          <Text style={landing.buttonText}>Sign Up</Text>
          </TouchableOpacity>
      </View>

      <View style={landing.mapContainer}>
        <Text>Map image goes here</Text>
      </View>
    </View>
    </ImageBackground>
  );
};

const landing = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: '15%',
    paddingTop: '25%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  logoContainer: {
    borderBottomWidth: 5,
    borderBottomColor: 'black',
  },
  logo: {
    fontSize: 35,
    color: '#2E2F38',
    fontFamily: 'Nunito-Black',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 20,
    color: '#2E2F38',
    fontFamily: 'Nunito-Regular',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#999999',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  signInButton: {
    width: 130,
    borderWidth: 1,
    borderColor: '#2e2f38',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  signUpButton: {
    width: 130,
    borderWidth: 1,
    backgroundColor: '#6D6DFF',
    borderColor: '#6D6DFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'Nunito-Regular',
  },
})