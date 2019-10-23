import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
const Dashboard = props => {
  return (
    <View>
      <Text>
        Welcome {props.user.first_name} {props.user.last_name}!
      </Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
