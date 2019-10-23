import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import bell from "../assets/icons/bell.png";
import home from "../assets/icons/home.png";
import inbox from "../assets/icons/inbox.png";
import Profile from "../assets/icons/Profile.png";
//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";

const Dashboard = props => {
  return (
    <View style={Global.container}>
      <View style={Global.logoContainer}>
        <Text style={Global.logo}>BUDDY</Text>
      </View>
      <View style={styles.bottomNav}>
        <Image source={home} />
        <Image source={inbox} />
        <Image source={bell} />
        <Image source={Profile} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: "#6d6dff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
