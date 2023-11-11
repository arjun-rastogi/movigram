import { View, ScrollView, Dimensions } from "react-native";
import React from "react";
import CategoryHeader from "./CategoryHeader";
import MovieCard from "./MovieCard";
import { Movie } from "../types/MovieType";
import { baseImagePath } from "../services/movieService";
import CastCard from "./CastCard ";

const { width } = Dimensions.get("window");

const CastCarousel = (props: any) => {
  return (
    <>
      <CategoryHeader title={props.title} />
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 5,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {props.movieCastData?.map((item: any, index: number) => (
          <CastCard
            shouldMarginatedAtEnd={true}
            cardWidth={80}
            isFirst={index == 0 ? true : false}
            isLast={index == props.movieCastData?.length - 1 ? true : false}
            imagePath={baseImagePath("w185", item.profile_path)}
            title={item.original_name}
            subtitle={item.character}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default CastCarousel;
