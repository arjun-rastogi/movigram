import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  COLORS,
  SPACING,
  BORDERRADIUS,
  FONTSIZE,
  FONTFAMILY,
} from "./constant"; // Import your constants

interface FeaturedNowPlayingProps {
  cardFunction?: () => void;
  shoudlMarginatedAtEnd?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  shouldMarginatedAround?: boolean;
  cardWidth: number;
  imagePath: string;
  vote_average: number;
  vote_count: number;
  title: string;
  genre: any[]; // Replace with the correct type for genre
}

const FeaturedNowPlaying: React.FC<FeaturedNowPlayingProps> = (props) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction?.()}>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.watchTrailerButton}
              onPress={() => {
                // Handle Watch Trailer action
              }}
            >
              <Image
                source={require("../assets/images/watch.png")}
                style={styles.playIcon}
              />
              <Text style={styles.watchTrailerText}>Watch Trailer</Text>
            </TouchableOpacity>
          </View>
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
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: "left",
    width: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "auto", // Push the button to the right
  },
  watchTrailerButton: {
    backgroundColor: "#e33939",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_8,
  },
  playIcon: {
    width: 24,
    height: 24,
    marginRight: SPACING.space_4,
  },
  watchTrailerText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});
export default FeaturedNowPlaying;
