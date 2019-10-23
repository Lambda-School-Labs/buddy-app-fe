import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";

export default class SignUp extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    location: ""
  };

  handleChange = (text, eventName) => {
    this.setState({ ...this.state, [eventName]: text });
    console.log(this.state);
  };

  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={su_styles.container}>
          <View style={Global.logoContainer}>
            <Text style={Global.logo}>BUDDY</Text>
          </View>

          <Text style={su_styles.signUp}>Sign Up</Text>

          <View style={su_styles.form}>
            <View style={su_styles.name}>
              <TextInput
                placeholder="First Name"
                onChangeText={text => this.handleChange(text, "first_name")}
                style={su_styles.first}
              />
              <TextInput
                placeholder="Last Name"
                onChangeText={text => this.handleChange(text, "last_name")}
                style={su_styles.last}
              />
            </View>

            <TextInput
              placeholder="Email"
              onChangeText={text => this.handleChange(text, "email")}
              style={su_styles.input}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              onChangeText={text => this.handleChange(text, "password")}
              style={su_styles.input}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Location"
              onChangeText={text => this.handleChange(text, "location")}
              style={su_styles.input}
            />
          </View>

          <View style={Buttons.container}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Landing")}
            >
              <Text style={[Buttons.text, Buttons.textAuth]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Buttons.btn, Buttons.primary, { width: 130 }]}
            >
              <Text
                style={[Buttons.text, Buttons.textAuth, Buttons.textPrimary]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const su_styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    width: "100%",
    marginTop: 55,
    alignItems: "flex-start"
  },
  form: {
    height: 300,
    display: "flex",
    justifyContent: "space-evenly"
  },
  input: {
    borderColor: "#d6d7da",
    borderWidth: 1.2,
    width: 350,
    height: 45,
    paddingLeft: 10
  },
  signUp: {
    marginTop: 60,
    fontSize: 30,
    color: "#2E2F38",
    fontFamily: "Nunito-Regular",
    marginBottom: 30
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  first: {
    width: 167,
    height: 45,
    borderColor: "#d6d7da",
    borderWidth: 1.2,
    paddingLeft: 10
  },
  last: {
    width: 167,
    height: 45,
    borderColor: "#d6d7da",
    borderWidth: 1.2,
    textAlign: "left",
    paddingLeft: 10
  }
});
