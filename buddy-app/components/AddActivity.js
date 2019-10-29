import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Image
} from "react-native";

//icons
import addButton from "../assets/icons/add_button.png";
//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import Colors from "../styles/Colors";

export default function AddActivity(props) {
  return (
    <Modal animationType="slide" transparent={false} visible={props.isVisible}>
      <View style={styles.viewContainer}>
        <View style={styles.addView}>
          <View>
            <Text style={styles.addHeader}>Add an Activity</Text>
          </View>
          <View style={styles.addInputContainer}>
            <Text style={styles.addText}>What Do You Want To Do?</Text>
            <TextInput
              style={[Global.input, styles.addInput]}
              placeholder="Activity"
            ></TextInput>
            <Text style={styles.addText}>When Do You Want To Go?</Text>
            <TextInput
              style={[Global.input, styles.addInput]}
              placeholder="Activity"
            ></TextInput>
            <Text style={styles.addText}>Where?</Text>
            <TextInput
              style={[Global.input, styles.addInput]}
              placeholder="Activity"
            ></TextInput>
            <Text style={styles.addText}>Don't Forget A Note!</Text>
            <TextInput
              style={[Global.input, { height: 77 }, styles.addInput]}
              placeholder="This lets people know what to look out for!"
            ></TextInput>
            <View style={styles.addBtn}>
              <TouchableOpacity onPress={props.closeModal}>
                <Image source={addButton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    alignItems: "center"
  },
  addView: {
    width: "75%",
    marginTop: 55
  },
  addHeader: {
    fontSize: 25,
    fontFamily: "Nunito-Bold",
    marginBottom: 30
  },
  addText: {
    fontSize: 18,
    color: Colors.darkGray,
    fontFamily: "Nunito-Regular",
    marginBottom: -15
  },

  addInputContainer: {
    height: "80%"
    // justifyContent: "space-between"
  },

  addInput: {
    marginBottom: 25
  },

  addBtn: {
    alignSelf: "flex-end"
  }
});
