import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToken } from "../actions/buddyActions";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { storeToken } from "../authHelper";
import AuthStack from "./AuthStack";

//styles
import Buttons from '../styles/Buttons'
import Global from '../styles/Global'


const SignIn = props => {
  const [info, setInfo] = useState({ email: "", password: "" });

  const changeHandler = (value, name) => {
    setInfo({ ...info, [name]: value });
  };

  const cancelSignInHandler = () => {
    setInfo({ email: "", password: "" });
    props.navigation.navigate("Landing");
  };

  const signInHandler = () => {
    if (!info.email || !info.password) {
      return;
    }
    Alert.alert(
      "Signing In",
      `Attempting to sign in... with ${info.email} and ${info.password} `,
      [
        {
          text: "OK",
          onPress: () => console.log("Sign in attempt."),
          style: "destructive"
        }
      ]
    );

    axios
      .post("https://buddy-app-be.herokuapp.com/auth/signin", info)
      .then(res => {
        //console.log(res.data)
        storeToken(res.data.token);
        return props.navigation.navigate("AuthStack");
      })
      .catch(err => {
        console.log(err.message);
      });
    // Validation
    // Performs a HTTP request to the backend
    // Returns...?
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.screen}>
        <View style={Global.logoContainer}>
          <Text style={Global.logo}>BUDDY</Text>
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.pageTitle}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={e => changeHandler(e, "email")}
            value={info.email}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={e => changeHandler(e, "password")}
            value={info.password}
            autoCapitalize="none"
            secureTextEntry
          />
          <View style={styles.redirectContainer}>
            <Text style={styles.redirect}>
              Don't have an account yet? Sign Up (ADD LINK)
            </Text>
          </View>
          <View style={Buttons.container}>
            <TouchableOpacity onPress={cancelSignInHandler}>
              <Text style={[Buttons.text,Buttons.textAuth]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signInHandler}
              style={[Buttons.btn,Buttons.secondary, { width: 130 }]}
            >
              <Text style={[Buttons.text,Buttons.textAuth]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomNav}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 30,
    width: "100%",
    marginTop: 55,
    alignItems: 'flex-start',
  },
  signInContainer: {
    marginTop: 60
  },
  pageTitle: {
    fontSize: 30,
    color: "#2E2F38",
    fontFamily: "Nunito-Regular",
    marginBottom: 30
  },
  input: {
    marginVertical: 10,
    width: 350,
    padding: 8,
    borderWidth: 0.5,
    borderColor: "#2E2F38",
  },
  redirectContainer: {
    width: "100%",
    alignItems: "center"
  },
  redirect: {
    fontSize: 15,
    fontFamily: "Nunito-Light"
  },
  bottomNav: {
    backgroundColor: "#6d6dff",
    height: 96,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    token: state.token
  };
};

export default connect(
  mapStateToProps,
  { addToken }
)(SignIn);
