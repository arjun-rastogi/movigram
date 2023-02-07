import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {  View, SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Icon,  Text  } from 'react-native-elements';
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
    
    
    
    // const imageUrl: string | null | undefined = user?.photoURL;
    
    const [data, setData] = useState<null | any>(null);
    const { user } = useAuthentication();

    
    const getUser = async() => {
      const document = doc(db, "users" ,`${user?.uid}`);
      await getDoc(document).then(docSnap => {
        if (docSnap.exists()) {
          
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      });    
    }


    
    useEffect(() => {
      getUser();
      navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);


    console.log("user data", data);
    

    
  return (
    <>
    <SafeAreaView className='flex-1'>
    
    <View className='px-8 mb-6'>
        <View className='flex-row mt-4'>
        <Avatar rounded source={{ uri: data ? data.photoURL || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' }} size={80} />

         <View className='ml-5 '>
            <Text h4>My Account</Text>
            <Text h4>{data ? data.fullName || 'Test' : 'Test'}</Text>
            <Text className='font-medium'>{data ? data.email || "No details added" : ""}</Text>
         </View>
        </View>
    </View>

    <View className='px-8 mb-6'>
      <View className='flex-row mb-5'>
        <Icon name='phone' type='font-awesome' color="#777777" size={20} />
        <Text style={{color:"#777777", marginLeft: 20}}>{data ? data.phoneNumber || "No details added" : ""}</Text>
      </View>
      <View className='flex-row mb-5'>
        <Icon name='envelope' type='font-awesome' color="#777777" size={20} />
        <Text style={{color:"#777777", marginLeft: 20}}>{data ? data.email || "No details added" : ""}</Text>
      </View>
    </View>



    </SafeAreaView>

      {/* <Button title="Sign Out" className='mt-3' onPress={() => signOut(auth)} /> */}
    </>
  )
}

export default ProfileScreen