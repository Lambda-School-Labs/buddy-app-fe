'use strict';

import React from 'react'; 
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'; 
import * as Font from 'expo-font';
import ValidationComponent from 'react-native-form-validator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SignUp extends ValidationComponent {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        location: '', 
    }

    handleChange = (text, eventName) => {
        this.setState({...this.state, [eventName]: text})
        // console.log(this.state)
    }

    handleSubmit = () => {
        // axios call 

        console.log("Hiya There!")

        // axios
        //     .post("https://buddy-app-be.herokuapp.com/auth/signup", this.state)
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    _onSubmit = () => {
        this.validate({
            first_name: {
                required: true, 
            },
            last_name: {
                required: true, 
            }, 
            email: {
                email: true, 
                required: true,
            }, 
            password: {
                required: true,
            }, 
            location: {
                required: true, 
            }
        })
    }

    render() {
        return (
        <KeyboardAwareScrollView
            enableOnAndroid
            contentContainerStyle={{ flex: 1 }}>
            <View style={su_styles.container}>
            <View style={su_styles.logoContainer}>
                <Text style={su_styles.logo}>BUDDY</Text>
            </View>

            <Text style={su_styles.signUp}>Sign Up</Text>

            <View style={su_styles.form} onKeyPress={() => this._onSubmit()}>
                <View style={su_styles.name}>
                    <TextInput
                        placeholder="First Name"
                        onChangeText={text => this.handleChange(text, 'first_name')}
                        style={su_styles.first}
                        value={this.state.first_name}
                        ref='first_name'
                    />
    
                    <TextInput
                        placeholder="Last Name"
                        onChangeText={text => this.handleChange(text, 'last_name')}
                        style={su_styles.last}
                        value={this.state.last_name}
                    />
                </View>
                {this.isFieldInError('first_name') && this.getErrorsInField('first_name').map(errorMessage => 
                    <Text style={su_styles.error} key={errorMessage}>{errorMessage}</Text>)}   
                {this.isFieldInError('last_name') && this.getErrorsInField('last_name').map(errorMessage => 
                    <Text style={su_styles.error} key={errorMessage}>{errorMessage}</Text> )}

                <TextInput
                    placeholder="Email"
                    onChangeText={text => this.handleChange(text, 'email')}
                    style={su_styles.input}
                    autoCapitalize="none"
                    value={this.state.email}
                />
                {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => 
                <Text style={su_styles.error} key={errorMessage}>{errorMessage}</Text>) }
 
                <TextInput
                    placeholder="Password"
                    onChangeText={text => this.handleChange(text, 'password')}
                    style={su_styles.input}
                    autoCapitalize="none"
                    value={this.state.password}
                />
                {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => 
                <Text style={su_styles.error} key={errorMessage}>{errorMessage}</Text>) }
 
                <TextInput
                    placeholder="Location"
                    onChangeText={text => this.handleChange(text, 'location')}
                    style={su_styles.input}
                    value={this.state.location}
                />
                {this.isFieldInError('location') && this.getErrorsInField('location').map(errorMessage => 
                <Text style={su_styles.error} key={errorMessage}>{errorMessage}</Text>) }
 
            </View>

            {/* <Text>
            {this.getErrorMessages()}
            </Text> */}

            <View style={su_styles.buttons}>
                <Button
                    onPress={() => this.props.navigation.navigate('Landing')}
                    title="Cancel"
                    color="black"
                    fontFamily="Nunito-Light"
                />
                <View style={su_styles.suButton}>
                    <TouchableHighlight>
                        <Button 
                            title="Sign Up" 
                            color="white" 
                            fontFamily="Nunito-Light" 
                            onPress={this.handleSubmit} 
                        />
                    </TouchableHighlight>
                </View>
            </View>
            </View>
        </KeyboardAwareScrollView>
        );
    }
}

const su_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    height: 300,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  input: {
    borderColor: '#d6d7da',
    borderWidth: 1.2,
    width: 350,
    height: 45,
    paddingLeft: 10,
  },
  logoContainer: {
    marginBottom: 65,
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  logo: {
    fontSize: 45,
    fontWeight: 'bold',
    fontFamily: 'Nunito-Black',
  },
  signUp: {
    fontSize: 35,
    paddingTop: 10,
    paddingBottom: 20,
    marginLeft: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Nunito-Regular',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 15,
  },
  suButton: {
    backgroundColor: '#6D6DFF',
    color: '#FFFFFF',
    height: 45,
    width: 130,
    fontSize: 20,
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  first: {
    width: 167,
    height: 45,
    borderColor: '#d6d7da',
    borderWidth: 1.2,
    paddingLeft: 10,
  },
  last: {
    width: 167,
    height: 45,
    borderColor: '#d6d7da',
    borderWidth: 1.2,
    textAlign: 'left',
    paddingLeft: 10,
  },
  error: {
    color: 'red',
  }
});
