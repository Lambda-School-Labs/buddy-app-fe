import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image
} from "react-native";

import { connect } from "react-redux";
import { getToken } from "../utils/authHelper";
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import { addUser } from "../actions/buddyActions";

function Landing(props) {
  useEffect(() => {
    console.log(props.user, "user");
    getToken().then(res => {
      if (res !== null) {
        props.navigation.navigate("AuthStack");
      } else {
        props.addUser({
          first_name: "",
          last_name: "",
          id: ""
        });
      }
    });
  }, []);

  return (
    <ImageBackground
      style={landing.background}
      source={require("../assets/landing-background.png")}
    >
      <View style={landing.container}>
        <View style={Global.logoContainer}>
          <Text style={Global.logo}>BUDDY</Text>
        </View>
        <View>
          <Text style={landing.subtitle}>
            A friendly network to help you discover the world around.
          </Text>
        </View>
        <View style={landing.buttonContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("SignIn")}
            style={[Buttons.btn, Buttons.secondary]}
          >
            <Text style={[Buttons.text, Buttons.textAuth]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("SignUp")}
            style={[Buttons.btn, Buttons.primary]}
          >
            <Text style={[Buttons.text, Buttons.textAuth, Buttons.textPrimary]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={landing.mapContainer}>
          <Image
            style={landing.map}
            source={require("../assets/landing-map.png")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const landing = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: "15%",
    paddingTop: "20%",
    paddingBottom: "10%",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-around"
  },
  subtitle: {
    fontSize: 20,
    color: "#2E2F38",
    fontFamily: "Nunito-Regular"
  },
  mapContainer: {
    width: "100%"
  },
  map: {
    resizeMode: "cover",
    width: "100%",
    height: 300
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { addUser }
)(Landing);
