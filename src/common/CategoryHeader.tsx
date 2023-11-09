import { View, Text } from "react-native";
import React from "react";

type Props = {
  title: string;
};

const CategoryHeader = (props: Props) => {
  return (
    <Text className="font-bold text-white text-xl mx-4">{props.title}</Text>
  );
};

export default CategoryHeader;
