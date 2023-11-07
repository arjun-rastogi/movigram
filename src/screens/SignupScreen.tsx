import React, { useLayoutEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface Props {
  handleLogin: (email: string, password: string) => void;
}

const auth = getAuth();
WebBrowser.maybeCompleteAuthSession();

const SignupScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const signUp = async () => {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Sign In");
    } catch (err) {
      setValue({
        ...value,
        error: "Email Already in Use",
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-lg">Signup screen!</Text>
      {!!value.error && (
        <View className="text-white bg-red-500 p-3 mt-3">
          <Text>{value.error}</Text>
        </View>
      )}

      <Input
        placeholder="Email"
        label="Email"
        className="ml-2 "
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        keyboardType="email-address"
        leftIcon={<Icon name="envelope" size={16} />}
      />

      <Input
        placeholder="Password"
        className="ml-2 "
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
        leftIcon={<Icon name="key" size={16} />}
      />

      <Button title="Signup" className="flex-1" onPress={signUp} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text style={{ color: "blue" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
