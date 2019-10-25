import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { addUser } from "../actions/buddyActions";
import axiosWithAuth from "../utils/axiosWithAuth";

//icons
import bell from "../assets/icons/bell.png";
import home from "../assets/icons/home.png";
import profile from "../assets/icons/profile.png";

//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import { onSignOut } from "../utils/authHelper";

const Dashboard = props => {
  useEffect(() => {
    if (props.user.first_name.length < 1) {
      AsyncStorage.getItem("id")
        .then(res => {
          AsyncStorage.getItem("@token")
            .then(token => {
              axiosWithAuth(token)
                .get(`https://buddy-app-be.herokuapp.com/users/${res}`)
                .then(user => {
                  props.addUser(user.data);
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const signOut = () => {
    console.log(props);
    onSignOut()
      .then(res => {
        props.addUser({
          first_name: "",
          last_name: "",
          id: ""
        });
        props.navigation.navigate("Landing");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={Global.container}>
      <View style={Global.logoContainer}>
        <Text style={Global.logo}>BUDDY</Text>
      </View>
      <View>
        <Text>
          Welcome {props.user.first_name} {props.user.last_name}
        </Text>
        <TouchableHighlight onPress={() => signOut()}>
          <Text> Sign Out</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.bottomNav}>
        <Image source={home} />
        <Image source={bell} />
        <Image source={profile} />
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
  { addUser }
)(Dashboard);
