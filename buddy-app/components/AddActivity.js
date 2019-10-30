import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
  Modal,
  Image
} from "react-native";
import axiosWithAuth from "../utils/axiosWithAuth";
import { getToken } from "../utils/authHelper";
//icons
import addButton from "../assets/icons/add_button.png";
import calendar from "../assets/icons/calendar.png";
//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import Colors from "../styles/Colors";

function AddActivity(props) {
  const [activityDate, setActivityDate] = useState("10/29/19");
  const [activityTime, setActivityTime] = useState("10:30");
  const [interests, setInterests] = useState([...props.interests]);
  const [activityInterest, setActivityInterest] = useState({ name: "Sports" });
  const [newActivity, setNewActivity] = useState({
    name: "",
    notes: "",
    location: "",
    organizer_id: props.user.id
  });
  const updateActivityInterest = value => {
    setActivityInterest({ name: value });
  };

  const saveActivity = () => {
    console.log(newActivity);
    getToken()
      .then(token => {
        axiosWithAuth(token)
          .post("https://buddy-app-be.herokuapp.com/activities", newActivity)
          .then(res => {
            props.closeModal();
            console.log(res, "res");
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const activityChangeHandler = (value, name) => {
    const interestId = interests.filter(
      interest => interest.name === activityInterest.name
    )[0].id;

    setNewActivity({
      ...newActivity,
      [name]: value,
      date: activityDate,
      time: activityTime,
      interest_id: interestId
    });
  };
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
              onChangeText={e => activityChangeHandler(e, "name")}
            ></TextInput>
            <Picker
              selectedValue={activityInterest.name}
              onValueChange={itemValue => {
                updateActivityInterest(itemValue);
              }}
              style={{ height: 50, width: "75%" }}
            >
              {interests.map(interest => {
                return (
                  <Picker.Item
                    label={`${interest.name}`}
                    value={`${interest.name}`}
                    key={interest.id}
                  />
                );
              })}
            </Picker>
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
              onChangeText={e => activityChangeHandler(e, "location")}
            ></TextInput>

            <Text style={styles.addText}>Don't Forget A Note!</Text>
            <TextInput
              style={[Global.input, { height: 77 }, styles.addInput]}
              multiline={true} // moves placeholder text to top for iOS
              textAlignVertical={"top"} // for Android
              placeholder="This lets people know what to look out for!"
              onChangeText={e => activityChangeHandler(e, "notes")}
            ></TextInput>
            <View style={styles.addBtn}>
              <TouchableOpacity onPress={saveActivity}>
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

const mapStateToProps = state => {
  return {
    ...state,
    interests: state.interests,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(AddActivity);
