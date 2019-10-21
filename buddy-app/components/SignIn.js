import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';

const SignIn = props => {
  const [info, setInfo] = useState({ email: '', password: '' });

  const changeHandler = (value, name) => {
    setInfo({ ...info, [name]: value });
  };

  const cancelSignInHandler = () => {
    setInfo({ email: '', password: '' });
    props.navigation.navigate('Landing');
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@token', value);
      console.log(AsyncStorage.getItem('token'));
    } catch (e) {
      console.log(e);
    }
  }; // Stores the token into AsyncStorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        // value previously stored
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  }; //This is how you retrieve the token

  const signInHandler = () => {
    if (!info.email || !info.password) {
      return;
    }
    Alert.alert(
      'Signing In',
      `Attempting to sign in... with ${info.email} and ${info.password} `,
      [
        {
          text: 'OK',
          onPress: () => console.log('Sign in attempt.'),
          style: 'destructive',
        },
      ],
    );

    axios
      .post('https://buddy-app-be.herokuapp.com/auth/signin', info)
      .then(res => {
        //console.log(res.data)
        storeData(res.data.token);
      })
      .catch(err => {
        console.log(err.message);
      });
    // Validation
    // Performs a HTTP request to the backend
    // Returns...?
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>BUDDY</Text>
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.pageTitle}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={e => changeHandler(e, 'email')}
          value={info.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={e => changeHandler(e, 'password')}
          value={info.password}
          secureTextEntry
        />
        <View style={styles.redirectContainer}>
          <Text style={styles.redirect}>
            Don't have an account yet? Sign Up (ADD LINK)
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={cancelSignInHandler}
            style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signInHandler} style={styles.signInButton}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomNav}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 30,
    width: '100%',
    marginTop: 55,
  },
  headerContainer: {},
  header: {
    fontSize: 35,
    color: '#2E2F38',
    borderBottomWidth: 5,
    width: 130,
    fontFamily: 'Nunito-Black',
  },
  signInContainer: {
    width: '100%',
    marginTop: 60,
  },
  pageTitle: {
    fontSize: 30,
    color: '#2E2F38',
    fontFamily: 'Nunito-Regular',
    marginBottom: 30,
  },
  input: {
    marginVertical: 10,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#2E2F38',
    borderRadius: 8,
  },
  redirectContainer: {
    width: '100%',
    alignItems: 'center',
  },
  redirect: {
    fontSize: 15,
    fontFamily: 'Nunito-Light',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  cancelButton: {
    width: '40%',
  },
  signInButton: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#2e2f38',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'Nunito-Regular',
  },
  bottomNav: {
    backgroundColor: '#6d6dff',
    height: 96,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SignIn;
