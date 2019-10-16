import React, { useState } from 'react'; 
import { Text, TextInput, View } from 'react-native'; 

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
        <View>
            <Text>Buddy</Text>
            <TextInput
                placeholder="Full Name"
                onChangeText={(text) => handleChange({full_name: text})}
            />
            <TextInput
                placeholder="Email"
                onChangeText={(text) => handleChange({email: text})}
            />
            <TextInput
                placeholder="Password"
                onChangeText={(text) => handleChange({password: text})}
            />
            <TextInput
                placeholder="Confirm Password"
                onChangeText={(text) => handleChange({confirm_password: text})}
            />
        </View>
    )
}

export default SignUp; 