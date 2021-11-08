import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
const Body = (props) => {
  const { colors } = useTheme();
  return (
    <Text {...props} style={{ ...styles.textStyle, color: colors.text }}>
      {props.children}
    </Text>
  );
};

export default Body;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
  },
});
