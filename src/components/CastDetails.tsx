import { View, Text } from "react-native";
import React from "react";
import CastCarousel from "../common/CastCarousel";

type Props = {
  movieCastData: any;
};

const CastDetails = ({ movieCastData }: Props) => {
  return (
    <View className="mt-3">
      <CastCarousel title="Top Cast" movieCastData={movieCastData} />
    </View>
  );
};

export default CastDetails;
