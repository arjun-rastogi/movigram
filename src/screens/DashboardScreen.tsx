import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { useAuthentication } from './../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';

export default function DashboardScreen() {
  const { user } = useAuthentication();
  const auth = getAuth();
  return (
    <View className='flex-1 bg-white items-center justify-center'>
        <Text>Welcome {user?.email}!</Text>
      <Button title="Sign Out" className='mt-3' onPress={() => signOut(auth)} />
    </View>
  );
}

