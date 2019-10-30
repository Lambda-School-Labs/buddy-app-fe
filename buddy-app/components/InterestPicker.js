import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Picker, Platform } from "react-native";
import SelectInput from "react-native-select-input-ios";

function InterestPicker(props) {
  const [interests, setInterests] = useState([...props.interests]);
  const [activityInterest, setActivityInterest] = useState({ name: "" });
  const [selectedInterest, setSelectedInterest] = useState(interests[0].name);

  const updateActivityInterest = value => {
    setActivityInterest({ name: value });
  };

  const options = interests.map(interest => {
    return { value: interest.name, label: `${interest.name}` };
  });

  console.log("Options", options);

  return (
    <View>
      {Platform.OS === "android" ? (
        <Picker
          selectedValue={activityInterest.name}
          onValueChange={itemValue => {
            updateActivityInterest(itemValue);
            //   console.log(activityInterest, "ai");
            //   console.log(itemValue);
          }}
          style={styles.picker}
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
      ) : (
        <View>
          <SelectInput
            value={`${selectedInterest}`}
            options={options}
            onValueChange={selected => {
              console.log(selected);
              setSelectedInterest(selected);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: Platform.OS === "ios" ? 190 : 50,
    width: Platform.OS === "ios" ? "100%" : "75%"
    // borderWidth: 1
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    interests: state.interests
  };
};

export default connect(
  mapStateToProps,
  {}
)(InterestPicker);
