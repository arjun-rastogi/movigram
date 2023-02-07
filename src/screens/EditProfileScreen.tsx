import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { useAuthentication } from './../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';

export default function EditProfileScreen() {
  const { user } = useAuthentication();
  const auth = getAuth();

  
  return (
    <View className='flex-1 bg-white items-center justify-center'>
        <Text>Edit Profile</Text>
    </View>
  );
}

