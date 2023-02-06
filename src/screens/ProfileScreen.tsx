import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {  View, SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Text  } from 'react-native-elements';
import { useAuthentication } from './../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';

type Props = {}

const ProfileScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {


    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    
    console.log("user type", typeof user);
    
    const imageUrl: string | null | undefined = user?.photoURL;
    
    const [data, setData] = useState<null | any>(null);
    const { user } = useAuthentication();
    const getUser = (user: Object) => {
        console.log("user", user);
      
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then(docSnap => {
          if (docSnap.exists) {
            setData(docSnap.data());
          } else {
            console.log("No User Found");
          }
        });
      };

    useEffect(() => {
        getUser(user);
        const focusListener = navigation.addListener("focus", () => setLoading(!loading));
        return () => focusListener.remove();
      }, [user, loading]);

    

    
  return (
    <>
    <SafeAreaView className='flex-1'>
    <View className='px-8 mb-6'>
        <View className='flex-row mt-4'>
         <Avatar rounded source={{ uri: imageUrl ?? ""}} size={80} />
         <View className='ml-5'>
            <Text h4>{data.fullName}</Text>
            <Text className='font-medium'>{data.email}</Text>
         </View>
        </View>
    </View>
    </SafeAreaView>

      {/* <Button title="Sign Out" className='mt-3' onPress={() => signOut(auth)} /> */}
    </>
  )
}

export default ProfileScreen