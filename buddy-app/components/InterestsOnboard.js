import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity
} from "react-native";
import axios from "axios";

const InterestsOnboard = () => {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    axios
      .get("https://buddy-app-be.herokuapp.com/interests")
      .then(res => {
        setInterests(res.data);
      })
      .catch(err => {
        console.log("Error Message", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tell us more about yourself!</Text>

      <Text style={styles.titleText}>
        What are some of your interests or activites you like to do?
      </Text>
      <FlatList
        keyExtractor={interests => interests.name}
        data={interests}
        renderItem={({ item }) => {
          return <Text style={styles.textStyle}>{item.name}</Text>;
        }}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.finishButton}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    alignItems: "flex-start"
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    width: 300
  },
  normalText: {
    fontSize: 20
  },
  titleText: {
    fontSize: 18,
    marginVertical: 20
  },
  buttonView: {},
  cancelButton: {
    fontSize: 18,
    width: 130,
    height: 40
  },
  finishButton: {
    color: "white",
    width: 130,
    height: 40,
    fontSize: 18,
    backgroundColor: "#6D6DFF"
  },
  textStyle: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 10
  }
});

export default InterestsOnboard;
