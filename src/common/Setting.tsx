import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../common/constant";
import { Icon } from "react-native-elements";

const Setting = (props: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          name={props.icon}
          size={30}
          color="#fff"
          style={styles.iconStyle}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <Icon name={"arrow-right"} style={styles.iconStyle} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: SPACING.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20,
  },
  iconBG: {
    justifyContent: "center",
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA15,
  },
});
export default Setting;
