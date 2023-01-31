import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View className='flex-1 bg-white justify-center items-center pt-5'>
      <Text>Welcome screen!</Text>

      <View className='flex-1'>
        <Button title="Sign in" className='mt-5' onPress={() => navigation.navigate('Sign In')} />
        <Button title="Sign up" type="outline" className='mt-5' onPress={() => navigation.navigate('Sign Up')} />
      </View>
    </View>
  );
}


export default WelcomeScreen;