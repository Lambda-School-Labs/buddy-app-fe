import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/Colors";

const ProfileCard = props => {
  const { activity } = props;
  console.log("profile card is being rendered");
  return (
    <View style={styles.card}>
      <Text style={[styles.textBold, { fontSize: 18 }]}>{activity.date}</Text>
      <Text style={[styles.text, { fontSize: 18 }]}>
        {activity.name} at {activity.time} with Person
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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

export default ProfileCard;
