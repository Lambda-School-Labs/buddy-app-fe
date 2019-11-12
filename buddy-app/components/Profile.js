import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addUser } from "../actions/buddyActions";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";

// Components
import ProfileModal from "./ProfileModal";
import ProfileHighlight from "./ProfileHighlight";
import ProfileCard from "./ProfileHighlight";
import { NavBar } from "./NavBar";

// Styles
import { Feather } from "@expo/vector-icons";
import Global from "../styles/Global";
import Colors from "../styles/Colors";

const Profile = props => {
  // ---------- MODAL ----------- //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const sendToLanding = () => props.navigation.navigate("Landing"); // pass nav props since React Navigation Modal doesn't play nicely with React Navigation :-\

  // ---------- activities ---------- //
  // get activities where user is organizer
  // get activities where user is guest
  // separate top 3 activities for ProfileHighlight box
  // remaining activities are made into ProfileCard components

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
      <View style={styles.profileBody}>
        <Text style={styles.title}>Hi, {props.user.first_name}</Text>
        <View style={styles.hr} />
        <View>
          <ScrollView>
            <Text style={styles.subtitle}>Upcoming Activities</Text>
            <ProfileHighlight />
            <View style={styles.activityCardList}>
              {/* map over remaining activities and generate <ProfileCard /> for each */}
            </View>
            <View style={styles.profileCounter}>
              <Text style={styles.subtitle}>What I've Been Up To</Text>
              <Text style={styles.text}>Total Activities:</Text>
              <Text style={styles.textBold}>[Count] Activities</Text>
            </View>
          </ScrollView>
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
  },
  profileBody: {
    width: "100%"
  },
  hr: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    marginVertical: 20,
    width: "100%"
  },
  title: {
    fontSize: 25,
    marginTop: 30,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Nunito-Bold",
    color: Colors.darkGray,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  },
  textBold: {
    fontSize: 16,
    fontFamily: "Nunito-Bold",
    color: Colors.darkGray
  },
  activityCardList: {
    height: "auto",
    width: "100%",
    marginTop: 30
  },
  profileCounter: {
    paddingVertical: 20,
    height: "auto"
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
