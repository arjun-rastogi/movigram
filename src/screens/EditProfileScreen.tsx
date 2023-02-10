import React, {useState, useEffect, useRef} from 'react';
import { View, SafeAreaView, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Icon,  Text  } from 'react-native-elements';
import { useAuthentication } from './../utils/hooks/useAuthentication';
import { StackScreenProps } from '@react-navigation/stack';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from '../config/firebase';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { ref,  uploadBytes, getDownloadURL } from "firebase/storage";

type Props = {}


const EditProfileScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    
    const [data, setData] = useState<null | any>(null);
    const [image, setImage] = useState<null | any>(null);

    const { user } = useAuthentication();
    const bs = useRef<BottomSheet>(null);
    const fall = new Animated.Value(1);
    
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

    const handleUpdate = async() => {
      let photoURL : string = '';

      if (image) {
        await uploadImage(image).then(url => {
          if (url) {
            photoURL = url;
          }
          else photoURL = data.photoURL;
        });
      }

    const document = doc(db, "users" ,`${user?.uid}`);
    getDoc(document).then(docSnap => {
      if(docSnap.exists()) {
        updateDoc(doc(db, 'users', `${user?.uid}`), {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          photoURL:  photoURL,
        })
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.'
        );
      } else {
        Alert.alert(
          'There is an issue in updating your profile!',
        );
      }
    });

    }

async function uploadImage(image : string)  {
  const uploadUri = image;
  let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const storageRef  = ref(storage, 'images/' + filename);
  const response = await fetch(image);
  const blob = await response.blob();

  return uploadBytes(storageRef, blob)
    .then(() => {
      return getDownloadURL(storageRef)
    })
    .then(url => {
      setImage(url)
      return url;
    })
    .catch((error) => {
      console.log(`Upload failed: ${error}`);
      return null;
    });
};

    useEffect(() => {
      if(user) getUser();
      navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading, user]);


    const takePhotoFromCamera = async() => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
 
      if (!result.canceled) {
        console.log("result camnera", result);
        setImage(result.assets[0].uri);
      }
    };
  
    const choosePhotoFromLibrary = async() => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      if (status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        
        if (!result.canceled) {
          console.log("result gallery", result);
          setImage(result.assets[0].uri);
        }
      }
    };

    const renderInner = () => (
      <View className='p-5 bg-white pt-5'>
        <View className='items-center'>
        <Text className='text-2xl'>Upload Photo</Text>
          <Text className='text-sm text-gray-700 h-8 mb-3'>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity className='p-3 rounded-xl bg-rose-700 items-center my-2' onPress={takePhotoFromCamera}>
          <Text className='p-3 font-bold text-white'>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity className='p-3 rounded-xl bg-rose-700 items-center my-2' onPress={choosePhotoFromLibrary}>
          <Text className='p-3 font-bold text-white'>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='p-3 rounded-xl bg-rose-700 items-center my-2'
          onPress={(event) => { if (bs.current) { bs.current.snapTo(1);} }}
          >
          <Text className='p-3 font-bold text-white'>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  
    const renderHeader = () => (
      <View className='bg-white shadow-gray-500 pt-5 rounded-tl-3xl rounded-tr-3xl'>
        <View className='items-center'>
          <View className='w-10 h-2 rounded-md bg-black mb-3' />
        </View>
      </View>
    );


    return (
    <>
    <SafeAreaView className='flex-1 bg-white'>


    <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
     />

     <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
    
    <View className='items-center'>
      <TouchableOpacity 
      onPress={(event) => {
        if (bs.current) {
          bs.current.snapTo(0);
        }
      }}
      >
        <View className='h-24 w-24 rounded-2xl justify-center items-center'>
        <ImageBackground
                source={{
                  uri: image
                    ? image
                    : data
                    ? data.photoURL ||
                      'data:image/png;base64,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'
                    : 'data:image/png;base64,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',
                }}
                className="h-24 w-24 rounded-2xl"
                >

                <View className='flex-1 justify-center items-center'>
                  <Icon
                    name="camera"
                    size={35}
                    color="#777777"
                    className='opacity-70 items-center justify-center border-black rounded-2xl'
                  />
                </View>

         </ImageBackground>
        </View>
      </TouchableOpacity>
      <Text h4>{data ? data.fullName || 'Test' : 'Test'}</Text>
    </View>


      <View className='px-8'>
      <View className='flex-row mb-5'>
        <Icon name='user-o' type='font-awesome' color="#777777" size={20} className="pt-1" />
        <TextInput 
         placeholder="Full Name"
         placeholderTextColor="#666666"
         value={data ? data.fullName : ''}
         onChangeText={(txt) => setData({...data, fullName: txt})}
         autoCorrect={false}
         className="text-xl text-gray-800 ml-5"
         />

      </View>
      </View>

      <View className='px-8'>
      <View className='flex-row mb-5'>
        <Icon name='phone' type='font-awesome' color="#777777" size={20} className="pt-1" />
        <TextInput 
         placeholder="Phone Number"
         keyboardType="number-pad"
         value={data ? data.phoneNumber : ''}
         onChangeText={(txt) => setData({...data, phoneNumber: txt})}
         placeholderTextColor="#666666"
         autoCorrect={false}
         className="text-xl text-gray-800 ml-5"
         />

      </View>
      </View>


      <TouchableOpacity className='p-2 rounded-xl bg-cyan-800 items-center mt-3'  onPress={handleUpdate}>
          <Text className='text-white' h4>Submit</Text>
      </TouchableOpacity>
      </Animated.View>

    </SafeAreaView>

    </>
  )
}

export default EditProfileScreen