import React, { useState } from "react";
import DatePicker from "react-native-datepicker";
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
import calendar from "../assets/icons/calendar.png";
//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import Colors from "../styles/Colors";

export default function AddActivity(props) {
  const [activityDate, setActivityDate] = useState("10/29/19");
  const [activityTime, setActivityTime] = useState("10:30");
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
            <View style={[styles.datePicker, styles.addInput]}>
              <Image source={calendar} />
              <DatePicker
                placeholder="Select Date"
                date={activityDate}
                mode="date"
                format="MM/DD/YY"
                minDate="10/29/19"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={date => setActivityDate(`${date}`)}
                style={styles.date}
                customStyles={{ dateInput: { borderRadius: 5 } }}
              />

              <DatePicker
                mode="time"
                placeholder="Select Time"
                date={activityTime}
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour={false} // only works for Android view
                onDateChange={date => setActivityTime(`${date}`)}
                style={styles.time}
                customStyles={{ dateInput: { borderRadius: 5 } }}
              />
            </View>
            <Text style={styles.addText}>Where?</Text>
            <TextInput
              style={[Global.input, styles.addInput]}
              placeholder="Add Location"
            ></TextInput>
            <Text style={styles.addText}>Don't Forget A Note!</Text>
            <TextInput
              style={[Global.input, { height: 77 }, styles.addInput]}
              multiline={true}
              textAlignVertical={"top"}
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
  },

  addInput: {
    marginBottom: 25
  },

  addBtn: {
    alignSelf: "flex-end"
  },
  datePicker: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  date: {
    width: "45%"
  },

  time: {
    width: "35%"
  }
});
