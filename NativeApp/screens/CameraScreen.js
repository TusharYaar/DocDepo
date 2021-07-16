import React, { useState, useEffect,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Camera } from "expo-camera";

import { Button, ActivityIndicator } from "react-native-paper";

const CameraScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading]= useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const cameraStyle = {
    width: useWindowDimensions().width,
    height: (useWindowDimensions().width / 3) * 4,
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePicture = async () => {
    if (cameraRef && cameraReady) {
    setIsLoading(true);
    const { uri, width, height } = await cameraRef.current.takePictureAsync();
    props.navigation.navigate("PhotoView",{uri, width, height});
    setIsLoading(false);
    }
  };
  return (
    <View style={styles.screen}>
      <Camera
        style={{ ...styles.camera, ...cameraStyle}}
        type={type}
        autoFocus="on"
        onCameraReady={() => {
          setCameraReady(true);
        }}
        ratio="4:3"
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View>
        {isLoading ? <ActivityIndicator/> : <Button onPress={takePicture}>Take Picture</Button>}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  camera: {
  },
});

export default CameraScreen;
