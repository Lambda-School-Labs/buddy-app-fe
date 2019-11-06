import React from "react";
import { ActivityIndicator, AsyncStorage, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Feather } from "@expo/vector-icons";

// components
import Landing from "./Landing";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import InterestOnboard from "./InterestsOnboard";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("@token");
    // Fetch token from storage
    if (!userToken) {
      await AsyncStorage.clear();
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const AppStack = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor, focused }) => (
          <Feather name="home" size={focused ? 35 : 30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor, focused }) => (
          <Feather name="user" size={focused ? 35 : 30} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Dashboard",
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: "#FFF",
      activeBackgroundColor: "#9798ff",
      inactiveTintColor: "#B0B0B0",
      inactiveBackgroundColor: "#6D6DFF",
      tabStyle: {
        borderRadius: 100 / 2,
        marginHorizontal: "16%",
        marginVertical: 10
      },
      style: {
        height: 96,
        backgroundColor: "#6D6DFF"
      }
    }
  }
);

const AuthenticationStack = createStackNavigator({
  Landing: Landing,
  SignUp: SignUp,
  SignIn: SignIn,
  InterestOnboard: InterestOnboard
});

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthenticationStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(AppNavigator);
