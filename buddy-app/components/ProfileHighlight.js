import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/Colors";

const ProfileHighlight = props => {
  console.log(props.highlight, "props.highlight");
  if (props.highlight.length >= 1) {
    var highlight1 = props.highlight[0];
    var highlight2 = props.highlight[1];
    var highlight3 = props.highlight[2];

    return (
      <View style={styles.highlightBox}>
        <View style={styles.highlightPrimary}>
          <Text style={[styles.textBold, { fontSize: 25 }]}>
            {highlight1.date}
          </Text>
          <Text style={[styles.text, { fontSize: 20 }]}>
            {highlight1.name} at {highlight1.time}
          </Text>
        </View>
        <View style={styles.highlightSubBox}>
          <View style={styles.highlightSecondary}>
            <Text style={[styles.textBold, { fontSize: 18 }]}>
              {highlight2.date}
            </Text>
            <Text style={[styles.text, { fontSize: 16 }]}>
              {highlight2.name} at {highlight2.time}
            </Text>
          </View>
          <View style={styles.highlightSecondary}>
            <Text style={[styles.textBold, { fontSize: 18 }]}>
              {highlight3.date}
            </Text>
            <Text style={[styles.text, { fontSize: 16 }]}>
              {highlight3.name} at {highlight3.time}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return <View style={styles.highlightBox}></View>;
  }
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
