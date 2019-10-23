import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";

//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";

const Dashboard = props => {
  return (
    <View style={Global.container}>
      <View style={Global.logoContainer}>
        <Text style={Global.logo}>BUDDY</Text>
      </View>
      <View style={styles.bottomNav}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: "#6d6dff",
    height: 96,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  fakeLink: {
    color: "#6D6DFF",
    textDecorationLine: "underline",
    fontSize: 15,
    fontFamily: "Nunito-Light"
  },
  fakeLinkContainer: {
    alignSelf: "center"
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
  {}
)(Dashboard);
