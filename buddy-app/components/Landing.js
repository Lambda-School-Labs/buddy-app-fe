import React from 'react';
import { Alert, Text, View, Button } from 'react-native';

export default function Landing() {

  return (
    <View>
    <View><Text>A friendly network to help you discover the world around.</Text></View>
      
      <View>
      <Button title="Sign In" onPress={() => Alert.alert('Sign In pressed!')}/>
      <Button title="Sign Up" onPress={() => Alert.alert('Sign Up pressed!')}/>
      </View>
    </View>
  );
}