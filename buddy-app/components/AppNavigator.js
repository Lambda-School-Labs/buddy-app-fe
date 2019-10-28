import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// components
import Landing from "./Landing";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import AuthStack from "./AuthStack";
import InterestOnboard from "./InterestsOnboard";
import Dashboard from "./Dashboard";
const AppNavigator = createStackNavigator(
  {
    Landing: {
      screen: Landing
    },
    SignUp: {
      screen: SignUp
    },
    SignIn: {
      screen: SignIn
    },
    AuthStack: {
      screen: AuthStack
    },
    InterestOnboard: {
      screen: InterestOnboard
    },
    Dashboard: {
      screen: Dashboard
    }
  },
  {
    initialRouteName: "Landing",
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
