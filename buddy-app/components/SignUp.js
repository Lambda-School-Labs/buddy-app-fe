import React, { useState } from 'react'; 
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'; 


const SignUp = () => {

    const [info, setInfo] = useState(null); 

    const handleChange = (event) => {
        console.log("info", info)
        return setInfo({...info, ...event})
    }


    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        // axios PUT 
    }

    return (
        <View style={su_styles.container}>

            <View style={su_styles.logoContainer}>
                <Text style={su_styles.logo}>BUDDY</Text>
            </View>

            <Text style={su_styles.signUp}>Sign Up</Text>

            <View style={su_styles.form}>
                <View style={su_styles.name}>
                    <TextInput
                        placeholder="First Name"
                        onChangeText={(text) => handleChange({first_name: text})}
                        style={su_styles.first}
                    />
                    <TextInput
                        placeholder="Last Name"
                        onChangeText={(text) => handleChange({last_name: text})}
                        style={su_styles.last}
                    />
                </View>

                <TextInput
                    placeholder="Email"
                    onChangeText={(text) => handleChange({email: text})}
                    style={su_styles.input}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(text) => handleChange({password: text})}
                    style={su_styles.input}
                />
                <TextInput
                    placeholder="Confirm Password"
                    onChangeText={(text) => handleChange({confirm_password: text})}
                    style={su_styles.input}
                />
            </View>

            <View style={su_styles.buttons}>
                <Button
                    title='Cancel'
                    color='black'/>
                <View style={su_styles.suButton}>
                    <Button
                        title='Sign Up'
                        color='white'
                    />
                </View>
            </View>
        </View>
    )
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
        borderRadius: 4, 
        borderWidth: 5,
        borderBottomColor: 'black', 
        borderLeftColor: 'transparent', 
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        alignSelf: 'flex-start',
    },
    logo: {
        fontSize: 45,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    }, 
    signUp: {
        fontSize: 35, 
        paddingTop: 10, 
        paddingBottom: 20, 
        textAlign: 'left',
        alignSelf: 'flex-start'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350,
        marginTop: 15
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
        justifyContent: 'space-between'
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
    }
});

export default SignUp; 