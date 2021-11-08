import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
const Header = (props) => {
  const { colors } = useTheme();
  return (
    <Text style={{ ...styles.textStyle, color: colors.text }}>
      {props.children}
    </Text>
  );
};

export default Header;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 32,
    fontFamily: "Manrope_700Bold",
  },
});
