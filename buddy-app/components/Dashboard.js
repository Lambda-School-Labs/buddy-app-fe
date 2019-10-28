import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { addUser } from "../actions/buddyActions";
import ActivityCard from "./ActivityCard";
import AddActivity from "./AddActivity";
import axiosWithAuth from "../utils/axiosWithAuth";

//icons
import bell from "../assets/icons/bell.png";
import home from "../assets/icons/home.png";
import profile from "../assets/icons/profile.png";
import addActivity from "../assets/icons/add_activity_button.png";
//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import { onSignOut } from "../utils/authHelper";

const Dashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);
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
        props.navigation.navigate("Landing");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={Global.container}>
      <View style={styles.dashBoardHeader}>
        <View style={Global.logoContainer}>
          <Text style={Global.logo}>BUDDY</Text>
        </View>
        <TouchableOpacity onPress={openModal}>
          <Image source={addActivity} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={Global.title}>
          Welcome {props.user.first_name} {props.user.last_name}
        </Text>
      </View>
      <View style={styles.activityView}>
        <ActivityCard />
        <AddActivity isVisible={modalVisible} closeModal={closeModal} />
      </View>
      <View style={Global.bottomNav}>
        <Image source={home} />
        <Image source={bell} />
        <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
          <Image source={profile} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fakeLink: {
    color: "#6D6DFF",
    textDecorationLine: "underline",
    fontSize: 15,
    fontFamily: "Nunito-Light"
  },
  fakeLinkContainer: {
    alignSelf: "center"
  },
  activityView: {
    alignItems: "center",
    width: "100%"
  },
  dashBoardHeader: {
    width: "100%",
    flexDirection: "row",
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
)(Dashboard);
