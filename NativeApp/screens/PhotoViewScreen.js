import React from "react";
import {
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
} from "react-native";

import { IconButton } from "react-native-paper";

const PhotoViewScreen = (props) => {
  const { uri } = props.route.params;

  const cameraStyle = {
    width: useWindowDimensions().width,
    height: (useWindowDimensions().width / 3) * 4,
  };
  const uploadPhoto = async () => {
    props.navigation.navigate("Docs", {uri,type: "Image"});
  }
  return (
    <View style={styles.screen}>
      <Image
        source={{ uri: uri }}
        style={{ ...styles.image, ...cameraStyle }}
      />
      <View style={styles.actionButtons}>
      <IconButton
          icon="restart"
          size={40}
          onPress={() => {
            props.navigation.navigate("Camera");
          }}
          />
      <IconButton
          icon="check-bold"
          size={40}
          onPress={uploadPhoto}
          />
      </View>
    </View>
  );
};

export default PhotoViewScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  image: {
    height: "100%",
    width: "100%",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  }
});
