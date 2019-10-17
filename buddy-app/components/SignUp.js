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
            <Text style={su_styles.logo}>BUDDY</Text>
            <Text style={su_styles.signUp}>Sign Up</Text>

            <View style={su_styles.form}>
                <TextInput
                    placeholder="Full Name"
                    onChangeText={(text) => handleChange({full_name: text})}
                    style={su_styles.input}
                />
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
    logo: {
        fontSize: 45,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textDecorationLine: 'underline',
        alignSelf: 'flex-start',
        paddingBottom: 30,
        marginBottom: 25
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
    }
});

export default SignUp; 