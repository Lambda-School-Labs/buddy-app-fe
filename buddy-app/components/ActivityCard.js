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
        <View style={[Buttons.activityBtn, Buttons.primary, Buttons.editBtn]}>
          <TouchableOpacity>
            <Text style={Buttons.textWhite} onPress={toggleModal}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // remove borderColor and color when ready to activate Join
        <View style={[Buttons.activityBtn, { borderColor: "white" }]}>
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
