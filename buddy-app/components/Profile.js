import React from "react";
import { connect } from "react-redux";
import { addUser } from "../actions/buddyActions";
import Global from "../styles/Global";
import { onSignOut } from "../utils/authHelper";
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { NavBar } from "./NavBar";

const Profile = props => {
  const signOut = () => {
    onSignOut().then(res => {
      props.addUser({ first_name: "", last_name: "", id: "" });
      AsyncStorage.removeItem("id");
      props.navigation.navigate("Landing");
    });
  };
  return (
    <View style={Global.container}>
      <View style={Global.logoContainer}>
        <Text style={Global.logo}>BUDDY</Text>
      </View>
      <TouchableHighlight onPress={() => signOut()}>
        <Text style={[Global.textNormal, { marginTop: 20 }]}>Sign Out</Text>
      </TouchableHighlight>

      {/* <NavBar /> */}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};
export default connect(
  mapStateToProps,
  { addUser }
)(Profile);
