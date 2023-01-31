import React, {ForwardRefRenderFunction, InputHTMLAttributes} from 'react'
import { View, Text, TextInput } from 'react-native';


interface Props {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry : boolean;
    label: string;
  }
  
  const Input = ({ placeholder = "Enter value here", value, onChangeText, ...props }: Props) => {
    
    return (
    <>
        <Text className='text-black'>{props.label}</Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          className='text-black'
          onChangeText={onChangeText}
          {...props}
        />
      </>
    );
  };
export default Input