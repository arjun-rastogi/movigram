import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { baseImagePath } from "../services/movieService";
import { Icon } from "react-native-elements";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../common/constant";

type Props = {
  movieData?: any;
};
const movieDuration = 2 * 60 * 60;
// For example, the current position in the movie - 1 hour 15 minutes (in seconds)
const currentTime = 1 * 60 * 60 + 15 * 60;

const MovieDetails = (props: Props) => {
  return (
    <>
      {/* Video Container */}
      <View style={styles.videoContainer}>
        <Image
          source={{
            uri: baseImagePath("w780", props.movieData?.backdrop_path),
          }}
          style={styles.videoBackground}
        />
        <View style={styles.playButton}>
          <View style={styles.controls}>
            <TouchableOpacity>
              <Icon
                name={"step-backward"}
                size={30}
                color="#FFFFFF"
                type="font-awesome"
              />
            </TouchableOpacity>
            <Icon
              name={"play-circle"}
              size={50}
              color="#FFFFFF"
              type="font-awesome"
            />
            <TouchableOpacity>
              <Icon
                name={"step-forward"}
                size={30}
                color="#FFFFFF"
                type="font-awesome"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.horizontalLine}>
          <View style={styles.line}>
            <View
              style={{
                backgroundColor: "#e33939",
                height: 4,
                width: `${(currentTime / movieDuration) * 100}%`,
              }}
            />
          </View>
        </View>
        <View style={styles.timing}>
          <Text style={styles.timeStartText}>00:00</Text>
          <Text style={styles.timeEndText}>2:00:00</Text>
        </View>
      </View>

      {/* Movie Details */}

      <View className="bg-black">
        <View className="px-4 pt-4">
          <Text className="text-xl font-bold text-white">
            {props.movieData?.title}
          </Text>
          <View style={styles.timeContainer}>
            <Icon
              name="clock-o"
              size={30}
              color="#FFFFFF"
              type="font-awesome"
            />
            <Text style={styles.runtimeText}>
              {Math.floor(props.movieData?.runtime / 60)}h{" "}
              {Math.floor(props.movieData?.runtime % 60)}m
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 4,
          backgroundColor: "#fff",
          marginTop: 10,
        }}
      />

      <View style={styles.genreContainer}>
        {props.movieData?.genres?.map((item: any) => {
          return (
            <View style={styles.genreBox} key={item.id}>
              <Text style={styles.genreText}>{item.name}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <Icon name="star" style={styles.starIcon} color={"#E1CD17"} />
          <Text style={styles.runtimeText}>
            {props.movieData?.vote_average &&
              props.movieData?.vote_average.toFixed(1)}{" "}
            ({props.movieData?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {props.movieData?.release_date &&
              props.movieData?.release_date.substring(8, 10)}{" "}
            {props.movieData?.release_date &&
              new Date(props.movieData?.release_date).toLocaleString(
                "default",
                {
                  month: "long",
                }
              )}{" "}
            {props.movieData?.release_date &&
              props.movieData?.release_date.substring(0, 4)}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{props.movieData?.overview}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  videoContainer: {
    position: "relative",
  },
  videoBackground: {
    width: "100%",
    height: 200,
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: 200,
  },
  horizontalLine: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
  },
  line: {
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  timing: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  timeStartText: {
    color: "white",
    marginTop: 8,
    marginRight: 10,
  },
  timeEndText: {
    color: "white",
    marginTop: 8,
    marginRight: 10,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: SPACING.space_15,
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    marginRight: SPACING.space_8,
  },
  runtimeText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  genreContainer: {
    flexDirection: "row",
    gap: SPACING.space_20,
    flexWrap: "wrap",
    marginTop: 10,
    marginRight: SPACING.space_8,
    justifyContent: "flex-start",
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  infoContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  rateContainer: {
    flexDirection: "row",
    gap: SPACING.space_10,
    alignItems: "center",
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  descriptionText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});

export default MovieDetails;
