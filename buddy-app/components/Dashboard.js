import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ScrollView
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
import { getToken } from "../utils/authHelper";

export const Dashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);
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
                  const filteredActivities = [];
                  for (let i = 0; i < allActivities.data.length; i++) {
                    for (let j = 0; j < user_interests.data.length; j++) {
                      if (
                        user_interests.data[j].interests_id ==
                        allActivities.data[i].interest_id
                      ) {
                        filteredActivities.push(allActivities.data[i]);
                      }
                    }
                  }

                  setActivities(filteredActivities);
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

    if (props.user.first_name.length < 1) {
      AsyncStorage.getItem("id")
        .then(res => {
          getToken()
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
