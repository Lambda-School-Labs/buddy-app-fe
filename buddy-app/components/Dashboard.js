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
import moment from "moment";
import { connect } from "react-redux";
import { addUser } from "../actions/buddyActions";
import ActivityCard from "./ActivityCard";
import AddActivity from "./AddActivity";
import { NavBar } from "./NavBar";
import axiosWithAuth from "../utils/axiosWithAuth";

//icons
import addActivity from "../assets/icons/add_activity_button.png";

//styles
import Global from "../styles/Global";
import { getToken, onSignOut } from "../utils/authHelper";

export const Dashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);
  const [editRerender, setEditRerender] = useState(true);

  BackHandler.addEventListener("hardwareBackPress", () => {
    onSignOut().then(res => {
      props.addUser({ first_name: "", last_name: "", id: "" });
      AsyncStorage.removeItem("id");
      props.navigation.navigate("Landing");
    });
  });

  function timeConvertor(time) {
    var PM = time.match("PM") ? true : false;

    time = time.split(":");

    if (PM) {
      var hour = 12 + parseInt(time[0], 10);
      var min = time[1].replace("PM", "");
    } else {
      var hour = time[0];
      var min = time[1].replace("AM", "");
    }

    return `${hour}:${min}`;
  }

  useEffect(() => {
    const now = moment(Date.now()).format("MM/D/YY");
    const time = moment(Date.now()).format("HH:mm");
    console.log(time);
    console.log(now);
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
                let filteredActivities = [];
                console.log(editRerender);
                if (user_interests.data.length >= 1) {
                  // console.log(user_interests.data);

                  for (let i = 0; i < allActivities.data.length; i++) {
                    let activityTime = timeConvertor(
                      allActivities.data[i].time
                    );
                    if (
                      Date.parse(now) <= Date.parse(allActivities.data[i].date)
                    ) {
                      if (
                        Date.parse(now) ==
                          Date.parse(allActivities.data[i].date) &&
                        Date.parse(
                          `${allActivities.data[i].date} ${activityTime}`
                        ) < Date.parse(`${allActivities.data[i].date} ${time}`)
                      ) {
                      } else {
                        if (
                          allActivities.data[i].organizer_id == props.user.id
                        ) {
                          filteredActivities.unshift(allActivities.data[i]);
                        }
                        for (let j = 0; j < user_interests.data.length; j++) {
                          if (
                            user_interests.data[j].interests_id ==
                              allActivities.data[i].interest_id &&
                            !filteredActivities.includes(allActivities.data[i])
                          ) {
                            filteredActivities.push(allActivities.data[i]);
                          }
                        }
                      }
                    }
                  }

                  setActivities([]);
                  filteredActivities.map(activity =>
                    axiosWithAuth(token)
                      //get length of activity guest list.
                      .get(
                        `https://buddy-app-be.herokuapp.com/useractivities/activity/${activity.id}`
                      )
                      .then(res => {
                        // console.log("GuestList res.data", res.data);

                        const guestList = res.data.map(
                          activity => activity.user_id
                        );
                        if (
                          (guestList.includes(props.user.id) === false &&
                            activity.guest_limit === null) ||
                          guestList.length < activity.guest_limit ||
                          activity.organizer_id == props.user.id
                        ) {
                          setActivities(oldActivities =>
                            [...oldActivities, activity].sort(function(a, b) {
                              return new Date(a.date) - new Date(b.date);
                            })
                          );
                        }
                      })
                      .catch(err => console.log(err))
                  );
                } else {
                  props.navigation.navigate("InterestOnboard");
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
  }, [modalVisible, editRerender]);

  const setRerender = () => {
    setEditRerender(!editRerender);
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
          <Image source={addActivity} style={styles.activityButton} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={Global.title}>
          Welcome, {props.user.first_name} {props.user.last_name}
        </Text>
      </View>
      <View style={{ height: "70%" }}>
        <ScrollView>
          <View style={styles.activityView}>
            {activities.map(activity => {
              return (
                <ActivityCard
                  activity={activity}
                  key={activity.id}
                  setRerender={setRerender}
                />
              );
            })}

            <AddActivity isVisible={modalVisible} closeModal={closeModal} />
          </View>
        </ScrollView>
      </View>
      <NavBar navigation={props.navigation} />
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
  },
  activityButton: {
    width: 100,
    height: 40
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user
  };
};

export default connect(mapStateToProps, { addUser })(Dashboard);
