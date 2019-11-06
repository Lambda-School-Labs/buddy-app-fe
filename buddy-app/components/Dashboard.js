import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  BackHandler
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
import Global from "../styles/Global";
import { getToken, onSignOut } from "../utils/authHelper";

export const Dashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);
  BackHandler.addEventListener("hardwareBackPress", () => {
    onSignOut().then(res => {
      props.addUser({ first_name: "", last_name: "", id: "" });
      AsyncStorage.removeItem("id");
      props.navigation.navigate("Landing");
    });
  });

  useEffect(() => {
    getToken()
      .then(token => {
        axiosWithAuth(token)
          .get("https://buddy-app-be.herokuapp.com/activities")
          .then(allActivities => {
            axiosWithAuth(token)
              .get(
                `https://buddy-app-be.herokuapp.com/interests/user/${props.user.id}`
              )
              .then(user_interests => {
                if (user_interests.data.length >= 1) {
                  console.log(user_interests.data);
                  for (let i = 0; i < allActivities.data.length; i++) {
                    if (allActivities.data[i].organizer_id == props.user.id) {
                      setActivities(oldActivities => [
                        ...oldActivities,
                        allActivities.data[i]
                      ]);
                    }
                    for (let j = 0; j < user_interests.data.length; j++) {
                      if (
                        user_interests.data[j].interests_id ==
                          allActivities.data[i].interest_id &&
                        !activities.includes(allActivities.data[i])
                      ) {
                        setActivities(oldActivities => [
                          ...oldActivities,
                          allActivities.data[i]
                        ]);
                      }
                    }
                  }
                } else {
                  setActivities(allActivities.data);
                }
              })
              .catch(err => {
                console.log(err);
              });
            //setActivities(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      }); // Renders activities
  }, []);

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
      <ScrollView>
        <View style={styles.activityView}>
          {activities.map(activity => {
            return <ActivityCard activity={activity} key={activity.id} />;
          })}

          <AddActivity isVisible={modalVisible} closeModal={closeModal} />
        </View>
      </ScrollView>
      <View style={Global.bottomNav}>
        <Image
          source={home}
          onPress={() => props.naviation.navigate("Dashboard")}
        />
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
