import React, { useState, useEffect,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from '@react-navigation/native';
import { Button,IconButton, ActivityIndicator } from "react-native-paper";

const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading]= useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState({value: Camera.Constants.FlashMode.off,icon: "flash-off"});

  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const cameraStyle = {
    width: useWindowDimensions().width,
    height: (useWindowDimensions().width / 3) * 4,
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    });
    return unsubscribe;
  }, [navigation]);

  if (hasPermission === null || !isFocused) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // Camera Actions
  // Take Picture
   const takePicture = async () => {
    if (cameraRef && cameraReady) {
    setIsLoading(true);
    const { uri, width, height } = await cameraRef.current.takePictureAsync();
    setIsLoading(false);
    navigation.navigate("PhotoView",{uri, width, height});
    }
  };

  // Flip Camera
  const flipCamera = () => {
    setType(type === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front);
  }

  // Flash 
  const toggleFlash = () => {
    switch (flash.value) {
      case Camera.Constants.FlashMode.off: 
      setFlash({value: Camera.Constants.FlashMode.on,icon: "flash"}); 
      break;
      case Camera.Constants.FlashMode.on:
        setFlash({value: Camera.Constants.FlashMode.torch,icon: "flashlight"});
        break;
      case Camera.Constants.FlashMode.torch:
        setFlash({value: Camera.Constants.FlashMode.auto,icon: "flash-auto"});
      break;
      case Camera.Constants.FlashMode.auto:
        setFlash({value: Camera.Constants.FlashMode.off,icon: "flash-off"});
      break;
    }
  }

  return (
    <View style={styles.screen}>
      <Camera
        style={{ ...styles.camera, ...cameraStyle}}
        type={type}
        flashMode={flash.value}
        autoFocus="on"
        onCameraReady={() => {
          setCameraReady(true);
        }}
        ratio="4:3"
        ref={cameraRef}
      >
      </Camera>
      <View>
        <View style={styles.buttonActions}>
          <IconButton onPress={flipCamera} icon={type === Camera.Constants.Type.back ? "camera-rear" : "camera-front"} />
          <IconButton onPress={toggleFlash} icon={flash.icon} />

        </View>
        {isLoading ? <ActivityIndicator/> : <Button icon="camera" onPress={takePicture}>Take Picture</Button>}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default CameraScreen;
