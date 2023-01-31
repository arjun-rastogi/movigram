import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, SocialIcon } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/FontAwesome';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

interface Props {
  handleLogin: (email: string, password: string) => void;
}

const auth = getAuth();
WebBrowser.maybeCompleteAuthSession();

const SignupScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  const signUp = async() => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      console.log("error", error);
      
      setValue({
        ...value,
      
      })
    }
  }

  WebBrowser.maybeCompleteAuthSession();
  



  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: "623008088372-d0i3m24okls4230hjcn3e736i6gg2afi.apps.googleusercontent.com",
      iosClientId: "623008088372-fu2ef0vdbplv0bsfjoeb47ioe6ls9cnc.apps.googleusercontent.com",
      androidClientId: "623008088372-3caesrka705uekrgakjs9kftmk9bcj9s.apps.googleusercontent.com",
    },
  );

  
  

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const { accessToken } = response.params;
      
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token, accessToken);
      signInWithCredential(auth, credential)
      .then(res =>  navigation.navigate('Sign In', res))
      .catch(err => console.log(err));
      }
  }, [response]);


  return (
    <View className='flex-1 justify-center items-center p-5'>
      <Text className='text-lg'>Signup screen!</Text>
      {!!value.error && <View className='text-white bg-red-500 p-3 mt-3'><Text>{value.error}</Text></View>}

      <Input
        placeholder='Email'
        className='ml-2 '
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        keyboardType="email-address"
        leftIcon={<Icon
          name='envelope'
          size={16}
        />}
      />

      <Input
        placeholder='Password'
        className='ml-2 '
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
        leftIcon={<Icon
          name='key'
          size={16}
        />}
      />

        <Button title="Signup" className='flex-1' onPress={signUp} />

        <SocialIcon
         onPress={() => {
          promptAsync();
        }}
        disabled={!request}
         title='Sign up with google'
         button
         style={{padding: 20}} 
         type='google'
         />
    </View>
  );
};

export default SignupScreen;