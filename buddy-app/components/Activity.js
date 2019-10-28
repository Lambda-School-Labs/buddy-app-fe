import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

// styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";

export default function Activity(props) {
  const [activity, setActivity] = useState({
    first_name: "Marlene",
    activity_name: "Tennis",
    activity_time: "1:00PM",
    date: "10/28/2019"
  });

  return (
    <View style={styles.activityCard}>
      <View style={styles.activityText}>
        <Text>
          {activity.first_name} is {activity.activity_name} at {activity.date}{" "}
          {activity.activity_time}
        </Text>
      </View>
      <View style={styles.joinBtn}>
        <TouchableOpacity>
          <Text>Ask to Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    width: "100%",
    paddingBottom: 20
  },

  joinBtn: {
    width: "33%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },

  activityText: {
    width: "60%"
  }
});
