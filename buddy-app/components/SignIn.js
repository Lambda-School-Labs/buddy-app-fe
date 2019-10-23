import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToken, addUser, isLoadingPage } from '../actions/buddyActions';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { storeToken } from '../authHelper';
import ValidationComponent from 'react-native-form-validator';

//styles
import Buttons from '../styles/Buttons';
import Global from '../styles/Global';

class SignIn extends ValidationComponent {
  state = {
    email: '',
    password: '',
  };

  changeHandler = (value, name) => {
    this.setState({ ...this.state, [name]: value });
  };

  cancelSignInHandler = () => {
    this.setState({ email: '', password: '' });
    this.props.navigation.navigate('Landing');
  };

  signInHandler = () => {
    if (!this.state.email || !this.state.password) {
      return;
    }
    this.props.isLoadingPage(true);

    axios
      .post('https://buddy-app-be.herokuapp.com/auth/signin', this.state)
      .then(res => {
        storeToken(res.data.token);
        this.props.addUser({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          id: res.data.id,
        });
        this.props.navigation.navigate('AuthStack');
      })
      .catch(err => {
        console.log(err.message);
      });
    // Validation
    // Performs a HTTP request to the backend
    // Returns...?
  };

  render() {
    if (!this.props.isLoading && this.props.user.id === '') {
      return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={Global.container}>
            <View style={Global.logoContainer}>
              <Text style={Global.logo}>BUDDY</Text>
            </View>
            <Text style={Global.title}>Sign In</Text>
            <View style={Global.formContainer}>
              <TextInput
                style={Global.input}
                placeholder="Email"
                onChangeText={e => this.changeHandler(e, 'email')}
                value={this.state.email}
                autoCapitalize="none"
              />
              <TextInput
                style={Global.input}
                placeholder="Password"
                onChangeText={e => this.changeHandler(e, 'password')}
                value={this.state.password}
                autoCapitalize="none"
                secureTextEntry
              />
              <View style={styles.fakeLinkContainer}>
                <Text
                  style={styles.fakeLink}
                  onPress={() => {
                    this.props.navigation.navigate('SignUp');
                  }}>
                  Don't have an account yet? Sign Up
                </Text>
              </View>
              <View style={Buttons.container}>
                <TouchableOpacity onPress={this.cancelSignInHandler}>
                  <Text style={[Buttons.text, Buttons.textAuth]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.signInHandler}
                  style={[Buttons.btn, Buttons.secondary, { width: 130 }]}>
                  <Text style={[Buttons.text, Buttons.textAuth]}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomNav}></View>
          </View>
        </KeyboardAwareScrollView>
      );
    } else {
      return (
        <Spinner visible={this.props.isLoading} textContent={'Loading....'} />
      );
    }
  }
}

// const SignIn = props => {
//   const [info, setInfo] = useState({ email: "", password: "" });
//   const changeHandler = (value, name) => {
//     setInfo({ ...info, [name]: value });
//   };

//   const cancelSignInHandler = () => {
//     setInfo({ email: "", password: "" });
//     props.navigation.navigate("Landing");
//   };

//   const signInHandler = () => {
//     if (!info.email || !info.password) {
//       return;
//     }
//     props.isLoadingPage(true);

//     axios
//       .post("https://buddy-app-be.herokuapp.com/auth/signin", info)
//       .then(res => {
//         storeToken(res.data.token);
//         props.addUser({
//           first_name: res.data.first_name,
//           last_name: res.data.last_name,
//           id: res.data.id
//         });
//         props.navigation.navigate("AuthStack");
//       })
//       .catch(err => {
//         console.log(err.message);
//       });
//     // Validation
//     // Performs a HTTP request to the backend
//     // Returns...?
//   };

//   if (!props.isLoading && props.user.id === "") {
//     return (
//       <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
//         <View style={Global.container}>
//           <View style={Global.logoContainer}>
//             <Text style={Global.logo}>BUDDY</Text>
//           </View>
//           <Text style={Global.title}>Sign In</Text>
//           <View style={Global.formContainer}>
//             <TextInput
//               style={Global.input}
//               placeholder="Email"
//               onChangeText={e => changeHandler(e, "email")}
//               value={info.email}
//               autoCapitalize="none"
//             />
//             <TextInput
//               style={Global.input}
//               placeholder="Password"
//               onChangeText={e => changeHandler(e, "password")}
//               value={info.password}
//               autoCapitalize="none"
//               secureTextEntry
//             />
//             <View style={styles.fakeLinkContainer}>
//               <Text
//                 style={styles.fakeLink}
//                 onPress={() => {
//                   props.navigation.navigate("SignUp");
//                 }}
//               >
//                 Don't have an account yet? Sign Up
//               </Text>
//             </View>
//             <View style={Buttons.container}>
//               <TouchableOpacity onPress={cancelSignInHandler}>
//                 <Text style={[Buttons.text, Buttons.textAuth]}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={signInHandler}
//                 style={[Buttons.btn, Buttons.secondary, { width: 130 }]}
//               >
//                 <Text style={[Buttons.text, Buttons.textAuth]}>Sign In</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.bottomNav}></View>
//         </View>
//       </KeyboardAwareScrollView>
//     );
//   } else {
//     return <Spinner visible={props.isLoading} textContent={"Loading...."} />;
//   }
// };

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: '#6d6dff',
    height: 96,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fakeLink: {
    color: '#6D6DFF',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontFamily: 'Nunito-Light',
  },
  fakeLinkContainer: {
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {
    ...state,
    token: state.token,
    isLoading: state.isLoading,
  };
};

export default connect(
  mapStateToProps,
  { addToken, addUser, isLoadingPage },
)(SignIn);
