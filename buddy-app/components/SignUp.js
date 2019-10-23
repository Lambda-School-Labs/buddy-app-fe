"use strict";

import React from "react";
import ValidationComponent from "react-native-form-validator";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
// import Axios from 'axios';

export default class SignUp extends ValidationComponent {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    location: ""
  };

  handleChange = (text, eventName) => {
    this.setState({ ...this.state, [eventName]: text });
    // console.log(this.state)
  };

  handleSubmit = () => {
    // testing "Hiya There!"
    console.log("Hiya There!");
    console.log(this.state);
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      location: this.state.location,
      password: this.state.password
    };
    axios
      .post("https://buddy-app-be.herokuapp.com/auth/signup", newUser)
      .then(response => {
        console.log("sign up response", response);
      })
      .catch(error => {
        console.log("sign up error", error);
      });
  };

  _onComplete = () => {
    this.validate({
      first_name: {
        required: true
      },
      last_name: {
        required: true
      },
      email: {
        email: true,
        required: true
      },
      password: {
        required: true
      },
      location: {
        required: true
      }
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView encontentContainerStyle={{ flex: 1 }}>
        <View style={Global.container}>
          <View style={Global.logoContainer}>
            <Text style={Global.logo}>BUDDY</Text>
          </View>

          <Text style={Global.title}>Sign Up</Text>

          <View style={Global.formContainer}>
            <View style={su_styles.name}>
              <TextInput
                placeholder="First Name"
                onChangeText={text => this.handleChange(text, "first_name")}
                style={[Global.input, { width: "45%" }]}
                value={this.state.first_name}
                onKeyPress={() => this._onComplete()}
              />
              <TextInput
                placeholder="Last Name"
                onChangeText={text => this.handleChange(text, "last_name")}
                style={[Global.input, { width: "45%" }]}
                value={this.state.last_name}
                onKeyPress={() => this._onComplete()}
              />
            </View>
            {this.isFieldInError("first_name") &&
              this.getErrorsInField("first_name").map(errorMessage => (
                <Text style={su_styles.error} key={errorMessage}>
                  {errorMessage}
                </Text>
              ))}
            {this.isFieldInError("last_name") &&
              this.getErrorsInField("last_name").map(errorMessage => (
                <Text style={su_styles.error} key={errorMessage}>
                  {errorMessage}
                </Text>
              ))}

            <TextInput
              placeholder="Email"
              onChangeText={text => this.handleChange(text, "email")}
              style={Global.input}
              autoCapitalize="none"
              value={this.state.email}
              onKeyPress={() => this._onComplete()}
            />
            {this.isFieldInError("email") &&
              this.getErrorsInField("email").map(errorMessage => (
                <Text style={su_styles.error} key={errorMessage}>
                  {errorMessage}
                </Text>
              ))}

            <TextInput
              placeholder="Password"
              onChangeText={text => this.handleChange(text, "password")}
              style={Global.input}
              autoCapitalize="none"
              value={this.state.password}
              onKeyPress={() => this._onComplete()}
            />
            {this.isFieldInError("password") &&
              this.getErrorsInField("password").map(errorMessage => (
                <Text style={su_styles.error} key={errorMessage}>
                  {errorMessage}
                </Text>
              ))}

            <TextInput
              placeholder="Location"
              onChangeText={text => this.handleChange(text, "location")}
              style={Global.input}
              value={this.state.location}
              onKeyPress={() => this._onComplete()}
            />
            {this.isFieldInError("location") &&
              this.getErrorsInField("location").map(errorMessage => (
                <Text style={su_styles.error} key={errorMessage}>
                  {errorMessage}
                </Text>
              ))}
          </View>

          <View style={Buttons.container}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Landing")}
            >
              <Text style={[Buttons.text, Buttons.textAuth]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Buttons.btn, Buttons.primary, { width: 130 }]}
              onPress={() => this.handleSubmit()}
            >
              <Text
                style={[Buttons.text, Buttons.textAuth, Buttons.textPrimary]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={su_styles.bottomNav}></View>
      </KeyboardAwareScrollView>
    );
  }
}

const su_styles = StyleSheet.create({
  name: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottomNav: {
    backgroundColor: "#6d6dff",
    height: 96,
    width: "100%",
    bottom: 0
  },
  error: {
    color: "red"
  }
});
