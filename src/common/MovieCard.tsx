import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, SPACING, BORDERRADIUS, FONTSIZE } from "./constant";

interface MovieCardProps {
  cardFunction: () => void;
  shoudlMarginatedAtEnd?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  shouldMarginatedAround?: boolean;
  cardWidth: number;
  imagePath: string;
  vote_average: number;
  vote_count: number;
  title: string;
  genre: any[];
}

const MovieCard: React.FC<MovieCardProps> = (props) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shoudlMarginatedAtEnd
            ? props.isFirst
              ? { marginLeft: SPACING.space_36 }
              : props.isLast
              ? { marginRight: 0 } // No margin for the last item
              : { marginRight: SPACING.space_36 }
            : {},
          props.shouldMarginatedAround ? { margin: SPACING.space_12 } : {},
          { maxWidth: props.cardWidth },
        ]}
      >
        <Image
          style={[styles.cardImage, { width: props.cardWidth }]}
          source={{ uri: props.imagePath }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.textTitle} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.space_10,
  },
  textTitle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: "left",
  },
});
export default MovieCard;
