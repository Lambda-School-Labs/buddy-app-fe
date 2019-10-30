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
  TouchableOpacity
} from "react-native";
import bell from "../assets/icons/bell.png";
import home from "../assets/icons/home.png";
import profile from "../assets/icons/profile.png";
const Profile = props => {
  const signOut = () => {
    onSignOut().then(res => {
      props.addUser({ first_name: "", last_name: "", id: "" });
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

      <View style={Global.bottomNav}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Dashboard")}
        >
          <Image source={home} />
        </TouchableOpacity>
        <Image source={bell} />
        <Image source={profile} />
      </View>
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
