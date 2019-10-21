import React from 'react';
import { Alert, Text, View, Button } from 'react-native';

export default function Landing(props) {
  return (
    <View>
      <View>
        <Text>A friendly network to help you discover the world around.</Text>
      </View>

      <View>
        <Button
          title="Sign In"
          onPress={() => props.navigation.navigate('SignIn')}
        />
        <Button
          title="Sign Up"
          onPress={() => props.navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
}
