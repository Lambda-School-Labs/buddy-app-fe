import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/Colors";

const ActivityCard = props => {
  return (
    <View style={styles.activityCard}>
      <Text style={[styles.textBold, { fontSize: 18 }]}>Date</Text>
      <Text style={[styles.text, { fontSize: 18 }]}>
        Activity at Time with Person
      </Text>
    </View>
  );
};

export default activityCard;

const styles = StyleSheet.create({
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    width: "100%",
    height: "auto",
    paddingVertical: 10
  }
});
