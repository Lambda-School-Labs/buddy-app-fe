import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import EditActivity from "./EditActivity";
import { connect } from "react-redux";

// styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import Colors from "../styles/Colors";

function ActivityCard(props) {
  const [activity] = useState(props.activity);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    // console.log(props);
    setIsModalVisible(!isModalVisible);
  };

  console.log("User", props.user);
  console.log("props", props);

  return (
    <View style={styles.activityCard}>
      <View style={styles.activityView}>
        <Text style={styles.activityText}>
          <Text style={{ fontFamily: "Nunito-Bold" }}>{activity.name}</Text> on{" "}
          <Text style={{ fontFamily: "Nunito-Bold" }}>{activity.date}</Text> at{" "}
          <Text style={{ fontFamily: "Nunito-Bold" }}>{activity.time}</Text>{" "}
          with {activity.organizer_name}
        </Text>
      </View>

      {props.user.id === props.activity.organizer_id ? (
        <View style={styles.activityBtn}>
          <TouchableOpacity>
            <Text
              style={/*Buttons.text*/ { color: "purple" }}
              onPress={toggleModal}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.activityBtn}>
          <TouchableOpacity>
            <Text style={/*Buttons.text*/ { color: "white" }}>Ask to Join</Text>
          </TouchableOpacity>
        </View>
      )}
      <EditActivity
        activity={activity}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    width: "95%",
    marginTop: 20,
    paddingBottom: 20,
    height: "auto"
  },

  activityBtn: {
    width: "33%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },

  joinBtn: {
    borderColor: "white"
  },

  editBtn: {
    borderColor: "purple"
  },

  activityView: {
    width: "60%"
  },

  activityText: {
    fontSize: 16,
    color: Colors.darkGray,
    fontFamily: "Nunito-Regular"
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
)(ActivityCard);
