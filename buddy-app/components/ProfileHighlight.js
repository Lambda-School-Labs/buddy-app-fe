import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/Colors";

const ProfileHighlight = props => {
  return (
    <View style={styles.highlightBox}>
      <View style={styles.highlightPrimary}>
        <Text style={[styles.textBold, { fontSize: 25 }]}>Date</Text>
        <Text style={[styles.text, { fontSize: 20 }]}>
          Activity at Time with Person
        </Text>
      </View>
      <View style={styles.highlightSubBox}>
        <View style={styles.highlightSecondary}>
          <Text style={[styles.textBold, { fontSize: 18 }]}>Date</Text>
          <Text style={[styles.text, { fontSize: 16 }]}>
            Activity at Time with Person
          </Text>
        </View>
        <View style={styles.highlightSecondary}>
          <Text style={[styles.textBold, { fontSize: 18 }]}>Date</Text>
          <Text style={[styles.text, { fontSize: 16 }]}>
            Activity at Time with Person
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHighlight;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  },
  textBold: {
    fontSize: 16,
    fontFamily: "Nunito-Bold",
    color: Colors.darkGray
  },
  highlightBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  highlightPrimary: {
    backgroundColor: "rgba(109, 109, 255, 0.3)",
    width: 175,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  highlightSubBox: {
    flexGrow: 2,
    paddingLeft: 15,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  highlightSecondary: {
    width: "80%",
    paddingVertical: 10
  }
});