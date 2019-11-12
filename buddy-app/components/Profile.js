import React, { useState } from "react";
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
  AsyncStorage,
  ScrollView,
  StyleSheet
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ProfileModal from "./ProfileModal";
import { NavBar } from "./NavBar";

const Profile = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const sendToLanding = () => {
    props.navigation.navigate("Landing");
  };

  return (
    <View style={Global.container}>
      <View style={styles.profileHeader}>
        <View style={Global.logoContainer}>
          <Text style={Global.logo}>BUDDY</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Feather name="user" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[Global.textNormal, { marginTop: 20 }]}>
          Hi, {props.user.firstname}
        </Text>
        <View style={{ height: "70%" }}>
          <ScrollView></ScrollView>
        </View>
      </View>
      <NavBar navigation={props.navigation} />
      <ProfileModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        sendToLanding={sendToLanding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    ...state
  };
};
export default connect(
  mapStateToProps,
  { addUser }
)(Profile);
