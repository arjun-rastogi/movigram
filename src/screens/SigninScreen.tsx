import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, SocialIcon } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/FontAwesome';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';

import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';

interface Props {
  handleLogin: (email: string, password: string) => void;
}

const auth = getAuth();
WebBrowser.maybeCompleteAuthSession();

const SigninScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })
 async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      
      setValue({
        ...value,
      })
    }
  }


  const [reqGoogle, resGoogle, googlelogin] = Google.useIdTokenAuthRequest(
    {
      clientId: "926984366249-jp61kk42fpvjqdioi5o41thd74n64ej8.apps.googleusercontent.com",
      iosClientId: "926984366249-b4cc95kqg1cqqjm32ufja4c6rppnroce.apps.googleusercontent.com",
      androidClientId: "926984366249-ik4vekooe5cv8e2iihb4hu5fasmaei0r.apps.googleusercontent.com",
    },
  );


  const [reqFb, resFb, fblogin] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '508108111436122',
    androidClientId: "508108111436122",
    iosClientId: "508108111436122",
  });


  React.useEffect(() => {
    if (resGoogle?.type === 'success') {
      const { id_token } = resGoogle.params;
      const { accessToken } = resGoogle.params;
      
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token, accessToken);
      signInWithCredential(auth, credential)
      .then()
      .catch(err => console.log(err));
      }
  }, [resGoogle]);

  React.useEffect(() => {
    if (resFb?.type === 'success') {
      const { access_token } = resFb.params;
      const auth = getAuth();
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential).then().catch(err => console.log(err));
    }
  }, [resFb]);


  return (
    <View className='flex-1 justify-center items-center p-5'>
      <Text className='text-lg'>Signin screen!</Text>
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

        <Button title="Signin" className='flex-1' onPress={signIn} />
        <SocialIcon
         onPress={() => {
          googlelogin();
        }}
         disabled={!reqGoogle}
         title='Sign in with google'
         button
         style={{padding: 20}} 
         type='google'
         />
 
        <SocialIcon
         onPress={() => {
          fblogin();
        }}
        disabled={!reqFb}
         title='Sign up with facebbok'
         button
         style={{padding: 20}} 
         type='facebook'
         />

    </View>
  );
};

export default SigninScreen;