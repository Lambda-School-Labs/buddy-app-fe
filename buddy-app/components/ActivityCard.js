import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

// styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import Colors from "../styles/Colors";
import { nominalTypeHack } from "prop-types";

export default function ActivityCard(props) {
  const [activity] = useState(props.activity);
  return (
    <View style={styles.activityCard}>
      <View style={styles.activityView}>
        <Text style={styles.activityText}>
          {activity.name} with {activity.organizer_name} at {activity.time} on{" "}
          {activity.date}
        </Text>
      </View>
      <View style={styles.joinBtn}>
        <TouchableOpacity>
          <Text style={/*Buttons.text*/ { color: "white" }}>Ask to Join</Text>
        </TouchableOpacity>
      </View>
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

  joinBtn: {
    width: "33%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },

  activityView: {
    width: "60%"
  },

  activityText: {
    fontSize: 16,
    color: Colors.darkGray,
    fontFamily: "Nunito-Bold"
  }
});
