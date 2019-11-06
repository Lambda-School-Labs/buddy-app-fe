import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

//icons
import bell from "../assets/icons/bell.png";
import home from "../assets/icons/home.png";
import profile from "../assets/icons/profile.png";

//styles
import Global from "../styles/Global";

export const NavBar = () => {
  return (
    <View style={Global.bottomNav}>
      <TouchableOpacity onPress={() => props.naviation.navigate("Dashboard")}>
        <Image source={home} />
      </TouchableOpacity>

      {/*       Will reinstate once functionality is ready
      <TouchableOpacity>
      <Image source={bell} />
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
        <Image source={profile} />
      </TouchableOpacity>
    </View>
  );
};
