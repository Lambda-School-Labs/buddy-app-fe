import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//styles
import Buttons from '../styles/Buttons'
import Global from '../styles/Global'

export default class SignUp extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    location: '',
  };

  handleChange = (text, eventName) => {
    this.setState({ ...this.state, [eventName]: text });
    console.log(this.state);
  };

  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{ flex: 1 }}>
        <View style={Global.container}>
          <View style={Global.logoContainer}>
            <Text style={Global.logo}>BUDDY</Text>
          </View>

          <Text style={Global.title}>Sign Up</Text>

          <View style={Global.formContainer}>
            <View style={su_styles.name}>
              <TextInput
                placeholder="First Name"
                onChangeText={text => this.handleChange(text, 'first_name')}
                style={[Global.input,{ width: '45%'}]}
              />
              <TextInput
                placeholder="Last Name"
                onChangeText={text => this.handleChange(text, 'last_name')}
                style={[Global.input,{ width: '45%'}]}
              />
            </View>

            <TextInput
              placeholder="Email"
              onChangeText={text => this.handleChange(text, 'email')}
              style={Global.input}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              onChangeText={text => this.handleChange(text, 'password')}
              style={Global.input}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Location"
              onChangeText={text => this.handleChange(text, 'location')}
              style={Global.input}
            />
          </View>

          <View style={Buttons.container}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Landing')}>
              <Text style={[Buttons.text,Buttons.textAuth]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Buttons.btn,Buttons.primary,{ width: 130 }]}
            >
              <Text style={[Buttons.text,Buttons.textAuth,Buttons.textPrimary]}>Sign Up</Text>
            </TouchableOpacity>         
          </View>
          <View style={su_styles.bottomNav}></View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const su_styles = StyleSheet.create({
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomNav: {
    backgroundColor: "#6d6dff",
    height: 96,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});
