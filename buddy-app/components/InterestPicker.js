import React, { useState, useEffect } from "react";
import { View, StyleSheet, Picker, Platform } from "react-native";
import SelectInput from "react-native-select-input-ios";

function InterestPicker(props) {
  const updateActivityInterest = value => {
    props.setActivityInterest({ name: value });
  };

  const options = props.interests.map(interest => {
    return { value: interest.name, label: `${interest.name}` };
  });

  //   console.log("Options", options);

  return (
    <View>
      {Platform.OS !== "ios" ? (
        // android selector for interest category
        <Picker
          selectedValue={props.activityInterest.name}
          onValueChange={itemValue => {
            updateActivityInterest(itemValue);
            //   console.log(activityInterest, "ai");
            //   console.log(itemValue);
          }}
          style={styles.androidPicker}
        >
          {props.interests.map(interest => {
            return (
              <Picker.Item
                label={`${interest.name}`}
                value={`${interest.name}`}
                key={interest.id}
              />
            );
          })}
        </Picker>
      ) : (
        // iOS selector for interest category
        <SelectInput
          value={`${props.activityInterest}`}
          options={options}
          onValueChange={selected => {
            console.log(selected);
            props.setActivityInterest(selected);
          }}
          style={styles.iosPicker}
          labelStyle={{ fontSize: 15 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  androidPicker: {
    height: 50,
    width: "75%"
  },
  iosPicker: {
    height: 40,
    paddingTop: 10,
    marginTop: 10
  }
});

export default InterestPicker;
