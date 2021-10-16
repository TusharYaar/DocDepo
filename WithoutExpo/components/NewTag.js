import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

const NewTag = () => {
  const { colors } = useTheme();
  return (
    <View style={{ ...styles.new, backgroundColor: colors.accent }}>
      <Text style={styles.newText}>New</Text>
    </View>
  );
};

export default NewTag;

const styles = StyleSheet.create({
  new: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: "flex-start",
    backgroundColor: "orange",
  },
  newText: {
    fontSize: 10,
    fontFamily: "Manrope_400Regular",
    // marginBottom: 5,
    backgroundColor: "transparent",
  },
});
